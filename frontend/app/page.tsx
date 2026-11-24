import Image from "next/image";
import Link from "next/link";
import HeaderNavigation from "../components/HeaderNavigation";
import HeroMotion from "../components/HeroMotion";
import HeroPhrase from "../components/HeroPhrase";
import SectionScroll from "../components/SectionScroll";
import ServicesGrid from "../components/ServicesGrid";
import SiteFooter from "../components/SiteFooter";

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description: "We listen, ask the right questions, and agree on what a good result looks like.",
  },
  {
    number: "02",
    title: "Shape the right plan",
    description: "We match the scope to the right specialists, priorities, and budget.",
  },
  {
    number: "03",
    title: "Do the work",
    description: "Our team creates, builds, organizes, and checks every deliverable with care.",
  },
  {
    number: "04",
    title: "Keep things moving",
    description: "Get clear handover and ongoing support as your needs grow or change.",
  },
];

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

export default function Home({ initialSection }: { initialSection?: string }) {
  return (
    <main>
      <SectionScroll section={initialSection} />

      <header className="site-header">
        <Link className="brand" href="/" aria-label="Draxvane Technologies home">
          <span className="brand-mark">
            <Image
              src="/draxvane-logo.webp"
              alt="Draxvane Technologies"
              width={2090}
              height={375}
              sizes="210px"
              decoding="async"
              priority
              unoptimized
            />
            <span className="brand-d-dot dot-one" aria-hidden="true" />
            <span className="brand-d-dot dot-two" aria-hidden="true" />
            <span className="brand-d-dot dot-three" aria-hidden="true" />
          </span>
        </Link>
        <HeaderNavigation />
      </header>

      <section className="hero section-shell" id="home">
        <HeroMotion />
        <div className="hero-atmosphere" aria-hidden="true">
          <span className="hero-grid" />
          <span className="hero-orbit hero-orbit-one" />
          <span className="hero-orbit hero-orbit-two" />
          <span className="hero-particle hero-particle-one" />
          <span className="hero-particle hero-particle-two" />
          <span className="hero-particle hero-particle-three" />
        </div>
        <div className="hero-copy">
          <div className="hero-kicker"><span />Tell us what you need. We will take it from here.</div>
          <h1>
            <span className="hero-line"><span>One Agency.</span></span>
            <span className="hero-line">
              <span>
                <span className="headline-light">Every digital </span>
                <HeroPhrase />
              </span>
            </span>
          </h1>
          <p className="hero-description">
            Custom software, websites, mobile apps, games, design, AI, and accurate data entry, planned, built, and delivered by one dedicated team. No gaps, no delays, no chasing multiple people.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/contact">
              Tell us what you need <ArrowIcon />
            </Link>
            <Link className="text-link" href="/services">
              Explore our services <ArrowIcon />
            </Link>
          </div>
          <div className="hero-note" role="group" aria-label="Our capabilities">
            <span>Creative</span>
            <i aria-hidden="true" />
            <span>Technical</span>
            <i aria-hidden="true" />
            <span>Operational</span>
          </div>
        </div>
      </section>

      <section className="manifesto-section" id="about">
        <div className="manifesto-inner section-shell">
          <div className="eyebrow"><span className="eyebrow-line" /> A partner for the whole picture</div>
          <p className="manifesto">
            From first idea
            <br />
            <span>to the details that get it done.</span>
          </p>
          <div className="manifesto-bottom">
            <p>
              Software, visual design, games, and digital operations all have a
              place on the same team. Work with one point of contact and a clear
              plan, whatever the task.
            </p>
            <Link className="text-link" href="/approach">
              How we work <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <ServicesGrid />

      <section className="approach-section section-shell" id="approach">
        <div className="section-heading approach-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> Straightforward from day one</div>
            <h2>Big project or small task. <span>Done with care.</span></h2>
          </div>
          <p>From a new product to a one-off design or data task, you always know what happens next.</p>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <span className="step-line" />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section section-shell" id="contact">
        <div className="contact-card">
          <div className="contact-glow" />
          <div className="eyebrow"><span className="eyebrow-line" /> Start with what you need</div>
          <h2>Tell us what<br />you&apos;re working on.</h2>
          <div className="contact-bottom">
            <p>Software, design, games, automation, or data work—share the task and we&apos;ll help you find the next step.</p>
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
