import type { Metadata } from "next";
import AboutPage from "../../Components/About/AboutPage";
import FinalCTA from "../../Components/Cta/FinalCTA";
import { canonicalUrl } from "../../../lib/site-url";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the multidisciplinary team behind Lyven and the principles that guide our digital product work.",
  alternates: { canonical: canonicalUrl("/about") },
  openGraph: { url: canonicalUrl("/about"), title: "About Us | Lyven" },
};

export default function About() {
  return (
    <div className="main-page-area3">
      <AboutPage />
      <FinalCTA />
    </div>
  );
}
