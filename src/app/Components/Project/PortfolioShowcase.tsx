import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Pastikan path logo dan image sudah benar
const portfolioItems = [
  {
    image: '/assets/img/project_1.jpg',
    companyLogo: '/assets/img/brand_1.svg',
    title: 'IndiTV Home',
    categories: ['E-Commerce','Website','Finance'], // Disingkat agar muat
    technologies: [
      { name: 'logo', logo: '/assets/img/tech_portfolio1.jpg' }, 
      { name: 'logo', logo: '/assets/img/tech_portfolio2.jpg' },
      { name: 'logo', logo: '/assets/img/tech_portfolio4.jpg' }, 
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_1.jpg',
    companyLogo: '/assets/img/brand_1.svg',
    title: 'IndiTV Home',
    categories: ['E-Commerce','Website','Finance'], // Disingkat agar muat
    technologies: [
      { name: 'logo', logo: '/assets/img/tech_portfolio1.jpg' }, 
      { name: 'logo', logo: '/assets/img/tech_portfolio2.jpg' },
      { name: 'logo', logo: '/assets/img/tech_portfolio4.jpg' }, 
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_1.jpg',
    companyLogo: '/assets/img/brand_1.svg',
    title: 'IndiTV Home',
    categories: ['E-Commerce','Website','Finance'], // Disingkat agar muat
    technologies: [
      { name: 'logo', logo: '/assets/img/tech_portfolio1.jpg' }, 
      { name: 'logo', logo: '/assets/img/tech_portfolio2.jpg' },
      { name: 'logo', logo: '/assets/img/tech_portfolio4.jpg' }, 
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_1.jpg',
    companyLogo: '/assets/img/brand_1.svg',
    title: 'IndiTV Home',
    categories: ['E-Commerce','Website','Finance'], // Disingkat agar muat
    technologies: [
      { name: 'logo', logo: '/assets/img/tech_portfolio1.jpg' }, 
      { name: 'logo', logo: '/assets/img/tech_portfolio2.jpg' },
      { name: 'logo', logo: '/assets/img/tech_portfolio4.jpg' }, 
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_1.jpg',
    companyLogo: '/assets/img/brand_1.svg',
    title: 'IndiTV Home',
    categories: ['E-Commerce','Website','Finance'], // Disingkat agar muat
    technologies: [
      { name: 'logo', logo: '/assets/img/tech_portfolio1.jpg' }, 
      { name: 'logo', logo: '/assets/img/tech_portfolio2.jpg' },
      { name: 'logo', logo: '/assets/img/tech_portfolio4.jpg' }, 
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_1.jpg',
    companyLogo: '/assets/img/brand_1.svg',
    title: 'IndiTV Home',
    categories: ['E-Commerce','Website','Finance'], // Disingkat agar muat
    technologies: [
      { name: 'logo', logo: '/assets/img/tech_portfolio1.jpg' }, 
      { name: 'logo', logo: '/assets/img/tech_portfolio2.jpg' },
      { name: 'logo', logo: '/assets/img/tech_portfolio4.jpg' }, 
    ],
    link: '/project/project-details',
  },
  

  
];

const PortfolioShowcase = () => {
  return (
    <section className="cs_portfolio_section">
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        {/* Header Section Tetap Sama */}
        <div className="cs_portfolio_header d-flex align-items-start justify-content-between flex-wrap gap-3 mb-5">
          <div>
            <h2 className="cs_fs_48 mb-2">We build ONLY what customers love</h2>
            <p className="cs_section_heading_text mb-0">
              Beautifully designed, passionately engineered, and incredibly reliable
            </p>
          </div>
          <Link href="/project" className="cs_btn cs_style_1 cs_fs_16 cs_bold text-uppercase">
            <span>See more portfolio</span>
          </Link>
        </div>

        {/* Grid Section */}
        <div className="cs_portfolio_grid">
          {portfolioItems.map((item, index) => (
            <Link href={item.link} key={index} className="cs_portfolio_card">
              
              {/* 1. Gambar Utama */}
              <div className="cs_portfolio_image">
                <Image
                  src={item.image}
                  alt={`${item.title} preview`}
                  fill
                  className="cs_portfolio_img"
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                />
              </div>

              {/* 2. Konten Bawah */}
              <div className="cs_portfolio_content">
                
                {/* Logo Brand (Tanpa kotak border) */}
                <div className="cs_brand_logo_container">
                  <Image 
                    src={item.companyLogo} 
                    alt={`${item.title} logo`} 
                    width={100} /* Beri lebar max yang cukup */
                    height={30} 
                    className="object-fit-contain object-position-left" // Pastikan ada class ini atau inline style
                    style={{ objectFit: 'contain', objectPosition: 'left' }}
                  />
                </div>

                {/* Judul Project */}
                <h3 className="cs_project_title">{item.title}</h3>

                {/* Footer: Kategori (Kiri) & Tech Icons (Kanan) */}
                {/* Footer: Kategori (Kiri) & Tech Icons (Kanan) */}
                <div className="cs_card_footer">
                <span className="cs_category_text">
                    {item.categories.join(' • ')}
                </span>

                <div className="cs_tech_stack_row">
                    {item.technologies.map((tech, i) => (
                    <div key={i} className="cs_tech_icon_wrapper">
                        {/* UPDATE BAGIAN INI */}
                        <Image 
                            src={tech.logo} 
                            alt={tech.name} 
                            width={26}  /* UBAH DISINI: Sesuaikan dengan CSS baru (26) */
                            height={26} /* UBAH DISINI: Sesuaikan dengan CSS baru (26) */
                            className="cs_tech_icon"
                        />
                    </div>
                    ))}
                </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="cs_height_120 cs_height_lg_80"></div>
    </section>
  );
};

export default PortfolioShowcase;