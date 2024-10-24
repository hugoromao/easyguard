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
  isPasswordTypeOpen: boolean;
  onPasswordTypeOpen: () => void;
  onPasswordTypeClose: () => void;
  onOpenPasswordTypeChange: () => void;
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
  isPasswordTypeOpen: false,
  onPasswordTypeOpen: () => ({}),
  onPasswordTypeClose: () => ({}),
  onOpenPasswordTypeChange: () => ({}),
};

export const GlobalContext = createContext<GlobalContextType>(
  GlobalContextDefaultValues
);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: isPasswordTypeOpen,
    onOpen: onPasswordTypeOpen,
    onClose: onPasswordTypeClose,
    onOpenChange: onOpenPasswordTypeChange,
  } = useDisclosure();

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
          isPasswordTypeOpen,
          onPasswordTypeOpen,
          onPasswordTypeClose,
          onOpenPasswordTypeChange,
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
