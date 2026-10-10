"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  index: string;
  title: string;
  categoryPill: string;
  bgColor: string;
  hoverBgColor: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    index: "01",
    title: "Qwibly",
    categoryPill: "Internal Tools • Automation",
    bgColor: "#EEF3F8", // Silver-cool soft tint
    hoverBgColor: "#E6EDF5",
    image: "/assets/img/ChatGPT Image Oct 8, 2026, 06_29_26 PM-1.png",
    link: "/portfolio-list",
  },
  {
    index: "02",
    title: "MySchoolMate",
    categoryPill: "Web App • Education",
    bgColor: "#F5F6F8", // Abu-abu keputihan terang
    hoverBgColor: "#ECEEF2",
    image: "/assets/img/ChatGPT Image Oct 8, 2026, 06_29_27 PM-2.png",
    link: "/portfolio-list",
  },
  {
    index: "03",
    title: "Muslim 101",
    categoryPill: "Mobile App • Community",
    bgColor: "#E9EEF4", // Abu-abu agak lebih gelap dikit banget
    hoverBgColor: "#DFE5EE",
    image: "/assets/img/ChatGPT Image Oct 8, 2026, 06_29_29 PM-3.png",
    link: "/portfolio-list",
  },
  {
    index: "04",
    title: "POS Haji Wong Halal",
    categoryPill: "Mobile App • POS",
    bgColor: "#F3F5FA", // Abu-abu soft selaras
    hoverBgColor: "#E9EDF5",
    image: "/assets/img/ChatGPT Image Oct 8, 2026, 06_29_30 PM-4.png",
    link: "/portfolio-list",
  },
  {
    index: "05",
    title: "Photobox",
    categoryPill: "Mobile App • IoT",
    bgColor: "#ECEEF4", // Soft light slate-gray
    hoverBgColor: "#E2E5EE",
    image: "/assets/img/ChatGPT Image Oct 8, 2026, 06_29_31 PM-5.png",
    link: "/portfolio-list",
  },
];

export default function SelectedWork() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const cardWidth = 340;
    const offset = direction === "left" ? -cardWidth : cardWidth;
    sliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="lyven-work" aria-labelledby="selected-work-heading">
      <div className="lyven-work__inner">
        {/* Header Section */}
        <div className="lyven-work__header">
          <div className="lyven-work__title-group">
            <p className="lyven-work__eyebrow">Our Work</p>
            <h2 id="selected-work-heading" className="lyven-work__heading">
              Turning ideas<br />
              into <span>digital experiences.</span>
            </h2>
          </div>

          <div className="lyven-work__intro">
            <p>
              A selection of projects we&apos;ve built with great clients — from websites
              and mobile apps to complex systems and integrations.
            </p>

            <div className="lyven-work__controls">
              <Link href="/portfolio-list" className="lyven-work__view-all">
                <span aria-hidden="true">↗</span>
                View all projects
              </Link>

              {/* Slider Arrow Controls */}
              <div className="lyven-work__arrows" aria-label="Project slider navigation">
                <button
                  type="button"
                  className={`lyven-work__nav-btn ${!canScrollLeft ? "is-disabled" : ""}`}
                  onClick={() => handleScroll("left")}
                  aria-label="Scroll left"
                  disabled={!canScrollLeft}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`lyven-work__nav-btn ${!canScrollRight ? "is-disabled" : ""}`}
                  onClick={() => handleScroll("right")}
                  aria-label="Scroll right"
                  disabled={!canScrollRight}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Slider with 5 Project Cards */}
        <div className="lyven-work__slider-wrapper">
          <div className="lyven-work__slider" ref={sliderRef}>
            {projects.map((project, idx) => (
              <article
                className="lyven-work__card"
                key={project.index}
                style={{ backgroundColor: project.bgColor }}
              >
                <Link href={project.link} aria-label={`View ${project.title} project`}>
                  {/* Card Header Meta */}
                  <div className="lyven-work__meta">
                    <div className="lyven-work__meta-top">
                      <span className="lyven-work__index">{project.index}</span>
                      <span className="lyven-work__arrow" aria-hidden="true">↗</span>
                    </div>
                    <h3 className="lyven-work__card-title">{project.title}</h3>
                    <div className="lyven-work__pill-wrapper">
                      <span className="lyven-work__pill">{project.categoryPill}</span>
                    </div>
                  </div>

                  {/* Card Image Showcase */}
                  <div className="lyven-work__media">
                    <Image
                      src={project.image}
                      alt={`${project.title} showcase mockup`}
                      width={640}
                      height={800}
                      className="lyven-work__image"
                      priority={idx < 2}
                      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 340px"
                    />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
