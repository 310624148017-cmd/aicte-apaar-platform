import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST() {
  try {
    // 1. Seed Institutions
    const institutions = [
      { aicte_code: "1-1001", name: "Indian Institute of Technology (IIT) Delhi", state: "Delhi" },
      { aicte_code: "1-1002", name: "National Institute of Technology (NIT) Trichy", state: "Tamil Nadu" },
      { aicte_code: "1-1003", name: "College of Engineering, Pune (COEP)", state: "Maharashtra" },
      { aicte_code: "1-1004", name: "Delhi Technological University (DTU)", state: "Delhi" },
    ];

    const { error: instError } = await supabaseAdmin
      .from("institutions")
      .upsert(institutions, { onConflict: "aicte_code" });

    if (instError) {
      console.warn("Could not seed institutions:", instError.message);
    }

    // 2. Seed Student Profile
    const student = {
      apaar_id: "123456789012",
      full_name: "Aarav Sharma",
      dob: "2003-04-15",
      gender: "Male",
      current_aicte_code: "1-1001",
      enrollment_status: "ACTIVE",
      total_credits: 16,
    };

    const { error: studentError } = await supabaseAdmin
      .from("apaar_profiles")
      .upsert([student], { onConflict: "apaar_id" });

    if (studentError) {
      return NextResponse.json(
        {
          success: false,
          error: `Failed to seed student profile: ${studentError.message}. Make sure RLS policies allow insertion or provide SUPABASE_SERVICE_ROLE_KEY in .env.local.`,
        },
        { status: 500 }
      );
    }

    // 3. Seed Sample Academic Credits
    const credits = [
      {
        apaar_id: "123456789012",
        aicte_code: "1-1001",
        semester: 1,
        subject_code: "CS101",
        subject_name: "Introduction to Computing",
        credits_earned: 4,
        grade: "A",
        record_hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      },
      {
        apaar_id: "123456789012",
        aicte_code: "1-1001",
        semester: 1,
        subject_code: "MA101",
        subject_name: "Engineering Mathematics I",
        credits_earned: 4,
        grade: "A+",
        record_hash: "bf56b3e9a7e02816f1945143a2ff831eb0bb4a643ec56a3458c95be2439a31a9",
      },
      {
        apaar_id: "123456789012",
        aicte_code: "1-1001",
        semester: 2,
        subject_code: "CS201",
        subject_name: "Data Structures & Algorithms",
        credits_earned: 4,
        grade: "O",
        record_hash: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb",
      },
      {
        apaar_id: "123456789012",
        aicte_code: "1-1001",
        semester: 2,
        subject_code: "EC201",
        subject_name: "Digital Logic Design",
        credits_earned: 4,
        grade: "A",
        record_hash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
      },
    ];

    await supabaseAdmin.from("academic_credits").insert(credits);

    // 4. Seed Activity Certificates
    const certificates = [
      {
        apaar_id: "123456789012",
        title: "Smart India Hackathon 2025 - 1st Runner Up",
        category: "Technical Innovation",
        certificate_url: "https://certificates.sih.gov.in/2025/aarav-sharma",
        record_hash: "34f01479830560a22a3cf2ef98380cf282d8c9735d4d3ec637ff0c427382f7c0",
      },
      {
        apaar_id: "123456789012",
        title: "AICTE Virtual Internship in Cybersecurity",
        category: "Internship & Skilling",
        certificate_url: "https://internship.aicte-india.org/verify/cs-2025-091",
        record_hash: "180fe9132174c86cb598df002d24268e37d5ff7f68cf5b8e96bfef5e0e0a5c48",
      },
    ];

    await supabaseAdmin.from("activity_certificates").insert(certificates);

    return NextResponse.json({
      success: true,
      message: "Seed data successfully populated for student APAAR ID: 123456789012",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error during seed" },
      { status: 500 }
    );
  }
}
