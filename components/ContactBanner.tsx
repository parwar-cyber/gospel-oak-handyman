import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { CONTACT_INFO } from "@/lib/data";
import OpeningHoursTable from "@/components/OpeningHoursTable";

interface ContactBannerProps {
  showCta?: boolean;
}

export default function ContactBanner({ showCta = true }: ContactBannerProps) {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-brand-dark sm:text-2xl">
              Opening Hours
            </h2>
            <div className="mt-4 sm:mt-6">
              <OpeningHoursTable />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-dark sm:text-2xl">
              Get in Touch
            </h2>
            <ul className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              <li className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-card">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange"
                  aria-hidden="true"
                />
                <span className="text-sm text-gray-700">
                  {CONTACT_INFO.address}
                </span>
              </li>
              <li className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card">
                <Phone
                  className="h-5 w-5 shrink-0 text-brand-orange"
                  aria-hidden="true"
                />
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="text-sm font-semibold text-brand-dark hover:text-brand-orange focus-ring rounded"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card">
                <Mail
                  className="h-5 w-5 shrink-0 text-brand-orange"
                  aria-hidden="true"
                />
                <a
                  href={CONTACT_INFO.emailHref}
                  className="break-all text-sm font-semibold text-brand-dark hover:text-brand-orange focus-ring rounded"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>

            {showCta && (
              <Link
                href="/contact"
                className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg focus-ring sm:w-auto"
              >
                Send a Request
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
