import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeaderNavigation from "../../components/HeaderNavigation";
import JsonLd from "../../components/JsonLd";
import SiteFooter from "../../components/SiteFooter";
import { projects } from "../../lib/projects";
import { createMetadata } from "../seo";
import { pageSchema } from "../structured-data";

const workDescription =
  "Selected projects by Draxvane Technologies, from a UK safety consultancy platform and hotel management software to AI-powered shop billing.";

export const metadata: Metadata = createMetadata({
  title: "Our Work | Draxvane Technologies",
  description: workDescription,
  path: "/work",
  ogTitle: "Selected work",
  ogSubtitle: "Built for real businesses",
  ogKicker: "SELECTED WORK",
});

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="arrow-icon" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/work",
          name: "Our Work",
          description: workDescription,
          type: "CollectionPage",
        })}
      />
      <main className="work-page">
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

        <section className="work-page-hero section-shell">
          <div className="work-page-hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> Selected work</div>
            <h1>Built for the work<br /><span>that matters.</span></h1>
            <p>
              A closer look at the platforms, tools, and apps we create. Each
              project starts with a real business need and ends with something
              people can actually use.
            </p>
            <div className="work-page-scope" aria-label="Our work">
              <span>Web platforms</span>
              <i aria-hidden="true" />
              <span>Hotel software</span>
              <i aria-hidden="true" />
              <span>AI tools</span>
            </div>
          </div>
          <div className="work-page-hero-visual">
            <Image
              src="/images/workspace.jpg"
              alt="Draxvane team workspace"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              priority
            />
            <div className="work-page-hero-chip">
              <span>One team</span>
              <strong>Every discipline</strong>
            </div>
          </div>
        </section>

        <div className="work-list section-shell">
          {projects.map((project, index) => (
            <article className="case-study" id={project.slug} key={project.slug}>
              <div className="case-meta">
                <span className="case-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="case-category">{project.category}</span>
              </div>

              <div className="case-image">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 700px) 100vw, 90vw"
                  loading="lazy"
                />
              </div>

              <div className="case-main">
                <div className="case-intro">
                  <h2>{project.title}</h2>
                  <p className="case-summary">{project.summary}</p>
                  <div className="case-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>

                <div className="case-detail">
                  <div className="case-block">
                    <h3>The brief</h3>
                    <p>{project.overview}</p>
                  </div>
                  <div className="case-block">
                    <h3>What we did</h3>
                    <ul>
                      {project.contributions.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="work-page-cta section-shell">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> Your project next</div>
            <h2>Have something<br />in mind?</h2>
          </div>
          <div>
            <p>
              Tell us what you need. We&apos;ll put the right people on it and
              keep the whole process clear from day one.
            </p>
            <Link className="button button-primary" href="/contact">
              Start a conversation <ArrowIcon />
            </Link>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
