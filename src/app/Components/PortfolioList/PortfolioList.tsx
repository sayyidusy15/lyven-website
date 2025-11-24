import React from 'react';
import Image from 'next/image';
import CardPortfolio from '../Card/CardPortfolio';
// Sesuaikan path import ini
import { portfolioData } from '../../../data/portfolioData';

const PortfolioList = () => {
  
  // LOGIC: Ambil hanya 6 data pertama
  // slice(0, 6) artinya mulai dari index 0, ambil sampai sebelum index 6
  const visibleItems = portfolioData.slice(0, 6);

  return (
    <section>
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        <div className="row cs_row_gap_30 cs_gap_y_60">
          
          {/* --- SIDEBAR --- */}
          <aside className="col-xl-4 col-lg-5">
            <div className="cs_sidebar cs_style_1 cs_type_1">
              <div className="cs_sidebar_widget cs_gray_bg_1 cs_radius_10 wow fadeInDown">
                <h3 className="cs_sidebar_widget_title cs_fs_22 cs_mb_22">Categories</h3>
                <ul className="cs_service_category_list cs_medium cs_mp_0">
                  <li className="active"><a href="#"><span>All Projects</span><span> (25)</span></a></li>
                  <li><a href="#"><span>Web Development</span><span> (7)</span></a></li>
                  <li><a href="#"><span>UI/UX Design</span><span> (4)</span></a></li>
                  <li><a href="#"><span>Mobile Apps</span><span> (5)</span></a></li>
                  <li><a href="#"><span>Digital Marketing</span><span> (3)</span></a></li>
                  <li><a href="#"><span>Branding</span><span> (6)</span></a></li>
                </ul>
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <div className="col-xl-8 col-lg-7">
            
            {/* Grid Container */}
            <div className="cs_portfolio_list_grid">
              {/* Mapping dari variable visibleItems, bukan portfolioData langsung */}
              {visibleItems.map((item, index) => (
                <CardPortfolio key={index} {...item} />
              ))}
            </div>

            {/* --- PAGINATION --- */}
            <div className="cs_pagination_box cs_mt_60 cs_center">
                <ul className="cs_pagination">
                    <li><a href="#" className="cs_pagination_item cs_center"><i className="bi bi-arrow-left"></i></a></li>
                    <li><a href="#" className="cs_pagination_item cs_center active">1</a></li>
                    <li><a href="#" className="cs_pagination_item cs_center">2</a></li>
                    <li><a href="#" className="cs_pagination_item cs_center">3</a></li>
                    <li><a href="#" className="cs_pagination_item cs_center">4</a></li>
                    <li><a href="#" className="cs_pagination_item cs_center">5</a></li>
                    <li><a href="#" className="cs_pagination_item cs_center"><i className="bi bi-arrow-right"></i></a></li>
                </ul>
            </div>

          </div>
        </div>
      </div>
      <div className="cs_height_120 cs_height_lg_80"></div>
    </section>
  );
};

export default PortfolioList;