import { createServerSupabaseClient } from "@/lib/supabase-server";
import AdminHoursClient from "@/components/admin/AdminHoursClient";

export const revalidate = 0;

export default async function AdminHoursPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AdminHoursClient userEmail={user?.email ?? ""} />;
}
