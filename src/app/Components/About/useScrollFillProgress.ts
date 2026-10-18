"use client";

import { useEffect, useRef, useState } from "react";

type ScrollFillOptions = {
  minimum?: number;
  startViewport?: number;
  endViewport?: number;
  mode?: "entry" | "sticky";
};

export function useScrollFillProgress({
  minimum = 0.12,
  startViewport = 0.8,
  endViewport = 0.28,
  mode = "entry",
}: ScrollFillOptions = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(minimum);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (mode === "sticky") {
        const scrollRange = Math.max(1, section.offsetHeight - window.innerHeight);
        setProgress(Math.min(1, Math.max(minimum, -rect.top / scrollRange)));
        return;
      }

      const start = window.innerHeight * startViewport;
      const end = window.innerHeight * endViewport;
      setProgress(Math.min(1, Math.max(minimum, (start - rect.top) / (start - end))));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [endViewport, minimum, mode, startViewport]);

  return { sectionRef, progress };
}
