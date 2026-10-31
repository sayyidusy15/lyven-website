import "server-only";

/** Only a configured, public HTTPS origin is eligible for search indexing. */
export function getSiteUrl(): URL | null {
  const configured = process.env.SITE_URL?.trim();
  if (!configured) return null;
  try {
    const url = new URL(configured);
    if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) return null;
    if (["localhost", "127.0.0.1", "::1"].includes(url.hostname)) return null;
    return url;
  } catch {
    return null;
  }
}

export function canonicalUrl(path: string): string | undefined {
  const site = getSiteUrl();
  return site ? new URL(path, site).toString() : undefined;
}
