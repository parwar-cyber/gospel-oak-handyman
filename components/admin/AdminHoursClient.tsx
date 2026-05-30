"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/components/admin/AdminShell";
import type { OpeningHour } from "@/lib/hours";

interface AdminHoursClientProps {
  userEmail: string;
}

export default function AdminHoursClient({ userEmail }: AdminHoursClientProps) {
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHours = async () => {
      const { data, error: fetchError } = await supabase
        .from("opening_hours")
        .select("*")
        .order("sort_order", { ascending: true });

      if (fetchError) {
        console.error("Hours fetch error:", fetchError);
        setError("Failed to load opening hours.");
      } else if (data) {
        setHours(data as OpeningHour[]);
      }

      setLoading(false);
    };

    fetchHours();
  }, []);

  const updateRow = (
    id: number,
    field: keyof OpeningHour,
    value: string | boolean | null
  ) => {
    setHours((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    setSuccess(false);
  };

  const handleClosedToggle = (id: number, isClosed: boolean) => {
    setHours((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              is_closed: isClosed,
              open_time: isClosed ? null : row.open_time || "08:00",
              close_time: isClosed ? null : row.close_time || "17:00",
            }
          : row
      )
    );
    setSuccess(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const updates = hours.map((row) => ({
        id: row.id,
        day: row.day,
        open_time: row.is_closed ? null : row.open_time,
        close_time: row.is_closed ? null : row.close_time,
        is_closed: row.is_closed,
        sort_order: row.sort_order,
      }));

      const { error: saveError } = await supabase
        .from("opening_hours")
        .upsert(updates, { onConflict: "id" });

      if (saveError) {
        console.error("Save error:", saveError);
        setError("Failed to save changes. Please try again.");
        return;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Unexpected error saving hours.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminShell userEmail={userEmail}>
        <p className="text-gray-500">Loading opening hours...</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell userEmail={userEmail}>
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-xl font-bold text-brand-dark sm:text-2xl">
          Opening Hours
        </h2>

        <div className="space-y-3">
          {hours.map((row) => (
            <div
              key={row.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-card sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="min-w-[100px] text-sm font-bold text-brand-dark">
                  {row.day}
                </p>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={row.is_closed}
                    onChange={(e) =>
                      handleClosedToggle(row.id, e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
                  />
                  <span className="text-sm font-medium text-gray-600">
                    Closed
                  </span>
                </label>

                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:justify-end">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={`open-${row.id}`}
                      className="text-xs font-semibold text-gray-500"
                    >
                      Open
                    </label>
                    <input
                      id={`open-${row.id}`}
                      type="time"
                      value={row.open_time ?? ""}
                      disabled={row.is_closed}
                      onChange={(e) =>
                        updateRow(row.id, "open_time", e.target.value)
                      }
                      className="min-h-[44px] rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={`close-${row.id}`}
                      className="text-xs font-semibold text-gray-500"
                    >
                      Close
                    </label>
                    <input
                      id={`close-${row.id}`}
                      type="time"
                      value={row.close_time ?? ""}
                      disabled={row.is_closed}
                      onChange={(e) =>
                        updateRow(row.id, "close_time", e.target.value)
                      }
                      className="min-h-[44px] rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:bg-gray-100 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p
            className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-800"
            role="status"
          >
            Opening hours saved successfully.
          </p>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving || hours.length === 0}
          className="mt-6 min-h-[44px] w-full rounded-lg bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-orange-600 disabled:opacity-60 focus-ring sm:w-auto"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </AdminShell>
  );
}
