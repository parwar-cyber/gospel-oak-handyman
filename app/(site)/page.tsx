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

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-brand-dark sm:text-3xl lg:text-4xl">
            What We Can Help With
          </h2>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            Professional repairs and maintenance for your home
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand-orange px-6 py-3.5 text-base font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg focus-ring sm:px-8"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      <section className="bg-brand-orange py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-extrabold text-white sm:mb-10 sm:text-3xl lg:text-4xl">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.stat}
                className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm sm:p-6"
              >
                <p className="text-lg font-extrabold text-white sm:text-2xl">
                  {item.stat}
                </p>
                <p className="mt-1 text-xs text-orange-100 sm:mt-2 sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-brand-dark sm:text-3xl lg:text-4xl">
            What Our Customers Say
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.author} {...review} />
          ))}
        </div>

        <div className="mt-6 text-center sm:mt-8">
          <a
            href={CONTACT_INFO.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-orange transition-colors hover:text-orange-600 focus-ring rounded"
          >
            See all reviews on Google &rarr;
          </a>
        </div>
      </section>

      <ContactBanner />
    </>
  );
}
