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
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    <>
      <h1 className="font-bold text-2xl">Teste combinado</h1>
      <p>
        Esse é o último teste. Ele envolve tanto os aspectos de memorização
        quanto de digitação. Vamos precisar que você crie uma última senha
        utilizando nossa ferramenta, basta utilizar o seguinte botão.
      </p>

      <Button onPress={onOpen}>Criar senha</Button>
    </>,
    <Countdown
      key="countdown"
      passwords={[egPassword!]}
      onCountdownEnds={() => setStep((s) => s + 1)}
      text="Agora você terá três minutos para memorizar as senhas. Após esse período, um vídeo de distração será iniciado automaticamente. Quando o vídeo terminar, você deverá digitar o máximo possível que conseguiu memorizar das senhas. Clique em INICIAR quando estiver pronto."
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
      <p>
        Nessa tela você vai digitar a senha o mais rápido possível cinco vezes,
        sem poder apagar qualquer caracter que tenha digitado errado. Utilize os
        cinco campos abaixo para digitar a senha.
      </p>
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
      <p>
        Agora você vai fazer o mesmo para a senha gerada pelo computador. Digite
        a senha o mais rápido possível cinco vezes, sem poder apagar qualquer
        caracter que tenha digitado errado. Utilize os cinco campos abaixo para
        digitar a senha.
      </p>
      <Input
        placeholder="Linha 1"
        {...register("btTypedPassword1", { required: true })}
      />
      <Input
        placeholder="Linha 2"
        {...register("btTypedPassword2", { required: true })}
      />
      <Input
        placeholder="Linha 3"
        {...register("btTypedPassword3", { required: true })}
      />
      <Input
        placeholder="Linha 4"
        {...register("btTypedPassword4", { required: true })}
      />
      <Input
        placeholder="Linha 5"
        {...register("btTypedPassword5", { required: true })}
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onFinish={onCompletedNewPasswordForm}
      />
    </main>
  );
};

export default CombinatedTest;
