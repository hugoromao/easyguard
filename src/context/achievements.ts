import dayjs from "dayjs";

import { HistoryItem } from "./global";

function getTotalPasswordsCreated(history: HistoryItem[]) {
  return history.reduce(
    (acc, cur) => (cur.type === "password" ? acc + 1 : acc),
    0
  );
}

function getTotalConsecutiveDiff(history: HistoryItem[], date: "day" | "week") {
  if (history.length === 0) return 0;

  let totalConsecutives = 0;
  let currentConsecutives = 1;

  for (let i = 1; i < history.length; i++) {
    const currentDate = dayjs(history[i].createdAt);
    const previousDate = dayjs(history[i - 1].createdAt);

    if (currentDate.diff(previousDate, date) === 1) {
      currentConsecutives++;
    } else {
      totalConsecutives = Math.max(totalConsecutives, currentConsecutives);
      currentConsecutives = 1;
    }
  }

  return Math.max(totalConsecutives, currentConsecutives);
}

export type Achivement = {
  id: number;
  title: string;
  description: string;
  // eslint-disable-next-line no-unused-vars
  activationFunction: (history: HistoryItem[]) => boolean;
  // eslint-disable-next-line no-unused-vars
  getProgress: (history: HistoryItem[]) => number;
};

export const achievements: Achivement[] = [
  {
    id: 1,
    title: "Vamos começar!",
    description: "Crie sua primeira senha.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) > 0;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 1;
    },
  },
  {
    id: 2,
    title: "Um pouquinho de cada vez",
    description: "Crie 10 senhas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) >= 10;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 10;
    },
  },
  {
    id: 3,
    title: "Perseverante",
    description: "Use a plataforma por 3 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 3;
    },
    getProgress: (history: HistoryItem[]) =>
      getTotalConsecutiveDiff(history, "day") / 3,
  },
  {
    id: 4,
    title: "Segurança nunca é demais",
    description: "Use a plataforma por 3 semanas consecutivas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") >= 3;
    },
    getProgress: (history: HistoryItem[]) =>
      getTotalConsecutiveDiff(history, "week") / 3,
  },
];
