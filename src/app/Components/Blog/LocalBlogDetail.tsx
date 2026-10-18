"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { articleToBlogPost, loadArticles } from "../../../lib/supabase-cms";
import type { CmsArticle } from "../../../lib/local-cms";
import BlogArticleDetail from "./BlogArticleDetail";

export default function LocalBlogDetail({ slug }: { slug: string }) {
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState<CmsArticle[]>([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadArticles().then((records) => {
      if (mounted) { setSaved(records); setLoaded(true); }
    }).catch(() => { if (mounted) { setLoadError(true); setLoaded(true); } });
    return () => { mounted = false; };
  }, []);

  if (!loaded) return <main className="lyven-article-page"><div className="lyven-article-shell" style={{ padding: "180px 0 100px" }}>Loading article...</div></main>;
  if (loadError) return <MissingArticle message="This article is temporarily unavailable. Please try again later." />;
  const article = saved.find((item) => item.slug === slug && item.status === "Published");
  if (!article) return <MissingArticle />;
  return <BlogArticleDetail post={articleToBlogPost(article)} localArticle={article} availablePosts={saved.filter((item) => item.status === "Published").map(articleToBlogPost)} />;
}

function MissingArticle({ message = "This article has not been published." }: { message?: string }) {
  return <main className="lyven-article-page"><div className="lyven-article-shell" style={{ padding: "180px 0 110px" }}><p>Article unavailable</p><h1>{message}</h1><Link href="/blog">← Back to blog</Link></div></main>;
}
