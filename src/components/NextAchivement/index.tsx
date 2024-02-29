import React, { useContext, useEffect, useState } from "react";
import { Card, CircularProgress } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";

import { GlobalContext } from "@/context/global";
import { Achivement, achievements } from "@/context/achievements";

const NextAchivement = () => {
  const { completedAchievements, history } = useContext(GlobalContext);

  const [nextAchivement, setNextAchivement] = useState<Achivement | undefined>(
    achievements.find((a) => !completedAchievements.includes(a.id))
  );

  function setRandomAchivement() {
    const unfinishedAchivements = achievements.filter(
      (a) => !completedAchievements.includes(a.id)
    );

    if (unfinishedAchivements.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * unfinishedAchivements.length
      );
      const randomAchievement = unfinishedAchivements[randomIndex];
      setNextAchivement(randomAchievement);
    }
  }

  useEffect(() => {
    setInterval(setRandomAchivement, 6000);
  }, [0]);

  if (nextAchivement === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-500">Próximas conquistas</p>
      <Card>
        <AnimatePresence mode="wait">
          <motion.div
            key={nextAchivement.id}
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-[auto_1fr] items-center gap-4 p-4"
          >
            <CircularProgress
              aria-label="next-achivement-progress"
              classNames={{
                svg: "w-24 h-24",
                value: "text-lg font-bold text-foreground-700",
              }}
              value={
                nextAchivement.getProgress(history, completedAchievements) * 100
              }
              color="primary"
              showValueLabel={true}
            />
            <span>
              <strong className="text-foreground-700">
                {nextAchivement.title}
              </strong>
              <p className="text-foreground-700">
                {nextAchivement.description}
              </p>
            </span>
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default NextAchivement;
