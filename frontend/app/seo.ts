import type { Metadata } from "next";

export const siteName = "Draxvane Technologies";

export const defaultTitle = `${siteName} | Your All-in-One Digital Team`;

export const defaultDescription =
  "Custom software, websites, mobile apps, game development, graphic design, AI pictures and videos, automation, and data-entry support—all from one digital team.";

/* Social scrapers need absolute URLs. Set NEXT_PUBLIC_SITE_URL to the live
   domain in production (Vercel supplies VERCEL_URL automatically). */
const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://draxvane.com");

export const siteUrl = new URL(configuredUrl).origin;

type PageSeo = {
  title?: string;
  description?: string;
  path?: string;
  /** Copy printed on the generated share card. */
  ogTitle?: string;
  ogSubtitle?: string;
  ogKicker?: string;
};

export function createMetadata({
  title = defaultTitle,
  description = defaultDescription,
  path = "/",
  ogTitle = "One Agency.",
  ogSubtitle = "Every digital need.",
  ogKicker = "YOUR ALL-IN-ONE DIGITAL TEAM",
}: PageSeo = {}): Metadata {
  const pageUrl = new URL(path, siteUrl).toString();
  const imageQuery = new URLSearchParams({
    title: ogTitle,
    subtitle: ogSubtitle,
    kicker: ogKicker,
  });
  const imageUrl = new URL(`/api/og?${imageQuery}`, siteUrl).toString();

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName,
      url: pageUrl,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: `${ogTitle} ${ogSubtitle} — ${siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
