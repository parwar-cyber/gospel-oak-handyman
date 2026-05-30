CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'declined')),
  admin_notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public inserts" ON contact_requests;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_requests;
DROP POLICY IF EXISTS "Allow authenticated updates" ON contact_requests;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON contact_requests;

CREATE POLICY "Allow public inserts" ON contact_requests
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON contact_requests
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated updates" ON contact_requests
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated deletes" ON contact_requests
  FOR DELETE TO authenticated USING (true);

GRANT INSERT ON contact_requests TO anon;
GRANT SELECT, UPDATE, DELETE ON contact_requests TO authenticated;

NOTIFY pgrst, 'reload schema';
