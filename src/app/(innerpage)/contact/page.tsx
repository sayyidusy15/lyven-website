import type { Metadata } from "next";
import ContactEditorial from "../../Components/Contact/ContactEditorial";

export const metadata: Metadata = {
  title: "Contact | Lyven",
  description: "Tell us about your project, idea, or digital needs and start a conversation with Lyven.",
};

export default function ContactPage() {
  return <ContactEditorial />;
}
