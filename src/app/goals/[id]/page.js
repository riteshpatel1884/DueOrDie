"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
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
    bg: "rgba(6,214,160,0.06)",
    border: "rgba(6,214,160,0.18)",
    dot: "#06d6a0",
  },
  missed: {
    label: "Missed",
    color: "var(--accent)",
    bg: "rgba(255,77,77,0.06)",
    border: "rgba(255,77,77,0.18)",
    dot: "#ff4d4d",
  },
  today: {
    label: "Today",
    color: "var(--blue)",
    bg: "rgba(74,158,255,0.06)",
    border: "rgba(74,158,255,0.25)",
    dot: "#4a9eff",
  },
  upcoming: {
    label: "Upcoming",
    color: "var(--text3)",
    bg: "transparent",
    border: "var(--border)",
    dot: "var(--border2)",
  },
};

// ─── Backlog Drawer ─────────────────────────────────────────────────────────
function BacklogDrawer({ backlogItems, onClose }) {
  return (
    <>
      <style>{`
        @keyframes drawerIn {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes bdIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 800,
          animation: "bdIn 0.2s ease",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(400px, 92vw)",
          background: "var(--surface)",
          borderLeft: "1px solid var(--border)",
          zIndex: 900,
          animation: "drawerIn 0.35s cubic-bezier(.22,1,.36,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-16px 0 48px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: 17,
                color: "var(--text)",
                marginBottom: 3,
              }}
            >
              Backlog Queue
            </div>
            <div style={{ fontSize: 12, color: "var(--text3)" }}>
              {backlogItems.length} topic{backlogItems.length !== 1 ? "s" : ""}{" "}
              pending
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--surface2)",
              color: "var(--text3)",
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            ×
          </button>
        </div>

        {backlogItems.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              color: "var(--text3)",
              fontSize: 14,
            }}
          >
            <div style={{ fontSize: 36 }}>✨</div>
            <p>All caught up! No backlog.</p>
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px 20px",
              scrollbarWidth: "thin",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {backlogItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: "rgba(255,77,77,0.05)",
                    border: "1px solid rgba(255,77,77,0.15)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      marginTop: 5,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        color: "var(--text)",
                        fontFamily: "DM Sans, sans-serif",
                        marginBottom: 3,
                      }}
                    >
                      {item.topic}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text3)",
                        fontFamily: "Space Mono, monospace",
                      }}
                    >
                      from{" "}
                      {new Date(item.fromDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          style={{ padding: "16px 20px", borderTop: "1px solid var(--border)" }}
        >
          <p
            style={{
              fontSize: 12,
              color: "var(--text3)",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Backlog topics will appear in your today's session for you to clear.
          </p>
        </div>
      </div>
    </>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function GoalDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { goals, deleteGoal } = useGoals();
  const goal = goals.find((g) => g.id === id);
  const today = todayStr();
  const [showBacklogDrawer, setShowBacklogDrawer] = useState(false);

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

  // Collect all backlog items from the plan
  const allBacklogItems = plan
    .filter((d) => d.extra?.length > 0)
    .flatMap((d) =>
      (d.extra || []).map((topic) => ({ topic, fromDate: d.date })),
    );

  const handleDelete = () => {
    if (confirm("Delete this goal?")) {
      deleteGoal(id);
      router.push("/");
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes backlogPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,77,77,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(255,77,77,0); }
        }
        .stat-card {
          transition: all 0.2s cubic-bezier(.22,1,.36,1);
        }
        .stat-card:hover {
          transform: translateY(-2px);
          border-color: var(--border2) !important;
        }
        .day-row {
          transition: all 0.2s ease;
        }
        .day-row:hover {
          transform: translateX(2px);
        }
        .backlog-fab-btn {
          animation: backlogPulse 2.5s ease-in-out infinite;
          transition: all 0.2s cubic-bezier(.22,1,.36,1) !important;
        }
        .backlog-fab-btn:hover {
          transform: scale(1.05) !important;
        }
      `}</style>

      {showBacklogDrawer && (
        <BacklogDrawer
          backlogItems={allBacklogItems}
          onClose={() => setShowBacklogDrawer(false)}
        />
      )}

      <div
        style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 80px" }}
      >
        {/* Back */}
        <button
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            color: "var(--text3)",
            fontSize: 13,
            cursor: "pointer",
            marginBottom: 28,
            padding: "6px 0",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
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
            animation: "fadeUp 0.35s ease",
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
                marginBottom: 10,
              }}
            >
              {goal.title}
            </h1>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: `${goal.deadlineDays}d deadline`, mono: true },
                { label: `Started ${formatDate(goal.startDate)}` },
                { label: `Ends ${formatDate(endDate)}` },
              ].map((b) => (
                <span
                  key={b.label}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 99,
                    background: "var(--surface2)",
                    color: "var(--text3)",
                    fontSize: 11,
                    border: "1px solid var(--border)",
                    fontFamily: b.mono ? "Space Mono, monospace" : "inherit",
                  }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* Backlog button */}
            {allBacklogItems.length > 0 && (
              <button
                className="backlog-fab-btn"
                onClick={() => setShowBacklogDrawer(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,77,77,0.35)",
                  background: "rgba(255,77,77,0.08)",
                  color: "var(--accent)",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  {allBacklogItems.length}
                </span>
                Backlog
              </button>
            )}

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
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 10,
            marginBottom: 22,
            animation: "fadeUp 0.35s ease 0.05s both",
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
              label: "Missed",
              value: stats.missedDays,
              color: stats.missedDays > 0 ? "var(--accent)" : "var(--green)",
            },
            {
              label: "Backlog",
              value: allBacklogItems.length,
              color:
                allBacklogItems.length > 0 ? "var(--accent)" : "var(--green)",
            },
            {
              label: "Days Left",
              value: stats.remaining,
              color: stats.remaining < 5 ? "var(--accent)" : "var(--text2)",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="stat-card card"
              style={{
                padding: "14px 16px",
                border: "1px solid var(--border)",
                borderRadius: 14,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontFamily: "Space Mono, monospace",
                  fontWeight: 700,
                  color: s.color,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--text3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  marginTop: 5,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Panic meter */}
        <div
          style={{ marginBottom: 24, animation: "fadeUp 0.35s ease 0.1s both" }}
        >
          <PanicMeter level={stats.panicLevel} />
        </div>

        {/* Deadline warning */}
        {!stats.onTrack && stats.elapsed > 3 && (
          <div
            style={{
              background: "rgba(255,77,77,0.06)",
              border: "1px solid rgba(255,77,77,0.25)",
              borderRadius: 12,
              padding: "13px 18px",
              marginBottom: 22,
              fontSize: 13,
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              animation: "fadeUp 0.35s ease 0.15s both",
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
            fontSize: 17,
            color: "var(--text)",
            marginBottom: 14,
            animation: "fadeUp 0.35s ease 0.2s both",
          }}
        >
          Full Schedule
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 7,
            animation: "fadeUp 0.35s ease 0.25s both",
          }}
        >
          {plan.map((day, i) => {
            const cfg = STATUS_CONFIG[day.status] || STATUS_CONFIG.upcoming;
            const allTopics = day.topics;
            const isToday = day.date === today;
            const backlogCount = day.extra?.length || 0;

            return (
              <div
                key={day.date}
                className="day-row"
                style={{
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  borderRadius: 12,
                  padding: "13px 18px",
                  boxShadow: isToday
                    ? "0 0 0 2px rgba(74,158,255,0.25)"
                    : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Today highlight line */}
                {isToday && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: "var(--blue)",
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    {/* Status dot */}
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: cfg.dot,
                        flexShrink: 0,
                        boxShadow:
                          day.status === "done"
                            ? "0 0 6px rgba(6,214,160,0.5)"
                            : day.status === "today"
                              ? "0 0 6px rgba(74,158,255,0.5)"
                              : "none",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Space Mono, monospace",
                        fontSize: 11,
                        color: "var(--text3)",
                        minWidth: 48,
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
                      style={{
                        fontSize: 10,
                        padding: "2px 8px",
                        borderRadius: 99,
                        border: `1px solid ${cfg.border}`,
                        color: cfg.color,
                        fontWeight: 600,
                      }}
                    >
                      {cfg.label}
                    </span>

                    {/* Backlog count — subtle, clickable */}
                    {backlogCount > 0 && (
                      <button
                        onClick={() => setShowBacklogDrawer(true)}
                        style={{
                          fontSize: 10,
                          padding: "2px 8px",
                          borderRadius: 99,
                          background: "rgba(255,77,77,0.1)",
                          border: "1px solid rgba(255,77,77,0.2)",
                          color: "var(--accent)",
                          cursor: "pointer",
                          fontFamily: "Space Mono, monospace",
                          fontWeight: 600,
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(255,77,77,0.18)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(255,77,77,0.1)")
                        }
                      >
                        +{backlogCount} backlog
                      </button>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--text3)",
                      flexShrink: 0,
                    }}
                  >
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
                      gap: 5,
                    }}
                  >
                    {allTopics.map((t, j) => (
                      <span
                        key={j}
                        style={{
                          padding: "3px 10px",
                          borderRadius: 99,
                          fontSize: 12,
                          background:
                            day.status === "done"
                              ? "rgba(6,214,160,0.08)"
                              : "var(--surface)",
                          color:
                            day.status === "done"
                              ? "var(--green)"
                              : "var(--text2)",
                          border: `1px solid ${day.status === "done" ? "rgba(6,214,160,0.15)" : "var(--border)"}`,
                          textDecoration:
                            day.status === "done" ? "line-through" : "none",
                          opacity: day.status === "done" ? 0.7 : 1,
                          fontFamily: "DM Sans, sans-serif",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {isToday && (
                  <div style={{ marginTop: 12 }}>
                    <Link
                      href={`/goals/${id}/today`}
                      className="btn btn-primary"
                      style={{
                        fontSize: 12,
                        padding: "7px 16px",
                        borderRadius: 8,
                      }}
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
    </>
  );
}
