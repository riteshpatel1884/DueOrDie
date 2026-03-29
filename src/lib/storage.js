const STORAGE_KEY = "backlog_pressure_app";

export const getDefaultAppState = () => ({
  topics: [],
  dailyProgress: {},
  currentStreak: 0,
  maxStreak: 0,
  lastCompletedDate: null,
});

export const loadState = () => {
  if (typeof window === "undefined") {
    return getDefaultAppState();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getDefaultAppState();
  } catch {
    return getDefaultAppState();
  }
};

export const saveState = (state) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    console.error("Failed to save state to localStorage");
  }
};

export const addTopic = (state, topicName, totalDays) => {
  const newTopic = {
    id: Date.now().toString(),
    name: topicName,
    totalDays,
    createdAt: new Date().toISOString().split("T")[0],
    completedDays: 0,
    missedDays: [],
    status: "active",
  };

  return {
    ...state,
    topics: [...state.topics, newTopic],
  };
};

export const deleteTopic = (state, topicId) => {
  return {
    ...state,
    topics: state.topics.filter((t) => t.id !== topicId),
  };
};

export const markDayComplete = (state, topicId, dayDate) => {
  const updatedTopics = state.topics.map((topic) => {
    if (topic.id === topicId) {
      return {
        ...topic,
        completedDays: topic.completedDays + 1,
        missedDays: topic.missedDays.filter((d) => d !== dayDate),
      };
    }
    return topic;
  });

  return {
    ...state,
    topics: updatedTopics,
    dailyProgress: {
      ...state.dailyProgress,
      [dayDate]: true,
    },
  };
};

export const markDayMissed = (state, topicId, dayDate) => {
  const updatedTopics = state.topics.map((topic) => {
    if (topic.id === topicId && !topic.missedDays.includes(dayDate)) {
      return {
        ...topic,
        missedDays: [...topic.missedDays, dayDate],
      };
    }
    return topic;
  });

  return {
    ...state,
    topics: updatedTopics,
  };
};

export const updateStreak = (state, completed) => {
  const today = new Date().toISOString().split("T")[0];

  if (completed) {
    const newStreak =
      state.lastCompletedDate === today
        ? state.currentStreak
        : state.currentStreak + 1;

    return {
      ...state,
      currentStreak: newStreak,
      maxStreak: Math.max(newStreak, state.maxStreak),
      lastCompletedDate: today,
    };
  }

  return {
    ...state,
    currentStreak: 0,
  };
};

export const getTopicStatus = (topic) => {
  const daysElapsed = Math.floor(
    (new Date().getTime() - new Date(topic.createdAt).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  if (topic.completedDays >= topic.totalDays) {
    return "completed";
  }

  if (daysElapsed > topic.totalDays) {
    return "overdue";
  }

  return "active";
};

export const calculateDailyBacklog = (topics, targetDate) => {
  let backlogCount = 0;

  topics.forEach((topic) => {
    const daysElapsed = Math.floor(
      (new Date(targetDate).getTime() - new Date(topic.createdAt).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (daysElapsed >= 0 && daysElapsed < topic.totalDays) {
      const expectedTasksDone = daysElapsed + 1;
      const missedCount = topic.missedDays.filter(
        (d) => d <= targetDate,
      ).length;
      const behindSchedule = Math.max(
        0,
        expectedTasksDone - topic.completedDays,
      );

      backlogCount += behindSchedule + missedCount;
    }
  });

  return backlogCount;
};

export const getSmartBacklogDistribution = (backlog, daysRemaining) => {
  if (backlog === 0 || daysRemaining === 0) return [];

  const distribution = [];

  const spreadDays = Math.min(Math.ceil(daysRemaining / 2), 5);
  let remainingBacklog = backlog;
  const tasksPerDay = Math.ceil(backlog / spreadDays);

  for (let i = 0; i < spreadDays && remainingBacklog > 0; i++) {
    const tasks = Math.min(tasksPerDay, remainingBacklog);
    distribution.push({ day: i + 1, tasks });
    remainingBacklog -= tasks;
  }

  return distribution;
};

export const getDeadlineStats = (topics) => {
  const today = new Date().toISOString().split("T")[0];

  let onTrack = 0;
  let atRisk = 0;
  let overdue = 0;

  topics.forEach((topic) => {
    const daysElapsed = Math.floor(
      (new Date(today).getTime() - new Date(topic.createdAt).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    const remainingDays = topic.totalDays - daysElapsed;
    const remainingTasks = Math.max(0, topic.totalDays - topic.completedDays);

    if (topic.completedDays >= topic.totalDays) {
      onTrack++;
    } else if (remainingDays < 0) {
      overdue++;
    } else if (remainingTasks > remainingDays) {
      atRisk++;
    } else {
      onTrack++;
    }
  });

  return { onTrack, atRisk, overdue };
};
