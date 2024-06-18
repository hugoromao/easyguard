"use client";

import React, { useEffect, useState } from "react";

import generator from "generate-password";
import { useForm } from "react-hook-form";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { CheckIcon } from "@heroicons/react/24/outline";

import NewPasswordForm, { Input as InputType } from "../NewPasswordForm";

import Countdown from "../Countdown";

import { generatePassword } from "@/utils/passwd";

type PasswordMemoryTestProps = {
  onFinishTest: () => void;
};

type Inputs = {
  egTypedPassword1: string;
  egTypedPassword2: string;
  btTypedPassword1: string;
  btTypedPassword2: string;
};

export const passwordConfig = {
  length: 16,
  lowercase: true,
  numbers: true,
  symbols: true,
  uppercase: true,
};

const PasswordMemoryTest = ({ onFinishTest }: PasswordMemoryTestProps) => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const btPassword1 = generator.generate(passwordConfig);
  const btPassword2 = generator.generate(passwordConfig);

  const { register, handleSubmit, getValues } = useForm<Inputs>();

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();

  const [step, setStep] = useState(0);
  const [egPassword1, setEgPassword1] = useState<string | undefined>();
  const [egPassword2, setEgPassword2] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  function onFinish1(words: InputType[], numbers: InputType[]) {
    const password = generatePassword(
      words.map((w) => w.value),
      numbers.map((n) => Number(n.value))
    );
    if (password.password) setEgPassword1(password.password.slice(0, 16));
    onClose1();
  }

  function onFinish2(words: InputType[], numbers: InputType[]) {
    const password = generatePassword(
      words.map((w) => w.value),
      numbers.map((n) => Number(n.value))
    );
    if (password.password) setEgPassword2(password.password.slice(0, 16));
    onClose2();
  }

  async function onSubmit({
    egTypedPassword1,
    egTypedPassword2,
    btTypedPassword1,
    btTypedPassword2,
  }: Inputs) {
    try {
      setLoading(true);
      await fetch("/api/mt", {
        method: "POST",
        body: JSON.stringify({
          egPassword1,
          egPassword2,
          btPassword1,
          btPassword2,
          egTypedPassword1,
          egTypedPassword2,
          btTypedPassword1,
          btTypedPassword2,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      onFinishTest();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (egPassword1 && egPassword2) setStep((s) => s + 1);
  }, [egPassword1, egPassword2]);

  const steps = [
    <>
      <h1 className="font-bold text-2xl">Teste de memória</h1>
      <p>
        Neste teste, avaliamos o quanto as senhas geradas pelo EasyGuard são
        mais memoráveis em comparação com as geradas por algoritmos
        convencionais.
      </p>

      <p>
        Vamos precisar que você crie duas senhas utilizando nossa ferramenta,
        basta utilizar os seguintes botões.
      </p>

      <Button
        onPress={onOpen1}
        isDisabled={egPassword1 !== undefined}
        color={egPassword1 !== undefined ? "primary" : "default"}
        startContent={
          egPassword1 !== undefined ? <CheckIcon height={24} /> : undefined
        }
      >
        Criar primeira senha
      </Button>
      <Button
        onPress={onOpen2}
        isDisabled={egPassword2 !== undefined}
        color={egPassword2 !== undefined ? "primary" : "default"}
        startContent={
          egPassword2 !== undefined ? <CheckIcon height={24} /> : undefined
        }
      >
        Criar segunda senha
      </Button>
    </>,
    <Countdown
      key="countdown"
      passwords={[egPassword1!, egPassword2!]}
      onCountdownEnds={() => setStep((s) => s + 1)}
      text="Agora você terá três minutos para memorizar as senhas. Após esse período, um vídeo de distração será iniciado automaticamente. Quando o vídeo terminar, você deverá digitar o máximo possível que conseguiu memorizar das senhas. Clique em INICIAR quando estiver pronto."
    />,
    <>
      <strong>Vídeo 1</strong>
      <video
        controls={isDevelopment}
        autoPlay
        onEnded={() => setStep((s) => s + 1)}
      >
        <source src="/videos/1.mp4" type="video/mp4" />
      </video>
    </>,
    <>
      <p>
        Agora você deve digitar o máximo que conseguir lembrar das senhas. Não
        se preocupe se não conseguir lembrar tudo.
      </p>
      <Input
        isRequired
        placeholder="Digite a senha 1"
        {...register("egTypedPassword1")}
      />
      <Input
        isRequired
        placeholder="Digite a senha 2"
        {...register("egTypedPassword2")}
      />
      <Button
        onPress={() => {
          if (getValues("egTypedPassword1") && getValues("egTypedPassword2")) {
            setStep((s) => s + 1);
          }
        }}
      >
        Próximo
      </Button>
    </>,
    <Countdown
      key="countdown"
      passwords={[btPassword1, btPassword2]}
      onCountdownEnds={() => setStep((s) => s + 1)}
      text="Agora você terá três minutos para memorizar duas senhas geradas por um computador. Após esse período, um vídeo de distração será iniciado automaticamente. Quando o vídeo terminar, você deverá digitar o máximo possível que conseguiu memorizar das senhas. Clique em INICIAR quando estiver pronto."
    />,
    <>
      <strong>Vídeo 2</strong>
      <video
        controls={isDevelopment}
        autoPlay
        onEnded={() => setStep((s) => s + 1)}
      >
        <source src="/videos/2.mp4" type="video/mp4" />
      </video>
    </>,
    <>
      <p>
        Agora você deve digitar o máximo que conseguir lembrar das senhas. Mais
        uma vez, não se preocupe se não conseguir lembrar tudo.
      </p>
      <Input
        isRequired
        placeholder="Digite a senha 1"
        {...register("btTypedPassword1", { required: true })}
      />
      <Input
        isRequired
        placeholder="Digite a senha 2"
        {...register("btTypedPassword2", { required: true })}
      />
      <Button type="submit" isLoading={loading}>
        FINALIZAR
      </Button>
    </>,
  ];

  return (
    <main className="flex flex-col gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {steps[step]}
      </form>
      <NewPasswordForm
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        onFinish={onFinish1}
      />

      <NewPasswordForm
        isOpen={isOpen2}
        onOpenChange={onOpenChange2}
        onFinish={onFinish2}
      />
    </main>
  );
};

export default PasswordMemoryTest;
