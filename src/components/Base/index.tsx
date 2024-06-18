"use client";

import React, { useContext } from "react";

import { Inter } from "next/font/google";

import { GlobalContext } from "@/context/global";

import Navbar from "@/components/Navbar";
import NewPasswordForm, { Input } from "@/components/NewPasswordForm";
import { useLocalStorage } from "@uidotdev/usehooks";
import Onboarding from "../Onboarding";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

type BaseProps = {
  children: React.ReactNode;
};

const Base = ({ children }: BaseProps) => {
  const { push } = useRouter();
  const { isOpen, onOpenChange } = useContext(GlobalContext);

  const [showOnboarding] = useLocalStorage("showOnboarding", true);

  if (showOnboarding) return <Onboarding />;

  function onFinish(words: Input[], numbers: Input[]) {
    const wordsQueryParam = JSON.stringify(
      words.map((w) => w.value.replaceAll(" ", ""))
    );
    const numbersQueryParam = JSON.stringify(numbers.map((n) => n.value));

    const queryParams = new URLSearchParams({
      words: wordsQueryParam,
      numbers: numbersQueryParam,
    }).toString();

    push(`generatePassword?${queryParams}`);
  }

  return (
    <>
      <main
        style={inter.style}
        className="h-[calc(100dvh)] grid grid-rows-[1fr_auto]"
      >
        {children}
        <Navbar />
      </main>

      <NewPasswordForm
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onFinish={onFinish}
      />
    </>
  );
};

export default Base;
