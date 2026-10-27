import { createClient } from "@supabase/supabase-js";

// Ensure environment variables are loaded with safe build-time fallbacks for Next.js static pre-rendering
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-apaar-dpi.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder_anon_key_for_build";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  console.warn(
    "⚠️ Warning: Supabase URL or Anon Key is missing from environment variables. Using safe build-time placeholders."
  );
}

/**
 * Database Model Interfaces matching Supabase tables
 */
export interface ApaarProfile {
  apaar_id: string;
  full_name: string;
  dob: string | null;
  gender: string | null;
  aadhaar_last_4?: string | null;
  udise_pen?: string | null;
  current_aicte_code: string | null;
  enrollment_status: "ACTIVE" | "INACTIVE" | "TRANSFERRED" | "EXITED" | string;
  total_credits: number;
  total_activity_points?: number;
  is_duplicate_flagged?: boolean;
  created_at?: string;
}

export interface AcademicCredit {
  id?: number | string;
  apaar_id: string;
  aicte_code: string;
  semester: number;
  subject_code: string;
  subject_name: string;
  credits_earned: number;
  grade: string;
  record_hash: string;
}

export interface ActivityCertificate {
  id?: number | string;
  apaar_id: string;
  title: string;
  category: string | null;
  certificate_url: string | null;
  record_hash: string | null;
  points_awarded?: number;
  verification_status?: "PENDING" | "APPROVED" | "REJECTED" | "FLAGGED" | string;
  ocr_confidence_score?: number;
  created_at?: string;
}

export interface Institution {
  id?: number | string;
  aicte_code: string;
  name: string;
  state: string | null;
  created_at?: string;
}

export interface ConsentLog {
  id?: string;
  apaar_id: string;
  requester_name: string;
  purpose: string;
  allowed_fields: string[];
  status: "PENDING" | "APPROVED" | "REVOKED" | "EXPIRED" | string;
  access_token: string | null;
  expires_at: string;
  created_at?: string;
}

export interface Database {
  public: {
    Tables: {
      apaar_profiles: {
        Row: ApaarProfile;
        Insert: ApaarProfile;
        Update: Partial<ApaarProfile>;
        Relationships: [];
      };
      academic_credits: {
        Row: AcademicCredit;
        Insert: AcademicCredit;
        Update: Partial<AcademicCredit>;
        Relationships: [];
      };
      activity_certificates: {
        Row: ActivityCertificate;
        Insert: ActivityCertificate;
        Update: Partial<ActivityCertificate>;
        Relationships: [];
      };
      institutions: {
        Row: Institution;
        Insert: Institution;
        Update: Partial<Institution>;
        Relationships: [];
      };
      consent_logs: {
        Row: ConsentLog;
        Insert: ConsentLog;
        Update: Partial<ConsentLog>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

/**
 * Public client for client-side or anon-authenticated requests
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Privileged server-side client for DPI Backend API Routes.
 * Uses SUPABASE_SERVICE_ROLE_KEY when available to bypass Row-Level Security (RLS),
 * falling back to NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
