"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/lib/data";
import SocialLinks from "@/components/SocialLinks";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 focus-ring rounded-lg sm:gap-3"
        >
          <Image
            src="/logo.jpg"
            alt="Gospel Oak Handyman logo"
            width={48}
            height={48}
            className="h-9 w-9 shrink-0 rounded-lg object-contain sm:h-12 sm:w-12"
            priority
          />
          <span className="hidden text-sm font-bold leading-tight text-brand-dark sm:block">
            Gospel Oak
            <br />
            <span className="text-brand-orange">Handyman</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors focus-ring rounded px-1 py-0.5 ${
                isActive(link.href)
                  ? "text-brand-orange"
                  : "text-brand-dark hover:text-brand-orange"
              }`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <SocialLinks variant="navbar" />
          <a
            href={CONTACT_INFO.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-md focus-ring"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Now
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <SocialLinks variant="navbar" />
          <button
            type="button"
            className="rounded-lg p-2 text-brand-dark focus-ring"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-gray-100 bg-white px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`min-h-[44px] rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors focus-ring ${
                  isActive(link.href)
                    ? "bg-orange-50 text-brand-orange"
                    : "text-brand-dark hover:bg-gray-50"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-center gap-2 border-t border-gray-100 pt-4">
              <span className="text-xs font-semibold text-gray-500">
                Follow us
              </span>
              <SocialLinks variant="navbar" />
            </div>
            <a
              href={CONTACT_INFO.phoneHref}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white focus-ring"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
