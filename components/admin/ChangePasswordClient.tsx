"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminShell from "@/components/admin/AdminShell";

interface ChangePasswordClientProps {
  userEmail: string;
}

export default function ChangePasswordClient({
  userEmail,
}: ChangePasswordClientProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    }

    setLoading(false);
  };

  return (
    <AdminShell userEmail={userEmail}>
      <div className="mx-auto max-w-md">
        <h2 className="mb-2 text-2xl font-bold text-brand-dark">
          Change Password
        </h2>
        <p className="mb-8 text-gray-500">
          Update your admin account password.
        </p>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="new-password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Minimum 8 characters"
                className="w-full min-h-[44px] rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Re-enter new password"
                className="w-full min-h-[44px] rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>

            {error && (
              <div
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                role="status"
              >
                Password updated successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[44px] rounded-lg bg-brand-orange px-4 py-3 font-semibold text-white transition-colors hover:bg-orange-600 disabled:bg-orange-300 focus-ring"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
