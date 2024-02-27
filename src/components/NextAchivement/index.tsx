import { achievements } from "@/context/achievements";
import { GlobalContext } from "@/context/global";
import { Card, CircularProgress } from "@nextui-org/react";
import React, { useContext } from "react";

const NextAchivement = () => {
  const { completedAchievements, history } = useContext(GlobalContext);
  const nextAchivement = achievements.find(
    (a) => !completedAchievements.includes(a.id)
  );

  if (!nextAchivement) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-500">Próxima conquista</p>
      <Card className="grid grid-flow-col items-center gap-4 p-4">
        <CircularProgress
          aria-label="next-achivement-progress"
          classNames={{
            svg: "w-24 h-24",
            value: "text-lg font-bold text-foreground-700",
          }}
          value={nextAchivement.getProgress(history) * 100}
          color="primary"
          showValueLabel={true}
        />

        <span>
          <strong className="text-foreground-700">
            {nextAchivement.title}
          </strong>
          <p className="text-foreground-700">{nextAchivement.description}</p>
        </span>
      </Card>
    </div>
  );
};

export default NextAchivement;
