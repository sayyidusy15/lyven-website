const partners = [
  { name: "Reliance Insurance Group", logo: "/assets/img/brand_1.svg" },
  { name: "DC Holdings", logo: "/assets/img/brand_2.svg" },
  { name: "MobileTech", logo: "/assets/img/brand_3.svg" },
  { name: "Western", logo: "/assets/img/brand_4.svg" },
  { name: "AudioWave", logo: "/assets/img/brand_5.svg" },
  { name: "Hyundai America Shipping Agency", logo: "/assets/img/brand_6.svg" },
  { name: "AppCode", logo: "/assets/img/brand_7.svg" },
  { name: "Azona", logo: "/assets/img/brand_8.svg" },
  { name: "Agency.com", logo: "/assets/img/brand_9.svg" },
  { name: "Volo Digital Agency", logo: "/assets/img/brand_10.svg" },
  { name: "Payoneer", logo: "/assets/img/brand_11.svg" },
  { name: "Affirm", logo: "/assets/img/brand_12.svg" },
];

export default function TrustedPartners() {
  return (
    <section className="lyven-partners" aria-label="Trusted partners">
      <div className="lyven-partners__inner">
        <ul className="lyven-partners__grid">
          {partners.map((partner) => (
            <li className="lyven-partners__item" key={partner.name}>
              <img src={partner.logo} alt={partner.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
