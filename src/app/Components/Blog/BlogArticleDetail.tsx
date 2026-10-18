"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { blogDetailHref, type BlogPost } from "../../../lib/blog-posts";
import { sanitizeArticleHtml, type CmsArticle } from "../../../lib/local-cms";
import FinalCTA from "../Cta/FinalCTA";

function RelatedArticle({ post }: { post: BlogPost }) {
  return <article className="lyven-article-related"><Link href={blogDetailHref(post.slug)}><span className="lyven-article-related__image"><Image src={post.image} alt={post.imageAlt} fill unoptimized={!post.image.startsWith("/")} sizes="96px" /></span><span><small>{post.category}</small><strong>{post.title}</strong><em>{post.date} · {post.readTime}</em></span></Link></article>;
}

export default function BlogArticleDetail({ post, localArticle, availablePosts }: { post: BlogPost; localArticle: CmsArticle; availablePosts: BlogPost[] }) {
  const [copied, setCopied] = useState(false);
  const related = availablePosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const moreInsights = availablePosts.filter((item) => item.slug !== post.slug).slice(3, 6);
  const authorName = localArticle.author || "Lyven Team";
  const authorRole = localArticle.authorRole;
  const authorDescription = localArticle.authorDescription;
  const tags = localArticle.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  const authorInitials = authorName.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="lyven-article-page">
      <div className="lyven-article-shell lyven-article-layout">
        <article className="lyven-article-main">
          <div className="lyven-article-intro">
          <nav className="lyven-article-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/blog">Blog</Link><span>/</span><span>{post.title}</span></nav>
          <div className="lyven-article-hero__copy">
            <span className="lyven-article-category">{post.category}</span>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <div className="lyven-article-meta"><span>Written by {authorName}</span><span>{post.date}</span><span>{post.readTime}</span></div>
            <button className="lyven-article-share" type="button" onClick={copyLink}>{copied ? "Link copied" : "Share by link"}<span aria-hidden="true">{copied ? "✓" : "↗"}</span></button>
          </div>
          </div>
          <div className="lyven-article-cover"><Image src={post.image} alt={post.imageAlt} fill priority unoptimized={!post.image.startsWith("/")} sizes="(max-width: 991px) calc(100vw - 48px), 820px" /></div>
          <div className="lyven-article-prose">
            {localArticle.bodyHtml ? <div className="lyven-article-authored-content" dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(localArticle.bodyHtml) }} /> : <p>Full article content is coming soon.</p>}
          </div>
        </article>

        <aside className="lyven-article-sidebar" aria-label="Article information">
          <section className="lyven-article-author"><p>Written by</p><div><span aria-hidden="true">{authorInitials}</span><div><strong>{authorName}</strong><small>{authorRole}</small></div></div><p>{authorDescription}</p></section>
          {tags.length > 0 && <section className="lyven-article-sidebar-tags"><h2>Topics</h2><div>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section>}
          {related.length > 0 && <section className="lyven-article-related-list"><h2>Related Articles</h2>{related.map((item) => <RelatedArticle post={item} key={item.slug} />)}</section>}
        </aside>
      </div>

      {moreInsights.length > 0 && <section className="lyven-article-insights" aria-labelledby="more-insights-heading"><div className="lyven-article-shell"><div className="lyven-article-insights__heading"><div><p>From the journal</p><h2 id="more-insights-heading">Get More Insights</h2></div><span>Explore more ideas, strategies, and product thinking from Lyven.</span></div><div className="lyven-article-insights__grid">{moreInsights.map((item) => <article className="lyven-article-insight-card" key={item.slug}><Link href={blogDetailHref(item.slug)}><span><Image src={item.image} alt={item.imageAlt} fill unoptimized={!item.image.startsWith("/")} sizes="(max-width: 767px) calc(100vw - 40px), 31vw" /></span><small>{item.category} · {item.readTime}</small><strong>{item.title}</strong><em>Read article ↗</em></Link></article>)}</div></div></section>}
      <FinalCTA />
    </main>
  );
}
