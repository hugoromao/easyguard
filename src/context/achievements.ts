import { HistoryItem } from "./global";

function getTotalPasswordsCreated(history: HistoryItem[]) {
  return history.reduce(
    (acc, cur) => (cur.type === "password" ? acc + 1 : acc),
    0
  );
}

export const achievements = [
  {
    id: 1,
    title: "Vamos Começar!",
    description: "Crie sua primeira senha.",
    activationFunction: (history: HistoryItem[]): boolean => {
      return getTotalPasswordsCreated(history) > 0;
    },
  },
  {
    id: 2,
    title: "Um pouquinho de cada vez.",
    description: "Crie 10 senhas.",
    activationFunction: (history: HistoryItem[]): boolean => {
      return getTotalPasswordsCreated(history) >= 10;
    },
  },
];
