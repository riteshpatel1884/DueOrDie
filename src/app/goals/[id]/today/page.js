"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useGoals, buildSchedule, todayStr } from "@/app/hooks/useGoals";

// ─── Backlog Modal ───────────────────────────────────────────────────────────
function BacklogModal({ backlogTopics, onClose, onComplete }) {
  const [checked, setChecked] = useState({});
  const [animating, setAnimating] = useState(false);
  const completedCount = Object.values(checked).filter(Boolean).length;
  const allDone = completedCount === backlogTopics.length;

  const toggle = (t) => setChecked((prev) => ({ ...prev, [t]: !prev[t] }));

  const handleSubmit = () => {
    const completed = backlogTopics.filter((t) => checked[t]);
    const remaining = backlogTopics.filter((t) => !checked[t]);
    setAnimating(true);
    setTimeout(() => {
      onComplete(completed, remaining);
      onClose();
    }, 350);
  };

  return (
    <>
      <style>{`
        @keyframes backdropIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes sheetUp {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes sheetOut {
          from { opacity: 1; transform: translateY(0)   scale(1); }
          to   { opacity: 0; transform: translateY(40px) scale(0.97); }
        }
        .backlog-sheet {
          animation: sheetUp 0.35s cubic-bezier(.22,1,.36,1) forwards;
        }
        .backlog-sheet.out {
          animation: sheetOut 0.3s ease forwards;
        }
        .backlog-item {
          transition: all 0.2s cubic-bezier(.22,1,.36,1);
        }
        .backlog-item:hover { transform: translateX(3px); }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
          zIndex: 900,
          animation: "backdropIn 0.25s ease",
        }}
      />

      {/* Sheet */}
      <div
        className={`backlog-sheet${animating ? " out" : ""}`}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: 620,
          margin: "0 auto",
          background:
            "linear-gradient(160deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          borderRadius: "24px 24px 0 0",
          padding: "0 0 32px",
          zIndex: 1000,
          boxShadow: "0 -16px 60px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,100,100,0.15)",
          borderBottom: "none",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 0 0",
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 99,
              background: "rgba(255,255,255,0.15)",
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            padding: "16px 24px 0",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "rgba(255,77,77,0.2)",
                  border: "1px solid rgba(255,77,77,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                ⚠️
              </div>
              <span
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: "#fff",
                }}
              >
                Backlog Pending
              </span>
            </div>
            <p
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.45)",
                marginLeft: 36,
              }}
            >
              Clear these before logging today's session
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 99,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            ×
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ padding: "14px 24px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 6,
              fontFamily: "Space Mono, monospace",
            }}
          >
            <span>
              {completedCount} / {backlogTopics.length} cleared
            </span>
            <span>
              {Math.round((completedCount / backlogTopics.length) * 100)}%
            </span>
          </div>
          <div
            style={{
              height: 4,
              borderRadius: 99,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 99,
                width: `${(completedCount / backlogTopics.length) * 100}%`,
                background: allDone
                  ? "linear-gradient(90deg, #06d6a0, #0acf83)"
                  : "linear-gradient(90deg, #ff4d4d, #ff8c42)",
                transition:
                  "width 0.4s cubic-bezier(.22,1,.36,1), background 0.4s ease",
                boxShadow: allDone
                  ? "0 0 12px rgba(6,214,160,0.4)"
                  : "0 0 12px rgba(255,77,77,0.3)",
              }}
            />
          </div>
        </div>

        {/* Topic list */}
        <div
          style={{
            overflowY: "auto",
            padding: "14px 24px 0",
            flex: 1,
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.1) transparent",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {backlogTopics.map((t, i) => {
              const done = !!checked[t];
              return (
                <div
                  key={i}
                  className="backlog-item"
                  onClick={() => toggle(t)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "13px 16px",
                    borderRadius: 12,
                    border: `1px solid ${done ? "rgba(6,214,160,0.3)" : "rgba(255,77,77,0.15)"}`,
                    background: done
                      ? "rgba(6,214,160,0.07)"
                      : "rgba(255,255,255,0.03)",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      flexShrink: 0,
                      border: `2px solid ${done ? "#06d6a0" : "rgba(255,77,77,0.5)"}`,
                      background: done ? "#06d6a0" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                      boxShadow: done ? "0 0 10px rgba(6,214,160,0.3)" : "none",
                    }}
                  >
                    {done && (
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path
                          d="M1 4L4.5 7.5L11 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 14,
                      color: done
                        ? "rgba(255,255,255,0.35)"
                        : "rgba(255,255,255,0.85)",
                      textDecoration: done ? "line-through" : "none",
                      transition: "all 0.2s",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    {t}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 99,
                      background: "rgba(255,77,77,0.12)",
                      border: "1px solid rgba(255,77,77,0.2)",
                      color: "rgba(255,120,120,0.9)",
                      fontFamily: "Space Mono, monospace",
                      flexShrink: 0,
                    }}
                  >
                    backlog
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div
          style={{
            padding: "16px 24px 0",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <button
            onClick={handleSubmit}
            disabled={!allDone}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 14,
              border: "none",
              background: allDone
                ? "linear-gradient(135deg, #06d6a0 0%, #0acf83 100%)"
                : "rgba(255,255,255,0.06)",
              color: allDone ? "white" : "rgba(255,255,255,0.3)",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "Syne, sans-serif",
              cursor: allDone ? "pointer" : "not-allowed",
              transition: "all 0.25s",
              boxShadow: allDone ? "0 4px 24px rgba(6,214,160,0.3)" : "none",
              letterSpacing: "-0.2px",
            }}
          >
            {allDone
              ? "✓ Backlog Cleared — Continue"
              : `Complete all ${backlogTopics.length - completedCount} remaining to continue`}
          </button>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: 12,
              fontSize: 13,
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.35)",
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.35)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            Remind me later
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function TodayPage() {
  const { id } = useParams();
  const router = useRouter();
  const { goals, logDay } = useGoals();
  const goal = goals.find((g) => g.id === id);
  const today = todayStr();

  const [checked, setChecked] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);
  const [backlogCleared, setBacklogCleared] = useState(false);
  const [clearedBacklogTopics, setClearedBacklogTopics] = useState([]);

  useEffect(() => {
    if (!goal) return;
    const existing = goal.dailyLogs?.[today];
    if (existing) {
      const init = {};
      (existing.completedTopics || []).forEach((t) => (init[t] = true));
      setChecked(init);
      setSubmitted(!!existing.completed || existing.completed === false);
    }
  }, [goal, today]);

  if (!goal) {
    return (
      <div
        style={{
          maxWidth: 700,
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

  const { plan } = buildSchedule(goal);
  const todayPlan = plan.find((d) => d.date === today);

  if (!todayPlan) {
    return (
      <div
        style={{
          maxWidth: 700,
          margin: "60px auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: "var(--text)",
            marginBottom: 8,
          }}
        >
          No tasks scheduled for today!
        </h2>
        <p style={{ color: "var(--text3)", marginBottom: 20 }}>
          Either you've completed all topics, or today falls outside your goal's
          schedule.
        </p>
        <Link href={`/goals/${id}`} className="btn btn-secondary">
          ← View Schedule
        </Link>
      </div>
    );
  }

  // Only today's proper topics — NO auto-merged backlog
  const todayTopics = [...todayPlan.topics];
  const backlogTopics = todayPlan.extra || []; // kept separate
  const hasBacklog = backlogTopics.length > 0;

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const totalCount = todayTopics.length;
  const allDone = checkedCount === totalCount;

  const existingLog = goal.dailyLogs?.[today];
  const alreadyLogged = !!existingLog;

  const toggle = (t) => {
    if (alreadyLogged) return;
    setChecked((prev) => ({ ...prev, [t]: !prev[t] }));
  };

  const selectAll = () => {
    if (alreadyLogged) return;
    const all = {};
    todayTopics.forEach((t) => (all[t] = true));
    setChecked(all);
  };

  const clearAll = () => {
    if (alreadyLogged) return;
    setChecked({});
  };

  const handleBacklogComplete = (completed, remaining) => {
    // remaining topics go back to backlog (persisted via logDay or separate mechanism)
    setClearedBacklogTopics(completed);
    setBacklogCleared(true);
  };

  const handleSubmit = () => {
    if (hasBacklog && !backlogCleared) {
      setShowBacklog(true);
      return;
    }
    const completedTopics = [
      ...todayTopics.filter((t) => checked[t]),
      ...clearedBacklogTopics,
    ];
    const skippedTopics = todayTopics.filter((t) => !checked[t]);
    logDay(id, today, {
      completed: allDone,
      completedTopics,
      skippedTopics,
    });
    setSubmitted(true);
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  const dayIndex = plan.findIndex((d) => d.date === today) + 1;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,77,77,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(255,77,77,0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .topic-card {
          transition: all 0.2s cubic-bezier(.22,1,.36,1);
        }
        .topic-card:hover:not(.locked) {
          transform: translateX(4px);
          border-color: rgba(74,158,255,0.4) !important;
        }
        .topic-card.done:hover {
          transform: translateX(4px);
          border-color: rgba(6,214,160,0.4) !important;
        }
        .backlog-pill {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .submit-btn-ready {
          background: linear-gradient(135deg, var(--accent) 0%, #ff6b35 100%) !important;
          box-shadow: 0 6px 28px rgba(255,77,77,0.35) !important;
        }
        .submit-btn-ready:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 36px rgba(255,77,77,0.45) !important;
        }
        .backlog-fab {
          animation: pulse-glow 2.5s ease-in-out infinite;
          transition: all 0.25s cubic-bezier(.22,1,.36,1) !important;
        }
        .backlog-fab:hover {
          transform: scale(1.06) !important;
        }
      `}</style>

      {showBacklog && (
        <BacklogModal
          backlogTopics={backlogTopics}
          onClose={() => setShowBacklog(false)}
          onComplete={handleBacklogComplete}
        />
      )}

      <div
        style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px 100px" }}
      >
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

        {/* Header card */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(74,158,255,0.08) 0%, rgba(74,158,255,0.02) 100%)",
            border: "1px solid rgba(74,158,255,0.2)",
            borderRadius: 20,
            padding: "24px",
            marginBottom: 24,
            animation: "fadeUp 0.4s ease",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative glow */}
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 140,
              height: 140,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(74,158,255,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: 10,
                color: "var(--text3)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Day {dayIndex}
            </span>
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "var(--border)",
              }}
            />
            <span
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: 10,
                color: "var(--blue)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              TODAY
            </span>
          </div>

          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 24,
              color: "var(--text)",
              letterSpacing: "-0.3px",
              marginBottom: 4,
            }}
          >
            {goal.title}
          </h1>
          <p style={{ color: "var(--text3)", fontSize: 13 }}>
            {formatDate(today)}
          </p>

          {/* Backlog badge — prominent if present */}
          {hasBacklog && !backlogCleared && (
            <button
              className="backlog-fab"
              onClick={() => setShowBacklog(true)}
              style={{
                marginTop: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 16px",
                borderRadius: 100,
                border: "1px solid rgba(255,77,77,0.4)",
                background: "rgba(255,77,77,0.1)",
                color: "var(--accent)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "DM Sans, sans-serif",
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
                  flexShrink: 0,
                }}
              >
                {backlogTopics.length}
              </span>
              Backlog topics pending — tap to clear
              <span style={{ fontSize: 11, opacity: 0.7 }}>→</span>
            </button>
          )}
          {hasBacklog && backlogCleared && (
            <div
              style={{
                marginTop: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 14px",
                borderRadius: 100,
                border: "1px solid rgba(6,214,160,0.3)",
                background: "rgba(6,214,160,0.07)",
                color: "var(--green)",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              ✓ Backlog cleared ({clearedBacklogTopics.length} done)
            </div>
          )}
        </div>

        {/* Already logged notice */}
        {alreadyLogged && (
          <div
            style={{
              background: existingLog.completed
                ? "rgba(6,214,160,0.07)"
                : "rgba(255,209,102,0.07)",
              border: `1px solid ${existingLog.completed ? "rgba(6,214,160,0.2)" : "rgba(255,209,102,0.2)"}`,
              borderRadius: 14,
              padding: "14px 18px",
              marginBottom: 20,
              fontSize: 13,
              color: existingLog.completed ? "var(--green)" : "var(--accent3)",
              animation: "fadeUp 0.4s ease 0.1s both",
            }}
          >
            {existingLog.completed
              ? `✅ Logged as complete — ${existingLog.completedTopics?.length || 0} topics done.`
              : `📋 ${existingLog.completedTopics?.length || 0} topics done, ${existingLog.skippedTopics?.length || 0} skipped.`}
          </div>
        )}

        {/* Topic section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
            animation: "fadeUp 0.4s ease 0.15s both",
          }}
        >
          <div>
            <span
              style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}
            >
              {totalCount} topic{totalCount !== 1 ? "s" : ""} today
            </span>
            {!alreadyLogged && (
              <span
                style={{ fontSize: 12, color: "var(--text3)", marginLeft: 8 }}
              >
                · {checkedCount} marked
              </span>
            )}
          </div>
          {!alreadyLogged && (
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={selectAll}
                style={{
                  padding: "5px 12px",
                  borderRadius: 99,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text3)",
                  fontSize: 12,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--blue)";
                  e.currentTarget.style.color = "var(--blue)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text3)";
                }}
              >
                All
              </button>
              <button
                onClick={clearAll}
                style={{
                  padding: "5px 12px",
                  borderRadius: 99,
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text3)",
                  fontSize: 12,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text3)";
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div
          style={{ marginBottom: 20, animation: "fadeUp 0.4s ease 0.2s both" }}
        >
          <div
            style={{
              height: 5,
              borderRadius: 99,
              background: "var(--surface2)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: 99,
                width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%`,
                background: allDone
                  ? "linear-gradient(90deg, #06d6a0, #0acf83)"
                  : "linear-gradient(90deg, var(--blue), #5b9fff)",
                transition:
                  "width 0.4s cubic-bezier(.22,1,.36,1), background 0.4s ease",
                boxShadow: allDone
                  ? "0 0 10px rgba(6,214,160,0.4)"
                  : "0 0 8px rgba(74,158,255,0.3)",
              }}
            />
          </div>
        </div>

        {/* Topic checklist */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 28,
          }}
        >
          {todayTopics.map((t, i) => {
            const isDone = !!checked[t];
            return (
              <div
                key={`topic-${i}-${t}`}
                className={`topic-card${alreadyLogged ? " locked" : ""}${isDone ? " done" : ""}`}
                onClick={() => toggle(t)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "15px 18px",
                  borderRadius: 14,
                  border: `1px solid ${isDone ? "rgba(6,214,160,0.25)" : "var(--border)"}`,
                  background: isDone
                    ? "rgba(6,214,160,0.05)"
                    : "var(--surface)",
                  cursor: alreadyLogged ? "default" : "pointer",
                  userSelect: "none",
                  animation: `fadeUp 0.35s ease ${0.25 + i * 0.04}s both`,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    flexShrink: 0,
                    border: `2px solid ${isDone ? "var(--green)" : "var(--border2)"}`,
                    background: isDone ? "var(--green)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    boxShadow: isDone ? "0 0 10px rgba(6,214,160,0.3)" : "none",
                  }}
                >
                  {isDone && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path
                        d="M1 4L4.5 7.5L11 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: isDone ? "var(--text3)" : "var(--text)",
                    textDecoration: isDone ? "line-through" : "none",
                    transition: "all 0.2s",
                    fontFamily: "DM Sans, sans-serif",
                    lineHeight: 1.45,
                  }}
                >
                  {t}
                </span>
                {isDone && (
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "Space Mono, monospace",
                      color: "var(--green)",
                      opacity: 0.6,
                    }}
                  >
                    done
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit / Back */}
        {!alreadyLogged ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              className={checkedCount > 0 ? "submit-btn-ready" : ""}
              onClick={handleSubmit}
              disabled={checkedCount === 0}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: 14,
                border: "none",
                background:
                  checkedCount === 0 ? "var(--surface)" : "var(--accent)",
                color: checkedCount === 0 ? "var(--text3)" : "white",
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "Syne, sans-serif",
                cursor: checkedCount === 0 ? "not-allowed" : "pointer",
                transition: "all 0.25s",
                letterSpacing: "-0.2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {hasBacklog && !backlogCleared ? (
                <>⚠️ Clear backlog first to submit</>
              ) : (
                <>
                  Submit{" "}
                  {checkedCount > 0
                    ? `(${checkedCount}/${totalCount} done)`
                    : ""}
                </>
              )}
            </button>

            {checkedCount > 0 && checkedCount < totalCount && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "var(--text3)",
                  fontFamily: "Space Mono, monospace",
                }}
              >
                {totalCount - checkedCount} unchecked topic
                {totalCount - checkedCount !== 1 ? "s" : ""} will be added to
                backlog
              </p>
            )}
          </div>
        ) : (
          <Link
            href={`/goals/${id}`}
            className="btn btn-secondary"
            style={{
              justifyContent: "center",
              padding: "14px",
              fontSize: 14,
              display: "block",
              textAlign: "center",
              borderRadius: 14,
            }}
          >
            ← Back to Schedule
          </Link>
        )}
      </div>
    </>
  );
}
