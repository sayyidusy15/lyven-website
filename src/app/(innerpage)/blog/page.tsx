import type { Metadata } from "next";
import BlogEditorial from "../../Components/Blog/BlogEditorial";
import FinalCTA from "../../Components/Cta/FinalCTA";

export const metadata: Metadata = {
  title: "Blog | Lyven",
  description: "Ideas, stories, and practical insights about design, development, business, and building meaningful digital products.",
};

export default function BlogPage() {
  return (
    <div className="main-page-area3">
      <BlogEditorial />
      <FinalCTA />
    </div>
  );
}
