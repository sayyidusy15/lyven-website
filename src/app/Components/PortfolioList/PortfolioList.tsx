"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import type { LyvenProject, ProjectCategory } from "../../../lib/projects";

type Filter = "All Projects" | ProjectCategory;

const filters: Filter[] = [
  "All Projects",
  "Branding",
  "UI/UX Design",
  "Development",
];

const PROJECTS_PER_PAGE = 3;

interface PortfolioListProps {
  data: LyvenProject[];
}

export default function PortfolioList({ data }: PortfolioListProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All Projects");
  const [currentPage, setCurrentPage] = useState(1);

  const visibleProjects = useMemo(
    () => activeFilter === "All Projects" ? data : data.filter((project) => project.category === activeFilter),
    [activeFilter, data],
  );
  const pageCount = Math.max(1, Math.ceil(visibleProjects.length / PROJECTS_PER_PAGE));
  const pageStart = (currentPage - 1) * PROJECTS_PER_PAGE;
  const pagedProjects = visibleProjects.slice(pageStart, pageStart + PROJECTS_PER_PAGE);

  const selectFilter = (filter: Filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <main className="lyven-portfolio-page">
      <section className="lyven-portfolio-hero" aria-labelledby="portfolio-page-heading">
        <div className="lyven-portfolio-hero__backdrop" aria-hidden="true" />
        <div className="lyven-portfolio-page__inner lyven-portfolio-hero__content">
          <p className="lyven-portfolio-hero__eyebrow">Our Work</p>
          <h1 id="portfolio-page-heading" className="lyven-portfolio-hero__heading">
            <span>Real Projects.</span>
            <span>Real Impact.</span>
          </h1>
          <p className="lyven-portfolio-hero__description">
            We partner with businesses, startups, and organizations to turn ideas into
            meaningful digital products.
          </p>
        </div>
      </section>

      <section className="lyven-portfolio-projects" aria-labelledby="portfolio-projects-heading">
        <div className="lyven-portfolio-page__inner">
          <h2 id="portfolio-projects-heading" className="visually-hidden">Lyven projects</h2>

          <div className="lyven-portfolio-filters" role="group" aria-label="Filter projects by category">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "is-active" : undefined}
                aria-pressed={activeFilter === filter}
                onClick={() => selectFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {visibleProjects.length > 0 ? (
            <div className="lyven-portfolio-grid" key={`${activeFilter}-${currentPage}`} aria-live="polite">
              {pagedProjects.map((project, index) => (
                <article
                  className="lyven-portfolio-card"
                  key={project.slug}
                  style={{ "--portfolio-delay": `${index * 55}ms` } as CSSProperties}
                >
                  <div className="lyven-portfolio-card__media">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} project showcase`}
                        fill
                        priority={index < 3 && activeFilter === "All Projects" && currentPage === 1}
                        sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1050px) 44vw, 31vw"
                      />
                    ) : (
                      <div className="lyven-portfolio-card__placeholder" aria-label={`${project.title} visual placeholder`}>
                        <span>{project.title}</span>
                        <small>Project visual coming soon</small>
                      </div>
                    )}
                    {project.detailHref && (
                      <Link
                        href={project.detailHref}
                        className="lyven-portfolio-card__arrow"
                        aria-label={`View ${project.title} case study`}
                      >
                        ↗
                      </Link>
                    )}
                  </div>
                  <div className="lyven-portfolio-card__content">
                    <p>{project.category}</p>
                    <h3>
                      {project.detailHref ? <Link href={project.detailHref}>{project.title}</Link> : project.title}
                    </h3>
                    <span>{project.description}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="lyven-portfolio-empty" role="status">
              No projects are available in this category yet.
            </p>
          )}

          {visibleProjects.length > PROJECTS_PER_PAGE && (
            <nav className="lyven-portfolio-pager" aria-label="Portfolio pages">
              <button
                type="button"
                className="lyven-portfolio-pager__arrow"
                aria-label="Previous portfolio page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                ←
              </button>

              <div className="lyven-portfolio-pager__pages">
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={page === currentPage ? "is-active" : undefined}
                    aria-label={`View portfolio page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                  >
                    {String(page).padStart(2, "0")}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="lyven-portfolio-pager__arrow"
                aria-label="Next portfolio page"
                disabled={currentPage === pageCount}
                onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
              >
                →
              </button>
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
