import type { Metadata } from "next";
import PortfolioList from "../../Components/PortfolioList/PortfolioList";
import FinalCTA from "../../Components/Cta/FinalCTA";
import { lyvenProjects } from "../../../lib/projects";

export const metadata: Metadata = {
  title: "Our Work | Lyven",
  description: "Explore selected websites, applications, integrations, and digital products built by Lyven.",
};

export default function PortfolioPage() {
  return (
    <div className="main-page-area3">
      <PortfolioList data={lyvenProjects} />
      <FinalCTA />
    </div>
  );
}
