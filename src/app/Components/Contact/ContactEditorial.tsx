"use client";

import { FormEvent, useState } from "react";

const serviceCategories = [
  { value: "branding", label: "Branding", icon: "bi-circle-half" },
  { value: "ui-ux-design", label: "UI/UX Design", icon: "bi-window" },
  { value: "development", label: "Development", icon: "bi-code-slash" },
];

const budgetRanges = [
  "Under Rp5 million",
  "Rp5–15 million",
  "Rp15–30 million",
  "Rp30–75 million",
  "Above Rp75 million",
  "Let’s discuss",
];

const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Still planning",
];

const contactEmail = process.env.NEXT_PUBLIC_LYVEN_CONTACT_EMAIL?.trim() ?? "";
const contactWhatsApp = process.env.NEXT_PUBLIC_LYVEN_WHATSAPP?.trim() ?? "";
const whatsappNumber = contactWhatsApp.replace(/\D/g, "");

interface ContactFormState {
  projectType: string;
  budget: string;
  timeline: string;
  fullName: string;
  email: string;
  company: string;
  projectDetails: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

const initialForm: ContactFormState = {
  projectType: "",
  budget: "",
  timeline: "",
  fullName: "",
  email: "",
  company: "",
  projectDetails: "",
};

export default function ContactEditorial() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submissionNotice, setSubmissionNotice] = useState("");

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmissionNotice("");
  };

  const validate = () => {
    const nextErrors: ContactFormErrors = {};

    if (!form.projectType) nextErrors.projectType = "Choose a project type.";
    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.projectDetails.trim()) nextErrors.projectDetails = "Tell us a little about your project.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmissionNotice(
      "Your form is ready, but message delivery has not been configured yet. Contact Lyven by email or WhatsApp once the details are available.",
    );
  };

  return (
    <main className="lyven-contact-page">
      <div className="lyven-contact-page__atmosphere" aria-hidden="true">
        <svg viewBox="0 0 1440 920" preserveAspectRatio="none">
          <path d="M -180 650 C 170 610 330 785 570 990" />
          <path d="M -130 760 C 170 675 390 800 620 1010" />
          <circle cx="194" cy="730" r="13" />
        </svg>
      </div>

      <div className="lyven-contact-page__inner">
        <section className="lyven-contact-intro" aria-labelledby="contact-heading">
          <p className="lyven-contact-intro__eyebrow">Contact</p>
          <h1 id="contact-heading">
            <span>Tell us</span>
            <span>about your</span>
            <span>next idea.</span>
          </h1>
          <p className="lyven-contact-intro__copy">
            We are always open to new projects, creative ideas, and collaborations.
            Tell us what you need and we will get back to you shortly.
          </p>

          <div className="lyven-contact-direct" aria-label="Direct contact options">
            {contactEmail ? (
              <a href={`mailto:${contactEmail}`} className="lyven-contact-direct__row">
                <i className="bi bi-envelope" aria-hidden="true" />
                <span><small>Email us</small><strong>{contactEmail}</strong></span>
                <b aria-hidden="true">↗</b>
              </a>
            ) : (
              <div className="lyven-contact-direct__row is-unavailable">
                <i className="bi bi-envelope" aria-hidden="true" />
                <span><small>Email us</small><strong>Not configured yet</strong></span>
              </div>
            )}

            {whatsappNumber ? (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="lyven-contact-direct__row"
              >
                <i className="bi bi-whatsapp" aria-hidden="true" />
                <span><small>WhatsApp us</small><strong>{contactWhatsApp}</strong></span>
                <b aria-hidden="true">↗</b>
              </a>
            ) : (
              <div className="lyven-contact-direct__row is-unavailable">
                <i className="bi bi-whatsapp" aria-hidden="true" />
                <span><small>WhatsApp us</small><strong>Not configured yet</strong></span>
              </div>
            )}
          </div>
        </section>

        <section className="lyven-contact-form-panel" aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="visually-hidden">Project inquiry form</h2>
          <form noValidate onSubmit={handleSubmit}>
            <fieldset
              className="lyven-contact-form-group"
              aria-invalid={Boolean(errors.projectType)}
              aria-describedby={errors.projectType ? "project-type-error" : undefined}
            >
              <legend>
                <span>01</span>
                <strong>Project Type</strong>
                <small>What do you want to build?</small>
              </legend>
              <div className="lyven-project-type-selector">
                {serviceCategories.map((service) => (
                  <button
                    type="button"
                    key={service.value}
                    className={form.projectType === service.value ? "is-selected" : undefined}
                    aria-pressed={form.projectType === service.value}
                    onClick={() => updateField("projectType", service.value)}
                  >
                    <i className={`bi ${service.icon}`} aria-hidden="true" />
                    <span>{service.label}</span>
                  </button>
                ))}
              </div>
              {errors.projectType && <p className="lyven-contact-error" id="project-type-error">{errors.projectType}</p>}
            </fieldset>

            <fieldset className="lyven-contact-form-group">
              <legend>
                <span>02</span>
                <strong>Budget Range</strong>
                <small>What&apos;s your estimated budget?</small>
              </legend>
              <label className="visually-hidden" htmlFor="contact-budget">Budget range</label>
              <select id="contact-budget" value={form.budget} onChange={(event) => updateField("budget", event.target.value)}>
                <option value="">Select a budget range</option>
                {budgetRanges.map((range) => <option key={range} value={range}>{range}</option>)}
              </select>
            </fieldset>

            <fieldset className="lyven-contact-form-group">
              <legend>
                <span>03</span>
                <strong>Timeline</strong>
                <small>When do you want to start?</small>
              </legend>
              <label className="visually-hidden" htmlFor="contact-timeline">Project timeline</label>
              <select id="contact-timeline" value={form.timeline} onChange={(event) => updateField("timeline", event.target.value)}>
                <option value="">Select a starting timeline</option>
                {timelineOptions.map((timeline) => <option key={timeline} value={timeline}>{timeline}</option>)}
              </select>
            </fieldset>

            <fieldset className="lyven-contact-form-group lyven-contact-details">
              <legend>
                <span>04</span>
                <strong>Your Details</strong>
                <small>Let&apos;s get to know you.</small>
              </legend>
              <div className="lyven-contact-details__grid">
                <div className="lyven-contact-field">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.fullName}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? "contact-name-error" : undefined}
                    onChange={(event) => updateField("fullName", event.target.value)}
                  />
                  {errors.fullName && <p className="lyven-contact-error" id="contact-name-error">{errors.fullName}</p>}
                </div>

                <div className="lyven-contact-field">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    onChange={(event) => updateField("email", event.target.value)}
                  />
                  {errors.email && <p className="lyven-contact-error" id="contact-email-error">{errors.email}</p>}
                </div>

                <div className="lyven-contact-field is-full">
                  <label htmlFor="contact-company">Company / Brand</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(event) => updateField("company", event.target.value)}
                  />
                </div>

                <div className="lyven-contact-field is-full">
                  <label htmlFor="contact-details">Project Details *</label>
                  <textarea
                    id="contact-details"
                    name="projectDetails"
                    required
                    placeholder="Tell us a little about your project, goals, or challenges..."
                    value={form.projectDetails}
                    aria-invalid={Boolean(errors.projectDetails)}
                    aria-describedby={errors.projectDetails ? "contact-details-error" : undefined}
                    onChange={(event) => updateField("projectDetails", event.target.value)}
                  />
                  {errors.projectDetails && <p className="lyven-contact-error" id="contact-details-error">{errors.projectDetails}</p>}
                </div>
              </div>
            </fieldset>

            {submissionNotice && <p className="lyven-contact-notice" role="status">{submissionNotice}</p>}

            <button className="lyven-contact-submit" type="submit">
              Send Message <span aria-hidden="true">↗</span>
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
