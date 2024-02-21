"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";

import { generatePassword } from "@/utils/passwd";
import {
  DocumentDuplicateIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { enqueueSnackbar } from "notistack";
import Link from "next/link";
import Dice from "./dice";

const GeneratePassword = ({
  searchParams: { numbers, words },
}: {
  searchParams: { words: string; numbers: string };
}) => {
  const receivedWords: string[] = JSON.parse(words);
  const receivedNumbers: number[] = JSON.parse(numbers);

  const [password, setPassword] = useState<undefined | string>(
    generatePassword(receivedWords, receivedNumbers)
  );

  function regeneratePassword() {
    setPassword(generatePassword(receivedWords, receivedNumbers));
  }

  function onPasswordFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(password || "");
    enqueueSnackbar("Copiado p/ área de transferência", { variant: "success" });
  }

  return (
    <main className="h-screen flex flex-col justify-center gap-2 p-4">
      <p className="text-center font-semibold">Sua senha é:</p>

      <Input
        variant="bordered"
        className="font-mono"
        value={password}
        onChange={onPasswordFieldChange}
        style={{ textAlign: "center", fontSize: 16 }}
      />

      <span className="flex items-center gap-1 text-gray-400 mb-4">
        <InformationCircleIcon height={18} />
        <p>Clique na senha para editar</p>
      </span>

      <span className="flex gap-2">
        <Button
          variant="bordered"
          fullWidth
          color="primary"
          onClick={regeneratePassword}
          startContent={<Dice />}
        >
          Regerar
        </Button>
        <Button
          fullWidth
          color="primary"
          variant="shadow"
          startContent={<DocumentDuplicateIcon height={20} />}
          onClick={copyToClipboard}
        >
          Copiar senha
        </Button>
      </span>

      <Link href="/" className="mt-14">
        <Button fullWidth variant="bordered">
          Voltar para o início
        </Button>
      </Link>
    </main>
  );
};

export default GeneratePassword;
