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
      <section className="bg-brand-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            From small repairs to bespoke carpentry — we handle it all with
            care and attention to detail.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
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
