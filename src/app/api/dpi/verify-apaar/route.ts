import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { registerApaarStudent } from "@/lib/apaar-registration";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { apaar_id, otp, auto_provision, student_name } = body;

    // Validate request parameters
    if (!apaar_id || !otp) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameters: 'apaar_id' and 'otp' are mandatory.",
        },
        { status: 400 }
      );
    }

    // Simulate OTP verification (mock OTP is '123456')
    if (otp !== "123456") {
      return NextResponse.json(
        {
          success: false,
          status: "FAILED",
          error: "Invalid OTP. DPI verification failed. Simulation requires OTP: 123456.",
        },
        { status: 401 }
      );
    }

    // Fetch student profile from Supabase
    const { data: fetchedStudent, error: profileError } = await supabaseAdmin
      .from("apaar_profiles")
      .select("*")
      .eq("apaar_id", String(apaar_id))
      .maybeSingle();

    if (profileError) {
      console.error("Error fetching apaar_profile:", profileError);
      return NextResponse.json(
        {
          success: false,
          error: `Database query error: ${profileError.message}`,
        },
        { status: 500 }
      );
    }

    let student = fetchedStudent;

    if (!student) {
      if (auto_provision === true && /^\d{12}$/.test(String(apaar_id).trim())) {
        try {
          const registered = await registerApaarStudent({
            full_name: student_name || `DigiLocker Scholar (${String(apaar_id).slice(-4)})`,
            custom_apaar_id: String(apaar_id).trim(),
            dob: "2005-04-18",
            gender: "Male",
            current_aicte_code: "1-10000001",
          });
          student = registered.student_profile;
        } catch (regErr: any) {
          console.error("Auto-provision error in verify-apaar:", regErr);
          return NextResponse.json(
            {
              success: false,
              status: "NOT_FOUND",
              error: `Student profile not found, and auto-provision failed: ${regErr.message}`,
              can_auto_provision: true,
            },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          {
            success: false,
            status: "NOT_FOUND",
            error: `No student profile found for APAAR ID: '${apaar_id}'.`,
            can_auto_provision: /^\d{12}$/.test(String(apaar_id).trim()),
          },
          { status: 404 }
        );
      }
    }

    // Fetch academic credits, activity certificates, institution, and consents concurrently
    const [creditsResponse, certificatesResponse, institutionResponse, consentsResponse] = await Promise.all([
      supabaseAdmin
        .from("academic_credits")
        .select("*")
        .eq("apaar_id", String(apaar_id))
        .order("semester", { ascending: true }),
      supabaseAdmin
        .from("activity_certificates")
        .select("*")
        .eq("apaar_id", String(apaar_id))
        .order("created_at", { ascending: false }),
      student.current_aicte_code
        ? supabaseAdmin
            .from("institutions")
            .select("*")
            .eq("aicte_code", student.current_aicte_code)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null }),
      supabaseAdmin
        .from("consent_logs")
        .select("*")
        .eq("apaar_id", String(apaar_id))
        .order("created_at", { ascending: false }),
    ]);

    if (creditsResponse.error) {
      console.error("Error fetching academic_credits:", creditsResponse.error);
    }
    if (certificatesResponse.error) {
      console.error("Error fetching activity_certificates:", certificatesResponse.error);
    }
    if (consentsResponse.error) {
      console.error("Error fetching consent_logs:", consentsResponse.error);
    }

    const academicCredits = creditsResponse.data || [];
    const activityCertificates = certificatesResponse.data || [];
    const institution = institutionResponse.data;
    const consents = consentsResponse.data || [];

    // Structured DigiLocker / ABC (Academic Bank of Credits) standard format
    const digiLockerABCResponse = {
      success: true,
      status: "VERIFIED",
      dpi_issuer: "Academic Bank of Credits (ABC) / AICTE National Academic Depository",
      verification_timestamp: new Date().toISOString(),
      digilocker_metadata: {
        doc_type: "ACADEMIC_CREDIT_TRANSCRIPT",
        format: "JSON-LD / ABC-v2.0",
        digilocker_uri: `in.gov.digilocker.abc:${student.apaar_id}`,
        status: "AUTHENTICATED",
        nep_compliance: "NEP 2020 Compliant",
        issuer_id: "in.gov.aicte.abc",
      },
      data: {
        student_profile: {
          apaar_id: student.apaar_id,
          full_name: student.full_name,
          dob: student.dob,
          gender: student.gender,
          aadhaar_last_4: student.aadhaar_last_4 || "8821",
          udise_pen: student.udise_pen || "PEN9981234",
          enrollment_status: student.enrollment_status,
          total_credits: student.total_credits || 0,
          total_activity_points: student.total_activity_points || 0,
          is_duplicate_flagged: Boolean(student.is_duplicate_flagged),
          institution: {
            aicte_code: student.current_aicte_code,
            name: institution?.name || "AICTE Approved Institution",
            state: institution?.state || null,
          },
          created_at: student.created_at,
        },
        academic_credits: academicCredits,
        activity_certificates: activityCertificates,
        consents: consents,
        credit_summary: {
          total_credits_earned: student.total_credits || 0,
          total_activity_points: student.total_activity_points || 0,
          courses_completed: academicCredits.length,
          co_curricular_activities_count: activityCertificates.length,
          active_consents_count: consents.filter(
            (c: any) => c.status === "APPROVED" && new Date(c.expires_at).getTime() > Date.now()
          ).length,
        },
      },
    };

    return NextResponse.json(digiLockerABCResponse, { status: 200 });
  } catch (error: any) {
    console.error("Internal Server Error in /api/dpi/verify-apaar:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
