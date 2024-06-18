import React, { useState } from "react";

import generator from "generate-password";

import NewPasswordForm, { Input as InputType } from "../NewPasswordForm";

import { passwordConfig } from "../PasswordMemoryTest";
import { useForm } from "react-hook-form";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { generatePassword } from "@/utils/passwd";
import Countdown from "../Countdown";

type CombinatedTestProps = {
  onFinishTest: () => void;
};

type Inputs = {
  egTypedPassword1: string;
  egTypedPassword2: string;
  egTypedPassword3: string;
  egTypedPassword4: string;
  egTypedPassword5: string;
  btTypedPassword1: string;
  btTypedPassword2: string;
  btTypedPassword3: string;
  btTypedPassword4: string;
  btTypedPassword5: string;
};

const CombinatedTest = ({ onFinishTest }: CombinatedTestProps) => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const btPassword = generator.generate(passwordConfig);

  const { register, handleSubmit } = useForm<Inputs>();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [step, setStep] = useState(0);
  const [egPassword, setEgPassword] = useState<string | undefined>();

  function onCompletedNewPasswordForm(
    words: InputType[],
    numbers: InputType[]
  ) {
    const password = generatePassword(
      words.map((w) => w.value),
      numbers.map((n) => Number(n.value))
    );

    if (password.password) setEgPassword(password.password);

    setStep((s) => s + 1);
    onClose();
  }

  async function onSubmit(data: Inputs) {
    try {
      await fetch("/api/ct", {
        method: "POST",
        body: JSON.stringify({
          egPassword,
          btPassword,
          ...data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      onFinishTest();
    } catch (err) {
      console.error(err);
    }
  }

  const steps = [
    <>
      <Button onPress={onOpen}>Criar primeira senha</Button>
    </>,
    <Countdown
      key="countdown"
      passwords={[egPassword!]}
      onCountdownEnds={() => setStep((s) => s + 1)}
    />,
    <>
      <strong>Vídeo 3</strong>
      <video
        controls={isDevelopment}
        autoPlay
        onEnded={() => setStep((s) => s + 1)}
      >
        <source src="/videos/3.mp4" type="video/mp4" />
      </video>
    </>,
    <>
      <Input {...register("egTypedPassword1")} />
      <Input {...register("egTypedPassword2")} />
      <Input {...register("egTypedPassword3")} />
      <Input {...register("egTypedPassword4")} />
      <Input {...register("egTypedPassword5")} />
      <Button onClick={() => setStep((s) => s + 1)}>Próximo</Button>
    </>,
    <Countdown
      key="countdown"
      passwords={[btPassword]}
      onCountdownEnds={() => setStep((s) => s + 1)}
    />,
    <>
      <strong>Vídeo 4</strong>
      <video
        controls={isDevelopment}
        autoPlay
        onEnded={() => setStep((s) => s + 1)}
      >
        <source src="/videos/4.mp4" type="video/mp4" />
      </video>
    </>,
    <>
      <Input {...register("btTypedPassword1")} />
      <Input {...register("btTypedPassword2")} />
      <Input {...register("btTypedPassword3")} />
      <Input {...register("btTypedPassword4")} />
      <Input {...register("btTypedPassword5")} />
      <Button type="submit">Finalizar</Button>
    </>,
  ];

  return (
    <main className="flex flex-col gap-2">
      <form onSubmit={handleSubmit(onSubmit)}>{steps[step]}</form>

      <NewPasswordForm
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onFinish={onCompletedNewPasswordForm}
      />
    </main>
  );
};

export default CombinatedTest;
