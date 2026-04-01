"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useGoals,
  buildSchedule,
  computeStats,
  todayStr,
} from "@/app/hooks/useGoals";
import PanicMeter from "@/app/components/Panicmeter/Panicmeter";

const STATUS_CONFIG = {
  done: {
    label: "Done",
    color: "var(--green)",
    bg: "rgba(6,214,160,0.08)",
    border: "rgba(6,214,160,0.2)",
  },
  missed: {
    label: "Missed",
    color: "var(--accent)",
    bg: "rgba(255,77,77,0.08)",
    border: "rgba(255,77,77,0.2)",
  },
  today: {
    label: "Today",
    color: "var(--blue)",
    bg: "rgba(74,158,255,0.08)",
    border: "rgba(74,158,255,0.25)",
  },
  upcoming: {
    label: "Upcoming",
    color: "var(--text3)",
    bg: "transparent",
    border: "var(--border)",
  },
};

export default function GoalDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { goals, deleteGoal, updateGoal } = useGoals();
  const goal = goals.find((g) => g.id === id);
  const today = todayStr();

  if (!goal) {
    return (
      <div
        style={{
          maxWidth: 800,
          margin: "60px auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--text3)" }}>Goal not found.</p>
        <Link
          href="/"
          className="btn btn-secondary"
          style={{ marginTop: 16, display: "inline-flex" }}
        >
          ← Back
        </Link>
      </div>
    );
  }

  const { plan, endDate } = buildSchedule(goal);
  const stats = computeStats(goal);

  const handleDelete = () => {
    if (confirm("Delete this goal?")) {
      deleteGoal(id);
      router.push("/");
    }
  };

  const toggleMode = () => {
    updateGoal(id, { mode: goal.mode === "hard" ? "normal" : "hard" });
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="btn btn-ghost"
        style={{ marginBottom: 24, padding: "6px 12px", fontSize: 13 }}
      >
        ← Back
      </button>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 28,
              color: "var(--text)",
              letterSpacing: "-0.4px",
              marginBottom: 8,
            }}
          >
            {goal.title}
          </h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span
              className="badge"
              style={{
                background: "var(--surface2)",
                color: "var(--text2)",
                fontFamily: "Space Mono, monospace",
                fontSize: 11,
              }}
            >
              {goal.deadlineDays}d deadline
            </span>
            <span
              className="badge"
              style={{
                background: "var(--surface2)",
                color: "var(--text2)",
                fontSize: 11,
              }}
            >
              Started {formatDate(goal.startDate)}
            </span>
            <span
              className="badge"
              style={{
                background: "var(--surface2)",
                color: "var(--text2)",
                fontSize: 11,
              }}
            >
              Ends {formatDate(endDate)}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={toggleMode}
            className="btn btn-ghost"
            style={{
              fontSize: 13,
              borderColor:
                goal.mode === "hard" ? "var(--accent)" : "var(--border)",
              color: goal.mode === "hard" ? "var(--accent)" : "var(--text2)",
            }}
          >
            {goal.mode === "hard" ? "🔥 Hard Mode" : "⚖️ Normal Mode"}
          </button>
         
          <button
            onClick={handleDelete}
            className="btn btn-ghost"
            style={{
              fontSize: 13,
              color: "var(--accent)",
              borderColor: "rgba(255,77,77,0.3)",
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Progress",
            value: `${stats.progress}%`,
            color: stats.progress > 60 ? "var(--green)" : "var(--accent2)",
          },
          {
            label: "Completed",
            value: `${stats.completedTopics}/${stats.totalTopics}`,
            color: "var(--text)",
          },
          {
            label: "Streak",
            value: `${stats.streak}d 🔥`,
            color: stats.streak > 0 ? "var(--green)" : "var(--text3)",
          },
          {
            label: "Missed Days",
            value: stats.missedDays,
            color: stats.missedDays > 0 ? "var(--accent)" : "var(--green)",
          },
          {
            label: "Backlog",
            value: stats.backlogTopics,
            color: stats.backlogTopics > 0 ? "var(--accent)" : "var(--green)",
          },
          {
            label: "Days Left",
            value: stats.remaining,
            color: stats.remaining < 5 ? "var(--accent)" : "var(--text2)",
          },
        ].map((s) => (
          <div key={s.label} className="card" style={{ padding: "14px 16px" }}>
            <div
              style={{
                fontSize: 22,
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

      {/* Panic meter */}
      <div style={{ marginBottom: 28 }}>
        <PanicMeter level={stats.panicLevel} />
      </div>

      {/* Deadline warning */}
      {!stats.onTrack && stats.elapsed > 3 && (
        <div
          style={{
            background: "rgba(255,77,77,0.07)",
            border: "1px solid rgba(255,77,77,0.3)",
            borderRadius: 10,
            padding: "14px 18px",
            marginBottom: 24,
            fontSize: 13,
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 18 }}>⏳</span>
          <span>
            At your current pace, you{" "}
            <strong>
              will not meet your {goal.deadlineDays}-day deadline.
            </strong>{" "}
            You need to accelerate.
          </span>
        </div>
      )}

      {/* Schedule */}
      <h2
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: "var(--text)",
          marginBottom: 16,
        }}
      >
        Full Schedule
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {plan.map((day, i) => {
          const cfg = STATUS_CONFIG[day.status] || STATUS_CONFIG.upcoming;
          const allTopics = [...day.topics, ...(day.extra || [])];
          const isCollapsible = day.date < today && day.status !== "today";
          const isToday = day.date === today;

          return (
            <div
              key={day.date}
              style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                borderRadius: 10,
                padding: "14px 18px",
                transition: "all 0.2s",
                ...(isToday
                  ? { boxShadow: "0 0 0 2px rgba(74,158,255,0.3)" }
                  : {}),
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    style={{
                      fontFamily: "Space Mono, monospace",
                      fontSize: 12,
                      color: "var(--text3)",
                      minWidth: 60,
                    }}
                  >
                    Day {i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--text2)",
                    }}
                  >
                    {formatDate(day.date)}
                  </span>
                  <span
                    className="badge"
                    style={{
                      background: cfg.bg,
                      color: cfg.color,
                      border: `1px solid ${cfg.border}`,
                      fontSize: 11,
                    }}
                  >
                    {cfg.label}
                  </span>
                  {day.hasBacklog && (
                    <span
                      className="badge status-missed"
                      style={{ fontSize: 11 }}
                    >
                      +{day.extra?.length} backlog
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 12, color: "var(--text3)" }}>
                  {allTopics.length} topic{allTopics.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Topic pills */}
              {allTopics.length > 0 && (
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  {day.topics.map((t, j) => (
                    <span
                      key={j}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 100,
                        fontSize: 12,
                        background:
                          day.status === "done"
                            ? "rgba(6,214,160,0.1)"
                            : "var(--surface)",
                        color:
                          day.status === "done"
                            ? "var(--green)"
                            : "var(--text2)",
                        border: `1px solid ${day.status === "done" ? "rgba(6,214,160,0.2)" : "var(--border)"}`,
                        textDecoration:
                          day.status === "done" ? "line-through" : "none",
                        opacity: day.status === "done" ? 0.7 : 1,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  {(day.extra || []).map((t, j) => (
                    <span
                      key={`extra-${j}`}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 100,
                        fontSize: 12,
                        background: "rgba(255,77,77,0.1)",
                        color: "var(--accent)",
                        border: "1px solid rgba(255,77,77,0.2)",
                      }}
                    >
                      ↩ {t}
                    </span>
                  ))}
                </div>
              )}

              {isToday && (
                <div style={{ marginTop: 12 }}>
                  <Link
                    href={`/goals/${id}/today`}
                    className="btn btn-primary"
                    style={{ fontSize: 12, padding: "7px 14px" }}
                  >
                    Log Today's Progress →
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
