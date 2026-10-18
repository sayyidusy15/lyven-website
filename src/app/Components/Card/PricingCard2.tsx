import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PricingCard2 = ({ 
  isPopular, // Prop baru untuk menandai kartu "Active" (Tengah)
  name, 
  description, // Deskripsi singkat di bawah harga
  price, 
  duration, 
  featurelist, 
  btnname, 
  btnurl 
}) => {

  // LOGIKA TOMBOL:
  // Jika Popular -> Style 1 (Primary/Blue)
  // Jika Tidak   -> Style 2 (Secondary/Outline)
  const buttonClass = isPopular 
    ? "cs_btn cs_style_1 cs_fs_14 cs_bold text-uppercase w-100 cs_center"
    : "cs_btn cs_style_2 cs_fs_14 cs_bold text-uppercase w-100 cs_center";
  return (
    <div className={`cs_pricing_box ${isPopular ? 'active' : ''}`}>
      
      {/* 1. HEADER: Nama & Badge */}
      <div className="cs_pricing_header_row">
        <h4 className="cs_pricing_name">{name}</h4>
        {isPopular && (
          <span className="cs_popular_badge">Most Popular</span>
        )}
      </div>

      {/* 2. PRICE */}
      <div className="cs_pricing_price_row">
        <h3 className="cs_price_value">{price}</h3>
        <span className="cs_price_duration">{duration}</span>
      </div>

      {/* 3. DESCRIPTION */}
      <p className="cs_pricing_desc">{description}</p>

      {/* 4. BUTTON (Updated Classes) */}
      <div className="cs_pricing_btn_wrapper">
        <Link href={btnurl} className={buttonClass}>
          {/* Tambahkan span agar animasi hover style_1 berjalan lancar */}
          <span>{btnname}</span>
        </Link>
      </div>

      {/* 5. SEPARATOR (Garis Tipis) */}
      <div className="cs_pricing_divider"></div>

      {/* 6. FEATURES */}
      <div className="cs_pricing_features">
        <ul className="cs_pricing_feature_list">
          {featurelist?.map((item, index) => (
            <li key={index}>
              {/* Icon Checkmark */}
              <div className="cs_check_icon">
                 <Image src="/assets/img/icons/checkmark_2.svg" alt="check" width={14} height={14} />
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default PricingCard2;