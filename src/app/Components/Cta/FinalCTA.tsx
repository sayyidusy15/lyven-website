"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function FinalCTA() {
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
    }, { threshold: 0.16 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="lyven-final-cta" aria-labelledby="final-cta-heading">
      <div className="lyven-final-cta__inner">
        <div className="lyven-final-cta__panel">
          <div className="lyven-final-cta__veil" aria-hidden="true" />
          <div className="lyven-final-cta__content">
            <h2 id="final-cta-heading" className="lyven-final-cta__heading">
              <span>Ready to build</span>
              <span>something <em>meaningful?</em></span>
            </h2>
            <p className="lyven-final-cta__copy">
              We help businesses build digital products, integrations, and systems designed to grow.
            </p>
            <Link href="/contact" className="lyven-final-cta__primary">
              Start Your Consultation <span aria-hidden="true">→</span>
            </Link>
            <Link href="/about" className="lyven-final-cta__secondary">
              Learn more about Lyven <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
