"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGoals, totalTopicDays } from "@/app/hooks/useGoals";
import { searchLibrary, TOPIC_LIBRARY } from "./topics";

// ─── Step dot ───────────────────────────────────────────────────────────────
function StepDot({ n, active, done }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "Space Mono, monospace",
          transition: "all 0.3s",
          background: done
            ? "var(--stepdot-done-bg)"
            : active
              ? "var(--stepdot-active-bg)"
              : "var(--surface)",
          border: `2px solid ${
            done
              ? "var(--stepdot-done-border)"
              : active
                ? "var(--stepdot-active-bord)"
                : "var(--border)"
          }`,
          color: done
            ? "var(--stepdot-done-fg)"
            : active
              ? "var(--stepdot-active-fg)"
              : "var(--text3)",
        }}
      >
        {done ? "✓" : n}
      </div>
    </div>
  );
}

// ─── Suggestion dropdown card ────────────────────────────────────────────────
function SuggestionCard({ entry, onImport }) {
  return (
    <div
      onClick={() => onImport(entry)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        cursor: "pointer",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg3)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--surface2)",
          flexShrink: 0,
        }}
      >
        {entry.emoji}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text)",
            fontFamily: "Syne, sans-serif",
          }}
        >
          {entry.title}
        </div>
        <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>
          {entry.topics.length} topics · {totalTopicDays(entry.topics)} total
          days
        </div>
      </div>
      <div
        style={{
          padding: "4px 10px",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 600,
          background: "var(--import-badge-bg)",
          color: "var(--import-badge-fg)",
          whiteSpace: "nowrap",
        }}
      >
        Import all →
      </div>
    </div>
  );
}

// ─── Topic row ───────────────────────────────────────────────────────────────
function TopicRow({
  topic,
  index,
  editingIdx,
  editDays,
  setEditingIdx,
  setEditDays,
  onSaveEdit,
  onRemove,
}) {
  const isEditing = editingIdx === index;
  const hasMultiDays = topic.days > 1;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        background: "var(--surface)",
        borderRadius: 10,
        border: "1px solid var(--border)",
        transition: "border-color 0.2s",
        animation: "slideIn 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--border2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    >
      {/* drag handle */}
      <div
        style={{
          color: "var(--border2)",
          fontSize: 12,
          cursor: "grab",
          userSelect: "none",
          letterSpacing: "-2px",
        }}
      >
        ⋮⋮
      </div>

      {/* index bubble */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "var(--topic-num-bg)",
          border: "1.5px solid var(--topic-num-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: 700,
          color: "var(--topic-num-fg)",
          flexShrink: 0,
        }}
      >
        {index + 1}
      </div>

      <span
        style={{ flex: 1, fontSize: 13, color: "var(--text)", lineHeight: 1.4 }}
      >
        {topic.name}
      </span>

      {isEditing ? (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="number"
            min="1"
            max="60"
            value={editDays}
            onChange={(e) => setEditDays(e.target.value)}
            style={{
              width: 56,
              padding: "5px 8px",
              textAlign: "center",
              background: "var(--bg2)",
              border: "1px solid var(--border2)",
              borderRadius: 7,
              color: "var(--text)",
              fontSize: 13,
              outline: "none",
            }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") onSaveEdit(index);
              if (e.key === "Escape") setEditingIdx(null);
            }}
          />
          <span style={{ fontSize: 12, color: "var(--text3)" }}>d</span>
          <button
            onClick={() => onSaveEdit(index)}
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              background: "var(--edit-confirm-bg)",
              color: "var(--edit-confirm-fg)",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✓
          </button>
          <button
            onClick={() => setEditingIdx(null)}
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              border: "1px solid var(--border)",
              cursor: "pointer",
              background: "var(--surface2)",
              color: "var(--text3)",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setEditingIdx(index);
            setEditDays(topic.days);
          }}
          title="Click to edit duration"
          style={{
            padding: "4px 12px",
            borderRadius: 100,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "Space Mono, monospace",
            fontWeight: 700,
            background: hasMultiDays
              ? "var(--topic-days-bg)"
              : "var(--topic-days-dim-bg)",
            color: hasMultiDays
              ? "var(--topic-days-fg)"
              : "var(--topic-days-dim-fg)",
            border: `1.5px solid ${hasMultiDays ? "var(--topic-days-border)" : "var(--topic-days-dim-border)"}`,
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--topic-days-bg)";
            e.currentTarget.style.color = "var(--topic-days-fg)";
            e.currentTarget.style.borderColor = "var(--topic-days-border)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = hasMultiDays
              ? "var(--topic-days-bg)"
              : "var(--topic-days-dim-bg)";
            e.currentTarget.style.color = hasMultiDays
              ? "var(--topic-days-fg)"
              : "var(--topic-days-dim-fg)";
            e.currentTarget.style.borderColor = hasMultiDays
              ? "var(--topic-days-border)"
              : "var(--topic-days-dim-border)";
          }}
        >
          {topic.days}d
        </button>
      )}

      <button
        onClick={() => onRemove(index)}
        style={{
          width: 26,
          height: 26,
          borderRadius: 7,
          border: "none",
          cursor: "pointer",
          background: "transparent",
          color: "var(--text3)",
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--topic-remove-hover-bg)";
          e.currentTarget.style.color = "var(--topic-remove-hover-fg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--text3)";
        }}
      >
        ×
      </button>
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function NewGoalPage() {
  const { addGoal } = useGoals();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [deadlineDays, setDeadlineDays] = useState(30);
  const [mode, setMode] = useState("normal");
  const [topicInput, setTopicInput] = useState("");
  const [topicDays, setTopicDays] = useState(1);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");
  const [editingIdx, setEditingIdx] = useState(null);
  const [editDays, setEditDays] = useState(1);

  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [importedLibEntry, setImportedLibEntry] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const titleRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        titleRef.current &&
        !titleRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleTitleChange = (val) => {
    setTitle(val);
    if (val.length >= 2) {
      const results = searchLibrary(val);
      setTitleSuggestions(results);
      setShowDropdown(results.length > 0);
    } else {
      setTitleSuggestions([]);
      setShowDropdown(false);
    }
  };

  const importLibraryEntry = (entry) => {
    setTitle(entry.title);
    setShowDropdown(false);
    setImportedLibEntry(entry);
    const existing = topics.map((t) => t.name);
    const newTopics = entry.topics.filter((t) => !existing.includes(t.name));
    setTopics((prev) => [...prev, ...newTopics]);
    const reqDays = totalTopicDays([...topics, ...newTopics]);
    if (deadlineDays < reqDays) setDeadlineDays(reqDays);
  };

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
      const newT = lines
        .filter((l) => !topics.some((t) => t.name === l))
        .map((l) => ({ name: l, days: 1 }));
      setTopics([...topics, ...newT]);
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
  const overDeadline = reqDays > Number(deadlineDays);
  const step1Done = title.trim().length > 0;
  const step2Done = topics.length > 0;
  const step3Done = deadlineDays > 0;

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scaleY(0.95); }
          to   { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        .topic-input:focus {
          border-color: var(--border2) !important;
          box-shadow: 0 0 0 3px var(--accent-subtle);
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <div
          style={{ maxWidth: 780, margin: "0 auto", padding: "32px 24px 80px" }}
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
              cursor: "pointer",
              color: "var(--text3)",
              fontSize: 13,
              marginBottom: 32,
              padding: "6px 0",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
          >
            ← Back
          </button>

          {/* Page header */}
          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 6,
              }}
            >
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: n < 3 ? 8 : 0,
                  }}
                >
                  <StepDot
                    n={n}
                    active={
                      (n === 1 && !step1Done) ||
                      (n === 2 && step1Done && !step2Done) ||
                      (n === 3 && step2Done && !step3Done)
                    }
                    done={n === 1 ? step1Done : n === 2 ? step2Done : step3Done}
                  />
                  {n < 3 && (
                    <div
                      style={{
                        width: 32,
                        height: 1,
                        background: "var(--border)",
                      }}
                    />
                  )}
                </div>
              ))}
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text3)",
                  marginLeft: 8,
                  fontFamily: "Space Mono, monospace",
                }}
              >
                {!step1Done
                  ? "Name your goal"
                  : !step2Done
                    ? "Add topics"
                    : !step3Done
                      ? "Set deadline"
                      : "Ready to launch ✓"}
              </span>
            </div>
            <h1
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: 32,
                color: "var(--text)",
                letterSpacing: "-0.6px",
                marginTop: 16,
                marginBottom: 6,
              }}
            >
              Create New Goal
            </h1>
            <p style={{ color: "var(--text3)", fontSize: 14 }}>
              Name your goal and we'll suggest topics automatically. Set how
              many days each topic needs — StackFlow schedules everything.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* ── SECTION 1: Title ── */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "24px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "var(--text)",
                  }}
                >
                  Goal Title
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text3)",
                    marginLeft: "auto",
                    fontFamily: "Space Mono, monospace",
                  }}
                >
                  STEP 01
                </span>
              </div>

              <div style={{ position: "relative" }}>
                <input
                  ref={titleRef}
                  className="topic-input"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  onFocus={() =>
                    titleSuggestions.length > 0 && setShowDropdown(true)
                  }
                  placeholder='e.g. "Machine Learning" or "DSA for Placements"'
                  style={{
                    width: "100%",
                    padding: "13px 16px",
                    background: "var(--bg2)",
                    border: "1.5px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--text)",
                    fontFamily: "Syne, sans-serif",
                    fontSize: 16,
                    fontWeight: 600,
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                />

                {/* Dropdown */}
                {showDropdown && titleSuggestions.length > 0 && (
                  <div
                    ref={dropdownRef}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      right: 0,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: 14,
                      overflow: "hidden",
                      zIndex: 100,
                      boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
                      animation: "dropIn 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        padding: "10px 14px 6px",
                        fontSize: 11,
                        color: "var(--text3)",
                        fontFamily: "Space Mono, monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      ✨ Suggested — click to import all topics
                    </div>
                    {titleSuggestions.map((entry) => (
                      <SuggestionCard
                        key={entry.id}
                        entry={entry}
                        onImport={importLibraryEntry}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Imported badge */}
              {importedLibEntry && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 10,
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "var(--lib-badge-bg)",
                    border: "1px solid var(--lib-badge-border)",
                  }}
                >
                  <span>{importedLibEntry.emoji}</span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--lib-badge-fg)",
                      fontWeight: 600,
                    }}
                  >
                    {importedLibEntry.topics.length} topics imported from{" "}
                    {importedLibEntry.title} library
                  </span>
                  <button
                    onClick={() => setImportedLibEntry(null)}
                    style={{
                      marginLeft: "auto",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text2)",
                      fontSize: 16,
                    }}
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Browse library pills */}
              <div style={{ marginTop: 14 }}>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text3)",
                    marginBottom: 10,
                  }}
                >
                  Or browse all subject libraries:
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {TOPIC_LIBRARY.slice(0, 10).map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => importLibraryEntry(entry)}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 100,
                        fontSize: 12,
                        cursor: "pointer",
                        background: "var(--lib-pill-bg)",
                        border: "1px solid var(--lib-pill-border)",
                        color: "var(--lib-pill-fg)",
                        transition: "all 0.15s",
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "var(--lib-pill-hover-bg)";
                        e.currentTarget.style.borderColor =
                          "var(--lib-pill-hover-border)";
                        e.currentTarget.style.color =
                          "var(--lib-pill-hover-fg)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--lib-pill-bg)";
                        e.currentTarget.style.borderColor =
                          "var(--lib-pill-border)";
                        e.currentTarget.style.color = "var(--lib-pill-fg)";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      {entry.emoji} {entry.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SECTION 2: Topics ── */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "var(--text)",
                  }}
                >
                  Topics
                </span>
                {topics.length > 0 && (
                  <div
                    style={{
                      marginLeft: 6,
                      padding: "2px 10px",
                      borderRadius: 100,
                      background: "var(--topic-count-bg)",
                      border: "1px solid var(--topic-count-border)",
                      fontSize: 12,
                      color: "var(--topic-count-fg)",
                      fontFamily: "Space Mono, monospace",
                    }}
                  >
                    {topics.length} topics · {reqDays}d total
                  </div>
                )}
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text3)",
                    marginLeft: "auto",
                    fontFamily: "Space Mono, monospace",
                  }}
                >
                  STEP 02
                </span>
              </div>

              {/* Add row */}
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <input
                  className="topic-input"
                  placeholder="Add a topic name... (or paste comma-separated list)"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onPaste={handleBulkPaste}
                  style={{
                    flex: 1,
                    padding: "11px 14px",
                    background: "var(--bg2)",
                    border: "1.5px solid var(--border)",
                    borderRadius: 10,
                    color: "var(--text)",
                    fontSize: 14,
                    fontFamily: "DM Sans, sans-serif",
                    outline: "none",
                    transition: "all 0.2s",
                  }}
                />
                {/* Days spinner */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "var(--bg2)",
                    border: "1.5px solid var(--border)",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() =>
                      setTopicDays((d) => Math.max(1, Number(d) - 1))
                    }
                    style={{
                      width: 32,
                      height: "100%",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      color: "var(--text3)",
                      fontSize: 16,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--bg3)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    −
                  </button>
                  <div style={{ textAlign: "center", minWidth: 42 }}>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        fontFamily: "Space Mono, monospace",
                        color: "var(--text)",
                        lineHeight: 1,
                      }}
                    >
                      {topicDays}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: "var(--text3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      days
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setTopicDays((d) => Math.min(60, Number(d) + 1))
                    }
                    style={{
                      width: 32,
                      height: "100%",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      color: "var(--text3)",
                      fontSize: 16,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--bg3)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={addTopic}
                  style={{
                    padding: "11px 18px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    background: "var(--accent)",
                    color: "var(--accent-fg)",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "DM Sans, sans-serif",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.85";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  + Add
                </button>
              </div>

              <p
                style={{
                  fontSize: 11,
                  color: "var(--text3)",
                  marginBottom: topics.length > 0 ? 12 : 0,
                }}
              >
                Click the{" "}
                <strong style={{ color: "var(--text2)" }}>Xd badge</strong> on
                any topic to edit its duration. Press Enter to quickly add.
              </p>

              {/* Topic list */}
              {topics.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    maxHeight: 360,
                    overflowY: "auto",
                    paddingRight: 2,
                  }}
                >
                  {topics.map((t, i) => (
                    <TopicRow
                      key={`${t.name}-${i}`}
                      topic={t}
                      index={i}
                      editingIdx={editingIdx}
                      editDays={editDays}
                      setEditingIdx={setEditingIdx}
                      setEditDays={setEditDays}
                      onSaveEdit={saveEdit}
                      onRemove={removeTopic}
                    />
                  ))}
                </div>
              )}

              {topics.length === 0 && (
                <div
                  style={{
                    padding: "28px",
                    textAlign: "center",
                    border: "2px dashed var(--border)",
                    borderRadius: 12,
                    marginTop: 4,
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>📝</div>
                  <p style={{ color: "var(--text3)", fontSize: 13 }}>
                    No topics yet. Import from a library above or add manually.
                  </p>
                </div>
              )}
            </div>

            {/* ── SECTION 3: Deadline & Mode ── */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: "var(--surface2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                  }}
                >
                  ⏳
                </div>
                <span
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "var(--text)",
                  }}
                >
                  Deadline & Mode
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--text3)",
                    marginLeft: "auto",
                    fontFamily: "Space Mono, monospace",
                  }}
                >
                  STEP 03
                </span>
              </div>

              {/* Deadline slider */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: 10,
                  }}
                >
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Deadline (calendar days)
                  </label>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={deadlineDays}
                      onChange={(e) => setDeadlineDays(Number(e.target.value))}
                      style={{
                        width: 70,
                        padding: "6px 10px",
                        textAlign: "center",
                        background: "var(--bg2)",
                        border: `1.5px solid ${overDeadline ? "var(--border2)" : "var(--border)"}`,
                        borderRadius: 8,
                        color: "var(--text)",
                        fontSize: 15,
                        fontFamily: "Space Mono, monospace",
                        fontWeight: 700,
                        outline: "none",
                      }}
                    />
                    <span style={{ fontSize: 13, color: "var(--text3)" }}>
                      days
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="365"
                  value={deadlineDays}
                  onChange={(e) => setDeadlineDays(Number(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: "var(--text2)",
                    cursor: "pointer",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 4,
                    fontSize: 11,
                    color: "var(--text3)",
                  }}
                >
                  <span>1d</span>
                  <span>365d</span>
                </div>
              </div>

              {/* Stat mini-cards */}
              {topics.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  {[
                    {
                      label: "Topics",
                      value: topics.length,
                      colorVar: "var(--text2)",
                    },
                    {
                      label: "Topic Days",
                      value: `${reqDays}d`,
                      colorVar: overDeadline
                        ? "var(--stat-mini-val-warn)"
                        : "var(--stat-mini-val-ok)",
                    },
                    {
                      label: "Deadline",
                      value: `${deadlineDays}d`,
                      colorVar: "var(--stat-mini-val-b)",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        background: "var(--bg2)",
                        borderRadius: 10,
                        padding: "12px 14px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 20,
                          fontFamily: "Space Mono, monospace",
                          fontWeight: 700,
                          color: s.colorVar,
                        }}
                      >
                        {s.value}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
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

              {/* Over-deadline warning */}
              {overDeadline && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    marginBottom: 20,
                    background: "var(--warn-bg)",
                    border: "1px solid var(--warn-border)",
                    fontSize: 13,
                    color: "var(--warn-fg)",
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <span>⚠️</span>
                  <span>
                    Your topics need <strong>{reqDays} days</strong> but
                    deadline is <strong>{deadlineDays} days</strong>. Topics
                    will be compressed. Consider increasing your deadline to at
                    least <strong>{reqDays} days</strong>.
                  </span>
                </div>
              )}

              {/* Mode toggle */}
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  display: "block",
                  marginBottom: 10,
                }}
              >
                Backlog Mode
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {[
                  {
                    value: "normal",
                    label: "Normal Mode",
                    desc: "Backlog spreads over next 3 days. Manageable pressure.",
                    icon: "⚖️",
                  },
                  {
                    value: "hard",
                    label: "Hard Mode",
                    desc: "All backlog hits tomorrow. Maximum accountability.",
                    icon: "💀",
                  },
                ].map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 12,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                      border: `2px solid ${mode === m.value ? "var(--mode-active-border)" : "var(--mode-idle-border)"}`,
                      background:
                        mode === m.value
                          ? "var(--mode-active-bg)"
                          : "var(--mode-idle-bg)",
                    }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 6 }}>
                      {m.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 4,
                        color:
                          mode === m.value
                            ? "var(--mode-active-fg)"
                            : "var(--mode-idle-fg)",
                      }}
                    >
                      {m.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text3)",
                        lineHeight: 1.5,
                      }}
                    >
                      {m.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: "var(--warn-bg)",
                  border: "1px solid var(--warn-border)",
                  fontSize: 13,
                  color: "var(--warn-fg)",
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Summary card */}
            {title && topics.length > 0 && (
              <div
                style={{
                  padding: "18px 20px",
                  borderRadius: 14,
                  background: overDeadline
                    ? "var(--warn-bg)"
                    : "var(--summary-ok-bg)",
                  border: `1px solid ${overDeadline ? "var(--warn-border)" : "var(--summary-ok-border)"}`,
                  fontSize: 14,
                  color: "var(--text2)",
                  lineHeight: 1.8,
                }}
              >
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "var(--text)",
                    marginBottom: 8,
                  }}
                >
                  Schedule Summary
                </div>
                <p>
                  <strong style={{ color: "var(--text)" }}>{title}</strong> —{" "}
                  {topics.length} topics needing{" "}
                  <strong
                    style={{
                      color: overDeadline
                        ? "var(--warn-fg)"
                        : "var(--summary-ok-fg)",
                    }}
                  >
                    {reqDays} study days
                  </strong>
                  , spread across{" "}
                  <strong style={{ color: "var(--text2)" }}>
                    {deadlineDays} calendar days
                  </strong>
                  .{" "}
                  {overDeadline ? (
                    <span style={{ color: "var(--warn-fg)" }}>
                      Topics will be compressed — consider increasing deadline.
                    </span>
                  ) : (
                    <span style={{ color: "var(--summary-ok-fg)" }}>
                      Every single day will have a topic assigned. No empty
                      days.
                    </span>
                  )}
                </p>
                <p style={{ marginTop: 4 }}>
                  Mode:{" "}
                  <strong
                    style={{
                      color:
                        mode === "hard"
                          ? "var(--mode-active-fg)"
                          : "var(--text2)",
                    }}
                  >
                    {mode === "hard"
                      ? "💀 Hard — all backlog hits tomorrow"
                      : "⚖️ Normal — backlog spreads over 3 days"}
                  </strong>
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              style={{
                padding: "16px 24px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                background:
                  step1Done && step2Done ? "var(--accent)" : "var(--surface)",
                color:
                  step1Done && step2Done ? "var(--accent-fg)" : "var(--text3)",
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "Syne, sans-serif",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                opacity: step1Done && step2Done ? 1 : 0.5,
                boxShadow:
                  step1Done && step2Done
                    ? "0 4px 24px rgba(0,0,0,0.2)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                if (step1Done && step2Done) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.28)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  step1Done && step2Done
                    ? "0 4px 24px rgba(0,0,0,0.2)"
                    : "none";
              }}
            >
              Create Goal & Build Schedule
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
