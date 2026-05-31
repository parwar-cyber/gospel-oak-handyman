import {
  Wrench,
  Home,
  Zap,
  Droplets,
  Paintbrush,
  Hammer,
  type LucideIcon,
} from "lucide-react";

export type ServiceColor = "red" | "orange" | "purple" | "green";

export interface Service {
  id: string;
  title: string;
  color: ServiceColor;
  icon: LucideIcon;
  items: string[];
}

export const SERVICE_COLOR_CLASSES: Record<
  ServiceColor,
  { border: string; icon: string; bg: string }
> = {
  red: {
    border: "border-l-red-500",
    icon: "text-red-500",
    bg: "bg-red-50",
  },
  orange: {
    border: "border-l-orange-500",
    icon: "text-brand-orange",
    bg: "bg-orange-50",
  },
  purple: {
    border: "border-l-purple-500",
    icon: "text-purple-500",
    bg: "bg-purple-50",
  },
  green: {
    border: "border-l-green-500",
    icon: "text-green-500",
    bg: "bg-green-50",
  },
};

export const SERVICES: Service[] = [
  {
    id: "general-repairs",
    title: "General Repairs",
    color: "red",
    icon: Wrench,
    items: [
      "Wall mount TV",
      "Assemble furniture",
      "Hanging pictures & shelves",
      "Sash window repairs",
    ],
  },
  {
    id: "property-maintenance",
    title: "Property Maintenance",
    color: "orange",
    icon: Home,
    items: [
      "Repairing doors",
      "Fitting new locks & hinges",
      "Silicone around shower & baths",
      "Fitting new bath screens",
      "Tiling and grouting",
    ],
  },
  {
    id: "electrical-maintenance",
    title: "Electrical Maintenance",
    color: "purple",
    icon: Zap,
    items: [
      "Changing lightbulbs",
      "Replacing light switch sockets",
      "Changing ceiling lights",
      "Fitting new appliances",
      "Small scale non-certified Electrician",
    ],
  },
  {
    id: "plumbing-maintenance",
    title: "Plumbing Maintenance",
    color: "green",
    icon: Droplets,
    items: [
      "Replacing taps & mixers",
      "Fitting sinks & washing hand units",
      "Unblocking drains",
      "Guttering",
      "Small scale non-certified Plumber",
    ],
  },
  {
    id: "painting-decorating",
    title: "Painting & Decorating",
    color: "red",
    icon: Paintbrush,
    items: [
      "Interior and exterior decorating",
      "Woodwork and walls",
      "Drywall repair",
    ],
  },
  {
    id: "carpentry",
    title: "Carpentry",
    color: "orange",
    icon: Hammer,
    items: [
      "Custom carpentry",
      "Building shelves",
      "Decking",
      "Fitting new sheds",
      "Fitting fence & trellis",
      "Laminate flooring",
    ],
  },
];

export const SERVICE_OPTIONS = [
  "General Repairs",
  "Property Maintenance",
  "Electrical Maintenance",
  "Plumbing Maintenance",
  "Painting & Decorating",
  "Carpentry",
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
