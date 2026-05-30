import Link from "next/link";
import Image from "next/image";
import { Star, Shield, Clock, MapPin } from "lucide-react";

const TRUST_BADGES = [
  { icon: Clock, label: "15+ Years Experience" },
  { icon: Star, label: "5★ Google Rating" },
  { icon: Shield, label: "75+ Reviews" },
  { icon: MapPin, label: "Camden & NW3" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-gray-900" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-orange/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.jpg"
            alt="Gospel Oak Handyman logo"
            width={160}
            height={160}
            className="mb-6 h-24 w-24 rounded-2xl bg-white p-2 shadow-lg sm:mb-8 sm:h-32 sm:w-32 lg:h-40 lg:w-40"
            priority
          />

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Gospel Oak{" "}
            <span className="text-brand-orange">Handyman</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base text-gray-300 sm:text-lg lg:text-xl">
            Trusted Home Repairs &amp; Maintenance in Camden &amp; Gospel Oak
          </p>

          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand-orange px-6 py-3.5 text-base font-bold text-white transition-all hover:bg-orange-600 hover:shadow-lg focus-ring sm:px-8"
            >
              Request a Callback
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-white/30 px-6 py-3.5 text-base font-bold text-white transition-all hover:border-brand-orange hover:bg-brand-orange/10 focus-ring sm:px-8"
            >
              View Services
            </Link>
          </div>

          <div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4 sm:gap-4">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-3 backdrop-blur-sm sm:px-3 sm:py-4"
              >
                <badge.icon
                  className="h-5 w-5 text-brand-orange"
                  aria-hidden="true"
                />
                <span className="text-center text-[11px] font-semibold leading-tight sm:text-sm">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
