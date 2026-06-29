import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
// Primer Brand: base design tokens + component styles
import "@primer/react-brand/lib/css/main.css";
// NOTE: @primer/react-brand/fonts/fonts.css intentionally omitted —
// it loads heavy Mona Sans / Hubot Sans variable fonts as a render-blocking
// stylesheet. We override Primer's font tokens to use Inter + system fonts instead.
import { PrimerBrandProvider } from "./components/PrimerBrandProvider";

const inter = Inter({
  subsets: ["greek", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrustCrop — Ολοκληρωμένο Λογισμικό Αγροδιατροφικού Τομέα",
  description:
    "Πλήρης έλεγχος παραγωγής, συσκευαστηρίου και αποθήκης σε μία ενιαία πλατφόρμα.",
  icons: {
    icon: { url: "/apple-icon.png", type: "image/png" },
    apple: { url: "/apple-icon.png", type: "image/png", sizes: "512x512" },
  },
  openGraph: {
    title: "TrustCrop — Ολοκληρωμένο Λογισμικό Αγροδιατροφικού Τομέα",
    description: "Πλήρης έλεγχος παραγωγής, συσκευαστηρίου και αποθήκης σε μία ενιαία πλατφόρμα.",
    url: "https://trustcrop.gr",
    siteName: "TrustCrop",
    images: [{ url: "/apple-icon.png", width: 512, height: 512, alt: "TrustCrop" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "TrustCrop — Ολοκληρωμένο Λογισμικό Αγροδιατροφικού Τομέα",
    description: "Πλήρης έλεγχος παραγωγής, συσκευαστηρίου και αποθήκης σε μία ενιαία πλατφόρμα.",
    images: ["/apple-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="el"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to Google Fonts origin used by next/font at build time */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        {/* Preload the header logo — it's the first image the browser paints */}
        <link rel="preload" href="/apple-icon.png" as="image" type="image/png"/>
      </head>
      <body className="min-h-full flex flex-col">
        <PrimerBrandProvider>{children}</PrimerBrandProvider>
      </body>
    </html>
  );
}
