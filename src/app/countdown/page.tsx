"use client";
import React, { useEffect, useState } from "react";

import { useCountdown } from "usehooks-ts";
import { Button, Input, Progress } from "@nextui-org/react";
import { PlayIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Countdown = () => {
  const countStart = 180;

  const [count, { startCountdown }] = useCountdown({
    countStart,
    intervalMs: 1000,
  });

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  function startTest() {
    setIsVisible(true);
    startCountdown();
  }

  useEffect(() => {
    if (count === 0) setIsVisible(false);
  }, [count]);

  return (
    <div className="h-[calc(100dvh)] max-w-lg flex flex-col items-center justify-center mx-auto gap-4">
      <p>Tempo restante (segundos): {count}</p>
      <Progress
        aria-label="time remaining"
        value={(count * 100) / countStart}
      />

      <Input
        label="Senha 1"
        type={isVisible ? "text" : "password"}
        size="lg"
        defaultValue=""
      />
      <Input
        label="Senha 2"
        type={isVisible ? "text" : "password"}
        defaultValue=""
      />
      <span className="flex gap-2">
        <Button isIconOnly color="warning" onPress={toggleVisibility}>
          {isVisible ? <EyeIcon height={24} /> : <EyeSlashIcon height={24} />}
        </Button>

        <Button isIconOnly color="primary" onPress={startTest}>
          <PlayIcon height={24} />
        </Button>
      </span>
    </div>
  );
};

export default Countdown;
