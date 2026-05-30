CREATE TABLE IF NOT EXISTS opening_hours (
  id serial PRIMARY KEY,
  day text NOT NULL,
  open_time text,
  close_time text,
  is_closed boolean DEFAULT false,
  sort_order integer NOT NULL
);

ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read hours" ON opening_hours;
DROP POLICY IF EXISTS "Authenticated can update hours" ON opening_hours;
DROP POLICY IF EXISTS "Authenticated can insert hours" ON opening_hours;

CREATE POLICY "Public can read hours" ON opening_hours
  FOR SELECT TO anon USING (true);

CREATE POLICY "Authenticated can update hours" ON opening_hours
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated can insert hours" ON opening_hours
  FOR INSERT TO authenticated WITH CHECK (true);

INSERT INTO opening_hours (day, open_time, close_time, is_closed, sort_order) VALUES
  ('Monday',    '08:00', '17:00', false, 1),
  ('Tuesday',   '08:00', '17:00', false, 2),
  ('Wednesday', '08:00', '17:00', false, 3),
  ('Thursday',  '08:00', '17:00', false, 4),
  ('Friday',    '08:00', '17:00', false, 5),
  ('Saturday',  '09:00', '17:00', false, 6),
  ('Sunday',    null,    null,    true,  7)
ON CONFLICT DO NOTHING;

GRANT SELECT ON opening_hours TO anon;
GRANT SELECT, INSERT, UPDATE ON opening_hours TO authenticated;

NOTIFY pgrst, 'reload schema';
