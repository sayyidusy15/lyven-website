import { createBrowserClient } from "@supabase/ssr";
import type { CmsArticle, CmsMedia, CmsProject } from "./local-cms";
import { formatPublishDate } from "./local-cms";
import type { BlogPost } from "./blog-posts";

const BUCKET = "lyven-media";

export type CmsInquiry = {
  id: string; name: string; email: string; company: string; projectType: string;
  budget: string; timeline: string; message: string; received: string;
  status: "New" | "In progress" | "Replied" | "Closed"; note: string;
};

export type CmsTestimonial = {
  id: string; title: string; message: string; senderName: string; senderTitle: string;
  star: number; sortOrder: number; status: "Draft" | "Published" | "Takedown";
};

let client: ReturnType<typeof createBrowserClient> | null = null;

export function cmsClient() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase is not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    client = createBrowserClient(url, key);
  }
  return client;
}

function must<T>(result: { data: T | null; error: { message: string } | null }): T {
  if (result.error) throw new Error(result.error.message);
  if (result.data === null) throw new Error("Supabase returned no data.");
  return result.data;
}

type MediaRow = {
  id: string; name: string; alt_text: string; placement: string;
  storage_path: string | null; external_url: string | null;
};

function mediaUrl(row: MediaRow): string {
  return row.external_url || (row.storage_path ? cmsClient().storage.from(BUCKET).getPublicUrl(row.storage_path).data.publicUrl : "");
}

function toMedia(row: MediaRow): CmsMedia {
  return { id: row.id, src: mediaUrl(row), name: row.name, placement: row.placement, alt: row.alt_text };
}

async function loadMedia() {
  const rows = must(await cmsClient().from("lyven_media").select("id,name,alt_text,placement,storage_path,external_url").order("created_at", { ascending: false })) as MediaRow[];
  return rows.map(toMedia);
}

export async function loadProjects() {
  const [rows, gallery, media] = await Promise.all([
    cmsClient().from("lyven_projects").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false }),
    cmsClient().from("lyven_project_gallery").select("project_id,media_id,sort_order").order("sort_order", { ascending: true }),
    loadMedia(),
  ]);
  const mediaById = new Map(media.map((item) => [item.id, item.src]));
  const projects = (must(rows) as Record<string, unknown>[]).map((row) => ({
    id: String(row.id), slug: String(row.slug), title: String(row.title),
    category: String(row.category) as CmsProject["category"], summary: String(row.summary ?? ""),
    description: String(row.description ?? ""), industry: String(row.industry ?? ""),
    duration: String(row.duration ?? ""), year: String(row.project_year ?? ""), website: String(row.website_url ?? ""),
    thumbnail: mediaById.get(String(row.thumbnail_media_id)) ?? "",
    heroImage: mediaById.get(String(row.hero_media_id)) ?? "",
    aboutImage: mediaById.get(String(row.about_media_id)) ?? "",
    gallery: (must(gallery) as { project_id: string; media_id: string }[]).filter((entry) => entry.project_id === row.id).map((entry) => mediaById.get(entry.media_id) ?? "").filter(Boolean),
    featured: Boolean(row.featured), status: String(row.status) as CmsProject["status"],
  }));
  return projects satisfies CmsProject[];
}

export async function loadArticles() {
  const [rows, media] = await Promise.all([
    cmsClient().from("lyven_articles").select("*").order("publish_date", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false }),
    loadMedia(),
  ]);
  const mediaById = new Map(media.map((item) => [item.id, item.src]));
  const articles = (must(rows) as Record<string, unknown>[]).map((row) => ({
    id: String(row.id), slug: String(row.slug), title: String(row.title), category: String(row.category),
    excerpt: String(row.excerpt ?? ""), bodyHtml: String(row.body_html ?? ""),
    image: mediaById.get(String(row.cover_media_id)) ?? "", imageAlt: String(row.cover_alt_text ?? ""),
    author: String(row.author_name ?? "Lyven Team"), authorRole: String(row.author_role ?? ""),
    authorDescription: String(row.author_description ?? ""),
    tags: Array.isArray(row.tags) ? row.tags.join(", ") : "", publishDate: String(row.publish_date ?? ""),
    featured: Boolean(row.featured), status: String(row.status) as CmsArticle["status"],
  }));
  return articles satisfies CmsArticle[];
}

export function articleToBlogPost(article: CmsArticle): BlogPost {
  const words = article.bodyHtml.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return {
    slug: article.slug, category: article.category as BlogPost["category"], title: article.title,
    excerpt: article.excerpt, date: formatPublishDate(article.publishDate),
    readTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
    image: article.image || "/assets/img/post_9.jpg", imageAlt: article.imageAlt || article.title,
    featured: article.featured, searchTerms: article.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
  };
}

export async function loadAdminCms() {
  const [projects, articles, media, inquiriesResult, testimonialsResult] = await Promise.all([
    loadProjects(), loadArticles(), loadMedia(),
    cmsClient().from("lyven_inquiries").select("*").order("received_at", { ascending: false }),
    cmsClient().from("lyven_testimonials").select("*").order("sort_order", { ascending: true }),
  ]);
  const inquiries = (must(inquiriesResult) as Record<string, unknown>[]).map((row) => ({
    id: String(row.id), name: String(row.name), email: String(row.email), company: String(row.company ?? ""),
    projectType: String(row.project_type), budget: String(row.budget ?? ""), timeline: String(row.timeline ?? ""),
    message: String(row.message), received: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(String(row.received_at))),
    status: String(row.status) as CmsInquiry["status"], note: String(row.internal_note ?? ""),
  }));
  const testimonials = (must(testimonialsResult) as Record<string, unknown>[]).map((row) => ({
    id: String(row.id), title: String(row.title ?? ""), message: String(row.message),
    senderName: String(row.sender_name), senderTitle: String(row.sender_title ?? ""),
    star: Number(row.star ?? 5), sortOrder: Number(row.sort_order ?? 0),
    status: String(row.status) as CmsTestimonial["status"],
  }));
  return { projects, articles, media, inquiries, testimonials };
}

async function mediaIdFor(src: string, media: CmsMedia[], placement: string): Promise<string | null> {
  if (!src) return null;
  const existing = media.find((item) => item.src === src);
  if (existing) return existing.id;
  const storagePrefix = cmsClient().storage.from(BUCKET).getPublicUrl("__path__").data.publicUrl.split("__path__")[0];
  if (src.startsWith(storagePrefix)) {
    const storagePath = decodeURIComponent(src.slice(storagePrefix.length));
    const result = await cmsClient().from("lyven_media").select("id").eq("storage_path", storagePath).maybeSingle();
    if (result.error) throw new Error(result.error.message);
    if (result.data) return result.data.id;
    throw new Error("Uploaded image was not found in Media Library. Try uploading it again.");
  }
  if (!(src.startsWith("/assets/") || src.startsWith("https://"))) throw new Error("Upload this image to Media Library before saving.");
  const name = decodeURIComponent(src.split("/").pop() || "Image").slice(0, 180);
  const result = await cmsClient().from("lyven_media").insert({ name, alt_text: "", placement, external_url: src }).select("id").single();
  return (must(result) as { id: string }).id;
}

export async function saveProject(project: CmsProject, media: CmsMedia[]) {
  const [thumbnail, hero, about] = await Promise.all([
    mediaIdFor(project.thumbnail, media, "Portfolio thumbnail"),
    mediaIdFor(project.heroImage, media, "Project header"),
    mediaIdFor(project.aboutImage, media, "Project overview"),
  ]);
  const payload = {
    slug: project.slug, title: project.title, category: project.category, summary: project.summary,
    description: project.description, industry: project.industry, duration: project.duration,
    project_year: project.year, website_url: project.website || null,
    thumbnail_media_id: thumbnail, hero_media_id: hero, about_media_id: about,
    featured: project.featured, status: project.status,
  };
  const result = project.id
    ? await cmsClient().from("lyven_projects").update(payload).eq("id", project.id).select("id").single()
    : await cmsClient().from("lyven_projects").insert(payload).select("id").single();
  const id = (must(result) as { id: string }).id;
  const galleryIds = await Promise.all(project.gallery.filter(Boolean).map((src) => mediaIdFor(src, media, "Project gallery")));
  must(await cmsClient().from("lyven_project_gallery").delete().eq("project_id", id).select("id"));
  if (galleryIds.length) must(await cmsClient().from("lyven_project_gallery").insert(galleryIds.map((mediaId, index) => ({ project_id: id, media_id: mediaId, sort_order: index }))).select("id"));
  return id;
}

export async function saveArticle(article: CmsArticle, media: CmsMedia[]) {
  const cover = await mediaIdFor(article.image, media, "Blog cover");
  const payload = {
    slug: article.slug, title: article.title, category: article.category, excerpt: article.excerpt,
    body_html: article.bodyHtml, cover_media_id: cover, cover_alt_text: article.imageAlt,
    author_name: article.author, author_role: article.authorRole, author_description: article.authorDescription,
    tags: article.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    publish_date: article.publishDate || null, featured: Boolean(article.featured), status: article.status,
  };
  const result = article.id
    ? await cmsClient().from("lyven_articles").update(payload).eq("id", article.id).select("id").single()
    : await cmsClient().from("lyven_articles").insert(payload).select("id").single();
  return (must(result) as { id: string }).id;
}

export async function saveInquiry(inquiry: CmsInquiry) {
  const payload = { name: inquiry.name, email: inquiry.email, company: inquiry.company,
    project_type: inquiry.projectType, budget: inquiry.budget, timeline: inquiry.timeline,
    message: inquiry.message, status: inquiry.status, internal_note: inquiry.note,
    source: "manual" };
  const result = inquiry.id
    ? await cmsClient().from("lyven_inquiries").update(payload).eq("id", inquiry.id).select("id").single()
    : await cmsClient().from("lyven_inquiries").insert(payload).select("id").single();
  return (must(result) as { id: string }).id;
}

export async function saveTestimonial(item: CmsTestimonial) {
  const payload = { title: item.title, message: item.message, sender_name: item.senderName,
    sender_title: item.senderTitle, star: item.star, sort_order: item.sortOrder, status: item.status };
  const result = item.id
    ? await cmsClient().from("lyven_testimonials").update(payload).eq("id", item.id).select("id").single()
    : await cmsClient().from("lyven_testimonials").insert(payload).select("id").single();
  return (must(result) as { id: string }).id;
}

export async function saveMedia(item: CmsMedia) {
  const payload = { name: item.name, alt_text: item.alt, placement: item.placement };
  must(await cmsClient().from("lyven_media").update(payload).eq("id", item.id).select("id").single());
}

export async function deleteRecord(table: "lyven_projects" | "lyven_articles" | "lyven_inquiries" | "lyven_media" | "lyven_testimonials", id: string) {
  const deleted = must(await cmsClient().from(table).delete().eq("id", id).select("id")) as { id: string }[];
  if (deleted.length !== 1) throw new Error("Nothing was deleted. Please refresh and check that your admin session is still active.");
}

export async function setFeatured(table: "lyven_projects" | "lyven_articles", id: string, featured: boolean) {
  must(await cmsClient().from(table).update({ featured }).eq("id", id).select("id").single());
}

export async function uploadMedia(file: File): Promise<CmsMedia> {
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) throw new Error("Use a JPEG, PNG, WebP, or AVIF image.");
  if (file.size > 10 * 1024 * 1024) throw new Error("Image must be smaller than 10 MB.");
  const extension = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' } as Record<string, string>)[file.type];
  let dimensions: { width: number; height: number } | null = null;
  try {
    const bitmap = await createImageBitmap(file);
    dimensions = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
  } catch { /* Keep the upload usable if the browser cannot decode dimensions. */ }
  const path = `uploads/${crypto.randomUUID()}.${extension}`;
  must(await cmsClient().storage.from(BUCKET).upload(path, file, { contentType: file.type, upsert: false }));
  const result = await cmsClient().from("lyven_media").insert({
    name: file.name.slice(0, 180), alt_text: "", placement: "Media library", storage_path: path,
    original_filename: file.name, mime_type: file.type, file_size_bytes: file.size,
    width_px: dimensions?.width ?? null, height_px: dimensions?.height ?? null,
  }).select("id,name,alt_text,placement,storage_path,external_url").single();
  if (result.error) {
    await cmsClient().storage.from(BUCKET).remove([path]);
    throw new Error(result.error.message);
  }
  return toMedia(must(result) as MediaRow);
}

export async function deleteMedia(item: CmsMedia) {
  const db = cmsClient();
  const row = must(await db.from("lyven_media").select("storage_path").eq("id", item.id).single()) as { storage_path: string | null };

  // These foreign keys use ON DELETE RESTRICT. Detach the asset everywhere first,
  // including draft records that may not be visible in a public project list.
  must(await db.from("lyven_project_gallery").delete().eq("media_id", item.id).select("id"));
  for (const column of ["thumbnail_media_id", "hero_media_id", "about_media_id"] as const) {
    must(await db.from("lyven_projects").update({ [column]: null }).eq(column, item.id).select("id"));
  }
  must(await db.from("lyven_articles").update({ cover_media_id: null }).eq("cover_media_id", item.id).select("id"));
  await deleteRecord("lyven_media", item.id);
  if (row.storage_path) {
    const removed = await db.storage.from(BUCKET).remove([row.storage_path]);
    if (removed.error) throw new Error("Media record was deleted, but the Storage file could not be removed: " + removed.error.message);
  }
}
