import AboutIntro from "../Components/About/AboutIntro";
import BlogSection from "../Components/Blog/BlogSection";
import WhyLyven from "../Components/About/WhyLyven";
import TrustedPartners from "../Components/Client/TrustedPartners";
import FinalCTA from "../Components/Cta/FinalCTA";
import FaqSection from "../Components/Faq/FaqSection";
import LyvenHero from "../Components/HeroBanner/LyvenHero";
import SelectedWork from "../Components/Project/SelectedWork";
import ServicesEditorial from "../Components/Services/ServicesEditorial";

export default function HomePage() {
  return (
    <main>
      <LyvenHero />
      <AboutIntro />
      <TrustedPartners />
      <SelectedWork />
      <ServicesEditorial />
      <WhyLyven />
      <FaqSection />
      <BlogSection />
      <FinalCTA />
    </main>
  );
}
