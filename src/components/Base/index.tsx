"use client";

import React, { useState } from "react";

import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import NewPasswordForm from "@/components/NewPasswordForm";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

type BaseProps = {
  children: React.ReactNode;
};

const Base = ({ children }: BaseProps) => {
  const { push } = useRouter();

  const [isNewPasswordFormActive, setIsNewPasswordFormActive] = useState(false);

  function openNewPasswordForm() {
    setIsNewPasswordFormActive(true);
  }

  function onSubmitPasswordForm(pathname: string) {

  }

  return (
    <>
      <main
        style={inter.style}
        className="h-[calc(100dvh)] grid grid-rows-[1fr_auto]"
      >
        {children}
        <Navbar openNewPasswordForm={openNewPasswordForm} />
      </main>

      <NewPasswordForm
        active={isNewPasswordFormActive}
        setActive={setIsNewPasswordFormActive}
        onSubmitPasswordForm={onSubmitPasswordForm}
      />
    </>
  );
};

export default Base;
