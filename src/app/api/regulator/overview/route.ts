import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    // Concurrently fetch all rows from the 5 core tables
    const [
      institutionsRes,
      profilesRes,
      creditsRes,
      certificatesRes,
      consentsRes,
    ] = await Promise.all([
      supabaseAdmin.from("institutions").select("*").order("name", { ascending: true }),
      supabaseAdmin.from("apaar_profiles").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("academic_credits").select("*").order("id", { ascending: false }),
      supabaseAdmin
        .from("activity_certificates")
        .select("*")
        .order("created_at", { ascending: false }),
      supabaseAdmin.from("consent_logs").select("*").order("created_at", { ascending: false }),
    ]);

    // Handle any query errors
    if (institutionsRes.error) console.error("Error fetching institutions:", institutionsRes.error);
    if (profilesRes.error) console.error("Error fetching profiles:", profilesRes.error);
    if (creditsRes.error) console.error("Error fetching academic_credits:", creditsRes.error);
    if (certificatesRes.error) console.error("Error fetching certificates:", certificatesRes.error);
    if (consentsRes.error) console.error("Error fetching consent_logs:", consentsRes.error);

    const institutions = institutionsRes.data || [];
    const apaarProfiles = profilesRes.data || [];
    const academicCredits = creditsRes.data || [];
    const activityCertificates = certificatesRes.data || [];
    const consentLogs = consentsRes.data || [];

    // Filter duplicate flagged students (where is_duplicate_flagged === true)
    const duplicateFlaggedStudents = apaarProfiles.filter(
      (student: any) => student.is_duplicate_flagged === true
    );

    // Filter flagged/tampered certificates
    const flaggedCertificates = activityCertificates.filter(
      (cert: any) => cert.verification_status === "FLAGGED"
    );

    // Compute key aggregated analytics
    const totalCreditsBanked = academicCredits.reduce(
      (sum: number, c: any) => sum + (Number(c.credits_earned) || 0),
      0
    );

    const totalActivityPointsAwarded = activityCertificates
      .filter((c: any) => c.verification_status === "APPROVED")
      .reduce((sum: number, c: any) => sum + (Number(c.points_awarded) || 0), 0);

    const pendingCertificatesCount = activityCertificates.filter(
      (c: any) => c.verification_status === "PENDING"
    ).length;

    const activeConsentsCount = consentLogs.filter(
      (c: any) => c.status === "APPROVED" && new Date(c.expires_at).getTime() > Date.now()
    ).length;

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        command_center: {
          metrics: {
            total_institutions: institutions.length,
            total_students: apaarProfiles.length,
            duplicate_flagged_count: duplicateFlaggedStudents.length,
            total_credits_banked: totalCreditsBanked,
            total_activity_points_awarded: totalActivityPointsAwarded,
            pending_certificates_count: pendingCertificatesCount,
            active_consent_grants_count: activeConsentsCount,
          },
          alerts: {
            duplicate_flagged_students: duplicateFlaggedStudents,
            flagged_certificates: flaggedCertificates,
          },
          breakdowns: {
            certificates_by_status: {
              pending: pendingCertificatesCount,
              approved: activityCertificates.filter((c: any) => c.verification_status === "APPROVED").length,
              rejected: activityCertificates.filter((c: any) => c.verification_status === "REJECTED").length,
              flagged: flaggedCertificates.length,
            },
            consents_by_status: {
              pending: consentLogs.filter((c: any) => c.status === "PENDING").length,
              approved: consentLogs.filter((c: any) => c.status === "APPROVED").length,
              revoked: consentLogs.filter((c: any) => c.status === "REVOKED").length,
              expired: consentLogs.filter(
                (c: any) => c.status === "EXPIRED" || new Date(c.expires_at).getTime() <= Date.now()
              ).length,
            },
          },
          institutions,
          apaar_profiles: apaarProfiles,
          academic_credits: academicCredits,
          activity_certificates: activityCertificates,
          consent_logs: consentLogs,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Internal Server Error in /api/regulator/overview:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
