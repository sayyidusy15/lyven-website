"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "What We Do", href: "/service" },
  { label: "Portfolio", href: "/portfolio-list" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SCROLL_THRESHOLD = 88;
const HIDE_THRESHOLD = 160;
const DIRECTION_TOLERANCE = 8;

export default function Header5() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isPortfolio = pathname === "/portfolio-list" || pathname.startsWith("/portfolio-details/");
  const isServices = pathname === "/service";
  const isContact = pathname === "/contact";
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  const isAbout = pathname === "/about";
  const isDynamic = isHomepage || isPortfolio || isServices || isContact || isBlog || isAbout;
  const [isScrolled, setIsScrolled] = useState(!isDynamic);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const frameId = useRef<number | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    lastScrollY.current = Math.max(window.scrollY, 0);

    const updateHeader = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const nextScrolled = !isDynamic || currentScrollY > SCROLL_THRESHOLD;
      const distance = currentScrollY - lastScrollY.current;

      setIsScrolled(nextScrolled);

      if (!isDynamic || !nextScrolled || menuOpen) {
        setIsHidden(false);
      } else if (Math.abs(distance) >= DIRECTION_TOLERANCE) {
        setIsHidden(distance > 0 && currentScrollY > HIDE_THRESHOLD);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
      frameId.current = null;
    };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      frameId.current = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId.current !== null) window.cancelAnimationFrame(frameId.current);
      ticking.current = false;
    };
  }, [isDynamic, menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      navRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !navRef.current) return;

      const focusable = Array.from(navRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`lyven-header${isDynamic ? " is-dynamic" : " is-inner"}${isHomepage ? " is-homepage" : ""}${isScrolled ? " is-scrolled" : " is-hero"}${isHidden ? " is-hidden" : ""}${menuOpen ? " is-menu-open" : ""}`}
    >
      <div className="lyven-header__inner">
        <Link className="lyven-header__brand" href="/" aria-label="Lyven home" onClick={closeMenu}>
          <Image
            src="/assets/img/logo-lyven-primary.svg"
            alt="Lyven"
            width={138}
            height={38}
            priority
          />
        </Link>

        <button
          ref={toggleRef}
          className="lyven-header__toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          ref={navRef}
          id="primary-navigation"
          className={`lyven-header__nav${menuOpen ? " is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <div className="lyven-header__links">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={pathname === item.href || (item.href === "/portfolio-list" && isPortfolio) || (item.href === "/blog" && isBlog) ? "is-active" : undefined}
                aria-current={pathname === item.href || (item.href === "/portfolio-list" && isPortfolio) || (item.href === "/blog" && isBlog) ? "page" : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link className="lyven-header__cta" href="/contact" onClick={closeMenu}>
            <span>Get a Quote</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
