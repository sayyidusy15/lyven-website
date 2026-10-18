import React from 'react';
import Link from 'next/link';
import CardPortfolio from '../Card/CardPortfolio';
import { getAllPortfolioItems } from '../../../lib/portfolio';

const PortfolioShowcase = () => {
  const data = getAllPortfolioItems();
  const featuredItems = data.slice(0, 6);

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
          {featuredItems.map((item, index) => (
            <CardPortfolio
              key={index}
              {...item}
              link={`/portfolio-details/${item.slug}`}
            />
          ))}
        </div>
      </div>
      <div className="cs_height_120 cs_height_lg_80"></div>
    </section>
  );
};

export default PortfolioShowcase;