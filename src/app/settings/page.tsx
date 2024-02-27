"use client";

import { useContext } from "react";

import { Button } from "@nextui-org/react";
import { enqueueSnackbar } from "notistack";

import Base from "@/components/Base";

import { GlobalContext } from "@/context/global";

export default function Settings() {
  const { setHistory } = useContext(GlobalContext);

  function mockAddPasswordToLocalStorage() {
    setHistory((h) => [...h, { type: "password", createdAt: new Date() }]);
  }

  return (
    <>
      <Base>
        <div className="flex flex-col p-6 gap-2">
          {process.env.NODE_ENV === "development" ? (
            <>
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
            </>
          ) : null}
        </div>
      </Base>
    </>
  );
}
