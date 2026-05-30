"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { type OpeningHour, formatHoursRange, getTodayName } from "@/lib/hours";

interface OpeningHoursTableProps {
  variant?: "table" | "list";
  className?: string;
}

export default function OpeningHoursTable({
  variant = "table",
  className = "",
}: OpeningHoursTableProps) {
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [loading, setLoading] = useState(true);
  const today = getTodayName();

  useEffect(() => {
    const fetchHours = async () => {
      const { data, error } = await supabase
        .from("opening_hours")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Opening hours fetch error:", error);
      }

      if (!error && data) {
        setHours(data as OpeningHour[]);
      }

      setLoading(false);
    };

    fetchHours();
  }, []);

  if (loading) {
    return (
      <div className={`animate-pulse text-sm text-gray-400 ${className}`}>
        Loading hours...
      </div>
    );
  }

  if (hours.length === 0) {
    return (
      <p className={`text-sm text-gray-500 ${className}`}>
        Opening hours unavailable.
      </p>
    );
  }

  if (variant === "list") {
    return (
      <ul className={`space-y-1 text-sm ${className}`}>
        {hours.map((row) => {
          const isToday = row.day === today;
          return (
            <li
              key={row.id}
              className={`flex justify-between gap-2 rounded-md px-2 py-1 ${
                isToday ? "border-l-4 border-brand-orange bg-orange-50" : ""
              }`}
            >
              <span
                className={`font-medium ${isToday ? "text-brand-orange" : "text-gray-700"}`}
              >
                {row.day}
              </span>
              <span className={row.is_closed ? "text-gray-400" : "text-gray-600"}>
                {formatHoursRange(row)}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card ${className}`}
    >
      <table className="w-full text-sm">
        <tbody>
          {hours.map((row, i) => {
            const isToday = row.day === today;
            return (
              <tr
                key={row.id}
                className={`${
                  isToday
                    ? "border-l-4 border-brand-orange bg-orange-50"
                    : i % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                }`}
              >
                <td
                  className={`px-4 py-3 font-semibold sm:px-5 sm:py-3.5 ${
                    isToday ? "text-brand-orange" : "text-brand-dark"
                  }`}
                >
                  {row.day}
                </td>
                <td
                  className={`px-4 py-3 sm:px-5 sm:py-3.5 ${
                    row.is_closed ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {formatHoursRange(row)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
