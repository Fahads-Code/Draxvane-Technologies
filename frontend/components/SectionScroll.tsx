"use client";

import { useEffect, useLayoutEffect } from "react";
import { HOME_ROUTES, routeState } from "./routeState";

/* Layout effects must run before paint, but this component also renders on
   the server — fall back to useEffect there to avoid SSR warnings. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function SectionScroll({ section }: { section?: string }) {
  useIsomorphicLayoutEffect(() => {
    if (!section) return;

    const target = document.getElementById(section);
    if (!target) return;

    const comingFromHome =
      routeState.current !== null && HOME_ROUTES.includes(routeState.current);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /* Moving inside the Home surface: glide from where the user already is.
       Arriving from another page (or a direct load): land before paint, so
       the dark hero never flashes past during a long scroll. */
    const behavior =
      comingFromHome && !reduceMotion ? "smooth" : "auto";

    target.scrollIntoView({ behavior, block: "start" });
  }, [section]);

  return null;
}
