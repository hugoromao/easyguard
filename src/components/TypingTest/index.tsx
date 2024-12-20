"use client";

import React, { useEffect } from "react";
import { Button, Input } from "@nextui-org/react";

import NewPasswordForm from "../NewPasswordForm";

import { Inputs, PasswordTypeInfo, useTypingTestViewModel } from "./viewmodel";
import { CheckIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { UseFormRegister } from "react-hook-form";

type TypingTestProps = {
  onFinishTest: () => void;
};

type CustomInputProps = {
  placeholder?: string;
  autoComplete?: string;
  id: string;
  registerName: string;
  register: UseFormRegister<Inputs>;
  egPasswordInfo: PasswordTypeInfo;
  setEgPasswordInfo: React.Dispatch<React.SetStateAction<PasswordTypeInfo>>;
};

export const CustomInput = ({
  id,
  registerName,
  register,
  egPasswordInfo,
  setEgPasswordInfo,
  placeholder = `Linha ${id}`,
  autoComplete = "off",
}: CustomInputProps) => {
  return (
    <Input
      autoComplete={autoComplete}
      placeholder={placeholder}
      onKeyDown={(e) => {
        if (e.key === "Backspace") {
          setEgPasswordInfo((i) => ({
            ...i,
            backspaceCount: i.backspaceCount + 1,
          }));
        }
      }}
      {...register(registerName as any, {
        onChange: () => {
          if (egPasswordInfo.timestamp.start === null) {
            setEgPasswordInfo((o) => ({
              ...o,
              timestamp: { ...o.timestamp, start: dayjs().unix() },
            }));
          }
        },
        onBlur: () => {
          setEgPasswordInfo((o) => ({
            ...o,
            timestamp: { ...o.timestamp, end: dayjs().unix() },
          }));
        },
      })}
      onPaste={(e) => {
        e.preventDefault();
        return false;
      }}
      onCopy={(e) => {
        e.preventDefault();
        return false;
      }}
    />
  );
};

const TypingTest = ({ onFinishTest }: TypingTestProps) => {
  const {
    handleSubmit,
    isOpen,
    loading,
    onCompletedNewPasswordForm,
    onOpen,
    onOpenChange,
    onSubmit,
    register,
    step,
    setStep,
    changeEg2Password1,
    eg2Password1,
    eg1Password1,
    btPassword,
    eg1Password1Info,
    setEg1Password1Info,
    eg1Password2Info,
    setEg1Password2Info,
    eg1Password3Info,
    setEg1Password3Info,
    eg1Password4Info,
    setEg1Password4Info,
    eg1Password5Info,
    setEg1Password5Info,
    eg2Password1Info,
    setEg2Password1Info,
    eg2Password2Info,
    setEg2Password2Info,
    eg2Password3Info,
    setEg2Password3Info,
    eg2Password4Info,
    setEg2Password4Info,
    eg2Password5Info,
    setEg2Password5Info,
    btPassword1Info,
    setBtPassword1Info,
    btPassword2Info,
    setBtPassword2Info,
    btPassword3Info,
    setBtPassword3Info,
    btPassword4Info,
    setBtPassword4Info,
    btPassword5Info,
    setBtPassword5Info,
    watch,
  } = useTypingTestViewModel({ onFinishTest });

  const steps = [
    <>
      <h1 className="font-bold text-2xl mt-4">Teste de digitação</h1>

      <p>
        Vamos precisar que você crie duas senhas utilizando nossa ferramenta,
        basta clicar nos botões a seguir.
      </p>

      <Button onPress={changeEg2Password1}>
        {eg2Password1 ? "Alterar" : "Criar"} primeira senha
      </Button>
      {eg2Password1 ? (
        <strong className="text-center mb-4 break-all">{eg2Password1}</strong>
      ) : null}

      <Button
        onPress={onOpen}
        isDisabled={eg1Password1 !== undefined}
        color={eg1Password1 !== undefined ? "primary" : "default"}
        startContent={
          eg1Password1 !== undefined ? <CheckIcon height={24} /> : undefined
        }
      >
        Criar segunda senha
      </Button>
    </>,
    <>
      <p className="mt-4">
        Nessa tela você vai digitar a senha o mais rápido possível cinco vezes.
        Utilize os cinco campos abaixo para digitar a senha.
      </p>
      <em className="select-none">
        Senha escolhida: <strong>{eg1Password1}</strong>
      </em>

      <CustomInput
        id="1"
        registerName="eg1TypedPassword1"
        register={register}
        egPasswordInfo={eg1Password1Info}
        setEgPasswordInfo={setEg1Password1Info}
      />
      <CustomInput
        id="2"
        registerName="eg1TypedPassword2"
        register={register}
        egPasswordInfo={eg1Password2Info}
        setEgPasswordInfo={setEg1Password2Info}
      />
      <CustomInput
        id="3"
        registerName="eg1TypedPassword3"
        register={register}
        egPasswordInfo={eg1Password3Info}
        setEgPasswordInfo={setEg1Password3Info}
      />
      <CustomInput
        id="4"
        registerName="eg1TypedPassword4"
        register={register}
        egPasswordInfo={eg1Password4Info}
        setEgPasswordInfo={setEg1Password4Info}
      />
      <CustomInput
        id="5"
        registerName="eg1TypedPassword5"
        register={register}
        egPasswordInfo={eg1Password5Info}
        setEgPasswordInfo={setEg1Password5Info}
      />

      <Button
        isDisabled={
          !(
            watch("eg1TypedPassword1") &&
            watch("eg1TypedPassword2") &&
            watch("eg1TypedPassword3") &&
            watch("eg1TypedPassword4") &&
            watch("eg1TypedPassword5")
          )
        }
        color={
          watch("eg1TypedPassword1") &&
          watch("eg1TypedPassword2") &&
          watch("eg1TypedPassword3") &&
          watch("eg1TypedPassword4") &&
          watch("eg1TypedPassword5")
            ? "primary"
            : "default"
        }
        onClick={() => {
          setStep((s) => s + 1);
        }}
      >
        Próximo
      </Button>
    </>,
    <></>,
    <>
      <p className="mt-4">
        Agora você vai fazer o mesmo para a senha gerada pelo EasyGuard. Digite
        a senha o mais rápido possível cinco vezes, sem poder apagar qualquer
        caracter que tenha digitado errado. Utilize os cinco campos abaixo para
        digitar a senha.
      </p>
      <em className="select-none">
        Senha escolhida: <strong>{eg2Password1}</strong>
      </em>

      <CustomInput
        id="1"
        registerName="eg2TypedPassword1"
        register={register}
        egPasswordInfo={eg2Password1Info}
        setEgPasswordInfo={setEg2Password1Info}
      />
      <CustomInput
        id="2"
        registerName="eg2TypedPassword2"
        register={register}
        egPasswordInfo={eg2Password2Info}
        setEgPasswordInfo={setEg2Password2Info}
      />
      <CustomInput
        id="3"
        registerName="eg2TypedPassword3"
        register={register}
        egPasswordInfo={eg2Password3Info}
        setEgPasswordInfo={setEg2Password3Info}
      />
      <CustomInput
        id="4"
        registerName="eg2TypedPassword4"
        register={register}
        egPasswordInfo={eg2Password4Info}
        setEgPasswordInfo={setEg2Password4Info}
      />
      <CustomInput
        id="5"
        registerName="eg2TypedPassword5"
        register={register}
        egPasswordInfo={eg2Password5Info}
        setEgPasswordInfo={setEg2Password5Info}
      />

      <Button
        isDisabled={
          !(
            watch("eg2TypedPassword1") &&
            watch("eg2TypedPassword2") &&
            watch("eg2TypedPassword3") &&
            watch("eg2TypedPassword4") &&
            watch("eg2TypedPassword5")
          )
        }
        color={
          watch("eg2TypedPassword1") &&
          watch("eg2TypedPassword2") &&
          watch("eg2TypedPassword3") &&
          watch("eg2TypedPassword4") &&
          watch("eg2TypedPassword5")
            ? "primary"
            : "default"
        }
        onClick={() => setStep((s) => s + 1)}
      >
        Próximo
      </Button>
    </>,
    <></>,
    <>
      <p className="mt-4">
        Agora você vai fazer o mesmo para a senha gerada pelo computador. Digite
        a senha o mais rápido possível cinco vezes, sem poder apagar qualquer
        caracter que tenha digitado errado. Utilize os cinco campos abaixo para
        digitar a senha.
      </p>
      {!loading ? (
        <em className="select-none">
          Senha escolhida: <strong>{btPassword}</strong>
        </em>
      ) : null}

      <CustomInput
        id="1"
        registerName="btTypedPassword1"
        register={register}
        egPasswordInfo={btPassword1Info}
        setEgPasswordInfo={setBtPassword1Info}
      />
      <CustomInput
        id="2"
        registerName="btTypedPassword2"
        register={register}
        egPasswordInfo={btPassword2Info}
        setEgPasswordInfo={setBtPassword2Info}
      />
      <CustomInput
        id="3"
        registerName="btTypedPassword3"
        register={register}
        egPasswordInfo={btPassword3Info}
        setEgPasswordInfo={setBtPassword3Info}
      />
      <CustomInput
        id="4"
        registerName="btTypedPassword4"
        register={register}
        egPasswordInfo={btPassword4Info}
        setEgPasswordInfo={setBtPassword4Info}
      />
      <CustomInput
        id="5"
        registerName="btTypedPassword5"
        register={register}
        egPasswordInfo={btPassword5Info}
        setEgPasswordInfo={setBtPassword5Info}
      />

      <Button
        isDisabled={
          !(
            watch("btTypedPassword1") &&
            watch("btTypedPassword2") &&
            watch("btTypedPassword3") &&
            watch("btTypedPassword4") &&
            watch("btTypedPassword5")
          )
        }
        color={
          watch("btTypedPassword1") &&
          watch("btTypedPassword2") &&
          watch("btTypedPassword3") &&
          watch("btTypedPassword4") &&
          watch("btTypedPassword5")
            ? "primary"
            : "default"
        }
        type="submit"
        isLoading={loading}
      >
        FINALIZAR
      </Button>
    </>,
  ];

  useEffect(() => {
    if (step === 2) setStep((s) => s + 1);
    if (step === 4) setStep((s) => s + 1);
  }, [step]);

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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onFinish={onCompletedNewPasswordForm}
      />
    </main>
  );
};

export default TypingTest;
