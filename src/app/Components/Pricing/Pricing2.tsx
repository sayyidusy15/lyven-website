"use client"
import React, { useState } from 'react';
import PricingCard2 from '../Card/PricingCard2';
import PricingTable from './PricingTable';

const Pricing2 = () => {

     const [isActive, setIsActive] = useState('monthly');

     // STATE BARU: Untuk toggle tabel detail
     const [showDetail, setShowDetail] = useState(false);

    return (
        <section className="cs_tabs position-relative">
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          
          {/* HEADER SECTION */}
          <div className="cs_section_heading cs_style_1 cs_type_1 align-items-center ">
           
            <h2 className="cs_fs_48 cs_mb_28 text-capitalize wow fadeInUp">We’ve Offered the best <br/> pricing for you</h2>
             {/* TOGGLE BUTTON (Monthly/Yearly) */}
             <ul className="cs_tab_links cs_style_1 cs_fs_14 cs_mp_0 justify-content-center">
                <li className={` ${isActive === 'monthly' ? 'active' : ''}`} onClick={() => setIsActive('monthly')} >
                    <a href="#monthly">Monthly</a>
                </li>
                <li className={` ${isActive === 'yearly' ? 'active' : ''}`} onClick={() => setIsActive('yearly')}>
                    <a href="#yearly">Yearly <span className="cs_discount_tag">20% Off</span></a>
                </li>
              </ul>
          </div>

          <div className="cs_height_lg_50"></div>
          
          <div className="cs_tab_body">
            
            {/* --- MONTHLY TAB --- */}
            <div className={`cs_tab ${isActive === 'monthly' ? 'active' : ''}`} id="monthly">
              <div className="row cs_row_gap_30 cs_gap_y_30 align-items-start">

                {/* CARD 1: Basic */}
                <div className="col-lg-4 wow fadeInDown">
                    <PricingCard2
                        name="Basic"
                        price="Rp1.500.000"
                        duration="/month"
                        description="For small business looking to collaborate with a complete CRM."
                        featurelist={[
                            "Core CRM Features",
                            "Mail merge",
                            "Shared pipelines"
                        ]}
                        btnname="Add to Edge"
                        btnurl="/contact"
                        isPopular={false}
                    />
                </div>

                {/* CARD 2: PRO (Popular) */}
                <div className="col-lg-4 wow fadeInDown position-relative" data-wow-delay="200ms">
                    
                    {/* COPYWRITING TANDA PANAH (Hiasan) */}
                    {/* <div className="cs_floating_arrow_text">
                        <span className="cs_arrow_icon">⤵</span> Paling banyak di order
                    </div> */}

                    <PricingCard2
                        isPopular={true} // Trigger style merah/active
                        name="Pro+"
                        price="Rp2.500.000"
                        duration="/month"
                        description="For sophisticated teams who need automations and reports."
                        featurelist={[
                            "Advanced reports",
                            "Integrations & automations",
                            "AI Co-Pilot",
                        ]}
                        btnname="Add to Edge"
                        btnurl="/contact"
                    />
                </div>

                {/* CARD 3: Enterprise */}
                <div className="col-lg-4 wow fadeInDown" data-wow-delay="400ms">
                    <PricingCard2
                        name="Enterprise"
                        price="Rp2.500.000"
                        duration="/month"
                        description="For large teams that need to manage access and ensure data quality."
                        featurelist={[
                            "Custom roles",
                            "Data validation",
                            "Dedicated support + CEO line"
                        ]}
                        btnname="Contact Us"
                        btnurl="/contact"
                        isPopular={false}
                    />
                </div>

              </div>
            </div>

            {/* --- YEARLY TAB (Isi datanya sama, harga beda) --- */}
            <div className={`cs_tab ${isActive === 'yearly' ? 'active' : ''}`} id="yearly">
              <div className="row cs_row_gap_30 cs_gap_y_30 align-items-start">
                
                 {/* CARD 1 */}
                 <div className="col-lg-4">
                    <PricingCard2
                        name="Basic"
                        price="Rp4.500.000" // Harga diskon
                        duration="/month"
                        description="For small business looking to collaborate with a complete CRM."
                        featurelist={[ "Core CRM Features", "Mail merge", "Shared pipelines" ]}
                        btnname="Add to Edge"
                        btnurl="/contact"
                        isPopular={false}
                    />
                </div>

                {/* CARD 2 */}
                <div className="col-lg-4 position-relative">
                    {/* <div className="cs_floating_arrow_text">
                        <span className="cs_arrow_icon">⤵</span> Paling banyak di order
                    </div> */}
                    <PricingCard2
                        isPopular={true}
                        name="Pro+"
                        price="Rp2.500.000" // Harga diskon
                        duration="/month"
                        description="For sophisticated teams who need automations and reports."
                        featurelist={[ "Advanced reports", "Integrations & automations", "AI Co-Pilot" ]}
                        btnname="Add to Edge"
                        btnurl="/contact"
                    />
                </div>

                {/* CARD 3 */}
                <div className="col-lg-4">
                    <PricingCard2
                        name="Enterprise"
                        price="Rp2.500.000" // Harga diskon
                        duration="/month"
                        description="For large teams that need to manage access and ensure data quality."
                        featurelist={[ "Custom roles", "Data validation", "Dedicated support + CEO line" ]}
                        btnname="Contact Us"
                        btnurl="/contact"
                        isPopular={false}
                    />
                </div>

              </div>
            </div>
          </div>
        </div>

      

      {/* --- AREA TABEL DETAIL (CONDITIONAL RENDERING) --- */}
      {/* --- WRAPPER ANIMASI SMOOTH --- */}
      {/* Kuncinya di sini: Class 'open' akan memicu animasi CSS */}
      <div className={`cs_pricing_accordion_wrapper ${showDetail ? 'open' : ''}`}>
        <div className="cs_pricing_accordion_inner">
           {/* Tambahkan padding top sedikit agar tidak mepet saat terbuka */}
           <div className="container cs_pt_40"> 
               <PricingTable />
           </div>
        </div>
      </div>

      {/* --- TOMBOL LIHAT DETAIL (TOGGLE) --- */}
      <div className="container text-center cs_mt_60 pt-5">
        <button 
          onClick={() => setShowDetail(!showDetail)}
          className="cs_btn_simple_toggle"
        >
          {showDetail ? 'Sembunyikan Perbandingan' : 'Lihat Detail Lengkap'}
          <i className={`bi ${showDetail ? 'bi-chevron-up' : 'bi-chevron-down'} cs_ms_10`}></i>
        </button>
      </div>

        <div className="cs_height_120 cs_height_lg_80"></div>
      </section>
    );
};

export default Pricing2;