import Link from 'next/link';
import React from 'react';

// Data Dummy sesuai gambar
const serviceCategories = [
  {
    title: 'Web Profil',
    items: [
      { label: 'Website Company Profile', url: '/service/company-profile' },
      { label: 'Website Ekspor Komoditas', url: '/service/ekspor' },
      { label: 'Website Sekolah', url: '/service/sekolah' },
      { label: 'Website Komunitas / Organisasi', url: '/service/organisasi' },
    ],
  },
  {
    title: 'Booking',
    items: [
      { label: 'Website Tour Travel', url: '/service/tour-travel' },
      { label: 'Website Rental Mobil', url: '/service/rental' },
      { label: 'Website Hotel / Villa', url: '/service/hotel' },
      { label: 'Website Sewa Barang', url: '/service/sewa' },
    ],
  },
  {
    title: 'Toko Online',
    items: [
      { label: 'Website E-Commerce', url: '/service/ecommerce' },
      { label: 'Toko Online Checkout via WA', url: '/service/toko-wa' },
      { label: 'Website Katalog FnB', url: '/service/fnb' },
      { label: 'Landing Page Produk', url: '/service/landing-page' },
    ],
  },
];

const ServiceCategory = () => {
  return (
    <section>
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        
        {/* --- HEADER SECTION --- */}
        <div className="row align-items-center cs_mb_50">
          <div className="col-lg-6">
            <div className="cs_section_heading cs_style_1">
              {/* <span className="cs_section_badge cs_mb_20">JASA WEBSITE</span> */}
              <h2 className="cs_fs_40 cs_bold mb-0 text-uppercase">
                PILIHAN JENIS <br /> JASA PEMBUATAN WEBSITE
              </h2>
            </div>
          </div>
          <div className="col-lg-6">
            <p className="cs_section_desc text-end mb-0 cs_mobile_text_left">
              Dengan Proses Pembuatan Website yang terstruktur dan jelas. Kami menjamin
              kepuasan kamu atas Website yang kami buat. Hindari jasa pembuatan website yang
              hanya mementingkan kata Deal ketimbang Kerjasama jangka panjang.
            </p>
          </div>
        </div>

        {/* --- CARD SECTION (Purple/Blue Gradient) --- */}
        <div className="cs_service_category_card cs_radius_20">
          <div className="row cs_row_gap_30">
            {serviceCategories.map((category, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="cs_sc_column">
                  <h3 className="cs_sc_title cs_fs_24 cs_bold cs_white_color cs_mb_20">
                    {category.title}
                  </h3>
                  <ul className="cs_sc_list cs_mp_0">
                    {category.items.map((item, i) => (
                      <li key={i}>
                        <Link href={item.url} className="cs_sc_link">
                          <span className="cs_sc_label">{item.label}</span>
                          <span className="cs_sc_icon">
                            <i className="bi bi-arrow-up-right"></i>
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

      </div>
      {/* <div className="cs_height_120 cs_height_lg_80"></div> */}
    </section>
  );
};

export default ServiceCategory;