"use client"
import Image from 'next/image';
import React from 'react';

const OurStory = () => {

    const chooseContent = [
        {img:'/assets/img/card_3.jpg'},
        {img:'/assets/img/card_3.jpg'},
        {img:'/assets/img/card_3.jpg'},
        {img:'/assets/img/card_3.jpg'},
        {img:'/assets/img/card_3.jpg'},
        {img:'/assets/img/card_3.jpg'},
      ]; 

    return (
        <section>
        <div className="cs_height_120 cs_height_lg_80"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            {/* <p className="cs_section_subtitle cs_fs-18 cs_semibold cs_accent_color cs_center cs_mb_20 wow fadeInDown">
              <span className="cs_shape_left"></span>Our Journey<span className="cs_shape_right"></span>
            </p> */}
            <h2 className="cs_fs_48 cs_mb_21 wow fadeInUp">Our Story</h2>
            <p className="cs_section_heading_text mb-0 wow fadeInUp" data-wow-delay="200ms">Our comprehensive suite of digital marketing services is designed to <br/> elevate your brands visibility.</p>
          </div>
        </div>
        <div className="cs_height_60 cs_height_lg_50"></div>
        <div className="cs_horizontal_slider_wrapper">
          <div className="cs_horizontal_slider_in">
            <div className="cs_project_list">
            {chooseContent.map((item, i) => (
              <div key={i} className="cs_card cs_style_1 cs_center position-relative overflow-hidden">
              <img src={item.img} alt="Project Image" className="w-100 h-100 object-fit-cover" />
              </div>
               ))}

            </div>
            <div className="cs_project_list">
            {chooseContent.map((item, i) => (
              <div key={i} className="cs_card cs_style_1 cs_center position-relative overflow-hidden">
              <img src={item.img} alt="Project Image" className="w-100 h-100 object-fit-cover" />
              </div>
              ))}

            </div>
          </div>
        </div>
        <div className="cs_height_120 cs_height_lg_80"></div>
        <style jsx>{`
          .cs_card {
            overflow: hidden;
          }
          .cs_card img {
            transition: transform 0.5s ease;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .cs_card:hover img {
            transform: scale(1.1);
          }
        `}</style>
      </section>
    );
};

export default OurStory;
