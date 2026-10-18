"use client";

import { useEffect, useRef, useState } from "react";

const processSteps = [
  {
    number: "01",
    icon: "bi-compass",
    title: "Strategy",
    description: "Understand the need, align the direction, and plan for impact.",
    activities: ["Discovery", "Analysis", "Goals"],
  },
  {
    number: "02",
    icon: "bi-pencil",
    title: "Design",
    description: "Turn ideas into intuitive and relevant experiences.",
    activities: ["Moodboard", "Wireframe", "User Testing", "Visual/UI Design", "Prototyping", "Design System"],
  },
  {
    number: "03",
    icon: "bi-code-slash",
    title: "Development",
    description: "Build scalable, fast, high-performance solutions.",
    activities: ["Architecture", "Database", "Front-end", "Back-end", "Launch"],
  },
  {
    number: "04",
    icon: "bi-layers",
    title: "Support",
    description: "Keep the product secure, stable, and continuously evolving.",
    activities: ["QA Testing", "Maintenance"],
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const fallbackTimer = window.setTimeout(() => setIsVisible(true), 0);
      return () => window.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="lyven-process"
      data-visible={isVisible}
      aria-labelledby="lyven-process-heading"
    >
      <svg className="lyven-process__orbit" viewBox="0 0 760 250" fill="none" aria-hidden="true">
        <path d="M758 18C610 8 523 38 411 96C297 155 187 206 1 223" />
        <circle cx="411" cy="96" r="5" />
      </svg>

      <div className="lyven-process__inner">
        <header className="lyven-process__header">
          <p className="lyven-process__eyebrow">How We Work</p>
          <h2 id="lyven-process-heading">Our Process</h2>
          <p>
            From strategy through long-term support, we use a structured, collaborative process
            to turn ideas into digital products designed to grow.
          </p>
        </header>

        <div className="lyven-process__rows">
          {processSteps.map((step, index) => (
            <article
              className="lyven-process-row"
              key={step.number}
              style={{ "--process-delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <div className="lyven-process-row__icon">
                <i className={`bi ${step.icon}`} aria-hidden="true" />
              </div>

              <div className="lyven-process-row__content">
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              <ul className="lyven-process-row__activities" aria-label={`${step.title} activities`}>
                {step.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
