import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppWrapper from "@/components/app-wrapper";
import { siteConfig } from "@/constants/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(`https://${siteConfig.domain}`),
  keywords: [
    "home-cooked meals Middlesbrough",
    "food delivery Middlesbrough",
    "jollof rice delivery UK",
    "suya Middlesbrough",
    "African food delivery UK",
    "meal delivery Stockton-on-Tees",
    "HotnNiceDelicacies",
    "fresh food delivery Teesside",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: siteConfig.name,
  description: siteConfig.description,
  url: `https://${siteConfig.domain}`,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  servesCuisine: ['African', 'International', 'World Cuisine'],
  hasMenu: `https://${siteConfig.domain}/menu`,
  priceRange: '££',
  areaServed: siteConfig.delivery.areas.map(area => ({
    '@type': 'City',
    name: area,
  })),
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '12:00',
    closes: '20:00',
  },
  sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
