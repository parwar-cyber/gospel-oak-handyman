"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import AdminShell from "@/components/admin/AdminShell";
import StatusBadge from "@/components/admin/StatusBadge";
import type { ContactRequest, RequestStatus } from "@/lib/data";
import { STATUS_LABELS } from "@/lib/data";

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [request, setRequest] = useState<ContactRequest | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [status, setStatus] = useState<RequestStatus>("new");
  const [adminNotes, setAdminNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const fetchRequest = useCallback(async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email) setUserEmail(user.email);

    const { data, error } = await supabase
      .from("contact_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      const req = data as ContactRequest;
      setRequest(req);
      setStatus(req.status);
      setAdminNotes(req.admin_notes || "");
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  const handleSave = async () => {
    if (!request) return;
    setSaving(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase
      .from("contact_requests")
      .update({ status, admin_notes: adminNotes || null })
      .eq("id", id);

    if (error) {
      setMessage("Failed to save changes.");
    } else {
      setMessage("Changes saved successfully.");
      setRequest((prev) =>
        prev ? { ...prev, status, admin_notes: adminNotes || null } : prev
      );
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("contact_requests")
      .delete()
      .eq("id", id);

    if (!error) {
      router.push("/admin/dashboard");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <AdminShell userEmail={userEmail}>
        <p className="text-center text-gray-500">Loading request...</p>
      </AdminShell>
    );
  }

  if (!request) {
    return (
      <AdminShell userEmail={userEmail}>
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <p className="text-gray-500">Request not found.</p>
          <Link
            href="/admin/dashboard"
            className="text-sm font-semibold text-brand-orange hover:underline focus-ring rounded"
          >
            Back to dashboard
          </Link>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      userEmail={userEmail}
      headerContent={
        <Link
          href="/admin/dashboard"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand-orange focus-ring rounded"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          Back to dashboard
        </Link>
      }
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-brand-dark sm:text-2xl">
            Request from {request.name}
          </h2>
          <StatusBadge status={request.status} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-card sm:p-6">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase text-gray-500">
                Name
              </dt>
              <dd className="mt-1 text-sm font-medium">{request.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-gray-500">
                Email
              </dt>
              <dd className="mt-1 break-all text-sm">
                <a
                  href={`mailto:${request.email}`}
                  className="text-brand-orange hover:underline focus-ring rounded"
                >
                  {request.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-gray-500">
                Phone
              </dt>
              <dd className="mt-1 text-sm">
                {request.phone ? (
                  <a
                    href={`tel:${request.phone}`}
                    className="text-brand-orange hover:underline focus-ring rounded"
                  >
                    {request.phone}
                  </a>
                ) : (
                  "Not provided"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-gray-500">
                Service
              </dt>
              <dd className="mt-1 text-sm font-medium">{request.service}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase text-gray-500">
                Submitted
              </dt>
              <dd className="mt-1 text-sm">{formatDate(request.created_at)}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase text-gray-500">
                Message
              </dt>
              <dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                {request.message}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-card sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-brand-dark">
            Manage Request
          </h3>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="status"
                className="mb-1.5 block text-sm font-semibold"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as RequestStatus)}
                className="w-full min-h-[44px] rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
              >
                {(Object.keys(STATUS_LABELS) as RequestStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="admin_notes"
                className="mb-1.5 block text-sm font-semibold"
              >
                Admin Notes
              </label>
              <textarea
                id="admin_notes"
                rows={4}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                placeholder="Internal notes about this request..."
              />
            </div>

            {message && (
              <p
                className={`text-sm ${message.includes("Failed") ? "text-red-600" : "text-green-600"}`}
                role="status"
              >
                {message}
              </p>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full min-h-[44px] rounded-lg bg-brand-orange px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-600 disabled:opacity-60 focus-ring sm:w-auto"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="mt-6">
          {!showDeleteConfirm ? (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-ring sm:w-auto"
            >
              <Trash2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              Delete Request
            </button>
          ) : (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-800">
                Are you sure you want to delete this request? This action cannot
                be undone.
              </p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="min-h-[44px] rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus-ring"
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="min-h-[44px] rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-white focus-ring"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
