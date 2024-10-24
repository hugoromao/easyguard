import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import { validateUserNumbers, validateUserWords } from "../../utils/passwd";

import { Input } from "./model";

export const useNewPasswordFormViewModel = (
  // eslint-disable-next-line no-unused-vars
  onFinish: (words: Input[], numbers: Input[]) => void
) => {
  const [step, setStep] = useState(1);
  const [words, setWords] = useState<Input[]>([
    { value: "", error: undefined },
    { value: "", error: undefined },
    { value: "", error: undefined },
    { value: "", error: undefined },
  ]);
  const [numbers, setNumbers] = useState<Input[]>([
    { value: "", error: undefined },
    { value: "", error: undefined },
  ]);
  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const clearErrors = () => {
    setWords((words) => words.map((w) => ({ ...w, error: undefined })));
    setNumbers((numbers) => numbers.map((w) => ({ ...w, error: undefined })));
  };

  const validateWords = () => {
    let hasErrors = false;
    words.forEach((word, index) => {
      if (word.value === "") {
        hasErrors = true;
        setWords((w) => {
          const temp = w;
          temp[index].error = "Este campo é obrigatório.";
          return [...temp];
        });
      }
    });

    if (words.findIndex((w) => w.value === "") !== -1) return;

    const errors = validateUserWords(words.map((w) => w.value));
    errors.forEach((err) => {
      hasErrors = true;
      if (err.index !== undefined) {
        setWords((w) => {
          const temp = w;
          temp[err.index!].error = err.message;
          return [...temp];
        });
      } else {
        enqueueSnackbar(err.message, { variant: "error" });
      }
    });

    if (!hasErrors) nextStep();
  };

  const validateNumbers = () => {
    let hasErrors = false;
    numbers.forEach((number, index) => {
      if (number.value === "") {
        hasErrors = true;
        setNumbers((w) => {
          const temp = w;
          temp[index].error = "Este campo é obrigatório.";
          return [...temp];
        });
      }

      if (isNaN(Number(number.value))) {
        hasErrors = true;
        setNumbers((w) => {
          const temp = w;
          temp[index].error = "Número inválido.";
          return [...temp];
        });
      }
    });

    if (
      numbers.findIndex((n) => n.value === "") !== -1 ||
      numbers.findIndex((n) => isNaN(Number(n.value))) !== -1
    )
      return;

    const errors = validateUserNumbers(numbers.map((n) => Number(n.value)));
    errors.forEach((err) => {
      hasErrors = true;
      if (err.index !== undefined) {
        setNumbers((w) => {
          const temp = w;
          temp[err.index!].error = err.message;
          return [...temp];
        });
      } else {
        enqueueSnackbar(err.message, { variant: "error" });
      }
    });

    if (!hasErrors) {
      setLoading(true);
      onFinish(words, numbers);
    }
  };

  const onSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    clearErrors();
    if (step === 1) {
      validateWords();
    } else {
      validateNumbers();
    }
  };

  const onWordInputChange = (value: string, index: number) => {
    setWords((w) => {
      const temp = w;
      temp[index].value = value;
      return [...temp];
    });
  };

  const onNumberInputChange = (value: string, index: number) => {
    setNumbers((n) => {
      const temp = n;
      temp[index].value = value;
      return [...temp];
    });
  };

  const addWord = () =>
    setWords((w) => [...w, { value: "", error: undefined }]);
  const removeWord = (index: number) =>
    setWords((w) => {
      const temp = w;
      temp.splice(index, 1);
      return [...temp];
    });

  const addNumber = () =>
    setNumbers((n) => [...n, { value: "", error: undefined }]);
  const removeNumber = (index: number) =>
    setNumbers((n) => {
      const temp = n;
      temp.splice(index, 1);
      return [...temp];
    });

  return {
    step,
    setStep,
    words,
    numbers,
    loading,
    nextStep,
    prevStep,
    onSubmit,
    onWordInputChange,
    onNumberInputChange,
    addWord,
    removeWord,
    addNumber,
    removeNumber,
  };
};
