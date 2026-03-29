/**
 * Topic Object Structure
 */
export const createTopic = ({ id, name, totalDays, createdAt }) => ({
  id,
  name,
  totalDays,
  createdAt,
  completedDays: 0,
  missedDays: [], // ["YYYY-MM-DD"]
  status: "active", // 'active' | 'completed' | 'overdue'
});

/**
 * Daily Task Structure
 */
export const createDailyTask = ({ topicId, topicName, dayNumber }) => ({
  topicId,
  topicName,
  dayNumber,
  isCompleted: false,
  isMissed: false,
  backlogCount: 0,
});

/**
 * App State Structure
 */
export const createInitialState = () => ({
  topics: [],
  dailyProgress: {}, // { "2026-03-29": true }
  currentStreak: 0,
  maxStreak: 0,
  lastCompletedDate: null,
});
