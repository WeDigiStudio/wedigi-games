import type { Metadata, Viewport } from "next";
import { Anek_Latin, Anek_Tamil, Inter } from "next/font/google";
import { brand } from "@/content/site";
import "./globals.css";

/**
 * Anek is an Ek Type superfamily drawn for Indian scripts — the Latin and Tamil
 * cuts are designed as siblings, so the two scripts sit together without the
 * mismatch you get pairing an unrelated Latin face with a Tamil one.
 */
const anekLatin = Anek_Latin({
  subsets: ["latin"],
  variable: "--font-anek-latin",
  display: "swap",
});

const anekTamil = Anek_Tamil({
  subsets: ["tamil"],
  variable: "--font-anek-tamil",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description: brand.description,
  openGraph: {
    title: brand.name,
    description: brand.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#120c16",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${anekLatin.variable} ${anekTamil.variable} ${inter.variable}`}>
      <body>
        <noscript><style>{`.reveal-content { opacity: 1 !important; transform: none !important; }`}</style></noscript>
        {children}
      </body>
    </html>
  );
}
