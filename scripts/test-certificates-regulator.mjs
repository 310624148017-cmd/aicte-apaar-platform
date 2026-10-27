import { spawn } from "child_process";
import crypto from "crypto";

const PORT = 3077;
const BASE_URL = `http://localhost:${PORT}`;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTests() {
  console.log("=========================================================================");
  console.log("AICTE APAAR Certificate AI OCR & Regulator Overview - Test Suite");
  console.log("=========================================================================");

  // Launch Next.js server on port 3077
  console.log(`Starting Next.js server on port ${PORT}...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: "pipe",
  });

  // Wait for server to become responsive
  let ready = false;
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`${BASE_URL}/api/regulator/overview`);
      if (res.status === 200) {
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

  console.log(" Next.js server is online. Commencing Certificate & Regulator API tests...\n");
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
    // 1. POST /api/certificates/verify-upload
    // -------------------------------------------------------------
    console.log("--- Testing POST /api/certificates/verify-upload ---");

    // 1A. Missing required parameters
    const res1A = await fetch(`${BASE_URL}/api/certificates/verify-upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apaar_id: "123456789012" }),
    });
    const data1A = await res1A.json();
    assert(
      res1A.status === 400 && data1A.success === false,
      "Returns 400 when required parameters are missing"
    );

    // 1B. Invalid points_awarded
    const res1B = await fetch(`${BASE_URL}/api/certificates/verify-upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apaar_id: "123456789012",
        title: "Hackathon",
        category: "Technical",
        points_awarded: -10,
        extracted_student_name: "Aarav Sharma",
      }),
    });
    const data1B = await res1B.json();
    assert(
      res1B.status === 400 && data1B.error.includes("points_awarded"),
      "Returns 400 when points_awarded is negative or invalid"
    );

    // 1C. Non-existent student APAAR ID
    const res1C = await fetch(`${BASE_URL}/api/certificates/verify-upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apaar_id: "000000000000",
        title: "Hackathon",
        category: "Technical",
        points_awarded: 10,
        extracted_student_name: "Non Existent",
      }),
    });
    const data1C = await res1C.json();
    assert(
      res1C.status === 404 && data1C.status === "NOT_FOUND",
      "Returns 404 when student APAAR ID is not in registry"
    );

    // -------------------------------------------------------------
    // 2. POST /api/certificates/nodal-action
    // -------------------------------------------------------------
    console.log("\n--- Testing POST /api/certificates/nodal-action ---");

    // 2A. Missing parameters
    const res2A = await fetch(`${BASE_URL}/api/certificates/nodal-action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1 }),
    });
    const data2A = await res2A.json();
    assert(res2A.status === 400 && data2A.success === false, "Returns 400 when action is missing");

    // 2B. Invalid action
    const res2B = await fetch(`${BASE_URL}/api/certificates/nodal-action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1, action: "MAYBE" }),
    });
    const data2B = await res2B.json();
    assert(
      res2B.status === 400 && data2B.error.includes("Invalid 'action'"),
      "Returns 400 when action is not APPROVE or REJECT"
    );

    // 2C. Non-existent certificate ID
    const dummyCertId = crypto.randomUUID();
    const res2C = await fetch(`${BASE_URL}/api/certificates/nodal-action`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: dummyCertId, action: "APPROVE" }),
    });
    const data2C = await res2C.json();
    assert(
      res2C.status === 404 && data2C.status === "NOT_FOUND",
      "Returns 404 when certificate ID does not exist"
    );

    // -------------------------------------------------------------
    // 3. GET /api/regulator/overview
    // -------------------------------------------------------------
    console.log("\n--- Testing GET /api/regulator/overview ---");

    const res3 = await fetch(`${BASE_URL}/api/regulator/overview`);
    const data3 = await res3.json();

    assert(
      res3.status === 200 && data3.success === true,
      "Returns 200 OK with success status"
    );
    assert(
      data3.command_center !== undefined && data3.command_center.metrics !== undefined,
      "Includes command_center with aggregated metrics"
    );
    assert(
      Array.isArray(data3.command_center.institutions) &&
        Array.isArray(data3.command_center.apaar_profiles) &&
        Array.isArray(data3.command_center.academic_credits) &&
        Array.isArray(data3.command_center.activity_certificates) &&
        Array.isArray(data3.command_center.consent_logs),
      "Includes all 5 core entity collections for regulator command center"
    );
    assert(
      Array.isArray(data3.command_center.alerts?.duplicate_flagged_students),
      "Correctly isolates duplicate_flagged_students for AICTE fraud mitigation"
    );

    console.log("\n=========================================================================");
    console.log(`Test Summary: ${passed} passed, ${failed} failed`);
    console.log("=========================================================================");
  } finally {
    server.kill();
  }

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
