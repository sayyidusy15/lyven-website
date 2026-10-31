import type { Metadata } from "next";
import FinalCTA from "../../Components/Cta/FinalCTA";
import ProcessSection from "../../Components/Services/ProcessSection";
import ServicesPage from "../../Components/Services/ServicesPage";
import { canonicalUrl } from "../../../lib/site-url";

export const metadata: Metadata = {
  title: "What We Do",
  description: "Branding, UI/UX design, and development services for businesses building modern digital experiences.",
  alternates: { canonical: canonicalUrl("/service") },
  openGraph: { url: canonicalUrl("/service"), title: "What We Do | Lyven" },
};

export default function ServicePage() {
  return (
    <div className="main-page-area3">
      <ServicesPage />
      <ProcessSection />
      <FinalCTA />
    </div>
  );
}
