"use client";

import Link from "next/link";
import type { ContactRequest, RequestStatus } from "@/lib/data";
import StatusBadge from "./StatusBadge";

interface RequestsTableProps {
  requests: ContactRequest[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function RequestsTable({
  requests,
  currentPage,
  totalPages,
  onPageChange,
}: RequestsTableProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (requests.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center sm:p-12">
        <p className="text-gray-500">No requests found.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {requests.map((request) => (
          <div
            key={request.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-card"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-semibold text-brand-dark">
                  {request.name}
                </p>
                <p className="truncate text-sm text-gray-600">
                  {request.service}
                </p>
              </div>
              <StatusBadge status={request.status as RequestStatus} />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {formatDate(request.created_at)}
            </p>
            <Link
              href={`/admin/requests/${request.id}`}
              className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-brand-orange text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-ring"
            >
              View
            </Link>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-left font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">
                  Service
                </th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">
                  Date
                </th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-5 py-3 text-right font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-3.5 font-medium text-brand-dark">
                    {request.name}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {request.service}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {formatDate(request.created_at)}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={request.status as RequestStatus} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/requests/${request.id}`}
                      className="inline-flex rounded-lg bg-brand-orange px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600 focus-ring"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="min-h-[44px] rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold disabled:opacity-40 focus-ring"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="min-h-[44px] rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold disabled:opacity-40 focus-ring"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
