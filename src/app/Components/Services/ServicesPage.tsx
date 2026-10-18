const services = [
  {
    number: "01",
    icon: "bi-circle-half",
    title: "Branding",
    description: "Build a strong, consistent visual identity that is easy to recognize.",
    items: ["Logo & Branding", "Social Media Post"],
  },
  {
    number: "02",
    icon: "bi-window",
    title: "UI/UX Design",
    description: "Design modern, intuitive digital experiences that are easy to use.",
    items: ["Website Design", "Landing Page Design", "Mobile App Design", "Ecommerce Design"],
  },
  {
    number: "03",
    icon: "bi-code-slash",
    title: "Development",
    description: "Develop fast, reliable, responsive digital products ready for real-world use.",
    items: ["Landing Page / Company Profile", "Web Development", "App Development", "System POS"],
  },
];

export default function ServicesPage() {
  return (
    <main className="lyven-services-page">
      <section className="lyven-services-hero" aria-labelledby="services-page-heading">
        <div className="lyven-services-hero__backdrop" aria-hidden="true" />
        <div className="lyven-services-page__inner lyven-services-hero__layout">
          <div className="lyven-services-hero__content">
            <p className="lyven-services-hero__eyebrow">What We Do</p>
            <h1 id="services-page-heading" className="lyven-services-hero__heading">
              <span>Digital</span>
              <span>services for</span>
              <span>modern businesses.</span>
            </h1>
            <p className="lyven-services-hero__description">
              From branding through development, we help businesses build identities,
              experiences, and digital products that support sustainable growth.
            </p>
          </div>
        </div>
      </section>

      <section className="lyven-services-overview" aria-labelledby="services-overview-heading">
        <div className="lyven-services-page__inner">
          <h2 id="services-overview-heading" className="visually-hidden">
            Lyven core services
          </h2>
          <div className="lyven-services-overview__grid">
            {services.map((service) => (
              <article className="lyven-service-column" key={service.number}>
                <span className="lyven-service-column__number">{service.number}</span>
                <i className={`bi ${service.icon} lyven-service-column__icon`} aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="lyven-service-column__more" aria-label={`${service.title} detail page coming soon`}>
                  Learn More <b aria-hidden="true">↗</b>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
