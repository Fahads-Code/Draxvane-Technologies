"use client";

import { useEffect } from "react";

export default function SectionScroll({ section }: { section?: string }) {
  useEffect(() => {
    if (!section) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "auto", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [section]);

  return null;
}
