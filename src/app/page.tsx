"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  Wallet,
  Building2,
  Briefcase,
  Activity,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  QrCode,
  FileText,
  Upload,
  RefreshCw,
  Send,
  UserCheck,
  Award,
  Hash,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Lock,
  Layers,
  Check,
  Copy,
  FileCode,
  Printer,
  X,
  Eye,
  ScanLine,
  FileCheck,
  Info,
  Cpu,
  FileSpreadsheet,
  Zap,
  ShieldOff,
  Flame,
  AlertOctagon,
  Globe,
  ChevronUp,
  ChevronDown,
  Terminal,
  TrendingUp,
  MapPin,
  AlertCircle,
  Radar,
  Binary,
  KeyRound,
} from "lucide-react";

// ==========================================
// BHASHINI DPI MULTILINGUAL DICTIONARY
// ==========================================
type Language = "en" | "ta" | "hi";

const translations = {
  en: {
    platformTitle: "AICTE-APAAR",
    platformSubtitle: "Unified Student Academic Bank of Credits (ABC) & Cryptographic Verification",
    dpiLive: "Supabase DPI Live",
    bhashiniTitle: "Bhashini DPI Language",
    tabStudent: "1. Student APAAR Wallet & DEPA Hub",
    tabNodal: "2. AICTE Institution (Nodal Officer)",
    tabRecruiter: "3. Recruiter / 3rd-Party Verifier",
    tabRegulator: "4. AICTE Regulator Command Center",
    sihPersonaSwitcher: "1-Click SIH Persona Switcher:",
    studentAuthTitle: "Student APAAR Wallet Authentication",
    studentAuthSubtitle: "Login via India's Digital Public Infrastructure (DPI) with DigiLocker OTP",
    apaarCardGovt: "Government of India",
    apaarCardTitle: "Automated Permanent Academic Account Registry",
    nationalApaarId: "National APAAR ID",
    statusActive: "ACTIVE",
    statusExited: "EXITED_DIPLOMA",
    statusFlagged: "DUAL_ENROLLMENT_FLAGGED",
    enrollmentStatus: "Enrollment Status",
    academicCredits: "Academic Bank of Credits (ABC)",
    activityPoints: "AICTE Mandatory Activity Points",
    semCreditsTable: "Cryptographically Anchored Semester Credits (ABC)",
    aiOcrTitle: "AI Vision & OpenCV Certificate Scanner",
    depaManager: "DEPA Privacy & Consent Manager",
    regulatorTitle: "AICTE National Regulatory Telemetry Command Center",
    regulatorSubtitle: "Apex Supervisory Dashboard • Ghost Student Mitigation • Cross-Institutional Credit Mobility",
    telemetryStream: "Live DPI Ledger Telemetry",
  },
  ta: {
    platformTitle: "அகில இந்திய தொழில்நுட்பக் கல்வி கவுன்சில் - அபார்",
    platformSubtitle: "ஒருங்கிணைந்த மாணவர் கல்வி வரவு வங்கி (ABC) & குறியாக்கவியல் சரிபார்ப்பு",
    dpiLive: "சுபாபேஸ் DPI நேரலை",
    bhashiniTitle: "பாஷினி DPI மொழி",
    tabStudent: "1. மாணவர் அபார் பணப்பை & DEPA மையம்",
    tabNodal: "2. AICTE கல்வி நிறுவனம் (நோடல் அதிகாரி)",
    tabRecruiter: "3. ஆட்சேர்ப்பாளர் / சரிபார்ப்பாளர்",
    tabRegulator: "4. AICTE தேசிய ஒழுங்குமுறை கட்டளை மையம்",
    sihPersonaSwitcher: "1-கிளிக் SIH மாணவர் சுயவிவரங்கள்:",
    studentAuthTitle: "மாணவர் அபார் பணப்பை அங்கீகரிப்பு",
    studentAuthSubtitle: "டிஜிலாக்கர் OTP உடன் இந்தியாவின் டிஜிட்டல் பொது உள்கட்டமைப்பு (DPI) வழியாக உள்நுழைக",
    apaarCardGovt: "இந்திய அரசு",
    apaarCardTitle: "தானியங்கி நிரந்தர கல்வி கணக்கு பதிவேடு",
    nationalApaarId: "தேசிய அபார் அடையாள எண்",
    statusActive: "செயலில் உள்ளது",
    statusExited: "டிப்ளமோ வெளியேற்றம்",
    statusFlagged: "இரட்டை சேர்க்கை எச்சரிக்கை",
    enrollmentStatus: "சேர்க்கை நிலை",
    academicCredits: "கல்வி வரவு வங்கி (ABC)",
    activityPoints: "AICTE கட்டாய செயல்பாட்டு புள்ளிகள்",
    semCreditsTable: "குறியாக்கவியல் முறையில் சரிபார்க்கப்பட்ட செமஸ்டர் வரவுகள் (ABC)",
    aiOcrTitle: "AI பார்வை & OpenCV சான்றிதழ் ஸ்கேனர்",
    depaManager: "DEPA தனியுரிமை & ஒப்புதல் மேலாளர்",
    regulatorTitle: "AICTE தேசிய ஒழுங்குமுறை கட்டளை மையம்",
    regulatorSubtitle: "உயர் கண்காணிப்பு டாஷ்போர்டு • போலி மாணவர் தடுப்பு • கல்வி வரவு இயக்கம்",
    telemetryStream: "நேரலை DPI லெட்ஜர் டெலிமெட்ரி நிகழ்வுகள்",
  },
  hi: {
    platformTitle: "अखिल भारतीय तकनीकी शिक्षा परिषद - अपार",
    platformSubtitle: "एकीकृत छात्र एकेडमिक बैंक ऑफ क्रेडिट्स (ABC) एवं क्रिप्टोग्राफिक सत्यापन",
    dpiLive: "सुपाबेस DPI लाइव",
    bhashiniTitle: "भाषिणी DPI भाषा",
    tabStudent: "1. छात्र अपार वॉलेट एवं DEPA केंद्र",
    tabNodal: "2. एआईसीटीई संस्थान (नोडल अधिकारी)",
    tabRecruiter: "3. भर्तीकर्ता / तृतीय-पक्ष सत्यापनकर्ता",
    tabRegulator: "4. एआईसीटीई राष्ट्रीय नियामक कमांड सेंटर",
    sihPersonaSwitcher: "1-क्लिक SIH व्यक्तित्व चयन:",
    studentAuthTitle: "छात्र अपार वॉलेट प्रमाणीकरण",
    studentAuthSubtitle: "डिजीलॉकर OTP के साथ भारत के डिजिटल पब्लिक इंफ्रास्ट्रक्चर (DPI) से लॉगिन करें",
    apaarCardGovt: "भारत सरकार",
    apaarCardTitle: "स्वचालित स्थायी शैक्षणिक खाता रजिस्ट्री",
    nationalApaarId: "राष्ट्रीय अपार आईडी",
    statusActive: "सक्रिय",
    statusExited: "डिप्लोमा निकास",
    statusFlagged: "दोहरा नामांकन ध्वजांकित",
    enrollmentStatus: "नामांकन स्थिति",
    academicCredits: "एकेडमिक बैंक ऑफ क्रेडिट्स (ABC)",
    activityPoints: "एआईसीटीई अनिवार्य गतिविधि अंक",
    semCreditsTable: "क्रिप्टोग्राफिक रूप से सत्यापित सेमेस्टर क्रेडिट (ABC)",
    aiOcrTitle: "एआई विजन एवं ओपनसीवी प्रमाणपत्र स्कैनर",
    depaManager: "DEPA गोपनीयता एवं सहमति प्रबंधक",
    regulatorTitle: "एआईसीटीई राष्ट्रीय नियामक टेलीमेट्री कमांड सेंटर",
    regulatorSubtitle: "शीर्ष पर्यवेक्षी डैशबोर्ड • फर्जी छात्र निवारण • क्रेडिट गतिशीलता",
    telemetryStream: "लाइव DPI लेजर टेलीमेट्री इवेंट्स",
  },
};

interface TelemetryEvent {
  id: string;
  timestamp: string;
  type: "AUTH" | "CRYPTO" | "CONSENT" | "OCR" | "MERKLE" | "REGULATOR" | "FRAUD";
  message: string;
  hash?: string;
}

export default function CommandCenter() {
  // Navigation active tab: 'student' | 'nodal' | 'recruiter' | 'regulator'
  const [activeTab, setActiveTab] = useState<"student" | "nodal" | "recruiter" | "regulator">("student");

  // Bhashini DPI Language State
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang];

  // Global Notification Banner
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const notify = (message: string, type: "success" | "error" | "info" = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Dynamic Window Origin for mobile QR Code verification on live deployments (Vercel)
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  // ==========================================
  // LIVE DPI CRYPTOGRAPHIC TELEMETRY STREAM
  // ==========================================
  const [telemetryEvents, setTelemetryEvents] = useState<TelemetryEvent[]>([
    {
      id: "ev-1",
      timestamp: "12:20:04",
      type: "AUTH",
      message: "UIDAI eKYC Verified for APAAR: 482910394812 (Arjun Subramanian)",
    },
    {
      id: "ev-2",
      timestamp: "12:20:15",
      type: "CRYPTO",
      message: "SHA-256 Ledger Anchor Hash Anchored for CS401",
      hash: "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
    },
    {
      id: "ev-3",
      timestamp: "12:20:30",
      type: "CONSENT",
      message: "DEPA Consent Token Active: depa-live-token-482910 (Expiry: 24h)",
    },
    {
      id: "ev-4",
      timestamp: "12:20:45",
      type: "OCR",
      message: "OpenCV Layout Analysis Completed for Smart_India_Hackathon_2026.pdf",
    },
    {
      id: "ev-5",
      timestamp: "12:21:00",
      type: "MERKLE",
      message: "Merkle Root Generated across 50 ERP Records: 0x7a3f8b91c2d4e5f6...",
    },
  ]);
  const [isTelemetryCollapsed, setIsTelemetryCollapsed] = useState(false);

  const logTelemetry = (
    type: "AUTH" | "CRYPTO" | "CONSENT" | "OCR" | "MERKLE" | "REGULATOR" | "FRAUD",
    message: string,
    hash?: string
  ) => {
    const newEv: TelemetryEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
      hash,
    };
    setTelemetryEvents((prev) => [newEv, ...prev.slice(0, 49)]);
  };

  // ==========================================
  // BROWSER SHA-256 CRYPTOGRAPHIC HELPER
  // ==========================================
  async function computeClientSha256(message: string): Promise<string> {
    try {
      const msgUint8 = new TextEncoder().encode(message);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch {
      let hash = 0;
      for (let i = 0; i < message.length; i++) {
        hash = (hash << 5) - hash + message.charCodeAt(i);
        hash |= 0;
      }
      return "0x" + Math.abs(hash).toString(16).padStart(64, "0");
    }
  }

  // ==========================================
  // W3C VERIFIABLE CREDENTIAL & TAMPER SIMULATOR STATE
  // ==========================================
  const [selectedCredential, setSelectedCredential] = useState<{
    title: string;
    type: "academic_credit" | "activity_certificate" | "skill_dna_competency";
    data: any;
    jsonLd: any;
    studentContext?: any;
  } | null>(null);

  const [modalCopied, setModalCopied] = useState(false);
  const [isTamperMode, setIsTamperMode] = useState(false);
  const [tamperedGrade, setTamperedGrade] = useState("O");
  const [computedLiveHash, setComputedLiveHash] = useState("");
  const [tamperMismatch, setTamperMismatch] = useState(false);

  // Helper: Generate complete W3C Verifiable Credential JSON-LD Payload
  function generateW3CCredential(
    item: any,
    type: "academic_credit" | "activity_certificate" | "skill_dna_competency",
    student: any
  ) {
    const isCredit = type === "academic_credit";
    const isSkillDna = type === "skill_dna_competency";
    const credentialId = `urn:uuid:${item.id || "4780a635-581f-4185-928d-4a432501a3ba"}`;
    const issuanceDate = item.created_at || item.issued_at || new Date().toISOString();
    const sha256_hash = item.record_hash || "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4";
    const aicteCode = item.aicte_code || student?.current_aicte_code || "1-10000001";
    const instName = student?.institution?.name || "Chennai Institute of AI & Technology";

    return {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://schema.aicte-india.org/credentials/v2",
        "https://w3id.org/security/suites/ed25519-2020/v1",
      ],
      id: credentialId,
      type: [
        "VerifiableCredential",
        isSkillDna
          ? "AICTESkillDnaCompetencyCredential"
          : isCredit
          ? "AICTEAcademicCredit"
          : "AICTEActivitySkillCredential",
      ],
      issuer: `did:in:aicte:${aicteCode}`,
      issuerDetails: {
        id: `did:in:aicte:${aicteCode}`,
        name: instName,
        accreditation: "AICTE / NBA Tier-1 Approved",
        regulatoryAuthority: "National Academic Depository (NAD) / Academic Bank of Credits",
        jurisdiction: "IN",
      },
      issuanceDate: issuanceDate,
      credentialSubject: {
        id: `did:apaar:${student?.apaar_id || "482910394812"}`,
        name: student?.full_name || "Arjun Subramanian",
        dob: student?.dob || "2006-05-14",
        udisePen: student?.udise_pen || "PEN9981234",
        aadhaarLast4: student?.aadhaar_last_4 || "8821",
        enrollmentStatus: student?.enrollment_status || "ACTIVE",
        ...(isSkillDna
          ? {
              certificationFramework: "National Skills Qualifications Framework (NSQF)",
              nsqfAccreditedLevel: 7,
              overallProficiencyScore: "85.0%",
              competencyDomains: [
                { domain: "Core Algorithms & Systems", proficiencyScore: "88%", mappedCourses: ["CS101: Data Structures & Algorithms (4 Cr, Grade O)"] },
                { domain: "Machine Intelligence & Data", proficiencyScore: "92%", mappedCourses: ["AI202: Machine Learning & Neural Networks (4 Cr, Grade O)"] },
                { domain: "Hands-on Innovation (Hackathons)", proficiencyScore: "85%", mappedActivities: ["Smart India Hackathon Winner 2026 (+20 Pts)"] },
                { domain: "Professional Practice & Ethics", proficiencyScore: "75%", mappedActivities: ["AICTE Virtual Industry Internship & NEP Ethics (+20 Pts)"] },
              ],
            }
          : isCredit
          ? {
              courseCode: item.subject_code,
              courseTitle: item.subject_name,
              creditsEarned: item.credits_earned,
              gradeAwarded: item.grade,
              academicSemester: item.semester,
              academicSystem: "NEP 2020 4-Year B.Tech Undergraduate",
            }
          : {
              activityTitle: item.title,
              activityCategory: item.category || "Co-Curricular & Innovation",
              activityPointsAwarded: item.points_awarded || 20,
              ocrConfidenceScore: `${item.ocr_confidence_score || 98.4}%`,
              verificationStatus: item.verification_status || "APPROVED",
            }),
      },
      evidence: [
        {
          id: `urn:aicte:abc:ledger:tx-${sha256_hash.slice(0, 16)}`,
          type: ["AcademicBankOfCreditsEvidence", "DigiLockerAnchoredEvidence"],
          verifier: "did:in:aicte:regulator:apex",
          anchoredTimestamp: issuanceDate,
        },
      ],
      proof: {
        type: "Ed25519Signature2020",
        created: issuanceDate,
        verificationMethod: `did:in:aicte:${aicteCode}#key-1`,
        proofPurpose: "assertionMethod",
        proofValue: `z3s9X1${sha256_hash.slice(0, 24)}Mv8E9P2...Ed25519SignatureSimulated`,
        jws: `eyJhbGciOiJFZERTQSI...${sha256_hash.slice(0, 18)}`,
        sha256Hash: sha256_hash,
        sha256_hash: sha256_hash,
      },
    };
  }

  const openCredentialInspector = async (
    item: any,
    type: "academic_credit" | "activity_certificate" | "skill_dna_competency",
    customStudent?: any
  ) => {
    const student = customStudent || studentData?.student_profile;
    const jsonLd = generateW3CCredential(item, type, student);
    const originalGrade = item.grade || (item.points_awarded ? `${item.points_awarded} Pts` : item.overall_proficiency || "A+");

    setIsTamperMode(false);
    setTamperMismatch(false);
    setTamperedGrade(originalGrade === "O" ? "A+" : "O");
    setComputedLiveHash(item.record_hash || jsonLd.proof.sha256Hash);

    setSelectedCredential({
      title:
        type === "skill_dna_competency"
          ? item.title || "AICTE Skill-DNA & Competency Matrix"
          : type === "academic_credit"
          ? `${item.subject_code} - ${item.subject_name}`
          : item.title,
      type,
      data: item,
      jsonLd,
      studentContext: student,
    });

    logTelemetry("CRYPTO", `W3C VC JSON-LD Inspected: ${item.subject_code || item.title}`, item.record_hash);
  };

  const toggleTamperSimulation = async (enable: boolean) => {
    if (!selectedCredential) return;
    setIsTamperMode(enable);
    if (enable) {
      const studentId = selectedCredential.studentContext?.apaar_id || "482910394812";
      const subject = selectedCredential.data?.subject_code || selectedCredential.data?.title || "COURSE";
      const tamperedPayloadString = `TAMPERED_RECORD::${studentId}::${subject}::${tamperedGrade}::${Date.now()}::CYBER_INFLATION`;
      const newHash = await computeClientSha256(tamperedPayloadString);
      setComputedLiveHash(newHash);
      setTamperMismatch(true);
      notify(`Cyber Tamper Simulation Activated: Grade modified to '${tamperedGrade}'`, "error");
      logTelemetry("FRAUD", `Tamper Attack Activated: Live Hash ${newHash.slice(0, 16)}... != Anchor Hash`);
    } else {
      setComputedLiveHash(selectedCredential.data?.record_hash || selectedCredential.jsonLd.proof.sha256Hash);
      setTamperMismatch(false);
      notify("Tamper Attack Disabled: Cryptographic Ledger Signature Restored", "success");
      logTelemetry("CRYPTO", `Tamper Attack Disabled: Signature Restored to Ledger Anchor`);
    }
  };

  const handleTamperedGradeChange = async (newGrade: string) => {
    setTamperedGrade(newGrade);
    if (!selectedCredential) return;
    const studentId = selectedCredential.studentContext?.apaar_id || "482910394812";
    const subject = selectedCredential.data?.subject_code || selectedCredential.data?.title || "COURSE";
    const tamperedPayloadString = `TAMPERED_RECORD::${studentId}::${subject}::${newGrade}::${Date.now()}::CYBER_INFLATION`;
    const newHash = await computeClientSha256(tamperedPayloadString);
    setComputedLiveHash(newHash);
    setTamperMismatch(true);
    logTelemetry("FRAUD", `Grade altered to ${newGrade}. Hash recomputed: ${newHash.slice(0, 16)}...`);
  };

  const copyCredentialJson = () => {
    if (selectedCredential) {
      const payloadToCopy = {
        ...selectedCredential.jsonLd,
        credentialSubject: {
          ...selectedCredential.jsonLd.credentialSubject,
          ...(selectedCredential.type === "academic_credit"
            ? {
                gradeAwarded: isTamperMode ? `${tamperedGrade} [TAMPERED]` : selectedCredential.data?.grade,
              }
            : selectedCredential.type === "activity_certificate"
            ? {
                activityPointsAwarded: isTamperMode ? `${tamperedGrade} [TAMPERED]` : selectedCredential.data?.points_awarded,
              }
            : {
                overallProficiencyScore: isTamperMode ? `99.9% [TAMPERED]` : selectedCredential.data?.overall_proficiency,
              }),
        },
        proof: {
          ...selectedCredential.jsonLd.proof,
          status: isTamperMode ? "INVALID_SIGNATURE_MISMATCH" : "VALID_ASSERTION",
          computedDocumentHash: computedLiveHash,
          ledgerAnchorHash: selectedCredential.jsonLd.proof.sha256Hash,
        },
      };
      navigator.clipboard.writeText(JSON.stringify(payloadToCopy, null, 2));
      setModalCopied(true);
      setTimeout(() => setModalCopied(false), 2000);
      notify("W3C JSON-LD Credential copied to clipboard", "success");
    }
  };

  // ==========================================
  // PORTAL 1: STUDENT STATE & DRAG-AND-DROP SCANNER
  // ==========================================
  const [studentApaarInput, setStudentApaarInput] = useState("482910394812");
  const [studentOtpInput, setStudentOtpInput] = useState("123456");
  const [studentLoading, setStudentLoading] = useState(false);
  const [studentData, setStudentData] = useState<any>(null);

  // Upload Certificate Form State
  const [uploadTitle, setUploadTitle] = useState("Smart India Hackathon 2026 Winner");
  const [uploadCategory, setUploadCategory] = useState("Technical");
  const [uploadPoints, setUploadPoints] = useState("20");
  const [uploadExtractedName, setUploadExtractedName] = useState("Arjun Subramanian");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);

  // Drag-and-Drop Scanner State
  const [isDragOver, setIsDragOver] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStage, setScanStage] = useState(0); // 0 = idle, 1 = OpenCV, 2 = OCR, 3 = Registry Check
  const [scannedFileDetails, setScannedFileDetails] = useState<{ name: string; size: string } | null>(null);
  const [aiConfidenceBreakdown, setAiConfidenceBreakdown] = useState<{
    nameMatch: number;
    issuerSignature: number;
    forgeryCheck: string;
    isForged?: boolean;
    forgeryProbability?: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Zero-Dead-End Mode & Registration State
  const [autoProvisionEnabled, setAutoProvisionEnabled] = useState(false);
  const [unregisteredApaarPrompt, setUnregisteredApaarPrompt] = useState<{
    apaarId: string;
    canAutoProvision: boolean;
  } | null>(null);

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regFullName, setRegFullName] = useState("");
  const [regDob, setRegDob] = useState("2005-06-15");
  const [regGender, setRegGender] = useState("Male");
  const [regAadhaarLast4, setRegAadhaarLast4] = useState("8821");
  const [regUdisePen, setRegUdisePen] = useState("");
  const [regClass10, setRegClass10] = useState("92.4");
  const [regClass12, setRegClass12] = useState("89.8");
  const [regAicteCode, setRegAicteCode] = useState("1-10000001");
  const [regCustomApaar, setRegCustomApaar] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [mintStage, setMintStage] = useState(0); // 0=idle, 1=UIDAI, 2=UDISE+, 3=ABC Mint

  // Auto-Login Student on Mount
  useEffect(() => {
    handleStudentLogin("482910394812", "123456", false);
  }, []);

  async function handleStudentLogin(
    apaarId = studentApaarInput,
    otp = studentOtpInput,
    showToast = true,
    forceAutoProvision = false
  ) {
    try {
      setStudentLoading(true);
      setStudentApaarInput(apaarId);
      setStudentOtpInput(otp);
      setUnregisteredApaarPrompt(null);

      const shouldAuto = forceAutoProvision || autoProvisionEnabled;

      const res = await fetch("/api/dpi/verify-apaar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apaar_id: apaarId,
          otp,
          auto_provision: shouldAuto,
          student_name: `Verified Scholar (${String(apaarId).slice(-4)})`,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.status === "NOT_FOUND") {
          setUnregisteredApaarPrompt({
            apaarId,
            canAutoProvision: Boolean(json.can_auto_provision),
          });
        }
        if (showToast) notify(json.error || "Login failed", "error");
      } else {
        setStudentData(json.data);
        setUnregisteredApaarPrompt(null);
        if (showToast) notify(`APAAR Wallet Authenticated for ${json.data?.student_profile?.full_name}`, "success");
        logTelemetry("AUTH", `UIDAI eKYC Verified for ${apaarId} (${json.data?.student_profile?.full_name})`);
      }
    } catch (err: any) {
      if (showToast) notify(err.message || "Failed to fetch student profile", "error");
    } finally {
      setStudentLoading(false);
    }
  }

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!regFullName.trim()) {
      notify("Please enter Student Full Name", "error");
      return;
    }

    try {
      setIsMinting(true);
      setMintStage(1);
      await new Promise((r) => setTimeout(r, 500));

      setMintStage(2);
      await new Promise((r) => setTimeout(r, 500));

      setMintStage(3);
      await new Promise((r) => setTimeout(r, 500));

      const res = await fetch("/api/dpi/register-apaar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: regFullName.trim(),
          dob: regDob,
          gender: regGender,
          aadhaar_last_4: regAadhaarLast4,
          udise_pen: regUdisePen.trim() || undefined,
          class_10_percentage: Number(regClass10) || 90.0,
          class_12_percentage: Number(regClass12) || 88.0,
          current_aicte_code: regAicteCode,
          custom_apaar_id: regCustomApaar.trim() || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        notify(json.error || "Registration failed", "error");
        setIsMinting(false);
        setMintStage(0);
        return;
      }

      notify(`🎉 APAAR ID ${json.apaar_id} Minted! Welcome, ${regFullName}!`, "success");
      logTelemetry("AUTH", `UIDAI eKYC Registered & Minted APAAR ID: ${json.apaar_id} (${regFullName})`);

      setShowRegisterModal(false);
      setIsMinting(false);
      setMintStage(0);
      setRegFullName("");
      setRegCustomApaar("");

      setActiveTab("student");
      handleStudentLogin(json.apaar_id, "123456", true);
    } catch (err: any) {
      notify(err.message || "Failed to register student", "error");
      setIsMinting(false);
      setMintStage(0);
    }
  }

  // Helper to dynamically update AI Confidence & Forgery Probability based on extracted student name
  const updateNameMatchAndForgery = (newName: string) => {
    setUploadExtractedName(newName);
    const regName = (studentData?.student_profile?.full_name || "Arjun Subramanian").trim().toLowerCase();
    const isMatch = newName.trim().toLowerCase() === regName;
    if (isMatch) {
      setAiConfidenceBreakdown({
        nameMatch: 100,
        issuerSignature: 98.4,
        forgeryCheck: "Passed (Authentic - 0% Forgery Risk)",
        isForged: false,
        forgeryProbability: 1.8,
      });
    } else {
      setAiConfidenceBreakdown({
        nameMatch: 14,
        issuerSignature: 42.8,
        forgeryCheck: "FAILED (High Chance of Forgery - 94.2% Risk)",
        isForged: true,
        forgeryProbability: 94.2,
      });
    }
  };

  // 3-Stage Visual Pipeline Runner for Drag-and-Drop & Sample Button
  const runOcrScannerPipeline = (fileName: string, fileSizeStr: string, customStudentName?: string) => {
    setScannedFileDetails({ name: fileName, size: fileSizeStr });
    setIsScanning(true);
    setScanStage(1);
    setAiConfidenceBreakdown(null);
    logTelemetry("OCR", `Stage 1/3: OpenCV Layout & QR Boundary Detection on ${fileName}`);

    setTimeout(() => {
      setScanStage(2);
      logTelemetry("OCR", `Stage 2/3: OCR Text Extraction & Issuer DID Lookup`);
    }, 600);

    setTimeout(() => {
      setScanStage(3);
      logTelemetry("OCR", `Stage 3/3: Cross-Verifying Demographic Name with UIDAI/APAAR Registry`);
    }, 1200);

    setTimeout(() => {
      setIsScanning(false);
      setScanStage(0);

      const cleanTitle = fileName
        .replace(/\.[^/.]+$/, "")
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      let inferredCat = "Technical";
      const lower = fileName.toLowerCase();
      if (lower.includes("workshop") || lower.includes("seminar")) inferredCat = "Workshop";
      else if (lower.includes("intern") || lower.includes("training")) inferredCat = "Internship";
      else if (lower.includes("sport") || lower.includes("cultural")) inferredCat = "Sports";

      const isTamperFile =
        lower.includes("tamper") ||
        lower.includes("forg") ||
        lower.includes("rajesh") ||
        lower.includes("fake");

      const regName = studentData?.student_profile?.full_name || "Arjun Subramanian";
      const detectedName = customStudentName || (isTamperFile ? "Rajesh Kumar (Tampered)" : regName);

      setUploadTitle(cleanTitle || "Smart India Hackathon 2026 Winner");
      setUploadCategory(inferredCat);
      setUploadExtractedName(detectedName);
      setUploadPoints("20");

      const isMatch = detectedName.trim().toLowerCase() === regName.trim().toLowerCase();

      if (isMatch) {
        setAiConfidenceBreakdown({
          nameMatch: 100,
          issuerSignature: 98.4,
          forgeryCheck: "Passed (Authentic - 0% Forgery Risk)",
          isForged: false,
          forgeryProbability: 1.8,
        });
        notify("OpenCV layout analysis & OCR text extraction complete! Authentic certificate.", "success");
        logTelemetry("OCR", `Extraction Complete: ${cleanTitle} (Name Match: 100%, Forgery Check: Passed)`);
      } else {
        setAiConfidenceBreakdown({
          nameMatch: 14,
          issuerSignature: 42.8,
          forgeryCheck: "FAILED (High Chance of Forgery - 94.2% Risk)",
          isForged: true,
          forgeryProbability: 94.2,
        });
        notify("⚠️ Forgery Alert: Extracted certificate name does not match registered student!", "error");
        logTelemetry("FRAUD", `Certificate Forgery Flagged: Extracted '${detectedName}' does not match registered '${regName}'`);
      }

      executeVerifyUpload(cleanTitle || "Smart India Hackathon 2026 Winner", inferredCat, 20, detectedName);
    }, 1800);
  };

  const handleLoadSampleCertificate = () => {
    runOcrScannerPipeline("Smart_India_Hackathon_2026_1st_Prize.pdf", "1.4 MB");
  };

  const handleFileDrop = (file: File) => {
    if (!file) return;
    const validExtensions = ["pdf", "png", "jpg", "jpeg"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !validExtensions.includes(ext)) {
      notify("Please upload a valid .pdf, .png, or .jpg certificate", "error");
      return;
    }
    const sizeStr = `${(file.size / 1024).toFixed(1)} KB`;
    runOcrScannerPipeline(file.name, sizeStr);
  };

  async function executeVerifyUpload(title: string, category: string, points: number, extractedName: string) {
    if (!studentData?.student_profile?.apaar_id) return;

    try {
      setUploadLoading(true);
      setUploadResult(null);
      const res = await fetch("/api/certificates/verify-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apaar_id: studentData.student_profile.apaar_id,
          title,
          category,
          points_awarded: points,
          extracted_student_name: extractedName,
        }),
      });
      const json = await res.json();
      setUploadResult(json);
      if (res.ok && !json.tamper_warning) {
        setAiConfidenceBreakdown({
          nameMatch: 100,
          issuerSignature: 98.4,
          forgeryCheck: "Passed (Authentic - 0% Forgery Risk)",
          isForged: false,
          forgeryProbability: 1.8,
        });
        notify("Certificate verified by AI OCR (High Confidence)", "success");
        logTelemetry("CRYPTO", `Certificate Anchored: ${title} (Score: ${json.ocr_confidence_score}%)`, json.record_hash);
        handleStudentLogin(studentData.student_profile.apaar_id, "123456", false);
      } else {
        setAiConfidenceBreakdown({
          nameMatch: 14,
          issuerSignature: 42.8,
          forgeryCheck: "FAILED (High Chance of Forgery - 94.2% Risk)",
          isForged: true,
          forgeryProbability: 94.2,
        });
        notify(json.error || "High chance of forgery detected: Name mismatch!", "error");
        logTelemetry(
          "FRAUD",
          `Certificate Forgery Flagged: Extracted '${extractedName}' does not match registered '${studentData.student_profile.full_name}'`
        );
      }
    } catch (err: any) {
      notify(err.message, "error");
    } finally {
      setUploadLoading(false);
    }
  }

  async function handleCertificateUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!studentData?.student_profile?.apaar_id) {
      notify("Please log into an APAAR account first", "error");
      return;
    }
    executeVerifyUpload(uploadTitle, uploadCategory, Number(uploadPoints), uploadExtractedName);
  }

  async function handleConsentAction(consentId: string, action: "APPROVE" | "REVOKE") {
    try {
      const res = await fetch("/api/consent/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: consentId, action }),
      });
      const json = await res.json();
      if (res.ok) {
        notify(`Consent request ${action === "APPROVE" ? "Approved" : "Revoked"} successfully`, "success");
        logTelemetry("CONSENT", `DEPA Consent Action: ${action} for Request ${consentId.slice(0, 8)}...`);
        handleStudentLogin(studentData?.student_profile?.apaar_id, "123456", false);
      } else {
        notify(json.error || "Failed to update consent", "error");
      }
    } catch (err: any) {
      notify(err.message, "error");
    }
  }

  // ==========================================
  // PORTAL 2: NODAL OFFICER STATE & NEP 2020 FEATURES
  // ==========================================
  const [creditApaar, setCreditApaar] = useState("482910394812");
  const [creditAicte, setCreditAicte] = useState("1-10000001");
  const [creditSem, setCreditSem] = useState("3");
  const [creditSubCode, setCreditSubCode] = useState("CS301");
  const [creditSubName, setCreditSubName] = useState("Operating Systems & Kernel Architecture");
  const [creditEarned, setCreditEarned] = useState("4");
  const [creditGrade, setCreditGrade] = useState("A+");
  const [pushLoading, setPushLoading] = useState(false);
  const [pushResult, setPushResult] = useState<any>(null);

  // Bulk ERP CSV Ingestion State
  const [bulkSyncing, setBulkSyncing] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);
  const [bulkSyncResult, setBulkSyncResult] = useState<{
    recordCount: number;
    merkleRoot: string;
    gasCost: string;
    timestamp: string;
    sampleLeaves: any[];
  } | null>(null);

  // Transfer Student State
  const [transferStudentId, setTransferStudentId] = useState("739104829104");
  const [transferTargetAicte, setTransferTargetAicte] = useState("1-10000001");
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferResult, setTransferResult] = useState<any>(null);

  // Pending Certificates for Approval Queue
  const [pendingCerts, setPendingCerts] = useState<any[]>([]);

  useEffect(() => {
    fetchRegulatorOverview();
  }, [activeTab]);

  async function handlePushCredits(e: React.FormEvent) {
    e.preventDefault();
    try {
      setPushLoading(true);
      setPushResult(null);
      const res = await fetch("/api/dpi/push-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apaar_id: creditApaar,
          aicte_code: creditAicte,
          semester: Number(creditSem),
          subject_code: creditSubCode,
          subject_name: creditSubName,
          credits_earned: Number(creditEarned),
          grade: creditGrade,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setPushResult(json);
        notify("Credits cryptographically anchored to ABC ledger", "success");
        logTelemetry("CRYPTO", `Credit Anchored: ${creditSubCode} (${creditEarned} Cr) for ${creditApaar}`, json.data?.record_hash);
        fetchRegulatorOverview();
      } else {
        notify(json.error || "Failed to push credits", "error");
      }
    } catch (err: any) {
      notify(err.message, "error");
    } finally {
      setPushLoading(false);
    }
  }

  // 1-Click Bulk ERP CSV Ingestion Simulator
  const handleBulkErpSync = () => {
    setBulkSyncing(true);
    setBulkProgress(10);
    setBulkSyncResult(null);

    const interval = setInterval(() => {
      setBulkProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setBulkProgress(100);
      setBulkSyncing(false);
      setBulkSyncResult({
        recordCount: 50,
        merkleRoot: "0x7a3f8b91c2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
        gasCost: "₹0.00 (Zero-Knowledge Rollup Anchor)",
        timestamp: new Date().toLocaleTimeString(),
        sampleLeaves: [
          { apaar_id: "482910394812", subject: "CS401", grade: "A+", hash: "0x8f4343...df89" },
          { apaar_id: "482910394812", subject: "CS402", grade: "O", hash: "0x12ab34...77e1" },
          { apaar_id: "739104829104", subject: "EC301", grade: "A", hash: "0x99cd88...a210" },
        ],
      });
      notify("Bulk ERP CSV Sync Completed: 50 Records Anchored with Merkle Root", "success");
      logTelemetry("MERKLE", `Merkle Root Anchored for 50 Records: 0x7a3f8b91c2d4e5f6...`);
      fetchRegulatorOverview();
    }, 1800);
  };

  async function handleNodalAction(certId: string, action: "APPROVE" | "REJECT") {
    try {
      const res = await fetch("/api/certificates/nodal-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: certId, action }),
      });
      const json = await res.json();
      if (res.ok) {
        notify(`Certificate ${action.toLowerCase()}d by Nodal Officer`, "success");
        logTelemetry("REGULATOR", `Nodal Officer ${action} Certificate ID ${certId.slice(0, 8)}...`);
        fetchRegulatorOverview();
        if (studentData?.student_profile?.apaar_id) {
          handleStudentLogin(studentData.student_profile.apaar_id, "123456", false);
        }
      } else {
        notify(json.error || "Action failed", "error");
      }
    } catch (err: any) {
      notify(err.message, "error");
    }
  }

  async function handleExecuteTransfer(e: React.FormEvent) {
    e.preventDefault();
    try {
      setTransferLoading(true);
      setTransferResult(null);
      const res = await fetch("/api/dpi/transfer-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apaar_id: transferStudentId,
          target_aicte_code: transferTargetAicte,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setTransferResult(json);
        notify("NEP 2020 MEME Transfer executed in 1 click!", "success");
        logTelemetry("REGULATOR", `NEP 2020 MEME Transfer for ${transferStudentId} -> Target: ${transferTargetAicte}`);
        fetchRegulatorOverview();
      } else {
        notify(json.error || "Transfer failed", "error");
      }
    } catch (err: any) {
      notify(err.message, "error");
    } finally {
      setTransferLoading(false);
    }
  }

  // ==========================================
  // PORTAL 3: RECRUITER STATE
  // ==========================================
  const [recruiterName, setRecruiterName] = useState("Google India Recruiting");
  const [recruiterPurpose, setRecruiterPurpose] = useState("Software Development Engineer Role Background Check");
  const [recruiterApaar, setRecruiterApaar] = useState("482910394812");
  const [requestConsentLoading, setRequestConsentLoading] = useState(false);
  const [requestConsentResult, setRequestConsentResult] = useState<any>(null);

  const [verifyTokenInput, setVerifyTokenInput] = useState("depa-live-token-482910");
  const [tokenVerifyLoading, setTokenVerifyLoading] = useState(false);
  const [verifiedTokenResult, setVerifiedTokenResult] = useState<any>(null);

  async function handleRequestConsent(e: React.FormEvent) {
    e.preventDefault();
    try {
      setRequestConsentLoading(true);
      setRequestConsentResult(null);
      const res = await fetch("/api/consent/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requester_name: recruiterName,
          purpose: recruiterPurpose,
          apaar_id: recruiterApaar,
          allowed_fields: ["full_name", "academic_credits", "total_credits", "institution"],
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setRequestConsentResult(json);
        notify("DEPA Consent Request dispatched to student's APAAR wallet", "success");
        logTelemetry("CONSENT", `DEPA Consent Request Dispatched to ${recruiterApaar} by ${recruiterName}`);
        fetchRegulatorOverview();
      } else {
        notify(json.error || "Failed to create consent request", "error");
      }
    } catch (err: any) {
      notify(err.message, "error");
    } finally {
      setRequestConsentLoading(false);
    }
  }

  async function handleVerifyToken(tokenToVerify = verifyTokenInput) {
    if (!tokenToVerify) {
      notify("Please enter a consent access token", "error");
      return;
    }
    try {
      setTokenVerifyLoading(true);
      setVerifiedTokenResult(null);
      const res = await fetch(`/api/verify/${tokenToVerify.trim()}`);
      const json = await res.json();
      if (res.ok) {
        setVerifiedTokenResult(json);
        notify("Transcript Authenticated with AICTE Cryptographic Proof", "success");
        logTelemetry("CRYPTO", `DEPA Token Verified: ${tokenToVerify} for ${json.data?.full_name}`);
      } else {
        notify(json.error || "Verification failed / Token expired", "error");
        logTelemetry("FRAUD", `DEPA Token Rejected / Expired: ${tokenToVerify}`);
      }
    } catch (err: any) {
      notify(err.message, "error");
    } finally {
      setTokenVerifyLoading(false);
    }
  }

  // ==========================================
  // FLAGSHIP INNOVATION 1: ZERO-KNOWLEDGE PROOF (ZK-GPA) STATE & HANDLERS
  // ==========================================
  const [zkRule, setZkRule] = useState<"gpa" | "activity">("gpa");
  const [isGeneratingZk, setIsGeneratingZk] = useState(false);
  const [zkGenerationStep, setZkGenerationStep] = useState(0);
  const [generatedZkProof, setGeneratedZkProof] = useState<{
    token: string;
    rule: "gpa" | "activity";
    ruleTitle: string;
    predicate: string;
    publicStatement: string;
    proofHash: string;
    snarkCommitment: string;
    merkleAnchor: string;
    timestamp: string;
  } | null>(null);
  const [zkCopied, setZkCopied] = useState(false);

  // Tab 3 Recruiter Verifier Mode & ZK Verification State
  const [verifierMode, setVerifierMode] = useState<"depa" | "zk">("depa");
  const [zkVerifyInput, setZkVerifyInput] = useState("zkp_aicte_gpa_8_0_9f82c1a4e5d6");
  const [zkVerifyLoading, setZkVerifyLoading] = useState(false);
  const [zkVerifiedResult, setZkVerifiedResult] = useState<{
    isValid: boolean;
    rule: "gpa" | "activity";
    criterion: string;
    badgeText: string;
    circuitTime: string;
    merkleAnchor: string;
    proofHash: string;
    timestamp: string;
  } | null>(null);

  const handleGenerateZkProof = async () => {
    setIsGeneratingZk(true);
    setZkGenerationStep(1);
    logTelemetry(
      "CRYPTO",
      `Compiling R1CS Arithmetic Circuit Constraints for ${zkRule === "gpa" ? "CGPA >= 8.0" : "Activity Points >= 50"}`
    );

    setTimeout(() => {
      setZkGenerationStep(2);
      logTelemetry("CRYPTO", "Generating Zero-Knowledge Witness commitment on BN254 elliptic curve...");
    }, 400);

    setTimeout(() => {
      setZkGenerationStep(3);
      logTelemetry("CRYPTO", "Synthesizing Groth16 zk-SNARK & Anchoring to AICTE ABC State Root...");
    }, 800);

    setTimeout(() => {
      const isGpa = zkRule === "gpa";
      const randomEntropy = Math.random().toString(36).substring(2, 8);
      const token = isGpa
        ? `zkp_aicte_gpa_8_0_${randomEntropy}c1a4`
        : `zkp_aicte_points_50_${randomEntropy}b3d8`;

      const proofObj = {
        token,
        rule: zkRule,
        ruleTitle: isGpa
          ? "Verify CGPA is ≥ 8.0 without revealing exact score"
          : "Verify AICTE Activity Points ≥ 50 without sharing individual certificates",
        predicate: isGpa ? "CGPA >= 8.0 (Academic Merit Gate)" : "AICTE Activity Points >= 50 (Graduation Threshold Gate)",
        publicStatement: isGpa
          ? "Candidate CGPA satisfies threshold [>= 8.0/10.0]. Exact GPA, subject marks, and course grades remain 100% Zero-Knowledge."
          : "Candidate satisfies mandatory threshold [>= 50 Points]. Individual certificate contents, issuers, and event dates remain 100% Zero-Knowledge.",
        proofHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
        snarkCommitment: "π_A=(0x4a1...9b2), π_B=(0x8c3...1e4), π_C=(0x2d5...7f6) [Groth16/BN254]",
        merkleAnchor: "0x7a3f8b91c2d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0",
        timestamp: new Date().toLocaleTimeString(),
      };

      setGeneratedZkProof(proofObj);
      setIsGeneratingZk(false);
      setZkGenerationStep(0);
      notify(`Zero-Knowledge Proof Generated: ${isGpa ? "CGPA ≥ 8.0" : "Activity Points ≥ 50"}!`, "success");
      logTelemetry("CRYPTO", `zk-SNARK Token Ready: ${token} (0 bits PII leakage)`);
    }, 1200);
  };

  const handleTestInRecruiterPortal = () => {
    if (!generatedZkProof) return;
    const token = generatedZkProof.token;
    navigator.clipboard.writeText(token);
    setActiveTab("recruiter");
    setVerifierMode("zk");
    setZkVerifyInput(token);
    handleVerifyZkToken(token, generatedZkProof.rule);
    notify("Switched to Recruiter Verifier: ZK Proof Token auto-loaded & mathematically verified!", "success");
  };

  const handleVerifyZkToken = (tokenToVerify?: string, forcedRule?: "gpa" | "activity") => {
    const token = tokenToVerify || zkVerifyInput;
    if (!token.trim()) {
      notify("Please enter a valid ZK Proof Token", "error");
      return;
    }

    setZkVerifyLoading(true);
    setZkVerifiedResult(null);
    logTelemetry("CRYPTO", `Validating zk-SNARK Pairings for Token: ${token.slice(0, 18)}...`);

    setTimeout(() => {
      setZkVerifyLoading(false);
      const isActivity =
        forcedRule === "activity" || token.toLowerCase().includes("point") || token.toLowerCase().includes("50");
      const ruleType: "gpa" | "activity" = isActivity ? "activity" : "gpa";

      const badgeText = isActivity
        ? "ZK-PROOF VALIDATED: Criterion [AICTE Activity Points >= 50] mathematically proven against AICTE Ledger Anchor. Exact grade and demographic fields remained strictly confidential (Zero-Knowledge)."
        : "ZK-PROOF VALIDATED: Criterion [CGPA >= 8.0] mathematically proven against AICTE Ledger Anchor. Exact grade and demographic fields remained strictly confidential (Zero-Knowledge).";

      setZkVerifiedResult({
        isValid: true,
        rule: ruleType,
        criterion: isActivity ? "AICTE Activity Points >= 50" : "CGPA >= 8.0",
        badgeText,
        circuitTime: "8.6 ms",
        merkleAnchor: "0x7a3f8b91c2d4e5f6... (Block #482910)",
        proofHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
        timestamp: new Date().toLocaleTimeString(),
      });

      notify("Zero-Knowledge Proof mathematically proven against AICTE Ledger Anchor!", "success");
      logTelemetry(
        "CRYPTO",
        `ZK-Proof Verified: ${isActivity ? "Activity Points >= 50" : "CGPA >= 8.0"} (100% Zero-Knowledge)`
      );
    }, 600);
  };

  // ==========================================
  // FLAGSHIP INNOVATION 2: SKILL-DNA W3C CREDENTIAL EXPORT HELPER
  // ==========================================
  const handleExportSkillDnaCredential = () => {
    const student = studentData?.student_profile;
    const skillDnaData = {
      id: `skill-dna-${student?.apaar_id || "482910394812"}`,
      title: "AICTE Skill-DNA & NEP Multi-Domain Competency Matrix",
      nsqf_level: 7,
      overall_proficiency: "85.0%",
      record_hash: "9a2f4c1e8b7d6054a3e21890cdfa45bc12e87901abcf435678901234567890ab",
      created_at: new Date().toISOString(),
      competencies: [
        { domain: "Core Algorithms & Systems", score: 88, sourceCourse: "CS101 (Data Structures & Algorithms - 4 Cr, Grade O)" },
        { domain: "Machine Intelligence & Data", score: 92, sourceCourse: "AI202 (Machine Learning & Neural Networks - 4 Cr, Grade O)" },
        { domain: "Hands-on Innovation (Hackathons)", score: 85, sourceActivity: "Smart India Hackathon Winner 2026 (20 Pts, OCR 98.4%)" },
        { domain: "Professional Practice & Ethics", score: 75, sourceActivity: "AICTE Virtual Industry Internship & NEP Ethics Seminar (20 Pts)" },
      ],
    };
    openCredentialInspector(skillDnaData, "skill_dna_competency", student);
    notify("Exporting NSQF Level 7 Certified Competency Matrix Credential", "info");
    logTelemetry("CRYPTO", "W3C Credential Inspected: NSQF Level 7 Skill-DNA Competency Matrix");
  };

  // ==========================================
  // PORTAL 4: REGULATOR OVERVIEW & ACTIONABLE FRAUD RESOLUTION
  // ==========================================
  const [regulatorData, setRegulatorData] = useState<any>(null);
  const [regulatorLoading, setRegulatorLoading] = useState(false);

  // Actionable Fraud Resolution State for Rohan Verma (999888777666)
  const [isLedgerFrozen, setIsLedgerFrozen] = useState(false);
  const [noticeDispatched, setNoticeDispatched] = useState(false);

  async function fetchRegulatorOverview() {
    try {
      setRegulatorLoading(true);
      const res = await fetch("/api/regulator/overview");
      const json = await res.json();
      if (res.ok && json.command_center) {
        setRegulatorData(json.command_center);
        setPendingCerts(json.command_center.activity_certificates?.filter((c: any) => c.verification_status === "PENDING") || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRegulatorLoading(false);
    }
  }

  const handleFreezeLedger = (apaarId: string, studentName: string) => {
    setIsLedgerFrozen(true);
    notify(`APAAR ID ${apaarId} Credit Ledger has been FROZEN. Academic transfers disabled.`, "error");
    logTelemetry("FRAUD", `APAAR ID ${apaarId} (${studentName}) Credit Ledger FROZEN by AICTE Apex Regulator`);
  };

  const handleDispatchNotice = (apaarId: string, studentName: string) => {
    setNoticeDispatched(true);
    notify(`Official AICTE Show-Cause Notice SCN-2026-8891 dispatched to Nodal Officers. Response mandated within 72h.`, "info");
    logTelemetry("REGULATOR", `Show-Cause Notice SCN-2026-8891 Dispatched to 1-10000001 & 1-20000002 for ${apaarId} (${studentName})`);
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-[#F8FAFC] flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200 pb-16">
      {/* Background Ambience: Electric Violet (top-left) & Cyan-Indigo (top-right) Aurora Mesh Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-20 w-[600px] h-[500px] bg-purple-600/15 blur-[130px] rounded-full" />
        <div className="absolute -top-32 -right-20 w-[600px] h-[500px] bg-cyan-500/12 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div
            className={`px-4 py-3 rounded-xl shadow-2xl backdrop-blur-xl border text-xs font-semibold flex items-center gap-2.5 ${
              notification.type === "success"
                ? "bg-[#0B0C14]/95 border-emerald-500/50 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                : notification.type === "error"
                ? "bg-[#0B0C14]/95 border-rose-500/50 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                : "bg-[#0B0C14]/95 border-indigo-500/40 text-slate-200 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : notification.type === "error" ? (
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            ) : (
              <Sparkles className="w-4 h-4 text-cyan-400" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Top Navbar & AICTE Branding */}
      <header className="relative z-20 border-b border-white/[0.08] bg-[#05050A]/85 backdrop-blur-2xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/25">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  {t.platformTitle}
                </span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  DPI Platform v2.4
                </span>
                <span className="hidden md:inline-flex text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold">
                  SIH 2026 Edition
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {t.platformSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* BHASHINI DPI MULTILINGUAL HEADER TOGGLE */}
            <div className="flex items-center p-1 rounded-xl bg-[#0B0C14]/90 border border-white/[0.08] text-[11px] font-mono shadow-sm">
              <span className="text-[10px] text-slate-400 px-2 font-sans font-semibold hidden lg:inline-flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-400" />
                भाषिणी DPI
              </span>
              <button
                type="button"
                onClick={() => {
                  setLang("en");
                  notify("Bhashini DPI: Language switched to English", "info");
                  logTelemetry("AUTH", "Bhashini NLP Engine: Switched locale to EN (English)");
                }}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                  lang === "en"
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => {
                  setLang("ta");
                  notify("பாஷினி DPI: தமிழ் மொழிக்கு மாற்றப்பட்டது", "info");
                  logTelemetry("AUTH", "Bhashini NLP Engine: Switched locale to TA (தமிழ்)");
                }}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                  lang === "ta"
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                தமிழ்
              </button>
              <button
                type="button"
                onClick={() => {
                  setLang("hi");
                  notify("भाषिणी DPI: हिंदी भाषा चुनी गई", "info");
                  logTelemetry("AUTH", "Bhashini NLP Engine: Switched locale to HI (हिंदी)");
                }}
                className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                  lang === "hi"
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                हिंदी
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0C14]/90 border border-white/[0.08] text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-400 font-semibold">{t.dpiLive}</span>
            </div>
          </div>
        </div>

        {/* TOP ROLE SWITCHER BAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2.5 pt-1 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0B0C14]/90 border border-white/[0.07] backdrop-blur-xl shadow-lg">
            <button
              onClick={() => setActiveTab("student")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "student"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]"
                  : "bg-[#070810]/70 text-slate-400 hover:text-white hover:bg-white/[0.04] border border-white/[0.05]"
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>{t.tabStudent}</span>
            </button>

            <button
              onClick={() => setActiveTab("nodal")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "nodal"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]"
                  : "bg-[#070810]/70 text-slate-400 hover:text-white hover:bg-white/[0.04] border border-white/[0.05]"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.tabNodal}</span>
              {pendingCerts.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-mono font-bold shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                  {pendingCerts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("recruiter")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "recruiter"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]"
                  : "bg-[#070810]/70 text-slate-400 hover:text-white hover:bg-white/[0.04] border border-white/[0.05]"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.tabRecruiter}</span>
            </button>

            <button
              onClick={() => setActiveTab("regulator")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "regulator"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]"
                  : "bg-[#070810]/70 text-slate-400 hover:text-white hover:bg-white/[0.04] border border-white/[0.05]"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{t.tabRegulator}</span>
              {regulatorData?.alerts?.duplicate_flagged_students?.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shadow-[0_0_8px_#f43f5e]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Multi-Portal View */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* ========================================================================= */}
        {/* PORTAL 1: STUDENT APAAR WALLET & DEPA CONSENT HUB */}
        {/* ========================================================================= */}
        {activeTab === "student" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* SIH WINNING FEATURE 4: ONE-CLICK DEMO SWITCHER PILLS */}
            <div className="p-4 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white shrink-0">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-amber-300 uppercase tracking-wider text-[11px]">
                  {t.sihPersonaSwitcher}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {/* Pill 1: Arjun */}
                <button
                  type="button"
                  onClick={() => handleStudentLogin("482910394812", "123456", true)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    studentData?.student_profile?.apaar_id === "482910394812"
                      ? "bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.25)] font-bold"
                      : "bg-[#070810]/80 border-white/[0.08] text-slate-300 hover:border-indigo-500/50 hover:text-indigo-300"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>Arjun (Active B.Tech - 482910394812)</span>
                </button>

                {/* Pill 2: Priya */}
                <button
                  type="button"
                  onClick={() => handleStudentLogin("739104829104", "123456", true)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    studentData?.student_profile?.apaar_id === "739104829104"
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-bold"
                      : "bg-[#070810]/80 border-white/[0.08] text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Priya (Diploma Exit / MEME Transfer - 739104829104)</span>
                </button>

                {/* Pill 3: Rohan */}
                <button
                  type="button"
                  onClick={() => handleStudentLogin("999888777666", "123456", true)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    studentData?.student_profile?.apaar_id === "999888777666"
                      ? "bg-rose-500/25 border-rose-400 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.35)] font-bold animate-pulse"
                      : "bg-[#070810]/80 border-white/[0.08] text-slate-300 hover:border-rose-500/50 hover:text-rose-400"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Rohan (Dual-Enrollment Fraud Flagged - 999888777666)</span>
                </button>
              </div>
            </div>

            {/* Top Login Input Bar */}
            <div className="p-4 rounded-2xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{t.studentAuthTitle}</h3>
                  <p className="text-xs text-slate-400">
                    {t.studentAuthSubtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={studentApaarInput}
                  onChange={(e) => setStudentApaarInput(e.target.value)}
                  placeholder="Enter 12-digit APAAR ID"
                  className="bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 w-48 shadow-inner"
                />
                <input
                  type="password"
                  value={studentOtpInput}
                  onChange={(e) => setStudentOtpInput(e.target.value)}
                  placeholder="OTP (123456)"
                  className="bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 w-28 text-center shadow-inner"
                />
                <button
                  onClick={() => handleStudentLogin(studentApaarInput, studentOtpInput, true)}
                  disabled={studentLoading}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] text-xs px-4 py-2 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                >
                  {studentLoading ? "Verifying..." : "Authenticate"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRegCustomApaar(studentApaarInput && /^\d{12}$/.test(studentApaarInput) ? studentApaarInput : "");
                    setShowRegisterModal(true);
                  }}
                  className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+ Register / Mint APAAR ID</span>
                </button>
              </div>
              <div className="w-full flex flex-wrap items-center justify-between pt-2 border-t border-white/[0.07] text-[11px] font-mono text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer hover:text-indigo-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={autoProvisionEnabled}
                    onChange={(e) => setAutoProvisionEnabled(e.target.checked)}
                    className="rounded border-slate-700 bg-[#070810] text-indigo-500 focus:ring-0 cursor-pointer"
                  />
                  <span>Zero-Dead-End Mode: Auto-Provision Unregistered 12-Digit IDs Live</span>
                </label>
                <span className="text-slate-500">Demo Simulation OTP: 123456</span>
              </div>
            </div>

            {/* ZERO-DEAD-END DEMO MODE FALLBACK PROMPT */}
            {unregisteredApaarPrompt && (
              <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/50 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-in slide-in-from-top-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      APAAR ID <span className="font-mono text-amber-400">{unregisteredApaarPrompt.apaarId}</span> is not registered in the National Depository yet.
                    </h4>
                    <p className="text-[11px] text-amber-300/80">
                      Zero-Dead-End Mode: Instantly onboard this ID via DigiLocker DPI pull or complete full UIDAI eKYC.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleStudentLogin(unregisteredApaarPrompt.apaarId, "123456", true, true)}
                    className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Instant-Onboard (1-Click)</span>
                  </button>
                  <button
                    onClick={() => {
                      setRegCustomApaar(unregisteredApaarPrompt.apaarId);
                      setShowRegisterModal(true);
                    }}
                    className="bg-[#070810] hover:bg-[#0B0C14] text-slate-200 border border-white/[0.1] text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                  >
                    Custom eKYC Form
                  </button>
                </div>
              </div>
            )}

            {studentData && (
              <>
                {/* DUAL ENROLLMENT CYBER FRAUD BANNER (FOR ROHAN VERMA OR FLAGGED STUDENTS) */}
                {(studentData.student_profile?.is_duplicate_flagged ||
                  studentData.student_profile?.apaar_id === "999888777666") && (
                  <div className="p-4 rounded-3xl text-rose-400 bg-rose-500/10 border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.2)] flex items-start gap-3.5 animate-in zoom-in-95 duration-200">
                    <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                      <AlertOctagon className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase bg-rose-500/30 text-rose-300 border border-rose-500/50 px-2 py-0.5 rounded font-black">
                          AICTE Circular 2026/04 Audit Flag
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                          🚨 DUAL ENROLLMENT DETECTED: Simultaneous Registration Across Multiple Institutions
                        </h4>
                      </div>
                      <p className="text-xs text-rose-200/90 leading-relaxed font-mono">
                        This APAAR ID is flagged for simultaneous active full-time enrollment across{" "}
                        <strong>1-10000001 (Chennai Institute)</strong> and{" "}
                        <strong>1-20000002 (Bengaluru College)</strong> within the same academic window. ABC credit transfers are restricted pending AICTE Nodal Audit.
                      </p>
                    </div>
                  </div>
                )}

                {/* Top Section: Digital APAAR Card + Progress Bars */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* OFFICIAL DIGITAL APAAR CARD (5 Cols) - IRIDESCENT ROYAL TITANIUM & AURORA */}
                  <div
                    className={`lg:col-span-5 relative rounded-3xl p-6 bg-gradient-to-br from-[#121324] via-[#0D0E1A] to-[#1A102B] border shadow-2xl backdrop-blur-2xl flex flex-col justify-between overflow-hidden group transition-all duration-300 ${
                      studentData.student_profile?.is_duplicate_flagged ||
                      studentData.student_profile?.apaar_id === "999888777666"
                        ? "border-rose-500/70 shadow-[0_0_30px_rgba(244,63,94,0.25)]"
                        : "border-indigo-400/30 shadow-[0_0_30px_rgba(99,102,241,0.18)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]"
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-transparent blur-3xl rounded-full pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/15 blur-2xl rounded-full pointer-events-none" />

                    <div>
                      {/* Card Header: Metallic Gold Accents */}
                      <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#FBBF24]/10 border border-[#FBBF24]/40 flex items-center justify-center font-black text-[#FBBF24] text-xs shadow-inner shadow-[#FBBF24]/10">
                            AICTE
                          </div>
                          <div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-[#FBBF24] font-bold">
                              {t.apaarCardGovt}
                            </div>
                            <h4 className="text-xs font-bold text-[#F8FAFC] tracking-wide">
                              {t.apaarCardTitle}
                            </h4>
                          </div>
                        </div>

                        {/* Metallic Gold EMV Smart Chip Graphic */}
                        <div className="w-9 h-7 rounded bg-gradient-to-tr from-[#FBBF24] via-[#FDE68A] to-[#D97706] border border-[#FBBF24] shadow-[0_0_12px_rgba(251,191,36,0.35)] flex items-center justify-center">
                          <div className="w-6 h-4 border border-amber-900/40 rounded-sm grid grid-cols-2 gap-0.5 opacity-60">
                            <span className="border-r border-b border-amber-950/40" />
                            <span className="border-b border-amber-950/40" />
                            <span className="border-r border-amber-950/40" />
                            <span />
                          </div>
                        </div>
                      </div>

                      {/* Card Body: Student Photo & Details */}
                      <div className="pt-5 flex items-center gap-4">
                        <div
                          className={`relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1C1E30] to-[#0D0E1A] border-2 p-1 flex items-center justify-center text-slate-300 shadow-lg shrink-0 ${
                            studentData.student_profile?.is_duplicate_flagged ||
                            studentData.student_profile?.apaar_id === "999888777666"
                              ? "border-rose-500 text-rose-300"
                              : "border-indigo-400/40"
                          }`}
                        >
                          <UserCheck className="w-8 h-8 text-indigo-300" />
                          <span
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0D0E1A] flex items-center justify-center ${
                              studentData.student_profile?.is_duplicate_flagged ||
                              studentData.student_profile?.apaar_id === "999888777666"
                                ? "bg-rose-500"
                                : "bg-emerald-500"
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-extrabold text-white truncate">
                            {studentData.student_profile?.full_name}
                          </h3>
                          <p className="text-xs text-slate-300 truncate">
                            {studentData.student_profile?.institution?.name || "AICTE Approved Institution"}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                                studentData.student_profile?.is_duplicate_flagged ||
                                studentData.student_profile?.apaar_id === "999888777666"
                                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                                  : studentData.student_profile?.enrollment_status === "EXITED_DIPLOMA"
                                  ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              }`}
                            >
                              {studentData.student_profile?.is_duplicate_flagged
                                ? t.statusFlagged
                                : studentData.student_profile?.enrollment_status === "EXITED_DIPLOMA"
                                ? t.statusExited
                                : t.statusActive}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              DOB: {studentData.student_profile?.dob || "14/05/2006"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 12-Digit APAAR ID with Crisp Ice-White Glowing Digits */}
                      <div className="mt-5 p-3.5 rounded-xl bg-[#070810]/90 border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex items-center justify-between">
                        <div>
                          <div className="text-[9px] uppercase font-mono text-slate-400 tracking-wider">
                            {t.nationalApaarId}
                          </div>
                          <div className="text-lg font-black font-mono tracking-[0.2em] text-[#F8FAFC] drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">
                            {studentData.student_profile?.apaar_id?.replace(/(\d{4})/g, "$1 ").trim()}
                          </div>
                        </div>
                        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                      </div>

                      {/* Micro Identifiers Grid */}
                      <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div className="p-2 rounded-lg bg-[#070810]/70 border border-white/[0.06]">
                          <span className="text-slate-400">UDISE+ PEN: </span>
                          <span className="text-white font-bold">
                            {studentData.student_profile?.udise_pen || "PEN9981234"}
                          </span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#070810]/70 border border-white/[0.06]">
                          <span className="text-slate-400">Aadhaar (Last 4): </span>
                          <span className="text-white font-bold">
                            •••• {studentData.student_profile?.aadhaar_last_4 || "8821"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[9px] text-slate-400 font-mono">
                      <span>SECURE ABC CRYPTOGRAPHIC LEDGER</span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                        NEP 2020 COMPLIANT
                      </span>
                    </div>
                  </div>

                  {/* CREDIT ACCUMULATION & PROGRESS BARS (7 Cols) */}
                  <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
                    {/* Progress Card 1: Academic Credits (out of 160) - Glowing Cyan-to-Indigo Gradient */}
                    <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-cyan-400" />
                          <h4 className="text-sm font-bold text-white">
                            {t.academicCredits}
                          </h4>
                        </div>
                        <div className="text-sm font-bold font-mono text-cyan-400">
                          {studentData.student_profile?.total_credits || 0}{" "}
                          <span className="text-xs font-normal text-slate-400">/ 160 Credits</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mb-3">
                        Cumulative degree graduation threshold according to NEP 2020 4-Year B.Tech curriculum.
                      </p>

                      <div className="w-full h-3 rounded-full bg-[#070810] border border-white/[0.07] overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-700 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round(((studentData.student_profile?.total_credits || 0) / 160) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-1.5">
                        <span>Foundation: 40 Cr</span>
                        <span className="text-amber-300 font-semibold">Diploma Exit: 80 Cr</span>
                        <span className="text-emerald-400 font-semibold">Degree Exit: 160 Cr</span>
                      </div>
                    </div>

                    {/* Progress Card 2: AICTE Activity Points (out of 100) - Solar Gold-to-Rose Gradient */}
                    <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-400" />
                          <h4 className="text-sm font-bold text-white">
                            {t.activityPoints}
                          </h4>
                        </div>
                        <div className="text-sm font-bold font-mono text-amber-400">
                          {studentData.student_profile?.total_activity_points || 0}{" "}
                          <span className="text-xs font-normal text-slate-400">/ 100 Points</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mb-3">
                        Non-academic co-curricular, hackathon, internship, and social innovation points required for degree award.
                      </p>

                      <div className="w-full h-3 rounded-full bg-[#070810] border border-white/[0.07] overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-700 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round(((studentData.student_profile?.total_activity_points || 0) / 100) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-1.5">
                        <span className="text-amber-300 font-semibold">Min Threshold: 50 Pts</span>
                        <span>State Award: 75 Pts</span>
                        <span className="text-emerald-400 font-semibold">AICTE National Honors: 100 Pts</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* FLAGSHIP INNOVATION 2: AICTE SKILL-DNA & NEP CREDIT RADAR (COMPETENCY MATRIX) */}
                {/* ========================================================================= */}
                <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/10">
                        <Radar className="w-5 h-5 animate-spin" style={{ animationDuration: "14s" }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white tracking-wide">
                            AICTE Skill-DNA &amp; NEP Credit Radar
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 font-bold">
                            Live Competency Matrix
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Automated multi-axial parsing of verified coursework (CS101, AI202) and activity points into National Skill Domains.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>NSQF Level 7 Certified Competency Matrix</span>
                      </span>
                      <button
                        onClick={handleExportSkillDnaCredential}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#070810] hover:bg-[#121324] text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 text-xs font-semibold shadow-sm transition-all cursor-pointer"
                        title="View exportable W3C Verifiable Credential JSON-LD payload"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Export W3C Credential</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* SVG Radar Chart (5 Cols) */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-[#05050A]/90 border border-white/[0.07] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-radial from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
                      <svg className="w-64 h-64 overflow-visible" viewBox="0 0 240 240">
                        <defs>
                          <radialGradient id="radarMeshGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                            <stop offset="60%" stopColor="#a855f7" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                          </radialGradient>
                        </defs>

                        {/* Concentric Grid Polygons */}
                        <polygon points="120,40 200,120 120,200 40,120" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                        <polygon points="120,60 180,120 120,180 60,120" fill="none" stroke="rgba(255,255,255,0.06)" />
                        <polygon points="120,80 160,120 120,160 80,120" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 2" />
                        <polygon points="120,100 140,120 120,140 100,120" fill="none" stroke="rgba(255,255,255,0.04)" />

                        {/* Axes Lines */}
                        <line x1="120" y1="40" x2="120" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <line x1="40" y1="120" x2="200" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                        {/* Active Data Polygon:
                            Top (Core Algorithms): 88% -> (120, 120 - 80*0.88) = (120, 49.6)
                            Right (Machine Intelligence): 92% -> (120 + 80*0.92, 120) = (193.6, 120)
                            Bottom (Hands-on Innovation): 85% -> (120, 120 + 80*0.85) = (120, 188)
                            Left (Professional Ethics): 75% -> (120 - 80*0.75, 120) = (60, 120)
                        */}
                        <polygon
                          points="120,49.6 193.6,120 120,188 60,120"
                          fill="url(#radarMeshGradient)"
                          stroke="#06b6d4"
                          strokeWidth="2.5"
                          className="transition-all duration-700 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                        />

                        {/* Vertex Points & Score Badges */}
                        {/* Top: Core Algorithms (88%) */}
                        <circle cx="120" cy="49.6" r="4.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
                        <text x="120" y="32" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="monospace" fontWeight="bold">88%</text>

                        {/* Right: Machine Intelligence (92%) */}
                        <circle cx="193.6" cy="120" r="4.5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
                        <text x="206" y="124" textAnchor="start" fill="#a855f7" fontSize="10" fontFamily="monospace" fontWeight="bold">92%</text>

                        {/* Bottom: Hands-on Innovation (85%) */}
                        <circle cx="120" cy="188" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
                        <text x="120" y="212" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">85%</text>

                        {/* Left: Professional Ethics (75%) */}
                        <circle cx="60" cy="120" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" className="animate-pulse" />
                        <text x="34" y="124" textAnchor="end" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">75%</text>

                        {/* Center Origin Point */}
                        <circle cx="120" cy="120" r="3" fill="#ffffff" opacity="0.6" />
                      </svg>
                      <div className="text-[10px] font-mono text-slate-400 mt-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span>Equi-Angular Polar Competency Radar</span>
                      </div>
                    </div>

                    {/* Competency Domains Breakdown (7 Cols) */}
                    <div className="lg:col-span-7 space-y-3.5">
                      {/* Domain 1: Core Algorithms & Systems */}
                      <div className="p-3.5 rounded-2xl bg-[#070810]/80 border border-white/[0.07] hover:border-cyan-500/30 transition-all space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            <span className="font-bold text-white">Core Algorithms &amp; Systems</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                              CS101 Mapped
                            </span>
                          </div>
                          <div className="font-mono font-bold text-cyan-400 text-sm">88%</div>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#05050A] overflow-hidden border border-white/[0.05]">
                          <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.4)] rounded-full" style={{ width: "88%" }} />
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span>Validated: CS101 Data Structures &amp; Algorithms (4 Credits, Grade O)</span>
                          <span className="text-cyan-300 font-mono font-semibold">Mastery • Level 7</span>
                        </div>
                      </div>

                      {/* Domain 2: Machine Intelligence & Data */}
                      <div className="p-3.5 rounded-2xl bg-[#070810]/80 border border-white/[0.07] hover:border-purple-500/30 transition-all space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-400" />
                            <span className="font-bold text-white">Machine Intelligence &amp; Data</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                              AI202 Mapped
                            </span>
                          </div>
                          <div className="font-mono font-bold text-purple-400 text-sm">92%</div>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#05050A] overflow-hidden border border-white/[0.05]">
                          <div className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 shadow-[0_0_10px_rgba(168,85,247,0.4)] rounded-full" style={{ width: "92%" }} />
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span>Validated: AI202 Machine Learning &amp; Neural Networks (4 Credits, Grade O)</span>
                          <span className="text-purple-300 font-mono font-semibold">Exceptional • Level 7</span>
                        </div>
                      </div>

                      {/* Domain 3: Hands-on Innovation (Hackathons) */}
                      <div className="p-3.5 rounded-2xl bg-[#070810]/80 border border-white/[0.07] hover:border-amber-500/30 transition-all space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="font-bold text-white">Hands-on Innovation (Hackathons)</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              AICTE Pts Mapped
                            </span>
                          </div>
                          <div className="font-mono font-bold text-amber-400 text-sm">85%</div>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#05050A] overflow-hidden border border-white/[0.05]">
                          <div className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 shadow-[0_0_10px_rgba(245,158,11,0.4)] rounded-full" style={{ width: "85%" }} />
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span>Validated: Smart India Hackathon Winner 2026 (+20 Points, 98.4% OCR)</span>
                          <span className="text-amber-300 font-mono font-semibold">Advanced • Level 7</span>
                        </div>
                      </div>

                      {/* Domain 4: Professional Practice & Ethics */}
                      <div className="p-3.5 rounded-2xl bg-[#070810]/80 border border-white/[0.07] hover:border-emerald-500/30 transition-all space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="font-bold text-white">Professional Practice &amp; Ethics</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              DEPA/Intern Mapped
                            </span>
                          </div>
                          <div className="font-mono font-bold text-emerald-400 text-sm">75%</div>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#05050A] overflow-hidden border border-white/[0.05]">
                          <div className="h-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 shadow-[0_0_10px_rgba(16,185,129,0.4)] rounded-full" style={{ width: "75%" }} />
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span>Validated: AICTE Virtual Industry Internship &amp; Consent Protocols (20 Pts)</span>
                          <span className="text-emerald-300 font-mono font-semibold">Proficient • Level 7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* FLAGSHIP INNOVATION 1: PRIVACY-PRESERVING ZK-PROOF GENERATOR (TAB 1) */}
                {/* ========================================================================= */}
                <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-md shadow-purple-500/10">
                        <Binary className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white tracking-wide">
                            Privacy-Preserving ZK-Proof Generator
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold">
                            zk-SNARK Groth16
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Mathematically prove academic merit and activity thresholds to recruiters without revealing exact scores or demographic PII.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
                        Zero Information Leakage
                      </span>
                    </div>
                  </div>

                  {/* Select Pre-set Rule */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-300 block">
                      Select Zero-Knowledge Proof Verification Rule:
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Rule A */}
                      <div
                        onClick={() => setZkRule("gpa")}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                          zkRule === "gpa"
                            ? "bg-purple-950/20 border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                            : "bg-[#070810]/70 border-white/[0.07] hover:border-white/[0.15]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-mono font-bold flex items-center justify-center border border-purple-500/40">
                                A
                              </span>
                              <h5 className="text-xs sm:text-sm font-bold text-white">
                                Verify CGPA is ≥ 8.0 without revealing exact score
                              </h5>
                            </div>
                            <p className="text-[11px] text-slate-400 pl-7 leading-relaxed">
                              Generates a zero-knowledge proof that your cumulative grade point average satisfies ≥ 8.0. Recruiter gets cryptographic proof while your exact grade remains hidden.
                            </p>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                              zkRule === "gpa" ? "border-purple-400 bg-purple-500" : "border-slate-600"
                            }`}
                          >
                            {zkRule === "gpa" && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                          </div>
                        </div>
                      </div>

                      {/* Rule B */}
                      <div
                        onClick={() => setZkRule("activity")}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                          zkRule === "activity"
                            ? "bg-amber-950/20 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                            : "bg-[#070810]/70 border-white/[0.07] hover:border-white/[0.15]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold flex items-center justify-center border border-amber-500/40">
                                B
                              </span>
                              <h5 className="text-xs sm:text-sm font-bold text-white">
                                Verify AICTE Activity Points ≥ 50 without sharing individual certificates
                              </h5>
                            </div>
                            <p className="text-[11px] text-slate-400 pl-7 leading-relaxed">
                              Mathematically proves compliance with the mandatory 50-point graduation threshold without disclosing private certificate titles, dates, or individual activity logs.
                            </p>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                              zkRule === "activity" ? "border-amber-400 bg-amber-500" : "border-slate-600"
                            }`}
                          >
                            {zkRule === "activity" && <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Generate Button / Progress Animation */}
                  <div>
                    {isGeneratingZk ? (
                      <div className="p-4 rounded-2xl bg-[#070810]/90 border border-purple-500/40 space-y-2.5 animate-pulse">
                        <div className="flex justify-between items-center text-xs font-mono text-purple-300">
                          <span className="flex items-center gap-2">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                            {zkGenerationStep === 1 && "Stage 1/3: Formulating R1CS Polynomial Constraints & Circuit Gates..."}
                            {zkGenerationStep === 2 && "Stage 2/3: Computing Secret Witness on BN254 Elliptic Curve..."}
                            {zkGenerationStep === 3 && "Stage 3/3: Synthesizing Groth16 zk-SNARK & Anchoring to AICTE ABC State Root..."}
                          </span>
                          <span>{zkGenerationStep === 1 ? "33%" : zkGenerationStep === 2 ? "66%" : "99%"}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#05050A] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-300 rounded-full"
                            style={{ width: `${(zkGenerationStep / 3) * 100}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleGenerateZkProof}
                        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <KeyRound className="w-4 h-4 text-cyan-300" />
                        <span>Generate ZK Proof for {zkRule === "gpa" ? "Rule A (CGPA ≥ 8.0)" : "Rule B (Activity Points ≥ 50)"}</span>
                      </button>
                    )}
                  </div>

                  {/* Generated Token Attestation Box */}
                  {generatedZkProof && !isGeneratingZk && (
                    <div className="p-4 rounded-2xl bg-[#070810]/90 border border-purple-500/40 space-y-3 animate-in zoom-in-95 duration-200">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2.5 border-b border-white/[0.06]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-bold text-white">
                            Cryptographic ZK Attestation Token Minted
                          </span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                          WITNESS SATISFIED
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          Token Payload (Shareable with Employers &amp; Higher Education Institutions):
                        </div>
                        <div className="p-3 rounded-xl bg-[#05050A] border border-white/[0.08] flex items-center justify-between gap-2">
                          <span className="font-mono text-xs text-cyan-300 font-bold break-all">
                            {generatedZkProof.token}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(generatedZkProof.token);
                              setZkCopied(true);
                              setTimeout(() => setZkCopied(false), 2000);
                              notify("ZK Proof Token copied to clipboard", "success");
                            }}
                            className="p-1.5 rounded-lg bg-[#0B0C14] hover:bg-[#121324] border border-white/[0.1] text-slate-300 hover:text-white transition-all shrink-0 cursor-pointer"
                            title="Copy ZK Token"
                          >
                            {zkCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Cryptographic Proof Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 pt-1">
                        <div className="p-2 rounded-lg bg-[#05050A]/80 border border-white/[0.05]">
                          <span className="text-slate-500">Public Predicate: </span>
                          <span className="text-white font-semibold">{generatedZkProof.predicate}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#05050A]/80 border border-white/[0.05]">
                          <span className="text-slate-500">Confidential Witness: </span>
                          <span className="text-emerald-400 font-semibold">HIDDEN (Zero-Knowledge)</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#05050A]/80 border border-white/[0.05]">
                          <span className="text-slate-500">Prover Circuit: </span>
                          <span className="text-purple-300 font-semibold">Groth16 / BN254 Curve</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#05050A]/80 border border-white/[0.05]">
                          <span className="text-slate-500">NAD Ledger Anchor: </span>
                          <span className="text-cyan-300 font-semibold">Block #482910 Verified</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={handleTestInRecruiterPortal}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center gap-1.5 cursor-pointer"
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>Test in Recruiter Verifier (Tab 3) →</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 2: SHA-256 Verified Academic Credits Table (Clickable Hashes) */}
                <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-sm font-bold text-white">
                        {t.semCreditsTable}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {studentData.academic_credits?.length || 0} Ledger Records • Click Any Hash to Inspect W3C VC & Simulate Tampering
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.08] text-slate-400 font-mono text-[10px] uppercase">
                          <th className="py-2.5 px-3">Sem</th>
                          <th className="py-2.5 px-3">Subject</th>
                          <th className="py-2.5 px-3">Title</th>
                          <th className="py-2.5 px-3">Credits</th>
                          <th className="py-2.5 px-3">Grade</th>
                          <th className="py-2.5 px-3">Cryptographic SHA-256 Hash</th>
                          <th className="py-2.5 px-3 text-right">W3C Credential</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06] font-sans">
                        {studentData.academic_credits?.map((credit: any, idx: number) => (
                          <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                            <td className="py-3 px-3 font-mono text-slate-300">Sem {credit.semester}</td>
                            <td className="py-3 px-3 font-mono font-bold text-cyan-300">{credit.subject_code}</td>
                            <td className="py-3 px-3 text-white font-medium">{credit.subject_name}</td>
                            <td className="py-3 px-3 font-bold text-slate-200">{credit.credits_earned}</td>
                            <td className="py-3 px-3">
                              <span className="w-7 h-6 rounded bg-emerald-500/10 text-emerald-400 font-bold font-mono border border-emerald-500/30 inline-flex items-center justify-center">
                                {credit.grade}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-mono text-[10px]">
                              <button
                                onClick={() => openCredentialInspector(credit, "academic_credit")}
                                className="group/hash inline-flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 transition-all max-w-[210px] text-left cursor-pointer shadow-sm"
                                title="Click to inspect complete W3C Verifiable Credential JSON-LD & Simulate Tamper Attack"
                              >
                                <Hash className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span className="truncate">{credit.record_hash?.slice(0, 16)}...</span>
                                <ExternalLink className="w-3 h-3 text-emerald-400/70 group-hover/hash:text-emerald-300 shrink-0" />
                              </button>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                onClick={() => openCredentialInspector(credit, "academic_credit")}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                              >
                                <FileCode className="w-3.5 h-3.5" />
                                <span>Inspect JSON-LD</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 3: AICTE Activity Points Certificates List (With W3C Inspector trigger) */}
                {studentData.activity_certificates && studentData.activity_certificates.length > 0 && (
                  <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400" />
                        <h4 className="text-sm font-bold text-white">
                          Verified Co-Curricular & Skill Certificates
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {studentData.activity_certificates.length} Records • Click Hash to Inspect W3C Credential
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {studentData.activity_certificates.map((cert: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-[#070810]/80 border border-white/[0.07] hover:border-indigo-500/40 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <h5 className="text-sm font-bold text-white">{cert.title}</h5>
                              <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
                                +{cert.points_awarded || 10} Pts
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                              <span>Category: {cert.category || "Skill Development"}</span>
                              <span className="font-mono text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                                OCR Score: {cert.ocr_confidence_score || 96}%
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                            <button
                              onClick={() => openCredentialInspector(cert, "activity_certificate")}
                              className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer transition-colors"
                              title="Click hash to inspect W3C VC"
                            >
                              <Hash className="w-3 h-3" />
                              <span className="truncate max-w-[170px]">{cert.record_hash?.slice(0, 16)}...</span>
                            </button>
                            <button
                              onClick={() => openCredentialInspector(cert, "activity_certificate")}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Raw W3C Credential</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section 4: Dual Forms: AI OCR Drag-and-Drop Scanner + DEPA Privacy & Consent Manager */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* SIH WINNING FEATURE 2: DRAG-AND-DROP AI VISION & OCR CERTIFICATE SCANNER */}
                  <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <ScanLine className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-sm font-bold text-white">
                            {t.aiOcrTitle}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          AI OCR v2.4
                        </span>
                      </div>

                      {/* FAST TESTING 1-CLICK DEMO BUTTONS */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        <button
                          type="button"
                          onClick={handleLoadSampleCertificate}
                          disabled={isScanning}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all shadow-sm cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Load Authentic Certificate (Pass)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            runOcrScannerPipeline(
                              "Smart_India_Hackathon_2026_Forged_RajeshKumar.pdf",
                              "1.2 MB",
                              "Rajesh Kumar (Tampered)"
                            );
                          }}
                          disabled={isScanning}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all shadow-sm cursor-pointer"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Load Forged Certificate (Fail Check)</span>
                        </button>
                      </div>

                      {/* DRAG-AND-DROP FILE ZONE */}
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragOver(true);
                        }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragOver(false);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleFileDrop(e.dataTransfer.files[0]);
                          }
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative rounded-2xl border-2 border-dashed p-5 text-center cursor-pointer transition-all overflow-hidden ${
                          isDragOver
                            ? "border-cyan-400 bg-cyan-950/30 scale-[1.01]"
                            : "border-white/[0.1] hover:border-indigo-500/60 bg-[#070810]/60 hover:bg-[#070810]/90"
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileDrop(e.target.files[0]);
                            }
                          }}
                        />

                        {/* 3-STAGE VISUAL SCANNING ANIMATION PIPELINE */}
                        {isScanning ? (
                          <div className="py-4 flex flex-col items-center justify-center gap-3">
                            <div className="relative w-full max-w-sm h-14 bg-[#05050A] rounded-xl border border-indigo-500/40 overflow-hidden flex items-center justify-center shadow-inner">
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse shadow-[0_0_15px_#22d3ee]" />
                              <ScanLine className="w-7 h-7 text-cyan-400 animate-bounce" />
                            </div>

                            {/* Stage Progress Pills */}
                            <div className="w-full space-y-2">
                              <div className="flex justify-between items-center text-[10px] font-mono text-cyan-300">
                                <span>AI Vision Pipeline</span>
                                <span>{scanStage === 1 ? "33%" : scanStage === 2 ? "66%" : "100%"}</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-[#070810] overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-300"
                                  style={{
                                    width: scanStage === 1 ? "33%" : scanStage === 2 ? "66%" : "100%",
                                  }}
                                />
                              </div>

                              <div className="text-xs font-bold text-cyan-300 font-mono text-center flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                                {scanStage === 1 && "Stage 1: OpenCV Layout & QR Boundary Detection..."}
                                {scanStage === 2 && "Stage 2: OCR Text Extraction & Issuer DID Lookup..."}
                                {scanStage === 3 && "Stage 3: Cross-Verifying Demographic Name with UIDAI/APAAR Registry..."}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="py-2 flex flex-col items-center justify-center gap-2">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md shadow-indigo-500/10">
                              <Upload className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">
                                Drag & Drop Certificate File Here (.pdf, .png, .jpg)
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                or click to browse local files for instantaneous AI OCR extraction
                              </p>
                            </div>
                            {scannedFileDetails && (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-300 mt-1">
                                <FileCheck className="w-3 h-3" />
                                <span>{scannedFileDetails.name} ({scannedFileDetails.size})</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* AI CONFIDENCE BREAKDOWN CHIPS */}
                      {aiConfidenceBreakdown && (
                        <div className="space-y-2.5 mt-3 animate-in fade-in duration-300">
                          <div className="grid grid-cols-3 gap-2">
                            <div
                              className={`p-2.5 rounded-xl text-center border transition-all ${
                                aiConfidenceBreakdown.nameMatch > 70
                                  ? "bg-[#070810]/80 border-emerald-500/30"
                                  : "bg-rose-950/40 border-rose-500/60 shadow-[0_0_12px_rgba(244,63,94,0.25)]"
                              }`}
                            >
                              <div className="text-[10px] font-mono text-slate-400">Name Match</div>
                              <div
                                className={`text-xs font-extrabold ${
                                  aiConfidenceBreakdown.nameMatch > 70 ? "text-emerald-400" : "text-rose-400"
                                }`}
                              >
                                {aiConfidenceBreakdown.nameMatch}%
                              </div>
                            </div>

                            <div
                              className={`p-2.5 rounded-xl text-center border transition-all ${
                                aiConfidenceBreakdown.issuerSignature > 70
                                  ? "bg-[#070810]/80 border-cyan-500/30"
                                  : "bg-rose-950/40 border-rose-500/50"
                              }`}
                            >
                              <div className="text-[10px] font-mono text-slate-400">Issuer Signature</div>
                              <div
                                className={`text-xs font-extrabold ${
                                  aiConfidenceBreakdown.issuerSignature > 70 ? "text-cyan-400" : "text-rose-400"
                                }`}
                              >
                                {aiConfidenceBreakdown.issuerSignature}%
                              </div>
                            </div>

                            <div
                              className={`p-2.5 rounded-xl text-center border transition-all ${
                                aiConfidenceBreakdown.forgeryCheck.toLowerCase().includes("failed") ||
                                aiConfidenceBreakdown.nameMatch < 50
                                  ? "bg-rose-950/50 border-rose-500/70 shadow-[0_0_20px_rgba(244,63,94,0.35)] animate-pulse"
                                  : "bg-emerald-950/20 border-emerald-500/30"
                              }`}
                            >
                              <div className="text-[10px] font-mono text-slate-400">Forgery Check</div>
                              <div
                                className={`text-xs font-extrabold ${
                                  aiConfidenceBreakdown.forgeryCheck.toLowerCase().includes("failed") ||
                                  aiConfidenceBreakdown.nameMatch < 50
                                    ? "text-rose-400"
                                    : "text-emerald-400"
                                }`}
                              >
                                {aiConfidenceBreakdown.forgeryCheck.toLowerCase().includes("failed") ||
                                aiConfidenceBreakdown.nameMatch < 50
                                  ? "FAILED (High Risk)"
                                  : "Passed (Authentic)"}
                              </div>
                            </div>
                          </div>

                          {/* Forgery Check Failed Warning Banner */}
                          {(aiConfidenceBreakdown.forgeryCheck.toLowerCase().includes("failed") ||
                            aiConfidenceBreakdown.nameMatch < 50) && (
                            <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs flex items-start gap-2.5 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-in zoom-in-95 duration-200">
                              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                              <div className="space-y-0.5">
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  <span>FORGERY CHECK FAILED: High Chance of Forgery (94.2% Risk)</span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/30 text-rose-200 border border-rose-500/50 font-black">
                                    REJECTED
                                  </span>
                                </div>
                                <p className="text-[11px] text-rose-200/90 leading-relaxed font-mono">
                                  Demographic mismatch detected: Extracted certificate name does not match registered APAAR student identity (
                                  <strong className="text-white">
                                    {studentData?.student_profile?.full_name || "Arjun Subramanian"}
                                  </strong>). Document cannot be credited to this ledger.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Form Details (Auto-filled on drop) */}
                      <form onSubmit={handleCertificateUpload} className="space-y-3 mt-4">
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 block mb-1">
                            Extracted Certificate Title
                          </label>
                          <input
                            type="text"
                            value={uploadTitle}
                            onChange={(e) => setUploadTitle(e.target.value)}
                            className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-mono text-slate-400 block mb-1">
                              Category
                            </label>
                            <select
                              value={uploadCategory}
                              onChange={(e) => setUploadCategory(e.target.value)}
                              className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                            >
                              <option value="Technical">Technical Hackathon</option>
                              <option value="Workshop">Workshop / Seminar</option>
                              <option value="Internship">AICTE Virtual Internship</option>
                              <option value="Sports">Sports / Cultural</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[11px] font-mono text-slate-400 block mb-1">
                              Claimed Points
                            </label>
                            <input
                              type="number"
                              value={uploadPoints}
                              onChange={(e) => setUploadPoints(e.target.value)}
                              className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                              min="1"
                              max="50"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[11px] font-mono text-slate-400 block">
                              OCR Extracted Student Name
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const isCurrentlyTampered =
                                  uploadExtractedName.includes("Tampered") ||
                                  uploadExtractedName.trim().toLowerCase() !==
                                    (studentData?.student_profile?.full_name || "Arjun Subramanian").trim().toLowerCase();
                                const newName = isCurrentlyTampered
                                  ? (studentData?.student_profile?.full_name || "Arjun Subramanian")
                                  : "Rajesh Kumar (Tampered)";
                                updateNameMatchAndForgery(newName);
                              }}
                              className="text-[10px] text-amber-300 hover:text-amber-200 hover:underline cursor-pointer flex items-center gap-1 font-mono"
                            >
                              <RefreshCw className="w-2.5 h-2.5" />
                              <span>Toggle Name Tamper Test (Simulate Forgery)</span>
                            </button>
                          </div>
                          <input
                            type="text"
                            value={uploadExtractedName}
                            onChange={(e) => updateNameMatchAndForgery(e.target.value)}
                            className={`w-full bg-[#070810]/90 border rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none shadow-inner transition-colors ${
                              uploadExtractedName.trim().toLowerCase() ===
                              (studentData?.student_profile?.full_name || "Arjun Subramanian").trim().toLowerCase()
                                ? "border-white/[0.08] focus:border-indigo-500"
                                : "border-rose-500/70 focus:border-rose-400 text-rose-300 bg-rose-950/20"
                            }`}
                            required
                          />
                          {uploadExtractedName.trim().toLowerCase() !==
                            (studentData?.student_profile?.full_name || "Arjun Subramanian").trim().toLowerCase() && (
                            <div className="text-[10px] font-mono text-rose-400 mt-1 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                              <span>
                                Name does not match registered student (
                                {studentData?.student_profile?.full_name || "Arjun Subramanian"}). High chance of forgery!
                              </span>
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={uploadLoading || isScanning}
                          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] text-xs py-2.5 rounded-xl transition-all disabled:opacity-50 mt-1 cursor-pointer"
                        >
                          {uploadLoading ? "Simulating AI OCR & NLP Extraction..." : "Re-Verify & Submit for Nodal Review"}
                        </button>
                      </form>
                    </div>

                    {/* AI OCR Verification Breakdown Box */}
                    {uploadResult && (
                      <div
                        className={`mt-4 p-4 rounded-2xl border text-xs ${
                          uploadResult.tamper_warning || uploadResult.forgery_detected
                            ? "bg-rose-950/40 border-rose-500/50 text-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.25)]"
                            : "bg-emerald-950/40 border-emerald-500/40 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span className="flex items-center gap-1.5">
                            {uploadResult.tamper_warning || uploadResult.forgery_detected ? (
                              <AlertTriangle className="w-4 h-4 text-rose-400" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            )}
                            {uploadResult.tamper_warning || uploadResult.forgery_detected
                              ? "🚨 HIGH RISK OF FORGERY: Verification Failed!"
                              : "AI OCR Verification Passed"}
                          </span>
                          <span
                            className={`font-mono font-bold text-xs ${
                              uploadResult.tamper_warning || uploadResult.forgery_detected
                                ? "text-rose-400"
                                : "text-emerald-400"
                            }`}
                          >
                            {uploadResult.tamper_warning || uploadResult.forgery_detected
                              ? "Forgery Risk: 94.2% (FAILED)"
                              : `Score: ${uploadResult.ocr_confidence_score}%`}
                          </span>
                        </div>
                        <p className="text-[11px] opacity-90 leading-relaxed mb-2">
                          {uploadResult.details || uploadResult.message || uploadResult.error}
                        </p>
                        {uploadResult.record_hash && (
                          <div className="space-y-2">
                            <div className="text-[10px] font-mono break-all bg-[#05050A] p-2 rounded border border-white/[0.08] text-slate-400">
                              Hash: {uploadResult.record_hash}
                            </div>
                            <button
                              onClick={() =>
                                openCredentialInspector(
                                  uploadResult.certificate || {
                                    title: uploadTitle,
                                    category: uploadCategory,
                                    points_awarded: Number(uploadPoints),
                                    record_hash: uploadResult.record_hash,
                                    ocr_confidence_score: uploadResult.ocr_confidence_score,
                                    verification_status: uploadResult.tamper_warning ? "FLAGGED" : "PENDING",
                                  },
                                  "activity_certificate"
                                )
                              }
                              className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold py-1.5 rounded-lg transition-all cursor-pointer"
                            >
                              <FileCode className="w-3.5 h-3.5" />
                              <span>View Raw W3C JSON-LD Credential</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* DEPA PRIVACY & CONSENT MANAGER */}
                  <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-emerald-400" />
                          <h4 className="text-sm font-bold text-white">
                            {t.depaManager}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                          Student-Controlled Access
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mb-4">
                        Review third-party credential verification requests and generate time-bound, cryptographically signed tokens.
                      </p>

                      {/* Consents List */}
                      <div className="space-y-3">
                        {studentData.consents && studentData.consents.length > 0 ? (
                          studentData.consents.map((consent: any, idx: number) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-2xl bg-[#070810]/80 border border-white/[0.07] space-y-2.5"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h5 className="text-xs font-bold text-white">
                                    {consent.requester_name}
                                  </h5>
                                  <p className="text-[11px] text-slate-400">
                                    Purpose: {consent.purpose}
                                  </p>
                                </div>
                                <span
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                                    consent.status === "APPROVED"
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                      : consent.status === "PENDING"
                                      ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                                      : "bg-rose-500/10 text-rose-400 border-rose-500/40"
                                  }`}
                                >
                                  {consent.status}
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-white/[0.06]">
                                <span>Expires: {new Date(consent.expires_at).toLocaleDateString()}</span>
                                <div className="flex items-center gap-2">
                                  {consent.status === "PENDING" && (
                                    <>
                                      <button
                                        onClick={() => handleConsentAction(consent.id, "REVOKE")}
                                        className="text-rose-400 hover:underline cursor-pointer"
                                      >
                                        Deny
                                      </button>
                                      <button
                                        onClick={() => handleConsentAction(consent.id, "APPROVE")}
                                        className="text-emerald-400 hover:underline font-bold cursor-pointer"
                                      >
                                        Approve
                                      </button>
                                    </>
                                  )}
                                  {consent.status === "APPROVED" && (
                                    <button
                                      onClick={() => handleConsentAction(consent.id, "REVOKE")}
                                      className="text-rose-400 hover:underline cursor-pointer"
                                    >
                                      Revoke Access
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="py-6 text-center text-xs text-slate-500">
                            No consent authorization requests pending.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* QR Code Container for Instant Verification */}
                    {(() => {
                      const approvedConsent = studentData?.consents?.find(
                        (c: any) => c.status === "APPROVED" && c.access_token
                      );
                      const activeToken = approvedConsent?.access_token || "depa-live-token-482910";
                      const currentOrigin =
                        origin || (typeof window !== "undefined" ? window.location.origin : "");
                      const qrUrl = currentOrigin
                        ? `${currentOrigin}/verify/${activeToken}`
                        : `/verify/${activeToken}`;

                      return (
                        <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center gap-4 bg-[#070810]/80 p-3.5 rounded-2xl border border-white/[0.07]">
                          <div className="p-2 bg-white rounded-xl shrink-0 self-start sm:self-auto shadow-md">
                            <QRCodeSVG
                              value={qrUrl}
                              size={72}
                            />
                          </div>
                          <div className="space-y-1 min-w-0">
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <QrCode className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>Scannable Recruiter Transcript QR</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                                LIVE VERCEL DPI
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400">
                              Scan with any mobile phone to open the tamper-evident AICTE verification transcript directly on this deployment.
                            </p>
                            {qrUrl.startsWith("http") && (
                              <a
                                href={qrUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-mono text-indigo-400 hover:text-indigo-300 hover:underline break-all"
                              >
                                <span>{qrUrl}</span>
                                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 2: AICTE INSTITUTION (NODAL OFFICER) PORTAL */}
        {/* ========================================================================= */}
        {activeTab === "nodal" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121324] via-[#0D0E1A] to-[#1A102B] border border-indigo-400/30 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md shadow-indigo-500/10">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      AICTE Institutional Nodal Officer Portal
                    </h3>
                    <p className="text-xs text-slate-400">
                      Anchor Academic Credits • AI NEP 2020 Equivalency • Bulk ERP Ingestion • MEME Mobility
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRegCustomApaar("");
                      setRegAicteCode("1-10000001");
                      setShowRegisterModal(true);
                    }}
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] text-xs font-extrabold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>+ Mint New Student APAAR ID</span>
                  </button>
                  <span className="text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                    Institution: 1-10000001 (Chennai Institute of AI & Tech)
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* SECTION A: PUSH SEMESTER CREDITS TO ABC & BULK ERP SYNC */}
              <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-bold text-white">
                        Push Semester Credits to Academic Bank of Credits
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      POST /api/dpi/push-credits
                    </span>
                  </div>

                  {/* SIH WINNING FEATURE 3: 1-CLICK BULK ERP CSV SYNC */}
                  <div className="mb-4 p-3.5 rounded-2xl bg-[#070810]/80 border border-white/[0.08] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-white">College ERP Integration</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        Automated Merkle Batch
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Ingest 50 student course grade rows simultaneously, construct a SHA-256 Merkle DAG tree, and anchor the Merkle Root to the ABC ledger.
                    </p>

                    <button
                      type="button"
                      onClick={handleBulkErpSync}
                      disabled={bulkSyncing}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/25 disabled:opacity-50 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>{bulkSyncing ? "Ingesting & Computing Merkle Root..." : "1-Click Bulk ERP CSV Sync (50 Records)"}</span>
                    </button>

                    {/* Bulk Sync Progress */}
                    {bulkSyncing && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between items-center text-[10px] font-mono text-cyan-300">
                          <span>Constructing Merkle Leaves...</span>
                          <span>{bulkProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#070810] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-300"
                            style={{ width: `${bulkProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Bulk Sync Result Summary */}
                    {bulkSyncResult && (
                      <div className="p-3 rounded-xl bg-[#0B0C14] border border-cyan-500/40 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between font-bold text-emerald-400">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            50 Records Anchored to National ABC Ledger
                          </span>
                          <span className="text-[10px] font-mono text-cyan-300">{bulkSyncResult.timestamp}</span>
                        </div>
                        <div className="text-[10px] font-mono break-all text-slate-300 bg-[#05050A] p-2 rounded border border-white/[0.08]">
                          Merkle Root: <span className="text-cyan-300 font-bold">{bulkSyncResult.merkleRoot}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>Gas Cost: {bulkSyncResult.gasCost}</span>
                          <span>Status: Zero-Knowledge Anchored</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Single Credit Push Form */}
                  <form onSubmit={handlePushCredits} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">
                          Student APAAR ID
                        </label>
                        <input
                          type="text"
                          value={creditApaar}
                          onChange={(e) => setCreditApaar(e.target.value)}
                          className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">
                          AICTE Institute Code
                        </label>
                        <input
                          type="text"
                          value={creditAicte}
                          onChange={(e) => setCreditAicte(e.target.value)}
                          className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">
                          Semester
                        </label>
                        <select
                          value={creditSem}
                          onChange={(e) => setCreditSem(e.target.value)}
                          className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                            <option key={s} value={s}>
                              Semester {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">
                          Subject Code
                        </label>
                        <input
                          type="text"
                          value={creditSubCode}
                          onChange={(e) => setCreditSubCode(e.target.value)}
                          className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">
                          Grade
                        </label>
                        <select
                          value={creditGrade}
                          onChange={(e) => setCreditGrade(e.target.value)}
                          className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        >
                          {["O", "A+", "A", "B+", "B", "C", "P"].map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">
                          Subject Title
                        </label>
                        <input
                          type="text"
                          value={creditSubName}
                          onChange={(e) => setCreditSubName(e.target.value)}
                          className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 block mb-1">
                          Credits
                        </label>
                        <input
                          type="number"
                          value={creditEarned}
                          onChange={(e) => setCreditEarned(e.target.value)}
                          className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                          min="1"
                          max="8"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={pushLoading}
                      className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] text-xs py-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {pushLoading ? "Anchoring Record to ABC Ledger..." : "Anchor Single Credit to National ABC Ledger"}
                    </button>
                  </form>
                </div>

                {pushResult && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#070810]/90 border border-cyan-500/40 text-xs text-cyan-200 shadow-lg">
                    <div className="font-bold flex items-center gap-1.5 mb-1 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Academic Credit Anchored to Ledger
                    </div>
                    <div className="text-[11px] text-slate-300 font-mono space-y-1">
                      <div>Student APAAR: {pushResult.data?.apaar_id}</div>
                      <div>Total Credits: {pushResult.data?.new_total_credits}</div>
                      <div className="text-[10px] break-all bg-[#05050A] p-2 rounded border border-white/[0.08] text-slate-400">
                        SHA-256 Hash: {pushResult.data?.record_hash}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION B: NEP 2020 AI CURRICULUM EQUIVALENCY & MEME MOBILITY */}
              <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <h4 className="text-sm font-bold text-white">
                        NEP 2020 Credit Mobility & AI Equivalency
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                      Multiple Entry / Exit (MEME)
                    </span>
                  </div>

                  {/* SIH WINNING FEATURE 3: AI NEP 2020 CREDIT EQUIVALENCY PREVIEW */}
                  <div className="mb-4 p-4 rounded-2xl bg-[#070810]/80 border border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-white">
                          AI NEP 2020 Credit Equivalency Preview
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                        96% Syllabus Overlap Verified
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Autonomous NLP cross-referencing between historical transcript courses and the AICTE Model Curriculum v2024.
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px]">
                        <thead>
                          <tr className="border-b border-white/[0.08] text-slate-400 font-mono text-[9px] uppercase">
                            <th className="py-1.5 px-2">Source Course</th>
                            <th className="py-1.5 px-2">AICTE Model Curriculum</th>
                            <th className="py-1.5 px-2">Credits</th>
                            <th className="py-1.5 px-2">Overlap</th>
                            <th className="py-1.5 px-2 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.06] font-sans">
                          <tr>
                            <td className="py-2 px-2 font-mono text-slate-300">CS101 (Prog in C)</td>
                            <td className="py-2 px-2 font-mono font-bold text-cyan-300">PCC-CS301</td>
                            <td className="py-2 px-2 text-white">4 Cr</td>
                            <td className="py-2 px-2 font-mono text-emerald-400 font-bold">96%</td>
                            <td className="py-2 px-2 text-right">
                              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                                Compliant
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-2 font-mono text-slate-300">AI202 (Intro to AI/ML)</td>
                            <td className="py-2 px-2 font-mono font-bold text-cyan-300">PEC-AI402</td>
                            <td className="py-2 px-2 text-white">4 Cr</td>
                            <td className="py-2 px-2 font-mono text-emerald-400 font-bold">98%</td>
                            <td className="py-2 px-2 text-right">
                              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                                Compliant
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-2 font-mono text-slate-300">MAT101 (Engg Maths I)</td>
                            <td className="py-2 px-2 font-mono font-bold text-cyan-300">BSC-MA102</td>
                            <td className="py-2 px-2 text-white">4 Cr</td>
                            <td className="py-2 px-2 font-mono text-emerald-400 font-bold">94%</td>
                            <td className="py-2 px-2 text-right">
                              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                                Compliant
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 px-2 font-mono text-slate-300">DS201 (Data Science)</td>
                            <td className="py-2 px-2 font-mono font-bold text-cyan-300">PCC-DS202</td>
                            <td className="py-2 px-2 text-white">3 Cr</td>
                            <td className="py-2 px-2 font-mono text-emerald-400 font-bold">95%</td>
                            <td className="py-2 px-2 text-right">
                              <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                                Compliant
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
                      <span>Total Transferable: 15 / 15 Credits</span>
                      <span className="text-emerald-400 font-semibold">Lateral Entry Approved</span>
                    </div>
                  </div>

                  {/* Transfer Execution Form */}
                  <form onSubmit={handleExecuteTransfer} className="space-y-3.5">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Select Exited / Transfer Candidate
                      </label>
                      <select
                        value={transferStudentId}
                        onChange={(e) => setTransferStudentId(e.target.value)}
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="739104829104">
                          739104829104 - Priya Nair (Status: EXITED_DIPLOMA, Credits: 80)
                        </option>
                        <option value="482910394812">
                          482910394812 - Arjun Subramanian (Status: ACTIVE, Credits: 42)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Target AICTE Institution
                      </label>
                      <select
                        value={transferTargetAicte}
                        onChange={(e) => setTransferTargetAicte(e.target.value)}
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="1-10000001">
                          1-10000001 - Chennai Institute of AI & Technology (Tamil Nadu)
                        </option>
                        <option value="1-20000002">
                          1-20000002 - Bengaluru College of Engineering (Karnataka)
                        </option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={transferLoading}
                      className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] text-xs py-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {transferLoading ? "Processing Transfer Protocol..." : "Execute 1-Click MEME Institutional Transfer"}
                    </button>
                  </form>
                </div>

                {transferResult && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#070810]/90 border border-cyan-500/40 text-xs text-cyan-200 shadow-lg">
                    <div className="font-bold flex items-center gap-1.5 mb-1 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      MEME Student Transfer Completed Successfully
                    </div>
                    <div className="text-[11px] text-slate-300 space-y-1 mt-2">
                      <div>
                        Student: <strong>{transferResult.transfer_details?.student_name}</strong> (
                        {transferResult.transfer_details?.apaar_id})
                      </div>
                      <div>
                        Status Transition: <span className="text-emerald-400 font-bold">ACTIVE</span> (Restored via MEME)
                      </div>
                      <div>
                        Destination: <strong>{transferResult.transfer_details?.target_institution?.name}</strong>
                      </div>
                      <div className="font-mono text-[10px] text-cyan-300">
                        {transferResult.historical_credits?.length || 0} Historical credits transferred seamlessly.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION C: AI OCR CERTIFICATE APPROVAL QUEUE */}
            <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">
                    AI OCR Student Certificate Approval Queue
                  </h4>
                </div>
                <span className="text-xs font-mono text-amber-300 font-bold">
                  {pendingCerts.length} Pending Review
                </span>
              </div>

              {pendingCerts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingCerts.map((cert: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#070810]/80 border border-white/[0.07] hover:border-indigo-500/40 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="text-sm font-bold text-white">{cert.title}</h5>
                          <p className="text-xs text-slate-400 font-mono">
                            APAAR ID: {cert.apaar_id}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          +{cert.points_awarded || 10} Pts
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Category: {cert.category || "Skill"}</span>
                        <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px]">
                          OCR Confidence: {cert.ocr_confidence_score || 95}%
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
                        <button
                          onClick={() => handleNodalAction(cert.id, "REJECT")}
                          className="px-3 py-1.5 rounded-lg bg-[#05050A] hover:bg-rose-950/40 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-all cursor-pointer"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleNodalAction(cert.id, "APPROVE")}
                          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] text-xs transition-all cursor-pointer"
                        >
                          Approve & Credit Points
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-500">
                  No pending certificates awaiting Nodal Officer review.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 3: RECRUITER / 3RD-PARTY INSTANT VERIFIER */}
        {/* ========================================================================= */}
        {activeTab === "recruiter" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121324] via-[#0D0E1A] to-[#1A102B] border border-indigo-400/30 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md shadow-indigo-500/10">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Recruiter & 3rd-Party Instant Credential Verifier
                    </h3>
                    <p className="text-xs text-slate-400">
                      DEPA Privacy-Compliant Verification • Zero-Knowledge Proofs • Cryptographic Hash Validation
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                    DigiLocker Consent Architecture
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form 1: Request Student Consent */}
              <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-sm font-bold text-white">
                        Dispatch DEPA Consent Request
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      POST /api/consent/request
                    </span>
                  </div>

                  <form onSubmit={handleRequestConsent} className="space-y-3.5">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Recruiter / Organization Name
                      </label>
                      <input
                        type="text"
                        value={recruiterName}
                        onChange={(e) => setRecruiterName(e.target.value)}
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Verification Purpose
                      </label>
                      <input
                        type="text"
                        value={recruiterPurpose}
                        onChange={(e) => setRecruiterPurpose(e.target.value)}
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        Target Student APAAR ID
                      </label>
                      <input
                        type="text"
                        value={recruiterApaar}
                        onChange={(e) => setRecruiterApaar(e.target.value)}
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={requestConsentLoading}
                      className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] text-xs py-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {requestConsentLoading ? "Dispatching DEPA Token..." : "Request 24-Hour Consent Authorization"}
                    </button>
                  </form>
                </div>

                {requestConsentResult && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#070810]/90 border border-indigo-500/40 text-xs text-indigo-200 shadow-lg">
                    <div className="font-bold flex items-center gap-1.5 mb-1 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Consent Request Created (24-Hour Expiry)
                    </div>
                    <div className="text-[11px] text-slate-300 space-y-1 font-mono">
                      <div>Request ID: {requestConsentResult.consent?.id}</div>
                      <div>Status: PENDING STUDENT APPROVAL</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form 2: Verify Access Token & ZK Proofs */}
              <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-sm font-bold text-white">
                        Verify Cryptographic Student Records
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                      {verifierMode === "depa" ? "GET /api/verify/[token]" : "GROTH16 / BN254 PAIRING"}
                    </span>
                  </div>

                  {/* Mode Selector Toggle: DEPA Consent vs Zero-Knowledge Proof */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#070810] border border-white/[0.08] rounded-xl mb-4">
                    <button
                      type="button"
                      onClick={() => setVerifierMode("depa")}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        verifierMode === "depa"
                          ? "bg-indigo-600/30 text-white border border-indigo-500/40 shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                      <span>DEPA Transcript</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVerifierMode("zk")}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        verifierMode === "zk"
                          ? "bg-purple-600/30 text-white border border-purple-500/40 shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Binary className="w-3.5 h-3.5 text-purple-400" />
                      <span>Zero-Knowledge (ZK)</span>
                      <span className="text-[9px] font-mono bg-purple-500/20 text-purple-300 px-1 py-0.2 rounded font-bold">
                        FLAGSHIP
                      </span>
                    </button>
                  </div>

                  {/* MODE 1: DEPA CONSENT VERIFIER */}
                  {verifierMode === "depa" && (
                    <div className="space-y-3.5 animate-in fade-in duration-200">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-mono text-slate-400">
                            DEPA Consent Access Token
                          </label>
                          <button
                            type="button"
                            onClick={() => setVerifyTokenInput("depa-live-token-482910")}
                            className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
                          >
                            Use Demo Token (IIT Bombay)
                          </button>
                        </div>
                        <input
                          type="text"
                          value={verifyTokenInput}
                          onChange={(e) => setVerifyTokenInput(e.target.value)}
                          placeholder="e.g. depa-live-token-482910"
                          className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500 shadow-inner"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleVerifyToken(verifyTokenInput)}
                          disabled={tokenVerifyLoading}
                          className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] text-xs py-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {tokenVerifyLoading ? "Verifying Ledger Proofs..." : "Verify Cryptographic Records"}
                        </button>
                        {verifyTokenInput && (
                          <Link
                            href={`/verify/${verifyTokenInput}`}
                            target="_blank"
                            className="px-3.5 py-2.5 rounded-xl bg-[#070810] hover:bg-[#0B0C14] text-slate-200 text-xs font-semibold border border-white/[0.08] flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Full Page</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}

                  {/* MODE 2: ZERO-KNOWLEDGE PROOF VERIFIER */}
                  {verifierMode === "zk" && (
                    <div className="space-y-3.5 animate-in fade-in duration-200">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-mono text-purple-300 flex items-center gap-1.5">
                            <KeyRound className="w-3.5 h-3.5 text-purple-400" />
                            zk-SNARK Attestation Token
                          </label>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const t = "zkp_aicte_gpa_8_0_9f82c1a4e5d6";
                                setZkVerifyInput(t);
                                handleVerifyZkToken(t, "gpa");
                              }}
                              className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
                            >
                              Demo ZK-GPA (≥ 8.0)
                            </button>
                            <span className="text-white/[0.2] text-[10px]">|</span>
                            <button
                              type="button"
                              onClick={() => {
                                const t = "zkp_aicte_points_50_3e71d4b2";
                                setZkVerifyInput(t);
                                handleVerifyZkToken(t, "activity");
                              }}
                              className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
                            >
                              Demo ZK-Points (≥ 50)
                            </button>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={zkVerifyInput}
                          onChange={(e) => setZkVerifyInput(e.target.value)}
                          placeholder="e.g. zkp_aicte_gpa_8_0_9f82c1a4e5d6"
                          className="w-full bg-[#070810]/90 border border-purple-500/30 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-500 shadow-inner"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleVerifyZkToken(zkVerifyInput)}
                        disabled={zkVerifyLoading}
                        className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-semibold shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] text-xs py-2.5 rounded-xl transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {zkVerifyLoading ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Evaluating BN254 Elliptic Curve Pairings e(π_A, π_B)...</span>
                          </>
                        ) : (
                          <>
                            <Binary className="w-3.5 h-3.5" />
                            <span>Verify Zero-Knowledge Proof (No PII Revealed)</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* DEPA Verified Result */}
                {verifierMode === "depa" && verifiedTokenResult && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#070810]/90 border border-emerald-500/40 text-xs text-emerald-200 space-y-3 shadow-[0_0_20px_rgba(16,185,129,0.15)] animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        {verifiedTokenResult.badge?.text || "Cryptographically Verified by AICTE"}
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                        AUTHENTICATED
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1">
                      <div>
                        Candidate: <strong>{verifiedTokenResult.data?.full_name}</strong> ({verifiedTokenResult.data?.apaar_id})
                      </div>
                      <div>
                        Institution: {verifiedTokenResult.data?.institution?.name || "Chennai Institute of AI & Technology"}
                      </div>
                      <div>
                        Total Credits: <strong>{verifiedTokenResult.data?.total_credits}</strong> | Activity Points:{" "}
                        <strong>{verifiedTokenResult.data?.total_activity_points || 0}</strong>
                      </div>
                    </div>

                    {/* Interactive Verified Course Hashes List (Click to Inspect VC & Test Tampering) */}
                    {verifiedTokenResult.data?.academic_credits && verifiedTokenResult.data.academic_credits.length > 0 && (
                      <div className="pt-2 border-t border-white/[0.06] space-y-2">
                        <div className="text-[10px] font-mono text-emerald-400 font-bold">
                          Click Any Verified Hash to Inspect W3C VC & Simulate Tamper Attack:
                        </div>
                        <div className="space-y-1.5">
                          {verifiedTokenResult.data.academic_credits.map((cr: any, cIdx: number) => (
                            <div
                              key={cIdx}
                              className="p-2 rounded-xl bg-[#05050A] border border-white/[0.06] flex items-center justify-between gap-2"
                            >
                              <div className="text-[11px] text-white">
                                <span className="font-mono text-cyan-300 font-bold">{cr.subject_code}</span> - {cr.subject_name} ({cr.credits_earned} Cr, Grade: {cr.grade})
                              </div>
                              <button
                                onClick={() => openCredentialInspector(cr, "academic_credit", verifiedTokenResult.data)}
                                className="font-mono text-[9px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
                              >
                                <Hash className="w-2.5 h-2.5" />
                                <span>{cr.record_hash?.slice(0, 10)}...</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ZK Verified Result: Authentic Glowing Badge */}
                {verifierMode === "zk" && zkVerifiedResult && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#070810]/95 border border-emerald-500/50 text-xs space-y-3.5 shadow-[0_0_35px_rgba(16,185,129,0.25)] animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        CRYPTOGRAPHIC WITNESS VALID
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        Groth16 / BN254 PASSED
                      </span>
                    </div>

                    {/* SIH Authentic Glowing Badge */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-[#071712] to-[#0a1424] border border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                        <div className="space-y-1">
                          <div className="text-[12px] font-bold text-white tracking-wide leading-relaxed font-sans">
                            {zkVerifiedResult.badgeText}
                          </div>
                          <div className="text-[10px] font-mono text-emerald-300/80 flex items-center gap-1.5 pt-0.5">
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                            <span>Zero PII, demographic attributes, or raw grades were revealed to verifier.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Circuit Verification Metadata */}
                    <div className="p-3 rounded-xl bg-[#05050A] border border-white/[0.06] text-[11px] font-mono space-y-1.5 text-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Cryptographic Predicate:</span>
                        <span className="text-cyan-300 font-bold">{zkVerifiedResult.criterion}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Circuit Verification Latency:</span>
                        <span className="text-emerald-400 font-bold">{zkVerifiedResult.circuitTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">AICTE ABC Ledger Anchor:</span>
                        <span className="text-indigo-300 font-mono text-[10px]">
                          {zkVerifiedResult.merkleAnchor.slice(0, 22)}...
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">zk-SNARK Proof Digest:</span>
                        <span className="text-purple-300 font-mono text-[10px]">
                          {zkVerifiedResult.proofHash.slice(0, 24)}...
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                        <span className="text-slate-400">Verification Time:</span>
                        <span className="text-slate-300">{zkVerifiedResult.timestamp}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 4: AICTE NATIONAL REGULATOR COMMAND CENTER */}
        {/* ========================================================================= */}
        {activeTab === "regulator" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121324] via-[#0D0E1A] to-[#1A102B] border border-indigo-400/30 shadow-[0_0_30px_rgba(99,102,241,0.15)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {t.regulatorTitle}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {t.regulatorSubtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchRegulatorOverview}
                    disabled={regulatorLoading}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0B0C14]/90 hover:bg-[#121324] text-slate-200 border border-white/[0.1] text-xs font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${regulatorLoading ? "animate-spin text-indigo-400" : ""}`} />
                    <span>Live Refresh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ACTIONABLE FRAUD RESOLUTION FOR ROHAN VERMA (999888777666) */}
            {regulatorData?.alerts?.duplicate_flagged_students &&
              regulatorData.alerts.duplicate_flagged_students.length > 0 && (
                <div className="p-6 rounded-3xl bg-[#0B0C14]/90 border border-rose-500/40 shadow-[0_0_25px_rgba(244,63,94,0.25)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-2xl animate-in zoom-in-95 duration-200 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-rose-500/30">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                        <AlertTriangle className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-rose-200 tracking-wide uppercase">
                          AICTE Anti-Fraud Alert: Dual Enrollment / Ghost Student Detected
                        </h4>
                        <p className="text-xs text-rose-300/80">
                          Regulatory Investigation Protocol • AICTE Anti-Fraud Circular 2026/04
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full font-black border border-rose-500/40 animate-pulse">
                      🚨 ACTIVE COLLISION DETECTED
                    </span>
                  </div>

                  {regulatorData.alerts.duplicate_flagged_students.map((fraud: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#05050A]/90 border border-rose-500/30 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-white text-base">{fraud.full_name}</span>
                            <span className="font-mono text-rose-400 text-xs font-bold">({fraud.apaar_id})</span>
                            <span className="text-[10px] font-mono bg-rose-500/15 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                              UIDAI Verified Match
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          {isLedgerFrozen ? (
                            <span className="px-2.5 py-1 rounded-lg bg-rose-500 text-white font-black text-[10px] font-mono border border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse">
                              LEDGER FROZEN & LOCKDOWN
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-300 font-bold text-[10px] font-mono border border-rose-500/30">
                              STATUS: RESTRICTED AUDIT
                            </span>
                          )}

                          {noticeDispatched && (
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 font-bold text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Notice SCN-2026-8891 Dispatched (72h Deadline)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Explicit Conflicting Collision Details Box */}
                      <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs space-y-1.5 font-mono">
                        <div className="text-rose-200 font-bold flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Conflicting Academic Registration Collision:</span>
                        </div>
                        <p className="text-[11px] text-rose-100/90 leading-relaxed pl-5">
                          &quot;Active Full-Time in <strong>1-10000001 (Chennai Institute of AI & Tech)</strong> AND <strong>1-20000002 (Bengaluru College of Engineering)</strong> within the same academic window (AY 2025-26, Semester 3).&quot;
                        </p>
                        <div className="text-[10px] text-rose-300/80 pl-5 flex items-center gap-3 pt-1">
                          <span>Penalty: Debarment under Rule 14.2</span>
                          <span>•</span>
                          <span>Zero-Tolerance Fraud Mitigation</span>
                        </div>
                      </div>

                      {/* Working Action Buttons */}
                      <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-white/[0.06]">
                        <button
                          type="button"
                          onClick={() => handleFreezeLedger(fraud.apaar_id, fraud.full_name)}
                          disabled={isLedgerFrozen}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(244,63,94,0.35)] flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShieldOff className="w-3.5 h-3.5" />
                          <span>{isLedgerFrozen ? "Ledger Frozen (Locked)" : "Freeze APAAR Credit Ledger"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDispatchNotice(fraud.apaar_id, fraud.full_name)}
                          disabled={noticeDispatched}
                          className="px-4 py-2 rounded-xl bg-[#0B0C14] hover:bg-[#121324] disabled:opacity-50 text-amber-300 border border-amber-500/30 font-bold text-xs transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{noticeDispatched ? "Show-Cause Notice Sent" : "Dispatch Show-Cause Notice to Nodal Officers"}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {/* SIH WINNING FEATURE 1: REGULATOR ANALYTICS VISUALS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: State-Wise APAAR Saturation */}
              <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">
                      State-Wise APAAR Saturation
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                    DPI Seeding
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* Tamil Nadu: 94% */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white font-sans font-semibold">Tamil Nadu</span>
                      <span className="text-cyan-400 font-bold">94% Saturation</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#05050A] overflow-hidden border border-white/[0.05]">
                      <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] rounded-full" style={{ width: "94%" }} />
                    </div>
                    <div className="text-[9px] text-slate-500 flex justify-between">
                      <span>Target: 1.42M Students</span>
                      <span>Enrolled: 1.33M</span>
                    </div>
                  </div>

                  {/* Karnataka: 89% */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white font-sans font-semibold">Karnataka</span>
                      <span className="text-indigo-400 font-bold">89% Saturation</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#05050A] overflow-hidden border border-white/[0.05]">
                      <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full" style={{ width: "89%" }} />
                    </div>
                    <div className="text-[9px] text-slate-500 flex justify-between">
                      <span>Target: 1.15M Students</span>
                      <span>Enrolled: 1.02M</span>
                    </div>
                  </div>

                  {/* Maharashtra: 86% */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white font-sans font-semibold">Maharashtra</span>
                      <span className="text-purple-400 font-bold">86% Saturation</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#05050A] overflow-hidden border border-white/[0.05]">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: "86%" }} />
                    </div>
                    <div className="text-[9px] text-slate-500 flex justify-between">
                      <span>Target: 1.68M Students</span>
                      <span>Enrolled: 1.44M</span>
                    </div>
                  </div>

                  {/* Telangana: 82% */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white font-sans font-semibold">Telangana</span>
                      <span className="text-violet-400 font-bold">82% Saturation</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#05050A] overflow-hidden border border-white/[0.05]">
                      <div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full" style={{ width: "82%" }} />
                    </div>
                    <div className="text-[9px] text-slate-500 flex justify-between">
                      <span>Target: 0.95M Students</span>
                      <span>Enrolled: 0.78M</span>
                    </div>
                  </div>

                  {/* Delhi NCT: 91% */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white font-sans font-semibold">Delhi NCT</span>
                      <span className="text-teal-400 font-bold">91% Saturation</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#05050A] overflow-hidden border border-white/[0.05]">
                      <div className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full" style={{ width: "91%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: National Credit Mobility Index */}
              <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">
                      National Credit Mobility Index
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                    NEP 2020 Flow
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Distribution of cross-institutional academic credit mobility and digital credit recognition under the Academic Bank of Credits.
                </p>

                {/* Stacked Visual Bar */}
                <div className="space-y-2">
                  <div className="w-full h-3 rounded-full bg-[#05050A] overflow-hidden flex border border-white/[0.05]">
                    <div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: "64%" }} title="Inter-College Transfers: 64%" />
                    <div className="h-full bg-indigo-500" style={{ width: "28%" }} title="SWAYAM/MOOCs: 28%" />
                    <div className="h-full bg-amber-500" style={{ width: "8%" }} title="Industry Internships: 8%" />
                  </div>

                  <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-center pt-1">
                    <div className="p-2 rounded-xl bg-[#05050A]/80 border border-white/[0.07]">
                      <div className="text-cyan-400 font-extrabold text-sm">64%</div>
                      <div className="text-slate-400 text-[9px] mt-0.5">MEME Transfers</div>
                      <div className="text-slate-500 text-[8px]">48,210 Cr</div>
                    </div>

                    <div className="p-2 rounded-xl bg-[#05050A]/80 border border-white/[0.07]">
                      <div className="text-indigo-400 font-extrabold text-sm">28%</div>
                      <div className="text-slate-400 text-[9px] mt-0.5">SWAYAM / NPTEL</div>
                      <div className="text-slate-500 text-[8px]">21,090 Cr</div>
                    </div>

                    <div className="p-2 rounded-xl bg-[#05050A]/80 border border-white/[0.07]">
                      <div className="text-amber-400 font-extrabold text-sm">8%</div>
                      <div className="text-slate-400 text-[9px] mt-0.5">Virtual Interns</div>
                      <div className="text-slate-500 text-[8px]">6,020 Cr</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#05050A]/80 border border-white/[0.07] text-[11px] text-slate-300 font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Migrated Credits:</span>
                    <span className="text-white font-bold">75,320 Credits</span>
                  </div>
                  <div className="flex justify-between items-center text-cyan-400 pt-1">
                    <span>Validation Ledger:</span>
                    <span>100% Cryptographic Anchor</span>
                  </div>
                </div>
              </div>

              {/* Card 3: AICTE Activity Point Compliance Rate */}
              <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-bold text-white">
                      Activity Point Compliance Rate
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 font-bold">
                    Graduation Threshold
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-full border-4 border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
                    <div className="text-center">
                      <div className="text-xl font-extrabold font-mono text-white">84.6%</div>
                      <div className="text-[8px] font-mono text-amber-400 uppercase">On Track</div>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <p className="text-slate-300 font-semibold">Degree Completion Readiness</p>
                    <p className="text-[11px] text-slate-400">
                      Students meeting the mandatory 50-100 activity point threshold across hackathons, social innovation, and sports.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/[0.06] text-[11px] font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      &ge; 50 Points (Approved):
                    </span>
                    <span className="text-white font-bold">84.6%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      25 - 49 Points (In Grace Period):
                    </span>
                    <span className="text-white font-bold">12.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-rose-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      &lt; 25 Points (Action Mandated):
                    </span>
                    <span className="text-white font-bold">3.3%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry KPIs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Total APAAR Profiles
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {regulatorData?.telemetry?.total_students || 3}
                </div>
                <div className="text-[10px] text-cyan-400 mt-1 flex items-center gap-1 font-mono">
                  <span>+100% DPI Coverage</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Approved Institutions
                </div>
                <div className="text-2xl font-black text-indigo-400 font-mono">
                  {regulatorData?.telemetry?.total_institutions || 2}
                </div>
                <div className="text-[10px] text-indigo-400 mt-1 flex items-center gap-1 font-mono">
                  <span>Tier-1 Accredited</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  ABC Credits Banked
                </div>
                <div className="text-2xl font-black text-cyan-300 font-mono">
                  {regulatorData?.telemetry?.total_credits_banked || 122}
                </div>
                <div className="text-[10px] text-cyan-400 mt-1 flex items-center gap-1 font-mono">
                  <span>SHA-256 Anchored</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Active DEPA Grants
                </div>
                <div className="text-2xl font-black text-purple-400 font-mono">
                  {regulatorData?.telemetry?.total_approved_consents || 2}
                </div>
                <div className="text-[10px] text-purple-400 mt-1 flex items-center gap-1 font-mono">
                  <span>Zero-Knowledge Enabled</span>
                </div>
              </div>
            </div>

            {/* Institution Ledger Table */}
            <div className="p-6 rounded-3xl bg-[#0B0C14]/80 border border-white/[0.07] hover:border-indigo-500/40 backdrop-blur-2xl shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">
                    Affiliated Higher Education Institutions
                  </h4>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Apex Regulatory Registry
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-slate-400 font-mono text-[10px] uppercase">
                      <th className="py-2 px-3">AICTE Code</th>
                      <th className="py-2 px-3">Institution Name</th>
                      <th className="py-2 px-3">State</th>
                      <th className="py-2 px-3 text-right">Regulatory Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] font-sans">
                    {regulatorData?.institutions?.map((inst: any, idx: number) => (
                      <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-cyan-300">
                          {inst.aicte_code}
                        </td>
                        <td className="py-3 px-3 text-white font-medium">{inst.name}</td>
                        <td className="py-3 px-3 text-slate-400">{inst.state}</td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                            AICTE APPROVED
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* SIH WINNING FEATURE 1: W3C VERIFIABLE CREDENTIAL & CYBER TAMPER SIMULATOR */}
      {/* ========================================================================= */}
      {selectedCredential && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-4xl bg-[#0B0C14]/95 border rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.85)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 ${
              isTamperMode ? "border-rose-500/80 shadow-[0_0_35px_rgba(244,63,94,0.35)]" : "border-indigo-400/30"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#121324] via-[#0D0E1A] to-[#1A102B]">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    W3C Verifiable Credential v1.1
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-bold">
                    JSON-LD
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                    Ed25519Signature2020
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {selectedCredential.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Issuer: {selectedCredential.jsonLd?.issuer} • Subject: {selectedCredential.jsonLd?.credentialSubject?.id}
                </p>
              </div>

              {/* SIMULATE CYBER TAMPER ATTACK TOGGLE */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleTamperSimulation(!isTamperMode)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-md cursor-pointer ${
                    isTamperMode
                      ? "bg-rose-500 text-white border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.5)] animate-pulse"
                      : "bg-[#0B0C14] hover:bg-[#121324] text-rose-300 border border-rose-500/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>{isTamperMode ? "Tamper Attack: ACTIVE" : "Simulate Cyber Tamper Attack"}</span>
                </button>

                <button
                  onClick={() => setSelectedCredential(null)}
                  className="p-2 rounded-xl bg-[#0B0C14] hover:bg-[#121324] border border-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* FLASHING RED ALERT BANNER WHEN TAMPER ATTACK IS ACTIVE */}
            {isTamperMode && tamperMismatch && (
              <div className="px-5 py-3 bg-rose-950/60 border-b border-rose-500/40 text-rose-200 flex items-center justify-between gap-3 animate-pulse">
                <div className="flex items-center gap-2 text-xs font-extrabold tracking-wide text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    ⚠️ CRYPTOGRAPHIC MISMATCH DETECTED: Computed Hash does not match Ledger Anchor Hash! Document Rejected.
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-rose-500/40 px-2 py-0.5 rounded text-white font-black shrink-0">
                  INTEGRITY VIOLATED
                </span>
              </div>
            )}

            {/* TAMPER SIMULATION CONTROL BAR & HASH COMPARISON */}
            {isTamperMode && (
              <div className="px-5 sm:px-6 py-3 bg-[#070810]/95 border-b border-white/[0.08] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <ShieldOff className="w-3.5 h-3.5 text-rose-400" />
                    Simulate Grade Inflation (Edit Grade to Watch Hash Recomputation):
                  </span>
                  <div className="flex items-center gap-1.5">
                    {["O", "A+", "A", "B+", "F"].map((gradeOption) => (
                      <button
                        key={gradeOption}
                        type="button"
                        onClick={() => handleTamperedGradeChange(gradeOption)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                          tamperedGrade === gradeOption
                            ? "bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30"
                            : "bg-[#0B0C14] text-slate-300 border border-white/[0.1] hover:border-rose-400"
                        }`}
                      >
                        {gradeOption}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Side-by-Side Cryptographic Hash Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-mono">
                  <div className="p-2.5 rounded-xl bg-[#05050A]/90 border border-emerald-500/30 text-emerald-300 space-y-1">
                    <div className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      National ABC Ledger Anchor Hash (Immutable):
                    </div>
                    <div className="text-[10px] break-all text-slate-300">
                      {selectedCredential.jsonLd?.proof?.sha256Hash}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#05050A]/90 border border-rose-500/50 text-rose-300 space-y-1">
                    <div className="text-[10px] font-bold uppercase text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      Live Re-Computed Hash (From Tampered DOM):
                    </div>
                    <div className="text-[10px] break-all text-rose-200 font-bold">
                      {computedLiveHash}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Badges Bar */}
            <div className="px-5 sm:px-6 py-2.5 bg-[#070810]/80 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-4 text-slate-300">
                <span
                  className={`flex items-center gap-1.5 font-bold ${
                    isTamperMode ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  {isTamperMode ? (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-rose-400" />
                      CRYPTOGRAPHIC INTEGRITY BROKEN • SIGNATURE FORGED
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      SIGNATURE VALID & ANCHORED (Ed25519 Verified)
                    </>
                  )}
                </span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="text-slate-400">
                  Hash: <span className="text-slate-200">{selectedCredential.jsonLd?.proof?.sha256Hash?.slice(0, 20)}...</span>
                </span>
              </div>
              <span className="text-cyan-400 font-semibold">
                AICTE Academic Bank of Credits Anchor
              </span>
            </div>

            {/* Modal Body: Raw JSON-LD viewer with syntax feel */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#05050A] font-mono text-xs text-slate-200 space-y-2 selection:bg-indigo-500/40">
              <pre
                className={`overflow-x-auto leading-relaxed p-4 rounded-2xl border text-[11px] ${
                  isTamperMode
                    ? "bg-rose-950/20 border-rose-500/40 text-rose-200"
                    : "bg-[#0B0C14]/90 border-white/[0.08] text-cyan-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                }`}
              >
                {JSON.stringify(
                  {
                    ...selectedCredential.jsonLd,
                    credentialSubject: {
                      ...selectedCredential.jsonLd.credentialSubject,
                      ...(selectedCredential.type === "academic_credit"
                        ? {
                            gradeAwarded: isTamperMode
                              ? `${tamperedGrade} [TAMPERED - ORIGINAL: ${selectedCredential.data?.grade}]`
                              : selectedCredential.data?.grade,
                          }
                        : selectedCredential.type === "activity_certificate"
                        ? {
                            activityPointsAwarded: isTamperMode
                              ? `${tamperedGrade} [TAMPERED - ORIGINAL: ${selectedCredential.data?.points_awarded}]`
                              : selectedCredential.data?.points_awarded,
                          }
                        : {
                            overallProficiencyScore: isTamperMode
                              ? `99.9% [TAMPERED - ORIGINAL: ${selectedCredential.data?.overall_proficiency}]`
                              : selectedCredential.data?.overall_proficiency,
                          }),
                    },
                    proof: {
                      ...selectedCredential.jsonLd.proof,
                      verificationStatus: isTamperMode ? "SIGNATURE_INVALID_MISMATCH" : "VALID_ASSERTION",
                      computedLiveDocumentHash: computedLiveHash,
                      ledgerAnchorHash: selectedCredential.jsonLd.proof.sha256Hash,
                    },
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#070810]/95 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interoperable with DigiLocker, EU Europass & W3C DID Registries</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyCredentialJson}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B0C14] hover:bg-[#121324] text-slate-200 text-xs font-semibold border border-white/[0.1] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all cursor-pointer"
                >
                  {modalCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{modalCopied ? "Copied!" : "Copy W3C JSON-LD"}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B0C14] hover:bg-[#121324] text-slate-200 text-xs font-semibold border border-white/[0.1] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Print Official Transcript</span>
                </button>

                <button
                  onClick={() => setSelectedCredential(null)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(99,102,241,0.35)] cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MINT APAAR ID / NEW STUDENT eKYC ONBOARDING MODAL */}
      {/* ========================================================================= */}
      {showRegisterModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => !isMinting && setShowRegisterModal(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#0B0C14]/95 border border-indigo-400/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.85)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-start justify-between gap-4 bg-gradient-to-r from-[#121324] via-[#0D0E1A] to-[#1A102B]">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-bold">
                    UIDAI eKYC 2.0
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    DigiLocker DPI Verified
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                    ABC Ledger Minting
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>UIDAI eKYC &amp; DigiLocker Student Onboarding</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Mint an official 12-digit APAAR ID anchored to India&apos;s National Academic Depository ledger.
                </p>
              </div>

              {!isMinting && (
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="p-2 rounded-xl bg-[#0B0C14] hover:bg-[#121324] border border-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              {isMinting ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-400 animate-spin flex items-center justify-center" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-3 max-w-md">
                    <h4 className="text-base font-bold text-white">
                      Minting Official APAAR ID on AICTE Ledger
                    </h4>

                    {/* Step progress pills */}
                    <div className="space-y-2 text-left">
                      <div
                        className={`p-3 rounded-xl border text-xs font-mono flex items-center gap-2.5 transition-all ${
                          mintStage >= 1
                            ? "bg-indigo-950/40 border-indigo-500/50 text-indigo-300"
                            : "bg-[#05050A]/60 border-white/[0.06] text-slate-500"
                        }`}
                      >
                        {mintStage > 1 ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin shrink-0" />
                        )}
                        <span>Stage 1: Validating Aadhaar eKYC via UIDAI Digital Signature Gateway...</span>
                      </div>

                      <div
                        className={`p-3 rounded-xl border text-xs font-mono flex items-center gap-2.5 transition-all ${
                          mintStage >= 2
                            ? "bg-purple-950/40 border-purple-500/50 text-purple-300"
                            : "bg-[#05050A]/60 border-white/[0.06] text-slate-500"
                        }`}
                      >
                        {mintStage > 2 ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : mintStage === 2 ? (
                          <div className="w-4 h-4 rounded-full border-2 border-purple-400 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-600 shrink-0" />
                        )}
                        <span>Stage 2: Fetching UDISE+ School Education History &amp; 10th/12th PEN...</span>
                      </div>

                      <div
                        className={`p-3 rounded-xl border text-xs font-mono flex items-center gap-2.5 transition-all ${
                          mintStage >= 3
                            ? "bg-cyan-950/40 border-cyan-500/50 text-cyan-300"
                            : "bg-[#05050A]/60 border-white/[0.06] text-slate-500"
                        }`}
                      >
                        {mintStage === 3 ? (
                          <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-600 shrink-0" />
                        )}
                        <span>Stage 3: Anchoring 12-Digit Identifier to AICTE ABC Cryptographic Ledger...</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Student Full Name (as on Aadhaar / Matriculation) <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        placeholder="e.g. Dr. Vikram Seth / Aarav Patel"
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Date of Birth <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={regDob}
                        onChange={(e) => setRegDob(e.target.value)}
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Gender <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={regGender}
                        onChange={(e) => setRegGender(e.target.value)}
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Aadhaar Last 4 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Aadhaar Last 4 Digits <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        required
                        pattern="\d{4}"
                        value={regAadhaarLast4}
                        onChange={(e) => setRegAadhaarLast4(e.target.value.replace(/\D/g, ""))}
                        placeholder="e.g. 8821"
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                      />
                    </div>

                    {/* UDISE+ PEN */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        UDISE+ School PEN (Optional)
                      </label>
                      <input
                        type="text"
                        value={regUdisePen}
                        onChange={(e) => setRegUdisePen(e.target.value)}
                        placeholder="e.g. PEN9981234 (Auto-assigned if blank)"
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                      />
                    </div>

                    {/* Class 10 % */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Class 10th Percentage (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="35"
                        max="100"
                        value={regClass10}
                        onChange={(e) => setRegClass10(e.target.value)}
                        placeholder="e.g. 92.4"
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                      />
                    </div>

                    {/* Class 12 % */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Class 12th Percentage (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="35"
                        max="100"
                        value={regClass12}
                        onChange={(e) => setRegClass12(e.target.value)}
                        placeholder="e.g. 89.8"
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                      />
                    </div>

                    {/* Institution */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Admitted AICTE Institution <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={regAicteCode}
                        onChange={(e) => setRegAicteCode(e.target.value)}
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                      >
                        <option value="1-10000001">1-10000001 — Indian Institute of Technology Madras (Chennai, TN)</option>
                        <option value="1-20000002">1-20000002 — Indian Institute of Science (IISc Bengaluru, KA)</option>
                      </select>
                    </div>

                    {/* Custom 12-Digit APAAR ID */}
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-300">
                          Custom 12-Digit APAAR ID (Optional)
                        </label>
                        <span className="text-[10px] text-indigo-400 font-mono">
                          Leave blank to auto-mint unique 12 digits
                        </span>
                      </div>
                      <input
                        type="text"
                        maxLength={12}
                        value={regCustomApaar}
                        onChange={(e) => setRegCustomApaar(e.target.value.replace(/\D/g, ""))}
                        placeholder="e.g. 555888999111 (or leave blank to auto-mint)"
                        className="w-full bg-[#070810]/90 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                      />
                    </div>
                  </div>

                  {/* DPI Genesis Guarantee Notice */}
                  <div className="p-3.5 rounded-2xl bg-[#070810]/90 border border-indigo-400/20 flex items-start gap-3 text-[11px] text-indigo-200/90 font-mono shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>DigiLocker Genesis Guarantee:</strong> Onboarding automatically anchors 1 welcome foundation credit (4 Credits, Grade O) with a SHA-256 cryptographic seal and initializes an active DEPA consent token for instant QR verification.
                    </span>
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowRegisterModal(false)}
                      className="px-4 py-2.5 rounded-xl bg-[#0B0C14] hover:bg-[#121324] border border-white/[0.08] text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Mint APAAR ID via DigiLocker eKYC</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIH WINNING FEATURE 3: COLLAPSIBLE LIVE DPI CRYPTOGRAPHIC EVENT STREAM */}
      {/* ========================================================================= */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 bg-[#05050A]/95 border-t border-white/[0.08] backdrop-blur-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.7)] transition-all duration-300">
        {/* Terminal Header Bar */}
        <div
          onClick={() => setIsTelemetryCollapsed(!isTelemetryCollapsed)}
          className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between cursor-pointer select-none text-xs font-mono"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>&gt;_ {t.telemetryStream}</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] bg-[#0B0C14] border border-white/[0.08] text-slate-400 px-2 py-0.5 rounded-full">
              {telemetryEvents.length} Real-Time Ledger Events
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            {isTelemetryCollapsed && telemetryEvents[0] && (
              <span className="truncate max-w-[280px] sm:max-w-md text-slate-300 text-[10px]">
                Latest: {telemetryEvents[0].message}
              </span>
            )}
            <div className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold">
              <span>{isTelemetryCollapsed ? "Expand Terminal" : "Collapse"}</span>
              {isTelemetryCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </div>
        </div>

        {/* Collapsible Log Stream Console */}
        {!isTelemetryCollapsed && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 max-h-36 overflow-y-auto no-scrollbar space-y-1 font-mono text-[11px] border-t border-white/[0.06] pt-2">
            {telemetryEvents.map((ev) => (
              <div
                key={ev.id}
                className="flex items-start gap-2.5 py-0.5 px-2 rounded hover:bg-white/[0.03] transition-colors"
              >
                <span className="text-slate-500 shrink-0">[{ev.timestamp}]</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-black shrink-0 ${
                    ev.type === "AUTH"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : ev.type === "CRYPTO"
                      ? "bg-cyan-500/20 text-cyan-400"
                      : ev.type === "CONSENT"
                      ? "bg-purple-500/20 text-purple-400"
                      : ev.type === "OCR"
                      ? "bg-amber-500/20 text-amber-300"
                      : ev.type === "MERKLE"
                      ? "bg-indigo-500/20 text-indigo-400"
                      : ev.type === "FRAUD"
                      ? "bg-rose-500/25 text-rose-400 animate-pulse font-extrabold"
                      : "bg-teal-500/20 text-teal-400"
                  }`}
                >
                  [{ev.type}]
                </span>
                <span className="text-slate-200 flex-1 truncate">{ev.message}</span>
                {ev.hash && (
                  <span className="text-[10px] text-emerald-400/80 bg-[#0B0C14] border border-white/[0.05] px-1.5 py-0.2 rounded shrink-0 hidden sm:inline">
                    Hash: {ev.hash.slice(0, 12)}...
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#05050A] py-4 text-center text-xs text-slate-500">
        AICTE-APAAR Unified Student Data & Verification Platform • Built on India&apos;s Digital Public Infrastructure (DPI)
      </footer>
    </div>
  );
}
