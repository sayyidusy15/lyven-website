"tsx
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Herobanner4 = () => {
  return (
    <section className="cs_hero cs_style_4" aria-label="Hero - Business website" data-background="/assets/img/hero_bg_4.jpg">
      <div className="container">
        <div className="row align-items-center gy-5">
          {/* LEFT: text */}
          <div className="col-lg-6">
            <div className="cs_hero_text_block">

              {/* small partner badge above title */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-2 bg-white text-black rounded-full shadow-sm px-3 py-1 text-sm" role="note">
                  <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.538 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.783.57-1.838-.197-1.538-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.063 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z"/>
                  </svg>
                  <span className="text-sm">Partner pembuatan website bisnis & UMKM</span>
                </span>
              </div>

              <h1 className="cs_fs_48 cs_extra_bold cs_mb_24">Bangun Website Bisnis Profesional & Siap Naikkan Penjualan</h1>

              <p className="cs_mb_24 text-muted">Spesialis Jasa Pembuatan Website kebutuhan Bisnis, Industri Hingga E-Commerce. Gratis Domain, Hosting dan Maintenance Selamanya.</p>

              {/* features list */}
              <ul className="list-unstyled d-flex flex-column gap-3 cs_mb_32">
                <li className="d-flex align-items-center gap-3"><span className="cs_circle_check cs_center cs_radius_50 bg-blue-600 text-white" aria-hidden><svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"/></svg></span><span>Desain modern & mobile-friendly</span></li>
                <li className="d-flex align-items-center gap-3"><span className="cs_circle_check cs_center cs_radius_50 bg-blue-600 text-white" aria-hidden><svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"/></svg></span><span>Free domain & hosting</span></li>
                <li className="d-flex align-items-center gap-3"><span className="cs_circle_check cs_center cs_radius_50 bg-blue-600 text-white" aria-hidden><svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"/></svg></span><span>SEO-ready & cepat diakses</span></li>
                <li className="d-flex align-items-center gap-3"><span className="cs_circle_check cs_center cs_radius_50 bg-blue-600 text-white" aria-hidden><svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd"/></svg></span><span>Support & maintenance rutin</span></li>
              </ul>

              {/* CTAs */}
              <div className="d-flex gap-3">
                <Link href="#services" aria-label="Scroll to services" className="cs_btn cs_style_1 cs_fs_14 cs_bold text-uppercase">
                  <span>Scroll to learn more</span>
                </Link>
                <Link href="/portfolio" aria-label="See portfolio" className="cs_btn cs_style_2 cs_fs_14 cs_bold text-uppercase">
                  <span>See Portfolio</span>
                </Link>
              </div>

            </div>
          </div>

          {/* RIGHT: image / visual */}
          <div className="col-lg-6">
            <div className="cs_visual_panel" aria-hidden="true">
              <div className="cs_visual_gradient"></div>
              <div className="cs_visual_card">
                <div style={{width: '100%', height: 0, paddingBottom: '94%'}}>
                  <Image
                    src="/assets/img/placeholder_370x350.png"
                    alt="showcase"
                    layout="fill"
                    objectFit="cover"
                    className="cs_visual_image"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Herobanner4;