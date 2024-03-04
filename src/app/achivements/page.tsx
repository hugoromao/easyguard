"use client";

import { Card, Progress } from "@nextui-org/react";

import Base from "@/components/Base";

import { achievements, Achivement } from "@/utils/achievements";
import { useContext } from "react";
import { AchivementsContext } from "@/context/achivements";

function Achivement({ id, title, description, getProgress }: Achivement) {
  const { history, completedAchievements } = useContext(AchivementsContext);

  return (
    <Card className="flex flex-col p-4">
      <span className="flex items-center justify-center w-20 h-20 rounded-full bg-foreground-200">
        <p className="font-bold text-foreground-500 text-xl">{id}</p>
      </span>

      <span className="flex flex-col gap-2 mt-auto">
        <strong className="mt-auto text-foreground-600">{title}</strong>
        <p className="text-sm text-foreground-600">{description}</p>
        <Progress
          aria-label={`${title}-progress`}
          value={getProgress(history, completedAchievements) * 100}
        />
      </span>
    </Card>
  );
}

export default function Achivements() {
  return (
    <Base>
      <div className="flex flex-col p-6 gap-2 overflow-auto">
        <h1 className="text-[28px] font-bold text-foreground-700">
          Conquistas
        </h1>
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
