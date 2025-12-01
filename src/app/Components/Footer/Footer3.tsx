"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer3 = () => {
  return (
    <footer className="cs_footer cs_style_3 bg-white pt-5 pb-5 border-top">
      <div className="container">
        <div className="row">
          {/* Column 1: Company Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h3 className="cs_fs_20 cs_bold cs_mb_20" style={{ color: '#1e0058' }}>PT JASTER INTERMEDIA NETWORK</h3>
            <p className="cs_mb_20 text-muted" style={{ lineHeight: '1.6' }}>
              JasterMedia fokus pada penyedia Layanan Jasa Pembuatan Website Profesional. Kami mempunyai tujuan untuk selalu membantu UMKM, Business Owner Hingga Organisasi yang membutuhkan Website Hemat di kantong, Tampilan Menarik dan Standart Tinggi. 2015 Hingga saat ini JasterMedia telah membantu lebih dari 850++ Klien dalam dan luar Negeri.
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h3 className="cs_fs_20 cs_bold cs_mb_20" style={{ color: '#1e0058' }}>SERVICES</h3>
            <ul className="list-unstyled">
              {[
                'Jasa Pembuatan Website',
                'Jasa Website Custom',
                'Jasa Redesign Website',
                'Iklan Google Ads',
                'Aplikasi Android / iOS',
                'Optimasi SEO',
                'Jasa Pembuatan Logo',
                'UI / UX Design'
              ].map((item, index) => (
                <li key={index} className="mb-2">
                  <Link href="#" className="text-muted text-decoration-none d-flex align-items-center gap-2 cs_hover_primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h3 className="cs_fs_20 cs_bold cs_mb_20" style={{ color: '#1e0058' }}>COMPANY</h3>
            <ul className="list-unstyled">
              {[
                'Profil Kami',
                'Syarat dan Ketentuan Layanan',
                'Pertanyaan Umum',
                'Kontak Kami',
                'Blog Artikel',
                'Portofolio'
              ].map((item, index) => (
                <li key={index} className="mb-2">
                  <Link href="#" className="text-muted text-decoration-none d-flex align-items-center gap-2 cs_hover_primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="col-lg-4 col-md-6 mb-4">
             <h3 className="cs_fs_20 cs_bold cs_mb_20" style={{ color: '#1e0058' }}>CONTACT US</h3>
             <ul className="list-unstyled">
                <li className="mb-3 d-flex gap-2 align-items-center">
                    <i className="bi bi-whatsapp cs_accent_color cs_fs_18"></i>
                    <span className="text-muted">0812 3456 6636 (WA)</span>
                </li>
                <li className="mb-3 d-flex gap-2 align-items-center">
                    <i className="bi bi-envelope cs_accent_color cs_fs_18"></i>
                    <span className="text-muted">hello@gosocial.co.id</span>
                </li>
                <li className="mb-3 d-flex gap-2 align-items-start">
                    <i className="bi bi-geo-alt-fill cs_accent_color cs_fs_18 mt-1"></i>
                    <span className="text-muted">Bumi Mandiri Tower II, Jl.Panglima Sudirman No.66-68, Surabaya, Indonesia</span>
                </li>
             </ul>
          </div>
          </div>
        
        <div className="cs_footer_bottom border-top pt-4 mt-4">
          <div className="row align-items-center">
            <div className="col-md-4 mb-3 mb-md-0">
              <Link href="/" className="d-inline-block">
                <Image src="/assets/img/logo.svg" alt="Lyven Logo" width={100} height={30} className="img-fluid" />
              </Link>
            </div>
            <div className="col-md-4 mb-3 mb-md-0 text-center">
                <div className="d-flex gap-3 justify-content-center">
                    <a href="#" className="cs_fs_20 text-dark cs_hover_primary"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="cs_fs_20 text-dark cs_hover_primary"><i className="bi bi-tiktok"></i></a>
                    <a href="#" className="cs_fs_20 text-dark cs_hover_primary"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="cs_fs_20 text-dark cs_hover_primary"><i className="bi bi-youtube"></i></a>
                    <a href="#" className="cs_fs_20 text-dark cs_hover_primary"><i className="bi bi-whatsapp"></i></a>
                </div>
            </div>
            <div className="col-md-4 text-md-end">
              <p className="mb-0 text-muted cs_fs_14">
                &copy; {new Date().getFullYear()} Lyven. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cs_hover_primary:hover {
          color: #007bff !important;
          transition: color 0.3s ease;
        }
        .cs_hover_primary {
          transition: color 0.3s ease;
        }
      `}</style>
    </footer>
  );
};

export default Footer3;
