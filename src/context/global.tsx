"use client";
import { Dispatch, SetStateAction, createContext, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useDisclosure } from "@nextui-org/react";
import { useLocalStorage } from "@uidotdev/usehooks";

import { achievements } from "./achievements";

export type HistoryItem = {
  type: "password";
  createdAt: Date;
};

export type GlobalContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  history: HistoryItem[];
  setHistory: Dispatch<SetStateAction<HistoryItem[]>>;
};

export type Achievement = {
  title: string;
  description: string;
  // eslint-disable-next-line no-unused-vars
  minScore: number;
  completed: boolean;
};

const defaultValues: GlobalContextType = {
  isOpen: false,
  onOpen: () => ({}),
  onClose: () => ({}),
  onOpenChange: () => ({}),
  history: [],
  setHistory: () => ({}),
};

export const GlobalContext = createContext<GlobalContextType>(defaultValues);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>("history", []);
  const [completedAchievements, setCompletedAchievements] = useLocalStorage<
    number[]
  >("completedAchievements", []);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  function onLocalStorageChange(history: HistoryItem[]) {
    achievements.forEach(({ id, title, activationFunction }) => {
      if (activationFunction(history) && !completedAchievements.includes(id)) {
        enqueueSnackbar(title, { variant: "success" });
        setCompletedAchievements((c) => [...c, id]);
      }
    });
  }

  useEffect(() => {
    onLocalStorageChange(history);
  }, [history]);

  return (
    <GlobalContext.Provider
      value={{ isOpen, onOpen, onClose, onOpenChange, history, setHistory }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
