"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadProjects } from "../../../lib/supabase-cms";
import type { CmsProject } from "../../../lib/local-cms";
import type { ProjectDetail } from "../../../lib/project-details";
import FinalCTA from "../Cta/FinalCTA";
import ProjectCaseStudy from "./ProjectCaseStudy";

export default function LocalProjectDetail({ slug }: { slug: string }) {
  const [loaded, setLoaded] = useState(false);
  const [record, setRecord] = useState<CmsProject | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadProjects().then((saved) => {
      if (!mounted) return;
      setRecord(saved.find((project) => project.slug === slug) ?? null);
      setLoaded(true);
    }).catch(() => { if (mounted) { setLoadError(true); setLoaded(true); } });
    return () => { mounted = false; };
  }, [slug]);

  if (!loaded) return <main className="lyven-case-study"><div className="lyven-case-study__inner" style={{ padding: "180px 0 100px" }}>Loading project...</div></main>;
  if (loadError) return <MissingProject message="This project is temporarily unavailable. Please try again later." />;
  if (!record || record.status !== "Published") return <MissingProject />;

  const project: ProjectDetail | null = record ? {
    slug: record.slug,
    title: record.title,
    titleLead: record.title.split(" ").slice(0, -1).join(" ") || record.title,
    titleAccent: record.title.includes(" ") ? record.title.split(" ").at(-1)! : "",
    industry: record.industry || "Not specified",
    service: record.category,
    duration: record.duration || "Not specified",
    year: record.year || "Not specified",
    website: record.website || undefined,
    description: record.description || record.summary,
    heroImage: record.heroImage || undefined,
    aboutImage: record.aboutImage || undefined,
    screenshots: record.gallery.map((image, index) => ({ title: `Screenshot ${String(index + 1).padStart(2, "0")}`, image })),
  } : null;

  if (!project) return <MissingProject />;
  return <div className="main-page-area3"><ProjectCaseStudy project={project} /><FinalCTA /></div>;
}

function MissingProject({ message = "This project has not been published." }: { message?: string }) {
  return <main className="lyven-case-study"><div className="lyven-case-study__inner" style={{ padding: "180px 0 110px" }}><p>Project unavailable</p><h1>{message}</h1><Link href="/portfolio-list">← Back to portfolio</Link></div></main>;
}
