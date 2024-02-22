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
} from "@nextui-org/react";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/20/solid";

import { enqueueSnackbar } from "notistack";
import { validateUserNumbers, validateUserWords } from "@/utils/passwd";

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
      if (word.value === "") {
        hasErrors = true;
        setWords((w) => {
          const temp = w;
          temp[index].error = `Este campo é obrigatório.`;
          return [...temp];
        });
      }
    });
    if (words.findIndex((w) => w.value === "") !== -1) return;

    const errors = validateUserWords(words.map((w) => w.value));
    errors.forEach((err) => {
      hasErrors = true;
      const hasIndex = err.index !== undefined;

      if (hasIndex) {
        setWords((words) => {
          const temp = words;
          temp[err.index!].error = err.message;
          return [...temp];
        });
      } else {
        enqueueSnackbar(err.message, { variant: "error" });
      }
    });

    if (!hasErrors) nextStep();
  }

  function validateNumbers() {
    let hasErrors = false;

    numbers.forEach((number, index) => {
      if (number.value === "") {
        hasErrors = true;
        setNumbers((w) => {
          const temp = w;
          temp[index].error = `Este campo é obrigatório.`;
          return [...temp];
        });
      }

      if (isNaN(Number(number.value))) {
        hasErrors = true;
        setNumbers((w) => {
          const temp = w;
          temp[index].error = `Número inválido.`;
          return [...temp];
        });
      }
    });

    if (numbers.findIndex((n) => n.value === "") !== -1) return;
    if (numbers.findIndex((n) => isNaN(Number(n.value))) !== -1) return;

    const errors = validateUserNumbers(numbers.map((n) => Number(n.value)));
    errors.forEach((err) => {
      hasErrors = true;
      const hasIndex = err.index !== undefined;

      if (hasIndex) {
        setNumbers((numbers) => {
          const temp = numbers;
          temp[err.index!].error = err.message;
          return [...temp];
        });
      } else {
        enqueueSnackbar(err.message, { variant: "error" });
      }
    });

    if (!hasErrors) {
      // TODO: Hash queryparams with bcrypt
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
          {step === 2 ? "Última etapa" : null}
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
                    type="number"
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
