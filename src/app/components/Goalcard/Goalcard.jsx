"use client";

import Link from "next/link";
import { computeStats, buildSchedule, todayStr } from "@/app/hooks/useGoals";
import PanicMeter from "../Panicmeter/Panicmeter";

export default function GoalCard({ goal, onDelete }) {
  const stats = computeStats(goal);
  const { plan } = buildSchedule(goal);
  const today = todayStr();
  const todayPlan = plan.find((d) => d.date === today);
  const todayTopicCount = todayPlan
    ? todayPlan.topics.length + (todayPlan.extra?.length || 0)
    : 0;

  return (
    <div
      className="card animate-fadeUp"
      style={{
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "all 0.2s",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "var(--text)",
              marginBottom: 4,
            }}
          >
            {goal.title}
          </h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="badge status-pending">
              {goal.topics.length} topics
            </span>
            <span
              className="badge"
              style={{
                background: "var(--surface2)",
                color: "var(--text2)",
                fontFamily: "Space Mono, monospace",
                fontSize: 11,
              }}
            >
              {goal.deadlineDays}d goal
            </span>
            {goal.mode === "hard" && (
              <span
                className="badge"
                style={{
                  background: "rgba(255,77,77,0.15)",
                  color: "var(--accent)",
                  fontSize: 11,
                }}
              >
                🔥 Hard Mode
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onDelete(goal.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text3)",
            fontSize: 18,
            padding: "2px 6px",
            borderRadius: 6,
            transition: "color 0.2s",
          }}
          title="Delete goal"
          onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.target.style.color = "var(--text3)")}
        >
          ×
        </button>
      </div>

      {/* Progress */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
            fontSize: 12,
          }}
        >
          <span style={{ color: "var(--text3)" }}>Overall Progress</span>
          <span
            style={{
              color: "var(--text2)",
              fontFamily: "Space Mono, monospace",
            }}
          >
            {stats.completedTopics}/{stats.totalTopics} topics
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${stats.progress}%`,
              background:
                stats.panicLevel >= 70
                  ? "var(--accent)"
                  : stats.panicLevel >= 40
                    ? "var(--accent2)"
                    : "var(--green)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
            fontSize: 11,
            color: "var(--text3)",
          }}
        >
          <span>{stats.progress}% complete</span>
          <span>{stats.remaining}d remaining</span>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        {[
          {
            label: "Streak",
            value: `${stats.streak}d`,
            color: stats.streak > 0 ? "var(--green)" : "var(--text3)",
          },
          {
            label: "Missed",
            value: stats.missedDays,
            color: stats.missedDays > 0 ? "var(--accent)" : "var(--text3)",
          },
          {
            label: "Today's Tasks",
            value: todayTopicCount,
            color: todayTopicCount > 0 ? "var(--blue)" : "var(--text3)",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--bg2)",
              borderRadius: 8,
              padding: "10px 12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 18,
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
                marginTop: 2,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Panic meter */}
      <PanicMeter level={stats.panicLevel} compact />

      {/* Backlog warning */}
      {stats.backlogTopics > 0 && (
        <div
          style={{
            background: "rgba(255,77,77,0.07)",
            border: "1px solid rgba(255,77,77,0.25)",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 13,
            color: "var(--accent)",
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span>⚠️</span>
          <span>
            <strong>{stats.backlogTopics} overdue topics</strong> have been
            redistributed to upcoming days.
          </span>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <Link
          href={`/goals/${goal.id}`}
          className="btn btn-primary"
          style={{ flex: 1, justifyContent: "center", fontSize: 13 }}
        >
          View Schedule
        </Link>
        <Link
          href={`/goals/${goal.id}/today`}
          className="btn btn-secondary"
          style={{ flex: 1, justifyContent: "center", fontSize: 13 }}
        >
          Log Today
        </Link>
      </div>
    </div>
  );
}
