import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

const googleSans = localFont({
  src: [
    { path: "../fonts/GoogleSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/GoogleSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/GoogleSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

const agustina = localFont({
  src: [{ path: "../fonts/Agustina.woff", weight: "400", style: "normal" }],
  variable: "--font-agustina",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.sameershanbhag.com"),
  title: {
    default: "Sameer Shanbhag — Blog",
    template: "%s — Sameer Shanbhag",
  },
  description:
    "Writing on software engineering, AI, and whatever else I'm building.",
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${googleSans.variable} ${agustina.variable} min-h-screen flex flex-col`}>
        <SiteHeader />
        <main className="flex-1 w-full pf-fade-up">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
