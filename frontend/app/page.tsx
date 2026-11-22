import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Custom software",
    description:
      "Purpose-built platforms and tools that fit the way your business works, from first concept to launch.",
    tags: ["Web apps", "SaaS", "Integrations"],
  },
  {
    number: "02",
    title: "Websites & e-commerce",
    description:
      "High-performing websites and online stores that make your brand clear and buying easy.",
    tags: ["Web design", "Online stores", "CMS"],
  },
  {
    number: "03",
    title: "Mobile apps",
    description:
      "Useful, intuitive apps for iOS and Android, from early prototype through ongoing improvements.",
    tags: ["iOS & Android", "Prototypes", "Product design"],
  },
  {
    number: "04",
    title: "Game development",
    description:
      "Playable experiences brought to life through game design, development, art, and production support.",
    tags: ["2D & 3D", "Game art", "Prototyping"],
  },
  {
    number: "05",
    title: "Graphic design & branding",
    description:
      "Distinctive visual identities and polished creative assets for your brand, product, and campaigns.",
    tags: ["Brand identity", "Social graphics", "UI design"],
  },
  {
    number: "06",
    title: "AI & automation",
    description:
      "Connect your tools and simplify repeatable work with practical AI and workflow automation.",
    tags: ["AI tools", "Workflows", "Integrations"],
  },
  {
    number: "07",
    title: "Data entry & digital operations",
    description:
      "Accurate, organized support for the detail-heavy work that keeps your digital business moving.",
    tags: ["Data entry", "Product catalogs", "Research"],
  },
  {
    number: "08",
    title: "Content & digital marketing",
    description:
      "Consistent digital content and campaign support that helps your business reach the right people.",
    tags: ["Content", "Campaigns", "SEO"],
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

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span className="announcement-dot" />
        One team for software, design, games & digital operations
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Bimex Technologies home">
          <span className="brand-mark">
            <Image
              src="/bimex-logo.svg"
              alt="Bimex Technologies"
              width={907}
              height={288}
              priority
            />
          </span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#services">What we do</a>
          <a href="#approach">Our approach</a>
          <a href="#about">About us</a>
        </nav>
        <a className="header-cta" href="mailto:hello@bimextechnologies.com">
          Let&apos;s talk <ArrowIcon diagonal />
        </a>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            Your all-in-one digital team
          </div>
          <h1>
            One team.
            <br />
            <span className="headline-light">Every digital </span>
            <span className="headline-accent">need.</span>
          </h1>
          <p className="hero-description">
            From custom software, websites, and mobile apps to game development,
            graphic design, AI, and accurate data entry—we bring the right people
            together to get your digital work done.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="mailto:hello@bimextechnologies.com">
              Tell us what you need <ArrowIcon />
            </a>
            <a className="text-link" href="#services">
              Explore our services <ArrowIcon />
            </a>
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
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card-top">
                <span>{service.number}</span>
                <span className="service-arrow"><ArrowIcon diagonal /></span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-tags">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
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
            <a className="text-link" href="#approach">
              How we work <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

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
            <a className="button button-primary" href="mailto:hello@bimextechnologies.com">
              Start a conversation <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <a className="brand footer-brand" href="#home" aria-label="Bimex Technologies home">
          <span className="brand-mark">
            <Image
              src="/bimex-logo.svg"
              alt="Bimex Technologies"
              width={907}
              height={288}
            />
          </span>
        </a>
        <p>Your all-in-one digital team.</p>
        <a href="mailto:hello@bimextechnologies.com">hello@bimextechnologies.com</a>
        <span className="copyright">© 2026 Bimex Technologies</span>
      </footer>
    </main>
  );
}
