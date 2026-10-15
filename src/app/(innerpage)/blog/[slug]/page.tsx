import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticleDetail from "../../../Components/Blog/BlogArticleDetail";
import { blogPosts, getBlogPost } from "../../../../lib/blog-posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  return post ? { title: `${post.title} | Lyven`, description: post.excerpt } : {};
}

export default async function BlogArticlePage({ params }: Props) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  return <BlogArticleDetail post={post} />;
}
