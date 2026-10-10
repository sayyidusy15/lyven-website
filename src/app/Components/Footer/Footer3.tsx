import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Web & Mobile Development", href: "/service" },
      { label: "System Integration", href: "/service" },
      { label: "AI & Automation", href: "/service" },
      { label: "Digital Consultation", href: "/service" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Work", href: "/portfolio-list" },
      { label: "Career" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy" },
      { label: "Terms of Service" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", icon: "bi-linkedin" },
  { label: "Instagram", icon: "bi-instagram" },
  { label: "YouTube", icon: "bi-youtube" },
  { label: "X", icon: "bi-twitter-x" },
];

export default function Footer3() {
  return (
    <footer className="lyven-site-footer">
      <div className="lyven-site-footer__inner">
        <div className="lyven-site-footer__top">
          <div className="lyven-site-footer__brand">
            <Link href="/" aria-label="Lyven home" className="lyven-site-footer__logo">
              <Image src="/assets/img/logo-lyven-primary.svg" alt="Lyven" width={138} height={38} />
            </Link>
            <p>Partner digital untuk bisnis modern. Dari ide hingga eksekusi, kami membantu Anda membangun solusi yang benar-benar berarti.</p>
            <nav className="lyven-site-footer__socials" aria-label="Social media">
              {socials.map((social) => (
                <a key={social.label} href="#" aria-label={social.label} className="lyven-site-footer__social">
                  <i className={`bi ${social.icon}`} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          <nav className="lyven-site-footer__navigation" aria-label="Footer">
            {footerColumns.map((column) => (
              <section className="lyven-site-footer__column" key={column.title}>
                <h2>{column.title}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? <Link href={link.href}>{link.label}</Link> : <span>{link.label}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        <div className="lyven-site-footer__bottom">
          <p>© {new Date().getFullYear()} Lyven. All rights reserved.</p>
          <p>Dipercaya oleh bisnis yang ingin bertumbuh.</p>
        </div>
      </div>
    </footer>
  );
}
