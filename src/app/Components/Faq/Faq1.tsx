"use client"
import React, { useEffect, useRef, useState } from 'react';
// import loadBackgroudImages from '../Common/loadBackgroudImages';
// import VideoModal from '../VideoModal/VideoModal';
// import Image from 'next/image';

const Faq1 = () => {

  // DATA DUMMY: Dibuat jadi 8 item agar pas 4 kiri - 4 kanan
  const faqContent = [
    { title: 'How do I start a project with you?', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.' },
    { title: 'What is your design process?', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.' },
    { title: 'Do you provide website maintenance?', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.' },
    { title: 'Can you help with SEO optimization?', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.' },
    // --- Batas Kolom Kiri ---
    { title: 'What is the estimated timeline?', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.' },
    { title: 'Do you offer custom development?', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.' },
    { title: 'What are your payment terms?', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.' },
    { title: 'Is hosting included in the package?', content: 'Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio.' },
  ];

  const [openItemIndex, setOpenItemIndex] = useState(-1);
  const [firstItemOpen, setFirstItemOpen] = useState(true);

  const handleItemClick = index => {
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

  // Membagi data menjadi 2 bagian
  const leftColumnData = faqContent.slice(0, 4);
  const rightColumnData = faqContent.slice(4, 8);

  return (
    <section className="position-relative overflow-hidden">
      <div className="cs_height_60 cs_height_lg_80"></div>
      <div className="container">
        
        {/* HEADER SECTION (Tengah) */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="cs_section_heading cs_style_1 text-center cs_mb_50">
             
              <h2 className="cs_fs_48 mb-3 wow fadeInUp">Frequently Asked Questions</h2>
              <p className="cs_section_desc cs_fs_18 mb-0 text-muted wow fadeInUp" data-wow-delay="0.2s">
                Temukan jawaban atas pertanyaan yang sering diajukan mengenai layanan kami.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ CONTENT 2 KOLOM */}
        <div className="row cs_row_gap_30">
          
          {/* KOLOM KIRI (Item 1-4) */}
          <div className="col-lg-6">
            <div className="cs_accordians cs_style_1">
              {leftColumnData.map((item, index) => (
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

          {/* KOLOM KANAN (Item 5-8) */}
          <div className="col-lg-6">
            <div className="cs_accordians cs_style_1">
              {rightColumnData.map((item, index) => {
                // KOREKSI INDEX: Index di map ini mulai dari 0 lagi.
                // Kita harus tambah 4 agar sesuai dengan index global (4,5,6,7)
                const realIndex = index + 4; 
                
                return (
                  <div key={realIndex} className={`cs_accordian cs_style_1 ${realIndex === openItemIndex ? "active" : ""}`}>
                    <div onClick={() => handleItemClick(realIndex)} className="cs_accordian_head position-relative">
                      <h2 className="cs_accordian_title cs_fs_20 cs_semibold mb-0">{item.title}</h2>
                      <span className="cs_accordian_toggler cs_heading_color position-absolute">
                        <i className="bi bi-chevron-double-right"></i>
                      </span>
                    </div>
                    <div className="cs_accordian_body">
                      <p>{item.content}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

      </div>
      <div className="cs_height_120 cs_height_lg_80"></div>
    </section>
  );
};

export default Faq1;