"use client";

import { useContext } from "react";

import { Button } from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";

import Base from "@/components/Base";

import { GlobalContext } from "@/context/global";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function Settings() {
  const { refresh } = useRouter();
  const { setHistory } = useContext(GlobalContext);

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

  return (
    <>
      <Base>
        <div className="flex flex-col p-6 gap-2">
          <Button onClick={mockAddPasswordToLocalStorage}>
            Criar senha no LocalStorage
          </Button>

          <Button
            onClick={() =>
              enqueueSnackbar("Adventure Time", { variant: "info" })
            }
          >
            Enviar notificação de conquista
          </Button>

          <Button
            onClick={() => {
              window.localStorage.clear();
              refresh();
            }}
          >
            Limpar banco local
          </Button>
        </div>
      </Base>
    </>
  );
}
