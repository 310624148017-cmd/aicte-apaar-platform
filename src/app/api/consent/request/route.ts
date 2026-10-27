import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { requester_name, purpose, apaar_id, allowed_fields } = body;

    // Validate presence of required fields
    if (!requester_name || !purpose || !apaar_id || !allowed_fields) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields. Mandatory parameters: 'requester_name', 'purpose', 'apaar_id', 'allowed_fields'.",
        },
        { status: 400 }
      );
    }

    // Format allowed_fields as array of strings
    let fieldsArray: string[] = [];
    if (Array.isArray(allowed_fields)) {
      fieldsArray = allowed_fields.map((f: any) => String(f).trim()).filter(Boolean);
    } else if (typeof allowed_fields === "string") {
      fieldsArray = allowed_fields.split(",").map((f) => f.trim()).filter(Boolean);
    }

    if (fieldsArray.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid 'allowed_fields'. Must provide at least one field to request consent for.",
        },
        { status: 400 }
      );
    }

    // Verify student exists in apaar_profiles
    const { data: student, error: studentError } = await supabaseAdmin
      .from("apaar_profiles")
      .select("apaar_id, full_name")
      .eq("apaar_id", String(apaar_id))
      .maybeSingle();

    if (studentError) {
      console.error("Error querying student profile:", studentError);
      return NextResponse.json(
        {
          success: false,
          error: `Database query error: ${studentError.message}`,
        },
        { status: 500 }
      );
    }

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          status: "NOT_FOUND",
          error: `Student profile not found for APAAR ID: '${apaar_id}'.`,
        },
        { status: 404 }
      );
    }

    // Calculate 24-hour expiration timestamp
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

    const consentRecord = {
      apaar_id: String(apaar_id),
      requester_name: String(requester_name).trim(),
      purpose: String(purpose).trim(),
      allowed_fields: fieldsArray,
      status: "PENDING",
      access_token: null,
      expires_at: expiresAt,
    };

    const { data: insertedConsent, error: insertError } = await supabaseAdmin
      .from("consent_logs")
      .insert([consentRecord])
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting consent request:", insertError);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to create consent request: ${insertError.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Consent request created successfully. Awaiting student authorization.",
        consent_request: insertedConsent,
        student: {
          apaar_id: student.apaar_id,
          full_name: student.full_name,
        },
        expires_at: expiresAt,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Internal Server Error in /api/consent/request:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
