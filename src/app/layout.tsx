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
    <html lang="en" className="container">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
