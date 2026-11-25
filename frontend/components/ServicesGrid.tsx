"use client";

import { useEffect, useRef, useState } from "react";

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

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="arrow-icon arrow-icon-diagonal" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function ServicesGrid() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [closingService, setClosingService] = useState<string | null>(null);
  const [serviceColumns, setServiceColumns] = useState(3);
  const closeServiceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const updateColumns = () => {
      setServiceColumns(window.innerWidth <= 650 ? 1 : window.innerWidth <= 900 ? 2 : 3);
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
      }, 140);
      return;
    }

    setClosingService(null);
    setActiveService(number);
  };

  return (
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
            <div
              className={`service-row${row.length === 1 ? " is-single" : ""}`}
              key={row[0].number}
            >
              {row.map((service) => {
                const isActive = activeService === service.number;

                return (
                  <button
                    className={`service-card${isActive ? " is-active" : ""}`}
                    type="button"
                    key={service.number}
                    aria-expanded={isActive}
                    aria-controls={`service-detail-${service.number}`}
                    onClick={() => toggleService(service.number)}
                  >
                    <span className="service-card-top">
                      <span>{service.number}</span>
                      <span className="service-arrow" aria-hidden="true">
                        <ArrowIcon />
                      </span>
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </button>
                );
              })}
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
  );
}
