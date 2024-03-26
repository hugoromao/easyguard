/* eslint-disable no-unused-vars */
import dayjs from "dayjs";

import { HistoryItem } from "../context/global";

export function getTotalConsecutiveDiff(
  history: HistoryItem[],
  date: "day" | "week"
) {
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

export type Badge = {
  image: {
    url: string;
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
    description: "Crie uma senha para seu E-mail pessoal",
    activationFunction: (_, completedAchievements) => {
      return completedAchievements.includes(1);
    },
    getProgress: (_, completedAchievements) => {
      return completedAchievements.includes(1) ? 1 : 0;
    },
    badge: {
      image: {
        url: "/badges/lock.svg",
        alt: "",
      },
    },
  },
  {
    id: 2,
    title: "Pegando o jeito",
    description: "Crie uma senha para seu E-mail profissional",
    activationFunction: (_, completedAchievements) => {
      return completedAchievements.includes(2);
    },
    getProgress: (_, completedAchievements) => {
      return completedAchievements.includes(2) ? 1 : 0;
    },
    badge: {
      image: {
        url: "/badges/protection ebike.svg",
        alt: "",
      },
    },
  },
  {
    id: 3,
    title: "Defesa pessoal I",
    description:
      "Crie uma senha para uma conta de uso pessoal(ex: Instagram, TikTok, Pinterest)",
    activationFunction: (_, completedAchievements) => {
      return completedAchievements.includes(3);
    },
    getProgress: (_, completedAchievements) => {
      return completedAchievements.includes(3) ? 1 : 0;
    },
    badge: {
      image: {
        url: "/badges/dialog.svg",
        alt: "",
      },
    },
  },
  {
    id: 4,
    title: "Defesa pessoal II",
    description:
      "Crie uma senha para uma conta de uso pessoal(ex: Instagram, TikTok, Pinterest)",
    activationFunction: (_, completedAchievements) => {
      return completedAchievements.includes(4);
    },
    getProgress: (_, completedAchievements) => {
      return completedAchievements.includes(4) ? 1 : 0;
    },
    badge: {
      image: {
        url: "/badges/smiley bubble.svg",
        alt: "",
      },
    },
  },
  {
    id: 5,
    title: "Segurança profissional",
    description: "Crie uma senha para uso profissional(ex: LinkedIn, Slack)",
    activationFunction: (_, completedAchievements) => {
      return completedAchievements.includes(5);
    },
    getProgress: (_, completedAchievements) => {
      return completedAchievements.includes(5) ? 1 : 0;
    },
    badge: {
      image: {
        url: "/badges/calendar.svg",
        alt: "",
      },
    },
  },
  {
    id: 6,
    title: "Compra protegida I",
    description:
      "Crie uma senha para um site de compras(ex: Amazon, Mercado Livre, Magazine Luiza)",
    activationFunction: (_, completedAchievements) => {
      return completedAchievements.includes(6);
    },
    getProgress: (_, completedAchievements) => {
      return completedAchievements.includes(6) ? 1 : 0;
    },
    badge: {
      image: {
        url: "/badges/gift.svg",
        alt: "",
      },
    },
  },
  {
    id: 7,
    title: "Compra protegida II",
    description:
      "Crie uma senha para um site de compras(ex: Amazon, Mercado Livre, Magazine Luiza)",
    activationFunction: (_, completedAchievements) => {
      return completedAchievements.includes(7);
    },
    getProgress: (_, completedAchievements) => {
      return completedAchievements.includes(7) ? 1 : 0;
    },
    badge: {
      image: {
        url: "/badges/100 euro.svg",
        alt: "",
      },
    },
  },
  {
    id: 8,
    title: "Cineminha I",
    description:
      "Crie uma senha para um serviço de streaming(ex: Netflix, Spotify)",
    activationFunction: (_, completedAchievements) => {
      return completedAchievements.includes(8);
    },
    getProgress: (_, completedAchievements) => {
      return completedAchievements.includes(8) ? 1 : 0;
    },
    badge: {
      image: {
        url: "/badges/image.svg",
        alt: "",
      },
    },
  },
  {
    id: 9,
    title: "Cineminha II",
    description:
      "Crie uma senha para um serviço de streaming(ex: Netflix, Spotify)",
    activationFunction: (_, completedAchievements) => {
      return completedAchievements.includes(9);
    },
    getProgress: (_, completedAchievements) => {
      return completedAchievements.includes(9) ? 1 : 0;
    },
    badge: {
      image: {
        url: "/badges/protection house.svg",
        alt: "",
      },
    },
  },
  {
    id: 10,
    title: "Criando hábitos seguros",
    description: "Use a plataforma por 3 dias consecutivos",
    activationFunction: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") >= 3;
    },
    getProgress: (history: HistoryItem[]) => {
      return getTotalConsecutiveDiff(history, "day") / 3;
    },
    badge: {
      image: {
        url: "/badges/medal.svg",
        alt: "",
      },
    },
  },
];
