import { useForm } from "react-hook-form";
import generator from "generate-password";
import { useDisclosure } from "@nextui-org/react";

import { generatePassword, generatePassword2 } from "@/utils/passwd";

import { Input as InputType } from "../NewPasswordForm";
import { useEffect, useState } from "react";

type Inputs = {
  eg1TypedPassword1: string;
  eg1TypedPassword2: string;
  eg2TypedPassword1: string;
  eg2TypedPassword2: string;
  btTypedPassword1: string;
  btTypedPassword2: string;
};

type Props = {
  onFinishTest: () => void;
};

export const passwordConfig = {
  length: 16,
  lowercase: true,
  numbers: true,
  symbols: true,
  uppercase: true,
};

export const usePasswordMemoryTestViewModel = ({ onFinishTest }: Props) => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const [eg2Password1, setEg2Password1] = useState<string | null>(null);
  const [eg2Password2, setEg2Password2] = useState<string | null>(null);
  const btPassword1 = generator.generate(passwordConfig);
  const btPassword2 = generator.generate(passwordConfig);

  const { register, handleSubmit, getValues } = useForm<Inputs>();

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();

  const [step, setStep] = useState(0);
  const [eg1Password1, setEg1Password1] = useState<string | undefined>();
  const [eg1Password2, setEg1Password2] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  function changeEg2Password1() {
    setEg2Password1(generatePassword2().password);
  }
  function changeEg2Password2() {
    setEg2Password2(generatePassword2().password);
  }

  function onFinish1(words: InputType[], numbers: InputType[]) {
    const password = generatePassword(
      words.map((w) => w.value),
      numbers.map((n) => Number(n.value))
    );
    if (password.password) setEg1Password1(password.password.slice(0, 16));
    onClose1();
  }

  function onFinish2(words: InputType[], numbers: InputType[]) {
    const password = generatePassword(
      words.map((w) => w.value),
      numbers.map((n) => Number(n.value))
    );
    if (password.password) setEg1Password2(password.password.slice(0, 16));
    onClose2();
  }

  async function onSubmit({
    btTypedPassword1,
    btTypedPassword2,
    eg1TypedPassword1,
    eg1TypedPassword2,
    eg2TypedPassword1,
    eg2TypedPassword2,
  }: Inputs) {
    try {
      setLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/memory-tests`, {
        method: "POST",
        body: JSON.stringify({
          data: {
            eg1Password1,
            eg1Password2,
            eg2Password1,
            eg2Password2,
            btPassword1,
            btPassword2,
            eg1TypedPassword1,
            eg1TypedPassword2,
            eg2TypedPassword1,
            eg2TypedPassword2,
            btTypedPassword1,
            btTypedPassword2,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_KEY}`,
        },
      });
      onFinishTest();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (eg1Password1 && eg1Password2 && eg2Password1 && eg2Password2)
      setStep((s) => s + 1);
  }, [eg1Password1, eg1Password2]);

  return {
    isDevelopment,
    eg2Password1,
    eg2Password2,
    register,
    handleSubmit,
    getValues,
    isOpen1,
    onOpen1,
    onOpenChange1,
    isOpen2,
    onOpen2,
    onOpenChange2,
    step,
    setStep,
    loading,
    onFinish1,
    onFinish2,
    onSubmit,
    eg1Password1,
    eg1Password2,
    btPassword1,
    btPassword2,
    changeEg2Password1,
    setEg2Password1,
    changeEg2Password2,
    setEg2Password2,
  };
};
