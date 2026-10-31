"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef } from "react";
import { blogDetailHref, type BlogPost } from "../../../lib/blog-posts";

export default function BlogSection({ featuredPosts }: { featuredPosts: BlogPost[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.dataset.visible = "true";
        observer.disconnect();
      }
    }, { threshold: 0.12 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="lyven-blog" aria-labelledby="blog-heading">
      <div className="lyven-blog__inner">
        <div className="lyven-blog__header">
          <div className="lyven-blog__title-wrap">
            <p className="lyven-blog__eyebrow">Blog</p>
            <h2 id="blog-heading" className="lyven-blog__heading">
              <span>Stories, ideas, and lessons</span>
              <span>from <em>our journey.</em></span>
            </h2>
          </div>

          <div className="lyven-blog__intro">
            <p>Read our latest notes on digital strategy, product development, technology, and the work behind meaningful products.</p>
            <Link href="/blog">View All Articles <span aria-hidden="true">→</span></Link>
          </div>
        </div>

        <div className="lyven-blog__grid">
          {featuredPosts.map((post, index) => (
            <article className="lyven-blog__card" key={post.title} style={{ "--blog-delay": `${index * 70}ms` } as CSSProperties}>
              <Link href={blogDetailHref(post.slug)} aria-label={`Read ${post.title}`}>
                <Image src={post.image} alt={post.imageAlt} fill unoptimized={!post.image.startsWith("/")} sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 991px) 46vw, 400px" />
                <span className="lyven-blog__overlay" aria-hidden="true" />
                <span className="lyven-blog__card-content">
                  <span className="lyven-blog__category">{post.category}</span>
                  <strong>{post.title}</strong>
                  <span className="lyven-blog__arrow" aria-hidden="true">↗</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
        {featuredPosts.length === 0 && <p className="lyven-blog__empty" role="status">No featured articles have been published yet. Explore our blog for more stories.</p>}
      </div>
    </section>
  );
}
