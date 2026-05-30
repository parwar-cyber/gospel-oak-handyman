import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CONTACT_INFO, OPENING_HOURS } from "@/lib/data";

interface ContactBannerProps {
  showCta?: boolean;
}

export default function ContactBanner({ showCta = true }: ContactBannerProps) {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-brand-dark">
              Opening Hours
            </h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card">
              <table className="w-full text-sm">
                <tbody>
                  {OPENING_HOURS.map((row, i) => (
                    <tr
                      key={row.days}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-5 py-3.5 font-semibold text-brand-dark">
                        {row.days}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-brand-dark">
              Get in Touch
            </h2>
            <ul className="mt-6 space-y-4">
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
                  className="text-sm font-semibold text-brand-dark hover:text-brand-orange focus-ring rounded"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card">
                <Clock
                  className="h-5 w-5 shrink-0 text-brand-orange"
                  aria-hidden="true"
                />
                <span className="text-sm text-gray-700">
                  Mon–Fri 8am–5pm, Sat 9am–5pm
                </span>
              </li>
            </ul>

            {showCta && (
              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-lg bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg focus-ring"
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
