"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

import { generatePassword } from "@/utils/passwd";

const GeneratePassword = ({
  searchParams: { numbers, words },
}: {
  searchParams: { words: string; numbers: string };
}) => {
  const receivedWords: string[] = JSON.parse(words);
  const receivedNumbers: number[] = JSON.parse(numbers);

  const [password, setPassword] = useState<undefined | string>(
    generatePassword(receivedWords, receivedNumbers)
  );

  const [isClient, setIsClient] = useState(false);

  function regeneratePassword() {
    setPassword(generatePassword(receivedWords, receivedNumbers));
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient)
    return (
      <div>
        <p>Sua senha é:</p>
        <p>{password}</p>

        <Button onClick={regeneratePassword}>Gerar Novamente</Button>
      </div>
    );

  return null;
};

export default GeneratePassword;
