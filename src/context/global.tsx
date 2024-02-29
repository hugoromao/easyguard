"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { enqueueSnackbar } from "notistack";
import { useDisclosure } from "@nextui-org/react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Confetti from "react-confetti";

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
  goParty(): void;
  completedAchievements: number[];
  setCompletedAchievements: Dispatch<SetStateAction<number[]>>;
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
  goParty: () => ({}),
  completedAchievements: [],
  setCompletedAchievements: () => ({}),
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

  const [party, setParty] = useState(false);

  function onLocalStorageChange(history: HistoryItem[]) {
    achievements.forEach(({ id, title, activationFunction }) => {
      if (
        activationFunction(history, completedAchievements) &&
        !completedAchievements.includes(id)
      ) {
        enqueueSnackbar(title, { variant: "info" });
        setCompletedAchievements((c) => [...c, id]);
      }
    });
  }

  function goParty() {
    setParty(true);
  }

  useEffect(() => {
    onLocalStorageChange(history);
  }, [history]);

  return (
    <>
      <GlobalContext.Provider
        value={{
          isOpen,
          onOpen,
          onClose,
          onOpenChange,
          history,
          setHistory,
          goParty,
          completedAchievements,
          setCompletedAchievements,
        }}
      >
        {children}
      </GlobalContext.Provider>

      <Confetti
        style={{ pointerEvents: "none" }}
        numberOfPieces={party ? 300 : 0}
        recycle={false}
        onConfettiComplete={(confetti) => {
          setParty(false);
          confetti?.reset();
        }}
      />
    </>
  );
};
