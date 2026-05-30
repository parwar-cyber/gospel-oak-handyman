import { createServerSupabaseClient } from "@/lib/supabase-server";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import type { ContactRequest } from "@/lib/data";

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: requests, error } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Dashboard fetch error:", error);
  }

  return (
    <AdminDashboardClient
      initialRequests={(requests as ContactRequest[]) ?? []}
      userEmail={user?.email ?? ""}
    />
  );
}
