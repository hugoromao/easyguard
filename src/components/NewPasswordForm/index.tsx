"use client";
import React, { useState } from "react";
import { Button, Input, Navbar } from "@nextui-org/react";
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

type NewPasswordFormProps = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Step1 = () => {
  return (
    <div className="flex flex-col px-6 gap-2">
      <h1 className="text-[24px] font-semibold">Vamos criar uma nova senha!</h1>
      <p className="mb-2">
        Para começar, vamos precisar de quatro palavras(ou mais). Quanto mais
        sem sentido, melhor! Você pode tentar criar uma história bizarra com as
        palavras, como: “corajoso, buriti, do mato, fez vestibular”.
      </p>
      <Input label="Palavra 1" size="sm" required />
      <Input label="Palavra 2" size="sm" required />
      <Input label="Palavra 3" size="sm" required />
      <Input label="Palavra 4" size="sm" required />

      <Button
        isIconOnly
        variant="shadow"
        color="primary"
        size="lg"
        className="sticky mt-6 ml-auto bottom-4 z-10"
      >
        <ArrowRightIcon height={24} />
      </Button>
    </div>
  );
};

const Step2 = () => {
  return (
    <div className="flex flex-col px-6 gap-2">
      <h1 className="text-[24px] font-semibold">Ultima etapa</h1>
      <p className="mb-2">
        Agora vamos precisar de dois números significativos para você. Não vale
        usar datas de nascimento, idade ou qualquer informação muito óbvia sobre
        você.
      </p>
      <Input label="Número 1" size="sm" required />
      <Input label="Número 2" size="sm" required />

      <Button
        isIconOnly
        variant="shadow"
        color="primary"
        size="lg"
        className="sticky mt-6 ml-auto bottom-4 z-10"
      >
        <ArrowRightIcon height={24} />
      </Button>
    </div>
  );
};

const NewPasswordForm = ({
  active = true,
  setActive,
}: NewPasswordFormProps) => {
  const [step, setStep] = useState(1);

  function nextStep() {
    setStep((s) => s + 1);
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

        {step === 1 ? <Step1 /> : null}
        {step === 2 ? <Step2 /> : null}
      </div>
    </div>
  );
};

export default NewPasswordForm;
