"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { ProjectDetail, ProjectScreenshot } from "../../../lib/project-details";

interface ProjectCaseStudyProps {
  project: ProjectDetail;
}

function VisualPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`lyven-case-placeholder ${className}`} role="img" aria-label={`${label} placeholder`}>
      <span>{label}</span>
      <small>Project visual coming soon</small>
    </div>
  );
}

function ScreenshotVisual({ screenshot, projectTitle }: { screenshot: ProjectScreenshot; projectTitle: string }) {
  if (!screenshot.image) return <VisualPlaceholder label={screenshot.title} />;

  return (
    <Image
      src={screenshot.image}
      alt={`${projectTitle} ${screenshot.title} screenshot`}
      fill
      sizes="(max-width: 600px) 86vw, (max-width: 991px) 58vw, 38vw"
    />
  );
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [canGoPrevious, setCanGoPrevious] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanGoPrevious(track.scrollLeft > 8);
    setCanGoNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateControls);
    window.addEventListener("resize", updateControls);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateControls);
    };
  }, [updateControls]);

  const moveCarousel = (direction: "previous" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const distance = Math.max(track.clientWidth * 0.72, 280);
    track.scrollBy({ left: direction === "previous" ? -distance : distance, behavior: "smooth" });
  };

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    dragStartX.current = event.clientX;
    dragStartScroll.current = track.scrollLeft;
    setIsDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const drag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    trackRef.current.scrollLeft = dragStartScroll.current - (event.clientX - dragStartX.current);
  };

  const stopDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    const track = trackRef.current;
    if (track?.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
    updateControls();
  };

  return (
    <main className="lyven-case-study">
      <section className="lyven-case-hero" aria-labelledby="case-study-heading">
        <div className="lyven-case-hero__background" aria-hidden="true" />
        <div className="lyven-case-study__inner lyven-case-hero__layout">
          <div className="lyven-case-hero__content">
            <Link href="/portfolio-list" className="lyven-case-hero__back">
              <span aria-hidden="true">←</span> Back to Projects
            </Link>
            <h1 id="case-study-heading">
              <span>{project.titleLead}</span>
              <span>{project.titleAccent}</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="lyven-case-info" aria-label="Project information">
        <div className="lyven-case-study__inner">
          <div className="lyven-case-info__bar">
            <div className="lyven-case-info__item">
              <i className="bi bi-buildings" aria-hidden="true" />
              <div>
                <span>Industry</span>
                <strong>{project.industry}</strong>
              </div>
            </div>
            <div className="lyven-case-info__item">
              <i className="bi bi-window" aria-hidden="true" />
              <div>
                <span>Service</span>
                <strong>{project.service}</strong>
              </div>
            </div>
            <div className="lyven-case-info__item">
              <i className="bi bi-clock" aria-hidden="true" />
              <div>
                <span>Duration</span>
                <strong>{project.duration}</strong>
              </div>
            </div>
            <div className="lyven-case-info__item">
              <i className="bi bi-calendar3" aria-hidden="true" />
              <div>
                <span>Year</span>
                <strong>{project.year}</strong>
              </div>
            </div>
            <div className="lyven-case-info__item">
              <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
              <div>
                <span>Website</span>
                {project.website ? (
                  <a href={project.website} target="_blank" rel="noopener noreferrer">
                    View Website <b aria-hidden="true">↗</b>
                  </a>
                ) : (
                  <strong className="is-unavailable">Website unavailable</strong>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lyven-case-about" aria-labelledby="case-about-heading">
        <div className="lyven-case-study__inner lyven-case-about__layout">
          <div className="lyven-case-about__content">
            <p>Project Overview</p>
            <h2 id="case-about-heading">About the Project</h2>
            <span>{project.description}</span>
          </div>
          <div className="lyven-case-about__visual">
            {project.aboutImage ? (
              <Image
                src={project.aboutImage}
                alt={`${project.title} supporting visual`}
                fill
                sizes="(max-width: 767px) calc(100vw - 40px), 38vw"
              />
            ) : (
              <VisualPlaceholder label="Supporting project visual" />
            )}
          </div>
        </div>
      </section>

      <section className="lyven-case-screenshots" aria-labelledby="case-screenshots-heading">
        <div className="lyven-case-study__inner lyven-case-screenshots__header">
          <div>
            <p>Project Screenshots</p>
            <h2 id="case-screenshots-heading">Website Screenshots</h2>
          </div>
          <div className="lyven-case-screenshots__controls" aria-label="Screenshot navigation">
            <button
              type="button"
              aria-label="Previous screenshot"
              disabled={!canGoPrevious}
              onClick={() => moveCarousel("previous")}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next screenshot"
              disabled={!canGoNext}
              onClick={() => moveCarousel("next")}
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className={`lyven-case-screenshots__track${isDragging ? " is-dragging" : ""}`}
          role="region"
          aria-label={`${project.title} screenshot carousel`}
          tabIndex={0}
          onScroll={updateControls}
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") moveCarousel("previous");
            if (event.key === "ArrowRight") moveCarousel("next");
          }}
        >
          {project.screenshots.map((screenshot) => (
            <article className="lyven-case-screenshot" key={screenshot.title}>
              <div className="lyven-case-screenshot__media">
                <ScreenshotVisual screenshot={screenshot} projectTitle={project.title} />
              </div>
              <h3>{screenshot.title}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
