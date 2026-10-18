"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { blogDetailHref, type BlogPost } from "../../../lib/blog-posts";
import { MAX_FEATURED_ARTICLES } from "../../../lib/local-cms";
import { articleToBlogPost, loadArticles } from "../../../lib/supabase-cms";

const ARTICLES_PER_PAGE = 6;
const categories = ["All", "Design", "Development", "Strategy", "Process"] as const;

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="lyven-blog-page-card">
      <Link href={blogDetailHref(post.slug)} aria-label={`Read ${post.title}`}>
        <span className="lyven-blog-page-card__image"><Image src={post.image} alt={post.imageAlt} fill unoptimized={!post.image.startsWith("/")} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 991px) 44vw, 390px" /></span>
        <span className="lyven-blog-page-card__body">
          <span className="lyven-blog-page-card__category">{post.category}</span>
          <span className="lyven-blog-page-card__meta">{post.date} <i aria-hidden="true">·</i> {post.readTime}</span>
          <strong>{post.title}</strong>
          <span className="lyven-blog-page-card__excerpt">{post.excerpt}</span>
          <span className="lyven-blog-page-card__arrow" aria-hidden="true">↗</span>
        </span>
      </Link>
    </article>
  );
}

function StackedArticle({ post }: { post: BlogPost }) {
  return (
    <article className="lyven-blog-stacked-card">
      <Link href={blogDetailHref(post.slug)} aria-label={`Read ${post.title}`}>
        <span className="lyven-blog-stacked-card__image"><Image src={post.image} alt={post.imageAlt} fill unoptimized={!post.image.startsWith("/")} sizes="150px" /></span>
        <span className="lyven-blog-stacked-card__content"><small>{post.category}</small><strong>{post.title}</strong><span>{post.date} <i aria-hidden="true">·</i> {post.readTime}</span></span>
        <span className="lyven-blog-stacked-card__arrow" aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}

export default function BlogEditorial() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [publicPosts, setPublicPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  useEffect(() => {
    let mounted = true;
    loadArticles().then((rows) => { if (mounted) setPublicPosts(rows.filter((article) => article.status === "Published").map(articleToBlogPost)); })
      .catch(() => { if (mounted) setLoadError(true); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);
  const selectedPosts = publicPosts.filter((post) => post.featured).slice(0, MAX_FEATURED_ARTICLES);
  const featuredPost = selectedPosts[0];
  const stackedPosts = selectedPosts.slice(1);
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return publicPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery = !normalizedQuery || [post.title, post.excerpt, post.category, ...(post.searchTerms ?? [])].join(" ").toLocaleLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, publicPosts]);
  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / ARTICLES_PER_PAGE));
  const pageStart = (currentPage - 1) * ARTICLES_PER_PAGE;
  const pagedPosts = filteredPosts.slice(pageStart, pageStart + ARTICLES_PER_PAGE);
  const goToPage = (page: number) => {
    setCurrentPage(page);
    document.getElementById("all-articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="lyven-blog-page">
      <section className="lyven-blog-page-hero" aria-labelledby="blog-page-heading">
        <div className="lyven-blog-page-hero__backdrop" aria-hidden="true" />
        <div className="lyven-blog-page__inner lyven-blog-page-hero__content">
          <p className="lyven-blog-page__eyebrow">Blog</p>
          <h1 id="blog-page-heading"><span>Ideas, stories,</span><span>and insights from</span><span><em>our journey.</em></span></h1>
          <p className="lyven-blog-page-hero__copy">Explore practical thinking on design, development, and building meaningful digital products.</p>
          <a className="lyven-blog-page-hero__action" href="#all-articles">View All Articles <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="lyven-blog-highlights" aria-label="Featured articles">
        <div className="lyven-blog-page__inner">{featuredPost ? <div className="lyven-blog-lead">
          <article className="lyven-blog-featured">
            <Link href={blogDetailHref(featuredPost.slug)} aria-label={`Read featured article: ${featuredPost.title}`}>
              <span className="lyven-blog-featured__image"><Image src={featuredPost.image} alt={featuredPost.imageAlt} fill priority unoptimized={!featuredPost.image.startsWith("/")} sizes="(max-width: 991px) calc(100vw - 64px), 780px" /><span className="lyven-blog-featured__badge">Featured</span></span>
              <span className="lyven-blog-featured__content"><span className="lyven-blog-featured__meta">{featuredPost.category} <i aria-hidden="true">·</i> {featuredPost.date} <i aria-hidden="true">·</i> {featuredPost.readTime}</span><strong>{featuredPost.title}</strong><span className="lyven-blog-featured__excerpt">{featuredPost.excerpt}</span><span className="lyven-blog-featured__arrow" aria-hidden="true">↗</span></span>
            </Link>
          </article>
          <div className="lyven-blog-stacked" aria-label="More featured articles">{stackedPosts.map((post) => <StackedArticle post={post} key={post.slug} />)}</div>
        </div> : <div className="lyven-blog-feed__empty" role="status"><strong>{loading ? "Loading featured articles…" : loadError ? "Articles are temporarily unavailable." : "No featured articles yet."}</strong><span>{loading || loadError ? "Please check back shortly." : "Explore all articles below."}</span></div>}</div>
      </section>

      <section id="all-articles" className="lyven-blog-feed" aria-labelledby="blog-feed-heading">
        <div className="lyven-blog-page__inner">
          <div className="lyven-blog-feed__heading"><div><p className="lyven-blog-page__eyebrow">All Articles</p><h2 id="blog-feed-heading">Explore more from Lyven.</h2></div><div className="lyven-blog-search"><label className="visually-hidden" htmlFor="blog-search">Search articles</label><i className="bi bi-search" aria-hidden="true" /><input id="blog-search" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setCurrentPage(1); }} placeholder="Search articles..." autoComplete="off" /></div></div>
          <div className="lyven-blog-categories" role="group" aria-label="Filter articles by category">{categories.map((category) => <button key={category} type="button" className={activeCategory === category ? "is-active" : undefined} aria-pressed={activeCategory === category} onClick={() => { setActiveCategory(category); setCurrentPage(1); }}>{category}</button>)}</div>
          {pagedPosts.length ? <div className="lyven-blog-feed__grid" aria-live="polite">{pagedPosts.map((post) => <ArticleCard post={post} key={post.slug} />)}</div> : <div className="lyven-blog-feed__empty" role="status"><strong>{loading ? "Loading articles…" : loadError ? "Articles are temporarily unavailable." : publicPosts.length ? "No articles found." : "No articles published yet."}</strong><span>{loading || loadError ? "Please check back shortly." : publicPosts.length ? "Try another keyword or category." : "New stories will appear here once published."}</span></div>}
          {pageCount > 1 && <nav className="lyven-blog-pager" aria-label="Blog pages"><button type="button" aria-label="Previous blog page" disabled={currentPage === 1} onClick={() => goToPage(Math.max(1, currentPage - 1))}>←</button><div>{Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => <button key={page} type="button" className={page === currentPage ? "is-active" : undefined} aria-current={page === currentPage ? "page" : undefined} aria-label={`View blog page ${page}`} onClick={() => goToPage(page)}>{String(page).padStart(2, "0")}</button>)}</div><button type="button" aria-label="Next blog page" disabled={currentPage === pageCount} onClick={() => goToPage(Math.min(pageCount, currentPage + 1))}>→</button></nav>}
        </div>
      </section>
    </main>
  );
}
