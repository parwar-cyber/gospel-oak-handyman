import { createServerSupabaseClient } from "@/lib/supabase-server";
import ChangePasswordClient from "@/components/admin/ChangePasswordClient";

export const revalidate = 0;

export default async function ChangePasswordPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <ChangePasswordClient userEmail={user?.email ?? ""} />;
}
