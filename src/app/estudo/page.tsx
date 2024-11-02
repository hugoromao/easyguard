"use client";

import React from "react";

import Image from "next/image";
import Confetti from "react-confetti";
import { Button, Progress } from "@nextui-org/react";

import TypingTest from "@/components/TypingTest";
import CombinatedTest from "@/components/CombinatedTest";
import PasswordMemoryTest from "@/components/PasswordMemoryTest";
import StrongPasswordKnowledTest from "@/components/StrongPasswordKnowledgeTest";
import Link from "next/link";
import { useEstudoViewModel } from "./viewmodel";

const Estudo = () => {
  const { step, setStep } = useEstudoViewModel();

  return (
    <>
      <div className="flex flex-col items-center pt-0 p-4 h-[calc(100dvh)] overflow-x-hidden overflow-y-auto">
        {step !== 0 ? (
          <Progress
            aria-label="time remaining"
            className="pt-4"
            value={(step * 100) / 5}
            color="secondary"
          />
        ) : null}

        <div className="flex flex-col max-w-[720px] m-auto">
          {step === 0 ? (
            <section className="flex flex-col gap-2 max-w-lg m-auto">
              <Image
                src="/survey.png"
                width={202}
                height={205}
                alt="Survey"
                className="mx-auto"
              />
              <h1 className="text-center font-bold text-3xl text-neutral-800">
                Avaliação EasyGuard
              </h1>
              <p className="text-center">
                Diante de um cenário onde cada vez mais nossa presença digital
                aumenta, as senhas atuam como principal mecanismo de defesa
                contra violações à nossa privacidade e vazamento de informações
                pessoais e profissinoais.
              </p>
              <p className="text-center">
                Essa pesquisa avalia a estratégia de criação de senhas utilizada
                no EasyGuard.
              </p>
              <p className="text-center text-gray-600 text-sm italic">
                Duração média: Uma hora e 30 minutos.
              </p>

              <Button variant="faded" onPress={() => setStep((s) => s + 1)}>
                COMEÇAR
              </Button>
            </section>
          ) : null}

          {step === 1 ? (
            <StrongPasswordKnowledTest
              onFinishTest={() => setStep((s) => s + 1)}
            />
          ) : null}
          {step === 2 ? (
            <PasswordMemoryTest onFinishTest={() => setStep((s) => s + 1)} />
          ) : null}
          {step === 3 ? (
            <TypingTest onFinishTest={() => setStep((s) => s + 1)} />
          ) : null}
          {step === 4 ? (
            <CombinatedTest onFinishTest={() => setStep((s) => s + 1)} />
          ) : null}
          {step === 5 ? (
            <div className="flex flex-col gap-2 items-center m-auto">
              <h1 className="font-bold text-4xl text-center">
                Estudo finalizado!
              </h1>
              <Link href="/">
                <Button variant="solid" color="primary">
                  Voltar para o início
                </Button>
              </Link>
              <Confetti
                style={{ pointerEvents: "none" }}
                numberOfPieces={100}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Estudo;
