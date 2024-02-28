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

  function mockAdd3PasswordToLocalStorage(date: "day" | "week") {
    const day1 = dayjs().subtract(1, date);
    const day2 = dayjs().subtract(2, date);
    const day3 = dayjs().subtract(3, date);
    const day4 = dayjs().subtract(4, date);

    setHistory((h) => [
      ...h,
      { type: "password", createdAt: day4.toDate() },
      { type: "password", createdAt: day3.toDate() },
      { type: "password", createdAt: day2.toDate() },
      { type: "password", createdAt: day1.toDate() },
    ]);
  }

  return (
    <>
      <Base>
        <div className="flex flex-col p-6 gap-2">
          <h1 className="text-[28px] font-bold text-foreground-700">
            Configurações
          </h1>

          <Button onClick={mockAddPasswordToLocalStorage}>
            Criar senha no LocalStorage
          </Button>

          <Button onClick={() => mockAdd3PasswordToLocalStorage("day")}>
            Criar senha com 3 dias consecutivos
          </Button>

          <Button onClick={() => mockAdd3PasswordToLocalStorage("week")}>
            Criar senha com 3 semanas consecutivos
          </Button>

          <Button
            onClick={() =>
              enqueueSnackbar("Uma conquista teste!", { variant: "info" })
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
