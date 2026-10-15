"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { blogDetailHref, blogPosts, type BlogPost } from "../../../lib/blog-posts";
import FinalCTA from "../Cta/FinalCTA";

const articleSections = [
  { title: "Start from the real problem", body: "Strong digital products begin with a shared understanding of the problem, the people experiencing it, and the outcome the business needs. Before screens or features, teams need a clear point of view on what should change and why it matters." },
  { title: "Good design needs clear structure", body: "A useful interface is the visible result of thoughtful decisions underneath. Information architecture, content hierarchy, and interaction patterns should help people understand where they are, what matters, and what to do next without unnecessary effort." },
  { title: "Development should support the experience", body: "Design intent only becomes valuable when the product is fast, stable, accessible, and easy to maintain. Designers and developers working together early can protect the experience while making practical technical decisions." },
  { title: "Systems matter more than screens", body: "Reusable components, clear content rules, and reliable integrations help a product remain coherent as it grows. A system gives teams the foundation to move faster without trading away quality or consistency." },
  { title: "Build for clarity and growth", body: "The best products are not finished at launch. They create a clear foundation for learning, improvement, and growth. That means making decisions that serve today’s users while leaving room for tomorrow’s opportunities." },
];

function RelatedArticle({ post }: { post: BlogPost }) {
  return <article className="lyven-article-related"><Link href={blogDetailHref(post.slug)}><span className="lyven-article-related__image"><Image src={post.image} alt={post.imageAlt} fill sizes="96px" /></span><span><small>{post.category}</small><strong>{post.title}</strong><em>{post.date} · {post.readTime}</em></span></Link></article>;
}

export default function BlogArticleDetail({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const moreInsights = blogPosts.filter((item) => item.slug !== post.slug).slice(3, 6);
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
            <p>{post.excerpt} Strategy, design, and development work best when they move toward the same clear outcome.</p>
            <div className="lyven-article-meta"><span>Written by Ricky Putra</span><span>{post.date}</span><span>{post.readTime}</span></div>
            <button className="lyven-article-share" type="button" onClick={copyLink}>{copied ? "Link copied" : "Share by link"}<span aria-hidden="true">{copied ? "✓" : "↗"}</span></button>
          </div>
          </div>
          <div className="lyven-article-cover"><Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 991px) calc(100vw - 48px), 820px" /></div>
          <div className="lyven-article-prose">
            <p className="lyven-article-lead">Digital products work when every discipline contributes to one coherent experience. The goal is not to produce more screens, but to make something useful, understandable, and ready to evolve.</p>
            {articleSections.map((section, index) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p>{index === 1 && <blockquote>“Clarity is not a finishing touch. It is the foundation that lets people trust and use a digital product.”</blockquote>}{index === 3 && <aside className="lyven-article-callout"><strong>Key insight</strong><p>A scalable product is built from shared principles, reusable patterns, and decisions that the whole team understands.</p></aside>}</section>)}
          </div>
        </article>

        <aside className="lyven-article-sidebar" aria-label="Article information">
          <section className="lyven-article-author"><p>Written by</p><div><span aria-hidden="true">RP</span><div><strong>Ricky Putra</strong><small>Product Designer at Lyven</small></div></div><p>Ricky turns complex product needs into clear, usable digital experiences.</p></section>
          <section className="lyven-article-sidebar-tags"><h2>Topics</h2><div><span>UI/UX</span><span>Product Design</span><span>Web Development</span><span>Digital Strategy</span></div></section>
          <section className="lyven-article-related-list"><h2>Related Articles</h2>{related.map((item) => <RelatedArticle post={item} key={item.slug} />)}</section>
        </aside>
      </div>

      <section className="lyven-article-insights" aria-labelledby="more-insights-heading"><div className="lyven-article-shell"><div className="lyven-article-insights__heading"><div><p>From the journal</p><h2 id="more-insights-heading">Get More Insights</h2></div><span>Explore more ideas, strategies, and product thinking from Lyven.</span></div><div className="lyven-article-insights__grid">{moreInsights.map((item) => <article className="lyven-article-insight-card" key={item.slug}><Link href={blogDetailHref(item.slug)}><span><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 767px) calc(100vw - 40px), 31vw" /></span><small>{item.category} · {item.readTime}</small><strong>{item.title}</strong><em>Read article ↗</em></Link></article>)}</div></div></section>
      <FinalCTA />
    </main>
  );
}
