"use client";
import { createContext, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import Confetti from "react-confetti";

export type HistoryItem = {
  type: "password";
  createdAt: Date;
};

export type GlobalContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  goParty(): void;
};

export type Achievement = {
  title: string;
  description: string;
  // eslint-disable-next-line no-unused-vars
  minScore: number;
  completed: boolean;
};

export const GlobalContextDefaultValues: GlobalContextType = {
  isOpen: false,
  onOpen: () => ({}),
  onClose: () => ({}),
  onOpenChange: () => ({}),
  goParty: () => ({}),
};

export const GlobalContext = createContext<GlobalContextType>(
  GlobalContextDefaultValues
);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [party, setParty] = useState(false);

  function goParty() {
    setParty(true);
  }

  return (
    <>
      <GlobalContext.Provider
        value={{
          isOpen,
          onOpen,
          onClose,
          onOpenChange,
          goParty,
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
