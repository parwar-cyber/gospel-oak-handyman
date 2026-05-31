import Link from "next/link";
import { SERVICE_COLOR_CLASSES, type Service } from "@/lib/data";

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
  const colors = SERVICE_COLOR_CLASSES[service.color];

  if (variant === "detailed") {
    return (
      <div
        className={`rounded-2xl border border-gray-100 border-l-4 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${colors.border}`}
      >
        <div className={`mb-4 inline-flex rounded-xl p-3 ${colors.bg}`}>
          <Icon className={`h-6 w-6 ${colors.icon}`} aria-hidden="true" />
        </div>

        <h3 className="text-lg font-bold text-brand-dark">{service.title}</h3>

        <ul className="mt-4 space-y-2">
          {service.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${colors.icon.replace("text-", "bg-")}`}
              />
              {item}
            </li>
          ))}
        </ul>

        {showLink && (
          <Link
            href={`/contact?service=${encodeURIComponent(service.title)}`}
            className="mt-5 inline-flex text-sm font-semibold text-brand-orange transition-colors hover:text-orange-600 focus-ring rounded"
          >
            Request this Service &rarr;
          </Link>
        )}
      </div>
    );
  }

  const previewItems = service.items.slice(0, 3);
  const remaining = service.items.length - previewItems.length;

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className={`mb-4 inline-flex rounded-xl p-3 ${colors.bg}`}>
        <Icon className={`h-6 w-6 ${colors.icon}`} aria-hidden="true" />
      </div>

      <h3 className="text-lg font-bold text-brand-dark">{service.title}</h3>

      <ul className="mt-3 space-y-1.5">
        {previewItems.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-gray-600"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
            {item}
          </li>
        ))}
      </ul>

      {remaining > 0 && (
        <p className="mt-2 text-xs font-semibold text-gray-400">
          + {remaining} more
        </p>
      )}

      <Link
        href="/services"
        className="mt-4 inline-flex text-sm font-semibold text-brand-orange transition-colors hover:text-orange-600 focus-ring rounded"
      >
        Learn more &rarr;
      </Link>
    </div>
  );
}
