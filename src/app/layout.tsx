import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { CoordinateReadout } from "@/components/CoordinateReadout";
import { HoverBands } from "@/components/HoverBands";
import { Ruler } from "@/components/Chrome";
import { site } from "@/lib/site";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
// Not preloaded: mono only sets small labels, and preloading it delayed the hero headline (LCP).
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: { type: "website", siteName: site.name, locale: "en_US", url: "/" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#f1ede2" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <body>
        <a
          href="#main"
          className="absolute -left-[999px] z-50 bg-ink px-3 py-2 text-paper focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Ruler />
        {children}
        <CoordinateReadout />
        <HoverBands />
      </body>
    </html>
  );
}
