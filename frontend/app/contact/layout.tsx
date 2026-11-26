import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { createMetadata } from "../seo";
import { pageSchema } from "../structured-data";

const description =
  "Tell Draxvane Technologies what you are working on. Software, design, games, automation, or data work—share the task and we will help you find the next step.";

export const metadata: Metadata = createMetadata({
  title: "Contact Us | Draxvane Technologies",
  description,
  path: "/contact",
  ogTitle: "Let's make it happen.",
  ogSubtitle: "Tell us what you're working on",
  ogKicker: "CONTACT DRAXVANE",
});

export default function ContactLayout({ children }: LayoutProps<"/contact">) {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/contact",
          name: "Contact Us",
          description,
          type: "ContactPage",
          contactEmail: "hello@draxvane.com",
        })}
      />
      {children}
    </>
  );
}
