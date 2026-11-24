"use client";

import { useEffect, useState } from "react";

const rotatingPhrases = ["need.", "idea.", "launch.", "vision."];

export default function HeroPhrase() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isPhraseLeaving, setIsPhraseLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let changeTimer: ReturnType<typeof setTimeout>;
    let updateTimer: ReturnType<typeof setTimeout>;

    const scheduleChange = () => {
      setIsPhraseLeaving(true);
      updateTimer = setTimeout(() => {
        setPhraseIndex((currentIndex) => (currentIndex + 1) % rotatingPhrases.length);
        setIsPhraseLeaving(false);
        changeTimer = setTimeout(scheduleChange, 4200);
      }, 700);
    };

    changeTimer = setTimeout(scheduleChange, 4200);

    return () => {
      clearTimeout(changeTimer);
      clearTimeout(updateTimer);
    };
  }, []);

  return (
    <span
      key={phraseIndex}
      className={`headline-accent rotating-phrase${isPhraseLeaving ? " is-leaving" : ""}`}
      aria-label={`Every digital ${rotatingPhrases[phraseIndex]}`}
    >
      {rotatingPhrases[phraseIndex]}
    </span>
  );
}
