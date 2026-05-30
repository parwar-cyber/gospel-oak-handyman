"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import AdminShell from "@/components/admin/AdminShell";
import RequestsTable from "@/components/admin/RequestsTable";
import type { ContactRequest, RequestStatus } from "@/lib/data";

const PAGE_SIZE = 20;

const FILTER_TABS: { label: string; value: RequestStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Declined", value: "declined" },
];

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [filtered, setFiltered] = useState<ContactRequest[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const [activeFilter, setActiveFilter] = useState<RequestStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchRequests = useCallback(async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email) setUserEmail(user.email);

    const { data, error } = await supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data as ContactRequest[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    if (activeFilter === "all") {
      setFiltered(requests);
    } else {
      setFiltered(requests.filter((r) => r.status === activeFilter));
    }
    setCurrentPage(1);
  }, [requests, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const stats = {
    total: requests.length,
    new: requests.filter((r) => r.status === "new").length,
    inProgress: requests.filter((r) => r.status === "in_progress").length,
    completed: requests.filter((r) => r.status === "completed").length,
  };

  return (
    <AdminShell userEmail={userEmail}>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          { label: "Total Requests", value: stats.total, color: "text-brand-dark" },
          { label: "New", value: stats.new, color: "text-brand-orange" },
          { label: "In Progress", value: stats.inProgress, color: "text-blue-600" },
          { label: "Completed", value: stats.completed, color: "text-green-600" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-card sm:p-5"
          >
            <p className="text-xs text-gray-500 sm:text-sm">{stat.label}</p>
            <p className={`mt-1 text-2xl font-extrabold sm:text-3xl ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-6 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveFilter(tab.value)}
              className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-ring ${
                activeFilter === tab.value
                  ? "bg-brand-orange text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading requests...</p>
      ) : (
        <RequestsTable
          requests={paginated}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </AdminShell>
  );
}
