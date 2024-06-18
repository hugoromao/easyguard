"use client";

import React, { useState } from "react";

import TypingTest from "@/components/TypingTest";
import CombinatedTest from "@/components/CombinatedTest";
import PasswordMemoryTest from "@/components/PasswordMemoryTest";
import StrongPasswordKnowledTest from "@/components/StrongPasswordKnowledgeTest";

const Estudo = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="flex flex-col p-4 h-[calc(100dvh)]">
      {step === 0 ? (
        <StrongPasswordKnowledTest onFinishTest={() => setStep((s) => s + 1)} />
      ) : null}
      {step === 1 ? (
        <PasswordMemoryTest onFinishTest={() => setStep((s) => s + 1)} />
      ) : null}
      {step === 2 ? (
        <TypingTest onFinishTest={() => window.alert("Deu bom")} />
      ) : null}
      {step === 3 ? (
        <CombinatedTest onFinishTest={() => window.alert("Deu bom")} />
      ) : null}
      {step === 4 ? <p>Estudo finalizado</p> : null}
    </div>
  );
};

export default Estudo;
