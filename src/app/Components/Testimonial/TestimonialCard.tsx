"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function TestimonialCard() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimoni")
        .select("*");

      if (error) console.log(error);
      else setTestimonials(data);
    };

    getTestimonials();
  }, []);

  const half = Math.ceil(testimonials.length / 2);

  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <>
    <div className="testimoni-wrapper">
      <div className="title-label">
        <span>WHAT OUR CLIENTS SAY</span>
      </div>
      <div className="title-testimoni">
        <span>TESTIMONI JUJUR DARI</span>      
      </div>
      <div className="sub-title-testimoni">
        <span>PELANGGAN LYVEN</span>       
      </div>
      <div className="overflow-hidden marquee-container">
        <div className="d-flex marquee-row marquee-left">
          {marqueeRow1.map((t, index) => (
            <div className="mx-3">
            <div
              className="card shadow-sm"
              style={{
                width: "350px",       // FIXED SIZE
                borderRadius: "12px",
                minWidth: "450px",
                maxWidth: "450px",
                minHeight: "210px",
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="fw-bold m-0 message-clamp col-title">{t.title}</h5>

                  <div>
                    {Array.from({ length: t.star }).map((_, i) => (
                      <span key={i} className="text-warning fs-4">★</span>
                    ))}
                  </div>
                </div>

                <p className="mb-3 message-clamp col-message" style={{ color: "#555" }}>
                  {t.message}
                </p>

                <p className="m-0" style={{ color: "#555" }}>
                  <strong>{t.senderName}</strong> — {t.senderTitle}
                </p>

              </div>
            </div>
          </div>

          ))}
        </div>
      </div>

      <div className="overflow-hidden marquee-container">
        <div className="d-flex marquee-row marquee-left">
          {marqueeRow2.map((t, index) => (
            <div className="mx-3">
            <div
              className="card shadow-sm"
              style={{
                width: "350px",       // FIXED SIZE
                borderRadius: "12px",
                minWidth: "450px",
                maxWidth: "450px",
                minHeight: "210px",
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="fw-bold m-0 message-clamp col-title">{t.title}</h5>

                  <div>
                    {Array.from({ length: t.star }).map((_, i) => (
                      <span key={i} className="text-warning fs-4">★</span>
                    ))}
                  </div>
                </div>

                <p className="mb-3 message-clamp col-message" style={{ color: "#555" }}>
                  {t.message}
                </p>

                <p className="m-0" style={{ color: "#555" }}>
                  <strong>{t.senderName}</strong> — {t.senderTitle}
                </p>

              </div>
            </div>
          </div>

          ))}
        </div>
      </div>
    </div>
    </>
  );
}
