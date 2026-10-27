import http from "http";
import { spawn } from "child_process";

const PORT = 3088;
const BASE_URL = `http://localhost:${PORT}`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startServer() {
  const child = spawn("npx", ["next", "start", "-p", String(PORT)], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: "inherit",
  });
  for (let i = 0; i < 40; i++) {
    await wait(300);
    try {
      const res = await fetch(`${BASE_URL}/api/regulator/overview`);
      if (res.status === 200) {
        return child;
      }
    } catch (_) {}
  }
  throw new Error("Server failed to start on port " + PORT);
}

async function run() {
  console.log("Starting server for registration tests...");
  const proc = await startServer();

  try {
    console.log("1. Testing POST /api/dpi/register-apaar missing full_name -> 400");
    const res1 = await fetch(`${BASE_URL}/api/dpi/register-apaar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    console.log("Status:", res1.status);
    if (res1.status !== 400) throw new Error("Expected 400");

    console.log("2. Testing POST /api/dpi/register-apaar valid registration");
    const testApaar = "777" + Math.floor(100000000 + Math.random() * 900000000);
    const res2 = await fetch(`${BASE_URL}/api/dpi/register-apaar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: "Dr. Vikram Seth",
        dob: "2004-11-20",
        gender: "Male",
        aadhaar_last_4: "9912",
        class_10_percentage: 94.5,
        class_12_percentage: 92.0,
        custom_apaar_id: testApaar,
        current_aicte_code: "1-10000001",
      }),
    });
    const json2 = await res2.json();
    console.log("Status:", res2.status, "APAAR ID:", json2.apaar_id, "Success:", json2.success);
    if (!json2.success || json2.apaar_id !== testApaar) throw new Error("Failed to register");

    console.log("3. Testing POST /api/dpi/verify-apaar for newly registered student");
    const res3 = await fetch(`${BASE_URL}/api/dpi/verify-apaar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apaar_id: testApaar,
        otp: "123456",
      }),
    });
    const json3 = await res3.json();
    console.log("Verify status:", json3.status, "Name:", json3.data?.student_profile?.full_name);
    if (json3.status !== "VERIFIED") throw new Error("Expected VERIFIED");

    console.log("4. Testing POST /api/dpi/verify-apaar auto_provision fallback");
    const randomApaar = "555" + Math.floor(100000000 + Math.random() * 900000000);
    const res4 = await fetch(`${BASE_URL}/api/dpi/verify-apaar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apaar_id: randomApaar,
        otp: "123456",
        auto_provision: true,
        student_name: "Judge Onboarded Live",
      }),
    });
    const json4 = await res4.json();
    console.log("Auto-provision verify status:", json4.status, "Name:", json4.data?.student_profile?.full_name);
    if (json4.status !== "VERIFIED") throw new Error("Auto-provision failed");

    console.log("\nALL REGISTRATION TESTS PASSED (4/4)!");
  } finally {
    proc.kill();
  }
}

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
