-- ==============================================================================
-- AICTE APAAR Platform - DPI Database Schema, RLS Policies & Seed Data
-- ==============================================================================

-- 1. Ensure RLS Policies allow read/write or configure policies
ALTER TABLE IF EXISTS apaar_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS academic_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS activity_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS consent_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read & write access for anon demo role
DO $$
BEGIN
    -- apaar_profiles policies
    DROP POLICY IF EXISTS "Allow anon read apaar_profiles" ON apaar_profiles;
    DROP POLICY IF EXISTS "Allow anon insert apaar_profiles" ON apaar_profiles;
    DROP POLICY IF EXISTS "Allow anon update apaar_profiles" ON apaar_profiles;
    CREATE POLICY "Allow anon read apaar_profiles" ON apaar_profiles FOR SELECT USING (true);
    CREATE POLICY "Allow anon insert apaar_profiles" ON apaar_profiles FOR INSERT WITH CHECK (true);
    CREATE POLICY "Allow anon update apaar_profiles" ON apaar_profiles FOR UPDATE USING (true);

    -- academic_credits policies
    DROP POLICY IF EXISTS "Allow anon read academic_credits" ON academic_credits;
    DROP POLICY IF EXISTS "Allow anon insert academic_credits" ON academic_credits;
    CREATE POLICY "Allow anon read academic_credits" ON academic_credits FOR SELECT USING (true);
    CREATE POLICY "Allow anon insert academic_credits" ON academic_credits FOR INSERT WITH CHECK (true);

    -- activity_certificates policies
    DROP POLICY IF EXISTS "Allow anon read activity_certificates" ON activity_certificates;
    DROP POLICY IF EXISTS "Allow anon insert activity_certificates" ON activity_certificates;
    CREATE POLICY "Allow anon read activity_certificates" ON activity_certificates FOR SELECT USING (true);
    CREATE POLICY "Allow anon insert activity_certificates" ON activity_certificates FOR INSERT WITH CHECK (true);

    -- institutions policies
    DROP POLICY IF EXISTS "Allow anon read institutions" ON institutions;
    DROP POLICY IF EXISTS "Allow anon insert institutions" ON institutions;
    CREATE POLICY "Allow anon read institutions" ON institutions FOR SELECT USING (true);
    CREATE POLICY "Allow anon insert institutions" ON institutions FOR INSERT WITH CHECK (true);

    -- consent_logs policies
    DROP POLICY IF EXISTS "Allow anon read consent_logs" ON consent_logs;
    DROP POLICY IF EXISTS "Allow anon insert consent_logs" ON consent_logs;
    DROP POLICY IF EXISTS "Allow anon update consent_logs" ON consent_logs;
    CREATE POLICY "Allow anon read consent_logs" ON consent_logs FOR SELECT USING (true);
    CREATE POLICY "Allow anon insert consent_logs" ON consent_logs FOR INSERT WITH CHECK (true);
    CREATE POLICY "Allow anon update consent_logs" ON consent_logs FOR UPDATE USING (true);
END $$;

-- 2. Seed AICTE Institutions
INSERT INTO institutions (aicte_code, name, state)
VALUES
    ('1-1001', 'Indian Institute of Technology (IIT) Delhi', 'Delhi'),
    ('1-1002', 'National Institute of Technology (NIT) Trichy', 'Tamil Nadu'),
    ('1-1003', 'College of Engineering, Pune (COEP)', 'Maharashtra'),
    ('1-1004', 'Delhi Technological University (DTU)', 'Delhi')
ON CONFLICT DO NOTHING;

-- 3. Seed Sample APAAR Student Profiles (Including a duplicate flagged profile for AICTE Regulator Command Center)
INSERT INTO apaar_profiles (apaar_id, full_name, dob, gender, current_aicte_code, enrollment_status, total_credits, total_activity_points, is_duplicate_flagged)
VALUES
    ('123456789012', 'Aarav Sharma', '2003-04-15', 'Male', '1-1001', 'ACTIVE', 16, 25, false),
    ('987654321098', 'Priya Patel', '2003-08-22', 'Female', '1-1002', 'ACTIVE', 20, 10, false),
    ('555566667777', 'Rohan Verma (Flagged)', '2002-11-10', 'Male', '1-1003', 'ACTIVE', 12, 0, true)
ON CONFLICT (apaar_id) DO UPDATE 
SET full_name = EXCLUDED.full_name,
    current_aicte_code = EXCLUDED.current_aicte_code,
    enrollment_status = EXCLUDED.enrollment_status,
    total_credits = EXCLUDED.total_credits,
    total_activity_points = EXCLUDED.total_activity_points,
    is_duplicate_flagged = EXCLUDED.is_duplicate_flagged;

-- 4. Seed Initial Academic Credits
INSERT INTO academic_credits (apaar_id, aicte_code, semester, subject_code, subject_name, credits_earned, grade, record_hash)
VALUES
    ('123456789012', '1-1001', 1, 'CS101', 'Introduction to Computing', 4, 'A', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'),
    ('123456789012', '1-1001', 1, 'MA101', 'Engineering Mathematics I', 4, 'A+', 'bf56b3e9a7e02816f1945143a2ff831eb0bb4a643ec56a3458c95be2439a31a9'),
    ('123456789012', '1-1001', 2, 'CS201', 'Data Structures & Algorithms', 4, 'O', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb'),
    ('123456789012', '1-1001', 2, 'EC201', 'Digital Logic Design', 4, 'A', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918')
ON CONFLICT DO NOTHING;

-- 5. Seed Activity & Skill Certificates
INSERT INTO activity_certificates (apaar_id, title, category, points_awarded, verification_status, ocr_confidence_score, certificate_url, record_hash)
VALUES
    ('123456789012', 'Smart India Hackathon 2025 - 1st Runner Up', 'Technical Innovation', 15, 'APPROVED', 98.4, 'https://certificates.sih.gov.in/2025/aarav-sharma', '34f01479830560a22a3cf2ef98380cf282d8c9735d4d3ec637ff0c427382f7c0'),
    ('123456789012', 'AICTE Virtual Internship in Cybersecurity', 'Internship & Skilling', 10, 'APPROVED', 96.1, 'https://internship.aicte-india.org/verify/cs-2025-091', '180fe9132174c86cb598df002d24268e37d5ff7f68cf5b8e96bfef5e0e0a5c48'),
    ('123456789012', 'State Level Robotics Workshop', 'Workshop', 5, 'PENDING', 95.2, 'https://certificates.robotics.org/aarav', '55a01479830560a22a3cf2ef98380cf282d8c9735d4d3ec637ff0c427382f799'),
    ('555566667777', 'Tampered AICTE Hackathon Participation', 'Technical', 10, 'FLAGGED', 42.5, 'https://tampered.fakecert.org/rohan', '99a01479830560a22a3cf2ef98380cf282d8c9735d4d3ec637ff0c427382f111')
ON CONFLICT DO NOTHING;

-- 6. Seed Sample Consent Requests
INSERT INTO consent_logs (id, apaar_id, requester_name, purpose, allowed_fields, status, access_token, expires_at)
VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '123456789012', 'TCS Campus Recruitment', 'Job Application Credential Check', ARRAY['full_name', 'academic_credits', 'total_credits'], 'APPROVED', 'apaar_demo_token_12345_abcde', NOW() + INTERVAL '24 hours'),
    ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', '123456789012', 'Infosys Placement Cell', 'Background Verification', ARRAY['full_name', 'total_credits'], 'PENDING', NULL, NOW() + INTERVAL '24 hours'),
    ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c33', '123456789012', 'Old Recruiter Inc.', 'Internship Verification', ARRAY['full_name'], 'EXPIRED', 'apaar_expired_token_99999', NOW() - INTERVAL '1 hour')
ON CONFLICT DO NOTHING;
