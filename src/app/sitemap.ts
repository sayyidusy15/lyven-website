import type { MetadataRoute } from "next";
import { getPublishedSitemapEntries } from "../lib/public-cms-content";
import { getSiteUrl } from "../lib/site-url";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSiteUrl();
  if (!site) return [];
  const staticPaths = ["/", "/service", "/portfolio-list", "/blog", "/about", "/contact", "/faq"];
  const { articles, projects } = await getPublishedSitemapEntries();
  return [
    ...staticPaths.map((path) => ({ url: new URL(path, site).toString() })),
    ...projects.map((project) => ({ url: new URL(`/portfolio-details/${project.slug}`, site).toString(), lastModified: new Date(project.updated_at) })),
    ...articles.map((article) => ({ url: new URL(`/blog/${article.slug}`, site).toString(), lastModified: new Date(article.updated_at) })),
  ];
}
