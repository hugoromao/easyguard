"use client";
import React, { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import {
  DocumentDuplicateIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { Data, generatePassword, validateEntropy } from "../../utils/passwd";

import Dice from "./dice";
import { useRouter } from "next/navigation";

const GeneratePassword = ({
  searchParams: { numbers, words },
}: {
  searchParams: { words: string; numbers: string };
}) => {
  const receivedWords: string[] = JSON.parse(words);
  const receivedNumbers: number[] = JSON.parse(numbers);

  const { push } = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [data, setData] = useState<Data | undefined>();
  const [wasUsed, setWasUsed] = useState(false);

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

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(data?.password || "");
      setWasUsed(true);
      enqueueSnackbar("Copiado p/ área de transferência", {
        variant: "success",
      });
    } catch {
      enqueueSnackbar("Falha ao copiar senha", {
        variant: "error",
      });
    }
  }

  function handleGoHome() {
    if (wasUsed) {
      push("/");
    } else {
      onOpen();
    }
  }

  useEffect(() => {
    setData(generatePassword(receivedWords, receivedNumbers));
  }, []);

  if (data === undefined) {
    return (
      <main className="flex h-screen justify-center">
        <Spinner label="Gerando senha..." />
      </main>
    );
  }

  return (
    <>
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
                Sua senha possui <strong>{data.entropy} bits</strong> de
                entropia. Use o botão de copiar senha para contabilizar suas
                conquistas.
              </p>
            </CardBody>
          </Card>
        ) : null}

        <Button
          fullWidth
          variant="bordered"
          className="mt-14"
          onClick={handleGoHome}
        >
          Voltar para o início
        </Button>
      </main>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Parece que você não copiou sua senha...
              </ModalHeader>
              <ModalBody>
                <p>
                  Para registrar suas conquistas, utilizamos o botão “copiar
                  senha”. Se você pretende usar esta senha, lembre-se de clicar
                  em “copiar”!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  onClick={() => push("/")}
                >
                  Sair
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    copyToClipboard();
                    push("/");
                  }}
                >
                  Copiar minha senha e sair
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GeneratePassword;
