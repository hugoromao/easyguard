"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, Skeleton } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

const delay = 12000;

const tips = [
  "Mesmo que uma senha seja considerada forte, é aconselhável que o usuário a troque periodicamente.",
  "Um dos principais requisitos para que uma senha seja forte é o seu tamanho (número de caracteres).",
  "Para garantir a segurança de uma senha, é essencial evitar incluir informações pessoais.",
  "Senhas com frases longas são mais fáceis de memorizar e são mais seguras por causa de seu tamanho.",
  'Evite usar a mesma senha em várias contas. Utilize um <a href="https://bitwarden.com/download/" class="text-blue-500 font-semibold underline">gerenciador de senhas</a>.',
  "Não utilize padrões de teclado em suas senhas (Ex. QWERTY).",
  "Sob nenhuma hipótese compartilhe suas senhas, mesmo com conhecidos ou familiares.",
  "O requisito mais importante para uma senha é seu tamanho.",
  "Frases longas são ótimas senhas.",
  "Nunca anote suas senhas em papéis ou aplicativos de conversa. Use sempre um gerenciador de senhas.",
  "Senha curtas(Ex: 9g*E[&), independente dos caracteres escolhidos, são totalmente inseguras.",
  "Uma senha pode ser constituida apenas por letras, desde que seja longa o suficiente. Por exemplo, uma senha com 16 caracteres.",
];

const Tips = () => {
  const [tipIndex, setTipIndex] = useState(-1);
  const intervalId = useRef<number | null>(null);

  function getNewTip() {
    const newIndex = Math.floor(Math.random() * tips.length);
    setTipIndex(newIndex);
  }

  useEffect(() => {
    getNewTip();
    intervalId.current = window.setInterval(getNewTip, delay);

    return () => clearInterval(intervalId.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (tipIndex === -1)
    return (
      <Skeleton aria-label="loading-tips" className="h-40 rounded-medium" />
    );

  function changeTip() {
    if (intervalId !== null) {
      clearInterval(Number(intervalId.current));

      getNewTip();
      intervalId.current = window.setInterval(getNewTip, delay);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-500">Você sabia?</p>
      <Card
        className="grid grid-flow-col items-center justify-start gap-4 p-4"
        isPressable
        onPress={changeTip}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 3C11.274 3 8 6.38 8 10.5C8 12.468 8.848 13.75 9.968 15.108L10.396 15.614C10.842 16.142 11.336 16.726 11.742 17.31C12.31 18.132 12.816 19.102 12.984 20.29C13.024 20.6759 12.913 21.0623 12.6741 21.3681C12.4353 21.6739 12.0873 21.8752 11.7032 21.9299C11.319 21.9845 10.9287 21.8881 10.6141 21.661C10.2995 21.4339 10.0851 21.0938 10.016 20.712C9.936 20.148 9.69 19.618 9.276 19.018C8.93823 18.5464 8.57642 18.0924 8.192 17.658C8.024 17.458 7.846 17.248 7.656 17.018C6.402 15.5 5 13.532 5 10.5C5 4.62 9.726 0 16 0C22.274 0 27 4.62 27 10.5C27 13.532 25.598 15.5 24.344 17.018C24.154 17.248 23.976 17.458 23.808 17.656C23.394 18.146 23.042 18.562 22.726 19.018C22.31 19.618 22.066 20.148 21.986 20.712C21.9123 21.09 21.6961 21.4252 21.3823 21.6484C21.0684 21.8716 20.6808 21.9657 20.2995 21.9113C19.9183 21.8569 19.5725 21.6581 19.3336 21.356C19.0947 21.0539 18.981 20.6715 19.016 20.288C19.184 19.102 19.69 18.132 20.258 17.31C20.664 16.726 21.158 16.142 21.604 15.614C21.754 15.438 21.898 15.268 22.03 15.108C23.152 13.75 24 12.468 24 10.5C24 6.38 20.726 3 16 3ZM11.5 24H20.5C20.8978 24 21.2794 24.158 21.5607 24.4393C21.842 24.7206 22 25.1022 22 25.5C22 25.8978 21.842 26.2794 21.5607 26.5607C21.2794 26.842 20.8978 27 20.5 27H11.5C11.1022 27 10.7206 26.842 10.4393 26.5607C10.158 26.2794 10 25.8978 10 25.5C10 25.1022 10.158 24.7206 10.4393 24.4393C10.7206 24.158 11.1022 24 11.5 24ZM12 30.5C12 30.1022 12.158 29.7206 12.4393 29.4393C12.7206 29.158 13.1022 29 13.5 29H18.5C18.8978 29 19.2794 29.158 19.5607 29.4393C19.842 29.7206 20 30.1022 20 30.5C20 30.8978 19.842 31.2794 19.5607 31.5607C19.2794 31.842 18.8978 32 18.5 32H13.5C13.1022 32 12.7206 31.842 12.4393 31.5607C12.158 31.2794 12 30.8978 12 30.5Z"
            fill="#F7B750"
          />
        </svg>

        <AnimatePresence mode="wait">
          {
            <motion.p
              key={tipIndex}
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              aria-label="tip"
              className="text-foreground-700 text-left"
              dangerouslySetInnerHTML={{ __html: tips[tipIndex] }}
            />
          }
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default Tips;
