import React from 'react';

const Advantages = () => {
  const advantagesData = [
    {
      icon: 'bi-box-seam',
      title: 'All-in-One Service',
      description: 'Beyond websites, we can support promotional design and Google advertising.',
    },
    {
      icon: 'bi-code-slash',
      title: 'Custom Website Development',
      description: 'From company profiles and online stores to complex, custom-built platforms.',
    },
    {
      icon: 'bi-gift',
      title: 'Useful Extras Included',
      description: 'Every website package includes practical additions that support your business.',
    },
    {
      icon: 'bi-clipboard-check',
      title: 'A Clear Process',
      description: 'An efficient, professional workflow keeps your website launch focused and organized.',
    },
    {
      icon: 'bi-tag',
      title: 'Flexible Project Scope',
      description: 'We can shape the scope and investment around your priorities and available budget.',
    },
    {
      icon: 'bi-shield-check',
      title: 'Long-Term Support',
      description: 'Ongoing support and maintenance are available after your website goes live.',
    },
    {
      icon: 'bi-people',
      title: 'Trusted Across Industries',
      description: 'We have supported small businesses, startups, companies, and organizations.',
    },
    {
      icon: 'bi-camera-video',
      title: 'Flexible Collaboration',
      description: 'Work with us through focused online meetings wherever your team is based.',
    },
  ];

  return (
    <section>
      <div className="cs_height_120 cs_height_lg_80"></div>
      <div className="container">
        <div className="cs_section_heading cs_style_1 text-center">
          <h2 className="cs_fs_32 mb-3 wow fadeInUp">
            Why Businesses Work With Us
          </h2>
      
          <p className="cs_section_desc cs_fs_16 mb-0 text-muted wow fadeInUp text-center">
            Thoughtful website development with the capabilities your business needs to grow.
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
