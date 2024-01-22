"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Navbar } from "@nextui-org/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

type NewPasswordFormProps = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

type Inputs = {
  word1: string;
  word2: string;
  word3: string;
  word4: string;
  number1: number;
  number2: number;
};

const NewPasswordForm = ({
  active = true,
  setActive,
}: NewPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { push } = useRouter();

  const [step, setStep] = useState(1);

  function nextStep() {
    setStep((s) => s + 1);
  }

  function onSubmit(data: Inputs) {
    if (step === 1) {
      nextStep();
    } else {
      const words = [data.word1, data.word2, data.word3, data.word4];
      const numbers = [data.number1, data.number2];
      const params = new URLSearchParams();
      params.append("data", JSON.stringify({ words, numbers }));
      push(`/generatePassword&${params.toString()}`);
    }
  }

  if (!active) return null;

  return (
    <div className="flex flex-col justify-end absolute top-0 bottom-0 left-0 right-0 bg-[#00000015]">
      <div
        style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
        className="flex flex-col bg-white z-10 h-[90vh] radius rounded-t-3xl relative overflow-auto"
      >
        <Navbar className="flex justify-between">
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
        </Navbar>

        <form
          className="flex flex-col px-6 gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
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

              <Input
                label={`Palavra 1`}
                size="sm"
                required
                isInvalid={!!errors.word1?.message}
                errorMessage={errors.word1?.message}
                {...register("word1", { required: "Este campo é obrigatório" })}
              />
              <Input
                label={`Palavra 2`}
                size="sm"
                required
                isInvalid={!!errors.word2?.message}
                errorMessage={errors.word2?.message}
                {...register("word2", { required: "Este campo é obrigatório" })}
              />
              <Input
                label={`Palavra 3`}
                size="sm"
                required
                isInvalid={!!errors.word3?.message}
                errorMessage={errors.word3?.message}
                {...register("word3", { required: "Este campo é obrigatório" })}
              />
              <Input
                label={`Palavra 4`}
                size="sm"
                required
                isInvalid={!!errors.word4?.message}
                errorMessage={errors.word4?.message}
                {...register("word4", { required: "Este campo é obrigatório" })}
              />
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
              <Input
                label={`Número 1`}
                size="sm"
                required
                isInvalid={!!errors.number1?.message}
                errorMessage={errors.number1?.message}
                {...register("number1", {
                  required: "Este campo é obrigatório",
                })}
              />

              <Input
                label={`Número 2`}
                size="sm"
                required
                isInvalid={!!errors.number2?.message}
                errorMessage={errors.number2?.message}
                {...register("number2", {
                  required: "Este campo é obrigatório",
                })}
              />
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
