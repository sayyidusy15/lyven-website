import type { Metadata } from "next";
import PortfolioList from "../../Components/PortfolioList/PortfolioList";
import FinalCTA from "../../Components/Cta/FinalCTA";

export const metadata: Metadata = {
  title: "Our Work | Lyven",
  description: "Explore selected websites, applications, integrations, and digital products built by Lyven.",
};

export default function PortfolioPage() {
  return (
    <div className="main-page-area3">
      <PortfolioList />
      <FinalCTA />
    </div>
  );
}
