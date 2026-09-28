import type { Metadata, Viewport } from "next";

import "@fontsource/hind-siliguri/300.css";
import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "@fontsource/hind-siliguri/700.css";
import "@fontsource/noto-serif-bengali/500.css";
import "@fontsource/noto-serif-bengali/600.css";
import "@fontsource-variable/cormorant-garamond";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { Providers } from "@/store/providers";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — প্রিমিয়াম জুয়েলারি | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "জুয়েলারি",
    "গয়না",
    "গোল্ড রিং",
    "নেকলেস",
    "ব্রাইডাল সেট",
    "AURELIA",
    "jewelry Bangladesh",
    "gold jewellery",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.agency.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — প্রিমিয়াম জুয়েলারি | ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: [
      {
        url: "/brand/og.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} প্রিমিয়াম জুয়েলারি কালেকশন`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — প্রিমিয়াম জুয়েলারি`,
    description: siteConfig.shortDescription,
    images: ["/brand/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.contact.phoneIntl,
  email: siteConfig.contact.email,
  image: `${siteConfig.url}/brand/hero.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.addressLine,
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  openingHours: "Sa-Th 10:00-20:00",
  priceRange: "৳৫৯০ – ৳১,৪৮,০০০",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          মূল কনটেন্টে যান
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
