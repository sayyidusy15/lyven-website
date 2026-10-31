import type { Metadata } from "next";
import ContactEditorial from "../../Components/Contact/ContactEditorial";
import { canonicalUrl } from "../../../lib/site-url";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project, idea, or digital needs and start a conversation with Lyven.",
  alternates: { canonical: canonicalUrl("/contact") },
  openGraph: { url: canonicalUrl("/contact"), title: "Contact | Lyven" },
};

export default function ContactPage() {
  return <ContactEditorial />;
}
