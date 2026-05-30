import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { CONTACT_INFO, OPENING_HOURS } from "@/lib/data";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Gospel Oak Handyman for a free quote. Call +44 7784 010417 or send a request online. Serving Camden, Gospel Oak, NW3 & NW5.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Send us a message and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="mb-6 text-2xl font-bold text-brand-dark">
              Request a Callback
            </h2>
            <Suspense fallback={<div className="text-gray-500">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-brand-dark">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-card">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-dark">
                    Address
                  </p>
                  <p className="text-sm text-gray-600">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-card">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-dark">Phone</p>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="text-sm text-gray-600 hover:text-brand-orange focus-ring rounded"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-card">
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-dark">Email</p>
                  <a
                    href={CONTACT_INFO.emailHref}
                    className="text-sm text-gray-600 hover:text-brand-orange focus-ring rounded"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-card">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-dark">
                    Opening Hours
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    {OPENING_HOURS.map((row) => (
                      <li key={row.days}>
                        {row.days}: {row.hours}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
