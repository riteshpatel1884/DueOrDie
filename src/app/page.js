"use client";

import Link from "next/link";
import { useGoals, computeStats } from "@/app/hooks/useGoals";

const features = [
  {
    icon: "📅",
    title: "Smart Daily Scheduling",
    desc: "Add your topics, set a deadline — StackFlow automatically spreads every topic across every single day of your plan. No empty days, no guesswork.",
  },
  {
    icon: "⏱️",
    title: "Per-Topic Duration",
    desc: "Some topics take 3 days, others just 1. Set exact duration per topic and the schedule adjusts automatically — heavier topics get more days.",
  },
  {
    icon: "🔥",
    title: "Backlog Pressure System",
    desc: "Miss a day? Those topics don't disappear. They pile onto your upcoming days, making tomorrow heavier. The pressure is real — and intentional.",
  },
  {
    icon: "⚡",
    title: "Hard Mode & Normal Mode",
    desc: "Normal mode spreads your backlog over 3 days. Hard mode dumps it all on tomorrow. Choose your poison — both create accountability.",
  },
  {
    icon: "📊",
    title: "Panic Meter",
    desc: "A 0–100 pressure score calculated from missed days, backlog size, and pace. It turns red when you need to act. No sugarcoating.",
  },
  {
    icon: "⏳",
    title: "Deadline Integrity",
    desc: 'If you\'re falling behind pace, StackFlow tells you directly: "At this rate, you will miss your 60-day deadline." That hits differently than a to-do app.',
  },
  {
    icon: "🔢",
    title: "Streak Tracking",
    desc: "Build a streak of consecutive completed days. Losing a streak after 10 days of consistency is one of the best motivators to not skip today.",
  },
  {
    icon: "✅",
    title: "Daily Check-In",
    desc: "Log each day with a simple checklist — mark topics done or partial. Partial completions automatically become backlog for upcoming days.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Create a Goal",
    desc: "Name your goal, set a deadline in days, choose normal or hard backlog mode.",
  },
  {
    step: "02",
    title: "Add Topics + Duration",
    desc: "Add every topic you need to cover. Set how many days each topic needs — 1 day, 3 days, whatever.",
  },
  {
    step: "03",
    title: "Get Your Schedule",
    desc: "StackFlow distributes all topics evenly across your entire deadline — every day has something assigned.",
  },
  {
    step: "04",
    title: "Log Daily Progress",
    desc: "Each day, check off completed topics. Skipped ones automatically roll into upcoming days as backlog.",
  },
  {
    step: "05",
    title: "Feel the Pressure",
    desc: "Watch your Panic Meter climb as backlog grows. That anxiety? It's a feature — it makes you act.",
  },
];

export default function HomePage() {
  const { goals, loaded } = useGoals();
  const hasGoals = loaded && goals.length > 0;

  // Quick stats for users who have goals
  const totalBacklog = hasGoals
    ? goals.reduce((a, g) => a + computeStats(g).backlogTopics, 0)
    : 0;
  const avgProgress = hasGoals
    ? Math.round(
        goals.reduce((a, g) => a + computeStats(g).progress, 0) / goals.length,
      )
    : 0;

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* ── HERO ── */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 100,
            border: "1px solid rgba(255,77,77,0.3)",
            background: "rgba(255,77,77,0.07)",
            marginBottom: 28,
            fontSize: 13,
            color: "var(--accent)",
            fontFamily: "Space Mono, monospace",
          }}
        >
          <span>⚡</span> Consequence-Driven Productivity
        </div>

        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 6vw, 64px)",
            color: "var(--text)",
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 800,
            margin: "0 auto 24px",
          }}
        >
          Stop ignoring your
          <span style={{ color: "var(--accent)" }}> backlog.</span>
          <br />
          Start feeling the pressure.
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "var(--text2)",
            maxWidth: 560,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          StackFlow turns missed study days into visible, growing pressure — so
          you can't ignore what you owe yourself. Unlike Notion or Todoist, we
          don't let you off the hook.
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
            style={{ padding: "14px 28px", fontSize: 15 }}
          >
            Create Your First Goal →
          </Link>
          <Link
            href="/goals"
            className="btn btn-secondary"
            style={{ padding: "14px 28px", fontSize: 15 }}
          >
            {hasGoals ? `View My Goals (${goals.length})` : "See Goals Page"}
          </Link>
        </div>

        {/* Live user stats if they have goals */}
        {hasGoals && (
          <div
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
              marginTop: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "Active Goals",
                value: goals.length,
                color: "var(--blue)",
              },
              {
                label: "Avg Progress",
                value: `${avgProgress}%`,
                color: "var(--green)",
              },
              {
                label: "Total Backlog",
                value: totalBacklog,
                color: totalBacklog > 0 ? "var(--accent)" : "var(--green)",
              },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 28,
                    fontFamily: "Space Mono, monospace",
                    fontWeight: 700,
                    color: s.color,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginTop: 2,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── THE PROBLEM ── */}
      <section
        style={{
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "60px 24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 28,
              color: "var(--text)",
              marginBottom: 16,
              letterSpacing: "-0.4px",
            }}
          >
            Why normal planners fail you
          </h2>
          <p
            style={{
              color: "var(--text3)",
              fontSize: 15,
              maxWidth: 600,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Todoist, Notion, and Excel trackers all share one fatal flaw —
            missing a day has zero consequence. The task just sits there
            quietly, waiting. No pressure, no urgency.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                emoji: "😴",
                title: "Todoist",
                prob: "Tasks roll over silently. No one knows you missed day 5.",
              },
              {
                emoji: "📝",
                title: "Notion",
                prob: "Beautiful database, zero accountability. You can just uncheck.",
              },
              {
                emoji: "📊",
                title: "Excel/Sheets",
                prob: "You built the formula. You can also just delete the row.",
              },
              {
                emoji: "⚡",
                title: "StackFlow",
                prob: "Missed days compound into backlog. Tomorrow gets heavier. You feel it.",
                highlight: true,
              },
            ].map((c) => (
              <div
                key={c.title}
                className="card"
                style={{
                  padding: "20px",
                  borderColor: c.highlight
                    ? "rgba(255,77,77,0.4)"
                    : "var(--border)",
                  background: c.highlight
                    ? "rgba(255,77,77,0.05)"
                    : "var(--surface)",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{c.emoji}</div>
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: c.highlight ? "var(--accent)" : "var(--text)",
                    marginBottom: 8,
                  }}
                >
                  {c.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--text3)",
                    lineHeight: 1.6,
                  }}
                >
                  {c.prob}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        style={{ maxWidth: 900, margin: "0 auto", padding: "70px 24px" }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 28,
              color: "var(--text)",
              letterSpacing: "-0.4px",
              marginBottom: 10,
            }}
          >
            How it works
          </h2>
          <p style={{ color: "var(--text3)", fontSize: 15 }}>
            Five steps from zero to full pressure-mode.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {howItWorks.map((h, i) => (
            <div
              key={h.step}
              style={{
                display: "flex",
                gap: 24,
                alignItems: "flex-start",
                padding: "28px 0",
                borderBottom:
                  i < howItWorks.length - 1
                    ? "1px solid var(--border)"
                    : "none",
              }}
            >
              <div
                style={{
                  minWidth: 52,
                  height: 52,
                  borderRadius: 12,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Space Mono, monospace",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--accent)",
                }}
              >
                {h.step}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 17,
                    color: "var(--text)",
                    marginBottom: 6,
                  }}
                >
                  {h.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text3)",
                    lineHeight: 1.7,
                  }}
                >
                  {h.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section
        style={{
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "70px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: 28,
                color: "var(--text)",
                letterSpacing: "-0.4px",
                marginBottom: 10,
              }}
            >
              Everything you need to stay on track
            </h2>
            <p style={{ color: "var(--text3)", fontSize: 15 }}>
              Features designed for pressure, not comfort.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {features.map((f) => (
              <div key={f.title} className="card" style={{ padding: "22px" }}>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{f.icon}</div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "var(--text)",
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text3)",
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 20 }}>🔥</div>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 32,
            color: "var(--text)",
            letterSpacing: "-0.6px",
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Your backlog is waiting.
          <br />
          <span style={{ color: "var(--accent)" }}>Start today.</span>
        </h2>
        <p
          style={{
            color: "var(--text3)",
            fontSize: 15,
            marginBottom: 32,
            lineHeight: 1.7,
          }}
        >
          Every day you delay is another day of backlog that will haunt you.
          StackFlow makes sure you can't ignore it.
        </p>
        <Link
          href="/goals/new"
          className="btn btn-primary"
          style={{ padding: "16px 36px", fontSize: 16 }}
        >
          Create Your Goal Now →
        </Link>
        {hasGoals && (
          <p style={{ marginTop: 16, fontSize: 13, color: "var(--text3)" }}>
            Or{" "}
            <Link
              href="/goals"
              style={{ color: "var(--blue)", textDecoration: "none" }}
            >
              view your {goals.length} active goal
              {goals.length !== 1 ? "s" : ""}
            </Link>
          </p>
        )}
      </section>
    </div>
  );
}
