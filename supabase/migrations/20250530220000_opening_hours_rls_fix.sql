DROP POLICY IF EXISTS "Authenticated can read hours" ON opening_hours;
CREATE POLICY "Authenticated can read hours" ON opening_hours
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated can update hours" ON opening_hours;
DROP POLICY IF EXISTS "Authenticated can insert hours" ON opening_hours;

CREATE POLICY "Authenticated can update hours" ON opening_hours
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can insert hours" ON opening_hours
  FOR INSERT TO authenticated WITH CHECK (true);
