"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/theme/Themecontext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { href: "/", label: "Dashboard"},
    { href: "/goals", label: "Goals"},
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
        }

        @media (min-width: 768px) {
          .mobile-controls {
            display: none !important;
          }
        }
      `}</style>

      <nav
        style={{
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
         
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
             
              <div>
                <span
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "var(--text)",
                    letterSpacing: "-0.5px",
                    display: "block",
                  }}
                >
                  DueOrDie
                </span>
                
              </div>
            </div>
          </Link>

          {/* Desktop Navigation. */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Nav links. */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "var(--surface)",
                borderRadius: 12,
                padding: "4px 4px",
                border: "1px solid var(--border)",
              }}
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: "none",
                    color: isActive(l.href) ? "var(--blue)" : "var(--text2)",
                    background: isActive(l.href)
                      ? "rgba(66, 153, 225, 0.1)"
                      : "transparent",
                    border: `1px solid ${isActive(l.href) ? "rgba(66, 153, 225, 0.3)" : "transparent"}`,
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(l.href)) {
                      e.currentTarget.style.background =
                        "rgba(66, 153, 225, 0.05)";
                      e.currentTarget.style.borderColor =
                        "rgba(66, 153, 225, 0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(l.href)) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }
                  }}
                >
                  <span style={{ fontSize: 16 }}></span>
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Theme toggle + . */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 1,
                  height: 24,
                  background: "var(--border)",
                }}
              />

              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  transition: "all 0.2s",
                  color: "var(--text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(66, 153, 225, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(66, 153, 225, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--surface)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            </div>
          </div>

          {/* Mobile menu button + theme toggle. */}
          <div
            className="mobile-controls"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                transition: "all 0.2s",
                color: "var(--text)",
              }}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Hamburger menu. */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: mobileMenuOpen
                  ? "rgba(66, 153, 225, 0.1)"
                  : "var(--surface)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                transition: "all 0.2s",
                padding: 0,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 2,
                  background: "var(--text)",
                  borderRadius: 1,
                  transition: "all 0.3s",
                  transform: mobileMenuOpen
                    ? "rotate(45deg) translateY(10px)"
                    : "rotate(0)",
                }}
              />
              <div
                style={{
                  width: 20,
                  height: 2,
                  background: "var(--text)",
                  borderRadius: 1,
                  transition: "all 0.3s",
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <div
                style={{
                  width: 20,
                  height: 2,
                  background: "var(--text)",
                  borderRadius: 1,
                  transition: "all 0.3s",
                  transform: mobileMenuOpen
                    ? "rotate(-45deg) translateY(-10px)"
                    : "rotate(0)",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: "12px",
              borderTop: "1px solid var(--border)",
              background: "var(--bg2)",
              animation: "slideDown 0.3s ease",
            }}
          >
            <style>{`
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  color: isActive(l.href) ? "var(--blue)" : "var(--text)",
                  background: isActive(l.href)
                    ? "rgba(66, 153, 225, 0.1)"
                    : "var(--surface)",
                  border: `1px solid ${isActive(l.href) ? "rgba(66, 153, 225, 0.3)" : "var(--border)"}`,
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 18 }}>{l.icon}</span>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
