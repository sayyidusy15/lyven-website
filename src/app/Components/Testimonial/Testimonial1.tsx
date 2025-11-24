"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { supabase } from "../../../lib/supabaseClient";

const Testimonial1 = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimoni")
        .select("*")
        .order("id", { ascending: true });

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        console.error("Error fetch:", error);
      } else {
        setTestimonials(data);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1399, settings: { slidesToShow: 4 } },
      { breakpoint: 1199, settings: { slidesToShow: 3 } },
      { breakpoint: 575, settings: { slidesToShow: 1 } },
    ],
  };

  const sliderRef = useRef(null);
  const next = () => sliderRef.current.slickNext();
  const previous = () => sliderRef.current.slickPrev();

  return (
    <section className="cs_slider cs_style_1 cs_testimonial_slider cs_slider_gap_30 position-relative">
      <div className="container">
        {/* Heading */}
        <div className="cs_section_heading cs_style_1 cs_type_1">
          <div className="cs_section_heading_left">
            <p className="cs_section_subtitle cs_fs-18 cs_semibold cs_accent_color cs_mb_20">
              Our Testimonial
            </p>
            <h2 className="cs_fs_48 mb-0">Clients Feedback</h2>
          </div>
          <div className="cs_section_heading_right">
            <div className="cs_slider_arrows cs_style_1">
              <div
                onClick={previous}
                className="cs_left_arrow cs_center cs_radius_50"
              >
                <Image
                  src="/assets/img/icons/arrow_right.svg"
                  alt="arrow"
                  width={23}
                  height={23}
                />
              </div>
              <div
                onClick={next}
                className="cs_right_arrow cs_center cs_radius_50"
              >
                <Image
                  src="/assets/img/icons/arrow_right.svg"
                  alt="arrow"
                  width={23}
                  height={23}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Slider */}
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((item) => (
            <div key={item.id} className="cs_slide">
              <div className="cs_testimonial cs_style_1">
                {/* Header */}
                <div className="cs_testimonial_header">
                  <div className="cs_avatar cs_style_1">
                    <div className="cs_avatar_icon cs_radius_50">
                      <Image
                        src={"/assets/img/avatar_2.jpg"} // sementara default
                        alt={item.senderName}
                        width={60}
                        height={61}
                      />
                    </div>
                    <div className="cs_avatar_info">
                      <h3 className="cs_fs_20 cs_medium mb-0">
                        {item.senderName}
                      </h3>
                      <p className="mb-0">{item.senderTitle}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="cs_testimonial_content cs_gray_bg_1 cs_radius_4 position-relative">
                  <blockquote>{item.message}</blockquote>

                  <div className="cs_rating" data-rating={item.star ?? 5}>
                    <div className="cs_rating_percentage"></div>
                  </div>

                  <span className="cs_quote_icon position-absolute">
                    <Image
                      src="/assets/img/icons/quote_1.svg"
                      alt="quote"
                      width={48}
                      height={35}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial1;
