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

    if (step === 5) {
      console.log("remove event");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [step]);

  return { step, setStep };
};
