import Image from "next/image";
import Link from "next/link";
import React from "react";

const Herobanner4 = () => {
  return (
    <section className="cs_hero cs_style_4" aria-label="Mobile developer hero">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6">
            <div className="cs_hero_text_block">

              

              <h2 className="cs_fs_48 cs_mb_21 wow fadeInUp">
                Jasa Pembuatan Website Profesional & Halaman 1 Google
              </h2>
              <p
                className="cs_section_heading_text mb-21 wow fadeInUp"
                data-wow-delay="200ms"
              >
                Spesialis Jasa Pembuatan Website kebutuhan Bisnis, Industri
                Hingga E-Commerce. Gratis Domain, Hosting dan Maintenance
                Selamanya
              </p>

              <div className="d-flex gap-3">
                <Link
                  href="/"
                  aria-label=""
                  className="cs_btn cs_style_1 cs_fs_14 cs_bold text-uppercase wow fadeInLeft"
                >
                  <span>Scroll to learn more</span>
                </Link>
                <Link
                  href="/"
                  aria-label=""
                  className="cs_btn cs_style_2 cs_fs_14 cs_bold text-uppercase wow fadeInLeft"
                >
                  <span>See Portfolio</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="cs_visual_panel" aria-hidden="true">
              <div className="cs_visual_gradient"></div>
              <div className="cs_visual_card">
                <Image
                  src="/assets/img/casestudy_4.jpg"
                  alt="Developers collaborating in modern office"
                  width={564}
                  height={360}
                  className="cs_visual_image"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herobanner4;
