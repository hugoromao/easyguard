"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import {
  DocumentDuplicateIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { Data, generatePassword, validateEntropy } from "@/utils/passwd";

import Dice from "./dice";

const GeneratePassword = ({
  searchParams: { numbers, words },
}: {
  searchParams: { words: string; numbers: string };
}) => {
  const receivedWords: string[] = JSON.parse(words);
  const receivedNumbers: number[] = JSON.parse(numbers);

  const [data, setData] = useState<Data | undefined>();

  function regeneratePassword() {
    setData(generatePassword(receivedWords, receivedNumbers));
  }

  function onPasswordFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    const entropy = validateEntropy(e.target.value);
    setData((d) => {
      if (d === undefined) return d;
      return {
        ...d,
        password: e.target.value,
        entropy,
      };
    });
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(data?.password || "");
    enqueueSnackbar("Copiado p/ área de transferência", { variant: "success" });
  }

  useEffect(() => {
    setData(generatePassword(receivedWords, receivedNumbers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data === undefined) {
    return (
      <main className="flex h-screen justify-center">
        <Spinner label="Gerando senha..." />
      </main>
    );
  }

  return (
    <main className="h-screen flex flex-col justify-center gap-4 p-4">
      <p className="text-center font-semibold">Sua senha é:</p>

      <Input
        variant="bordered"
        className="font-mono"
        value={data.password || ""}
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
          isDisabled={data.entropy < 60}
          color="primary"
          variant="shadow"
          startContent={<DocumentDuplicateIcon height={20} />}
          onClick={copyToClipboard}
        >
          Copiar senha
        </Button>
      </span>

      {data ? (
        <Card>
          <CardBody>
            <p>
              Sua senha possui <strong>{data.entropy} bits</strong> de entropia.
              Use o botão de copiar senha para contabilizar suas conquistas.
            </p>
          </CardBody>
        </Card>
      ) : null}

      <Link href="/" className="mt-14">
        <Button fullWidth variant="bordered">
          Voltar para o início
        </Button>
      </Link>
    </main>
  );
};

export default GeneratePassword;
