import type { Metadata } from "next";
import { Geist } from "next/font/google";
import ScrollReveal from "../components/ScrollReveal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Draxvane Technologies | Your All-in-One Digital Team",
  description:
    "Custom software, websites, mobile apps, game development, graphic design, AI pictures and videos, automation, and data-entry support—all from one digital team.",
  icons: {
    icon: "/Dynamic%20Pixel%20D%20Logo.png",
    shortcut: "/Dynamic%20Pixel%20D%20Logo.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
