import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "lenis/dist/lenis.css";
import "slick-carousel/slick/slick.css";
import SmoothScroll from "./Components/Common/SmoothScroll";
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

export const metadata = {
  title: {
    absolute: '',
    default: 'Lyven Digital Agency',
    template: '%s | Lyven Digital Agency',
  },
  description: 'Lyven Digital Agency',
  openGraph: {
    title: 'Lyven Digital Agency',
    description: 'Lyven Digital Agency',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${bricolageGrotesque.variable}`}>
      <head>
        <meta name="author" content="Themeservices" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
