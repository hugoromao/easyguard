"use client";
import { Dispatch, SetStateAction, createContext, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useLocalStorage } from "@uidotdev/usehooks";

import { achievements } from "../utils/achievements";

export type HistoryItem = {
  type: "password";
  createdAt: Date;
};

export type AchivementsContextType = {
  history: HistoryItem[];
  setHistory: Dispatch<SetStateAction<HistoryItem[]>>;
  completedAchievements: number[];
  setCompletedAchievements: Dispatch<SetStateAction<number[]>>;
  // eslint-disable-next-line no-unused-vars
  sendCongratsSnack: (achivementId: number) => void;
};

export type Achievement = {
  title: string;
  description: string;
  // eslint-disable-next-line no-unused-vars
  minScore: number;
  completed: boolean;
};

export const AchivementsContextDefaultValues: AchivementsContextType = {
  history: [],
  setHistory: () => ({}),
  completedAchievements: [],
  setCompletedAchievements: () => ({}),
  sendCongratsSnack: () => ({}),
};

export const AchivementsContext = createContext<AchivementsContextType>(
  AchivementsContextDefaultValues
);

export const AchivementsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>("history", []);
  const [completedAchievements, setCompletedAchievements] = useLocalStorage<
    number[]
  >("completedAchievements", []);

  function onLocalStorageChange(history: HistoryItem[]) {
    achievements.forEach(({ id, activationFunction }) => {
      if (
        activationFunction(history, completedAchievements) &&
        !completedAchievements.includes(id)
      ) {
        sendCongratsSnack(id);
        setCompletedAchievements((c) => [...c, id]);
      }
    });
  }

  function sendCongratsSnack(achivementId: number) {
    const achv = achievements.find((a) => a.id === achivementId);
    if (achv) {
      enqueueSnackbar(`${achv.title}:${achv.description}`, { variant: "info" });
    }
  }

  useEffect(() => {
    onLocalStorageChange(history);
  }, [history]);

  return (
    <>
      <AchivementsContext.Provider
        value={{
          history,
          setHistory,
          completedAchievements,
          setCompletedAchievements,
          sendCongratsSnack,
        }}
      >
        {children}
      </AchivementsContext.Provider>
    </>
  );
};
