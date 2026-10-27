import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, action = "APPROVE", approved } = body;

    // Validate required ID
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameter: 'id' of the consent request is mandatory.",
        },
        { status: 400 }
      );
    }

    // Determine normalized action: APPROVE vs REVOKE
    let normalizedAction: "APPROVE" | "REVOKE" = "APPROVE";
    if (
      String(action).toUpperCase() === "REVOKE" ||
      String(action).toUpperCase() === "DENY" ||
      approved === false
    ) {
      normalizedAction = "REVOKE";
    }

    // Query existing consent request
    const { data: consent, error: fetchError } = await supabaseAdmin
      .from("consent_logs")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching consent log:", fetchError);
      return NextResponse.json(
        {
          success: false,
          error: `Database query error: ${fetchError.message}`,
        },
        { status: 500 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          success: false,
          status: "NOT_FOUND",
          error: `Consent request with ID '${id}' not found.`,
        },
        { status: 404 }
      );
    }

    // Check if consent request has expired
    const isExpired = new Date(consent.expires_at).getTime() <= Date.now();
    if (isExpired) {
      // Mark as EXPIRED if not already marked
      if (consent.status !== "EXPIRED") {
        await supabaseAdmin
          .from("consent_logs")
          .update({ status: "EXPIRED", access_token: null })
          .eq("id", id);
      }
      return NextResponse.json(
        {
          success: false,
          status: "EXPIRED",
          error: "Consent request has expired. Cannot modify an expired request.",
        },
        { status: 403 }
      );
    }

    if (normalizedAction === "APPROVE") {
      // Generate unique access_token (UUID + random hex)
      const uuid = crypto.randomUUID();
      const randomHex = crypto.randomBytes(8).toString("hex");
      const accessToken = `apaar_${uuid}_${randomHex}`;

      const { data: updatedConsent, error: updateError } = await supabaseAdmin
        .from("consent_logs")
        .update({
          status: "APPROVED",
          access_token: accessToken,
        })
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating consent approval:", updateError);
        return NextResponse.json(
          {
            success: false,
            error: `Failed to approve consent request: ${updateError.message}`,
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Consent request approved successfully. Access token granted.",
          status: "APPROVED",
          access_token: accessToken,
          verification_url: `/api/verify/${accessToken}`,
          expires_at: consent.expires_at,
          consent_request: updatedConsent,
        },
        { status: 200 }
      );
    } else {
      // REVOKE action: invalidate token and set status to REVOKED
      const { data: updatedConsent, error: updateError } = await supabaseAdmin
        .from("consent_logs")
        .update({
          status: "REVOKED",
          access_token: null,
        })
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        console.error("Error revoking consent request:", updateError);
        return NextResponse.json(
          {
            success: false,
            error: `Failed to revoke consent request: ${updateError.message}`,
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Consent request revoked successfully. Access token invalidated.",
          status: "REVOKED",
          consent_request: updatedConsent,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Internal Server Error in /api/consent/approve:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
