"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Feature = ({ children }: { children: React.ReactNode }) => (
  <div className="d-flex align-items-center gap-3">
    <span
      className="cs_check_circle cs_center cs_radius_50"
      aria-hidden="true"
      style={{
        width: 28,
        height: 28,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2B6CF6",
        color: "#fff",
        borderRadius: "50%",
      }}
    >
      <svg
        width="12"
        height="10"
        viewBox="0 0 12 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M10.6667 1L4.33333 8L1.33333 4.66667"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    <span>{children}</span>
  </div>
);

const Herobanner4 = () => {
  return (
    <section className="cs_hero cs_style_4" aria-label="Mobile developer hero">
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6">
            <div className="cs_hero_text_block">
              {/* small partner badge */}
              <div className="mb-3">
                <span className="partner-badge" role="note">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 0 0-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.538 1.118l-3.37-2.447a1 1 0 0 0-1.176 0l-3.37 2.447c-.783.57-1.838-.197-1.538-1.118l1.287-3.95a1 1 0 0 0-.364-1.118L2.063 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.95z" />
                  </svg>
                  <span>Partner pembuatan website bisnis &amp; UMKM</span>
                </span>
              </div>

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

              {/* features - two column grid */}
              <div className="row cs_mb_32">
                <div className="col-6">
                  <Feature>Desain modern</Feature>
                </div>
                <div className="col-6">
                  <Feature>Free domain &amp; hosting</Feature>
                </div>
                <div className="col-6 mt-3">
                  <Feature>SEO-ready &amp; cepat diakses</Feature>
                </div>
                <div className="col-6 mt-3">
                  <Feature>Support &amp; maintenance rutin</Feature>
                </div>
              </div>

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
