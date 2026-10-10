"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

const lines = [
  ["Kami", "membantu", "bisnis"],
  ["mengubah", "ide", "menjadi"],
  ["produk", "digital", "yang", "nyata,"],
  ["berdampak,", "dan", "bertumbuh"],
  ["bersama."],
];

const metrics = [
  { value: "120+", label: "Klien dipercaya" },
  { value: "240+", label: "Proyek selesai" },
  { value: "8 tahun", label: "Pengalaman tim" },
  { value: "98%", label: "Klien repeat order" },
];

function AboutOrbits() {
  return (
    <svg className="lyven-about__orbits" viewBox="0 0 1440 860" preserveAspectRatio="none" aria-hidden="true">
      <path d="M 890 -105 C 930 85 1100 205 1510 225" />
      <path d="M -180 690 C 120 760 265 960 560 1000" />
      <path className="is-faint" d="M -120 820 C 165 735 405 810 650 955" />
      <circle cx="1094" cy="152" r="8" />
      <circle cx="552" cy="803" r="8" />
    </svg>
  );
}

export default function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0.12);
  const words = lines.flat();

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

      const top = section.getBoundingClientRect().top;
      const start = window.innerHeight * 0.8;
      const end = window.innerHeight * 0.28;
      setProgress(Math.min(1, Math.max(0.12, (start - top) / (start - end))));
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
  }, []);

  let wordIndex = 0;

  return (
    <section ref={sectionRef} className="lyven-about" aria-labelledby="about-heading">
      <AboutOrbits />
      <div className="lyven-about__inner">
        <div className="lyven-about__label">
          <span>About Us</span>
          <i aria-hidden="true" />
        </div>

        <h2 id="about-heading" className="lyven-about__statement">
          {lines.map((line) => (
            <span className="lyven-about__line" key={line.join(" ")}>
              {line.map((word) => {
                const index = wordIndex++;
                const start = index / words.length;
                const fill = Math.min(1, Math.max(0, (progress - start * 0.78) / 0.2));
                return (
                  <span
                    className="lyven-about__word"
                    style={{ "--word-fill": fill } as CSSProperties}
                    key={`${word}-${index}`}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>

        <dl className="lyven-about__metrics">
          {metrics.map((metric) => (
            <div className="lyven-about__metric" key={metric.value}>
              <dt>{metric.value}</dt>
              <dd>{metric.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
