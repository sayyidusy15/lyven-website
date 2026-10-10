import Link from "next/link";
import OrbitBackground from "./OrbitBackground";

function Arrow() {
  return <span className="lyven-button__arrow" aria-hidden="true">↗</span>;
}

export default function LyvenHero() {
  return (
    <section className="lyven-hero" aria-labelledby="lyven-hero-title">
      <OrbitBackground />

      <div className="lyven-hero__content">
        <p className="lyven-hero__eyebrow">
          <span aria-hidden="true" />
          Mitra Digital untuk Brand Visioner
        </p>

        <h1 id="lyven-hero-title" className="lyven-hero__title">
          <span>From idea to</span>
          <span>digital reality.</span>
        </h1>

        <p className="lyven-hero__description">
          <span>Kami membantu brand dan bisnis membangun pengalaman</span>
          <span>digital yang bermakna melalui strategi, desain, dan teknologi</span>
          <span>yang bekerja nyata.</span>
        </p>

        <div className="lyven-hero__actions">
          <Link className="lyven-button lyven-button--primary" href="/contact">
            Get a Quote <Arrow />
          </Link>
          <Link className="lyven-button lyven-button--secondary" href="/portfolio-list">
            Lihat Portfolio <Arrow />
          </Link>
        </div>

        <div className="lyven-hero__principles" aria-label="Ideas, design, technology, real impact">
          <span className="lyven-hero__principle-line" />
          <span>Ideas</span><b>×</b><span>Design</span><b>×</b><span>Technology</span><b>×</b><span>Real Impact</span>
          <span className="lyven-hero__principle-line" />
        </div>
      </div>

    </section>
  );
}
