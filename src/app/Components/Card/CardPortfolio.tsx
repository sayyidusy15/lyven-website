import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Import Interface dari file data tadi
import { PortfolioItem } from '../../../lib/portfolio'

// Kita definisikan tipe datanya agar aman (TypeScript)
interface Technology {
  name: string;
  logo: string;
}

interface CardPortfolioProps {
  image: string;
  companyLogo: string;
  title: string;
  categories: string[];
  technologies: Technology[];
  link: string;
}

const CardPortfolio: React.FC<CardPortfolioProps> = ({
  image,
  companyLogo,
  title,
  categories,
  technologies,
  link,
}) => {
  return (
    <Link href={link} className="cs_portfolio_card">
      {/* 1. Gambar Utama */}
      <div className="cs_portfolio_image">
        <Image src={image} alt={title} fill className="cs_portfolio_img" />
      </div>

      {/* 2. Konten Bawah */}
      <div className="cs_portfolio_content">
        {/* Logo Brand */}
        <div className="cs_brand_logo_container" style={{ height: '32px', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
          <Image
            src={companyLogo}
            alt={`${title} logo`}
            width={120}
            height={32}
            style={{
              objectFit: 'contain',
              objectPosition: 'left',
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto'
            }}
          />
        </div>

        {/* Judul Project */}
        <h3 className="cs_project_title">{title}</h3>

        {/* Footer: Kategori & Tech Icons */}
        <div className="cs_card_footer">
          <span className="cs_category_text">{categories.join(' • ')}</span>

          <div className="cs_tech_stack_row">
            {technologies.map((tech, i) => (
              <div key={i} className="cs_tech_icon_wrapper">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={26}
                  height={26}
                  className="cs_tech_icon"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardPortfolio;