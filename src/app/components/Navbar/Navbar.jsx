"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/theme/Themecontext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/goals", label: "Goals" },
  ];

  return (
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
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                background: "var(--accent)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Space Mono, monospace",
                fontSize: 14,
                fontWeight: 700,
                color: "white",
              }}
            >
              SF
            </div>
            <span
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "var(--text)",
                letterSpacing: "-0.3px",
              }}
            >
              StackFlow
            </span>
          </div>
        </Link>

        {/* Nav links + toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                color: pathname === l.href ? "var(--text)" : "var(--text2)",
                background:
                  pathname === l.href ? "var(--surface)" : "transparent",
                border: `1px solid ${pathname === l.href ? "var(--border)" : "transparent"}`,
                transition: "all 0.2s",
              }}
            >
              {l.label}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            style={{
              marginLeft: 8,
              width: 38,
              height: 38,
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              transition: "all 0.2s",
              color: "var(--text)",
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}