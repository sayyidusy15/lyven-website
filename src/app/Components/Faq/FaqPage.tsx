"use client"
import React, { useEffect, useState } from 'react';

const FaqPage = () => {

  // Custom Data for FAQ Page
  const faqContent = [
    { title: 'Apa saja layanan yang ditawarkan?', content: 'Kami menawarkan berbagai layanan digital mulai dari pembuatan website, pengembangan aplikasi mobile, desain grafis, hingga pemasaran digital.' },
    { title: 'Berapa lama waktu pengerjaan website?', content: 'Waktu pengerjaan tergantung pada kompleksitas proyek. Untuk website profil perusahaan standar, biasanya memakan waktu 1-2 minggu.' },
    { title: 'Apakah ada garansi setelah website selesai?', content: 'Ya, kami memberikan garansi maintenance gratis selama periode tertentu setelah website diluncurkan untuk memastikan semuanya berjalan lancar.' },
    { title: 'Bagaimana sistem pembayarannya?', content: 'Kami menerapkan sistem pembayaran bertahap (termin), biasanya dengan DP di awal dan pelunasan setelah proyek selesai.' },
    // --- Batas Kolom Kiri ---
    { title: 'Apakah bisa request fitur custom?', content: 'Tentu saja! Kami spesialis dalam pengembangan custom. Sampaikan kebutuhan Anda, dan kami akan buatkan solusinya.' },
    { title: 'Apakah website yang dibuat SEO friendly?', content: 'Ya, semua website yang kami bangun sudah dioptimasi dasar untuk SEO agar mudah ditemukan di mesin pencari.' },
    { title: 'Apakah saya akan mendapatkan akses penuh?', content: 'Ya, Anda akan mendapatkan akses penuh ke admin panel website dan hosting (jika hosting dari kami).' },
    { title: 'Bagaimana jika saya butuh bantuan di kemudian hari?', content: 'Tim support kami siap membantu Anda. Anda bisa menghubungi kami kapan saja melalui WhatsApp atau Email.' },
  ];

  const [openItemIndex, setOpenItemIndex] = useState(-1);
  const [firstItemOpen, setFirstItemOpen] = useState(true);

  const handleItemClick = (index: number) => {
    if (index === openItemIndex) {
      setOpenItemIndex(-1);
    } else {
      setOpenItemIndex(index);
    }
  };

  useEffect(() => {
    if (firstItemOpen) {
      setOpenItemIndex(0); // Item pertama (kiri atas) terbuka default
      setFirstItemOpen(false);
    }
  }, [firstItemOpen]);



  return (
    <section className="position-relative overflow-hidden">
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        
        {/* HEADER SECTION (Tengah) */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="cs_section_heading cs_style_1 text-center cs_mb_50">
             
              <h2 className="cs_fs_32 mb-3 wow fadeInUp">Frequently Asked Questions</h2>
              <p className="cs_section_desc cs_fs_16 mb-0 text-muted wow fadeInUp text-center" data-wow-delay="0.2s">
                Berikut adalah beberapa pertanyaan umum yang sering diajukan oleh klien kami.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ CONTENT 1 KOLOM */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="cs_accordians cs_style_1">
              {faqContent.map((item, index) => (
                <div key={index} className={`cs_accordian cs_style_1 ${index === openItemIndex ? "active" : ""}`}>
                  <div onClick={() => handleItemClick(index)} className="cs_accordian_head position-relative">
                    <h2 className="cs_accordian_title cs_fs_20 cs_semibold mb-0">{item.title}</h2>
                    <span className="cs_accordian_toggler cs_heading_color position-absolute">
                      <i className="bi bi-chevron-double-right"></i>
                    </span>
                  </div>
                  <div className="cs_accordian_body">
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <div className="cs_height_120 cs_height_lg_80"></div>
    </section>
  );
};

export default FaqPage;
