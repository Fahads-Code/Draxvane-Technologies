import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/people/Draxvane-Technologies/61596617620192/", icon: FacebookIcon },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/draxvane", icon: LinkedInIcon },
  { name: "Instagram", href: "https://www.instagram.com/draxvanetech/", icon: InstagramIcon },
];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.6h2.6l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.2c-.28-.04-1.23-.12-2.34-.12-2.32 0-3.91 1.42-3.91 4.03v2.29H7.8v3h2.55V21h3.15Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.1 8.6H3.2V21h2.9V8.6ZM4.65 3a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM21 14.1c0-3.2-1.7-4.7-4-4.7a3.5 3.5 0 0 0-3.1 1.7V8.6H11V21h2.9v-6.5c0-1.7.9-2.7 2.3-2.7 1.3 0 1.9.9 1.9 2.7V21H21v-6.9Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-top">
        <div className="footer-identity">
          <Link className="brand footer-brand" href="/" aria-label="Draxvane Technologies home">
            <span className="brand-mark">
              <Image
                src="/draxvane-logo.webp"
                alt="Draxvane Technologies"
                width={2090}
                height={375}
                sizes="170px"
                decoding="async"
              />
            </span>
          </Link>
          <p>Your all-in-one digital team.</p>
        </div>

        <div className="footer-social" aria-label="Social media links">
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <a
              className="footer-social-link"
              data-network={name.toLowerCase()}
              href={href}
              key={name}
              aria-label={name}
              title={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span className="copyright">© 2026 Draxvane Technologies</span>
        <a href="mailto:hello@draxvane.com">hello@draxvane.com</a>
      </div>
    </footer>
  );
}
