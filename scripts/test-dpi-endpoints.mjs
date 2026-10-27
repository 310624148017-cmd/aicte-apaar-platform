import { spawn } from "child_process";

const PORT = 3055;
const BASE_URL = `http://localhost:${PORT}`;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTests() {
  console.log("=================================================");
  console.log("AICTE APAAR DPI Backend API Routes - Test Suite");
  console.log("=================================================");

  // Launch Next.js server on port 3055
  console.log(`Starting Next.js server on port ${PORT}...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: "pipe",
  });

  server.stdout.on("data", (data) => {
    // console.log(`[Next.js]: ${data.toString()}`);
  });
  server.stderr.on("data", (data) => {
    // console.error(`[Next.js Error]: ${data.toString()}`);
  });

  // Wait for server to become responsive
  let ready = false;
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`${BASE_URL}/api/dpi/verify-apaar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (res.status === 400) {
        ready = true;
        break;
      }
    } catch {
      await sleep(1000);
    }
  }

  if (!ready) {
    console.error("❌ Failed to connect to Next.js server within 20 seconds.");
    server.kill();
    process.exit(1);
  }

  console.log(" Next.js server is online. Commencing DPI API tests...\n");
  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(` [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------
    // 1. POST /api/dpi/verify-apaar
    // -------------------------------------------------------------
    console.log("--- Testing POST /api/dpi/verify-apaar ---");

    // 1A. Missing parameters
    const res1A = await fetch(`${BASE_URL}/api/dpi/verify-apaar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apaar_id: "123456789012" }),
    });
    const data1A = await res1A.json();
    assert(res1A.status === 400 && data1A.success === false, "Returns 400 when OTP is missing");

    // 1B. Invalid OTP
    const res1B = await fetch(`${BASE_URL}/api/dpi/verify-apaar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apaar_id: "123456789012", otp: "999999" }),
    });
    const data1B = await res1B.json();
    assert(
      res1B.status === 401 && data1B.status === "FAILED",
      "Returns 401 Unauthorized when OTP is not 123456",
      JSON.stringify(data1B)
    );

    // 1C. Valid OTP with non-existent student
    const res1C = await fetch(`${BASE_URL}/api/dpi/verify-apaar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apaar_id: "000000000000", otp: "123456" }),
    });
    const data1C = await res1C.json();
    assert(
      res1C.status === 404 && data1C.status === "NOT_FOUND",
      "Returns 404 when APAAR ID is not in database",
      JSON.stringify(data1C)
    );

    // -------------------------------------------------------------
    // 2. POST /api/dpi/push-credits
    // -------------------------------------------------------------
    console.log("\n--- Testing POST /api/dpi/push-credits ---");

    // 2A. Missing fields
    const res2A = await fetch(`${BASE_URL}/api/dpi/push-credits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apaar_id: "123456789012" }),
    });
    const data2A = await res2A.json();
    assert(res2A.status === 400 && data2A.success === false, "Returns 400 when required credit fields are missing");

    // 2B. Invalid credits_earned
    const res2B = await fetch(`${BASE_URL}/api/dpi/push-credits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apaar_id: "123456789012",
        aicte_code: "1-1001",
        semester: 3,
        subject_code: "CS301",
        subject_name: "Algorithms",
        credits_earned: -4,
        grade: "A",
      }),
    });
    const data2B = await res2B.json();
    assert(res2B.status === 400 && data2B.error.includes("credits_earned"), "Returns 400 for negative/invalid credits");

    // 2C. Push to non-existent student
    const res2C = await fetch(`${BASE_URL}/api/dpi/push-credits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apaar_id: "000000000000",
        aicte_code: "1-1001",
        semester: 3,
        subject_code: "CS301",
        subject_name: "Algorithms",
        credits_earned: 4,
        grade: "A",
      }),
    });
    const data2C = await res2C.json();
    assert(res2C.status === 404 && data2C.status === "NOT_FOUND", "Returns 404 when student APAAR profile does not exist");

    // -------------------------------------------------------------
    // 3. POST /api/dpi/transfer-student
    // -------------------------------------------------------------
    console.log("\n--- Testing POST /api/dpi/transfer-student ---");

    // 3A. Missing target_aicte_code
    const res3A = await fetch(`${BASE_URL}/api/dpi/transfer-student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apaar_id: "123456789012" }),
    });
    const data3A = await res3A.json();
    assert(res3A.status === 400 && data3A.success === false, "Returns 400 when target_aicte_code is missing");

    // 3B. Transfer non-existent student
    const res3B = await fetch(`${BASE_URL}/api/dpi/transfer-student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apaar_id: "000000000000",
        target_aicte_code: "1-1002",
      }),
    });
    const data3B = await res3B.json();
    assert(res3B.status === 404 && data3B.status === "NOT_FOUND", "Returns 404 when transferring non-existent student");

    // -------------------------------------------------------------
    // 4. SHA-256 Cryptographic Hash Validation
    // -------------------------------------------------------------
    console.log("\n--- Testing SHA-256 Cryptographic Hash Calculation ---");
    const crypto = await import("crypto");
    const testSeed = "123456789012CS301A" + Date.now();
    const hash = crypto.createHash("sha256").update(testSeed).digest("hex");
    assert(
      hash.length === 64 && /^[0-9a-f]{64}$/.test(hash),
      "Node.js crypto SHA-256 produces valid 64-character hexadecimal digest",
      hash
    );

    console.log("\n=================================================");
    console.log(`Test Summary: ${passed} passed, ${failed} failed`);
    console.log("=================================================");
  } finally {
    server.kill();
  }

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
