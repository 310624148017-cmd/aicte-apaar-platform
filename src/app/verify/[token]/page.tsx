"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Award,
  User,
  Hash,
  Printer,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Copy,
  Check,
} from "lucide-react";

interface VerificationResponse {
  success: boolean;
  verification_status: string;
  badge?: {
    text: string;
    color: string;
    verified: boolean;
    authority: string;
    hash_anchored: boolean;
    verified_at?: string;
  };
  consent_metadata?: {
    requester_name: string;
    purpose: string;
    allowed_fields: string[];
    expires_at: string;
    granted_at?: string;
  };
  data?: {
    apaar_id: string;
    full_name: string;
    dob?: string;
    gender?: string;
    current_aicte_code?: string;
    enrollment_status?: string;
    total_credits?: number;
    total_activity_points?: number;
    institution?: {
      aicte_code?: string;
      name?: string;
      state?: string;
    };
    academic_credits?: Array<{
      semester: number;
      subject_code: string;
      subject_name: string;
      credits_earned: number;
      grade: string;
      record_hash: string;
      aicte_code?: string;
    }>;
    activity_certificates?: Array<{
      title: string;
      category?: string;
      points_awarded?: number;
      record_hash: string;
      certificate_url?: string;
      created_at?: string;
    }>;
  };
  error?: string;
}

import { Suspense } from "react";

function VerifyContent({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const unwrappedParams = use(params);
  const token = unwrappedParams.token;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<VerificationResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVerification() {
      try {
        setLoading(true);
        const res = await fetch(`/api/verify/${token}`);
        const json = await res.json();
        if (!res.ok) {
          setErrorMsg(json.error || `Verification error (${res.status})`);
        } else {
          setData(json);
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Network error fetching verification data");
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchVerification();
    }
  }, [token]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-cyan-600/10 blur-[130px] rounded-full" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors mr-2 bg-slate-800/60 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </Link>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-emerald-500/20">
              A
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wide text-white flex items-center gap-1.5">
                AICTE-APAAR
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                  ABC Depository
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Digital Public Infrastructure • Government of India
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-medium px-3.5 py-1.5 rounded-lg border border-slate-700/60 transition-all shadow-sm print:hidden"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-400" />
            <span>Print Transcript</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-sm text-slate-400 animate-pulse font-mono">
              Validating SHA-256 cryptographic proofs against AICTE Academic Bank of Credits...
            </p>
          </div>
        ) : errorMsg ? (
          /* Error State Card */
          <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-8 backdrop-blur-xl text-center max-w-lg mx-auto my-12 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 text-red-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-red-200 mb-2">Access Expired or Invalid</h2>
            <p className="text-sm text-red-300/80 mb-6 leading-relaxed">
              {errorMsg}
            </p>
            <div className="p-3 bg-red-950/60 rounded-lg text-xs font-mono text-red-400 border border-red-500/20 mb-6 break-all">
              Token: {token}
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium px-5 py-2.5 rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Platform Command Center
            </Link>
          </div>
        ) : (
          /* Verified State */
          <div className="space-y-6">
            {/* GREEN BADGE BANNER */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-teal-950/70 border border-emerald-500/40 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-emerald-950/50">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20 shrink-0">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Cryptographically Verified by AICTE & DigiLocker
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Official Academic Credential Transcript
                    </h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      National Academic Depository (NAD) • Academic Bank of Credits (ABC)
                    </p>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 self-stretch sm:self-auto flex flex-col justify-center">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Verification Protocol
                  </div>
                  <div className="text-sm font-semibold text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    SHA-256 Anchored
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Verified: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
              </div>

              {/* Consent Provenance Pill */}
              {data?.consent_metadata && (
                <div className="mt-5 pt-4 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Authorized Recipient:</span>
                    <span className="font-semibold text-white bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
                      {data.consent_metadata.requester_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Purpose:</span>
                    <span className="italic text-slate-200">
                      {data.consent_metadata.purpose}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">DEPA Authorization Window:</span>
                    <span className="font-mono text-emerald-400">
                      Active (24-Hour Token)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* STUDENT PROFILE CARD */}
            {data?.data && (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400" />
                    APAAR Student Registry Information
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Status: {data.data.enrollment_status || "ACTIVE"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">Full Name</div>
                    <div className="text-base font-bold text-white mt-0.5">{data.data.full_name}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">APAAR ID</div>
                    <div className="text-base font-bold font-mono text-emerald-300 mt-0.5 tracking-wider">
                      {data.data.apaar_id}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">Institution</div>
                    <div className="text-sm font-semibold text-slate-200 mt-0.5 line-clamp-1">
                      {data.data.institution?.name || "AICTE Approved Institution"}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Code: {data.data.institution?.aicte_code || data.data.current_aicte_code || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase font-mono">Total Verified Credits</div>
                    <div className="text-base font-bold text-cyan-400 mt-0.5">
                      {data.data.total_credits || 0} <span className="text-xs font-normal text-slate-400">/ 160 Credits</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ACADEMIC CREDITS TRANSCRIPT */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  Banked Semester Academic Credits
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {data?.data?.academic_credits?.length || 0} Verified Course Records
                </span>
              </div>

              {data?.data?.academic_credits && data.data.academic_credits.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                        <th className="py-2.5 px-3">Sem</th>
                        <th className="py-2.5 px-3">Subject Code</th>
                        <th className="py-2.5 px-3">Course Title</th>
                        <th className="py-2.5 px-3">Credits</th>
                        <th className="py-2.5 px-3">Grade</th>
                        <th className="py-2.5 px-3">SHA-256 Ledger Hash</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                      {data.data.academic_credits.map((credit, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-3 font-mono font-medium text-slate-300">
                            Sem {credit.semester}
                          </td>
                          <td className="py-3 px-3 font-mono text-cyan-300">
                            {credit.subject_code}
                          </td>
                          <td className="py-3 px-3 font-medium text-white">
                            {credit.subject_name}
                          </td>
                          <td className="py-3 px-3 font-bold text-slate-200">
                            {credit.credits_earned}
                          </td>
                          <td className="py-3 px-3">
                            <span className="inline-flex items-center justify-center w-7 h-6 rounded bg-emerald-500/10 text-emerald-400 font-bold font-mono border border-emerald-500/20">
                              {credit.grade}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <button
                              onClick={() => copyToClipboard(credit.record_hash, `credit-${idx}`)}
                              className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-400 hover:text-emerald-300 bg-slate-800/70 hover:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/60 transition-all max-w-[190px] truncate"
                              title="Click to copy full SHA-256 hash"
                            >
                              <Hash className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="truncate">{credit.record_hash.slice(0, 16)}...</span>
                              {copiedHash === `credit-${idx}` ? (
                                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                              ) : (
                                <Copy className="w-3 h-3 shrink-0 opacity-60" />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No individual credit records authorized under this token scope.
                </div>
              )}
            </div>

            {/* CO-CURRICULAR / ACTIVITY CERTIFICATES */}
            {data?.data?.activity_certificates && data.data.activity_certificates.length > 0 && (
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    AICTE Activity Points & Skill Certifications
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    {data.data.activity_certificates.length} Verified Certificates
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.data.activity_certificates.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-sm font-semibold text-white">{cert.title}</h4>
                        {cert.points_awarded && (
                          <span className="shrink-0 text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            +{cert.points_awarded} Pts
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mb-3">
                        Category: <span className="text-slate-300">{cert.category || "Skill Development"}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                        <span className="truncate max-w-[200px]">Hash: {cert.record_hash?.slice(0, 16)}...</span>
                        <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          AICTE Approved
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FOOTER AUDIT NOTE */}
            <div className="text-center text-xs text-slate-400 py-6 border-t border-slate-800/80 space-y-1">
              <p>
                All records presented are verified against the All India Council for Technical Education (AICTE)
                cryptographic ledger under the National Education Policy 2020.
              </p>
              <p className="font-mono text-[10px] text-slate-400">
                DEPA Token: {token} • Validated on {new Date().toISOString()}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function VerifyPage(props: {
  params: Promise<{ token: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-xs font-mono text-slate-400 animate-pulse">
            Authenticating National Academic Depository proofs...
          </p>
        </div>
      }
    >
      <VerifyContent {...props} />
    </Suspense>
  );
}
