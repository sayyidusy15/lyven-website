import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import PortfolioShowcase from '../Project/PortfolioShowcase';

// --- DATA DUMMY (Nanti ini diambil dari props/database) ---
// Kita tambahkan field 'projectType' dan 'projectLink'
const projectData = {
  title: 'Simpatik',
  category: 'Packaging Solutions',
  description: 'Simpatik adalah penyedia solusi kemasan fleksibel yang membantu meningkatkan nilai dan daya tarik produk.',
  fullDescription: 'Dengan kualitas terjamin langsung dari pabrik, Simpatik menawarkan pilihan kemasan hemat, praktis, dan kompetitif untuk mendukung kebutuhan bisnis berbagai skala. Kami fokus pada strategi visual yang memikat konsumen.',
  scopeOfWork: ['Social Media Management', 'Ads Management', 'Premium Video Production'],
  
  // BAGIAN PENTING UNTUK LOGIKA ICON:
  // Pilihan type: 'website', 'instagram', 'app', 'behance', 'dribbble'
  projectType: 'instagram', 
  projectLink: 'https://www.instagram.com/simpatik.indonesia',
  projectDisplayLink: '@simpatik.indonesia', // Teks yang muncul
  
  images: [
    '/assets/img/card_1.jpg',   
    '/assets/img/card_10.jpg',  
    '/assets/img/card_11.jpg',  
    '/assets/img/card_12.jpg',  
  ]
};

const PortfolioDetails = () => {

  // --- LOGIC: Menentukan Icon berdasarkan Tipe Project ---
  const getProjectInfo = (type: string) => {
    switch (type) {
      case 'website':
        return { icon: 'bi-globe', label: 'Visit Website', color: 'cs_blue_color' };
      case 'instagram':
        return { icon: 'bi-instagram', label: 'Visit Instagram', color: 'cs_heading_color' }; // Warna IG biasanya hitam/ungu, kita pakai heading color
      case 'app':
        return { icon: 'bi-google-play', label: 'Download App', color: 'cs_accent_color' }; // Bisa juga bi-apple
      case 'behance':
        return { icon: 'bi-behance', label: 'View on Behance', color: 'cs_blue_color' };
      case 'dribbble':
        return { icon: 'bi-dribbble', label: 'View on Dribbble', color: 'cs_accent_color' };
      default:
        return { icon: 'bi-link-45deg', label: 'Visit Link', color: 'cs_blue_color' };
    }
  };

  const projectConfig = getProjectInfo(projectData.projectType);

  return (
    <section>
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        <div className="row cs_row_gap_30 cs_gap_y_40">
          
          {/* --- KOLOM KIRI (Sticky) --- */}
          <div className="col-lg-5">
            <div className="cs_sticky_sidebar" style={{ position: 'sticky', top: '120px' }}>
               
               {/* 1. UPDATE BREADCRUMB (Navigasi) */}
               <div className="cs_mb_16 cs_fs_16 cs_medium text-uppercase">
                 {/* Home -> Clickable */}
                 <Link href="/" className="cs_breadcrumb_link">Home</Link>
                 <span className="cs_mx_5">/</span>
                 
                 {/* Portfolio -> Clickable */}
                 <Link href="/portfolio-list" className="cs_breadcrumb_link">Portfolio</Link>
                 <span className="cs_mx_5">/</span>
                 
                 {/* Halaman Sekarang -> Hitam & Mati */}
                 <span className="cs_heading_color cs_semibold">
                    {projectData.title}
                 </span>
              </div>

              <h2 className="cs_fs_40 cs_bold cs_mb_24">{projectData.title}</h2>
              <p className="cs_mb_20 cs_fs_18 cs_heading_color">
                {projectData.description}
              </p>
              <p className="cs_mb_30 text-muted">
                {projectData.fullDescription}
              </p>

              {/* Scope of Work */}
              <div className="cs_gray_bg_1 cs_radius_20 cs_mb_30" style={{ padding: '30px' }}>
                <h3 className="cs_fs_20 cs_bold cs_mb_20">Scope of Work:</h3>
                <ul className="cs_list cs_style_1 cs_type_1 cs_mp_0">
                  {projectData.scopeOfWork.map((item) => (
                    <li key={item} className="cs_mb_12">
                      <span className="cs_list_icon cs_center cs_accent_bg_10 cs_accent_color">
                        <i className="bi bi-check-lg"></i>
                      </span>
                      <span className="cs_list_text cs_fs_16 cs_medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. UPDATE DYNAMIC CONTACT CARD */}
              <div className="cs_radius_20 cs_white_bg cs_shadow_1" style={{ padding: '30px', border: '1px solid #EFF0F6' }}>
                <h4 className="cs_fs_18 cs_bold cs_mb_15">Project Link</h4>
                
                <div className="cs_mb_20 d-flex align-items-center gap-2">
                    {/* Icon berubah dinamis */}
                    <i className={`bi ${projectConfig.icon} cs_fs_20`}></i>
                    
                    <Link
                        href={projectData.projectLink}
                        target="_blank"
                        rel="noreferrer"
                        className={`cs_medium text-decoration-underline ${projectConfig.color}`}
                    >
                        {projectData.projectDisplayLink}
                    </Link>
                </div>

                <Link href="/contact" className="cs_btn cs_style_1 cs_fs_16 cs_semibold text-uppercase w-100 cs_center">
                  <span>Hubungi Kami Sekarang</span>
                </Link>
              </div>

            </div>
          </div>

          {/* --- KOLOM KANAN (Gambar) --- */}
          <div className="col-lg-7">
            <div className="d-flex flex-column gap-4"> 
                {projectData.images.map((image, index) => (
                    <div className="cs_detail_img_card" key={index}>
                        <div className="cs_detail_img_inner">
                            <Image
                                src={image}
                                alt={`Visual ${projectData.title} ${index + 1}`}
                                width={800} 
                                height={1000}
                                className="w-100 h-auto"
                                style={{ display: 'block' }}
                                quality={90}
                            />
                        </div>
                    </div>
                ))}
            </div>
          </div>

        </div>
      </div>
      <div className="cs_height_120 cs_height_lg_80"></div>

      <PortfolioShowcase/> 
    </section>
  );
};

export default PortfolioDetails;