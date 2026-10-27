import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      apaar_id,
      aicte_code,
      semester,
      subject_code,
      subject_name,
      credits_earned,
      grade,
    } = body;

    // Validate presence of all mandatory fields
    if (
      !apaar_id ||
      !aicte_code ||
      semester === undefined ||
      !subject_code ||
      !subject_name ||
      credits_earned === undefined ||
      !grade
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields. Required: 'apaar_id', 'aicte_code', 'semester', 'subject_code', 'subject_name', 'credits_earned', 'grade'.",
        },
        { status: 400 }
      );
    }

    const parsedCredits = Number(credits_earned);
    if (isNaN(parsedCredits) || parsedCredits <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid 'credits_earned'. It must be a positive number.",
        },
        { status: 400 }
      );
    }

    const parsedSemester = Number(semester);
    if (isNaN(parsedSemester) || parsedSemester < 1) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid 'semester'. It must be a positive integer.",
        },
        { status: 400 }
      );
    }

    // Verify student exists in apaar_profiles
    const { data: student, error: studentError } = await supabaseAdmin
      .from("apaar_profiles")
      .select("apaar_id, full_name, total_credits")
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

    // Generate SHA-256 cryptographic hash: (apaar_id + subject_code + grade + Date.now())
    const hashInput = `${apaar_id}${subject_code}${grade}${Date.now()}`;
    const record_hash = crypto.createHash("sha256").update(hashInput).digest("hex");

    // Insert record into academic_credits
    const creditRecord = {
      apaar_id: String(apaar_id),
      aicte_code: String(aicte_code),
      semester: parsedSemester,
      subject_code: String(subject_code),
      subject_name: String(subject_name),
      credits_earned: parsedCredits,
      grade: String(grade).toUpperCase(),
      record_hash,
    };

    const { data: insertedCredit, error: insertError } = await supabaseAdmin
      .from("academic_credits")
      .insert([creditRecord])
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting academic credit:", insertError);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to insert credit record: ${insertError.message}`,
        },
        { status: 500 }
      );
    }

    // Increment total_credits in apaar_profiles
    const previousTotal = student.total_credits || 0;
    const newTotalCredits = previousTotal + parsedCredits;

    const { error: updateError } = await supabaseAdmin
      .from("apaar_profiles")
      .update({ total_credits: newTotalCredits })
      .eq("apaar_id", String(apaar_id));

    if (updateError) {
      console.error("Error incrementing total_credits in apaar_profiles:", updateError);
      return NextResponse.json(
        {
          success: false,
          error: `Credits inserted but failed to update student total_credits: ${updateError.message}`,
          record_hash,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Academic credits successfully banked and cryptographically anchored in ABC/DPI.",
        record_hash,
        credit_record: insertedCredit,
        total_credits: newTotalCredits,
        student: {
          apaar_id: student.apaar_id,
          full_name: student.full_name,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Internal Server Error in /api/dpi/push-credits:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
