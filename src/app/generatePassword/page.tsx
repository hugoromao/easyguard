"use client";
import React, { useContext, useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import {
  Button,
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
import { GlobalContext } from "@/context/global";

import { useSearchParams } from "next/navigation";
import { AchivementsContext } from "@/context/achivements";
import PasswordStrength from "@/components/PasswordStrength";

const Page = () => {
  const params = useSearchParams();

  if (!params) {
    return <code>Parâmetros não informados.</code>;
  }

  const receivedWords = params.get("words");
  const receivedNumbers = params.get("numbers");

  if (!receivedWords || !receivedNumbers) {
    return <code>Parâmetros não informados.</code>;
  }

  return (
    <GeneratePassword
      receivedWords={JSON.parse(receivedWords)}
      receivedNumbers={JSON.parse(receivedNumbers).map((n: string) =>
        Number(n)
      )}
    />
  );
};

export default Page;

type GeneratePasswordProps = {
  receivedWords: string[];
  receivedNumbers: number[];
};

const GeneratePassword = ({
  receivedWords,
  receivedNumbers,
}: GeneratePasswordProps) => {
  const { push } = useRouter();
  const { onClose } = useContext(GlobalContext);
  const { setHistory } = useContext(AchivementsContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [data, setData] = useState<Data>(
    generatePassword(
      receivedWords,
      receivedNumbers.map((n) => Number(n))
    )
  );
  const [wasUsed, setWasUsed] = useState(false);

  function regeneratePassword() {
    setData(
      generatePassword(
        receivedWords,
        receivedNumbers.map((n) => Number(n))
      )
    );
    setWasUsed(false);
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
      setHistory((h) => [
        ...h,
        {
          type: "password",
          createdAt: new Date(),
        },
      ]);
      enqueueSnackbar("Copiado p/ área de transferência", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(`Falha ao copiar senha: ${err}`, {
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
    onClose();
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
      <main className="h-screen flex flex-col justify-center gap-4 p-4 w-full max-w-2xl mx-auto">
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
            className="shadow-lg"
          >
            Regerar
          </Button>
          <Button
            fullWidth
            isDisabled={data.entropy < 60}
            color={data.entropy < 60 ? "danger" : "primary"}
            variant="shadow"
            startContent={<DocumentDuplicateIcon height={20} />}
            onClick={copyToClipboard}
          >
            Copiar senha
          </Button>
        </span>

        {data ? <PasswordStrength entropy={data.entropy} /> : null}

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
