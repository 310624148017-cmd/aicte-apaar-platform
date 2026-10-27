import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { apaar_id, target_aicte_code } = body;

    // Validate required parameters
    if (!apaar_id || !target_aicte_code) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameters: 'apaar_id' and 'target_aicte_code' are mandatory.",
        },
        { status: 400 }
      );
    }

    // Check if student exists in apaar_profiles
    const { data: student, error: studentError } = await supabaseAdmin
      .from("apaar_profiles")
      .select("*")
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

    const previousAicteCode = student.current_aicte_code;

    // Update student's current_aicte_code and set enrollment_status to 'ACTIVE'
    const { data: updatedProfile, error: updateError } = await supabaseAdmin
      .from("apaar_profiles")
      .update({
        current_aicte_code: String(target_aicte_code),
        enrollment_status: "ACTIVE",
      })
      .eq("apaar_id", String(apaar_id))
      .select()
      .single();

    if (updateError) {
      console.error("Error updating student institution:", updateError);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to update student transfer details: ${updateError.message}`,
        },
        { status: 500 }
      );
    }

    // Fetch all historical credits and institution metadata concurrently
    const [creditsResponse, prevInstResponse, targetInstResponse] = await Promise.all([
      supabaseAdmin
        .from("academic_credits")
        .select("*")
        .eq("apaar_id", String(apaar_id))
        .order("semester", { ascending: true }),
      previousAicteCode
        ? supabaseAdmin
            .from("institutions")
            .select("*")
            .eq("aicte_code", previousAicteCode)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
      supabaseAdmin
        .from("institutions")
        .select("*")
        .eq("aicte_code", String(target_aicte_code))
        .maybeSingle(),
    ]);

    const historicalCredits = creditsResponse.data || [];
    const prevInstitution = prevInstResponse.data;
    const targetInstitution = targetInstResponse.data;

    return NextResponse.json(
      {
        success: true,
        message:
          "Student transfer seamlessly processed under NEP 2020 Multiple Entry / Multiple Exit (MEME) framework.",
        framework: "NEP 2020 Multiple Entry / Multiple Exit (MEME)",
        transfer_details: {
          apaar_id: updatedProfile.apaar_id,
          student_name: updatedProfile.full_name,
          previous_institution: {
            aicte_code: previousAicteCode,
            name: prevInstitution?.name || "Previous Institution",
            state: prevInstitution?.state || null,
          },
          target_institution: {
            aicte_code: target_aicte_code,
            name: targetInstitution?.name || "Target AICTE Institution",
            state: targetInstitution?.state || null,
          },
          enrollment_status: updatedProfile.enrollment_status,
          total_credits_transferred: updatedProfile.total_credits,
          historical_credits_count: historicalCredits.length,
          transfer_timestamp: new Date().toISOString(),
        },
        historical_credits: historicalCredits,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Internal Server Error in /api/dpi/transfer-student:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
