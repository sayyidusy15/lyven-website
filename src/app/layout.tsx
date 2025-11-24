import { Public_Sans } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "slick-carousel/slick/slick.css";
import "./assets/main.css";

const public_sans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--body-color-font',
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
    <html lang="en">
      <head>
        <meta name="author" content="Themeservices" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${public_sans.variable}`}>
        {children}
      </body>
    </html>
  );
}
