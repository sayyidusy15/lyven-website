import type { Metadata } from "next";
import BlogEditorial from "../../Components/Blog/BlogEditorial";
import FinalCTA from "../../Components/Cta/FinalCTA";
import { getPublishedArticles } from "../../../lib/public-cms-content";
import { toBlogPost } from "../../../lib/public-presenters";
import { canonicalUrl } from "../../../lib/site-url";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ideas, stories, and practical insights about design, development, business, and building meaningful digital products.",
  alternates: { canonical: canonicalUrl("/blog") },
  openGraph: { url: canonicalUrl("/blog"), title: "Blog | Lyven" },
};
export const revalidate = 60;

export default async function BlogPage() {
  const articles = await getPublishedArticles();
  return (
    <div className="main-page-area3">
      <BlogEditorial initialPosts={articles.map(toBlogPost)} />
      <FinalCTA />
    </div>
  );
}
