import React from 'react';

const Client = () => {
  const clientLogos = [
    { img: '/assets/img/brand_1.svg' },
    { img: '/assets/img/brand_2.svg' },
    { img: '/assets/img/brand_3.svg' },
    { img: '/assets/img/brand_4.svg' },
    { img: '/assets/img/brand_5.svg' },
    { img: '/assets/img/brand_6.svg' },
    { img: '/assets/img/brand_7.svg' },
    { img: '/assets/img/brand_8.svg' },
    { img: '/assets/img/brand_9.svg' },
    { img: '/assets/img/brand_10.svg' },
    { img: '/assets/img/brand_11.svg' },
    { img: '/assets/img/brand_12.svg' },
    { img: '/assets/img/brand_13.svg' },
    { img: '/assets/img/brand_14.svg' },
    { img: '/assets/img/brand_15.svg' },
  ];

  return (
    <section className="cs_client_section cs_pt_120 cs_pb_120">
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        <div className="cs_section_heading cs_style_1 text-center">
          <h2 className="cs_fs_32 mb-3 wow fadeInUp">Happy Clients</h2>
          <p className="cs_section_subtitle cs_fs_18 mb-0 m-auto" style={{ maxWidth: '800px' }}>
            We pride ourselves on our commitment to quality and customer satisfaction. We strive to exceed our client's expectations at every step of the way, delivering reliable, sustainable, and loveable software solutions.
          </p>
        </div>
        <div className="cs_height_70 cs_height_lg_50"></div>
        <div className="row row-cols-3 row-cols-md-5 cs_row_gap_30 cs_gap_y_20 justify-content-center align-items-center">
          {clientLogos.map((item, index) => (
            <div key={index} className="col">
              <div className="cs_client_logo cs_center">
                <img src={item.img} alt="Client Logo" style={{ width: '70%', height: '60px', objectFit: 'contain' }} />
              </div>
            </div>
          ))}
        </div>
        <div className="cs_height_50 cs_height_lg_30"></div>
        <div className="text-center">
          <h4 className="cs_fs_20 cs_bold mb-0">and many more...</h4>
        </div>
      </div>
    </section>
  );
};

export default Client;
