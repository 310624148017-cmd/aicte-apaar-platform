import { NextResponse } from "next/server";
import { registerApaarStudent } from "@/lib/apaar-registration";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      full_name,
      dob,
      gender,
      aadhaar_last_4,
      udise_pen,
      class_10_percentage,
      class_12_percentage,
      current_aicte_code,
      custom_apaar_id,
    } = body;

    if (!full_name || typeof full_name !== "string" || !full_name.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required parameter: 'full_name' is mandatory for UIDAI eKYC registration.",
        },
        { status: 400 }
      );
    }

    const result = await registerApaarStudent({
      full_name,
      dob,
      gender,
      aadhaar_last_4,
      udise_pen,
      class_10_percentage:
        typeof class_10_percentage === "number"
          ? class_10_percentage
          : class_10_percentage
          ? Number(class_10_percentage)
          : undefined,
      class_12_percentage:
        typeof class_12_percentage === "number"
          ? class_12_percentage
          : class_12_percentage
          ? Number(class_12_percentage)
          : undefined,
      current_aicte_code,
      custom_apaar_id,
    });

    return NextResponse.json(
      {
        success: true,
        status: "MINTED",
        message: "Student APAAR ID minted successfully on ABC & National Academic Depository ledger",
        apaar_id: result.apaar_id,
        student_profile: result.student_profile,
        welcome_credit: result.welcome_credit,
        depa_token: result.depa_token,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in /api/dpi/register-apaar:", error);
    if (error.status === "CONFLICT") {
      return NextResponse.json(
        {
          success: false,
          status: "CONFLICT",
          error: error.message,
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error during student registration.",
      },
      { status: 400 }
    );
  }
}
