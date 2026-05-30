"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

interface AdminShellProps {
  userEmail?: string;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
}

export default function AdminShell({
  userEmail,
  headerContent,
  children,
}: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex">
        <AdminSidebar userEmail={userEmail} />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu backdrop"
          />
          <div className="relative z-10 h-full w-64 shadow-xl">
            <AdminSidebar
              userEmail={userEmail}
              onNavigate={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button
                type="button"
                className="shrink-0 rounded-lg p-2 text-brand-dark md:hidden focus-ring"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open admin menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="min-w-0">
                <h1 className="truncate text-base font-bold text-brand-dark sm:text-xl">
                  Gospel Oak Handyman Admin
                </h1>
                {userEmail && (
                  <p className="truncate text-xs text-gray-500 sm:text-sm">
                    {userEmail}
                  </p>
                )}
              </div>
            </div>
          </div>
          {headerContent && (
            <div className="mt-3 border-t border-gray-100 pt-3">
              {headerContent}
            </div>
          )}
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
