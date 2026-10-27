import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, action } = body;

    // Validate required parameters
    if (!id || !action) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameters: 'id' and 'action' are mandatory.",
        },
        { status: 400 }
      );
    }

    const cleanAction = String(action).trim().toUpperCase();
    if (cleanAction !== "APPROVE" && cleanAction !== "REJECT") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid 'action'. Must be either 'APPROVE' or 'REJECT'.",
        },
        { status: 400 }
      );
    }

    // Query certificate by ID
    const { data: cert, error: certError } = await supabaseAdmin
      .from("activity_certificates")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (certError) {
      if (certError.code === "22P02") {
        return NextResponse.json(
          {
            success: false,
            status: "NOT_FOUND",
            error: `Certificate with ID '${id}' not found (invalid UUID format).`,
          },
          { status: 404 }
        );
      }
      console.error("Error fetching activity certificate:", certError);
      return NextResponse.json(
        {
          success: false,
          error: `Database query error: ${certError.message}`,
        },
        { status: 500 }
      );
    }

    if (!cert) {
      return NextResponse.json(
        {
          success: false,
          status: "NOT_FOUND",
          error: `Certificate with ID '${id}' not found.`,
        },
        { status: 404 }
      );
    }

    if (cleanAction === "APPROVE") {
      // 1. Update verification_status to 'APPROVED'
      const { data: updatedCert, error: updateCertError } = await supabaseAdmin
        .from("activity_certificates")
        .update({ verification_status: "APPROVED" })
        .eq("id", id)
        .select()
        .single();

      if (updateCertError) {
        console.error("Error updating certificate status:", updateCertError);
        return NextResponse.json(
          {
            success: false,
            error: `Failed to approve certificate: ${updateCertError.message}`,
          },
          { status: 500 }
        );
      }

      // 2. Fetch student profile to increment total_activity_points
      const { data: student } = await supabaseAdmin
        .from("apaar_profiles")
        .select("apaar_id, full_name, total_activity_points")
        .eq("apaar_id", cert.apaar_id)
        .maybeSingle();

      const pointsToAdd = Number(cert.points_awarded) || 0;
      let newTotalPoints = pointsToAdd;

      if (student) {
        newTotalPoints = (student.total_activity_points || 0) + pointsToAdd;
        const { error: profileUpdateError } = await supabaseAdmin
          .from("apaar_profiles")
          .update({ total_activity_points: newTotalPoints })
          .eq("apaar_id", cert.apaar_id);

        if (profileUpdateError) {
          console.error("Error incrementing student activity points:", profileUpdateError);
        }
      }

      return NextResponse.json(
        {
          success: true,
          message:
            "Certificate approved by AICTE Nodal Officer. Activity points successfully credited to student.",
          certificate_id: id,
          verification_status: "APPROVED",
          points_awarded: pointsToAdd,
          total_activity_points: newTotalPoints,
          student: {
            apaar_id: cert.apaar_id,
            full_name: student?.full_name || null,
          },
          certificate: updatedCert,
        },
        { status: 200 }
      );
    } else {
      // REJECT action: update verification_status to 'REJECTED'
      const { data: updatedCert, error: updateCertError } = await supabaseAdmin
        .from("activity_certificates")
        .update({ verification_status: "REJECTED" })
        .eq("id", id)
        .select()
        .single();

      if (updateCertError) {
        console.error("Error rejecting certificate:", updateCertError);
        return NextResponse.json(
          {
            success: false,
            error: `Failed to reject certificate: ${updateCertError.message}`,
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Certificate rejected by AICTE Nodal Officer.",
          certificate_id: id,
          verification_status: "REJECTED",
          certificate: updatedCert,
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Internal Server Error in /api/certificates/nodal-action:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
