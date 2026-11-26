import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeaderNavigation from "../../components/HeaderNavigation";
import JsonLd from "../../components/JsonLd";
import SiteFooter from "../../components/SiteFooter";
import { createMetadata } from "../seo";
import { pageSchema } from "../structured-data";

const teamMembers = [
  {
    name: "Fahad Mehmood",
    role: "Software & AI automation",
    description:
      "Fahad builds software and looks after the AI and automation side. He finds the work that repeats, connects the right tools, and sets up workflows the team can actually use day to day.",
  },
  {
    name: "Zara Saleem",
    role: "AI pictures & videos · Content",
    description:
      "Zara handles the AI picture and video work and writes the content that goes with it. She takes an idea from the first draft to something ready to publish.",
  },
  {
    name: "Muneeb Mushtaq",
    role: "Mobile App Developer",
    description:
      "Muneeb builds mobile apps for iOS and Android. He takes an idea from the first screen to a working release and stays on top of the details.",
  },
  {
    name: "Syed Abdul Babar",
    role: "Website Developer",
    description:
      "Babar builds and maintains websites. He makes sure they stay fast, reliable, and easy for the client to update.",
  },
  {
    name: "Esha Wajahat",
    role: "WordPress & Shopify",
    description:
      "Esha handles our WordPress and Shopify work. She builds themes, sets up stores, and sorts out the small things that make a site easy to use and easy to update.",
  },
];

const cofounders = [
  {
    name: "Muneeb Mushtaq",
    image: "/Muneeb Final.png",
    description:
      "Helping shape our vision for thoughtful digital work built around what businesses need.",
  },
  {
    name: "Syed Abdul Babar",
    image: "/Professional Office Headshot.png",
    description:
      "Working with the team to bring practical, polished digital ideas to life.",
  },
];

const aboutDescription =
  "Meet the Draxvane Technologies team, a full-service digital agency for software, websites, mobile apps, design, games, AI, and digital operations.";

export const metadata: Metadata = createMetadata({
  title: "About Us | Draxvane Technologies",
  description: aboutDescription,
  path: "/about",
  ogTitle: "Meet the team",
  ogSubtitle: "Built around what businesses need",
  ogKicker: "ABOUT DRAXVANE",
});

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-icon-diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/about",
          name: "About Us",
          description: aboutDescription,
          type: "AboutPage",
        })}
      />
      <main className="about-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Draxvane Technologies home">
          <span className="brand-mark">
            <Image
              src="/draxvane-logo.webp"
              alt="Draxvane Technologies"
              width={2090}
              height={375}
              sizes="(max-width: 700px) 172px, 210px"
              decoding="async"
              fetchPriority="high"
              preload
              unoptimized
            />
          </span>
        </Link>
        <HeaderNavigation />
      </header>

      <section className="about-hero section-shell">
        <div className="about-hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> Draxvane Technologies · Full-service digital agency
          </div>
          <h1>
            Digital work,
            <br />
            <span>all under one roof.</span>
          </h1>
          <p>
            Draxvane Technologies is a full-service digital agency. We design,
            build, and support websites, apps, custom software, games, brands,
            AI workflows, and digital operations—with one connected team for
            the work your business needs online.
          </p>
        </div>
        <div className="about-hero-visual" aria-label="One connected digital team">
          <div className="about-visual-orbit orbit-outer" aria-hidden="true" />
          <div className="about-visual-orbit orbit-inner" aria-hidden="true" />
          <div className="about-visual-core">
            <span>Draxvane Technologies</span>
            <strong>Every</strong>
            <strong>digital need</strong>
          </div>
          <div className="about-visual-chip chip-top">
            <span>01</span>
            Creative
          </div>
          <div className="about-visual-chip chip-right">
            <span>02</span>
            Technical
          </div>
          <div className="about-visual-chip chip-bottom">
            <span>03</span>
            Operational
          </div>
        </div>
      </section>

      <section className="about-founder-section section-shell">
        <div className="about-person-card about-founder-card about-founder-feature-card">
          <div className="about-founder-photo">
            <Image
              src="/Founder.png"
              alt="Fahad Mehmood, Founder of Draxvane Technologies"
              fill
              sizes="(max-width: 700px) 260px, 320px"
              priority
            />
          </div>
          <div className="about-person-copy">
            <span className="about-person-role">Founder</span>
            <h2>
              <span>Fahad</span>
              <span>Mehmood</span>
            </h2>
            <p>
              Fahad founded Draxvane Technologies to bring creative,
              technical, and operational skills under one roof. He sets the
              vision, shapes the right team for each project, and keeps the
              work grounded in real business needs.
            </p>
          </div>
        </div>
        <div className="about-leadership-grid">
          <div className="about-person-card about-founder-card about-ceo-card">
            <div className="about-person-copy">
              <span className="about-person-role">CEO</span>
              <h2>
                <span>Zara</span>
                <span>Saleem</span>
              </h2>
              <p>
                Zara leads Draxvane Technologies with clear direction and
                dependable delivery. She turns client goals into practical
                plans, keeps every team aligned, and makes sure each release is
                useful, polished, and built to last.
              </p>
            </div>
          </div>
          <div className="about-cofounders-grid">
            {cofounders.map((cofounder) => (
              <article
                className="about-person-card about-founder-card about-cofounder-card"
                key={cofounder.name}
              >
                <div className="about-founder-photo">
                  <Image
                    src={cofounder.image}
                    alt={`${cofounder.name}, Co-founder of Draxvane Technologies`}
                    fill
                    sizes="(max-width: 700px) 130px, 160px"
                  />
                </div>
                <div className="about-person-copy">
                  <span className="about-person-role">Co-founder</span>
                  <h2>{cofounder.name}</h2>
                  <p>{cofounder.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      

      <section className="about-specialists-section section-shell">
        <div className="section-heading about-specialists-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" />Our people
            </div>
            <h2>Good work starts with <span>the right people.</span></h2>
          </div>
          <p>
            A small team, clear ownership, and no hand-offs to people who don&apos;t
            know your project.
          </p>
        </div>

        <div className="about-team-grid">
          {teamMembers.map((member) => (
            <article className="about-person-card about-team-card" key={member.name}>
              <div className="about-person-copy">
                <span className="about-person-role">{member.role}</span>
                <h3>{member.name}</h3>
                <p>{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta-section section-shell">
        <div className="contact-card">
          <div className="contact-glow" />
          <div className="eyebrow">
            <span className="eyebrow-line" /> Let&apos;s work together
          </div>
          <h2>Have something<br />in mind?</h2>
          <div className="contact-bottom">
            <p>
              Tell us what you&apos;re working on and we&apos;ll help you find a
              clear next step.
            </p>
            <Link className="button button-primary" href="/contact">
              Start a conversation <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      </main>
    </>
  );
}
