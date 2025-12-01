import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="cs_error_page cs_center cs_gray_bg_2" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container">
        <div className="cs_section_heading cs_style_1 text-center">
          <h1 className="cs_bold cs_accent_color" style={{ fontSize: '150px', lineHeight: '1', marginBottom: '20px' }}>
            404
          </h1>
          <h2 className="cs_section_title cs_fs_48 cs_bold cs_mb_20">
            Oops! Page Not Found
          </h2>
          <p className="cs_section_desc cs_fs_18 cs_mb_40 text-muted m-auto" style={{ maxWidth: '600px' }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="cs_height_50 cs_height_lg_80"></div>
          <Link href="/" className="cs_btn cs_style_1 cs_fs_16 cs_bold">
            <span>Back To Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
