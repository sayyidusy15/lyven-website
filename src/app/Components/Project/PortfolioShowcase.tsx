import React from 'react';
import Link from 'next/link';
import CardPortfolio from '../Card/CardPortfolio';
// Sesuaikan path import ini dengan struktur foldermu
import { portfolioData } from '../../../data/portfolioData'


// Data Dummy
const portfolioItems = [
  {
    image: '/assets/img/project_1.jpg',
    companyLogo: '/assets/img/brand_1.svg',
    title: 'IndiTV Home',
    categories: ['E-Commerce', 'Website', 'Finance'],
    technologies: [
      { name: 'tech1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'tech2', logo: '/assets/img/tech_portfolio2.jpg' },
      { name: 'tech3', logo: '/assets/img/tech_portfolio4.jpg' },
    ],
    link: '/project/project-details',
  },
  // ... item lainnya (Saya singkat agar tidak kepanjangan)
  {
      image: '/assets/img/project_1.jpg',
      companyLogo: '/assets/img/brand_1.svg',
      title: 'IndiTV Home',
      categories: ['E-Commerce', 'Website', 'Finance'],
      technologies: [
        { name: 'tech1', logo: '/assets/img/tech_portfolio1.jpg' },
      ],
      link: '/project/project-details',
    },
    
];

const PortfolioShowcase = () => {
  // Misalnya di Home cuma mau tampilkan 3 item pertama saja:
  // const featuredItems = portfolioData.slice(0, 3); 
  const featuredItems = portfolioData;
  // Atau kalau mau tampilkan semua, pakai portfolioData langsung.
  return (
    <section className="cs_portfolio_section">
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        <div className="cs_portfolio_header d-flex align-items-start justify-content-between flex-wrap gap-3 mb-5">
          <div>
            <h2 className="cs_fs_48 mb-2">We build ONLY what customers love</h2>
            <p className="cs_section_heading_text mb-0 cs_fs_18">
              Beautifully designed, passionately engineered, and incredibly reliable
            </p>
          </div>
          <Link href="/portfolio-list" className="cs_btn cs_style_1 cs_fs_16 cs_bold text-uppercase">
            <span>See more portfolio</span>
          </Link>
        </div>

        <div className="cs_portfolio_grid">
          {/* Mapping dari variable featuredItems */}
          {featuredItems.map((item, index) => (
            <CardPortfolio key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="cs_height_120 cs_height_lg_80"></div>
    </section>
  );
};

export default PortfolioShowcase;