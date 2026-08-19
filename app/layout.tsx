import type { Metadata } from "next";
import { Lora, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-lora",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-code",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.handle}`,
    template: `%s · ${site.handle}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.handle}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.handle}`,
    description: site.description,
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lora.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
