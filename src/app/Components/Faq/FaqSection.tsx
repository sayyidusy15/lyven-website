"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  { id: "01", question: "Proyek seperti apa yang dikerjakan Lyven?", answer: "Kami mengerjakan website, web application, mobile application, custom software, system integration, AI & automation, serta berbagai produk digital yang disesuaikan dengan kebutuhan bisnis." },
  { id: "02", question: "Berapa lama waktu pengerjaan sebuah proyek?", answer: "Timeline bergantung pada scope dan tingkat kompleksitas proyek. Proyek yang lebih sederhana dapat selesai dalam beberapa minggu, sedangkan produk atau integrasi yang lebih kompleks dapat membutuhkan beberapa bulan. Estimasi waktu akan disepakati sebelum proses development dimulai." },
  { id: "03", question: "Apakah Lyven hanya bekerja dengan perusahaan besar?", answer: "Tidak. Kami bekerja dengan startup, UMKM, bisnis yang sedang berkembang, organisasi, hingga perusahaan. Solusi akan disesuaikan dengan kebutuhan dan skala masing-masing proyek." },
  { id: "04", question: "Apakah Lyven menyediakan maintenance setelah proyek selesai?", answer: "Ya. Kami dapat menyediakan maintenance, improvement, technical support, serta pengembangan lanjutan setelah launch sesuai scope layanan yang disepakati." },
  { id: "05", question: "Teknologi apa yang digunakan Lyven?", answer: "Kami memilih teknologi berdasarkan kebutuhan setiap proyek. Stack yang digunakan dapat mencakup framework web dan mobile modern, API, database, cloud infrastructure, automation platform, serta teknologi AI." },
  { id: "06", question: "Bagaimana cara memulai proyek dengan Lyven?", answer: "Ceritakan ide, tujuan, dan kebutuhan bisnis Anda kepada kami. Kami akan mempelajari kebutuhan tersebut, mendiskusikan pendekatan terbaik, kemudian menentukan scope, timeline, dan langkah selanjutnya bersama." },
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
          <p className="lyven-faq__copy">Semua hal yang perlu Anda ketahui tentang proses kerja, timeline, dan cara bekerja bersama Lyven.</p>
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
