import type { Metadata } from "next";
import PortfolioList from "../../Components/PortfolioList/PortfolioList";
import FinalCTA from "../../Components/Cta/FinalCTA";
import { getPublishedProjects } from "../../../lib/public-cms-content";
import { toPortfolioCard } from "../../../lib/public-presenters";
import { canonicalUrl } from "../../../lib/site-url";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore selected websites, applications, integrations, and digital products built by Lyven.",
  alternates: { canonical: canonicalUrl("/portfolio-list") },
  openGraph: { url: canonicalUrl("/portfolio-list"), title: "Portfolio | Lyven" },
};
export const revalidate = 60;

export default async function PortfolioPage() {
  const projects = await getPublishedProjects();
  return (
    <div className="main-page-area3">
      <PortfolioList projects={projects.map((project, index) => toPortfolioCard(project, index))} />
      <FinalCTA />
    </div>
  );
}
