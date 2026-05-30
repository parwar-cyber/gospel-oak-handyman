import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import ContactBanner from "@/components/ContactBanner";
import { SERVICES } from "@/lib/data";

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
      <section className="bg-brand-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            About Gospel Oak Handyman
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg leading-relaxed text-gray-700">
            Gospel Oak Handyman has been serving the Camden and Gospel Oak
            community since 2020, with over 15 years of hands-on experience in
            property maintenance and repair. Founded by Karzan, the business is
            built on three values: reliability, quality, and fair pricing.
            Whether it&apos;s a leaky tap or a full interior repaint, every job
            is treated with the same attention to detail.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-card"
              >
                <p className="text-lg font-extrabold text-brand-orange">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-brand-dark">
              Services We Offer
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <li
                  key={service.id}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 rounded-2xl border border-gray-100 bg-gray-50 p-8">
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-1 h-6 w-6 shrink-0 text-brand-orange"
                aria-hidden="true"
              />
              <div>
                <h2 className="text-xl font-bold text-brand-dark">
                  Areas We Cover
                </h2>
                <p className="mt-2 text-gray-700">
                  We serve Gospel Oak, Hampstead, Kentish Town, Camden, and
                  surrounding NW3/NW5 areas — within 4 miles of NW3 2JL.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex rounded-lg bg-brand-orange px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg focus-ring"
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
