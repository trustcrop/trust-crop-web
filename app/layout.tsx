import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
// Primer Brand: base design tokens + component styles
import "@primer/react-brand/lib/css/main.css";
// Primer Brand: Mona Sans, Hubot Sans, Mona Sans Mono variable fonts
import "@primer/react-brand/fonts/fonts.css";
import { PrimerBrandProvider } from "./components/PrimerBrandProvider";

const inter = Inter({
  subsets: ["greek", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrustCrop — Ολοκληρωμένο Λογισμικό Αγροδιατροφικού Τομέα",
  description:
    "Πλήρης έλεγχος παραγωγής, συσκευαστηρίου και αποθήκης σε μία ενιαία πλατφόρμα.",
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml" },
    apple: { url: "/apple-icon.png", type: "image/png", sizes: "512x512" },
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
      <body className="min-h-full flex flex-col">
        <PrimerBrandProvider>{children}</PrimerBrandProvider>
      </body>
    </html>
  );
}
