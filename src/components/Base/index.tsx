"use client";

import React, { useState } from "react";

import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import NewPasswordForm from "@/components/NewPasswordForm";

const inter = Inter({ subsets: ["latin"] });

type BaseProps = {
  children: React.ReactNode;
};

const Base = ({ children }: BaseProps) => {
  const [isNewPasswordFormActive, setIsNewPasswordFormActive] = useState(false);

  function openNewPasswordForm() {
    setIsNewPasswordFormActive(true);
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
      />
    </>
  );
};

export default Base;
