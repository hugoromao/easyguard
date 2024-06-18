"use client";
import React, { useEffect, useState } from "react";

import { useCountdown } from "usehooks-ts";
import { Button, Input, Progress } from "@nextui-org/react";
import { PlayIcon } from "@heroicons/react/24/outline";

type CountdownProps = {
  passwords: string[];
  onCountdownEnds: () => void;
  text?: string;
};

const Countdown = ({ text, passwords, onCountdownEnds }: CountdownProps) => {
  const countStart = process.env.NODE_ENV === "development" ? 10 : 180;

  const [count, { startCountdown }] = useCountdown({
    countStart,
    intervalMs: 1000,
  });

  const [isVisible, setIsVisible] = useState(false);

  function startTest() {
    setIsVisible(true);
    startCountdown();
  }

  useEffect(() => {
    if (count === 0) {
      setIsVisible(false);
      onCountdownEnds();
    }
  }, [count]);

  return (
    <div className="w-full h-[-webkit-fill-available] flex flex-col items-center justify-center gap-4">
      {text ? <p>{text}</p> : null}
      <p>Tempo restante(segundos): {count}</p>
      <Progress
        aria-label="time remaining"
        value={(count * 100) / countStart}
      />

      {passwords.map((p, index) => (
        <Input
          isReadOnly
          key={p}
          label={`Senha ${index + 1}`}
          type={isVisible ? "text" : "password"}
          size="lg"
          defaultValue={p}
          fullWidth
        />
      ))}

      <span className="flex gap-2">
        <Button
          startContent={<PlayIcon height={24} />}
          color="primary"
          onPress={startTest}
        >
          INICIAR
        </Button>
      </span>
    </div>
  );
};

export default Countdown;
