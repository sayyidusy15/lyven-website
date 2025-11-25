import React from 'react';

const PricingTable = () => {
  return (
    <div className="cs_pricing_table_wrapper">
      
      {/* --- HEADER ROW (YANG AKAN STICKY) --- */}
      <div className="cs_pt_header_row">
        <div className="cs_pt_col cs_pt_feature_name">Fitur & Spesifikasi</div>
        <div className="cs_pt_col text-center"><strong>BASIC</strong></div>
        <div className="cs_pt_col text-center"><strong>PRO+</strong></div>
        <div className="cs_pt_col text-center"><strong>ENTERPRISE</strong></div>
      </div>

      {/* --- BODY ROWS --- */}
      <div className="cs_pt_body">
        
        {/* ROW 1: Jumlah Halaman */}
        <div className="cs_pt_row">
          <div className="cs_pt_col cs_pt_feature_name">Jumlah Halaman Web</div>
          <div className="cs_pt_col text-center cs_blue_text">Single Page</div>
          <div className="cs_pt_col text-center cs_blue_text">Up to 5 Pages</div>
          <div className="cs_pt_col text-center cs_blue_text">Custom</div>
        </div>

        {/* ROW 2: Akses Admin */}
        <div className="cs_pt_row">
          <div className="cs_pt_col cs_pt_feature_name">Akses Admin</div>
          <div className="cs_pt_col text-center">
            <span className="cs_pt_badge">Add-on Available</span>
          </div>
          <div className="cs_pt_col text-center">
            <i className="bi bi-check-circle-fill cs_accent_color"></i>
          </div>
          <div className="cs_pt_col text-center">
             <i className="bi bi-check-circle-fill cs_accent_color"></i>
          </div>
        </div>

        {/* ROW 3: Hosting / Traffic */}
        <div className="cs_pt_row">
          <div className="cs_pt_col cs_pt_feature_name">
            Gratis Hosting (Traffic) <i className="bi bi-info-circle text-muted ms-1" title="Info traffic"></i>
          </div>
          <div className="cs_pt_col text-center">Up to 10.000 / mo</div>
          <div className="cs_pt_col text-center">Up to 50.000 / mo</div>
          <div className="cs_pt_col text-center">On-Demand</div>
        </div>

        {/* ROW 4: Web Feature (Complex) */}
        <div className="cs_pt_row align-items-start">
          <div className="cs_pt_col cs_pt_feature_name">
            <strong>Web Feature</strong> <br/>
            <span className="text-muted cs_fs_14">Design, Development & Strategy</span>
          </div>
          
          {/* Basic */}
          <div className="cs_pt_col">
            <ul className="cs_pt_list">
              <li><i className="bi bi-check2"></i> CMS Wordpress</li>
              <li><i className="bi bi-check2"></i> Basic Design</li>
              <li><i className="bi bi-check2"></i> Standard SEO</li>
            </ul>
          </div>

          {/* Pro */}
          <div className="cs_pt_col">
            <ul className="cs_pt_list">
               <li><i className="bi bi-check2-all cs_blue_text"></i> <strong>Premium CMS</strong></li>
               <li><i className="bi bi-check2"></i> 30 Menit Training</li>
               <li><i className="bi bi-check2"></i> Riset Kompetitor</li>
               <li><i className="bi bi-check2"></i> Premium SEO Copywriting</li>
            </ul>
          </div>

          {/* Advanced / Tech Stack */}
          <div className="cs_pt_col text-center">
             <p className="cs_fs_14 cs_bold cs_mb_10">Build from scratch!</p>
             <div className="d-flex flex-wrap justify-content-center gap-2">
                {/* Gunakan Image Next.js jika punya icon asset, ini contoh pake icon font */}
                <i className="bi bi-filetype-react cs_fs_24 text-primary"></i>
                <i className="bi bi-filetype-html cs_fs_24 text-warning"></i>
                <i className="bi bi-filetype-css cs_fs_24 text-info"></i>
                <i className="bi bi-wordpress cs_fs_24 text-secondary"></i>
             </div>
             <p className="cs_fs_12 text-muted mt-2">custom features, integration & technology</p>
          </div>
        </div>

        {/* ROW 5: Security */}
        <div className="cs_pt_row">
          <div className="cs_pt_col cs_pt_feature_name">Website Security</div>
          <div className="cs_pt_col text-center">
             <span className="badge bg-warning text-dark rounded-pill fw-normal">SSL (https) only</span>
          </div>
          <div className="cs_pt_col text-center">
             <span className="badge bg-primary rounded-pill fw-normal">SSL + Anti Malware</span>
          </div>
          <div className="cs_pt_col text-center">
             <span className="badge bg-dark rounded-pill fw-normal">Layered Security</span>
          </div>
        </div>

         {/* ROW 6: Durasi */}
         <div className="cs_pt_row">
          <div className="cs_pt_col cs_pt_feature_name">Estimasi Pengerjaan</div>
          <div className="cs_pt_col text-center cs_blue_text">5 - 7 Hari</div>
          <div className="cs_pt_col text-center cs_blue_text">14 - 20 Hari</div>
          <div className="cs_pt_col text-center cs_blue_text">Sesuai Timeline</div>
        </div>

      </div>
    </div>
  );
};

export default PricingTable;