import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { CmsArticle, CmsProject } from "./local-cms";

const BUCKET = "lyven-media";
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

type MediaRow = { id: string; external_url: string | null; storage_path: string | null };

async function mediaUrls(client: NonNullable<ReturnType<typeof publicClient>>, ids: string[]) {
  const uniqueIds = [...new Set(ids.filter(Boolean))];
  if (!uniqueIds.length) return new Map<string, string>();
  const { data, error } = await client.from("lyven_media").select("id,external_url,storage_path").in("id", uniqueIds);
  if (error) throw error;
  return new Map((data as MediaRow[]).map((media) => [
    media.id,
    media.external_url || (media.storage_path ? client.storage.from(BUCKET).getPublicUrl(media.storage_path).data.publicUrl : ""),
  ]));
}

async function fetchArticles(slug?: string): Promise<CmsArticle[]> {
  const client = publicClient();
  if (!client || (slug && !validSlug.test(slug))) return [];
  let query = client.from("lyven_articles")
    .select("id,slug,title,category,excerpt,body_html,cover_media_id,cover_alt_text,author_name,author_role,author_description,tags,publish_date,read_minutes,featured,status")
    .eq("status", "Published")
    .order("publish_date", { ascending: false, nullsFirst: false });
  if (slug) query = query.eq("slug", slug);
  const { data, error } = await query;
  if (error) throw error;
  const rows = (data ?? []) as Record<string, unknown>[];
  const images = await mediaUrls(client, rows.map((row) => String(row.cover_media_id ?? "")));
  return rows.map((row) => ({
    id: String(row.id), slug: String(row.slug), title: String(row.title), category: String(row.category),
    excerpt: String(row.excerpt ?? ""), bodyHtml: String(row.body_html ?? ""),
    image: images.get(String(row.cover_media_id)) ?? "", imageAlt: String(row.cover_alt_text ?? ""),
    author: String(row.author_name ?? "Lyven Team"), authorRole: String(row.author_role ?? ""),
    authorDescription: String(row.author_description ?? ""),
    tags: Array.isArray(row.tags) ? row.tags.join(", ") : "", publishDate: String(row.publish_date ?? ""),
    readMinutes: Number(row.read_minutes ?? 0),
    featured: Boolean(row.featured), status: "Published",
  }));
}

export async function getPublishedArticles() {
  return fetchArticles();
}

export async function getPublishedArticle(slug: string) {
  return (await fetchArticles(slug))[0] ?? null;
}

async function fetchProjects(slug?: string): Promise<CmsProject[]> {
  const client = publicClient();
  if (!client || (slug && !validSlug.test(slug))) return [];
  let query = client.from("lyven_projects")
    .select("id,slug,title,category,summary,description,industry,duration,project_year,website_url,thumbnail_media_id,featured_thumbnail_media_id,hero_media_id,about_media_id,featured,status")
    .eq("status", "Published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (slug) query = query.eq("slug", slug);
  const { data, error } = await query;
  if (error) throw error;
  const rows = (data ?? []) as Record<string, unknown>[];
  if (!rows.length) return [];
  const ids = rows.map((row) => String(row.id));
  const gallery = await client.from("lyven_project_gallery").select("project_id,media_id,sort_order").in("project_id", ids).order("sort_order", { ascending: true });
  if (gallery.error) throw gallery.error;
  const galleryRows = gallery.data ?? [];
  const images = await mediaUrls(client, [
    ...rows.flatMap((row) => [row.thumbnail_media_id, row.featured_thumbnail_media_id, row.hero_media_id, row.about_media_id].map((id) => String(id ?? ""))),
    ...galleryRows.map((item) => item.media_id),
  ]);
  return rows.map((row) => ({
    id: String(row.id), slug: String(row.slug), title: String(row.title), category: String(row.category) as CmsProject["category"],
    summary: String(row.summary ?? ""), description: String(row.description ?? ""),
    industry: String(row.industry ?? ""), duration: String(row.duration ?? ""), year: String(row.project_year ?? ""),
    website: String(row.website_url ?? ""), thumbnail: images.get(String(row.thumbnail_media_id)) ?? "",
    featuredThumbnail: images.get(String(row.featured_thumbnail_media_id)) ?? "",
    heroImage: images.get(String(row.hero_media_id)) ?? "", aboutImage: images.get(String(row.about_media_id)) ?? "",
    gallery: galleryRows.filter((item) => item.project_id === row.id).map((item) => images.get(item.media_id) ?? "").filter(Boolean),
    featured: Boolean(row.featured), status: "Published",
  }));
}

export async function getPublishedProjects() {
  return fetchProjects();
}

export async function getPublishedProject(slug: string) {
  return (await fetchProjects(slug))[0] ?? null;
}

export async function getPublishedSitemapEntries() {
  const client = publicClient();
  if (!client) return { articles: [], projects: [] };
  const [articles, projects] = await Promise.all([
    client.from("lyven_articles").select("slug,updated_at").eq("status", "Published"),
    client.from("lyven_projects").select("slug,updated_at").eq("status", "Published"),
  ]);
  if (articles.error) throw articles.error;
  if (projects.error) throw projects.error;
  return { articles: articles.data ?? [], projects: projects.data ?? [] };
}
