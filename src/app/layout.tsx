import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "lenis/dist/lenis.css";
import "slick-carousel/slick/slick.css";
import SmoothScroll from "./Components/Common/SmoothScroll";
import type { Metadata } from "next";
import { getSiteUrl } from "../lib/site-url";
import "./assets/main.css";

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-instrument-sans',
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-bricolage-grotesque',
});

const siteUrl = getSiteUrl();
const siteDescription = "Lyven helps businesses shape ideas into clear identities, useful digital experiences, and scalable products.";

export const metadata: Metadata = {
  metadataBase: siteUrl ?? undefined,
  title: {
    default: "Lyven | Digital Product Design & Development",
    template: "%s | Lyven",
  },
  description: siteDescription,
  applicationName: "Lyven",
  creator: "Lyven",
  publisher: "Lyven",
  robots: siteUrl ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: "/assets/img/favicon.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Lyven",
    title: "Lyven | Digital Product Design & Development",
    description: siteDescription,
    url: siteUrl?.toString(),
    images: siteUrl ? [{ url: new URL("/assets/img/CTA.png", siteUrl).toString(), width: 1815, height: 719, alt: "Lyven digital experiences" }] : undefined,
  },
  twitter: { card: "summary_large_image", title: "Lyven | Digital Product Design & Development", description: siteDescription },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${bricolageGrotesque.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
