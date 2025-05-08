import "./globals.scss";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script"; // для JSON-LD

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trucking Company | Reliable Freight Delivery Across Europe",
  description:
    "Fast and secure freight delivery across Russia. Serving both corporate and private clients. Professional approach and quality guarantee.",
  keywords: [
    "freight delivery",
    "trucking company",
    "logistics",
    "transportation",
    "cargo delivery",
    "delivery across Europe",
  ],
  openGraph: {
    title: "Trucking Company",
    description: "Reliable freight delivery across Russia",
    url: "https://transportcom.netlify.app",
    siteName: "TransportCom",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Truck on the road — freight delivery across Europe",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="container">
      <head>
        {/* Structured Data JSON-LD */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TransportCom Trucking Company",
              url: "https://transportcom.netlify.app",
              logo: "https://transportcom.netlify.app/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+7-900-000-0000",
                contactType: "Customer Service",
                areaServed: "EU",
                availableLanguage: ["English"],
              },
              sameAs: [
                "https://vk.com/yourcompany",
                "https://t.me/yourcompany",
              ],
            }),
          }}
        />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
