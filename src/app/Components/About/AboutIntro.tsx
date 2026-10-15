"use client";

import { CSSProperties } from "react";
import { useScrollFillProgress } from "./useScrollFillProgress";

const lines = [
  ["We", "help", "businesses", "turn", "ideas"],
  ["into", "clear", "identities,", "useful"],
  ["digital", "experiences,", "and", "products"],
  ["that", "are", "relevant,", "easy", "to", "use,"],
  ["and", "ready", "to", "grow."],
];

const metrics = [
  { value: "120+", label: "Trusted clients" },
  { value: "240+", label: "Projects completed" },
  { value: "8 years", label: "Team experience" },
  { value: "98%", label: "Repeat clients" },
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
  const { sectionRef, progress } = useScrollFillProgress({ minimum: 0, mode: "sticky" });
  const words = lines.flat();
  const metricsReveal = Math.min(1, Math.max(0, (progress - 0.65) / 0.2));
  const metricsOpacity = 0.45 + metricsReveal * 0.55;
  const metricsOffset = `${(1 - metricsReveal) * 10}px`;

  let wordIndex = 0;

  return (
    <section ref={sectionRef} className="lyven-about" aria-labelledby="about-heading">
      <div className="lyven-about__sticky">
        <AboutOrbits />
        <div className="lyven-about__inner">
          <p className="lyven-about__label">About Us</p>

          <h2 id="about-heading" className="lyven-about__statement">
            {lines.map((line, lineIndex) => (
              <span className="lyven-about__line" key={line.join(" ")}>
                {line.map((word, lineWordIndex) => {
                  const index = wordIndex++;
                  const start = index / words.length;
                  const fill = Math.min(1, Math.max(0, (progress - start * 0.78) / 0.2));
                  const isHighlight = lineIndex === 1 && (lineWordIndex === 1 || lineWordIndex === 2);
                  return (
                    <span
                      className={`lyven-about__word${isHighlight ? " is-highlight" : ""}`}
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

          <dl
            className="lyven-about__metrics"
            style={{
              "--metrics-opacity": metricsOpacity,
              "--metrics-offset": metricsOffset,
            } as CSSProperties}
          >
            {metrics.map((metric) => (
              <div className="lyven-about__metric" key={metric.value}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
