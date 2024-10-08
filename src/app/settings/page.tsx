"use client";

import Link from "next/link";
import { useContext, useState } from "react";

import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import Base from "@/components/Base";

import { AchivementsContext } from "@/context/achivements";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function Settings() {
  // eslint-disable-next-line no-unused-vars
  const [_, setShowOnboarding] = useLocalStorage("showOnboarding", true);

  const { refresh } = useRouter();
  const { setHistory } = useContext(AchivementsContext);

  const [enableDebug, setEnableDebug] = useState(false);

  function mockAddPasswordToLocalStorage() {
    const randomDate = dayjs().subtract(
      Math.floor(Math.random() * 3 * 7),
      "day"
    );
    setHistory((h) => [
      ...h,
      { type: "password", createdAt: randomDate.toDate() },
    ]);
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <>
      <Base>
        <div className="flex flex-col p-6 gap-2 w-full max-w-2xl mx-auto">
          <h1 className="text-[28px] font-bold text-foreground-700">
            Configurações
          </h1>

          <Button
            variant={enableDebug ? "solid" : "bordered"}
            color="primary"
            onClick={() => setEnableDebug((e) => !e)}
          >
            Habilitar funções de DEBUG
          </Button>

          {enableDebug ? (
            <motion.ul
              className="flex flex-col gap-2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.li variants={item}>
                <Button
                  variant="flat"
                  fullWidth
                  onClick={mockAddPasswordToLocalStorage}
                >
                  Criar senha no LocalStorage
                </Button>
              </motion.li>

              <motion.li variants={item}>
                <Button
                  variant="flat"
                  fullWidth
                  onClick={() =>
                    enqueueSnackbar(
                      "O início da jornada!:Crie sua primeira senha.",
                      { variant: "info" }
                    )
                  }
                >
                  Enviar notificação de conquista
                </Button>
              </motion.li>

              <motion.li variants={item}>
                <Link href="/coverage/lcov-report/index.html">
                  <Button variant="flat" fullWidth>
                    Cobertura de teste
                  </Button>
                </Link>
              </motion.li>

              <motion.li variants={item}>
                <Link href="/countdown">
                  <Button variant="flat" fullWidth>
                    Countdown
                  </Button>
                </Link>
              </motion.li>

              <motion.li variants={item}>
                <Button
                  variant="flat"
                  fullWidth
                  onClick={() => {
                    window.localStorage.clear();
                    refresh();
                  }}
                >
                  Limpar banco local
                </Button>
              </motion.li>
            </motion.ul>
          ) : null}

          <Link href="/estudo">
            <Button variant="flat" fullWidth>
              Avaliação em laboratório
            </Button>
          </Link>

          <Button
            variant="flat"
            fullWidth
            onClick={() => setShowOnboarding(true)}
          >
            Refazer Tutorial
          </Button>
        </div>
      </Base>
    </>
  );
}
