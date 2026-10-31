import AboutIntro from "../Components/About/AboutIntro";
import BlogSection from "../Components/Blog/BlogSection";
import WhyLyven from "../Components/About/WhyLyven";
import TrustedPartners from "../Components/Client/TrustedPartners";
import FinalCTA from "../Components/Cta/FinalCTA";
import FaqSection from "../Components/Faq/FaqSection";
import LyvenHero from "../Components/HeroBanner/LyvenHero";
import SelectedWork from "../Components/Project/SelectedWork";
import ServicesEditorial from "../Components/Services/ServicesEditorial";
import { getPublishedArticles, getPublishedProjects } from "../../lib/public-cms-content";
import { toBlogPost, toPortfolioCard } from "../../lib/public-presenters";
import { MAX_FEATURED_ARTICLES } from "../../lib/local-cms";
import type { Metadata } from "next";
import { canonicalUrl, getSiteUrl } from "../../lib/site-url";

export const metadata: Metadata = { alternates: { canonical: canonicalUrl("/") } };
export const revalidate = 60;

export default async function HomePage() {
  const [articles, projects] = await Promise.all([getPublishedArticles(), getPublishedProjects()]);
  const site = getSiteUrl();
  const organization = site ? {
    "@context": "https://schema.org", "@type": "Organization", name: "Lyven",
    url: site.toString(),
    description: "Digital product strategy, branding, UI/UX design, and development for growing businesses.",
  } : null;
  return (
    <main>
      {organization && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} />}
      <LyvenHero />
      <AboutIntro />
      <TrustedPartners />
      <SelectedWork projects={projects.map((project, index) => toPortfolioCard(project, index, true))} />
      <ServicesEditorial />
      <WhyLyven />
      <FaqSection />
      <BlogSection featuredPosts={articles.filter((article) => article.featured).slice(0, MAX_FEATURED_ARTICLES).map(toBlogPost)} />
      <FinalCTA />
    </main>
  );
}
