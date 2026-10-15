"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  { id: "01", question: "What types of projects does Lyven work on?", answer: "We build websites, web applications, mobile applications, custom software, system integrations, AI and automation solutions, and other digital products tailored to business needs." },
  { id: "02", question: "How long does a typical project take?", answer: "Timelines depend on scope and complexity. A focused project may take a few weeks, while a more complex product or integration can take several months. We agree on the estimate before development begins." },
  { id: "03", question: "Does Lyven only work with large companies?", answer: "No. We work with startups, small businesses, growing organizations, and established companies. Every solution is adapted to the needs and scale of the project." },
  { id: "04", question: "Does Lyven provide support after launch?", answer: "Yes. We can provide maintenance, improvements, technical support, and continued development based on the agreed service scope." },
  { id: "05", question: "What technologies does Lyven use?", answer: "We choose technology based on each project. The stack may include modern web and mobile frameworks, APIs, databases, cloud infrastructure, automation platforms, and AI technologies." },
  { id: "06", question: "How do we start a project with Lyven?", answer: "Tell us about your idea, goals, and business needs. We will review the requirements, discuss the best approach, and define the scope, timeline, and next steps together." },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
    <section ref={sectionRef} className="lyven-faq" aria-labelledby="faq-heading">
      <div className="lyven-faq__inner">
        <header className="lyven-faq__intro">
          <p className="lyven-faq__eyebrow">FAQ</p>
          <h2 id="faq-heading" className="lyven-faq__headline">
            Common questions, <em>clear answers.</em>
          </h2>
          <p className="lyven-faq__copy">Everything you need to know about our process, timelines, and working with Lyven.</p>
        </header>

        <ol className="lyven-faq__list">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;
            const questionId = `faq-question-${faq.id}`;
            const answerId = `faq-answer-${faq.id}`;

            return (
              <li className={`lyven-faq__item${isOpen ? " is-open" : ""}`} key={faq.id}>
                <h3>
                  <button type="button" className="lyven-faq__trigger" aria-expanded={isOpen} aria-controls={answerId} id={questionId} onClick={() => setOpenIndex(isOpen ? null : index)}>
                    <span className="lyven-faq__number">{faq.id}</span>
                    <span className="lyven-faq__question">{faq.question}</span>
                    <span className="lyven-faq__toggle" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                </h3>
                <div className="lyven-faq__answer-wrap">
                  <div id={answerId} className="lyven-faq__answer" role="region" aria-labelledby={questionId}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
