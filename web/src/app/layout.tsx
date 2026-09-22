import type { Metadata, Viewport } from "next";
import { Anek_Latin, Anek_Tamil, Inter } from "next/font/google";
import { brand, seo } from "@/content/site";
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

/**
 * Share images come from the file convention: app/opengraph-image.jpg and
 * app/twitter-image.jpg (1200×630, built from the Project S poster), with alt
 * text alongside. `metadataBase` turns them into the absolute URLs social
 * platforms require.
 */
export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: seo.title,
    template: `%s | ${brand.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: brand.name,
  authors: [{ name: brand.name, url: brand.url }],
  creator: brand.name,
  publisher: brand.parent,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: brand.name,
    title: seo.title,
    description: seo.description,
    locale: seo.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "games",
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
