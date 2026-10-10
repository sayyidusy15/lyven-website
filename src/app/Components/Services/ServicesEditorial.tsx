"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useRef } from "react";

const services = [
  {
    icon: "bi-box",
    title: <>Web & Mobile<br />Development</>,
    description: "Website dan aplikasi mobile modern yang dirancang sesuai kebutuhan bisnis Anda.",
  },
  {
    icon: "bi-database",
    title: <>System<br />Integration</>,
    description: "Menghubungkan platform, tools, API, dan data menjadi satu ekosistem yang terintegrasi.",
  },
  {
    icon: "bi-stars",
    title: <>AI & Automation</>,
    description: "Solusi AI dan automation untuk menyederhanakan proses dan meningkatkan produktivitas.",
  },
  {
    icon: "bi-bar-chart-line",
    title: <>Digital<br />Consultation</>,
    description: "Pendampingan strategis dari validasi ide hingga implementasi solusi digital.",
  },
];

export default function ServicesEditorial() {
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
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="lyven-services" aria-labelledby="services-heading">
      <div className="lyven-services__inner">
        <div className="lyven-services__header">
          <div className="lyven-services__headline-wrap">
            <p className="lyven-services__eyebrow">What We Do</p>
            <h2 id="services-heading" className="lyven-services__headline">
              <span>Build.</span>
              <span>Integrate.</span>
              <span>Scale.</span>
            </h2>
          </div>

          <div className="lyven-services__intro">
            <p>
              Layanan digital end-to-end untuk membantu bisnis bergerak lebih cepat, bekerja lebih
              cerdas, dan menciptakan dampak nyata.
            </p>
            <Link href="/service" className="lyven-services__all" aria-label="View all services">
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="lyven-services__grid">
          {services.map((service, index) => (
            <article className="lyven-services__item" key={String(index)} style={{ "--service-delay": `${index * 65}ms` } as CSSProperties}>
              <span className="lyven-services__number">{String(index + 1).padStart(2, "0")}</span>
              <i className={`bi ${service.icon} lyven-services__icon`} aria-hidden="true" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="lyven-services__arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
