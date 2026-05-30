"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Inbox, Clock, LockKeyhole, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase";

const NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    isActive: (pathname: string) => pathname === "/admin/dashboard",
  },
  {
    href: "/admin/dashboard",
    label: "Requests",
    icon: Inbox,
    isActive: (pathname: string) =>
      pathname.startsWith("/admin/dashboard") ||
      pathname.startsWith("/admin/requests"),
  },
  {
    href: "/admin/hours",
    label: "Opening Hours",
    icon: Clock,
    isActive: (pathname: string) => pathname.startsWith("/admin/hours"),
  },
  {
    href: "/admin/password",
    label: "Change Password",
    icon: LockKeyhole,
    isActive: (pathname: string) => pathname.startsWith("/admin/password"),
  },
];

interface AdminSidebarProps {
  userEmail?: string;
  onNavigate?: () => void;
}

export default function AdminSidebar({
  userEmail,
  onNavigate,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const handleNavClick = () => {
    onNavigate?.();
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-5">
        <p className="text-sm font-bold text-brand-orange">Gospel Oak</p>
        <p className="text-sm font-bold text-brand-dark">Handyman Admin</p>
        {userEmail && (
          <p className="mt-2 truncate text-xs text-gray-500">{userEmail}</p>
        )}
      </div>

      <nav className="flex-1 px-3 py-4" aria-label="Admin navigation">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={handleNavClick}
                  className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors focus-ring ${
                    active
                      ? "bg-orange-50 text-brand-orange"
                      : "text-gray-600 hover:bg-gray-50 hover:text-brand-dark"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-200 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 focus-ring"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          Logout
        </button>
      </div>
    </aside>
  );
}
