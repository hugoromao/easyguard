"use client";

import React from "react";

// import PasswordMemoryTest from "@/components/PasswordMemoryTest";
// import TypingTest from "@/components/TypingTest";
import CombinatedTest from "@/components/CombinatedTest";

const Estudo = () => {
  return (
    <div className="flex flex-col p-4 h-[calc(100dvh)]">
      {/* <StrongPasswordKnowledTest /> */}
      {/* <PasswordMemoryTest onFinishTest={() => window.alert("Deu bom")} /> */}
      {/* <TypingTest onFinishTest={() => window.alert("Deu bom")} /> */}
      <CombinatedTest onFinishTest={() => window.alert("Deu bom")} />
    </div>
  );
};

export default Estudo;
