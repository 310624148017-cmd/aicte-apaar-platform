import { supabaseAdmin, ApaarProfile } from "@/lib/supabase";
import crypto from "crypto";

export interface RegisterStudentParams {
  full_name: string;
  dob?: string;
  gender?: string;
  aadhaar_last_4?: string;
  udise_pen?: string;
  class_10_percentage?: number;
  class_12_percentage?: number;
  current_aicte_code?: string;
  custom_apaar_id?: string;
}

export interface RegisterStudentResult {
  success: boolean;
  apaar_id: string;
  student_profile: ApaarProfile;
  welcome_credit?: any;
  depa_token: string;
  error?: string;
  status?: string;
}

/**
 * Mints a new 12-digit APAAR ID, creates their profile in apaar_profiles,
 * seeds an initial foundation credit in academic_credits with SHA-256 hash,
 * and creates an active DEPA consent token in consent_logs.
 */
export async function registerApaarStudent(
  params: RegisterStudentParams
): Promise<RegisterStudentResult> {
  const fullName = params.full_name?.trim() || "Guest Student";

  // Determine or generate 12-digit APAAR ID
  let apaarId = "";
  if (params.custom_apaar_id) {
    const cleaned = String(params.custom_apaar_id).trim();
    if (!/^\d{12}$/.test(cleaned)) {
      throw new Error("Invalid 'custom_apaar_id': APAAR ID must be an exact 12-digit numeric identifier.");
    }
    apaarId = cleaned;

    // Check if already registered
    const { data: existing } = await supabaseAdmin
      .from("apaar_profiles")
      .select("apaar_id")
      .eq("apaar_id", apaarId)
      .maybeSingle();

    if (existing) {
      const err: any = new Error(`APAAR ID '${apaarId}' is already registered on the National Depository ledger.`);
      err.status = "CONFLICT";
      throw err;
    }
  } else {
    // Generate unique 12-digit number
    let unique = false;
    let attempts = 0;
    while (!unique && attempts < 10) {
      attempts++;
      const candidate = String(Math.floor(100000000000 + Math.random() * 900000000000));
      const { data: existing } = await supabaseAdmin
        .from("apaar_profiles")
        .select("apaar_id")
        .eq("apaar_id", candidate)
        .maybeSingle();
      if (!existing) {
        unique = true;
        apaarId = candidate;
      }
    }
    if (!unique) {
      apaarId = String(Date.now()).slice(0, 12);
    }
  }

  const aicteCode = params.current_aicte_code || "1-10000001";
  const profile: ApaarProfile = {
    apaar_id: apaarId,
    full_name: fullName,
    dob: params.dob || "2005-06-15",
    gender: params.gender || "Male",
    aadhaar_last_4: params.aadhaar_last_4
      ? String(params.aadhaar_last_4).slice(-4)
      : String(Math.floor(1000 + Math.random() * 9000)),
    udise_pen: params.udise_pen || `PEN${Math.floor(1000000 + Math.random() * 9000000)}`,
    class_10_percentage: typeof params.class_10_percentage === "number" ? params.class_10_percentage : 91.5,
    class_12_percentage: typeof params.class_12_percentage === "number" ? params.class_12_percentage : 88.0,
    current_aicte_code: aicteCode,
    enrollment_status: "ACTIVE",
    total_credits: 4, // 1 foundation welcome credit (4 credits)
    total_activity_points: 0,
    is_duplicate_flagged: false,
  };

  // 1. Insert into apaar_profiles
  const { data: insertedProfile, error: profileError } = await supabaseAdmin
    .from("apaar_profiles")
    .insert([profile])
    .select()
    .single();

  if (profileError) {
    throw new Error(`Database insertion error in apaar_profiles: ${profileError.message}`);
  }

  // 2. Seed welcome foundation credit with cryptographic SHA-256 hash
  const subjectCode = "DPI101";
  const subjectName = "Digital Public Infrastructure & ABC Fundamentals";
  const creditsEarned = 4;
  const grade = "O";
  const hashData = `${apaarId}${subjectCode}${grade}${Date.now()}`;
  const recordHash = crypto.createHash("sha256").update(hashData).digest("hex");

  const welcomeCredit = {
    apaar_id: apaarId,
    aicte_code: aicteCode,
    semester: 1,
    subject_code: subjectCode,
    subject_name: subjectName,
    credits_earned: creditsEarned,
    grade: grade,
    record_hash: recordHash,
  };

  const { error: creditError } = await supabaseAdmin
    .from("academic_credits")
    .insert([welcomeCredit]);

  if (creditError) {
    console.warn("Non-fatal: could not insert welcome credit:", creditError.message);
  }

  // 3. Seed approved DEPA consent token in consent_logs
  const accessToken = `depa-live-token-${apaarId.slice(-6)}`;
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const welcomeConsent = {
    apaar_id: apaarId,
    requester_name: "AICTE National Verification Gateway",
    purpose: "Academic Bank of Credits Immediate Verification & Recruiter Sharing",
    allowed_fields: ["full_name", "academic_credits", "total_credits", "institution"],
    status: "APPROVED",
    access_token: accessToken,
    expires_at: expiresAt,
  };

  const { error: consentError } = await supabaseAdmin
    .from("consent_logs")
    .insert([welcomeConsent]);

  if (consentError) {
    console.warn("Non-fatal: could not insert welcome consent token:", consentError.message);
  }

  return {
    success: true,
    apaar_id: apaarId,
    student_profile: insertedProfile || profile,
    welcome_credit: welcomeCredit,
    depa_token: accessToken,
  };
}
