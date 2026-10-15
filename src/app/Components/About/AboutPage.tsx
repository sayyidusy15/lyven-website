"use client";

import Image from "next/image";
import { CSSProperties } from "react";
import { useScrollFillProgress } from "./useScrollFillProgress";

const values = [
  {
    icon: "bi-people",
    title: "Collaborative",
    copy: "We work closely with our clients as partners.",
  },
  {
    icon: "bi-bullseye",
    title: "Focused",
    copy: "We focus on what brings real value.",
  },
  {
    icon: "bi-shield-check",
    title: "Quality-Driven",
    copy: "We care about the details in every step.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Long-Term",
    copy: "We build relationships beyond a single project.",
  },
];

const quoteLines = [
  ["We", "believe", "good", "digital", "products"],
  ["are", "built", "through", "collaboration,"],
  ["curiosity,", "and", "a", "genuine", "care", "for"],
  ["the", "people", "who", "use", "them."],
];

function AboutOrbit({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`lyven-about-page__orbit ${className}`}
      viewBox="0 0 1440 640"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M -110 555 C 270 245 775 125 1525 248" />
      <circle cx="1275" cy="214" r="7" />
    </svg>
  );
}

export default function AboutPage() {
  const { sectionRef, progress } = useScrollFillProgress({
    minimum: 0.08,
    startViewport: 0.86,
    endViewport: 0.22,
  });
  const totalWords = quoteLines.flat().length;
  let wordIndex = 0;

  return (
    <main className="lyven-about-page">
      <section className="lyven-about-page__hero" aria-labelledby="about-page-heading">
        <div className="lyven-about-page__hero-backdrop" aria-hidden="true" />
        <div className="lyven-about-page__hero-inner">
          <div className="lyven-about-page__hero-copy">
            <p className="lyven-about-page__eyebrow">About Us</p>
            <h1 id="about-page-heading">
              <span>People behind</span>
              <span>the <em>process.</em></span>
            </h1>
            <p className="lyven-about-page__lead">
              We’re a team of designers, developers, and problem solvers who care about building meaningful digital experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="lyven-about-page__values" aria-labelledby="about-values-heading">
        <div className="lyven-about-page__values-inner">
          <h2 id="about-values-heading" className="visually-hidden">How we work together</h2>
          {values.map((value) => (
            <article className="lyven-about-page__value" key={value.title}>
              <span className="lyven-about-page__value-icon" aria-hidden="true">
                <i className={`bi ${value.icon}`} />
              </span>
              <div>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        ref={sectionRef}
        className="lyven-about-page__belief"
        aria-labelledby="about-belief-heading"
      >
        <AboutOrbit className="is-belief" />
        <div className="lyven-about-page__belief-inner">
          <span className="lyven-about-page__quote-mark" aria-hidden="true">“</span>
          <blockquote>
            <p id="about-belief-heading">
              {quoteLines.map((line, lineIndex) => (
                <span className="lyven-about-page__quote-line" key={line.join(" ")}>
                  {line.map((word) => {
                    const index = wordIndex++;
                    const start = index / totalWords;
                    const fill = Math.min(1, Math.max(0, (progress - start * 0.8) / 0.2));
                    return (
                      <span
                        className={`lyven-about-page__quote-word${lineIndex === quoteLines.length - 1 ? " is-highlight" : ""}`}
                        style={{ "--quote-fill": fill } as CSSProperties}
                        key={`${word}-${index}`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </span>
              ))}
            </p>
            <cite>— Lyven Team</cite>
          </blockquote>
        </div>
      </section>

      <section className="lyven-about-page__studio" aria-labelledby="about-team-heading">
        <div className="lyven-about-page__studio-inner">
          <div className="lyven-about-page__studio-visual">
            <Image
              src="/assets/img/what-we-do-header.png"
              alt="Lyven product interfaces shown across web and mobile screens"
              fill
              sizes="(max-width: 991px) 100vw, 58vw"
            />
          </div>

          <div className="lyven-about-page__studio-copy">
            <p className="lyven-about-page__eyebrow">Our Team</p>
            <h2 id="about-team-heading">
              A small team
              <span>with a <em>big passion.</em></span>
            </h2>
            <p>
              We’re a multidisciplinary team with a shared interest in design, technology, and meaningful problem solving. Different backgrounds, one common goal — to help businesses grow through digital products.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
