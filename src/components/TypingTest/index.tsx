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

  const { register, handleSubmit, getValues } = useForm<Inputs>();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState(false);
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
    if (password.password) setEgPassword(password.password.slice(0, 16));
    setStep((s) => s + 1);
    onClose();
  }

  async function onSubmit(data: Inputs) {
    try {
      setLoading(true);
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    <>
      <h1 className="font-bold text-2xl">Teste de digitação</h1>

      <p>
        Neste teste, avaliamos o quanto as senhas geradas pelo EasyGuard são
        mais fáceis de serem digitadas em comparação com as senhas geradas por
        algoritmos convencionais.
      </p>

      <p>
        Vamos precisar que você crie uma senha utilizando nossa ferramenta,
        basta clicar no botão a seguir.
      </p>

      <Button onPress={onOpen}>Criar senha</Button>
    </>,
    <>
      <p>
        Nessa tela você vai digitar a senha o mais rápido possível cinco vezes,
        sem poder apagar qualquer caracter que tenha digitado errado. Utilize os
        cinco campos abaixo para digitar a senha.
      </p>
      <em>
        Senha escolhida: <strong>{egPassword}</strong>
      </em>
      <Input placeholder="Linha 1" {...register("egTypedPassword1")} />
      <Input placeholder="Linha 2" {...register("egTypedPassword2")} />
      <Input placeholder="Linha 3" {...register("egTypedPassword3")} />
      <Input placeholder="Linha 4" {...register("egTypedPassword4")} />
      <Input placeholder="Linha 5" {...register("egTypedPassword5")} />
      <Button
        onClick={() => {
          if (
            getValues("egTypedPassword1") &&
            getValues("egTypedPassword2") &&
            getValues("egTypedPassword3") &&
            getValues("egTypedPassword4") &&
            getValues("egTypedPassword5")
          ) {
            setStep((s) => s + 1);
          }
        }}
      >
        Próximo
      </Button>
    </>,
    <></>,
    <>
      <p>
        Agora você vai fazer o mesmo para a senha gerada pelo computador. Digite
        a senha o mais rápido possível cinco vezes, sem poder apagar qualquer
        caracter que tenha digitado errado. Utilize os cinco campos abaixo para
        digitar a senha.
      </p>
      {!loading ? (
        <em>
          Senha escolhida: <strong>{btPassword}</strong>
        </em>
      ) : null}
      <Input
        isRequired
        placeholder="Linha 1"
        {...register("btTypedPassword1", { required: true })}
      />
      <Input
        isRequired
        placeholder="Linha 2"
        {...register("btTypedPassword2", { required: true })}
      />
      <Input
        isRequired
        placeholder="Linha 3"
        {...register("btTypedPassword3", { required: true })}
      />
      <Input
        isRequired
        placeholder="Linha 4"
        {...register("btTypedPassword4", { required: true })}
      />
      <Input
        isRequired
        placeholder="Linha 5"
        {...register("btTypedPassword5", { required: true })}
      />
      <Button type="submit" isLoading={loading}>
        FINALIZAR
      </Button>
    </>,
  ];

  useEffect(() => {
    if (step === 2) setStep((s) => s + 1);
  }, [step]);

  return (
    <main className="flex flex-col gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {steps[step]}
      </form>

      <NewPasswordForm
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onFinish={onCompletedNewPasswordForm}
      />
    </main>
  );
};

export default TypingTest;
