import type { Metadata } from "next";
import AboutPage from "../../Components/About/AboutPage";
import FinalCTA from "../../Components/Cta/FinalCTA";

export const metadata: Metadata = {
  title: "About | Lyven",
  description: "Meet the multidisciplinary team behind Lyven and the principles that guide our digital product work.",
};

export default function About() {
  return (
    <div className="main-page-area3">
      <AboutPage />
      <FinalCTA />
    </div>
  );
}
