import { useContext, useEffect, useState } from "react";

import Image from "next/image";
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
          src={wasCompleted ? badge.image.smallUrl : badge.image.pixelated}
          width={80}
          height={80}
          alt={badge.image.alt}
          className={`rounded-full bg-foreground-200 mb-4 ${
            wasCompleted ? "" : "grayscale"
          }`}
          placeholder="blur"
          blurDataURL={badge.image.blurredUrl}
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
                <Image
                  src={wasCompleted ? badge.image.url : badge.image.pixelated}
                  width={400}
                  height={400}
                  placeholder="blur"
                  blurDataURL={badge.image.blurredUrl}
                  alt={badge.image.alt}
                  quality={100}
                  className={`rounded-md shadow-xl transition-all mt-2 ${
                    wasCompleted ? "" : "grayscale"
                  }`}
                />

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
