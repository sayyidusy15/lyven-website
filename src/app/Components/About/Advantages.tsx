import React from 'react';

const Advantages = () => {
  const advantagesData = [
    {
      icon: 'bi-box-seam',
      title: 'Layanan All in One',
      description: 'Tak hanya Website, kami juga bisa membuatkan kamu Design Promosi & Sekalian Iklan di Google',
    },
    {
      icon: 'bi-code-slash',
      title: 'Bisa Custom Website',
      description: 'Selain Web Company & Toko Online, kami juga siap untuk membuat Website Kompleks / Custom',
    },
    {
      icon: 'bi-gift',
      title: 'Banyak Bonus Gratis',
      description: 'Disetiap Paket Website. kami akan memberikan Bonus yang sangat berguna buat bisnismu',
    },
    {
      icon: 'bi-clipboard-check',
      title: 'Alur Pekerjaan Jelas',
      description: 'Kami Memiliki Cara Kerja yang Efisien dan Profesional untuk membuat websitemu Go-Online dengan sangat baik',
    },
    {
      icon: 'bi-tag',
      title: 'Harga Bisa Request',
      description: 'Suka sama layanan kami tapi Harga belum cocok? Santai. Kamu bisa tentukan harga websitemu sendiri',
    },
    {
      icon: 'bi-shield-check',
      title: 'Garansi Selamanya',
      description: 'Tak perlu khawatir soal Support / Maintenance, kami beri Garansi Seumur Hidup',
    },
    {
      icon: 'bi-people',
      title: 'Dipercaya 850 Lebih Klien',
      description: 'Sejak 2015, kami telah membantu UMKM, Start Up, PT hingga Instansi Pemerintahan',
    },
    {
      icon: 'bi-camera-video',
      title: 'Tatap Muka / Zoom Meeting',
      description: 'Jarak tak jadi masalah, kami siap untuk Online Meeting demi terciptanya Solusi dari Kebutuhan kamu',
    },
  ];

  return (
    <section>
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        <div className="cs_section_heading cs_style_1 text-center">
          <h2 className="cs_fs_32 mb-3 wow fadeInUp">
            Keuntungan Menggunakan Layanan Kami
          </h2>
      
          <p className="cs_section_desc cs_fs_16 mb-0 text-muted wow fadeInUp text-center">
            Jasa Pembuatan Website yang kami sediakan memiliki keunggulan yang bisa <br /> membuat bisnismu berkembang
          </p>
        </div>
        <div className="cs_height_60 cs_height_lg_40"></div>
        <div className="row cs_row_gap_30 cs_gap_y_30">
          {advantagesData.map((item, index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-md-6">
              <div className="cs_advantage_item h-100 p-4 border rounded-3 bg-white">
                <div className="cs_icon_box cs_center rounded-circle mb-4" style={{ width: '60px', height: '60px', backgroundColor: '#e6f2ff' }}>
                  <i className={`bi ${item.icon} cs_accent_color cs_fs_24`}></i>
                </div>
                <h3 className="cs_fs_20 mb-3">{item.title}</h3>
                <p className="cs_fs_15 text-muted mb-0">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="cs_height_120 cs_height_lg_80"></div> */}
    </section>
  );
};

export default Advantages;
