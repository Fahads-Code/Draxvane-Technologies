import type { Metadata } from "next";
import { Geist } from "next/font/google";
import JsonLd from "../components/JsonLd";
import ScrollReveal from "../components/ScrollReveal";
import { createMetadata } from "./seo";
import { siteSchema } from "./structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  ...createMetadata(),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={siteSchema} />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
