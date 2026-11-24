"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeaderNavigation from "../components/HeaderNavigation";

const rotatingPhrases = ["need.", "idea.", "launch.", "vision."];

const services = [
  {
    number: "01",
    title: "Custom software",
    description:
      "Purpose-built platforms and tools that fit the way your business works, from first concept to launch.",
    details: [
      "Web platforms",
      "Business management systems",
      "CRM and ERP solutions",
      "Dashboards",
      "Internal tools",
      "API integrations",
    ],
  },
  {
    number: "02",
    title: "Websites & e-commerce",
    description:
      "High-performing websites and online stores that make your brand clear and buying easy.",
    details: [
      "Corporate websites",
      "Landing pages",
      "Portfolio sites",
      "News and publishing",
      "Online stores",
      "B2B and booking platforms",
    ],
  },
  {
    number: "03",
    title: "WordPress & Shopify",
    description:
      "Custom WordPress websites and Shopify stores, set up to showcase your brand and make online selling simple.",
    details: [
      "Custom WordPress themes",
      "WooCommerce stores",
      "Shopify theme development",
      "Product catalogs",
      "Payments and shipping",
      "Store migration",
    ],
  },
  {
    number: "04",
    title: "Mobile apps",
    description:
      "Useful, intuitive apps for iOS and Android, from early prototype through ongoing improvements.",
    details: [
      "iOS applications",
      "Android applications",
      "Cross-platform apps",
      "MVP development",
      "App UI/UX",
      "Maintenance and updates",
    ],
  },
  {
    number: "05",
    title: "Game development",
    description:
      "Playable experiences brought to life through game design, development, art, and production support.",
    details: [
      "2D and 3D games",
      "Mobile games",
      "Browser games",
      "Game UI",
      "Character and world art",
      "Prototype to launch",
    ],
  },
  {
    number: "06",
    title: "Graphic design & branding",
    description:
      "Distinctive visual identities and polished creative assets for your brand, product, and campaigns.",
    details: [
      "Logo and identity",
      "Brand guidelines",
      "Social media assets",
      "Marketing creatives",
      "Packaging design",
      "Presentation design",
    ],
  },
  {
    number: "07",
    title: "AI & automation",
    description:
      "Connect your tools and simplify repeatable work with practical AI and workflow automation.",
    details: [
      "AI agents",
      "AI assistants",
      "Workflow automation",
      "Chatbots",
      "Document processing",
      "CRM integrations",
      "Custom API workflows",
    ],
  },
  {
    number: "08",
    title: "Data entry & digital operations",
    description:
      "Accurate, organized support for the detail-heavy work that keeps your digital business moving.",
    details: [
      "Data entry",
      "Data cleanup",
      "Spreadsheet management",
      "Product uploads",
      "CRM data support",
      "Reporting and validation",
    ],
  },
  {
    number: "09",
    title: "Content & digital marketing",
    description:
      "Consistent digital content and campaign support that helps your business reach the right people.",
    details: [
      "SEO content",
      "Social media content",
      "Campaign planning",
      "Email marketing",
      "Ad creative",
      "Performance reporting",
    ],
  },
];

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
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isPhraseLeaving, setIsPhraseLeaving] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [closingService, setClosingService] = useState<string | null>(null);
  const [serviceColumns, setServiceColumns] = useState(4);
  const [isHeroOutOfView, setIsHeroOutOfView] = useState(false);
  const closeServiceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (initialSection) {
      document.getElementById(initialSection)?.scrollIntoView();
    }
  }, [initialSection]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroOutOfView(!entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateColumns = () => {
      setServiceColumns(window.innerWidth <= 650 ? 1 : window.innerWidth <= 900 ? 2 : 4);
    };
    let resizeFrame = 0;
    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(updateColumns);
    };
    updateColumns();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => () => {
    if (closeServiceTimer.current) clearTimeout(closeServiceTimer.current);
  }, []);

  const toggleService = (number: string) => {
    if (closeServiceTimer.current) clearTimeout(closeServiceTimer.current);

    if (activeService === number) {
      setClosingService(number);
      closeServiceTimer.current = setTimeout(() => {
        setActiveService(null);
        setClosingService(null);
        closeServiceTimer.current = null;
      }, 420);
      return;
    }

    setClosingService(null);
    setActiveService(number);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let changeTimer: ReturnType<typeof setTimeout>;
    let updateTimer: ReturnType<typeof setTimeout>;

    const scheduleChange = () => {
      setIsPhraseLeaving(true);
      updateTimer = setTimeout(() => {
        setPhraseIndex((currentIndex) => (currentIndex + 1) % rotatingPhrases.length);
        setIsPhraseLeaving(false);
        changeTimer = setTimeout(scheduleChange, 4200);
      }, 700);
    };

    changeTimer = setTimeout(scheduleChange, 4200);

    return () => {
      clearTimeout(changeTimer);
      clearTimeout(updateTimer);
    };
  }, []);

  return (
    <main>
      {/* <div className="announcement">
        <span className="announcement-dot" />
        One team for software, design, games & digital operations
      </div> */}

      <header className="site-header">
        <Link className="brand" href="/" aria-label="Draxvane Technologies home">
          <span className="brand-mark">
            <Image
              src="/Draxvane Technologies Logo.png"
              alt="Draxvane Technologies"
              width={1045}
              height={188}
              sizes="210px"
              decoding="async"
              priority
            />
            <span className="brand-d-dot dot-one" aria-hidden="true" />
            <span className="brand-d-dot dot-two" aria-hidden="true" />
            <span className="brand-d-dot dot-three" aria-hidden="true" />
          </span>
        </Link>
        <HeaderNavigation />
      </header>

      <section
        ref={heroRef}
        className={`hero section-shell${isHeroOutOfView ? " is-out-of-view" : ""}`}
        id="home"
      >
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
            <span className="hero-line"><span>One team.</span></span>
            <span className="hero-line">
              <span>
                <span className="headline-light">Every digital </span>
                <span
                  key={phraseIndex}
                  className={`headline-accent rotating-phrase${isPhraseLeaving ? " is-leaving" : ""}`}
                  aria-label={`Every digital ${rotatingPhrases[phraseIndex]}`}
                >
                  {rotatingPhrases[phraseIndex]}
                </span>
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

      <section className="services-section section-shell" id="services">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> What we can take off your plate</div>
            <h2>Your whole digital team. <span>All in one place.</span></h2>
          </div>
          <p>
            Bring us one task or a full project. We bring the right expertise
            together to move it forward.
          </p>
        </div>
        <div className="service-grid">
          {Array.from(
            { length: Math.ceil(services.length / serviceColumns) },
            (_, rowIndex) => services.slice(rowIndex * serviceColumns, (rowIndex + 1) * serviceColumns),
          ).map((row) => {
            const rowActiveService = row.find(
              (service) => service.number === activeService || service.number === closingService,
            );

            return (
              <div className="service-row" key={row[0].number}>
                {row.map((service) => (
                  <article
                    className={`service-card${activeService === service.number ? " is-active" : ""}`}
                    key={service.number}
                  >
                    <div className="service-card-top">
                      <span>{service.number}</span>
                      <button
                        className="service-arrow"
                        type="button"
                        aria-label={`${activeService === service.number ? "Close" : "View"} ${service.title} details`}
                        aria-expanded={activeService === service.number}
                        aria-controls={`service-detail-${service.number}`}
                        onClick={() => toggleService(service.number)}
                      >
                        <ArrowIcon diagonal />
                      </button>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </article>
                ))}
                {rowActiveService && (
                  <div
                    id={`service-detail-${rowActiveService.number}`}
                    className={`service-detail-shell${closingService === rowActiveService.number ? " is-closing" : ""}`}
                  >
                    <div className="service-detail">
                      <div className="service-detail-heading">
                        <span>{rowActiveService.number}</span>
                        <h3>{rowActiveService.title}</h3>
                      </div>
                      <div className="service-detail-items" role="list">
                        {rowActiveService.details.map((detail) => (
                          <span role="listitem" key={detail}>
                            <i aria-hidden="true" />
                            {detail}
                          </span>
                        ))}
                      </div>
                      <button
                        className="service-detail-close"
                        type="button"
                        aria-label={`Close ${rowActiveService.title} details`}
                        onClick={() => toggleService(rowActiveService.number)}
                      >
                        Close <ArrowIcon />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* <section className="manifesto-section" id="about">
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
      </section> */}

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

      <footer className="site-footer section-shell">
        <Link className="brand footer-brand" href="/" aria-label="Draxvane Technologies home">
          <span className="brand-mark">
            <Image
              src="/draxvane-logo.webp"
              alt="Draxvane Technologies"
              width={1045}
              height={188}
              sizes="170px"
              decoding="async"
            />
          </span>
        </Link>
        <p>Your all-in-one digital team.</p>
        <a href="mailto:hello@draxvane.com">hello@draxvane.com</a>
        <span className="copyright">© 2026 Draxvane Technologies</span>
      </footer>
    </main>
  );
}
