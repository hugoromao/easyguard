"use client";

import { Card, Progress } from "@nextui-org/react";
import Image from "next/image";

import Base from "@/components/Base";

import { achievements, Achivement } from "@/context/achievements";
import { useContext } from "react";
import { GlobalContext } from "@/context/global";

function Achivement({ title, description, getProgress }: Achivement) {
  const { history } = useContext(GlobalContext);

  return (
    <Card className="flex flex-col p-4">
      <Image
        src="/profile.png"
        width={70}
        height={70}
        alt={title}
        className="rounded-full mb-4"
      />

      <span className="flex flex-col gap-2 mt-auto">
        <strong className="mt-auto text-foreground-600">{title}</strong>
        <p className="text-sm text-foreground-600">{description}</p>
        <Progress
          aria-label={`${title}-progress`}
          value={getProgress(history) * 100}
        />
      </span>
    </Card>
  );
}

export default function Badges() {
  return (
    <Base>
      <div className="flex flex-col p-6 gap-2 overflow-auto">
        <h1 className="text-xl font-bold text-foreground-700">Conquistas</h1>
        <p className="font-medium text-foreground-400 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <section className="grid grid-cols-2 gap-2">
          {achievements.map((achivement) => (
            <Achivement key={achivement.id} {...achivement} />
          ))}
        </section>
      </div>
    </Base>
  );
}
