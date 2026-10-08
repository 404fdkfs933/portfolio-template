import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Caveat } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

/* Three faces, three jobs: the heavy condensed display face that sets every
   title, a plain grotesk for everything readable, and a handwriting face for
   the signature in the corner. Swap the families here and the site follows. */
const sans = Archivo({ variable: "--font-sans-ui", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const display = Anton({ variable: "--font-display-ui", subsets: ["latin"], weight: "400" });
const script = Caveat({ variable: "--font-script-ui", subsets: ["latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, url: site.url },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${script.variable}`}>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-bg focus:px-3 focus:py-2">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
