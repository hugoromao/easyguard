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
    title: "O início da jornada!",
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
    title: "Pegando o jeito",
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
    title: "Mestre da criptografia",
    description: "Crie 20 senhas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) >= 20;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 20;
    },
  },
  {
    id: 4,
    title: "Arquiteto de senhas",
    description: "Crie 30 senhas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) >= 30;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 30;
    },
  },
  {
    id: 5,
    title: "Tchau! hackers😉",
    description: "Crie 50 senhas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) >= 50;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 50;
    },
  },
  {
    id: 6,
    title: "Hábitos seguros",
    description: "Use a plataforma por 3 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 3;
    },
    getProgress: (history: HistoryItem[]) =>
      getTotalConsecutiveDiff(history, "day") / 3,
  },
  {
    id: 7,
    title: "Persistente que chama?",
    description: "Use a plataforma por 5 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 5;
    },
    getProgress: (history: HistoryItem[]) =>
      getTotalConsecutiveDiff(history, "day") / 5,
  },
  {
    id: 8,
    title: "Uma semana mais segura",
    description: "Use a plataforma por 7 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 7;
    },
    getProgress: (history: HistoryItem[]) =>
      getTotalConsecutiveDiff(history, "day") / 7,
  },
  {
    id: 9,
    title: "Dedicação inabalável",
    description: "Use a plataforma por 10 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 10;
    },
    getProgress: (history: HistoryItem[]) =>
      getTotalConsecutiveDiff(history, "day") / 10,
  },
  {
    id: 10,
    title: "Segurança nunca é demais",
    description: "Use a plataforma por 3 semanas consecutivas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") >= 3;
    },
    getProgress: (history: HistoryItem[]) =>
      getTotalConsecutiveDiff(history, "week") / 3,
  },
  {
    id: 11,
    title: "Tu já é de casa",
    description: "Use a plataforma por 5 semanas consecutivas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") >= 5;
    },
    getProgress: (history: HistoryItem[]) =>
      getTotalConsecutiveDiff(history, "week") / 5,
  },
  {
    id: 12,
    title: "Aficionado em segurança",
    description: "Use a plataforma por 10 semanas consecutivas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") >= 10;
    },
    getProgress: (history: HistoryItem[]) =>
      getTotalConsecutiveDiff(history, "week") / 10,
  },
  {
    id: 13,
    title: "Tu trabalha na NASA?",
    description: "Use a plataforma por 20 semanas consecutivas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") >= 20;
    },
    getProgress: (history: HistoryItem[]) =>
      getTotalConsecutiveDiff(history, "week") / 20,
  },
  {
    id: 14,
    title: "",
    description: "Crie uma senha no período da manhã",
    activationFunction: () => true,
    getProgress: () => 10,
  },
];
