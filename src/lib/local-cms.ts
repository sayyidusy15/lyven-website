import type { ProjectCategory } from "./projects";

export type PublishStatus = "Draft" | "Published" | "Takedown";
export const MAX_HOMEPAGE_PROJECTS = 5;
export const MAX_FEATURED_ARTICLES = 4;

export type CmsProject = {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  industry: string;
  duration: string;
  year: string;
  website: string;
  thumbnail: string;
  heroImage: string;
  aboutImage: string;
  gallery: string[];
  featured: boolean;
  status: PublishStatus;
};

export type CmsArticle = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  bodyHtml: string;
  image: string;
  imageAlt: string;
  author: string;
  authorRole: string;
  authorDescription: string;
  tags: string;
  publishDate: string;
  featured?: boolean;
  status: PublishStatus;
};

export function formatPublishDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "New article";
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, day)));
}

export type CmsMedia = { id: string; src: string; name: string; placement: string; alt: string };

export const CMS_KEYS = {
  projects: "projects",
  articles: "articles",
  media: "media",
  inquiries: "inquiries",
} as const;

export const CMS_CHANGED_EVENT = "lyven-cms-changed";
const DATABASE_NAME = "lyven-local-cms";
const STORE_NAME = "content";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function readLocalCms<T>(key: string): Promise<T | null> {
  if (typeof window === "undefined" || !window.indexedDB) return null;
  const db = await openDatabase();
  try {
    return await new Promise<T | null>((resolve, reject) => {
      const request = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get(key);
      request.onsuccess = () => resolve((request.result as T | undefined) ?? null);
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

export async function writeLocalCms<T>(key: string, value: T): Promise<void> {
  const db = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).put(value, key);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally {
    db.close();
  }
  window.dispatchEvent(new CustomEvent(CMS_CHANGED_EVENT, { detail: key }));
}

export function sanitizeArticleHtml(html: string): string {
  if (typeof window === "undefined" || !html) return "";
  const input = new DOMParser().parseFromString(html, "text/html");
  const output = document.createElement("div");
  const allowed = new Set(["P", "H2", "H3", "BLOCKQUOTE", "STRONG", "B", "EM", "I", "U", "BR", "UL", "OL", "LI"]);

  function copyNode(node: Node, parent: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      parent.appendChild(document.createTextNode(node.textContent ?? ""));
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const element = node as HTMLElement;
    if (["SCRIPT", "STYLE", "IFRAME", "SVG", "MATH", "FORM"].includes(element.tagName)) return;
    const tag = element.tagName === "DIV" ? "P" : element.tagName;
    const destination = allowed.has(tag) ? document.createElement(tag.toLowerCase()) : parent;
    if (destination !== parent) {
      const align = element.style.textAlign;
      if (["left", "center", "right", "justify"].includes(align)) (destination as HTMLElement).style.textAlign = align;
      parent.appendChild(destination);
    }
    Array.from(element.childNodes).forEach((child) => copyNode(child, destination));
  }

  Array.from(input.body.childNodes).forEach((node) => copyNode(node, output));
  return output.innerHTML;
}
