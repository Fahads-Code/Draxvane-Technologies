import Image from "next/image";
import Link from "next/link";

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
                unoptimized
              />
            </span>
          </Link>
          <p>Your all-in-one digital team.</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/services" scroll={false}>What we do</Link>
          <Link href="/approach" scroll={false}>Our approach</Link>
          <Link href="/about">About us</Link>
          <Link href="/contact">Let&apos;s talk</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <span className="copyright">© 2026 Draxvane Technologies</span>
        <a href="mailto:hello@draxvane.com">hello@draxvane.com</a>
      </div>
    </footer>
  );
}
