import React, { useState } from "react";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { Suez_One } from "next/font/google";

import Icon from "./icon.png";
import IconLarge from "./icon-512x512.png";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { steps } from "./steps";
import { useLocalStorage } from "@uidotdev/usehooks";

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
          <motion.div layoutId="logo" className="shadow-sm">
            <Image
              src={Icon}
              width={45}
              height={45}
              priority
              alt="Icone do aplicativo"
            />
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
        className={`h-full flex flex-col gap-2 mb-10 justify-end ${
          isLastStep ? "text-center items-center justify-center" : ""
        }`}
      >
        {activeStep === 0 ? (
          <motion.div
            layoutId="logo"
            className="self-center mb-6 shadow-lg m-auto"
          >
            <Image
              priority
              src={IconLarge}
              width={200}
              height={200}
              alt="Icone do aplicativo"
              className="rounded-large"
            />
          </motion.div>
        ) : null}

        {isLastStep ? (
          <motion.div layoutId="logo" className="shadow-sm">
            <Image
              src={Icon}
              width={45}
              height={45}
              priority
              alt="Icone do aplicativo"
            />
          </motion.div>
        ) : null}

        <AnimatePresence mode="wait">
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
            className="text-white text-lg"
          >
            {steps[activeStep].description}
          </motion.p>

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

      <footer className="flex justify-between items-center">
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

        {!isLastStep ? (
          <Button
            isIconOnly
            className="bg-[#84E1A1]"
            size="lg"
            onPress={() => setActiveStep((s) => s + 1)}
          >
            <ArrowRightIcon height={24} fill="#095028" />
          </Button>
        ) : null}

        {isLastStep ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-sm text-center text-[#FFFFFF]"
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
