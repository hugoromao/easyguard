"use client";
import React, { useEffect, useState } from "react";

import { useCountdown } from "usehooks-ts";
import { Button, Card, Progress } from "@nextui-org/react";
import { PlayIcon } from "@heroicons/react/24/outline";

type CountdownProps = {
  passwords: string[];
  onCountdownEnds: () => void;
};

const Countdown = ({ passwords, onCountdownEnds }: CountdownProps) => {
  const countStart = process.env.NODE_ENV === "development" ? 10 : 180;

  const [isVisible, setIsVisible] = useState(false);
  const text = `Agora você terá <strong>três minutos</strong> para memorizar ${
    passwords.length > 1 ? "as senhas" : "a senha"
  }. Após esse período, um vídeo de distração será iniciado automaticamente. Quando o vídeo terminar, você deverá digitar o máximo possível que conseguiu memorizar ${
    passwords.length > 1 ? "das senhas" : "da senha"
  }.${
    isVisible ? "" : "<strong>Clique em INICIAR quando estiver pronto</strong>."
  }`;

  const [count, { startCountdown }] = useCountdown({
    countStart,
    intervalMs: 1000,
  });

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
    <div className="w-full h-[-webkit-fill-available] flex flex-col items-center justify-center gap-4 select-none">
      {text ? <p dangerouslySetInnerHTML={{ __html: text }} /> : null}

      {isVisible ? (
        <>
          <p>Tempo restante (segundos): {count}</p>
          <Progress
            aria-label="time remaining"
            value={(count * 100) / countStart}
          />

          {passwords.map((p, index) => (
            <>
              <Card className="bg-zinc-100 p-2 px-4 w-full">
                <p className="font-light text-sm">Senha {index + 1}</p>
                <strong>{p}</strong>
              </Card>
            </>
          ))}
        </>
      ) : null}

      {!isVisible ? (
        <span className="flex gap-2">
          <Button
            startContent={<PlayIcon height={24} />}
            color="primary"
            onPress={startTest}
          >
            INICIAR
          </Button>
        </span>
      ) : null}
    </div>
  );
};

export default Countdown;
