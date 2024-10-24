"use client";
import React from "react";
import {
  Button,
  Input,
  Modal,
  Spinner,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from "@nextui-org/react";

import { ArrowRightIcon, TrashIcon } from "@heroicons/react/20/solid";

import { useNewPasswordFormViewModel } from "./viewmodel";

type NewPasswordFormProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  // eslint-disable-next-line no-unused-vars
  onFinish: (words: Input[], numbers: Input[]) => void;
};

export type Input = {
  value: string;
  error?: string;
};

const NewPasswordForm = ({
  isOpen,
  onOpenChange,
  onFinish,
}: NewPasswordFormProps) => {
  const {
    step,
    setStep,
    onSubmit,
    words,
    onWordInputChange,
    removeWord,
    numbers,
    onNumberInputChange,
    removeNumber,
    addNumber,
    addWord,
    loading,
  } = useNewPasswordFormViewModel(onFinish);

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

        <ModalBody className="pb-0">
          <form onSubmit={onSubmit} autoComplete="off">
            {step === 1 ? (
              <>
                <div className="flex flex-col gap-2">
                  <p className="mb-2">
                    Para começar, vamos precisar de quatro palavras(ou mais).
                    Quanto mais sem sentido, melhor! Você pode tentar criar uma
                    história bizarra com as palavras, como: “corajoso, buriti,
                    do mato, fez vestibular”.
                  </p>
                  {words.map(({ value, error }, index) => (
                    <span key={index} className="flex gap-2">
                      <Input
                        name={`Palavra ${index + 1}`}
                        type="text"
                        label={`Palavra ${index + 1}`}
                        size="sm"
                        value={value}
                        onChange={(e) =>
                          onWordInputChange(e.target.value, index)
                        }
                        isInvalid={!!error}
                        errorMessage={error}
                      />
                      {index >= 4 ? (
                        <Button
                          variant="bordered"
                          isIconOnly
                          size="lg"
                          name={`Remover Palavra ${index + 1}`}
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
              <div className="flex flex-col gap-2">
                <p className="mb-2">
                  Agora vamos precisar de dois números significativos para você.
                  Não vale usar datas de nascimento, idade ou qualquer
                  informação muito óbvia sobre você.
                </p>
                {numbers.map(({ value, error }, index) => (
                  <span key={index} className="flex gap-2">
                    <Input
                      key={index}
                      type="number"
                      name={`Número ${index + 1}`}
                      label={`Número ${index + 1}`}
                      size="sm"
                      pattern="[0-9]*"
                      value={value}
                      onChange={(e) =>
                        onNumberInputChange(e.target.value, index)
                      }
                      isInvalid={!!error}
                      errorMessage={error}
                      autoFocus={index === 0}
                    />
                    {index >= 2 ? (
                      <Button
                        variant="bordered"
                        isIconOnly
                        size="lg"
                        onClick={() => removeNumber(index)}
                        name={`Remover Número ${index + 1}`}
                        aria-label="remove"
                      >
                        <TrashIcon color="#EF5350" height={24} />
                      </Button>
                    ) : null}
                  </span>
                ))}
              </div>
            ) : null}

            <ModalFooter className="flex items-center sticky bottom-0 px-0 bg-white z-10 mt-4">
              {step === 1 ? (
                <Button
                  variant="light"
                  className="w-fit text-emerald-600"
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
                type="submit"
                isIconOnly
                size="lg"
                aria-label="next"
                className="bg-emerald-500"
              >
                {loading ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  <ArrowRightIcon height={24} className="fill-white" />
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewPasswordForm;
