import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Home from "../page";

const sectionMetadata = {
  services: {
    title: "What We Do | Draxvane Technologies",
    description:
      "Explore software, websites, mobile apps, game development, design, AI pictures and videos, automation, and digital operations services.",
  },
  approach: {
    title: "Our Approach | Draxvane Technologies",
    description:
      "Learn how Draxvane Technologies plans, delivers, and supports digital work.",
  },
} satisfies Record<string, Metadata>;

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
  return sectionMetadata[section];
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!isSection(section)) notFound();

  return <Home initialSection={section} />;
}
