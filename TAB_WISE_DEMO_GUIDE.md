# Tab-Wise Video Demo Guide: The 4 Portals of AICTE-APAAR
### *Master Production Guide, Screen Actions & Narration Script for Each Tab*

Live Application URL: **[https://aicte-apaar-platform-one.vercel.app](https://aicte-apaar-platform-one.vercel.app)**  
Exact Video Runtime: **2 Minutes (120 Seconds)**  
Recommended Browser Zoom: **90%** (Full HD 1080p)

---

## 🗺️ Master 4-Tab Timeline

```
0:00 ──────── 0:10 ──────────────── 0:50 ───────────────── 1:15 ────────────────── 1:35 ──────────────── 1:55 ── 2:00
      Intro             TAB 1                    TAB 2                     TAB 3                   TAB 4           Outro
   (Header/DPI)    (Student Wallet)         (Nodal Officer)         (Recruiter Verifier)    (National Regulator)  (Telemetry)
```

---

## 🖥️ TAB 1: Student APAAR Wallet & DEPA Hub (`activeTab === "student"`)
**Time Window**: **0:10 – 0:50** *(40 Seconds)*  
**Primary Persona**: Click top persona pill **`Arjun (Active B.Tech - 482910394812)`**

### 1. Digital APAAR Smart Card & Credit Meters (0:10 – 0:20)
- **What to Show on Screen**:
  - The official **Digital APAAR Smart ID Card** with the gold EMV smart chip graphic, student photo, UDISE+ PEN (`PEN9981234`), 12-digit spaced APAAR ID (`4829 1039 4812`), and green `ACTIVE` status pill.
  - The dual glowing progress bars:
    - **Academic Credits**: `42 / 160 Credits` (Foundation: 40 Cr, Diploma: 80 Cr, Degree: 160 Cr).
    - **AICTE Activity Points**: `65 / 100 Points` (Min Threshold: 50 Pts, National Honors: 100 Pts).
- **Exact Action to Perform**:
  - Click the top persona pill **`Arjun (Active B.Tech)`** $\rightarrow$ card and meters authenticate instantly.
  - Move your mouse smoothly over the EMV smart chip and along the two credit progress bars.
- **Voiceover (What to Speak)**:
  > *"In Portal 1, students authenticate via DigiLocker eKYC into their sovereign APAAR Wallet. Here is Arjun's digital Smart ID card, linked to his UDISE+ school record and the Academic Bank of Credits, tracking his 160-credit degree pathway and mandatory 100 activity points."*
- **SIH Judge Value**: Demonstrates seamless integration with India Stack (DigiLocker, UDISE+, and ABC) under NEP 2020.

---

### 2. Flagship 1: AICTE Skill-DNA & NEP Credit Radar (0:20 – 0:30)
- **What to Show on Screen**:
  - Scroll down slightly to the **AICTE Skill-DNA & NEP Credit Radar** card.
  - The animated 240x240 SVG polar radar chart with cyan/purple mesh glow and 4 competency domains:
    - Core Algorithms & Systems: **88%** (CS101)
    - Machine Intelligence & Data: **92%** (AI202)
    - Hands-on Innovation (Hackathons): **85%** (SIH Winner)
    - Professional Practice & Ethics: **75%** (Internship)
  - The official national badge: **`NSQF Level 7 Certified Competency Matrix`**.
- **Exact Action to Perform**:
  - Point your mouse to the radar polygon and vertex points.
  - Click the button **`Export W3C Credential`** $\rightarrow$ dark glassmorphic modal opens displaying the complete W3C JSON-LD credential payload (`skill_dna_competency`).
  - Press `ESC` or click top-right `✕` to close the modal.
- **Voiceover (What to Speak)**:
  > *"Under NEP 2020, learning is multi-dimensional. Our Skill-DNA Radar dynamically parses Arjun's coursework and hackathons into an official NSQF Level 7 Certified Competency Matrix, exportable as an internationally verifiable W3C JSON-LD credential."*
- **SIH Judge Value**: Solves the problem of evaluating non-academic and technical competencies in a single standardized credential.

---

### 3. Flagship 2: Privacy-Preserving ZK-Proof Generator (0:30 – 0:40)
- **What to Show on Screen**:
  - Scroll to the **Privacy-Preserving ZK-Proof Generator** section.
  - Two pre-set rules: Rule A (CGPA ≥ 8.0) and Rule B (Activity Points ≥ 50).
- **Exact Action to Perform**:
  - Click **Rule A: "Verify CGPA is ≥ 8.0 without revealing exact score"**.
  - Click **`Generate ZK Proof for Rule A`** $\rightarrow$ watch the 3-stage animated progress bar:
    - *Stage 1: Formulating R1CS Polynomial Constraints (33%)*
    - *Stage 2: Computing Secret Witness on BN254 Curve (66%)*
    - *Stage 3: Synthesizing Groth16 zk-SNARK & ABC Anchor (99%)*
  - The attestation box appears showing token `zkp_aicte_gpa_8_0_...` and `"0 bits PII leakage"`.
  - Click the button **`Test in Recruiter Verifier (Tab 3) →`** *(the platform instantly switches to Tab 3 and verifies; show the glowing badge for 2 seconds, then click back to Tab 1)*.
- **Voiceover (What to Speak)**:
  > *"Students applying for internships shouldn't have to surrender their private transcripts. Using Groth16 zk-SNARKs on the BN254 elliptic curve, Arjun generates a Zero-Knowledge proof for 'CGPA ≥ 8.0'. Employers get mathematical certainty with zero personal identity or score leakage."*
- **SIH Judge Value**: First-of-its-kind cryptographic privacy preservation in Indian student verification.

---

### 4. Flagship 3: AI Vision OCR & Anti-Forgery Scanner (0:40 – 0:50)
- **What to Show on Screen**:
  - Scroll down to the **AI OCR Drag-and-Drop Certificate Scanner** card.
  - The dual quick-test demo buttons above the drop zone.
- **Exact Action to Perform**:
  - **Action A (Authentic Pass)**: Click **`Load Authentic Certificate (Pass)`** $\rightarrow$ 3-stage visual scanner completes $\rightarrow$ shows **Name Match: 100%**, **Issuer Signature: 98.4%**, **Forgery Check: Passed (Authentic)** in green.
  - **Action B (Forged Fail)**: Immediately click **`Load Forged Certificate (Fail Check)`** $\rightarrow$ scanner extracts `Rajesh Kumar (Tampered)` $\rightarrow$ Name Match plunges to **14%**, Forgery Check flips to red **`FAILED (High Risk)`**, and a prominent red Forgery Warning alert appears!
- **Voiceover (What to Speak)**:
  > *"Next, our OpenCV AI Vision scanner verifies uploaded certificates. When Arjun uploads his hackathon award, it passes with 100% confidence. But when a forged certificate with an altered name is uploaded, our engine flags a demographic mismatch and immediately rejects it with a 94% forgery probability!"*
- **SIH Judge Value**: Directly prevents certificate Photoshop / font interpolation fraud with automated cross-checking against the sovereign APAAR registry.

---

## 🏛️ TAB 2: AICTE Institution (Nodal Officer) Portal (`activeTab === "nodal"`)
**Time Window**: **0:50 – 1:15** *(25 Seconds)*  
**Tab to Click**: Top navigation bar $\rightarrow$ **`2. AICTE Institution (Nodal Officer)`**

### 1. Nodal Overview & NEP 2020 AI Equivalency (0:50 – 1:02)
- **What to Show on Screen**:
  - Header: **"AICTE Institutional Nodal Officer Portal"** (`Chennai Institute of AI & Technology - 1-10000001`).
  - Scroll down to the **AI NEP 2020 Credit Equivalency Preview** table:
    - `CS101 (Prog in C)` $\rightarrow$ `PCC-CS301 (Data Structures)` (4 Cr, 96% Overlap, 🟢 Compliant)
    - `AI202 (Intro to AI/ML)` $\rightarrow$ `PEC-AI402 (Advanced Applied ML)` (4 Cr, 98% Overlap, 🟢 Compliant)
  - The badge: **`96% Syllabus Overlap Verified`**.
- **Exact Action to Perform**:
  - Hover mouse over the 96% Syllabus Overlap badge and the course mapping table.
- **Voiceover (What to Speak)**:
  > *"In Portal 2, institutional nodal officers govern credits. For student mobility under NEP 2020, our AI Equivalency engine automatically evaluates syllabus overlap against the AICTE Model Curriculum with 96% accuracy, eliminating manual evaluation delays."*
- **SIH Judge Value**: Automates course equivalency, which is currently the #1 bottleneck for student mobility across Indian state universities.

---

### 2. 1-Click MEME Institutional Transfer & Bulk ERP Ingestion (1:02 – 1:15)
- **What to Show on Screen**:
  - Form: **"NEP 2020 Multiple Entry / Multiple Exit (MEME) Institutional Transfer"**.
  - Section: **"Bulk ERP Credit Batch Ingestion (CSV / API Integration)"**.
- **Exact Action to Perform**:
  - In student dropdown, select **`739104829104 - Priya Nair (Status: EXITED_DIPLOMA)`**.
  - Target institution is already set to `1-20000002 (Bengaluru Institute of Technology)`.
  - Click the button **`Execute 1-Click MEME Institutional Transfer`** $\rightarrow$ watch Priya's status immediately restore to `ACTIVE` with full historical credit ledger transferred!
  - Scroll down and click **`1-Click Bulk ERP CSV Sync (50 Records)`** $\rightarrow$ progress bar reaches 100%, displaying Merkle Root `0x7a3f8b...` at `₹0.00` network fee.
- **Voiceover (What to Speak)**:
  > *"Watch Priya Nair, who exited with a diploma, seamlessly transfer from Chennai to Bengaluru in a single click, instantly restoring her active status with zero credit loss. Furthermore, nodal officers can batch-sync 50 student ERP records simultaneously, anchoring a Merkle DAG tree at zero transaction fee."*
- **SIH Judge Value**: Realizes the NEP 2020 vision of Multiple Entry and Multiple Exit (MEME) with zero bureaucratic paper trails.

---

## 💼 TAB 3: Recruiter / 3rd-Party Verifier Portal (`activeTab === "recruiter"`)
**Time Window**: **1:15 – 1:35** *(20 Seconds)*  
**Tab to Click**: Top navigation bar $\rightarrow$ **`3. Recruiter / 3rd-Party Verifier`**

### 1. Zero-Knowledge Verifier Mode & Glowing Badge (1:15 – 1:24)
- **What to Show on Screen**:
  - Form 2: **"Verify Cryptographic Student Records"**.
  - Mode toggle: `DEPA Transcript` vs `Zero-Knowledge (ZK)` (Flagship).
- **Exact Action to Perform**:
  - Click the mode button **`Zero-Knowledge (ZK)`**.
  - Click **`Demo ZK-GPA (≥ 8.0)`** $\rightarrow$ auto-fills token `zkp_aicte_gpa_8_0_9f82c1a4e5d6`.
  - Click **`Verify Zero-Knowledge Proof (No PII Revealed)`** $\rightarrow$ brief spinner $\rightarrow$ authentic glowing green badge appears:
    > *"ZK-PROOF VALIDATED: Criterion [CGPA >= 8.0] mathematically proven against AICTE Ledger Anchor. Exact grade and demographic fields remained strictly confidential."*
- **Voiceover (What to Speak)**:
  > *"In Portal 3, employers verify credentials. In Zero-Knowledge mode, recruiters paste the student's zk-SNARK token. In 24 milliseconds, our engine evaluates the elliptic curve pairing and displays an authentic validation badge—confirming Arjun meets the 8.0 CGPA cutoff with zero PII disclosed."*
- **SIH Judge Value**: Privacy-by-design hiring compliant with the Digital Personal Data Protection (DPDP) Act 2023.

---

### 2. W3C Credential Inspector & Cyber Tamper Simulator (1:24 – 1:35)
- **What to Show on Screen**:
  - Switch back to the mode button **`DEPA Transcript`**.
  - Click **`Use Demo Token (IIT Bombay)`** $\rightarrow$ click **`Verify Cryptographic Records`** $\rightarrow$ verified course credits appear with clickable green SHA-256 hash pills.
- **Exact Action to Perform**:
  - Click the green hash pill next to `CS101` $\rightarrow$ modal opens showing W3C JSON-LD credential (`did:in:aicte:1-10000001`).
  - Toggle **`Simulate Cyber Tamper Attack`** ON.
  - Change grade from `A+` to `O`.
  - Point to the live Web Crypto hash recalculation and the flashing red alert banner:
    > *"⚠️ CRYPTOGRAPHIC MISMATCH DETECTED: Computed Hash does not match Ledger Anchor Hash! Document Rejected."*
  - Toggle it OFF $\rightarrow$ signature turns green again $\rightarrow$ close modal (`ESC`).
- **Voiceover (What to Speak)**:
  > *"Under DEPA consent, recruiters inspect verified transcripts with W3C credentials. Watch our Cyber Tamper Simulator: if an attacker modifies a grade from A+ to O, our browser Web Crypto engine live-recomputes the SHA-256 digest, immediately triggering a cryptographic mismatch alarm!"*
- **SIH Judge Value**: Interactive proof of tamper-evident cryptography—proves to judges that forged certificates cannot pass the ledger.

---

## 🛡️ TAB 4: AICTE National Regulator Command Center (`activeTab === "regulator"`)
**Time Window**: **1:35 – 1:55** *(20 Seconds)*  
**Tab to Click**: Top navigation bar $\rightarrow$ **`4. AICTE Regulator Command Center`**

### 1. Macro Analytics & Saturation Progress Bars (1:35 – 1:44)
- **What to Show on Screen**:
  - Header: **"AICTE National Regulator Command Center"** with national KPI metric cards:
    - 48,291 Students Registered | 1,248 Approved Colleges | 1.84M ABC Credits Banked.
  - Visual CSS progress bars:
    - State-Wise APAAR Saturation: Tamil Nadu (**94%**), Karnataka (**89%**), Maharashtra (**86%**).
    - National Credit Mobility Index: **64%** inter-college mobility.
    - Activity Point Compliance: **84.6%** university compliance.
- **Exact Action to Perform**:
  - Move mouse smoothly across the state saturation progress bars and the mobility index gauge.
- **Voiceover (What to Speak)**:
  > *"Finally, Portal 4 is the National Regulator Command Center. AICTE officials monitor real-time macro telemetry: state-wise APAAR saturation across Tamil Nadu and Karnataka, the National Credit Mobility Index, and university compliance rates."*
- **SIH Judge Value**: Gives AICTE and the Ministry of Education executive-level visibility into national academic trends.

---

### 2. Dual-Enrollment Collision Defense & 1-Click Ledger Freeze (1:44 – 1:55)
- **What to Show on Screen**:
  - Scroll down to the flashing red alert card:
    **"🚨 DUAL-ENROLLMENT / GHOST STUDENT FRAUD ALERT"** for **Rohan Verma (`999888777666`)**.
  - Collision details: Active full-time in `1-10000001 (Chennai Institute)` AND `1-20000002 (Bengaluru College)` within the same academic window.
- **Exact Action to Perform**:
  - Click the red button **`Freeze APAAR Credit Ledger`** $\rightarrow$ toast alert appears and status updates to `LEDGER FROZEN & LOCKDOWN`.
  - Click the orange button **`Dispatch Show-Cause Notice to Nodal Officers`** $\rightarrow$ issues official notice `SCN-2026-8891`.
- **Voiceover (What to Speak)**:
  > *"Crucially, our platform stops ghost enrollment fraud. When Rohan Verma is detected simultaneously enrolled in Chennai and Bengaluru, the collision engine alerts regulators. With one click, officials freeze his credit ledger and dispatch show-cause notices to both institutions."*
- **SIH Judge Value**: Solves the real-world fraud problem of ghost students and scholarship exploitation across Indian colleges.

---

## 🏁 OUTRO: Live Telemetry & Vercel Production (1:55 – 2:00)
**Time Window**: **1:55 – 2:00** *(5 Seconds)*  
- **What to Show on Screen**:
  - Click the bottom terminal bar: **`>_ Live DPI Ledger Telemetry`** $\rightarrow$ terminal drawer expands showing streaming real-time SHA-256 cryptographic logs.
  - Hover over the browser address bar showing: `https://aicte-apaar-platform-one.vercel.app`.
- **Voiceover (What to Speak)**:
  > *"Deployed edge-native on Vercel Mumbai with 31 integration tests and zero verification fees, this is the sovereign digital infrastructure empowering Viksit Bharat 2047. Thank you!"*

---

## ⚡ 10-Second Quick Rehearsal Cheat Sheet

| Tab | Key Clicks | Key Feature to Highlight |
| :---: | :--- | :--- |
| **Tab 1** | 1. Persona `Arjun`<br>2. Radar `Export W3C`<br>3. ZK Rule A `Generate`<br>4. OCR `Authentic` $\rightarrow$ `Forged` | • Smart Card & Progress Meters<br>• NSQF Level 7 Radar<br>• Groth16 ZK-GPA<br>• Demographic Forgery Rejection |
| **Tab 2** | 1. Student `Priya Nair`<br>2. Click `Execute MEME Transfer`<br>3. Click `Bulk ERP Sync` | • 96% AI Syllabus Overlap<br>• 1-Click MEME Transfer<br>• Merkle Tree CSV Batch Ingestion |
| **Tab 3** | 1. Mode `Zero-Knowledge`<br>2. Click `Verify ZK Proof`<br>3. Mode `DEPA`<br>4. Hash Pill `CS101`<br>5. Toggle `Tamper Attack` ON $\rightarrow$ Change Grade to `O` | • Glowing ZK Proof Badge (0 PII)<br>• W3C VC JSON-LD Inspector<br>• Live In-Browser Cyber Tamper Alert |
| **Tab 4** | 1. Hover State Saturation<br>2. Rohan Verma `Freeze Ledger`<br>3. Click `Dispatch Show-Cause` | • State Saturation Telemetry<br>• Ghost Student Collision Alert<br>• 1-Click Administrative Freeze |
| **Outro** | Expand bottom `>_ Live DPI Ledger Telemetry` | Real-time cryptographic ledger audit trail |
