"use client";

import { useState, useEffect, useCallback } from "react";
import { STAR_QUESTIONS, STAR_CATEGORIES } from "./data";

// ─── STAR label config ────────────────────────────────────────────────────────
const STAR_LABELS = {
  situation: {
    letter: "S",
    label: "Situation",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
  },
  task: {
    letter: "T",
    label: "Task",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
  },
  action: {
    letter: "A",
    label: "Action",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
  result: {
    letter: "R",
    label: "Result",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
  },
};

// ─── Answer Modal ─────────────────────────────────────────────────────────────
function AnswerModal({ question, onClose }) {
  const [activeTab, setActiveTab] = useState("full");
  const [copiedPart, setCopiedPart] = useState(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedPart(key);
    setTimeout(() => setCopiedPart(null), 2000);
  };

  const fullAnswer = `Situation: ${question.situation}\n\nTask: ${question.task}\n\nAction: ${question.action}\n\nResult: ${question.result}`;

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes backdropIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .star-tab { transition: all 0.2s; }
        .star-tab:hover { background: var(--bg3) !important; }
        .star-section { transition: box-shadow 0.2s; }
        .star-section:hover { box-shadow: 0 2px 16px rgba(0,0,0,0.1); }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(6px)",
          zIndex: 200,
          animation: "backdropIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 201,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <div
          style={{
            background: "var(--surface)",
            borderRadius: 20,
            border: `1px solid ${question.categoryColor}40`,
            boxShadow: `0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px ${question.categoryColor}20`,
            width: "100%",
            maxWidth: 760,
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            animation: "modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            overflow: "hidden",
          }}
        >
          {/* Modal header */}
          <div
            style={{
              padding: "20px 24px 0",
              background: `linear-gradient(135deg, ${question.categoryColor}0a 0%, transparent 60%)`,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                paddingBottom: 16,
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  flexShrink: 0,
                  background: `${question.categoryColor}18`,
                  border: `2px solid ${question.categoryColor}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Space Mono, monospace",
                  fontWeight: 700,
                  fontSize: 15,
                  color: question.categoryColor,
                }}
              >
                {question.id}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 100,
                      fontSize: 11,
                      fontWeight: 600,
                      background: `${question.categoryColor}15`,
                      color: question.categoryColor,
                      border: `1px solid ${question.categoryColor}30`,
                    }}
                  >
                    {question.categoryEmoji} {question.categoryLabel}
                  </span>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 100,
                      fontSize: 11,
                      fontWeight: 600,
                      background: "var(--bg2)",
                      color: "var(--text3)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    Q{question.id} of 30
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "var(--text)",
                    letterSpacing: "-0.3px",
                    lineHeight: 1.3,
                  }}
                >
                  {question.title}
                </h2>
              </div>

              <button
                onClick={onClose}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--surface2)",
                  cursor: "pointer",
                  color: "var(--text3)",
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
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
                ×
              </button>
            </div>

            {/* Question */}
            <div
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                marginBottom: 16,
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                fontSize: 14,
                color: "var(--text)",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              "{question.question}"
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4 }}>
              {[
                { key: "full", label: "📖 Full Answer" },
                { key: "breakdown", label: "🔍 S·T·A·R Breakdown" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className="star-tab"
                  style={{
                    padding: "8px 16px",
                    borderRadius: "10px 10px 0 0",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "DM Sans, sans-serif",
                    background:
                      activeTab === t.key ? "var(--bg)" : "transparent",
                    color: activeTab === t.key ? "var(--text)" : "var(--text3)",
                    borderBottom:
                      activeTab === t.key
                        ? `2px solid ${question.categoryColor}`
                        : "2px solid transparent",
                    transition: "all 0.2s",
                  }}
                >
                  {t.label}
                </button>
              ))}
              <button
                onClick={() => copyText(fullAnswer, "all")}
                style={{
                  marginLeft: "auto",
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background:
                    copiedPart === "all"
                      ? "rgba(6,214,160,0.1)"
                      : "var(--surface2)",
                  color: copiedPart === "all" ? "var(--green)" : "var(--text3)",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
              >
                {copiedPart === "all" ? "✓ Copied!" : "⎘ Copy All"}
              </button>
            </div>
          </div>

          {/* Modal body */}
          <div
            style={{ flex: 1, overflowY: "auto", padding: "20px 24px 24px" }}
          >
            {activeTab === "full" ? (
              // Full answer view — clean readable prose
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {["situation", "task", "action", "result"].map((key) => {
                  const cfg = STAR_LABELS[key];
                  return (
                    <div
                      key={key}
                      className="star-section"
                      style={{
                        display: "flex",
                        gap: 16,
                        padding: "16px 0",
                        borderBottom:
                          key !== "result" ? "1px solid var(--border)" : "none",
                      }}
                    >
                      {/* Letter badge */}
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          flexShrink: 0,
                          background: cfg.bg,
                          border: `1.5px solid ${cfg.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "Space Mono, monospace",
                          fontWeight: 700,
                          fontSize: 15,
                          color: cfg.color,
                        }}
                      >
                        {cfg.letter}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: cfg.color,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            marginBottom: 6,
                            fontFamily: "Space Mono, monospace",
                          }}
                        >
                          {cfg.label}
                        </div>
                        <p
                          style={{
                            fontSize: 14,
                            color: "var(--text)",
                            lineHeight: 1.8,
                            margin: 0,
                          }}
                        >
                          {question[key]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Breakdown view — card grid
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {["situation", "task", "action", "result"].map((key) => {
                  const cfg = STAR_LABELS[key];
                  return (
                    <div
                      key={key}
                      style={{
                        borderRadius: 14,
                        border: `1.5px solid ${cfg.border}`,
                        background: cfg.bg,
                        padding: "16px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: `${cfg.color}20`,
                            border: `1.5px solid ${cfg.color}50`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "Space Mono, monospace",
                            fontWeight: 700,
                            fontSize: 13,
                            color: cfg.color,
                          }}
                        >
                          {cfg.letter}
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: cfg.color,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            fontFamily: "Space Mono, monospace",
                          }}
                        >
                          {cfg.label}
                        </span>
                        <button
                          onClick={() => copyText(question[key], key)}
                          style={{
                            marginLeft: "auto",
                            padding: "2px 8px",
                            borderRadius: 5,
                            border: `1px solid ${cfg.border}`,
                            background: "transparent",
                            color:
                              copiedPart === key ? cfg.color : "var(--text3)",
                            cursor: "pointer",
                            fontSize: 10,
                            transition: "all 0.15s",
                          }}
                        >
                          {copiedPart === key ? "✓" : "⎘"}
                        </button>
                      </div>
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--text)",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {question[key]}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 20,
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
              }}
            >
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 100,
                    fontSize: 11,
                    background: "var(--bg2)",
                    border: "1px solid var(--border)",
                    color: "var(--text3)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Question Card ────────────────────────────────────────────────────────────
function QuestionCard({ question, index, onOpen }) {
  return (
    <div
      onClick={() => onOpen(question)}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "18px 20px",
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = question.categoryColor + "60";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px ${question.categoryColor}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Color accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: question.categoryColor,
          borderRadius: "14px 0 0 14px",
        }}
      />

      <div style={{ paddingLeft: 8 }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                flexShrink: 0,
                background: `${question.categoryColor}15`,
                border: `1.5px solid ${question.categoryColor}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Space Mono, monospace",
                fontWeight: 700,
                fontSize: 12,
                color: question.categoryColor,
              }}
            >
              {question.id}
            </div>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: 100,
                fontSize: 11,
                fontWeight: 500,
                background: `${question.categoryColor}12`,
                color: question.categoryColor,
                border: `1px solid ${question.categoryColor}25`,
              }}
            >
              {question.categoryEmoji} {question.categoryLabel}
            </span>
          </div>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: "var(--text3)",
            }}
          >
            →
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: 15,
            color: "var(--text)",
            marginBottom: 7,
            letterSpacing: "-0.2px",
          }}
        >
          {question.title}
        </h3>

        {/* Question preview */}
        <p
          style={{
            fontSize: 13,
            color: "var(--text3)",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginBottom: 12,
          }}
        >
          {question.question}
        </p>

        {/* STAR mini badges */}
        <div style={{ display: "flex", gap: 4 }}>
          {["S", "T", "A", "R"].map((l, i) => {
            const keys = ["situation", "task", "action", "result"];
            const cfg = STAR_LABELS[keys[i]];
            return (
              <div
                key={l}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Space Mono, monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  color: cfg.color,
                }}
              >
                {l}
              </div>
            );
          })}
          <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
            {question.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "2px 8px",
                  borderRadius: 100,
                  fontSize: 10,
                  background: "var(--bg2)",
                  color: "var(--text3)",
                  border: "1px solid var(--border)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StarInterviewPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedQ, setSelectedQ] = useState(null);
  const [randomMode, setRandomMode] = useState(false);

  const filtered = STAR_QUESTIONS.filter((q) => {
    const matchCat = activeCategory === "all" || q.category === activeCategory;
    const s = search.toLowerCase();
    const matchSearch =
      !s ||
      q.title.toLowerCase().includes(s) ||
      q.question.toLowerCase().includes(s) ||
      q.tags.some((t) => t.includes(s)) ||
      q.categoryLabel.toLowerCase().includes(s);
    return matchCat && matchSearch;
  });

  const openRandom = useCallback(() => {
    const pool = filtered.length > 0 ? filtered : STAR_QUESTIONS;
    setSelectedQ(pool[Math.floor(Math.random() * pool.length)]);
  }, [filtered]);

  return (
    <>
      <style>{`
        .q-card { animation: fadeUpCard 0.3s ease both; }
        @keyframes fadeUpCard {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cat-pill { transition: all 0.2s; }
        .cat-pill:hover { transform: translateY(-1px); }
        .search-input:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(255,77,77,0.1); }
      `}</style>

      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px 80px" }}
      >
        {/* ── Page Header ── */}
        <div style={{ marginBottom: 36 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                padding: "4px 14px",
                borderRadius: 100,
                fontSize: 12,
                background: "rgba(255,77,77,0.08)",
                border: "1px solid rgba(255,77,77,0.2)",
                color: "var(--accent)",
                fontFamily: "Space Mono, monospace",
                fontWeight: 600,
              }}
            >
              INTERVIEW PREP
            </div>
            <span
              style={{
                fontSize: 12,
                color: "var(--text3)",
                fontFamily: "Space Mono, monospace",
              }}
            >
              30 questions · 6 categories
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: 34,
                  color: "var(--text)",
                  letterSpacing: "-0.6px",
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                STAR Interview Guide
              </h1>
              <p
                style={{
                  color: "var(--text3)",
                  fontSize: 14,
                  maxWidth: 560,
                  lineHeight: 1.6,
                }}
              >
                30 behavioural & situational questions for fresh engineers —
                each with a full model answer structured as Situation · Task ·
                Action · Result.
              </p>
            </div>
            <button
              onClick={openRandom}
              style={{
                padding: "12px 20px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: "var(--accent)",
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "Syne, sans-serif",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 20px rgba(255,77,77,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 28px rgba(255,77,77,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(255,77,77,0.25)";
              }}
            >
              🎲 Random Question
            </button>
          </div>
        </div>

        {/* ── STAR legend ── */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 28,
            padding: "14px 18px",
            borderRadius: 12,
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "var(--text3)",
              marginRight: 4,
              alignSelf: "center",
            }}
          >
            Format:
          </span>
          {Object.values(STAR_LABELS).map((cfg) => (
            <div
              key={cfg.letter}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 8,
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: "Space Mono, monospace",
                  fontWeight: 700,
                  fontSize: 12,
                  color: cfg.color,
                }}
              >
                {cfg.letter}
              </span>
              <span style={{ fontSize: 12, color: "var(--text2)" }}>
                {cfg.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Search + filters ── */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text3)",
                fontSize: 15,
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions, topics, tags..."
              style={{
                width: "100%",
                padding: "11px 14px 11px 40px",
                background: "var(--surface)",
                border: "1.5px solid var(--border)",
                borderRadius: 12,
                color: "var(--text)",
                fontSize: 14,
                fontFamily: "DM Sans, sans-serif",
                outline: "none",
                transition: "all 0.2s",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text3)",
                  fontSize: 16,
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          <button
            className="cat-pill"
            onClick={() => setActiveCategory("all")}
            style={{
              padding: "7px 16px",
              borderRadius: 100,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "DM Sans, sans-serif",
              background:
                activeCategory === "all" ? "var(--accent)" : "var(--surface)",
              color: activeCategory === "all" ? "white" : "var(--text2)",
              border: `1.5px solid ${activeCategory === "all" ? "var(--accent)" : "var(--border)"}`,
              transition: "all 0.2s",
            }}
          >
            All 30
          </button>
          {STAR_CATEGORIES.map((cat) => {
            const count = STAR_QUESTIONS.filter(
              (q) => q.category === cat.id,
            ).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                className="cat-pill"
                onClick={() => setActiveCategory(isActive ? "all" : cat.id)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 100,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "DM Sans, sans-serif",
                  background: isActive ? `${cat.color}18` : "var(--surface)",
                  color: isActive ? cat.color : "var(--text2)",
                  border: `1.5px solid ${isActive ? cat.color + "50" : "var(--border)"}`,
                  transition: "all 0.2s",
                }}
              >
                {cat.emoji} {cat.label}{" "}
                <span style={{ fontSize: 11, opacity: 0.7, marginLeft: 4 }}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: "var(--text3)",
              fontFamily: "Space Mono, monospace",
            }}
          >
            {filtered.length} question{filtered.length !== 1 ? "s" : ""}{" "}
            {search ? `matching "${search}"` : ""}
          </span>
        </div>

        {/* ── Question grid ── */}
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "60px 40px",
              textAlign: "center",
              background: "var(--surface)",
              borderRadius: 16,
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ color: "var(--text3)", fontSize: 15 }}>
              No questions match your search.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
              }}
              style={{
                marginTop: 14,
                padding: "9px 18px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--surface2)",
                color: "var(--text2)",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 14,
            }}
          >
            {filtered.map((q, i) => (
              <div
                key={q.id}
                className="q-card"
                style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}
              >
                <QuestionCard question={q} index={i} onOpen={setSelectedQ} />
              </div>
            ))}
          </div>
        )}

        {/* Pro tip banner */}
        <div
          style={{
            marginTop: 40,
            padding: "18px 22px",
            borderRadius: 14,
            background: "rgba(74,158,255,0.06)",
            border: "1px solid rgba(74,158,255,0.2)",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
          <div>
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "var(--blue)",
                marginBottom: 4,
              }}
            >
              Pro Interview Tip
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--text3)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Don't memorize answers word-for-word. Instead, memorize the{" "}
              <strong style={{ color: "var(--text2)" }}>
                structure (S·T·A·R)
              </strong>{" "}
              and your real story. Interviewers want authenticity — adapt these
              answers to your own experiences. Use the{" "}
              <strong style={{ color: "var(--text2)" }}>
                S·T·A·R Breakdown tab
              </strong>{" "}
              in each answer to internalize the skeleton.
            </p>
          </div>
        </div>
      </div>

      {/* Answer modal */}
      {selectedQ && (
        <AnswerModal question={selectedQ} onClose={() => setSelectedQ(null)} />
      )}
    </>
  );
}
