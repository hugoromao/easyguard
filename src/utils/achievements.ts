/* eslint-disable no-unused-vars */
import dayjs from "dayjs";

import { HistoryItem } from "../context/global";

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

function getTotalDayByPartOfTheDay(history: HistoryItem[]) {
  let morningCounter = 0;
  let nightCounter = 0;

  if (history.length === 0) return { morningCounter, nightCounter };

  history.forEach(({ createdAt }) => {
    const hour = dayjs(createdAt).hour();
    if (hour >= 18 || hour < 6) {
      nightCounter += 1;
    }

    if (hour >= 6 && hour < 12) {
      morningCounter += 1;
    }
  });

  return { morningCounter, nightCounter };
}

function getTotalAtFriday(history: HistoryItem[]) {
  let counter = 0;
  if (history.length === 0) return 0;

  history.forEach(({ createdAt }) => {
    if (dayjs(createdAt).day() === 5) {
      counter += 1;
    }
  });
  return counter;
}

export type Badge = {
  image: {
    url: string;
    smallUrl: string;
    alt: string;
  };
};

export type Achivement = {
  id: number;
  title: string;
  description: string;
  badge: Badge;
  activationFunction: (
    history: HistoryItem[],
    completedAchievements: number[]
  ) => boolean;
  getProgress: (
    history: HistoryItem[],
    completedAchievements: number[]
  ) => number;
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
    badge: {
      image: {
        url: "/badges/1.jpg",
        smallUrl: "/badges/small-1.jpg",
        alt: "Um sapo montado em uma capivara em um campo de flores.",
      },
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
    badge: {
      image: {
        url: "/badges/2.jpg",
        smallUrl: "/badges/small-2.jpg",
        alt: "Um sapo caminhando fantasiado de vaqueiro em uma floresta.",
      },
    },
  },
  {
    id: 3,
    title: "Só mais um pouquinho",
    description: "Crie 20 senhas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) >= 20;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 20;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 4,
    title: "Produção em massa",
    description: "Crie 30 senhas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) >= 30;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 30;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 5,
    title: "Tchau! hackers",
    description: "Crie 50 senhas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) >= 50;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalPasswordsCreated(history) / 50;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 6,
    title: "Hábitos seguros",
    description: "Use a plataforma por 3 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 3;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") / 3;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 7,
    title: "Persistente que chama?",
    description: "Use a plataforma por 5 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 5;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") / 5;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 8,
    title: "Dedicação inabalável",
    description: "Use a plataforma por 7 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 7;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") / 7;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 9,
    title: "Já virou rotina!",
    description: "Use a plataforma por 10 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 10;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") / 10;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 10,
    title: "Segurança nunca é demais",
    description: "Use a plataforma por 3 semanas consecutivas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") >= 3;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") / 3;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 11,
    title: "Consistência é a chave",
    description: "Use a plataforma por 5 semanas consecutivas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") >= 5;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") / 5;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 12,
    title: "Sem parar!",
    description: "Use a plataforma por 10 semanas consecutivas.",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") >= 10;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "week") / 10;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 13,
    title: "Acordando com os pássaros",
    description: "Crie três senhas no período da manhã",
    activationFunction: (history: HistoryItem[]) =>
      getTotalDayByPartOfTheDay(history).morningCounter >= 3,
    getProgress: (history: HistoryItem[]) => {
      return getTotalDayByPartOfTheDay(history).morningCounter / 3;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 14,
    title: "Coruja noturna",
    description: "Crie três senhas no período da noite",
    activationFunction: (history: HistoryItem[]) =>
      getTotalDayByPartOfTheDay(history).nightCounter >= 3,
    getProgress: (history: HistoryItem[]) => {
      return getTotalDayByPartOfTheDay(history).nightCounter / 3;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 15,
    title: "Sextou!",
    description: "Crie uma senha na sexta-feira",
    activationFunction: (history: HistoryItem[]) => !!getTotalAtFriday(history),
    getProgress: (history: HistoryItem[]) => {
      return getTotalAtFriday(history) > 1 ? 100 : 0;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
  {
    id: 16,
    title: "Topo do mundo",
    description: "Complete todas as conquistas",
    activationFunction: (_, completedAchievements: number[]) =>
      completedAchievements.length === achievements.length,
    getProgress: (_, completedAchievements: number[]) => {
      return completedAchievements.length / achievements.length;
    },
    badge: {
      image: {
        url: "/badges/default.png",
        smallUrl: "/badges/default.png",
        alt: "default badge image",
      },
    },
  },
];
