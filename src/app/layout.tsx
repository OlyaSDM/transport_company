import "./globals.scss";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"], 
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Trucking Company",
  description: "We are a great trucking company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="container">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
