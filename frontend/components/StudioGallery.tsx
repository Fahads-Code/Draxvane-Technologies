import Image from "next/image";
import Link from "next/link";

const visuals = [
  {
    src: "/images/team-collaboration.jpg",
    alt: "Draxvane team collaborating around a table",
    label: "One team",
    title: "Every skill in one place",
    description:
      "Designers, developers, and operations support work together, so you deal with one team instead of juggling different vendors.",
  },
  {
    src: "/images/analytics.jpg",
    alt: "Analytics and planning on a laptop screen",
    label: "Clear process",
    title: "A plan you can follow",
    description:
      "We agree on the scope and next steps first, then keep you posted as the work moves forward.",
  },
  {
    src: "/images/development.jpg",
    alt: "Developers working together at their desks",
    label: "Real care",
    title: "Checked before it reaches you",
    description:
      "We review the small details as well as the big picture, so what we hand over is ready to use.",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="arrow-icon arrow-icon-diagonal" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function StudioGallery() {
  return (
    <section className="studio-section section-shell" id="studio">
      <div className="section-heading studio-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> Behind the work</div>
          <h2>People, process, <span>and care.</span></h2>
        </div>
        <p>
          Digital work needs more than one skill. These are the three things
          we keep at the centre of every project.
        </p>
      </div>

      <div className="studio-grid">
        {visuals.map((visual) => (
          <figure className="studio-card" key={visual.src}>
            <div className="studio-image">
              <Image
                src={visual.src}
                alt={visual.alt}
                fill
                sizes="(max-width: 650px) 100vw, (max-width: 900px) 50vw, 33vw"
                decoding="async"
              />
            </div>
            <figcaption>
              <span>{visual.label}</span>
              <h3>{visual.title}</h3>
              <p>{visual.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="studio-footer">
        <Link className="text-link" href="/about">
          Meet the team <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
