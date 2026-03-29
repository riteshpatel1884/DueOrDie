"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGoals } from "@/app/hooks/useGoals";

export default function NewGoalPage() {
  const { addGoal } = useGoals();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [deadlineDays, setDeadlineDays] = useState(30);
  const [mode, setMode] = useState("normal");
  const [topicInput, setTopicInput] = useState("");
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");

  const addTopic = () => {
    const trimmed = topicInput.trim();
    if (!trimmed) return;
    if (topics.includes(trimmed)) {
      setError("Topic already added.");
      return;
    }
    setTopics([...topics, trimmed]);
    setTopicInput("");
    setError("");
  };

  const removeTopic = (i) => setTopics(topics.filter((_, idx) => idx !== i));

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
      const unique = [...new Set([...topics, ...lines])];
      setTopics(unique);
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

  const topicsPerDay =
    topics.length > 0 ? (topics.length / deadlineDays).toFixed(1) : 0;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
      {/* Back */}
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
        Define what you want to learn, set a deadline, and let StackFlow handle
        the pressure.
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

        {/* Deadline */}
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
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <input
              className="input"
              type="number"
              min="1"
              max="365"
              value={deadlineDays}
              onChange={(e) => setDeadlineDays(e.target.value)}
              style={{ maxWidth: 120 }}
            />
            <span style={{ fontSize: 13, color: "var(--text3)" }}>
              = {topics.length} topics over {deadlineDays} days
              {topics.length > 0 && (
                <span style={{ color: "var(--blue)", marginLeft: 6 }}>
                  (~{topicsPerDay} topics/day)
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Mode */}
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
                  border: `2px solid ${mode === m.value ? (m.value === "hard" ? "var(--accent)" : "var(--blue)") : "var(--border)"}`,
                  background:
                    mode === m.value
                      ? m.value === "hard"
                        ? "rgba(255,77,77,0.07)"
                        : "rgba(74,158,255,0.07)"
                      : "var(--surface)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
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

        {/* Topics */}
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
              ({topics.length} added)
            </span>
          </label>
          <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 10 }}>
            Type a topic and press Enter. Or paste a comma/newline-separated
            list.
          </p>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input
              className="input"
              placeholder="e.g. Linear Regression, SVM, Random Forests..."
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handleBulkPaste}
            />
            <button
              className="btn btn-secondary"
              onClick={addTopic}
              style={{ whiteSpace: "nowrap" }}
            >
              Add
            </button>
          </div>

          {topics.length > 0 && (
            <div
              style={{
                background: "var(--bg2)",
                borderRadius: 10,
                border: "1px solid var(--border)",
                padding: "12px 16px",
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                maxHeight: 240,
                overflowY: "auto",
              }}
            >
              {topics.map((t, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 12px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 100,
                    fontSize: 13,
                    color: "var(--text)",
                  }}
                >
                  {t}
                  <button
                    onClick={() => removeTopic(i)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text3)",
                      fontSize: 14,
                      lineHeight: 1,
                      padding: "0 2px",
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
                </span>
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
              lineHeight: 1.8,
            }}
          >
            <strong style={{ color: "var(--text)" }}>"{title}"</strong> —{" "}
            {topics.length} topics over{" "}
            <strong style={{ color: "var(--text)" }}>
              {deadlineDays} days
            </strong>{" "}
            starting today. That's{" "}
            <strong style={{ color: "var(--blue)" }}>
              {topicsPerDay} topics/day
            </strong>{" "}
            on average. Mode:{" "}
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

        {/* Submit */}
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
