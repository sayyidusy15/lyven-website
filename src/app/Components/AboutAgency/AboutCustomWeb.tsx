import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutCustomWeb = () => {
  return (
    <section>
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        <div className="row align-items-center cs_gap_y_40">
          <div className="col-lg-5">
             <div className="cs_about_thumb_1">
                <Image 
                  src="/assets/img/about_img_1.jpg" 
                  alt="Web Development" 
                  width={600} 
                  height={450} 
                  className="w-100 object-fit-cover cs_radius_10"
                  style={{ maxHeight: '450px' }}
                />
             </div>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div className="cs_about_content">
              <div className="cs_section_heading cs_style_1">
                <p className="cs_section_subtitle cs_accent_color cs_fs_18 cs_medium cs_mb_10 text-uppercase">
                  PROFESSIONAL WEB DEVELOPER
                </p>
                <h2 className="cs_section_title cs_fs_36 cs_bold cs_mb_20">
                  Professional Custom Website Development
                </h2>
                <p className="cs_section_desc cs_fs_16 cs_mb_20 text-muted">
                  Modern tools make it easier to launch websites quickly, but many limit the custom functionality required by real business and industry workflows.
                </p>
                <p className="cs_section_desc cs_fs_16 text-muted mb-0">
                  We solve that limitation by building optimized websites with the features, structure, and visual direction your business actually needs.
                </p>
                {/* <div className="cs_height_50"></div>
                <Link href="/contact" className="cs_btn cs_style_1 cs_fs_16 cs_bold">
                  <span>Start a Consultation</span>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cs_height_120 cs_height_lg_80"></div>
    </section>
  );
};

export default AboutCustomWeb;
