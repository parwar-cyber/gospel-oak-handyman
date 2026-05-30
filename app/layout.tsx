import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Gospel Oak Handyman",
    template: "%s | Gospel Oak Handyman",
  },
  description:
    "Professional handyman services in Camden & Gospel Oak, NW3. 15+ years experience. General repairs, maintenance, painting, plumbing & more.",
  openGraph: {
    title: "Gospel Oak Handyman",
    description:
      "Professional handyman services in Camden & Gospel Oak, NW3. 15+ years experience. General repairs, maintenance, painting, plumbing & more.",
    type: "website",
    locale: "en_GB",
    siteName: "Gospel Oak Handyman",
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
