"use client";

import Base from "@/components/Base";
import { GlobalContext } from "@/context/global";
import { Button } from "@nextui-org/react";
import { useContext } from "react";

export default function Settings() {
  const { setHistory } = useContext(GlobalContext);

  function mockAddPasswordToLocalStorage() {
    setHistory((h) => [...h, { type: "password", createdAt: new Date() }]);
  }

  return (
    <Base>
      <h1>Settings</h1>
      <Button onClick={mockAddPasswordToLocalStorage}>
        Criar senha no localStorage
      </Button>
    </Base>
  );
}
