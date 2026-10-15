import Link from 'next/link';
import React from 'react';

const serviceCategories = [
  {
    title: 'Profile Websites',
    icon: 'bi-person-badge', // Opsional: Tambah icon biar cantik
    items: [
      { label: 'Website Company Profile', url: '/service/company-profile' },
      { label: 'Export & Commodity Website', url: '/service/ekspor' },
      { label: 'School Website', url: '/service/sekolah' },
      { label: 'Community / Organization Website', url: '/service/organisasi' },
    ],
  },
  {
    title: 'Booking System',
    icon: 'bi-calendar-check',
    items: [
      { label: 'Tour & Travel Website', url: '/service/tour-travel' },
      { label: 'Car Rental Website', url: '/service/rental' },
      { label: 'Hotel / Villa Website', url: '/service/hotel' },
      { label: 'Equipment Rental Website', url: '/service/sewa' },
    ],
  },
  {
    title: 'Online Stores',
    icon: 'bi-cart3',
    items: [
      { label: 'Website E-Commerce', url: '/service/ecommerce' },
      { label: 'WhatsApp Checkout Store', url: '/service/toko-wa' },
      { label: 'Food & Beverage Catalog', url: '/service/fnb' },
      { label: 'Product Landing Page', url: '/service/landing-page' },
    ],
  },
];

const ServiceCategory = () => {
  return (
    <section>
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        
        {/* HEADER SECTION */}
        <div className="row align-items-center cs_mb_50">
          <div className="col-lg-6">
            <div className="cs_section_heading cs_style_1">
              
              {/* Tambahkan class responsive font jika perlu, tapi CSS diatas sudah menangani */}
              <h2 className="cs_fs_32 cs_bold mb-0 text-uppercase">
                WEBSITE SOLUTIONS <br /> FOR YOUR BUSINESS
              </h2>
            </div>
          </div>
          <div className="col-lg-6">
            <p className="cs_section_desc text-end mb-0 cs_mobile_text_left">
              Choose the website solution that best fits your business model.
              We provide focused, measurable development designed around real outcomes.
            </p>
          </div>
        </div>

        {/* CONTENT SECTION */}
        {/* UPDATE DI SINI: Tambahkan 'cs_gap_y_30' untuk jaga-jaga */}
        <div className="row cs_row_gap_30 cs_gap_y_30"> 
          {serviceCategories.map((category, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              
              <div className="cs_service_group_card cs_radius_20">
                
                {/* Header Kartu */}
                <div className="cs_sg_header cs_mb_25">
                  <div className="cs_sg_icon_box cs_center cs_mb_20">
                     <i className={`bi ${category.icon}`}></i>
                  </div>
                  <h3 className="cs_fs_24 cs_bold cs_heading_color mb-0">
                    {category.title}
                  </h3>
                </div>

                {/* List Item */}
                <ul className="cs_sg_list cs_mp_0">
                  {category.items.map((item, i) => (
                    <li key={i}>
                      <Link href={item.url} className="cs_sg_link">
                        <span className="cs_sg_label">{item.label}</span>
                        <span className="cs_sg_arrow">
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}
        </div>

      </div>
     
    </section>
  );
};

export default ServiceCategory;
