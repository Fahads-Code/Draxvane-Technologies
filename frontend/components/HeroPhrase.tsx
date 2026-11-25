"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const rotatingPhrases = ["need.", "idea.", "launch.", "vision."];
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const ROLL_MS = 700;

/* Layout effects must run before the browser paints, but the component is also
   rendered on the server — fall back to useEffect there to avoid SSR warnings. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type WordState = "active" | "leaving" | "idle";

const phraseStyle: CSSProperties = {
  position: "relative",
  display: "inline-block",
  /* Small optical nudge so the gap after "digital" matches the gap after "Every". */
  marginLeft: "0.04em",
  verticalAlign: "baseline",
  whiteSpace: "nowrap",
  overflow: "visible",
};

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
    /* Only the two words taking part in a roll need a composited layer. */
    willChange: state === "idle" ? "auto" : "transform, opacity",
  };
}

export default function HeroPhrase() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const indexRef = useRef(0);
  const widthsRef = useRef<number[]>([]);
  const measureRef = useRef<HTMLSpanElement>(null);
  const phraseRef = useRef<HTMLSpanElement>(null);

  /* Widths and the centring offset are written straight to the DOM before
     paint. Going through React state used to re-render after the first frame,
     which resized the phrase and slid the whole headline — the first-load jerk. */
  const applyLayout = useCallback((transitionEnabled: boolean) => {
    const phrase = phraseRef.current;
    const line = phrase?.closest(".hero-line") as HTMLElement | null;
    const nodes = measureRef.current?.children;
    if (!phrase || !line || !nodes?.length) return;

    const widths = Array.from(nodes, (node) =>
      (node as HTMLElement).getBoundingClientRect().width,
    );
    widthsRef.current = widths;

    const maxWidth = Math.max(...widths);
    /* Fixed box: changing words can never reflow "Every digital". */
    phrase.style.width = `${maxWidth}px`;

    /* First measurement (and a font swap) must land instantly. The class is
       re-added on the next frame, before any real word change happens. */
    if (!transitionEnabled) line.classList.remove("is-measured");

    const activeWidth = widths[indexRef.current] ?? maxWidth;
    const offset = Math.round(((maxWidth - activeWidth) / 2) * 100) / 100;
    line.style.setProperty("--hero-phrase-offset", `${Math.max(0, offset)}px`);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const phrase = phraseRef.current;
    const line = phrase?.closest(".hero-line") as HTMLElement | null;
    if (!phrase || !line) return;

    let frame = 0;
    let cancelled = false;

    const remeasure = (transitionEnabled: boolean) => {
      if (cancelled) return;
      applyLayout(transitionEnabled);
      if (!transitionEnabled) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (!cancelled) line.classList.add("is-measured");
        });
      }
    };

    remeasure(false);

    /* Web fonts can settle after hydration; re-measure before enabling the
       centring transition so the corrected widths never animate into place. */
    document.fonts?.ready.then(() => remeasure(false));

    const onResize = () => remeasure(true);
    window.addEventListener("resize", onResize, { passive: true });

    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => remeasure(true));
    if (measureRef.current) observer?.observe(measureRef.current);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
      line.classList.remove("is-measured");
      line.style.removeProperty("--hero-phrase-offset");
      phrase.style.removeProperty("width");
    };
  }, [applyLayout]);

  /* Each roll keeps "Every digital" optically centred. This runs in a layout
     effect too, so the composited translate starts on the very same frame. */
  useIsomorphicLayoutEffect(() => {
    const line = phraseRef.current?.closest(".hero-line") as HTMLElement | null;
    const widths = widthsRef.current;
    if (!line || !widths.length) return;

    const maxWidth = Math.max(...widths);
    const activeWidth = widths[phraseIndex] ?? maxWidth;
    const offset = Math.round(((maxWidth - activeWidth) / 2) * 100) / 100;
    line.style.setProperty("--hero-phrase-offset", `${Math.max(0, offset)}px`);
  }, [phraseIndex]);

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
    <span className="rotating-phrase" ref={phraseRef} style={phraseStyle}>
      {/* In-flow spacer keeps the baseline; measured widths keep the line centred. */}
      <span aria-hidden="true" style={{ visibility: "hidden", whiteSpace: "nowrap" }}>
        <PhraseText phrase={rotatingPhrases[phraseIndex]} />
      </span>

      <span
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          visibility: "hidden",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {rotatingPhrases.map((phrase) => (
          <span key={phrase}>
            <PhraseText phrase={phrase} />
          </span>
        ))}
      </span>

      <span className="phrase-sr-only">{rotatingPhrases[phraseIndex]}</span>

      {rotatingPhrases.map((phrase, index) => {
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
            aria-hidden="true"
          >
            <PhraseText phrase={phrase} />
          </span>
        );
      })}
    </span>
  );
}
