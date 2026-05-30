export const SOCIAL_LINKS = {
  instagram:
    "https://www.instagram.com/gospeloakhandyman?igsh=am5henp5cDN1aTF5&utm_source=qr",
  facebook:
    "https://www.facebook.com/share/1E5zFCCXJ3/?mibextid=wwXIfr",
};

const INSTAGRAM_PATH =
  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z";

const FACEBOOK_PATH =
  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z";

interface SocialIconProps {
  href: string;
  label: string;
  path: string;
  size: number;
  className?: string;
}

function SocialIcon({ href, label, path, size, className = "" }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-lg transition-colors focus-ring ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </a>
  );
}

interface SocialLinksProps {
  variant?: "navbar" | "footer" | "contact";
  showLabel?: boolean;
  className?: string;
}

export default function SocialLinks({
  variant = "navbar",
  showLabel = false,
  className = "",
}: SocialLinksProps) {
  const sizeMap = { navbar: 18, footer: 24, contact: 28 };
  const size = sizeMap[variant];

  const iconClasses = {
    navbar: "h-9 w-9 text-brand-dark hover:text-brand-orange md:h-8 md:w-8",
    footer: "h-11 w-11 text-gray-400 hover:text-brand-orange",
    contact: "h-12 w-12 text-brand-dark hover:text-brand-orange",
  };

  const rowClasses = {
    navbar: "flex items-center gap-1",
    footer: "flex items-center justify-center gap-4 md:justify-start",
    contact: "flex items-center justify-center gap-4",
  };

  const labelClasses = {
    navbar: "sr-only",
    footer: "mb-3 w-full text-center text-sm font-semibold text-gray-300 md:text-left",
    contact: "mb-3 w-full text-center text-sm font-semibold text-brand-dark",
  };

  return (
    <div className={className}>
      {showLabel && <p className={labelClasses[variant]}>Follow us</p>}
      <div className={rowClasses[variant]}>
        <SocialIcon
          href={SOCIAL_LINKS.instagram}
          label="Follow Gospel Oak Handyman on Instagram"
          path={INSTAGRAM_PATH}
          size={size}
          className={iconClasses[variant]}
        />
        <SocialIcon
          href={SOCIAL_LINKS.facebook}
          label="Follow Gospel Oak Handyman on Facebook"
          path={FACEBOOK_PATH}
          size={size}
          className={iconClasses[variant]}
        />
      </div>
    </div>
  );
}
