import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { CONTACT_INFO, AREAS_SERVED } from "@/lib/data";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Gospel Oak Handyman logo"
                width={56}
                height={56}
                className="h-14 w-14 rounded-lg object-contain bg-white p-1"
              />
              <div>
                <p className="text-lg font-bold text-brand-orange">
                  Gospel Oak
                </p>
                <p className="text-lg font-bold">Handyman</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Trusted home repairs &amp; maintenance in Camden &amp; Gospel Oak.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-orange">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-orange">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange"
                  aria-hidden="true"
                />
                {CONTACT_INFO.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone
                  className="h-4 w-4 shrink-0 text-brand-orange"
                  aria-hidden="true"
                />
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="hover:text-white focus-ring rounded"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail
                  className="h-4 w-4 shrink-0 text-brand-orange"
                  aria-hidden="true"
                />
                <a
                  href={CONTACT_INFO.emailHref}
                  className="hover:text-white focus-ring rounded"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>&copy; 2025 Gospel Oak Handyman. All rights reserved.</p>
          <p className="mt-1">Areas served: {AREAS_SERVED}</p>
        </div>
      </div>
    </footer>
  );
}
