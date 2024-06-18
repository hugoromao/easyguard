"use client";

import React, { useEffect, useState } from "react";
import generator from "generate-password";
import { Button, Input, useDisclosure } from "@nextui-org/react";

import NewPasswordForm, { Input as InputType } from "../NewPasswordForm";
import { generatePassword } from "@/utils/passwd";
import { passwordConfig } from "../PasswordMemoryTest";
import { useForm } from "react-hook-form";

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

type TypingTestProps = {
  onFinishTest: () => void;
};

const TypingTest = ({ onFinishTest }: TypingTestProps) => {
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
    await fetch("/api/tt", {
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
    try {
    } catch (err) {
      console.error(err);
    }
  }

  const steps = [
    <>
      <p>Primeira senha: {egPassword}</p>

      <Button onPress={onOpen}>Criar primeira senha</Button>
    </>,
    <>
      <h1>Senha escolhida: {egPassword}</h1>
      <Input {...register("egTypedPassword1")} />
      <Input {...register("egTypedPassword2")} />
      <Input {...register("egTypedPassword3")} />
      <Input {...register("egTypedPassword4")} />
      <Input {...register("egTypedPassword5")} />
      <Button onClick={() => setStep((s) => s + 1)}>Próximo</Button>
    </>,
    <></>,
    <>
      <h1>Senha escolhida: {btPassword}</h1>
      <Input {...register("btTypedPassword1")} />
      <Input {...register("btTypedPassword2")} />
      <Input {...register("btTypedPassword3")} />
      <Input {...register("btTypedPassword4")} />
      <Input {...register("btTypedPassword5")} />
      <Button type="submit">Finalizar</Button>
    </>,
  ];

  useEffect(() => {
    if (step === 2) setStep((s) => s + 1);
  }, [step]);

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

export default TypingTest;
