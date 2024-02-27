"use client";

import React, { useContext } from "react";

import { Inter } from "next/font/google";

import { GlobalContext } from "@/context/global";

import Navbar from "@/components/Navbar";
import NewPasswordForm from "@/components/NewPasswordForm";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

type BaseProps = {
  children: React.ReactNode;
};

const Base = ({ children }: BaseProps) => {
  const { push } = useRouter();
  const { isOpen, onOpen, onOpenChange } = useContext(GlobalContext);

  function openNewPasswordForm() {
    onOpen();
  }

  function onSubmitPasswordForm(pathname: string) {
    push(pathname);
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
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmitPasswordForm={onSubmitPasswordForm}
      />
    </>
  );
};

export default Base;
