import { useEffect, useState } from "react";

export const useEstudoViewModel = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      const message = "Your work will be lost.";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return { step, setStep };
};
