/* eslint-disable react/jsx-key */

"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function TestimonialCard() {
  const [testimonials, setTestimonials] = useState<{ id: string; title: string; message: string; star: number; senderName: string; senderTitle: string }[]>([]);

  useEffect(() => {
    if (!supabase) return;
    const getTestimonials = async () => {
      const { data, error } = await supabase
        .from("lyven_testimonials")
        .select("*")
        .eq("status", "Published")
        .order("sort_order", { ascending: true });

      if (!error && data) setTestimonials(data.map((item) => ({ id: item.id, title: item.title, message: item.message, star: item.star, senderName: item.sender_name, senderTitle: item.sender_title })));
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
      {/* --- BAGIAN HEADER / JUDUL --- */}
      <div className="container mb-5">
        <div className="text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Heading Utama */}
         <h2 className="cs_fs_32 mb-3 wow fadeInUp">What our clients say</h2>
          <p className="cs_section_desc cs_fs_16 mb-0 text-muted wow fadeInUp text-center" data-wow-delay="0.2s">
          Hear directly from clients who have worked with our team.
          </p>

        </div>
      </div>
      
      <div className="overflow-hidden marquee-container">
        {!testimonials.length && <p className="text-center text-muted">No client testimonials have been published yet.</p>}
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
