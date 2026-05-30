import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import ReviewCard from "@/components/ReviewCard";
import ContactBanner from "@/components/ContactBanner";
import { SERVICES, REVIEWS, CONTACT_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Professional handyman services in Camden & Gospel Oak, NW3. 15+ years experience. General repairs, maintenance, painting, plumbing & more.",
};

const WHY_CHOOSE = [
  { stat: "15+ Years", label: "Experience you can trust" },
  { stat: "5.0 ★", label: "Perfect Google rating" },
  { stat: "75+ Reviews", label: "Happy customers across Camden" },
  { stat: "Prompt & Reliable", label: "On time, every time" },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">
            What We Can Help With
          </h2>
          <p className="mt-3 text-gray-600">
            Professional repairs and maintenance for your home
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-brand-orange px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg focus-ring"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      <section className="bg-brand-orange py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-white sm:text-4xl">
            Why Choose Us
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.stat}
                className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm"
              >
                <p className="text-2xl font-extrabold text-white">
                  {item.stat}
                </p>
                <p className="mt-2 text-sm text-orange-100">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">
            What Our Customers Say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.author} {...review} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={CONTACT_INFO.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-semibold text-brand-orange transition-colors hover:text-orange-600 focus-ring rounded"
          >
            See all reviews on Google &rarr;
          </a>
        </div>
      </section>

      <ContactBanner />
    </>
  );
}
