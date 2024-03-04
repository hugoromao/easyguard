"use client";

import React, { useContext } from "react";

import { Inter } from "next/font/google";

import { GlobalContext } from "@/context/global";

import Navbar from "@/components/Navbar";
import NewPasswordForm from "@/components/NewPasswordForm";

const inter = Inter({ subsets: ["latin"] });

type BaseProps = {
  children: React.ReactNode;
};

const Base = ({ children }: BaseProps) => {
  const { isOpen, onOpenChange } = useContext(GlobalContext);

  return (
    <>
      <main
        style={inter.style}
        className="h-[calc(100dvh)] grid grid-rows-[1fr_auto]"
      >
        {children}
        <Navbar />
      </main>

      <NewPasswordForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default Base;
