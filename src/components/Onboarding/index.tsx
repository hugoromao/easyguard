import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { Suez_One } from "next/font/google";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useLocalStorage } from "@uidotdev/usehooks";

import { steps } from "./steps";
import Image from "next/image";
import { isAndroid, isIOS } from "react-device-detect";

const suezOne = Suez_One({ weight: ["400"], subsets: ["latin"] });

const Onboarding = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setShowOnboarding] = useLocalStorage("showOnboarding", true);

  const [activeStep, setActiveStep] = useState(0);

  const pageTransitionDuraiton = 0.3;

  const isPenultimateStep = activeStep === steps.length - 2;
  const isLastStep = activeStep === steps.length - 1;

  function finishOnboarding() {
    setShowOnboarding(false);
  }

  return (
    <main className="flex flex-col p-6 h-screen bg-[#185449]">
      <header className="flex justify-between items-center">
        {activeStep !== 0 && !isLastStep ? (
          <motion.div
            layoutId="logo"
            className="flex items-center justify-center w-[45px] h-[45px] shadow-sm bg-[#008065] rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="32"
              height="32"
              fill="#ffffff"
            >
              <path d="m8.533.133 5.25 1.68A1.75 1.75 0 0 1 15 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 0 1-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 0 1 1.217-1.667l5.25-1.68a1.748 1.748 0 0 1 1.066 0Zm-.61 1.429.001.001-5.25 1.68a.251.251 0 0 0-.174.237V7c0 1.36.275 2.666 1.057 3.859.784 1.194 2.121 2.342 4.366 3.298a.196.196 0 0 0 .154 0c2.245-.957 3.582-2.103 4.366-3.297C13.225 9.666 13.5 8.358 13.5 7V3.48a.25.25 0 0 0-.174-.238l-5.25-1.68a.25.25 0 0 0-.153 0ZM9.5 6.5c0 .536-.286 1.032-.75 1.3v2.45a.75.75 0 0 1-1.5 0V7.8A1.5 1.5 0 1 1 9.5 6.5Z"></path>
            </svg>
          </motion.div>
        ) : (
          <div />
        )}

        {!isLastStep ? (
          <Button
            variant="light"
            color="primary"
            className="p-0"
            size="sm"
            onPress={finishOnboarding}
          >
            Pular
          </Button>
        ) : null}
      </header>

      <section
        className={`h-full flex flex-col gap-2 mb-10 justify-end w-full max-w-2xl self-center ${
          isLastStep ? "text-center items-center justify-center" : ""
        }`}
      >
        {activeStep === 0 ? (
          <motion.div
            layoutId="logo"
            className="flex items-center justify-center w-[200px] h-[200px] self-center mb-6 shadow-lg m-auto bg-[#008065] rounded-large"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="160"
              height="160"
              fill="#ffffff"
            >
              <path d="m8.533.133 5.25 1.68A1.75 1.75 0 0 1 15 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 0 1-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 0 1 1.217-1.667l5.25-1.68a1.748 1.748 0 0 1 1.066 0Zm-.61 1.429.001.001-5.25 1.68a.251.251 0 0 0-.174.237V7c0 1.36.275 2.666 1.057 3.859.784 1.194 2.121 2.342 4.366 3.298a.196.196 0 0 0 .154 0c2.245-.957 3.582-2.103 4.366-3.297C13.225 9.666 13.5 8.358 13.5 7V3.48a.25.25 0 0 0-.174-.238l-5.25-1.68a.25.25 0 0 0-.153 0ZM9.5 6.5c0 .536-.286 1.032-.75 1.3v2.45a.75.75 0 0 1-1.5 0V7.8A1.5 1.5 0 1 1 9.5 6.5Z"></path>
            </svg>
          </motion.div>
        ) : null}

        {isLastStep ? (
          <motion.div
            layoutId="logo"
            className="flex items-center justify-center w-[45px] h-[45px] shadow-sm bg-[#008065] rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="32"
              height="32"
              fill="#ffffff"
            >
              <path d="m8.533.133 5.25 1.68A1.75 1.75 0 0 1 15 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 0 1-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 0 1 1.217-1.667l5.25-1.68a1.748 1.748 0 0 1 1.066 0Zm-.61 1.429.001.001-5.25 1.68a.251.251 0 0 0-.174.237V7c0 1.36.275 2.666 1.057 3.859.784 1.194 2.121 2.342 4.366 3.298a.196.196 0 0 0 .154 0c2.245-.957 3.582-2.103 4.366-3.297C13.225 9.666 13.5 8.358 13.5 7V3.48a.25.25 0 0 0-.174-.238l-5.25-1.68a.25.25 0 0 0-.153 0ZM9.5 6.5c0 .536-.286 1.032-.75 1.3v2.45a.75.75 0 0 1-1.5 0V7.8A1.5 1.5 0 1 1 9.5 6.5Z"></path>
            </svg>
          </motion.div>
        ) : null}

        <AnimatePresence mode="wait">
          <motion.div
            key={`img-${activeStep}`}
            initial={{ x: 5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -5, opacity: 0 }}
          >
            {steps[activeStep]?.img ? (
              <Image
                src={steps[activeStep].img!}
                width={280}
                height={280}
                quality={80}
                alt={steps[activeStep].title}
                className="mx-auto"
              />
            ) : null}
          </motion.div>

          <motion.h1
            key={`title-${activeStep}`}
            layoutId={`title-${activeStep}`}
            initial={!isLastStep ? { x: 5, opacity: 0 } : { opacity: 0 }}
            animate={!isLastStep ? { x: 0, opacity: 1 } : { opacity: 1 }}
            exit={!isPenultimateStep ? { x: -5, opacity: 0 } : { opacity: 0 }}
            transition={{ duration: pageTransitionDuraiton }}
            style={suezOne.style}
            className="text-white text-4xl"
          >
            {steps[activeStep].title}
          </motion.h1>
          <motion.p
            key={`description-${activeStep}`}
            layoutId={`description-${activeStep}`}
            initial={!isLastStep ? { x: 5, opacity: 0 } : { opacity: 0 }}
            animate={!isLastStep ? { x: 0, opacity: 1 } : { opacity: 1 }}
            exit={!isPenultimateStep ? { x: -5, opacity: 0 } : { opacity: 0 }}
            transition={{ duration: pageTransitionDuraiton }}
            className="text-white text-lg max-w-96"
          >
            {steps[activeStep].description}
          </motion.p>

          {activeStep === 3 ? (
            <>
              {isAndroid ? (
                <a
                  href="https://play.google.com/store/apps/details?id=com.x8bit.bitwarden"
                  target="_blank"
                >
                  <Button color="secondary">Baixar BitWarden</Button>
                </a>
              ) : null}

              {isIOS ? (
                <a
                  href="https://apps.apple.com/br/app/bitwarden-password-manager/id1137397744"
                  target="_blank"
                >
                  <Button color="secondary">Baixar BitWarden</Button>
                </a>
              ) : null}

              {!isAndroid && !isIOS ? (
                <a href="https://bitwarden.com/download/" target="_blank">
                  <Button color="secondary">Baixar BitWarden</Button>
                </a>
              ) : null}
            </>
          ) : null}

          {isLastStep ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2"
            >
              <Button
                variant="solid"
                color="primary"
                className="bg-[#84E1A1] text-[#095028]"
                onPress={finishOnboarding}
              >
                VAMOS COMEÇAR!
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>

      <footer className="flex justify-between items-center w-full max-w-2xl self-center">
        {!isLastStep ? (
          <span className="flex gap-[6px]">
            {steps.map((s, index) => (
              <motion.div
                key={s.title}
                layoutId={s.title}
                transition={{ duration: pageTransitionDuraiton }}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full  ${
                  activeStep === index ? "w-7 bg-[#84E1A1]" : "w-2 bg-[#749892]"
                }`}
              />
            ))}
          </span>
        ) : null}

        <span className="flex gap-4">
          {activeStep !== 0 && !isLastStep ? (
            <Button
              isIconOnly
              size="lg"
              variant="light"
              onPress={() => setActiveStep((s) => s - 1)}
            >
              <ArrowLeftIcon height={24} color="#10b981" />
            </Button>
          ) : null}

          {!isLastStep ? (
            <Button
              isIconOnly
              className="bg-[#84E1A1]"
              size="lg"
              onPress={() => setActiveStep((s) => s + 1)}
            >
              <ArrowRightIcon height={24} color="#095028" />
            </Button>
          ) : null}
        </span>

        {isLastStep ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-sm text-center text-[#FFFFFF] mx-auto"
          >
            Você pode ver este tutorial novemente a partir da tela de
            configurações
          </motion.p>
        ) : null}
      </footer>
    </main>
  );
};

export default Onboarding;
