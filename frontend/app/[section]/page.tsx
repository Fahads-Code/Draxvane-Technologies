import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Home from "../page";
import JsonLd from "../../components/JsonLd";
import { createMetadata } from "../seo";
import { pageSchema } from "../structured-data";

const sectionMetadata = {
  services: {
    title: "What We Do | Draxvane Technologies",
    description:
      "Explore software, websites, mobile apps, game development, design, AI pictures and videos, automation, and digital operations services.",
    ogTitle: "What We Do",
    ogSubtitle: "Everything under one roof",
    ogKicker: "SERVICES",
  },
  approach: {
    title: "Our Approach | Draxvane Technologies",
    description:
      "Learn how Draxvane Technologies plans, delivers, and supports digital work.",
    ogTitle: "Our Approach",
    ogSubtitle: "Straightforward from day one",
    ogKicker: "HOW WE WORK",
  },
} satisfies Record<
  string,
  { title: string; description: string; ogTitle: string; ogSubtitle: string; ogKicker: string }
>;

type Section = keyof typeof sectionMetadata;

function isSection(value: string): value is Section {
  return Object.hasOwn(sectionMetadata, value);
}

export function generateStaticParams() {
  return Object.keys(sectionMetadata).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  if (!isSection(section)) notFound();
  return createMetadata({
    ...sectionMetadata[section],
    path: `/${section}`,
  });
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!isSection(section)) notFound();

  const { title, description } = sectionMetadata[section];

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: `/${section}`,
          name: title.split(" | ")[0],
          description,
        })}
      />
      <Home initialSection={section} />
    </>
  );
}
