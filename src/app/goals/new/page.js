"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGoals, totalTopicDays } from "@/app/hooks/useGoals";

export default function NewGoalPage() {
  const { addGoal } = useGoals();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [deadlineDays, setDeadlineDays] = useState(30);
  const [mode, setMode] = useState("normal");
  const [topicInput, setTopicInput] = useState("");
  const [topicDays, setTopicDays] = useState(1);
  const [topics, setTopics] = useState([]); //Note:  [{name, days}]
  const [error, setError] = useState("");
  const [editingIdx, setEditingIdx] = useState(null);
  const [editDays, setEditDays] = useState(1);

  const addTopic = () => {
    const trimmed = topicInput.trim();
    if (!trimmed) return;
    if (topics.some((t) => t.name === trimmed)) {
      setError("Topic already added.");
      return;
    }
    setTopics([
      ...topics,
      { name: trimmed, days: Math.max(1, Number(topicDays) || 1) },
    ]);
    setTopicInput("");
    setTopicDays(1);
    setError("");
  };

  const removeTopic = (i) => setTopics(topics.filter((_, idx) => idx !== i));

  const saveEdit = (i) => {
    const updated = [...topics];
    updated[i] = { ...updated[i], days: Math.max(1, Number(editDays) || 1) };
    setTopics(updated);
    setEditingIdx(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTopic();
    }
  };

  const handleBulkPaste = (e) => {
    const text = e.clipboardData.getData("text");
    const lines = text
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (lines.length > 1) {
      e.preventDefault();
      const newTopics = lines
        .filter((l) => !topics.some((t) => t.name === l))
        .map((l) => ({ name: l, days: 1 }));
      setTopics([...topics, ...newTopics]);
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Please enter a goal title.");
      return;
    }
    if (topics.length === 0) {
      setError("Add at least one topic.");
      return;
    }
    if (deadlineDays < 1) {
      setError("Deadline must be at least 1 day.");
      return;
    }
    const goal = addGoal({
      title: title.trim(),
      topics,
      deadlineDays: Number(deadlineDays),
      mode,
    });
    router.push(`/goals/${goal.id}`);
  };

  const reqDays = totalTopicDays(topics);
  const avgPerDay =
    topics.length > 0 && deadlineDays > 0
      ? (reqDays / deadlineDays).toFixed(2)
      : 0;
  const overDeadline = reqDays > Number(deadlineDays);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
      <button
        onClick={() => router.back()}
        className="btn btn-ghost"
        style={{ marginBottom: 24, padding: "6px 12px", fontSize: 13 }}
      >
        ← Back
      </button>

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
        Create New Goal
      </h1>
      <p style={{ color: "var(--text3)", marginBottom: 32, fontSize: 14 }}>
        Define topics, set per-topic duration, and let StackFlow build your
        entire schedule.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Title */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text2)",
              marginBottom: 8,
              letterSpacing: "0.03em",
            }}
          >
            GOAL TITLE
          </label>
          <input
            className="input"
            placeholder="e.g. Complete ML Algorithms"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Deadline part*/}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text2)",
              marginBottom: 8,
              letterSpacing: "0.03em",
            }}
          >
            DEADLINE (DAYS)
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <input
              className="input"
              type="number"
              min="1"
              max="365"
              value={deadlineDays}
              onChange={(e) => setDeadlineDays(e.target.value)}
              style={{ maxWidth: 110 }}
            />
            <div
              style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.6 }}
            >
              {topics.length > 0 && (
                <>
                  <span>
                    Topics need{" "}
                    <strong
                      style={{
                        color: overDeadline ? "var(--accent)" : "var(--green)",
                      }}
                    >
                      {reqDays} days
                    </strong>{" "}
                    total.
                  </span>
                  <br />
                  <span style={{ color: "var(--text3)" }}>
                    Schedule spans{" "}
                    <strong style={{ color: "var(--blue)" }}>
                      {deadlineDays} days
                    </strong>{" "}
                    → ~{avgPerDay} topic-days/calendar-day
                  </span>
                  {overDeadline && (
                    <span
                      style={{
                        color: "var(--accent)",
                        display: "block",
                        marginTop: 2,
                      }}
                    >
                      ⚠️ Deadline shorter than required — topics will be
                      compressed.
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mode part code*/}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text2)",
              marginBottom: 8,
              letterSpacing: "0.03em",
            }}
          >
            BACKLOG MODE
          </label>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              {
                value: "normal",
                label: "Normal",
                desc: "Backlog spread over next 3 days",
                icon: "⚖️",
              },
              {
                value: "hard",
                label: "Hard Mode",
                desc: "Full backlog dumps to next day",
                icon: "🔥",
              },
            ].map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                style={{
                  flex: 1,
                  padding: "14px 16px",
                  borderRadius: 10,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                  border: `2px solid ${mode === m.value ? (m.value === "hard" ? "var(--accent)" : "var(--blue)") : "var(--border)"}`,
                  background:
                    mode === m.value
                      ? m.value === "hard"
                        ? "rgba(255,77,77,0.07)"
                        : "rgba(74,158,255,0.07)"
                      : "var(--surface)",
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 4 }}>{m.icon}</div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "var(--text)",
                    marginBottom: 3,
                  }}
                >
                  {m.label}
                </div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>
                  {m.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Add topic code part*/}
        <div>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text2)",
              marginBottom: 8,
              letterSpacing: "0.03em",
            }}
          >
            TOPICS{" "}
            <span style={{ color: "var(--text3)", fontWeight: 400 }}>
              ({topics.length} added · {reqDays} total days)
            </span>
          </label>
          <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 10 }}>
            Type a topic, set how many days it needs, then press Enter or Add.
            Paste a comma-separated list to bulk-add (all get 1 day).
          </p>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input
              className="input"
              placeholder="Topic name..."
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handleBulkPaste}
              style={{ flex: 2 }}
            />
            <div
              style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}
            >
              <input
                className="input"
                type="number"
                min="1"
                max="30"
                value={topicDays}
                onChange={(e) => setTopicDays(e.target.value)}
                style={{ width: 70, textAlign: "center" }}
                title="Days needed for this topic"
              />
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text3)",
                  whiteSpace: "nowrap",
                }}
              >
                days
              </span>
            </div>
            <button className="btn btn-secondary" onClick={addTopic}>
              Add
            </button>
          </div>

          {/* Topic list */}
          {topics.length > 0 && (
            <div
              style={{
                background: "var(--bg2)",
                borderRadius: 10,
                border: "1px solid var(--border)",
                padding: "12px",
                maxHeight: 300,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {topics.map((t, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 12px",
                    background: "var(--surface)",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                  }}
                >
                  <span style={{ flex: 1, fontSize: 13, color: "var(--text)" }}>
                    {t.name}
                  </span>

                  {/* Inline day editor */}
                  {editingIdx === i ? (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <input
                        className="input"
                        type="number"
                        min="1"
                        max="30"
                        value={editDays}
                        onChange={(e) => setEditDays(e.target.value)}
                        style={{
                          width: 60,
                          padding: "4px 8px",
                          fontSize: 13,
                          textAlign: "center",
                        }}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(i);
                          if (e.key === "Escape") setEditingIdx(null);
                        }}
                      />
                      <span style={{ fontSize: 12, color: "var(--text3)" }}>
                        days
                      </span>
                      <button
                        onClick={() => saveEdit(i)}
                        style={{
                          background: "var(--green)",
                          border: "none",
                          borderRadius: 5,
                          cursor: "pointer",
                          color: "white",
                          padding: "3px 8px",
                          fontSize: 12,
                        }}
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => setEditingIdx(null)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--text3)",
                          fontSize: 14,
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingIdx(i);
                        setEditDays(t.days);
                      }}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 100,
                        fontSize: 12,
                        cursor: "pointer",
                        background:
                          t.days > 1 ? "rgba(74,158,255,0.12)" : "var(--bg3)",
                        color: t.days > 1 ? "var(--blue)" : "var(--text3)",
                        border: `1px solid ${t.days > 1 ? "rgba(74,158,255,0.25)" : "var(--border)"}`,
                        transition: "all 0.15s",
                      }}
                      title="Click to edit duration"
                    >
                      {t.days}d
                    </button>
                  )}

                  <button
                    onClick={() => removeTopic(i)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text3)",
                      fontSize: 16,
                      padding: "0 4px",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = "var(--text3)")
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(255,77,77,0.08)",
              border: "1px solid rgba(255,77,77,0.25)",
              borderRadius: 8,
              fontSize: 13,
              color: "var(--accent)",
            }}
          >
            {error}
          </div>
        )}

        {/* Summary */}
        {title && topics.length > 0 && (
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "14px 18px",
              fontSize: 13,
              color: "var(--text2)",
              lineHeight: 1.9,
            }}
          >
            <strong style={{ color: "var(--text)" }}>"{title}"</strong> —{" "}
            {topics.length} topics requiring{" "}
            <strong style={{ color: "var(--text)" }}>{reqDays} days</strong> of
            study, spread across{" "}
            <strong style={{ color: "var(--blue)" }}>
              {deadlineDays} calendar days
            </strong>
            .{" "}
            {overDeadline ? (
              <span style={{ color: "var(--accent)" }}>
                Topics will be compressed to fit the deadline.
              </span>
            ) : (
              <span style={{ color: "var(--green)" }}>
                Every day in your schedule will have a topic assigned.
              </span>
            )}{" "}
            Mode:{" "}
            <strong
              style={{
                color: mode === "hard" ? "var(--accent)" : "var(--text)",
              }}
            >
              {mode === "hard" ? "🔥 Hard" : "⚖️ Normal"}
            </strong>
            .
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          style={{
            padding: "14px 24px",
            fontSize: 15,
            justifyContent: "center",
          }}
        >
          Create Goal & Start Tracking →
        </button>
      </div>
    </div>
  );
}
