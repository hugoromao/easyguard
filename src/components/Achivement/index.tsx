import { useContext, useEffect, useState } from "react";

import Image from "next/image";
import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  Progress,
  useDisclosure,
} from "@nextui-org/react";

import { AchivementsContext } from "@/context/achivements";

import {
  Achivement as AchivementType,
  achievements,
} from "@/utils/achievements";
import { ShareIcon } from "@heroicons/react/20/solid";
import { enqueueSnackbar } from "notistack";

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

  async function copyToClipboard() {
    try {
      const progress = Array(10)
        .fill("⬜")
        .map((_, index) =>
          completedAchievements.includes(index + 1) ? "🟩" : "⬜"
        )
        .join("");

      await navigator.clipboard.writeText(
        `Atingi a conquista “${title}”!🏆\n\n${completedAchievements.length}/${achievements.length} ${progress}\n\nCrie senhas seguras e mais fáceis de lembrar🔑🔒.\nhttps://gamified-password-generator.vercel.app?achv_id=${id}`
      );
      enqueueSnackbar("Copiado p/ área de transferência", {
        variant: "success",
      });
    } catch {
      enqueueSnackbar("Falha ao copiar texto", { variant: "error" });
    }
  }

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

        <span className="flex flex-col gap-2 text-start w-full">
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
                {wasCompleted ? (
                  <strong className="text-md font-bold bg-gradient-to-r from-[#8A2387] via-[#F27121] to-[#E94057] inline-block text-transparent bg-clip-text">
                    CONQUISTA DESBLOQUEADA!
                  </strong>
                ) : (
                  <p className="text-md text-foreground-400">
                    Conquista Bloqueada
                  </p>
                )}
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

                {wasCompleted ? (
                  <Button
                    variant="bordered"
                    color="primary"
                    fullWidth
                    className="mt-2"
                    size="lg"
                    onPress={copyToClipboard}
                    endContent={<ShareIcon height={24} />}
                  >
                    Compartilhe
                  </Button>
                ) : null}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
