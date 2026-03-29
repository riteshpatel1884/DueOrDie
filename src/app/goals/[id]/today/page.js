"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useGoals, buildSchedule, todayStr } from "@/app/hooks/useGoals";
import PanicMeter from "@/app/components/Panicmeter/Panicmeter";

export default function TodayPage() {
  const { id } = useParams();
  const router = useRouter();
  const { goals, logDay } = useGoals();
  const goal = goals.find((g) => g.id === id);
  const today = todayStr();

  const [checked, setChecked] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

  const allTopics = [...todayPlan.topics, ...(todayPlan.extra || [])];
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const totalCount = allTopics.length;
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
    allTopics.forEach((t) => (all[t] = true));
    setChecked(all);
  };

  const clearAll = () => {
    if (alreadyLogged) return;
    setChecked({});
  };

  const handleSubmit = (markCompleted) => {
    const completedTopics = allTopics.filter((t) => checked[t]);
    const skippedTopics = allTopics.filter((t) => !checked[t]);
    logDay(id, today, {
      completed: markCompleted,
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
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px" }}>
      <button
        onClick={() => router.back()}
        className="btn btn-ghost"
        style={{ marginBottom: 24, padding: "6px 12px", fontSize: 13 }}
      >
        ← Back
      </button>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: 11,
              color: "var(--text3)",
              textTransform: "uppercase",
            }}
          >
            Day {dayIndex}
          </span>
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "var(--border)",
            }}
          />
          <span
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: 11,
              color: "var(--blue)",
            }}
          >
            TODAY
          </span>
        </div>
        <h1
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 26,
            color: "var(--text)",
            letterSpacing: "-0.4px",
            marginBottom: 4,
          }}
        >
          {goal.title}
        </h1>
        <p style={{ color: "var(--text3)", fontSize: 14 }}>
          {formatDate(today)}
        </p>
      </div>

      {/* Backlog notice */}
      {(todayPlan.extra?.length || 0) > 0 && (
        <div
          style={{
            background: "rgba(255,77,77,0.07)",
            border: "1px solid rgba(255,77,77,0.25)",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 20,
            fontSize: 13,
            color: "var(--accent)",
          }}
        >
          <strong>⚠️ Backlog Alert:</strong> {todayPlan.extra.length} topic
          {todayPlan.extra.length !== 1 ? "s" : ""} from missed days have been
          added to today.
        </div>
      )}

      {/* Already logged notice */}
      {alreadyLogged && (
        <div
          style={{
            background: existingLog.completed
              ? "rgba(6,214,160,0.08)"
              : "rgba(255,209,102,0.08)",
            border: `1px solid ${existingLog.completed ? "rgba(6,214,160,0.25)" : "rgba(255,209,102,0.25)"}`,
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 20,
            fontSize: 13,
            color: existingLog.completed ? "var(--green)" : "var(--accent3)",
          }}
        >
          {existingLog.completed
            ? `✅ You already logged this day as complete (${existingLog.completedTopics?.length || 0} topics done).`
            : `📋 You logged ${existingLog.completedTopics?.length || 0} topics done, ${existingLog.skippedTopics?.length || 0} skipped.`}
        </div>
      )}

      {/* Progress counter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>
          {totalCount} topic{totalCount !== 1 ? "s" : ""} to cover
        </span>
        {!alreadyLogged && (
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={selectAll}
              className="btn btn-ghost"
              style={{ fontSize: 12, padding: "5px 10px" }}
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="btn btn-ghost"
              style={{ fontSize: 12, padding: "5px 10px" }}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 20 }}>
        <div className="progress-bar" style={{ height: 6 }}>
          <div
            className="progress-fill"
            style={{
              width: `${totalCount > 0 ? (checkedCount / totalCount) * 100 : 0}%`,
              background: allDone ? "var(--green)" : "var(--blue)",
            }}
          />
        </div>
        <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 5 }}>
          {checkedCount} of {totalCount} marked done
        </p>
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
        {allTopics.map((t, i) => {
          const isExtra = i >= todayPlan.topics.length;
          const isDone = !!checked[t];
          return (
            <div
              key={t}
              onClick={() => toggle(t)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                borderRadius: 10,
                border: `1px solid ${isDone ? "rgba(6,214,160,0.25)" : isExtra ? "rgba(255,77,77,0.2)" : "var(--border)"}`,
                background: isDone
                  ? "rgba(6,214,160,0.06)"
                  : isExtra
                    ? "rgba(255,77,77,0.04)"
                    : "var(--surface)",
                cursor: alreadyLogged ? "default" : "pointer",
                transition: "all 0.15s",
                userSelect: "none",
              }}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  border: `2px solid ${isDone ? "var(--green)" : "var(--border2)"}`,
                  background: isDone ? "var(--green)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.15s",
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
                }}
              >
                {t}
              </span>

              {isExtra && (
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--accent)",
                    background: "rgba(255,77,77,0.1)",
                    padding: "2px 8px",
                    borderRadius: 100,
                  }}
                >
                  backlog
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit buttons */}
      {!alreadyLogged ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            className="btn btn-primary"
            onClick={() => handleSubmit(true)}
            style={{ justifyContent: "center", padding: "14px", fontSize: 15 }}
          >
            ✅ Submit — Day Complete ({checkedCount}/{totalCount} done)
          </button>
          {checkedCount < totalCount && (
            <button
              className="btn btn-secondary"
              onClick={() => handleSubmit(false)}
              style={{
                justifyContent: "center",
                padding: "12px",
                fontSize: 14,
                color: "var(--text3)",
              }}
            >
              Partial submit — log {checkedCount} done, mark rest as backlog
            </button>
          )}
        </div>
      ) : (
        <Link
          href={`/goals/${id}`}
          className="btn btn-secondary"
          style={{ justifyContent: "center", padding: "14px", fontSize: 14 }}
        >
          ← Back to Schedule
        </Link>
      )}
    </div>
  );
}
