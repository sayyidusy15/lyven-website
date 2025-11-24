import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Data Dummy: 6 Item (Agar pas layout 2 Kolom x 3 Baris)
const portfolioItems = [
  {
    image: '/assets/img/project_1.jpg',
    companyLogo: '/assets/img/brand_1.svg',
    title: 'IndiTV Home',
    categories: ['Streaming', 'VOD'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'Tech 2', logo: '/assets/img/tech_portfolio2.jpg' },
      { name: 'Tech 3', logo: '/assets/img/tech_portfolio4.jpg' },
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_3.jpg',
    companyLogo: '/assets/img/brand_6.svg',
    title: 'MRT Jakarta',
    categories: ['Transport', 'App'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'Tech 2', logo: '/assets/img/tech_portfolio2.jpg' },
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_2.jpg',
    companyLogo: '/assets/img/brand_4.svg',
    title: 'NBS TV',
    categories: ['News', 'Live'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'Tech 2', logo: '/assets/img/tech_portfolio2.jpg' },
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_4.jpg',
    companyLogo: '/assets/img/brand_8.svg',
    title: 'Paragon SFM',
    categories: ['Sales', 'B2B'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_5.jpg',
    companyLogo: '/assets/img/brand_9.svg',
    title: 'TIX ID',
    categories: ['Ticketing', 'Movie'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'Tech 2', logo: '/assets/img/tech_portfolio2.jpg' },
    ],
    link: '/project/project-details',
  },
  {
    image: '/assets/img/project_6.jpg',
    companyLogo: '/assets/img/brand_10.svg',
    title: 'Eraspace',
    categories: ['E-Commerce', 'Shop'],
    technologies: [
      { name: 'Tech 1', logo: '/assets/img/tech_portfolio1.jpg' },
      { name: 'Tech 2', logo: '/assets/img/tech_portfolio2.jpg' },
    ],
    link: '/project/project-details',
  },
];

const PortfolioList = () => {
  return (
    <section>
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        <div className="row cs_row_gap_30 cs_gap_y_60">
          
          {/* --- SIDEBAR (Kiri) --- */}
          <aside className="col-xl-4 col-lg-5">
            <div className="cs_sidebar cs_style_1 cs_type_1">
              {/* Widget Categories */}
              <div className="cs_sidebar_widget cs_gray_bg_1 cs_radius_10 wow fadeInDown">
                <h3 className="cs_sidebar_widget_title cs_fs_22 cs_mb_22">Categories</h3>
                <ul className="cs_service_category_list cs_medium cs_mp_0">
                  <li className="active"><a href="#"><span>All Projects</span><span> (25)</span></a></li>
                  <li><a href="#"><span>Web Development</span><span> (7)</span></a></li>
                  <li><a href="#"><span>UI/UX Design</span><span> (4)</span></a></li>
                  <li><a href="#"><span>Mobile Apps</span><span> (5)</span></a></li>
                  <li><a href="#"><span>Digital Marketing</span><span> (3)</span></a></li>
                  <li><a href="#"><span>Branding</span><span> (6)</span></a></li>
                </ul>
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT (Kanan) --- */}
          <div className="col-xl-8 col-lg-7">
            
            {/* Grid Container (2 Kolom) */}
            <div className="cs_portfolio_list_grid">
              
              {/* Looping Card */}
              {portfolioItems.map((item, index) => (
                <Link href={item.link} key={index} className="cs_portfolio_card">
                  
                  {/* 1. Gambar Utama */}
                  <div className="cs_portfolio_image">
                    <Image
                      src={item.image}
                      alt={`${item.title} preview`}
                      fill
                      className="cs_portfolio_img"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* 2. Konten Bawah */}
                  <div className="cs_portfolio_content">
                    
                    {/* Logo Brand */}
                    <div className="cs_brand_logo_container">
                      <Image 
                        src={item.companyLogo} 
                        alt={`${item.title} logo`} 
                        width={100} 
                        height={30} 
                        className="object-fit-contain object-position-left"
                        style={{ objectFit: 'contain', objectPosition: 'left' }}
                      />
                    </div>

                    {/* Judul Project */}
                    <h3 className="cs_project_title">{item.title}</h3>

                    {/* Footer: Kategori & Tech Icons */}
                    <div className="cs_card_footer">
                      <span className="cs_category_text">
                        {item.categories.join(' • ')}
                      </span>

                      <div className="cs_tech_stack_row">
                        {item.technologies.map((tech, i) => (
                          <div key={i} className="cs_tech_icon_wrapper">
                            <Image 
                                src={tech.logo} 
                                alt={tech.name} 
                                width={26}  /* Sesuai request: 26px */
                                height={26} 
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

            {/* --- PAGINATION (1 - 5 dengan Panah) --- */}
            <div className="cs_pagination_box cs_mt_60 cs_center">
                <ul className="cs_pagination">
                    <li>
                        <a href="#" className="cs_pagination_item cs_center">
                            <i className="bi bi-arrow-left"></i>
                        </a>
                    </li>
                    <li><a href="#" className="cs_pagination_item cs_center active">1</a></li>
                    <li><a href="#" className="cs_pagination_item cs_center">2</a></li>
                    <li><a href="#" className="cs_pagination_item cs_center">3</a></li>
                    <li><a href="#" className="cs_pagination_item cs_center">4</a></li>
                    <li><a href="#" className="cs_pagination_item cs_center">5</a></li>
                    <li>
                        <a href="#" className="cs_pagination_item cs_center">
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </li>
                </ul>
            </div>

          </div>
        </div>
      </div>
      <div className="cs_height_120 cs_height_lg_80"></div>
    </section>
  );
};

export default PortfolioList;