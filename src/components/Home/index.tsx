"use client";
import React from "react";

import Head from "next/head";
import { Button } from "@nextui-org/react";
import { KeyIcon } from "@heroicons/react/24/outline";

import Base from "@/components/Base";
import Tips from "@/components/Tips";
import NextAchivement from "@/components/NextAchivement";

import { GlobalContext } from "@/context/global";

const Home = () => {
  const { onOpen } = React.useContext(GlobalContext);

  return (
    <Base>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>

      <div className="overflow-auto">
        <div className="flex w-full h-1/3 relative p-6 bg-[#185449]">
          <span className="text-[28px] text-white font-semibold w-full max-w-2xl mx-auto">
            <h1 className="text-[#84E1A1]">Gerador de Senhas</h1>
            <h1>Gamificado</h1>
          </span>

          <Button
            color="secondary"
            variant="solid"
            size="lg"
            startContent={<KeyIcon height={24} className="font-bold" />}
            onClick={onOpen}
            className="bg-green-50 text-green-800 shadow-lg font-medium max-w-2xl mx-auto"
            style={{
              position: "absolute",
              top: "100%",
              left: 24,
              right: 24,
              transform: "translateY(-50%)",
            }}
          >
            Nova Senha
          </Button>
        </div>

        <div className="p-6 pt-12 flex flex-col gap-2 w-full max-w-2xl mx-auto">
          <NextAchivement />

          <Tips />
        </div>
      </div>
    </Base>
  );
};

export default Home;
