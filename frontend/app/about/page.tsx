import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeaderNavigation from "../../components/HeaderNavigation";
import SiteFooter from "../../components/SiteFooter";

const specialists = [
  {
    number: "01",
    name: "Team Member 01",
    role: "Custom software",
    description: "Tailored platforms, business tools, and software built around your needs.",
  },
  {
    number: "02",
    name: "Team Member 02",
    role: "Websites & e-commerce",
    description: "Business websites and online stores designed to work beautifully.",
  },
  {
    number: "03",
    name: "Team Member 03",
    role: "WordPress & Shopify",
    description: "Custom WordPress and Shopify experiences, from themes to store setup.",
  },
  {
    number: "04",
    name: "Team Member 04",
    role: "Mobile apps",
    description: "Useful mobile experiences for iOS, Android, and cross-platform products.",
  },
  {
    number: "05",
    name: "Team Member 05",
    role: "Game development",
    description: "Game design and development, from early concepts to playable releases.",
  },
  {
    number: "06",
    name: "Team Member 06",
    role: "Graphic design & branding",
    description: "Visual identities and creative assets that make brands stand out.",
  },
  {
    number: "07",
    name: "Team Member 07",
    role: "AI & automation",
    description: "Practical AI and workflows that help simplify repeatable work.",
  },
  {
    number: "08",
    name: "Team Member 08",
    role: "Data entry & digital operations",
    description: "Accurate data support and organized digital business operations.",
  },
  {
    number: "09",
    name: "Team Member 09",
    role: "Content & digital marketing",
    description: "Digital content and campaigns that help businesses reach their audience.",
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

export const metadata: Metadata = {
  title: "About Us | Draxvane Technologies",
  description:
    "Meet the Draxvane Technologies team, a full-service digital agency for software, websites, mobile apps, design, games, AI, and digital operations.",
};

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
    <main className="about-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Draxvane Technologies home">
          <span className="brand-mark">
            <Image
              src="/draxvane-logo.webp"
              alt="Draxvane Technologies"
              width={2090}
              height={375}
              sizes="210px"
              decoding="sync"
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
        <div className="about-leadership-grid">
          <div className="about-person-card about-founder-card">
            <div className="about-founder-photo">
              <Image
                src="/Founder.png"
                alt="Fahad Mehmood, Founder of Draxvane Technologies"
                fill
                sizes="(max-width: 700px) 210px, 280px"
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
                  sizes="(max-width: 700px) 120px, 180px"
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
      </section>

      

      <section className="about-specialists-section section-shell">
        <div className="section-heading about-specialists-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" />Our capabilities, our people
            </div>
            <h2>Specialists for <span>every kind of digital work.</span></h2>
          </div>
          <p>
            From software engineering and design to AI and digital operations,
            we bring the right specialist to the work at hand.
          </p>
        </div>

        <div className="about-specialist-grid">
          {specialists.map((specialist) => (
            <article className="about-specialist-card" key={specialist.number}>
              <div className="about-specialist-top">
                <span>{specialist.number}</span>
                <div className="about-avatar" aria-hidden="true">
                  {specialist.number}
                </div>
              </div>
              <div className="about-person-copy">
                <h3>{specialist.name}</h3>
                <span className="about-person-role">{specialist.role}</span>
                <p>{specialist.description}</p>
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
  );
}
