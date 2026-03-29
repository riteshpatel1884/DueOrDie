"use client";

import Link from "next/link";
import { useGoals, computeStats } from "@/app/hooks/useGoals";

const features = [
  {
    icon: "📅",
    title: "Smart Daily Scheduling",
    desc: "Add your topics, set a deadline — DueOrDie automatically spreads every topic across every single day of your plan. No empty days, no guesswork.",
    tag: "Core",
  },
  {
    icon: "⏱️",
    title: "Per-Topic Duration",
    desc: "Some topics take 3 days, others just 1. Set exact duration per topic and the schedule adjusts automatically.",
    tag: "Smart",
  },
  {
    icon: "🔥",
    title: "Backlog Pressure System",
    desc: "Miss a day? Those topics pile onto upcoming days, making tomorrow heavier. The pressure is real — and intentional.",
    tag: "Pressure",
  },
  {
    icon: "⚡",
    title: "Hard Mode & Normal Mode",
    desc: "Normal mode spreads your backlog over 3 days. Hard mode dumps it all on tomorrow. Choose your poison.",
    tag: "Modes",
  },
  {
    icon: "⏳",
    title: "Deadline Integrity",
    desc: "If you're falling behind pace, DueOrDie tells you directly. That hits differently than a to-do app.",
    tag: "Tracking",
  },
  {
    icon: "🔢",
    title: "Streak Tracking",
    desc: "Build a streak of consecutive completed days. Losing a streak after 10 days is one of the best motivators.",
    tag: "Habit",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Create a Goal",
    desc: "Name your goal, set a deadline, choose backlog mode.",
    icon: "🎯",
    color: "#FF4D4D",
    bg: "rgba(255,77,77,0.12)",
    border: "rgba(255,77,77,0.3)",
  },
  {
    step: "02",
    title: "Add Topics",
    desc: "Add topics with how many days each one needs.",
    icon: "📚",
    color: "#4D9FFF",
    bg: "rgba(77,159,255,0.12)",
    border: "rgba(77,159,255,0.3)",
  },
  {
    step: "03",
    title: "Get Scheduled",
    desc: "Topics distribute across every day automatically.",
    icon: "📆",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.3)",
  },
  {
    step: "04",
    title: "Log Progress",
    desc: "Check off daily topics. Skipped ones become backlog.",
    icon: "✅",
    color: "#34D399",
    bg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.3)",
  },
  {
    step: "05",
    title: "Feel Pressure",
    desc: "Watch your Panic Meter rise. That anxiety makes you act.",
    icon: "🔥",
    color: "#FB923C",
    bg: "rgba(251,146,60,0.12)",
    border: "rgba(251,146,60,0.3)",
  },
];

const competitors = [
  {
    name: "Todoist",
    flaw: "Tasks roll over silently. No consequence for missing day 5.",
  },
  {
    name: "Notion",
    flaw: "Beautiful database, zero accountability. You can just uncheck.",
  },
  {
    name: "Excel / Sheets",
    flaw: "You built the formula. You can also just delete the row.",
  },
];

export default function HomePage() {
  const { goals, loaded } = useGoals();
  const hasGoals = loaded && goals.length > 0;

  const totalBacklog = hasGoals
    ? goals.reduce((a, g) => a + computeStats(g).backlogTopics, 0)
    : 0;
  const avgProgress = hasGoals
    ? Math.round(
        goals.reduce((a, g) => a + computeStats(g).progress, 0) / goals.length,
      )
    : 0;

  return (
    <div style={{ background: "var(--bg)", overflowX: "hidden" }}>
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.2); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .hero-badge { animation: fadeUp 0.5s 0.0s ease both; }
        .hero-h1    { animation: fadeUp 0.5s 0.1s ease both; }
        .hero-sub   { animation: fadeUp 0.5s 0.2s ease both; }
        .hero-btns  { animation: fadeUp 0.5s 0.3s ease both; }
        .hero-stats { animation: fadeUp 0.5s 0.4s ease both; }

        .feat-card { transition: transform 0.22s, border-color 0.2s; cursor: default; }
        .feat-card:hover { transform: translateY(-3px); border-color: rgba(255,77,77,0.35) !important; }
        .feat-card:hover .feat-icon { border-color: rgba(255,77,77,0.4) !important; background: rgba(255,77,77,0.07) !important; }
        .feat-icon { transition: border-color 0.2s, background 0.2s; }

        .comp-row { transition: background 0.15s; }
        .comp-row:hover { background: rgba(255,255,255,0.025) !important; }

        @media (max-width: 680px) {
          .hiw-grid      { display: none !important; }
          .hiw-mobile    { display: flex !important; }
          .problem-split { flex-direction: column !important; gap: 36px !important; }
        }
      `}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section
        style={{
          position: "relative",
          maxWidth: 1100,
          margin: "0 auto",
          padding: "104px 24px 84px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background orbs */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 760,
            height: 440,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,77,77,0.11) 0%, transparent 62%)",
            pointerEvents: "none",
            filter: "blur(4px)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "35%",
            left: "8%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(77,159,255,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "25%",
            right: "6%",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(167,139,250,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        

        {/* Headline */}
        <h1
          className="hero-h1"
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(40px, 6.5vw, 74px)",
            color: "var(--text)",
            letterSpacing: "-2.5px",
            lineHeight: 1.05,
            margin: "0 auto 28px",
            maxWidth: 860,
          }}
        >
          Stop ignoring your{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FF4D4D 30%, #FB923C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            backlog.
          </span>
          <br />
          Start feeling the pressure.
        </h1>

        {/* Sub */}
        <p
          className="hero-sub"
          style={{
            fontSize: 17,
            color: "var(--text2)",
            maxWidth: 490,
            margin: "0 auto 44px",
            lineHeight: 1.8,
          }}
        >
          DueOrDie turns missed study days into{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>
            visible, compounding pressure
          </strong>{" "}
          — so you can't pretend you're on track when you're not.
        </p>

        {/* CTAs */}
        <div
          className="hero-btns"
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/goals/new"
            className="btn btn-primary"
            style={{
              padding: "15px 32px",
              fontSize: 15,
              borderRadius: 11,
              fontWeight: 700,
              background: "linear-gradient(135deg, #FF4D4D, #e03e3e)",
              boxShadow: "0 4px 24px rgba(255,77,77,0.30)",
              border: "none",
            }}
          >
            Create Your First Goal →
          </Link>
          <Link
            href="/goals"
            className="btn btn-secondary"
            style={{
              padding: "15px 32px",
              fontSize: 15,
              borderRadius: 11,
            }}
          >
            {hasGoals ? `My Goals (${goals.length})` : "Browse Goals"}
          </Link>
        </div>

        {/* Stat strip (only if goals exist) */}
        {hasGoals && (
          <div
            className="hero-stats"
            style={{
              display: "flex",
              maxWidth: 460,
              margin: "52px auto 0",
              border: "1px solid var(--border)",
              borderRadius: 16,
              overflow: "hidden",
              background: "var(--surface)",
            }}
          >
            {[
              { label: "Active Goals", value: goals.length, color: "#4D9FFF" },
              {
                label: "Avg Progress",
                value: `${avgProgress}%`,
                color: "#34D399",
              },
              {
                label: "Total Backlog",
                value: totalBacklog,
                color: totalBacklog > 0 ? "#FF4D4D" : "#34D399",
              },
            ].map((s, i, arr) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  padding: "20px 16px",
                  textAlign: "center",
                  borderRight:
                    i < arr.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontFamily: "Space Mono, monospace",
                    fontWeight: 700,
                    color: s.color,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--text3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ═══════════ PROBLEM ═══════════ */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg2)",
        }}
      >
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "80px 24px" }}>
          {/* Section label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 52,
            }}
          >
            <div
              style={{
                width: 28,
                height: 1,
                background: "var(--accent)",
                opacity: 0.6,
              }}
            />
            <span
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: 10,
                color: "var(--text3)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              The Problem
            </span>
          </div>

          <div
            className="problem-split"
            style={{ display: "flex", gap: 64, alignItems: "flex-start" }}
          >
            {/* Left copy */}
            <div style={{ flex: "0 0 320px" }}>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(24px, 2.8vw, 36px)",
                  color: "var(--text)",
                  letterSpacing: "-0.9px",
                  lineHeight: 1.18,
                  marginBottom: 20,
                }}
              >
                Normal planners let you lie to yourself.
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text3)",
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}
              >
                Every other tool lets you skip a day with zero consequence. The
                task sits there quietly — no weight, no pressure, no truth.
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  border: "1px solid rgba(255,77,77,0.28)",
                  borderRadius: 8,
                  background: "rgba(255,77,77,0.06)",
                }}
              >
                
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--accent)",
                    fontFamily: "Space Mono, monospace",
                    letterSpacing: "0.04em",
                  }}
                >
                  DueOrDie is different
                </span>
              </div>
            </div>

            {/* Right: comparison table */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Table header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 88px 88px",
                  padding: "0 16px 14px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {["Tool", "Backlog", "Pressure"].map((h) => (
                  <span
                    key={h}
                    style={{
                      fontSize: 10,
                      color: "var(--text3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontFamily: "Space Mono, monospace",
                      textAlign: h === "Tool" ? "left" : "center",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Competitors */}
              {competitors.map((c) => (
                <div
                  key={c.name}
                  className="comp-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 88px 88px",
                    padding: "18px 16px",
                    borderBottom: "1px solid var(--border)",
                    borderRadius: 6,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        color: "var(--text)",
                        marginBottom: 4,
                      }}
                    >
                      {c.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text3)",
                        lineHeight: 1.55,
                      }}
                    >
                      {c.flaw}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 17,
                    }}
                  >
                    ❌
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 17,
                    }}
                  >
                    ❌
                  </div>
                </div>
              ))}

              {/* DueOrDie highlighted row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 88px 88px",
                  padding: "18px 16px",
                  marginTop: 10,
                  background: "rgba(255,77,77,0.05)",
                  border: "1px solid rgba(255,77,77,0.25)",
                  borderRadius: 12,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "linear-gradient(90deg, #FF4D4D, transparent)",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 800,
                      fontSize: 14,
                      color: "var(--accent)",
                      marginBottom: 4,
                    }}
                  >
                    DueOrDie ⚡
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text3)",
                      lineHeight: 1.55,
                    }}
                  >
                    Missed days compound into backlog. Tomorrow gets heavier.
                    You feel it.
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 17,
                  }}
                >
                  ✅
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 17,
                  }}
                >
                  ✅
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 28,
              height: 1,
              background: "var(--accent)",
              opacity: 0.6,
            }}
          />
          <span
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: 10,
              color: "var(--text3)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            How It Works
          </span>
        </div>

        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(24px, 3vw, 36px)",
            color: "var(--text)",
            letterSpacing: "-0.8px",
            marginBottom: 56,
            maxWidth: 380,
            lineHeight: 1.2,
          }}
        >
          Five steps to full pressure-mode.
        </h2>

        {/* Desktop zigzag */}
        <div
          className="hiw-grid"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {howItWorks.map((h, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={h.step}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 1fr",
                  alignItems: "center",
                  minHeight: 130,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "0 20px",
                  }}
                >
                  {isEven ? <StepCard h={h} align="right" /> : <div />}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {i > 0 ? (
                    <div
                      style={{
                        flex: 1,
                        width: 2,
                        background: `linear-gradient(180deg, ${howItWorks[i - 1].color}60, ${h.color}60)`,
                      }}
                    />
                  ) : (
                    <div style={{ flex: 1 }} />
                  )}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: h.bg,
                      border: `2px solid ${h.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                      zIndex: 2,
                      boxShadow: `0 0 20px ${h.color}25`,
                    }}
                  >
                    {h.icon}
                  </div>
                  {i < howItWorks.length - 1 ? (
                    <div
                      style={{
                        flex: 1,
                        width: 2,
                        background: `linear-gradient(180deg, ${h.color}60, ${howItWorks[i + 1].color}60)`,
                      }}
                    />
                  ) : (
                    <div style={{ flex: 1 }} />
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    padding: "0 20px",
                  }}
                >
                  {!isEven ? <StepCard h={h} align="left" /> : <div />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile list */}
        <div
          className="hiw-mobile"
          style={{ display: "none", flexDirection: "column", gap: 14 }}
        >
          {howItWorks.map((h) => (
            <div
              key={h.step}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                padding: "18px",
                borderRadius: 14,
                background: h.bg,
                border: `1px solid ${h.border}`,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: h.bg,
                  border: `2px solid ${h.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {h.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Space Mono, monospace",
                    fontSize: 11,
                    color: h.color,
                    marginBottom: 4,
                    letterSpacing: "0.06em",
                  }}
                >
                  STEP {h.step}
                </div>
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "var(--text)",
                    marginBottom: 4,
                  }}
                >
                  {h.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--text3)",
                    lineHeight: 1.6,
                  }}
                >
                  {h.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section
        style={{
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 28,
                height: 1,
                background: "var(--accent)",
                opacity: 0.6,
              }}
            />
            <span
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: 10,
                color: "var(--text3)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Features
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 52,
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(24px, 3vw, 36px)",
                color: "var(--text)",
                letterSpacing: "-0.9px",
                lineHeight: 1.18,
                maxWidth: 340,
              }}
            >
              Built for pressure,
              <br />
              not comfort.
            </h2>
            
          </div>

          {/* Mosaic grid — unified border look */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 1,
              border: "1px solid var(--border)",
              borderRadius: 18,
              overflow: "hidden",
              background: "var(--border)",
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="feat-card"
                style={{
                  padding: "28px 26px",
                  background: "var(--bg2)",
                  position: "relative",
                }}
              >
                {/* Tag */}
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    fontSize: 10,
                    fontFamily: "Space Mono, monospace",
                    color: "var(--text3)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "2px 7px",
                  }}
                >
                  {f.tag}
                </div>
                {/* Icon */}
                <div
                  className="feat-icon"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    marginBottom: 18,
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "var(--text)",
                    marginBottom: 10,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text3)",
                    lineHeight: 1.75,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Subtle grid texture */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `
            linear-gradient(rgba(255,77,77,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,77,77,0.035) 1px, transparent 1px)
          `,
            backgroundSize: "52px 52px",
          }}
        />
        {/* Centre glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 860,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,77,77,0.09) 0%, transparent 58%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "104px 24px 116px",
            textAlign: "center",
            position: "relative",
          }}
        >
         

          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(34px, 5.5vw, 60px)",
              letterSpacing: "-1.8px",
              lineHeight: 1.08,
              marginBottom: 24,
              color: "var(--text)",
            }}
          >
            Your backlog is{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF4D4D, #FB923C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              waiting.
            </span>
          </h2>

          <p
            style={{
              color: "var(--text3)",
              fontSize: 16,
              margin: "0 auto 48px",
              lineHeight: 1.8,
              maxWidth: 440,
            }}
          >
            Every day you delay is another layer of backlog you'll have to face.
            DueOrDie makes sure you can't hide from it.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/goals/new"
              className="btn btn-primary"
              style={{
                padding: "16px 42px",
                fontSize: 16,
                borderRadius: 12,
                fontWeight: 700,
                background: "linear-gradient(135deg, #FF4D4D, #e03e3e)",
                boxShadow: "0 6px 32px rgba(255,77,77,0.32)",
                border: "none",
                letterSpacing: "-0.2px",
              }}
            >
              Create Your Goal Now →
            </Link>
            {hasGoals && (
              <Link
                href="/goals"
                className="btn btn-secondary"
                style={{
                  padding: "16px 28px",
                  fontSize: 15,
                  borderRadius: 12,
                }}
              >
                View {goals.length} Goal{goals.length !== 1 ? "s" : ""}
              </Link>
            )}
          </div>

         
        </div>
      </section>
    </div>
  );
}

/* ─── StepCard (How It Works) ─── */
function StepCard({ h, align }) {
  return (
    <div
      style={{
        maxWidth: 320,
        width: "100%",
        padding: "20px 22px",
        borderRadius: 16,
        background: h.bg,
        border: `1px solid ${h.border}`,
        textAlign: align === "right" ? "right" : "left",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: align === "right" ? "auto" : 0,
          right: align === "right" ? 0 : "auto",
          width: "50%",
          height: 2,
          background: `linear-gradient(${align === "right" ? "270deg" : "90deg"}, ${h.color}, transparent)`,
        }}
      />
      <div
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: 11,
          color: h.color,
          letterSpacing: "0.08em",
          marginBottom: 6,
          opacity: 0.8,
        }}
      >
        STEP {h.step}
      </div>
      <div
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "var(--text)",
          marginBottom: 6,
        }}
      >
        {h.title}
      </div>
      <div style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.65 }}>
        {h.desc}
      </div>
    </div>
  );
}
