"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

const rotatingPhrases = ["need.", "idea.", "launch.", "vision."];
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const ROLL_MS = 700;

/* Layout effects run before paint on the client, but this module is also
   evaluated during SSR — fall back to useEffect there. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type WordState = "active" | "leaving" | "idle";

/* Keeps the full stop from visually merging with the final letter under the
   headline's tight letter-spacing. */
function PhraseText({ phrase }: { phrase: string }) {
  return (
    <>
      {phrase.slice(0, -1)}
      <span style={{ marginLeft: "0.035em" }}>{phrase.slice(-1)}</span>
    </>
  );
}

function wordStyle(state: WordState): CSSProperties {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    whiteSpace: "nowrap",
    pointerEvents: "none",
    opacity: state === "active" ? 1 : 0,
    transform:
      state === "active"
        ? "translate3d(0, 0, 0) scale(1)"
        : state === "leaving"
          ? "translate3d(0, -24px, 0) scale(0.96)"
          : "translate3d(0, 24px, 0) scale(0.96)",
    transition: `transform ${ROLL_MS}ms ${EASE}, opacity 500ms ease`,
    willChange: state === "idle" ? "auto" : "transform, opacity",
  };
}

const subscribeNothing = () => () => {};

export default function HeroPhrase() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  /* Only the active phrase is rendered on the server. Hidden measuring copies
     and the other animation states are added after hydration so link scrapers
     never see every rotating word crammed into the headline. */
  const mounted = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
  const indexRef = useRef(0);
  const phraseRef = useRef<HTMLSpanElement>(null);
  const sizerRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const widthsRef = useRef<number[]>([]);
  const readyRef = useRef(false);

  /* The in-flow sizer renders the current word, so the server-rendered line is
     already centred with the correct width. Hidden copies provide the widths
     we ease to on later rolls. */
  const applyWidth = useCallback((index: number) => {
    const phrase = phraseRef.current;
    const widths = widthsRef.current;
    if (!phrase || !widths.length) return;
    phrase.style.width = `${widths[index] ?? widths[0]}px`;
  }, []);

  const measure = useCallback(() => {
    const nodes = measureRef.current?.children;
    if (!nodes?.length) return;
    widthsRef.current = Array.from(nodes, (node) =>
      (node as HTMLElement).getBoundingClientRect().width,
    );
  }, []);

  useIsomorphicLayoutEffect(() => {
    const phrase = phraseRef.current;
    if (!phrase) return;

    measure();
    if (document.fonts?.status !== "loaded") {
      document.fonts?.ready.then(() => {
        measure();
        if (readyRef.current) applyWidth(indexRef.current);
      });
    }

    /* Arm the width transition only after the first paint. The first word
       keeps its natural width, so there is no first-load jump. */
    const frame = requestAnimationFrame(() => {
      readyRef.current = true;
    });

    const onResize = () => {
      measure();
      if (readyRef.current) applyWidth(indexRef.current);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      readyRef.current = false;
      phrase.style.removeProperty("width");
    };
  }, [applyWidth, measure, mounted]);

  /* On each roll the box eases to the new word's width; the centred line
     follows it smoothly instead of being pushed off centre. */
  useIsomorphicLayoutEffect(() => {
    if (readyRef.current) applyWidth(phraseIndex);
  }, [phraseIndex, applyWidth]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let changeTimer: ReturnType<typeof setTimeout>;
    let clearTimer: ReturnType<typeof setTimeout>;

    const scheduleChange = () => {
      changeTimer = setTimeout(() => {
        const next = (indexRef.current + 1) % rotatingPhrases.length;
        setLeavingIndex(indexRef.current);
        indexRef.current = next;
        setPhraseIndex(next);

        clearTimer = setTimeout(() => setLeavingIndex(null), ROLL_MS);
        scheduleChange();
      }, 3600);
    };

    scheduleChange();

    return () => {
      clearTimeout(changeTimer);
      clearTimeout(clearTimer);
    };
  }, []);

  return (
    <span className="rotating-phrase" ref={phraseRef}>
      {/* In-flow word: visible on the server (so no-JS visitors and scrapers
          see a single clean phrase), then hidden once the animated copies
          take over after hydration. It still sets the box width. */}
      <span
        className={`headline-accent phrase-sizer${mounted ? " phrase-sizer-hidden" : ""}`}
        aria-hidden={mounted}
        ref={sizerRef}
      >
        <PhraseText phrase={rotatingPhrases[phraseIndex]} />
      </span>

      {/* Hidden copies used only for measuring the target widths. They are
          added after hydration to keep the server HTML free of every phrase. */}
      <span className="phrase-measure" aria-hidden="true" ref={measureRef}>
        {mounted
          ? rotatingPhrases.map((phrase) => (
              <span key={phrase}>
                <PhraseText phrase={phrase} />
              </span>
            ))
          : null}
      </span>

      {rotatingPhrases.map((phrase, index) => {
        if (!mounted) return null;

        const state: WordState =
          index === phraseIndex
            ? "active"
            : index === leavingIndex
              ? "leaving"
              : "idle";

        return (
          <span
            key={phrase}
            className="headline-accent rotating-phrase-word"
            style={wordStyle(state)}
            aria-hidden={index !== phraseIndex}
          >
            <PhraseText phrase={phrase} />
          </span>
        );
      })}
    </span>
  );
}
