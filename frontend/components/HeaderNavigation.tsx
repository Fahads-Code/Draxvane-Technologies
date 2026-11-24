"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function HeaderNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const closeOnDesktop = () => {
      if (window.innerWidth > 700) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", isMenuOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`main-nav${isMenuOpen ? " is-open" : ""}`}
        aria-label="Main navigation"
        id="main-navigation"
      >
        <Link
          className={isActive("/services") ? "is-active" : undefined}
          aria-current={isActive("/services") ? "page" : undefined}
          href="/services"
          onClick={() => setIsMenuOpen(false)}
        >
          What we do
        </Link>
        <Link
          className={isActive("/approach") ? "is-active" : undefined}
          aria-current={isActive("/approach") ? "page" : undefined}
          href="/approach"
          onClick={() => setIsMenuOpen(false)}
        >
          Our approach
        </Link>
        <Link
          className={isActive("/about") ? "is-active" : undefined}
          aria-current={isActive("/about") ? "page" : undefined}
          href="/about"
          onClick={() => setIsMenuOpen(false)}
        >
          About us
        </Link>
        <Link
          className="header-cta mobile-menu-cta"
          href="/contact"
          onClick={() => setIsMenuOpen(false)}
        >
          Let&apos;s talk <ArrowIcon diagonal />
        </Link>
      </nav>
      <Link className="header-cta desktop-menu-cta" href="/contact">
        Let&apos;s talk <ArrowIcon diagonal />
      </Link>
      <button
        className={`menu-toggle${isMenuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
    </>
  );
}
