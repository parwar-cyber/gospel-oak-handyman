import { createServerSupabaseClient } from "@/lib/supabase-server";
import AdminHoursClient from "@/components/admin/AdminHoursClient";
import type { OpeningHour } from "@/lib/hours";
import { DEFAULT_OPENING_HOURS } from "@/lib/hours";

export default async function AdminHoursPage() {
  const supabase = createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: hours, error } = await supabase
    .from("opening_hours")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Hours fetch error:", error);
  }

  const initialHours: OpeningHour[] =
    hours && hours.length > 0
      ? (hours as OpeningHour[])
      : DEFAULT_OPENING_HOURS.map((row, index) => ({
          id: index + 1,
          ...row,
        }));

  return (
    <AdminHoursClient
      initialHours={initialHours}
      userEmail={user?.email ?? ""}
    />
  );
}
