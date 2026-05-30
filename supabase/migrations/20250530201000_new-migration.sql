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

CREATE POLICY "Allow public inserts" ON contact_requests
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON contact_requests
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated updates" ON contact_requests
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated deletes" ON contact_requests
  FOR DELETE TO authenticated USING (true);
