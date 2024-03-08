"use client";

import { useContext, useState } from "react";

import dayjs from "dayjs";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { motion } from "framer-motion";

import Base from "@/components/Base";

import { AchivementsContext } from "@/context/achivements";

export default function Settings() {
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
        <div className="flex flex-col p-6 gap-2">
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
                    enqueueSnackbar("Uma conquista teste!", { variant: "info" })
                  }
                >
                  Enviar notificação de conquista
                </Button>
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
        </div>
      </Base>
    </>
  );
}
