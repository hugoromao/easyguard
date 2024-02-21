"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  useDisclosure,
} from "@nextui-org/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

import { commonPortugueseWords, keyboardPatterns } from "../../utils/patterns";
import { enqueueSnackbar } from "notistack";

type NewPasswordFormProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  onSubmitPasswordForm(pathname: string): void;
};

export type Input = {
  value: string;
  error?: string;
};

const NewPasswordForm = ({
  isOpen,
  onOpenChange,
  onSubmitPasswordForm,
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
      onSubmitPasswordForm(
        `generatePassword?words=${JSON.stringify(
          words.map((w) => w.value)
        )}&numbers=${JSON.stringify(numbers.map((n) => n.value))}`
      );
    }
  }

  function onSubmit() {
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

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="text-[24px] font-semibold">
          {step === 1 ? "Vamos criar uma nova senha!" : null}
          {step === 2 ? "Ultima etapa" : null}
        </ModalHeader>

        <ModalBody>
          {step === 1 ? (
            <>
              <div className="flex flex-col gap-2">
                <p className="mb-2">
                  Para começar, vamos precisar de quatro palavras(ou mais).
                  Quanto mais sem sentido, melhor! Você pode tentar criar uma
                  história bizarra com as palavras, como: “corajoso, buriti, do
                  mato, fez vestibular”.
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
                        aria-label="remove"
                      >
                        <TrashIcon color="#EF5350" height={24} />
                      </Button>
                    ) : null}
                  </span>
                ))}
              </div>
            </>
          ) : null}
          {step === 2 ? (
            <>
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
                      aria-label="remove"
                    >
                      <TrashIcon color="#EF5350" height={24} />
                    </Button>
                  ) : null}
                </span>
              ))}
            </>
          ) : null}
        </ModalBody>

        <ModalFooter className="flex items-center">
          {step === 1 ? (
            <Button
              variant="light"
              className="w-fit"
              color="primary"
              onClick={addWord}
            >
              Adicionar palavra
            </Button>
          ) : null}

          {step === 2 ? (
            <>
              <Button
                variant="light"
                className="mr-auto text-[#A1A1AA]"
                onClick={() => setStep((s) => s - 1)}
                aria-label="goBack"
              >
                Voltar
              </Button>

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
            type="button"
            isIconOnly
            variant="shadow"
            color="primary"
            size="lg"
            aria-label="next"
            onClick={onSubmit}
          >
            <ArrowRightIcon height={24} />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewPasswordForm;
