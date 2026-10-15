"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useRef } from "react";

const values = [
  {
    icon: "bi-bar-chart-line",
    title: "Real Business Impact",
    description: "We focus on solutions that create real impact and measurable outcomes.",
  },
  {
    icon: "bi-layers",
    title: "Integrated Capabilities",
    description: "Strategy, design, development, and integration within one team.",
  },
  {
    icon: "bi-diagram-3",
    title: "Adaptable to Your Growth",
    description: "Flexible systems designed to evolve with your business needs.",
  },
  {
    icon: "bi-people",
    title: "People You Can Rely On",
    description: "A collaborative team committed to supporting your long-term growth.",
  },
];

export default function WhyLyven() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="lyven-why" aria-labelledby="why-lyven-heading">
      <svg className="lyven-why__orbit" viewBox="0 0 1440 760" preserveAspectRatio="none" aria-hidden="true">
        <path d="M1004 -92C958 160 1205 215 1127 472C1081 626 932 705 810 815" />
        <circle cx="1129" cy="204" r="6" />
        <circle cx="1086" cy="602" r="5" />
      </svg>

      <div className="lyven-why__inner">
        <div className="lyven-why__intro">
          <p className="lyven-why__eyebrow">Why Lyven</p>
          <h2 id="why-lyven-heading" className="lyven-why__headline">
            <span>Built for</span>
            <span>today’s needs</span>
            <span>and <em>tomorrow’s</em></span>
            <span><em>growth.</em></span>
          </h2>
          <p className="lyven-why__copy">
            We partner with growing businesses to build purposeful, scalable digital solutions
            designed to create lasting value.
          </p>
          <Link href="/about" className="lyven-why__approach">
            <span aria-hidden="true">↗</span>
            Our Approach
          </Link>
        </div>

        <ol className="lyven-why__values">
          {values.map((value, index) => (
            <li
              className="lyven-why__value"
              key={value.title}
              style={{ "--why-delay": `${index * 75}ms` } as CSSProperties}
            >
              <span className="lyven-why__icon"><i className={`bi ${value.icon}`} aria-hidden="true" /></span>
              <div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
              <span className="lyven-why__number">{String(index + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
