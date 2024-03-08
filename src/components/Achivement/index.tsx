import { useContext, useEffect, useState } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  Modal,
  ModalBody,
  ModalContent,
  Progress,
  useDisclosure,
} from "@nextui-org/react";

import { AchivementsContext } from "@/context/achivements";

import { Achivement as AchivementType } from "@/utils/achievements";

export default function Achivement({
  id,
  title,
  description,
  getProgress,
  badge,
}: AchivementType) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { history, completedAchievements } = useContext(AchivementsContext);

  const [wasCompleted, setWasCompleted] = useState(
    completedAchievements.includes(id)
  );

  useEffect(() => {
    setWasCompleted(completedAchievements.includes(id));
  }, [completedAchievements]);

  return (
    <>
      <Card isPressable onClick={onOpen} className="flex flex-col p-4">
        <Image
          src={badge.image.smallUrl}
          width={80}
          height={80}
          alt={badge.image.alt}
          className={`rounded-full bg-foreground-200 mb-4 ${
            wasCompleted ? "" : "grayscale"
          }`}
          quality={40}
        />

        <span className="flex flex-col gap-2 text-start">
          <strong className="mt-auto text-foreground-600">{title}</strong>
          <p className="text-sm text-foreground-600">{description}</p>
          <Progress
            aria-label={`${title}-progress`}
            value={getProgress(history, completedAchievements) * 100}
          />
        </span>
      </Card>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody className="flex flex-col items-center my-8">
                <motion.span layoutId={String(id)}>
                  <Image
                    src={badge.image.url}
                    width={400}
                    height={400}
                    alt={badge.image.alt}
                    className={`rounded-md shadow-xl transition-all mt-2 ${
                      wasCompleted ? "" : "grayscale"
                    }`}
                    quality={100}
                    priority
                  />
                </motion.span>

                <span className="flex flex-col justify-center text-center mt-4">
                  <strong className="text-center text-3xl text-foreground-700">
                    {title}
                  </strong>
                  <p className="text-medium text-foreground-500">
                    {description}
                  </p>
                </span>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
