"use client";
import React, { useState } from "react";
import { Button, Input, Navbar } from "@nextui-org/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

import { generatePassword } from "../../utils/passwd";
import { commonPortugueseWords, keyboardPatterns } from "../../utils/patterns";
import { enqueueSnackbar } from "notistack";

type NewPasswordFormProps = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Input = {
  value: string;
  error?: string;
};

const NewPasswordForm = ({
  active = true,
  setActive,
}: NewPasswordFormProps) => {
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

  function nextStep() {
    setStep((s) => s + 1);
  }

  function clearErrors() {
    setWords((words) => words.map((w) => ({ ...w, error: undefined })));
    setNumbers((numbers) => numbers.map((w) => ({ ...w, error: undefined })));
  }

  function validateWords() {
    let hasErrors = false;

    words.forEach((word, index) => {
      if (word.value.length < 3 && word.value !== "") {
        hasErrors = true;
        setWords((words) => {
          const temp = words;
          temp[
            index
          ].error = `A palavra “${word.value}” é menor que três caracteres.`;
          return [...temp];
        });
      }

      if (word.value === "") {
        hasErrors = true;
        setWords((words) => {
          const temp = words;
          temp[index].error = `Este campo é obrigatório.`;
          return [...temp];
        });
      }
    });

    words.forEach((word, index) => {
      if (commonPortugueseWords.includes(word.value)) {
        hasErrors = true;
        setWords((words) => {
          const temp = words;
          temp[index].error = `${word.value} é uma palavra muito comum`;
          return [...temp];
        });
      }
      if (keyboardPatterns.includes(word.value)) {
        hasErrors = true;
        setWords((words) => {
          const temp = words;
          temp[index].error = "Não utilize padrões de teclado";
          return [...temp];
        });
      }
    });

    const wordsSet = new Set(words.map((w) => w.value));
    if (!hasErrors && words.length !== wordsSet.size) {
      hasErrors = true;
      enqueueSnackbar("Existem palavras repetidas.", { variant: "error" });
    }

    if (!hasErrors) nextStep();
  }

  function validateNumbers() {
    let hasErrors = false;

    numbers.forEach((number, index) => {
      if (number.value === "") {
        hasErrors = true;
        setNumbers((numbers) => {
          const temp = numbers;
          temp[index].error = `Este campo é obrigatório.`;
          return [...temp];
        });
      }
    });

    const numbersSet = new Set(numbers.map((w) => w.value));
    if (!hasErrors && numbers.length !== numbersSet.size) {
      hasErrors = true;
      enqueueSnackbar("Existem números repetidos.", { variant: "error" });
    }

    if (!hasErrors) {
      console.log(
        generatePassword(
          words.map((w) => w.value),
          numbers.map((n) => Number(n.value))
        )
      );
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (step === 1) {
      clearErrors();
      validateWords();
    } else {
      clearErrors();
      validateNumbers();
    }
  }

  function onWordInputChange(value: string, wordIndex: number) {
    setWords((w) => {
      const temp = w;
      temp[wordIndex].value = value;
      return [...temp];
    });
  }

  function onNumberInputChange(value: string, wordIndex: number) {
    setNumbers((w) => {
      const temp = w;
      temp[wordIndex].value = value;
      return [...temp];
    });
  }

  function addWord() {
    setWords((w) => {
      return [...w, { value: "", error: undefined }];
    });
  }

  function removeWord(index: number) {
    setWords((w) => {
      const temp = w;
      temp.splice(index, 1);
      return [...temp];
    });
  }

  function addNumber() {
    setNumbers((w) => {
      return [...w, { value: "", error: undefined }];
    });
  }

  function removeNumber(index: number) {
    setNumbers((n) => {
      const temp = n;
      temp.splice(index, 1);
      return [...temp];
    });
  }

  if (!active) return null;

  return (
    <div className="flex flex-col justify-end absolute top-0 bottom-0 left-0 right-0 bg-[#00000015]">
      <div
        style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
        className="flex flex-col bg-white z-10 h-[90vh] radius rounded-t-3xl relative overflow-auto"
      >
        <Navbar className="flex justify-between">
          {step > 1 ? (
            <Button
              isIconOnly
              variant="light"
              onClick={() => setStep((s) => s - 1)}
            >
              <ArrowLeftIcon color="#A1A1AA" height={24} />
            </Button>
          ) : (
            <span />
          )}
          <span>
            <Button isIconOnly variant="light">
              <QuestionMarkCircleIcon color="#A1A1AA" height={24} />
            </Button>
            <Button isIconOnly variant="light">
              <XMarkIcon
                color="#A1A1AA"
                onClick={() => setActive(false)}
                height={24}
              />
            </Button>
          </span>
        </Navbar>

        <form className="flex flex-col px-6 gap-2" onSubmit={onSubmit}>
          {step === 1 ? (
            <>
              <h1 className="text-[24px] font-semibold">
                Vamos criar uma nova senha!
              </h1>
              <p className="mb-2">
                Para começar, vamos precisar de quatro palavras(ou mais). Quanto
                mais sem sentido, melhor! Você pode tentar criar uma história
                bizarra com as palavras, como: “corajoso, buriti, do mato, fez
                vestibular”.
              </p>

              {words.map(({ value, error }, index) => (
                <span key={index} className="flex gap-2">
                  <Input
                    type="text"
                    label={`Palavra ${index + 1}`}
                    size="sm"
                    required
                    value={value}
                    onChange={(e) => onWordInputChange(e.target.value, index)}
                    isInvalid={!!error}
                    errorMessage={error}
                  />
                  {index >= 4 ? (
                    <Button
                      variant="bordered"
                      isIconOnly
                      size="lg"
                      onClick={() => removeWord(index)}
                    >
                      <TrashIcon color="#EF5350" height={24} />
                    </Button>
                  ) : null}
                </span>
              ))}

              <Button
                variant="light"
                className="w-fit"
                color="primary"
                onClick={addWord}
              >
                Adicionar palavra
              </Button>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h1 className="text-[24px] font-semibold">Ultima etapa</h1>
              <p className="mb-2">
                Agora vamos precisar de dois números significativos para você.
                Não vale usar datas de nascimento, idade ou qualquer informação
                muito óbvia sobre você.
              </p>

              {numbers.map(({ value, error }, index) => (
                <span key={index} className="flex gap-2">
                  <Input
                    key={index}
                    label={`Número ${index + 1}`}
                    size="sm"
                    required
                    value={value}
                    onChange={(e) => onNumberInputChange(e.target.value, index)}
                    isInvalid={!!error}
                    errorMessage={error}
                  />
                  {index >= 2 ? (
                    <Button
                      variant="bordered"
                      isIconOnly
                      size="lg"
                      onClick={() => removeNumber(index)}
                    >
                      <TrashIcon color="#EF5350" height={24} />
                    </Button>
                  ) : null}
                </span>
              ))}
              <Button
                variant="light"
                className="w-fit"
                color="primary"
                onClick={addNumber}
              >
                Adicionar número
              </Button>
            </>
          ) : null}

          <Button
            type="submit"
            isIconOnly
            variant="shadow"
            color="primary"
            size="lg"
            className="sticky mt-6 ml-auto bottom-4 z-10"
          >
            <ArrowRightIcon height={24} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordForm;
