import { createContext, useContext } from "react";
import { useDisclosure } from "@nextui-org/react";

export type GlobalContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
};

const defaultValues: GlobalContextType = {
  isOpen: false,
  onOpen: () => ({}),
  onClose: () => ({}),
  onOpenChange: () => ({}),
};

export const GlobalContext = createContext<GlobalContextType>(defaultValues);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <GlobalContext.Provider value={{ isOpen, onOpen, onClose, onOpenChange }}>
      {children}
    </GlobalContext.Provider>
  );
};
