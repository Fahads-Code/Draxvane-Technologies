"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { routeState } from "./routeState";

const REVEAL_SELECTOR = [
  ".section-heading",
  ".service-card",
  ".step-card",
  ".manifesto-inner > *",
  ".about-hero-copy > *",
  ".about-hero-visual",
  ".about-person-card",
  ".contact-card",
  ".contact-page-copy > *",
  ".contact-details",
  ".contact-form",
  ".site-footer > *",
].join(", ");

const AMBIENT_SELECTOR = [
  // The hero manages its own animation pausing via HeroMotion.
  ".manifesto-section",
  ".services-section",
  ".approach-section",
  ".contact-section",
  ".about-hero",
  ".about-founder-section",
  ".about-specialists-section",
  ".about-cta-section",
  ".contact-page-hero",
  ".contact-form-section",
  ".site-footer",
].join(", ");

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Runs after child layout effects, so SectionScroll can still read the
    // route we came from while deciding smooth vs instant positioning.
    routeState.previous = routeState.current;
    routeState.current = pathname;

    const root = document.documentElement;
    const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number };
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = navigatorWithMemory.deviceMemory ?? 8;

    root.classList.toggle("low-power", cores <= 4 || memory <= 4);

    const onVisibility = () => {
      root.classList.toggle("page-hidden", document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    // On phones CSS already shows every section without reveal motion,
    // so skip the observers and per-element style writes entirely.
    if (window.matchMedia("(max-width: 700px)").matches) {
      return () => {
        document.removeEventListener("visibilitychange", onVisibility);
        root.classList.remove("page-hidden");
      };
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(AMBIENT_SELECTOR),
    );
    const hasObserver = "IntersectionObserver" in window;
    let ambientObserver: IntersectionObserver | undefined;

    if (hasObserver && sections.length) {
      ambientObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle(
              "ambient-paused",
              !entry.isIntersecting,
            );
          });
        },
        { rootMargin: "120px 0px" },
      );

      sections.forEach((section) => {
        section.classList.add("ambient-paused");
        ambientObserver?.observe(section);
      });
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !hasObserver) {
      return () => {
        document.removeEventListener("visibilitychange", onVisibility);
        root.classList.remove("page-hidden");
        ambientObserver?.disconnect();
        sections.forEach((section) => section.classList.remove("ambient-paused"));
      };
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    const timers = new Set<ReturnType<typeof setTimeout>>();

    targets.forEach((element) => element.classList.add("reveal-pending"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          // No per-item stagger: images should be visible as soon as they load.
          element.style.setProperty("--reveal-delay", "0ms");

          // Promote to its own layer only while this element is animating.
          element.style.willChange = "opacity, transform";
          element.classList.add("reveal-in");
          revealObserver.unobserve(element);

          const timer = setTimeout(() => {
            element.style.willChange = "";
            timers.delete(timer);
          }, 1100);
          timers.add(timer);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    targets.forEach((element) => revealObserver.observe(element));

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      root.classList.remove("page-hidden");
      ambientObserver?.disconnect();
      sections.forEach((section) => section.classList.remove("ambient-paused"));
      revealObserver.disconnect();
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
      targets.forEach((element) => {
        element.classList.remove("reveal-pending", "reveal-in");
        element.style.removeProperty("--reveal-delay");
        element.style.willChange = "";
      });
    };
  }, [pathname]);

  return null;
}
