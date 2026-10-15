import type { Metadata } from "next";
import FinalCTA from "../../Components/Cta/FinalCTA";
import ProcessSection from "../../Components/Services/ProcessSection";
import ServicesPage from "../../Components/Services/ServicesPage";

export const metadata: Metadata = {
  title: "Services | Lyven",
  description: "Branding, UI/UX design, and development services for businesses building modern digital experiences.",
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
