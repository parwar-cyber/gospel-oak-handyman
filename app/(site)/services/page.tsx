import type { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import ContactBanner from "@/components/ContactBanner";
import { SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Handyman services in Camden & Gospel Oak — general repairs, property maintenance, electrical, plumbing, painting, and bespoke carpentry.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-brand-dark py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Our Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300 sm:text-lg">
            From small repairs to bespoke carpentry — we handle it all with
            care and attention to detail.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              variant="detailed"
              showLink
            />
          ))}
        </div>
      </section>

      <ContactBanner />
    </>
  );
}
