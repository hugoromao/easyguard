"use client";

import React from "react";

import { Button, Input } from "@nextui-org/react";
import { CheckIcon } from "@heroicons/react/24/outline";

import NewPasswordForm from "../NewPasswordForm";

import Countdown from "../Countdown";
import { usePasswordMemoryTestViewModel } from "./viewmodel";

type PasswordMemoryTestProps = {
  onFinishTest: () => void;
};

const PasswordMemoryTest = ({ onFinishTest }: PasswordMemoryTestProps) => {
  const {
    handleSubmit,
    isOpen1,
    isOpen2,
    loading,
    onFinish1,
    onFinish2,
    onOpen1,
    onOpen2,
    onOpenChange1,
    onOpenChange2,
    onSubmit,
    register,
    step,
    setStep,
    eg1Password1,
    eg1Password2,
    eg2Password1,
    eg2Password2,
    btPassword1,
    btPassword2,
    changeEg2Password1,
    changeEg2Password2,
  } = usePasswordMemoryTestViewModel({ onFinishTest });

  const steps = [
    <>
      <h1 className="font-bold text-2xl pt-4">Teste de memória</h1>
      <p>
        Vamos precisar que você crie quatro senhas utilizando nossa ferramenta,
        basta utilizar os seguintes botões.
      </p>

      <Button onPress={changeEg2Password1}>
        {eg2Password1 ? "Alterar" : "Criar"} primeira senha
      </Button>
      {eg2Password1 ? (
        <strong className="text-center mb-4 select-none break-all">
          {eg2Password1}
        </strong>
      ) : null}

      <Button onPress={changeEg2Password2}>
        {eg2Password2 ? "Alterar" : "Criar"} segunda senha
      </Button>
      {eg2Password2 ? (
        <strong className="text-center mb-4 break-all">{eg2Password2}</strong>
      ) : null}

      <Button
        onPress={onOpen1}
        isDisabled={eg1Password1 !== undefined}
        color={eg1Password1 !== undefined ? "primary" : "default"}
        startContent={
          eg1Password1 !== undefined ? <CheckIcon height={24} /> : undefined
        }
      >
        Criar terceira senha
      </Button>

      <Button
        onPress={onOpen2}
        isDisabled={eg1Password2 !== undefined}
        color={eg1Password2 !== undefined ? "primary" : "default"}
        startContent={
          eg1Password2 !== undefined ? <CheckIcon height={24} /> : undefined
        }
      >
        Criar quarta senha
      </Button>
    </>,
    <Countdown
      key="countdown"
      passwords={[eg1Password1!, eg1Password2!]}
      onCountdownEnds={() => setStep((s) => s + 1)}
    />,
    <>
      <strong className="mt-4">Vídeo 1</strong>
      <iframe
        className="w-[100%] aspect-video"
        src="https://www.youtube.com/embed/TbLVc8fnw7c?si=NDNaIuB9gzOFkP7c&amp;controls=1&autoplay=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <Button
        className="w-fit ml-auto"
        color="primary"
        onPress={() => setStep((s) => s + 1)}
      >
        Próximo
      </Button>
    </>,
    <>
      <p className="mt-4">
        Agora você deve digitar o máximo que conseguir lembrar das senhas. Não
        se preocupe se não conseguir lembrar tudo.
      </p>
      <Input
        placeholder="Digite a senha 1"
        autoComplete="off"
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        {...register("eg1TypedPassword1")}
      />
      <Input
        placeholder="Digite a senha 2"
        autoComplete="off"
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        {...register("eg1TypedPassword2")}
      />
      <Button color="primary" onPress={() => setStep((s) => s + 1)}>
        Próximo
      </Button>
    </>,
    <Countdown
      key="countdown"
      passwords={[eg2Password1!, eg2Password2!]}
      onCountdownEnds={() => setStep((s) => s + 1)}
    />,
    <>
      <strong className="mt-4">Vídeo 2</strong>
      <iframe
        className="w-[100%] aspect-video"
        src="https://www.youtube.com/embed/4zMgf3gK7p8?si=Am3bN-XM7Z2o64et&amp;controls=1&autoplay=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <Button
        className="w-fit ml-auto"
        color="primary"
        onPress={() => setStep((s) => s + 1)}
      >
        Próximo
      </Button>
    </>,
    <>
      <p className="mt-4">
        Agora você deve digitar o máximo que conseguir lembrar das senhas. Não
        se preocupe se não conseguir lembrar tudo.
      </p>
      <Input
        placeholder="Digite a senha 1"
        autoComplete="off"
        {...register("eg2TypedPassword1")}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
      />
      <Input
        placeholder="Digite a senha 2"
        autoComplete="off"
        {...register("eg2TypedPassword2")}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
      />
      <Button color="primary" onPress={() => setStep((s) => s + 1)}>
        Próximo
      </Button>
    </>,
    <Countdown
      key="countdown"
      passwords={[btPassword1, btPassword2]}
      onCountdownEnds={() => setStep((s) => s + 1)}
    />,
    <>
      <strong>Vídeo 3</strong>
      <iframe
        className="w-[100%] aspect-video"
        src="https://www.youtube.com/embed/55D_3uaKXYE?si=zyiXatdVgK5QuP1U&amp;controls=1&autoplay=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <Button
        className="w-fit ml-auto"
        color="primary"
        onPress={() => setStep((s) => s + 1)}
      >
        Próximo
      </Button>
    </>,
    <>
      <p className="mt-4">
        Agora você deve digitar o máximo que conseguir lembrar das senhas. Mais
        uma vez, não se preocupe se não conseguir lembrar tudo.
      </p>
      <Input
        placeholder="Digite a senha 1"
        autoComplete="off"
        {...register("btTypedPassword1")}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
      />
      <Input
        placeholder="Digite a senha 2"
        autoComplete="off"
        {...register("btTypedPassword2")}
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
      />
      <Button color="primary" type="submit" isLoading={loading}>
        FINALIZAR
      </Button>
    </>,
  ];

  return (
    <main className="flex flex-col gap-2">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
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
