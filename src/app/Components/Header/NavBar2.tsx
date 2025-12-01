import Link from 'next/link';
import DropDown from './DropDown';

export default function NavBar2({ setMobileToggle }: any) {
  return (
    <ul className="cs_nav_list fw-medium">
      <li>
        <Link href="/" onClick={() => setMobileToggle(false)}>
          Home
        </Link>
      </li>

      <li className="menu-item-has-children cs-mega_menu">
        <Link href="/service" onClick={() => setMobileToggle(false)}>
          Services
        </Link>
        <DropDown>
          <ul className="mega-menu-container">
            
            {/* Column 1: Development */}
            <li className="mega-menu-col">
              <h3>Development</h3>
              <ul>
                <li>
                  <Link href="/service/ecommerce" onClick={() => setMobileToggle(false)}>WordPress</Link>
                </li>
                <li>
                  <Link href="/service/web-development" onClick={() => setMobileToggle(false)}>Web Development</Link>
                </li>
                <li>
                  <Link href="/service/responsive-web-design" onClick={() => setMobileToggle(false)}>Web App Development</Link>
                </li>
                <li>
                  <Link href="/service/website-security" onClick={() => setMobileToggle(false)}>Mobile App Development</Link>
                </li>
                <li>
                  <Link href="/service/website-updates" onClick={() => setMobileToggle(false)}>Game Development</Link>
                </li>
               
              </ul>
            </li>

            

            {/* Column 2: Creative */}
            <li className="mega-menu-col">
              <h3>Creative</h3>
              <ul>
                <li>
                  <Link href="/service/branding" onClick={() => setMobileToggle(false)}>Branding</Link>
                </li>
                <li>
                  <Link href="/service/custom-web-design" onClick={() => setMobileToggle(false)}>Custom Web Design</Link>
                </li>
                <li>
                  <Link href="/service/graphic-design" onClick={() => setMobileToggle(false)}>Graphic Design</Link>
                </li>
                <li>
                  <Link href="/service/logo-design" onClick={() => setMobileToggle(false)}>Logo Design</Link>
                </li>
                <li>
                  <Link href="/service/uiux-design" onClick={() => setMobileToggle(false)}>UX/UI Design</Link>
                </li>
                <li>
                  <Link href="/service/video-production" onClick={() => setMobileToggle(false)}>Social Media Design</Link>
                </li>
              </ul>
            </li>

            {/* Column 3: Marketing */}
            {/* <li className="mega-menu-col">
              <h3>Marketing</h3>
              <ul>
                <li>
                  <Link href="/service/content-writing" onClick={() => setMobileToggle(false)}>Content Writing</Link>
                </li>
                <li>
                  <Link href="/service/digital-marketing" onClick={() => setMobileToggle(false)}>Digital Marketing</Link>
                </li>
                <li>
                  <Link href="/service/email-marketing" onClick={() => setMobileToggle(false)}>Email Marketing</Link>
                </li>
                <li>
                  <Link href="/service/ppc-management" onClick={() => setMobileToggle(false)}>PPC Management</Link>
                </li>
                <li>
                  <Link href="/service/seo" onClick={() => setMobileToggle(false)}>Search Engine Optimization</Link>
                </li>
              </ul>
            </li> */}

          </ul>
        </DropDown>
      </li>

      <li>
        <Link href="/portfolio-list" onClick={() => setMobileToggle(false)}>
          Portfolio
        </Link>
      </li>

      <li className="menu-item-has-children">
        <Link href="" onClick={() => setMobileToggle(false)}>
          About Us
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/about-agency" onClick={() => setMobileToggle(false)}>
                About Agency
              </Link>
            </li>
            <li>
              <Link href="/reviews" onClick={() => setMobileToggle(false)}>
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/faq" onClick={() => setMobileToggle(false)}>
                FAQ
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>
    </ul>
  );
}