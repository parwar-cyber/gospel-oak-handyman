import {
  Wrench,
  Hammer,
  Lightbulb,
  Droplets,
  Paintbrush,
  Ruler,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
}

export const SERVICES: Service[] = [
  {
    id: "general-repairs",
    title: "General Repairs",
    shortDescription:
      "Fixing taps, toilets, cupboards, fixtures & fittings",
    fullDescription:
      "From dripping taps and running toilets to loose cupboard doors and faulty fixtures — we handle the everyday repairs that keep your home running smoothly. No job is too small.",
    icon: Wrench,
  },
  {
    id: "property-maintenance",
    title: "Property Maintenance",
    shortDescription:
      "Shelves, furniture assembly, picture hanging, door repairs",
    fullDescription:
      "Keep your property in top condition with our maintenance services. We assemble flat-pack furniture, install shelves, hang pictures and mirrors, repair doors, and tackle all those odd jobs on your list.",
    icon: Hammer,
  },
  {
    id: "electrical-maintenance",
    title: "Electrical Maintenance",
    shortDescription:
      "Light fixtures, dimmer switches (small-scale, non-certified)",
    fullDescription:
      "Small-scale electrical maintenance including replacing light fixtures, installing dimmer switches, changing bulbs in hard-to-reach places, and fixing faulty switches. Note: we are not certified electricians — for major electrical work, we recommend a qualified electrician.",
    icon: Lightbulb,
  },
  {
    id: "plumbing-maintenance",
    title: "Plumbing Maintenance",
    shortDescription:
      "Minor leaks, showerheads, small-scale plumbing repairs",
    fullDescription:
      "We fix minor leaks, replace showerheads, repair dripping taps, unblock simple drain issues, and handle small-scale plumbing repairs. For major plumbing work, we can recommend trusted local plumbers.",
    icon: Droplets,
  },
  {
    id: "painting-decorating",
    title: "Painting & Decorating",
    shortDescription:
      "Interior painting, patch painting, plaster & drywall repair",
    fullDescription:
      "Transform your space with our painting and decorating services. Interior painting, patch painting, plaster repair, drywall patching, and touch-ups to keep your walls looking fresh and professional.",
    icon: Paintbrush,
  },
  {
    id: "carpentry-bespoke",
    title: "Carpentry & Bespoke",
    shortDescription:
      "Custom carpentry, bathroom carpentry, bespoke fittings",
    fullDescription:
      "Custom carpentry solutions tailored to your home. From bespoke bathroom carpentry and shelving to custom fittings and trim work — we create beautiful, functional solutions built to last.",
    icon: Ruler,
  },
];

export const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => s.title),
  "Other",
];

export const CONTACT_INFO = {
  address: "Mansfield Road, London NW3 2JL",
  phone: "+44 7784 010417",
  phoneHref: "tel:+447784010417",
  email: "gospeloakhandyman@gmail.com",
  emailHref: "mailto:gospeloakhandyman@gmail.com",
  googleReviewsUrl: "https://share.google/GqnP27SpaUj6SAQsS",
};

export const REVIEWS = [
  {
    author: "SG",
    text: "I needed two lamps fixed. Karzan was professional and innovative — he got both lamps working without any replacement parts. When one stopped working he came back promptly at no extra cost. Excellent service.",
    rating: 5,
  },
  {
    author: "Greta Sani",
    text: "It's hard to find a good quality, professional and reliable handyman but Karzan is all of those things. Efficient, tidy and a solution finder. My bespoke bathroom carpentry is a thing of beauty.",
    rating: 5,
  },
  {
    author: "C.S. via Nextdoor",
    text: "He has done many jobs for me and my neighbours. Excellent work at reasonable prices. Also he is a lovely man.",
    rating: 5,
  },
];

export const AREAS_SERVED =
  "Camden, Gospel Oak, NW3, NW5, Hampstead, Kentish Town";

export type RequestStatus = "new" | "in_progress" | "completed" | "declined";

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  message: string;
  status: RequestStatus;
  admin_notes: string | null;
  created_at: string;
}

export const STATUS_LABELS: Record<RequestStatus, string> = {
  new: "New",
  in_progress: "In Progress",
  completed: "Completed",
  declined: "Declined",
};
