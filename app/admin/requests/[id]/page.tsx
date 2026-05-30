"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import AdminSidebar from "@/components/admin/AdminSidebar";
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
      <div className="flex min-h-screen">
        <AdminSidebar userEmail={userEmail} />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">Loading request...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar userEmail={userEmail} />
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p className="text-gray-500">Request not found.</p>
          <Link
            href="/admin/dashboard"
            className="text-sm font-semibold text-brand-orange hover:underline focus-ring rounded"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userEmail={userEmail} />

      <div className="flex-1">
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand-orange focus-ring rounded"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to dashboard
          </Link>
        </header>

        <main className="p-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-brand-dark">
                Request from {request.name}
              </h1>
              <StatusBadge status={request.status} />
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-card">
              <dl className="grid gap-4 sm:grid-cols-2">
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
                  <dd className="mt-1 text-sm">
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
                  <dd className="mt-1 text-sm">
                    {formatDate(request.created_at)}
                  </dd>
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

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-card">
              <h2 className="mb-4 text-lg font-bold text-brand-dark">
                Manage Request
              </h2>

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
                    onChange={(e) =>
                      setStatus(e.target.value as RequestStatus)
                    }
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  >
                    {(Object.keys(STATUS_LABELS) as RequestStatus[]).map(
                      (s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      )
                    )}
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
                  className="rounded-lg bg-brand-orange px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-600 disabled:opacity-60 focus-ring"
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
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-ring"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Delete Request
                </button>
              ) : (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-semibold text-red-800">
                    Are you sure you want to delete this request? This action
                    cannot be undone.
                  </p>
                  <div className="mt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus-ring"
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-white focus-ring"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
