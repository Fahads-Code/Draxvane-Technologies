import { defaultDescription, siteName, siteUrl } from "./seo";

const organization = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/draxvane-logo.webp`,
  email: "hello@draxvane.com",
  description: defaultDescription,
};

const website = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#organization` },
};

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [organization, website],
};

type PageSchema = {
  path: string;
  name: string;
  description: string;
  type?: string;
  contactEmail?: string;
};

export function pageSchema({
  path,
  name,
  description,
  type = "WebPage",
  contactEmail,
}: PageSchema) {
  const url = new URL(path, siteUrl).toString();
  const graph: Record<string, unknown>[] = [
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    },
  ];

  if (contactEmail) {
    graph.push({
      "@type": "ContactPoint",
      contactType: "customer service",
      email: contactEmail,
      availableLanguage: ["English", "Urdu"],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
