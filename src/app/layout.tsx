import "./globals.scss";
import type { Metadata } from "next";

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
    <html className="container">
      <body>{children}</body>
    </html>
  );
}
