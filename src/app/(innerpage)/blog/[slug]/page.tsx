import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticleDetail from "../../../Components/Blog/BlogArticleDetail";
import { getPublishedArticle, getPublishedArticles } from "../../../../lib/public-cms-content";
import { toBlogPost } from "../../../../lib/public-presenters";
import { canonicalUrl } from "../../../../lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) return { title: "Article unavailable", robots: { index: false, follow: false } };
  const url = canonicalUrl(`/blog/${slug}`);
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article", url, title: article.title, description: article.excerpt,
      publishedTime: article.publishDate || undefined,
      images: article.image ? [{ url: article.image, alt: article.imageAlt || article.title }] : undefined,
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: article.image ? [article.image] : undefined },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const slug = (await params).slug;
  const [article, otherArticles] = await Promise.all([getPublishedArticle(slug), getPublishedArticles()]);
  if (!article) notFound();
  const url = canonicalUrl(`/blog/${slug}`);
  const structuredData = url ? {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: article.title, description: article.excerpt, url,
    datePublished: article.publishDate || undefined,
    image: article.image || undefined,
    author: { "@type": "Organization", name: article.author || "Lyven Team" },
    publisher: { "@type": "Organization", name: "Lyven", url: canonicalUrl("/") },
  } : null;
  return <>
    {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />}
    <BlogArticleDetail post={toBlogPost(article)} localArticle={article} availablePosts={otherArticles.map(toBlogPost)} />
  </>;
}
