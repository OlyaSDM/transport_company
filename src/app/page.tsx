import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Head from "next/head";
import "./globals.scss";
import AboutUs from "@/components/About";
import ServicesBlock from "@/components/Services";
import AdvantagesSection from "@/components/AdvantagesSection";

export const metadata = {
  title: "Home | Logistics Company",
  description:
    "Welcome to our logistics company providing freight transportation across Europe",
  keywords: "logistics, freight, Europe, transportation, fleet management",
  robots: "index, follow",
  openGraph: {
    title: "Home | Logistics Company",
    description: "We provide reliable freight services across Europe.",
    url: "https://yourwebsite.com",
    siteName: "Logistics Company",
    images: [
      {
        url: "https://yourwebsite.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Logistics Company",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutUs />
      <ServicesBlock />
      <AdvantagesSection />
    </div>
  );
}

