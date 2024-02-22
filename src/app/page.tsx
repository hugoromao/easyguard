"use client";
import React from "react";

import Image from "next/image";
import { Button } from "@nextui-org/react";
import { KeyIcon } from "@heroicons/react/24/outline";

import { GlobalContext } from "@/context/global";

import Base from "@/components/Base";

export default function Home() {
  const { onOpen } = React.useContext(GlobalContext);

  return (
    <Base>
      <div className="w-full h-2/5 relative">
        <Image
          src={"/green.jpg"}
          alt="hero"
          priority
          fill
          className="object-cover"
        />

        <Button
          color="primary"
          variant="shadow"
          className="w-4/5"
          size="lg"
          startContent={<KeyIcon height={24} className="font-bold" />}
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={onOpen}
        >
          Nova Senha
        </Button>
      </div>
      <h1>Home</h1>
    </Base>
  );
}
