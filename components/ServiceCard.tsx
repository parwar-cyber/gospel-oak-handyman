import Link from "next/link";
import type { Service } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
  variant?: "compact" | "detailed";
  showLink?: boolean;
}

export default function ServiceCard({
  service,
  variant = "compact",
  showLink = false,
}: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="mb-4 inline-flex rounded-xl bg-orange-50 p-3 transition-colors group-hover:bg-brand-orange">
        <Icon
          className="h-6 w-6 text-brand-orange transition-colors group-hover:text-white"
          aria-hidden="true"
        />
      </div>

      <h3 className="text-lg font-bold text-brand-dark">{service.title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {variant === "compact"
          ? service.shortDescription
          : service.fullDescription}
      </p>

      {showLink && (
        <Link
          href={`/contact?service=${encodeURIComponent(service.title)}`}
          className="mt-4 inline-flex text-sm font-semibold text-brand-orange transition-colors hover:text-orange-600 focus-ring rounded"
        >
          Request this Service &rarr;
        </Link>
      )}
    </div>
  );
}
