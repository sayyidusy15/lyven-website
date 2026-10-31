import Image from "next/image";

const partners = [
  // Row 1
  { name: "Kahf", logo: "/assets/img/kahf.png" },
  { name: "Eiger", logo: "/assets/img/eiger.png" },
  { name: "LEN Railway", logo: "/assets/img/lenrailway.png" },
  { name: "Muslim101", logo: "/assets/img/muslim101.png" },
  { name: "Noorabika", logo: "/assets/img/noorabika.png" },
  { name: "Infinity", logo: "/assets/img/infinite.png" },
  // Row 2
  { name: "iForte", logo: "/assets/img/iforte.png" },
  { name: "Tabel Data", logo: "/assets/img/tabeldata.png" },
  { name: "HUMIC", logo: "/assets/img/humic.png" },
  { name: "Tomojalan", logo: "/assets/img/tomojalan.png" },
  { name: "Jouska", logo: "/assets/img/jouska.png" },
  { name: "Captbooth", logo: "/assets/img/captbooth.png" },
];

export default function TrustedPartners() {
  return (
    <section className="lyven-partners" aria-label="Trusted partners">
      <div className="lyven-partners__inner">
        <ul className="lyven-partners__grid">
          {partners.map((partner) => (
            <li className="lyven-partners__item" key={partner.name}>
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={160}
                height={48}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

