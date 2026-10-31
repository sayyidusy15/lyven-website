"use client";

import type { CmsProject } from "../../../lib/local-cms";
import type { ProjectDetail } from "../../../lib/project-details";
import FinalCTA from "../Cta/FinalCTA";
import ProjectCaseStudy from "./ProjectCaseStudy";

export default function LocalProjectDetail({ record }: { record: CmsProject }) {
  const project: ProjectDetail = {
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
  };
  return <div className="main-page-area3"><ProjectCaseStudy project={project} /><FinalCTA /></div>;
}
