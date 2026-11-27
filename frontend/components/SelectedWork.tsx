import Image from "next/image";
import Link from "next/link";
import { projects } from "../lib/projects";

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

export default function SelectedWork() {
  return (
    <section className="work-section section-shell" id="work">
      <div className="section-heading work-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> Selected work</div>
          <h2>Work that speaks <span>for itself.</span></h2>
        </div>
        <p>
          A look at the kinds of products, platforms, and apps we build for
          businesses like yours.
        </p>
      </div>

      <div className="work-grid">
        {projects.map((project, index) => (
          <article className="work-card" key={project.slug}>
            <div className="work-card-media">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 650px) 100vw, (max-width: 900px) 50vw, 33vw"
                loading="lazy"
              />
              <span className="work-card-index">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="work-card-top">
              <span className="work-category">{project.category}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <Link className="text-link work-link" href={`/work#${project.slug}`}>
              View case study <ArrowIcon diagonal />
            </Link>
          </article>
        ))}
      </div>

      <div className="work-footer">
        <p>All projects, in more detail.</p>
        <Link className="text-link" href="/work">
          See all work <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
