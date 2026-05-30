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
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
        <p className="text-gray-500">No requests found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card">
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
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold disabled:opacity-40 focus-ring"
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
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold disabled:opacity-40 focus-ring"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
