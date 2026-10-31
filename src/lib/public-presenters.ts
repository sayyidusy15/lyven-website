import type { BlogPost } from "./blog-posts";
import { formatPublishDate, type CmsArticle, type CmsProject } from "./local-cms";
import type { LyvenProject } from "./projects";

export function toBlogPost(article: CmsArticle): BlogPost {
  const words = article.bodyHtml.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return {
    slug: article.slug, category: article.category as BlogPost["category"], title: article.title,
    excerpt: article.excerpt, date: formatPublishDate(article.publishDate),
    readTime: `${article.readMinutes || Math.max(1, Math.ceil(words / 220))} min read`,
    image: article.image || "/assets/img/post_9.jpg", imageAlt: article.imageAlt || article.title,
    featured: article.featured, searchTerms: article.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
  };
}

export function toPortfolioCard(project: CmsProject, index: number, useFeaturedImage = false): LyvenProject {
  return {
    index: String(index + 1).padStart(2, "0"), slug: project.slug, title: project.title,
    category: project.category, categoryPill: project.category, description: project.summary,
    image: (useFeaturedImage ? project.featuredThumbnail || project.thumbnail : project.thumbnail) || undefined,
    detailHref: `/portfolio-details/${project.slug}`, featured: project.featured,
    bgColor: "#edf3fa", hoverBgColor: "#e4edf7",
  };
}
