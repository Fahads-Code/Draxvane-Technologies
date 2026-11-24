"use client";

import { useEffect } from "react";

/**
 * Pauses the decorative hero animations once the hero leaves the viewport.
 * Works on the DOM node directly so the server-rendered hero never re-renders.
 */
export default function HeroMotion() {
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => hero.classList.toggle("is-out-of-view", !entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0 },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
      hero.classList.remove("is-out-of-view");
    };
  }, []);

  return null;
}
