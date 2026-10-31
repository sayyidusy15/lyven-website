import type { MetadataRoute } from "next";
import { getSiteUrl } from "../lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  if (!site) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    // Allow crawlers to see X-Robots-Tag: noindex on admin and legacy pages.
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site).toString(),
  };
}
