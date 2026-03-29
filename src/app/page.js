"use client";

import {
  useGoals,
  computeStats,
  buildSchedule,
  todayStr,
} from "@/app/hooks/useGoals";
import GoalCard from "./components/Goalcard/Goalcard";
import Link from "next/link";

export default function Dashboard() {
  const { goals, loaded, deleteGoal } = useGoals();
  const today = todayStr();

  if (!loaded) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <span
          style={{
            color: "var(--text3)",
            fontFamily: "Space Mono, monospace",
            fontSize: 13,
          }}
        >
          loading...
        </span>
      </div>
    );
  }

  // Global stats
  const allStats = goals.map((g) => computeStats(g));
  const totalBacklog = allStats.reduce((a, s) => a + s.backlogTopics, 0);
  const totalMissed = allStats.reduce((a, s) => a + s.missedDays, 0);
  const avgProgress = goals.length
    ? Math.round(allStats.reduce((a, s) => a + s.progress, 0) / goals.length)
    : 0;

  // Today's tasks across all goals
  const todayTasks = goals.flatMap((g) => {
    const { plan } = buildSchedule(g);
    const todayPlan = plan.find((d) => d.date === today);
    if (!todayPlan || todayPlan.status === "done") return [];
    const all = [...todayPlan.topics, ...(todayPlan.extra || [])];
    return all.map((t) => ({ topic: t, goalTitle: g.title, goalId: g.id }));
  });

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      {/* Header */}
      <div className="animate-fadeUp" style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: 32,
                color: "var(--text)",
                letterSpacing: "-0.5px",
                marginBottom: 6,
              }}
            >
              Dashboard
            </h1>
            <p style={{ color: "var(--text3)", fontSize: 14 }}>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <Link href="/goals/new" className="btn btn-primary">
            + New Goal
          </Link>
        </div>
      </div>

      {goals.length === 0 ? (
        // Empty state
        <div
          className="card animate-fadeUp delay-1"
          style={{
            padding: "60px 40px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 48 }}>📚</div>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: "var(--text)",
            }}
          >
            No goals yet
          </h2>
          <p style={{ color: "var(--text3)", maxWidth: 380, lineHeight: 1.7 }}>
            Create your first goal, add topics, set a deadline — and let
            StackFlow track the pressure for you.
          </p>
          <Link
            href="/goals/new"
            className="btn btn-primary"
            style={{ marginTop: 8 }}
          >
            Create First Goal →
          </Link>
        </div>
      ) : (
        <>
          {/* Global stats */}
          <div
            className="animate-fadeUp delay-1"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              marginBottom: 32,
            }}
          >
            {[
              {
                label: "Active Goals",
                value: goals.length,
                color: "var(--blue)",
                icon: "🎯",
              },
              {
                label: "Today's Topics",
                value: todayTasks.length,
                color: "var(--blue)",
                icon: "📋",
              },
              {
                label: "Avg. Progress",
                value: `${avgProgress}%`,
                color: avgProgress > 50 ? "var(--green)" : "var(--accent2)",
                icon: "📈",
              },
              {
                label: "Total Backlog",
                value: totalBacklog,
                color: totalBacklog > 0 ? "var(--accent)" : "var(--green)",
                icon: "⚠️",
              },
              {
                label: "Missed Days",
                value: totalMissed,
                color: totalMissed > 0 ? "var(--accent)" : "var(--green)",
                icon: "📅",
              },
            ].map((s, i) => (
              <div
                key={s.label}
                className="card"
                style={{ padding: "16px 20px" }}
              >
                <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
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
                    fontSize: 11,
                    color: "var(--text3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginTop: 3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Today's tasks callout */}
          {todayTasks.length > 0 && (
            <div
              className="animate-fadeUp delay-2"
              style={{
                background: "rgba(74, 158, 255, 0.07)",
                border: "1px solid rgba(74, 158, 255, 0.25)",
                borderRadius: 12,
                padding: "20px 24px",
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "var(--blue)",
                  }}
                >
                  📋 Today you need to cover {todayTasks.length} topic
                  {todayTasks.length !== 1 ? "s" : ""}
                </h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {todayTasks.slice(0, 10).map((t, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "4px 12px",
                      background: "rgba(74, 158, 255, 0.1)",
                      border: "1px solid rgba(74, 158, 255, 0.2)",
                      borderRadius: 100,
                      fontSize: 12,
                      color: "var(--text2)",
                    }}
                  >
                    {t.topic}
                    <span
                      style={{
                        color: "var(--text3)",
                        marginLeft: 4,
                        fontSize: 10,
                      }}
                    >
                      ({t.goalTitle})
                    </span>
                  </span>
                ))}
                {todayTasks.length > 10 && (
                  <span
                    style={{
                      padding: "4px 12px",
                      fontSize: 12,
                      color: "var(--text3)",
                    }}
                  >
                    +{todayTasks.length - 10} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Goal cards */}
          <h2
            className="animate-fadeUp delay-3"
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            Your Goals
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: 20,
            }}
          >
            {goals.map((g, i) => (
              <GoalCard key={g.id} goal={g} onDelete={deleteGoal} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
