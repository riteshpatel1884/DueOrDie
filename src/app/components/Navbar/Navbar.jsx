"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/theme/Themecontext";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navPillRef = useRef(null);
  const linkRefs = useRef({});

  const links = [
    { href: "/", label: "Dashboard"},
    { href: "/goals", label: "Goals"},
  ];

  const isActive = (href) => pathname === href;

  // Scroll detection for frosted glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animated sliding indicator under active nav link
  useEffect(() => {
    const activeLink = links.find((l) => isActive(l.href));
    if (activeLink && linkRefs.current[activeLink.href] && navPillRef.current) {
      const el = linkRefs.current[activeLink.href];
      const parent = navPillRef.current;
      const parentRect = parent.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicatorStyle({
        left: elRect.left - parentRect.left,
        width: elRect.width,
        opacity: 1,
      });
    }
  }, [pathname]);

  return (
    <>
      <style>{`
        /* ── Navbar shell ── */
        .nb-root {
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nb-glass {
          background: ${
            scrolled
              ? "color-mix(in srgb, var(--bg) 82%, transparent)"
              : "var(--bg)"
          };
          backdrop-filter: ${scrolled ? "blur(20px) saturate(160%)" : "none"};
          -webkit-backdrop-filter: ${scrolled ? "blur(20px) saturate(160%)" : "none"};
          border-bottom: 1px solid ${scrolled ? "var(--border)" : "transparent"};
          transition: background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease;
          position: relative;
        }

        .nb-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        /* ── Logo ── */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nb-logo-mark {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 900;
          color: var(--accent-fg);
          font-family: 'Syne', sans-serif;
          letter-spacing: -1px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.3s ease;
        }

        .nb-logo-mark::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%);
          pointer-events: none;
        }

        .nb-logo:hover .nb-logo-mark {
          transform: rotate(-8deg) scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }

        .nb-logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 19px;
          color: var(--text);
          letter-spacing: -0.6px;
          line-height: 1;
          display: block;
          transition: color 0.2s;
        }

        .nb-logo-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: var(--text3);
          letter-spacing: 0.09em;
          text-transform: uppercase;
          margin-top: 2px;
          display: block;
        }

        /* ── Desktop pill track ── */
        .nb-pill-track {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 13px;
          padding: 4px;
        }

        .nb-indicator {
          position: absolute;
          top: 4px;
          height: calc(100% - 8px);
          background: var(--accent);
          border-radius: 9px;
          transition: left 0.38s cubic-bezier(0.4, 0, 0.2, 1),
                      width 0.38s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.25s ease;
          z-index: 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }

        .nb-link {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 15px;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.22s ease;
          cursor: pointer;
          white-space: nowrap;
          border: none;
          background: none;
        }

        .nb-link.is-active {
          color: var(--accent-fg);
        }

        .nb-link.is-inactive {
          color: var(--text2);
        }

        .nb-link.is-inactive:hover {
          color: var(--text);
        }

        .nb-link-icon {
          font-size: 11px;
          opacity: 0.65;
          transition: opacity 0.2s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nb-link:hover .nb-link-icon {
          opacity: 1;
          transform: scale(1.25) rotate(-5deg);
        }

        .nb-link.is-active .nb-link-icon {
          opacity: 0.9;
        }

        /* ── Divider ── */
        .nb-divider {
          width: 1px;
          height: 20px;
          background: var(--border);
          opacity: 0.5;
          flex-shrink: 0;
        }

        /* ── Theme button ── */
        .nb-theme-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--surface);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                      border-color 0.2s,
                      box-shadow 0.2s;
          color: var(--text);
          flex-shrink: 0;
        }

        .nb-theme-btn:hover {
          border-color: var(--border2);
          transform: translateY(-2px) rotate(12deg);
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }

        .nb-theme-btn:active {
          transform: scale(0.9);
        }

        /* ── Desktop nav wrapper ── */
        .nb-desktop {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* ── Scroll glow accent ── */
        .nb-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 1px;
          width: ${scrolled ? "35%" : "0%"};
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: ${scrolled ? "0.35" : "0"};
          transition: width 0.6s ease, opacity 0.6s ease;
          pointer-events: none;
        }

        /* ── Mobile controls ── */
        .nb-mobile-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nb-burger {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--surface);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 0;
          transition: border-color 0.2s, background 0.2s;
        }

        .nb-burger:hover {
          border-color: var(--border2);
          background: var(--surface2);
        }

        .nb-burger-line {
          width: 17px;
          height: 1.5px;
          background: var(--text);
          border-radius: 2px;
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.25s ease,
                      width 0.25s ease;
        }

        /* ── Mobile drawer ── */
        .nb-drawer {
          position: absolute;
          top: calc(100% + 6px);
          left: 12px;
          right: 12px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 24px 56px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.1);
          animation: drawerReveal 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          z-index: 99;
        }

        @keyframes drawerReveal {
          from { opacity: 0; transform: translateY(-10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .nb-drawer-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 11px 13px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }

        .nb-drawer-link.is-active {
          background: var(--accent);
          color: var(--accent-fg);
        }

        .nb-drawer-link.is-inactive {
          color: var(--text2);
        }

        .nb-drawer-link.is-inactive:hover {
          background: var(--surface2);
          color: var(--text);
        }

        .nb-drawer-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          background: var(--accent-subtle);
          border: 1px solid var(--accent-border);
          flex-shrink: 0;
          transition: transform 0.2s;
        }

        .nb-drawer-link.is-active .nb-drawer-icon {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.2);
        }

        .nb-drawer-link:hover .nb-drawer-icon {
          transform: scale(1.1);
        }

        .nb-drawer-dot {
          margin-left: auto;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-fg);
          opacity: 0.5;
        }

        .nb-drawer-sep {
          height: 1px;
          background: var(--border);
          margin: 6px 2px;
          opacity: 0.4;
        }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .nb-desktop { display: none !important; }
        }
        @media (min-width: 768px) {
          .nb-mobile-controls { display: none !important; }
          .nb-drawer { display: none !important; }
        }
      `}</style>

      <div className="nb-root">
        <div className="nb-glass">
          <div className="nb-container">
            {/* ── Logo ── */}
            <Link href="/" className="nb-logo">
              
              <div>
                <span className="nb-logo-text">DueOrDie</span>
                
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="nb-desktop">
              <div className="nb-pill-track" ref={navPillRef}>
                <div className="nb-indicator" style={indicatorStyle} />
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    ref={(el) => {
                      linkRefs.current[l.href] = el;
                    }}
                    className={`nb-link ${isActive(l.href) ? "is-active" : "is-inactive"}`}
                  >
                    
                    {l.label}
                  </Link>
                ))}
              </div>

              <div className="nb-divider" />

              <button
                className="nb-theme-btn"
                onClick={toggleTheme}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            </div>

            {/* ── Mobile Controls ── */}
            <div className="nb-mobile-controls">
              <button
                className="nb-theme-btn"
                onClick={toggleTheme}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>

              <button
                className="nb-burger"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <div
                  className="nb-burger-line"
                  style={{
                    transform: mobileMenuOpen
                      ? "rotate(45deg) translate(4.6px, 4.6px)"
                      : "none",
                  }}
                />
                <div
                  className="nb-burger-line"
                  style={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    width: mobileMenuOpen ? "0px" : "17px",
                  }}
                />
                <div
                  className="nb-burger-line"
                  style={{
                    transform: mobileMenuOpen
                      ? "rotate(-45deg) translate(4.6px, -4.6px)"
                      : "none",
                  }}
                />
              </button>
            </div>
          </div>

          {/* Scroll glow accent line */}
          <div className="nb-glow" />
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileMenuOpen && (
          <div className="nb-drawer">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`nb-drawer-link ${isActive(l.href) ? "is-active" : "is-inactive"}`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="nb-drawer-icon">{l.icon}</div>
                <span style={{ flex: 1 }}>{l.label}</span>
                {isActive(l.href) && <div className="nb-drawer-dot" />}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
