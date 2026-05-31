import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import ContactBanner from "@/components/ContactBanner";
import { SERVICES, SERVICE_COLOR_CLASSES } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Gospel Oak Handyman — serving Camden and Gospel Oak since 2020 with 15+ years of hands-on experience in property maintenance and repair.",
};

const STATS = [
  { value: "15+ Years", label: "Experience" },
  { value: "5★ Rating", label: "Google Reviews" },
  { value: "75+ Reviews", label: "Happy Customers" },
  { value: "Camden Based", label: "Local & Trusted" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-dark py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            About Gospel Oak Handyman
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            Gospel Oak Handyman has been serving the Camden and Gospel Oak
            community since 2020, with over 15 years of hands-on experience in
            property maintenance and repair. Founded by Karzan, the business is
            built on three values: reliability, quality, and fair pricing.
            Whether it&apos;s a leaky tap or a full interior repaint, every job
            is treated with the same attention to detail.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4 sm:gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-card sm:p-4"
              >
                <p className="text-base font-extrabold text-brand-orange sm:text-lg">
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] text-gray-600 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12">
            <h2 className="text-xl font-bold text-brand-dark sm:text-2xl">
              Services We Offer
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                const colors = SERVICE_COLOR_CLASSES[service.color];
                return (
                  <li
                    key={service.id}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-card"
                  >
                    <div className={`rounded-lg p-2 ${colors.bg}`}>
                      <Icon
                        className={`h-4 w-4 ${colors.icon}`}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {service.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-5 sm:mt-12 sm:p-8">
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-1 h-6 w-6 shrink-0 text-brand-orange"
                aria-hidden="true"
              />
              <div>
                <h2 className="text-lg font-bold text-brand-dark sm:text-xl">
                  Areas We Cover
                </h2>
                <p className="mt-2 text-sm text-gray-700 sm:text-base">
                  We serve Gospel Oak, Hampstead, Kentish Town, Camden, and
                  surrounding NW3/NW5 areas — within 4 miles of NW3 2JL.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center sm:mt-10">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand-orange px-6 py-3.5 text-base font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg focus-ring sm:px-8"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <ContactBanner showCta={false} />
    </>
  );
}
