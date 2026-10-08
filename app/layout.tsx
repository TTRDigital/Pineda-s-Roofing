import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { siteUrl } from "@/lib/site";

/*
 * Root layout is intentionally bare: the website's styles and chrome live
 * in app/(site)/layout.tsx so the embedded Sanity Studio at /cms loads
 * without them.
 */

const oswald = Oswald({ subsets: ["latin"], display: "swap", variable: "--font-oswald", weight: ["500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Pineda's Roofing | Maryland Roofing Contractor", template: "%s | Pineda's Roofing" },
  description: "Family-owned roofing contractor in Silver Spring, MD since 1992. Roof replacement, repair, storm restoration and commercial roofing.",
  applicationName: "Pineda's Roofing",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b0d10" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${oswald.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
