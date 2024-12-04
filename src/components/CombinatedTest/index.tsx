import React from "react";

import NewPasswordForm from "../NewPasswordForm";

import { Button } from "@nextui-org/react";
import Countdown from "../Countdown";
import { useCombinatedTestViewModel } from "./viewmodel";
import { CustomInput } from "../TypingTest";

type CombinatedTestProps = {
  onFinishTest: () => void;
};

const CombinatedTest = ({ onFinishTest }: CombinatedTestProps) => {
  const {
    btPassword,
    eg1Password1,
    eg2Password1,
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
  } = useCombinatedTestViewModel({ onFinishTest });

  const steps = [
    <>
      <h1 className="font-bold text-2xl mt-4">Teste combinado</h1>
      <p>
        Esse é o último teste. Vamos precisar que você crie uma última senha
        utilizando nossa ferramenta, basta utilizar os seguintes botões.
      </p>

      <Button onPress={changeEg2Password1}>
        {eg2Password1 ? "Alterar" : "Criar"} primeira senha
      </Button>
      {eg2Password1 ? (
        <strong className="text-center mb-4 break-all">{eg2Password1}</strong>
      ) : null}
      <Button onPress={onOpen}>Criar senha</Button>
    </>,
    <Countdown
      key="countdown"
      passwords={[eg1Password1!]}
      onCountdownEnds={() => setStep((s) => s + 1)}
    />,
    <>
      <strong className="mt-4">Vídeo 4</strong>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/--h_vIA5WwU?si=GL0HM3zbQshFdyuP&amp;controls=0&autoplay=1"
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
        Nessa tela você vai digitar a senha o mais rápido possível cinco vezes.
        Utilize os cinco campos abaixo para digitar a senha.
      </p>
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
      <Button color="primary" onClick={() => setStep((s) => s + 1)}>
        Próximo
      </Button>
    </>,
    <Countdown
      key="countdown"
      passwords={[eg2Password1!]}
      onCountdownEnds={() => setStep((s) => s + 1)}
    />,
    <>
      <strong className="mt-4">Vídeo 5</strong>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/hUkzh_5_lOw?si=xF7-VrpHXuIyFLvH&amp;controls=0&autoplay=1"
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
        Nessa tela você vai digitar a senha o mais rápido possível cinco vezes,
        sem poder apagar qualquer caracter que tenha digitado errado. Utilize os
        cinco campos abaixo para digitar a senha.
      </p>
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
      <Button color="primary" onClick={() => setStep((s) => s + 1)}>
        Próximo
      </Button>
    </>,
    <Countdown
      key="countdown"
      passwords={[btPassword]}
      onCountdownEnds={() => setStep((s) => s + 1)}
    />,
    <>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/ZgZccxuj2RY?si=7RPV0Fa0C8mbOx_b?si=T0yPNQeA6ugqt06t&amp;controls=0&autoplay=1"
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
        Agora você vai fazer o mesmo para a senha gerada pelo computador. Digite
        a senha o mais rápido possível cinco vezes, sem poder apagar qualquer
        caracter que tenha digitado errado. Utilize os cinco campos abaixo para
        digitar a senha.
      </p>
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onFinish={onCompletedNewPasswordForm}
      />
    </main>
  );
};

export default CombinatedTest;
