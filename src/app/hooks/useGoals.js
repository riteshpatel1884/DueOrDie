"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "stackflow-goals";

// ─── helpers ──────────────────────────────────────────────────────────────────

export function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function addDays(dateStr, n) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

function daysBetween(a, b) {
  return Math.floor((new Date(b) - new Date(a)) / 86400000);
}

/**
 * Build the daily schedule for a goal.
 * Each day gets an array of topic indices from the goal's topics list.
 * Missed days' topics spill into future days.
 */
export function buildSchedule(goal) {
  const { topics, startDate, deadlineDays, mode, dailyLogs } = goal;
  const totalTopics = topics.length;
  const today = todayStr();
  const endDate = addDays(startDate, deadlineDays - 1);

  // Base distribution: topics spread evenly across deadline days
  const totalDays = deadlineDays;
  const basePerDay = Math.ceil(totalTopics / totalDays);

  // Create base daily plan
  let plan = [];
  let assigned = 0;
  for (let i = 0; i < totalDays; i++) {
    const dateStr = addDays(startDate, i);
    const count = Math.min(basePerDay, totalTopics - assigned);
    const topicsForDay = topics.slice(assigned, assigned + count);
    assigned += count;
    plan.push({
      date: dateStr,
      topics: topicsForDay,
      extra: [], // backlog added here
    });
  }

  // Process logs: mark completed, collect missed
  let pendingBacklog = [];

  plan = plan.map((day) => {
    const log = dailyLogs?.[day.date];
    const allTopics = [...day.topics, ...day.extra];

    if (!log) {
      // Future day or not yet logged
      const isPast = day.date < today;
      if (isPast) {
        // Missed — collect backlog
        pendingBacklog.push(...allTopics);
        return { ...day, status: "missed", completedTopics: [] };
      }
      return {
        ...day,
        status: day.date === today ? "today" : "upcoming",
        completedTopics: [],
      };
    }

    return {
      ...day,
      status: log.completed ? "done" : "missed",
      completedTopics: log.completedTopics || [],
      skippedTopics: log.skippedTopics || [],
    };
  });

  // Redistribute backlog
  if (pendingBacklog.length > 0) {
    const futureDays = plan.filter(
      (d) => d.date >= today && d.status !== "done",
    );

    if (mode === "hard") {
      // Hard mode: all backlog dumps into next day
      const nextDay = futureDays[0];
      if (nextDay) {
        nextDay.extra = [...pendingBacklog];
        nextDay.hasBacklog = true;
      }
    } else {
      // Normal mode: spread over next N days
      const spreadOver = Math.min(3, futureDays.length);
      const perDay = Math.ceil(pendingBacklog.length / Math.max(spreadOver, 1));
      for (let i = 0; i < spreadOver; i++) {
        if (futureDays[i]) {
          const slice = pendingBacklog.splice(0, perDay);
          futureDays[i].extra = [...(futureDays[i].extra || []), ...slice];
          futureDays[i].hasBacklog = true;
        }
      }
    }
  }

  return { plan, endDate };
}

export function computeStats(goal) {
  const { plan } = buildSchedule(goal);
  const today = todayStr();

  const totalTopics = goal.topics.length;
  const doneDays = plan.filter((d) => d.status === "done").length;
  const missedDays = plan.filter((d) => d.status === "missed").length;
  const completedTopics = plan
    .filter((d) => d.status === "done")
    .flatMap((d) => d.completedTopics || []).length;

  const pendingTopics = plan
    .filter((d) => d.date >= today)
    .reduce((acc, d) => acc + d.topics.length + (d.extra?.length || 0), 0);

  const backlogTopics = plan
    .filter((d) => d.hasBacklog)
    .reduce((acc, d) => acc + (d.extra?.length || 0), 0);

  const progress =
    totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const totalDays = goal.deadlineDays;
  const elapsed = Math.max(0, daysBetween(goal.startDate, today));
  const remaining = Math.max(0, totalDays - elapsed);

  // Pace: if current completion rate continues, will user finish?
  const completionRate = elapsed > 0 ? completedTopics / elapsed : 0;
  const projectedTotal = completionRate * totalDays;
  const onTrack = projectedTotal >= totalTopics * 0.9;

  // Streak
  let streak = 0;
  const sortedDays = [...plan].reverse();
  for (const day of sortedDays) {
    if (day.date > today) continue;
    if (day.status === "done") streak++;
    else break;
  }

  // Panic level 0-100
  const panicLevel = Math.min(
    100,
    missedDays * 15 + backlogTopics * 5 + (!onTrack && elapsed > 3 ? 20 : 0),
  );

  return {
    totalTopics,
    doneDays,
    missedDays,
    completedTopics,
    pendingTopics,
    backlogTopics,
    progress,
    remaining,
    elapsed,
    onTrack,
    streak,
    panicLevel,
  };
}

// ─── hook ─────────────────────────────────────────────────────────────────────

export function useGoals() {
  const [goals, setGoals] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setGoals(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  const persist = useCallback((updated) => {
    setGoals(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addGoal = useCallback(
    (goalData) => {
      const goal = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        startDate: todayStr(),
        dailyLogs: {},
        mode: "normal",
        ...goalData,
      };
      persist([...goals, goal]);
      return goal;
    },
    [goals, persist],
  );

  const updateGoal = useCallback(
    (id, updates) => {
      persist(goals.map((g) => (g.id === id ? { ...g, ...updates } : g)));
    },
    [goals, persist],
  );

  const deleteGoal = useCallback(
    (id) => {
      persist(goals.filter((g) => g.id !== id));
    },
    [goals, persist],
  );

  const logDay = useCallback(
    (goalId, date, { completed, completedTopics, skippedTopics }) => {
      const goal = goals.find((g) => g.id === goalId);
      if (!goal) return;
      const updatedLogs = {
        ...goal.dailyLogs,
        [date]: {
          completed,
          completedTopics,
          skippedTopics,
          loggedAt: new Date().toISOString(),
        },
      };
      updateGoal(goalId, { dailyLogs: updatedLogs });
    },
    [goals, updateGoal],
  );

  return { goals, loaded, addGoal, updateGoal, deleteGoal, logDay };
}
