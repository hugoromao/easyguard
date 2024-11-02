import { useDisclosure } from "@nextui-org/react";
import generator from "generate-password";
import { generatePassword, generatePassword2 } from "@/utils/passwd";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input as InputType } from "../NewPasswordForm";
import { passwordConfig } from "../PasswordMemoryTest/viewmodel";

export type PasswordTypeInfo = {
  timestamp: { start: number | null; end: number | null };
  backspaceCount: number;
};

export type Inputs = {
  eg1TypedPassword1: string;
  eg1TypedPassword2: string;
  eg1TypedPassword3: string;
  eg1TypedPassword4: string;
  eg1TypedPassword5: string;
  eg2TypedPassword1: string;
  eg2TypedPassword2: string;
  eg2TypedPassword3: string;
  eg2TypedPassword4: string;
  eg2TypedPassword5: string;
  btTypedPassword1: string;
  btTypedPassword2: string;
  btTypedPassword3: string;
  btTypedPassword4: string;
  btTypedPassword5: string;
};

type Props = {
  onFinishTest: () => void;
};

export const useTypingTestViewModel = ({ onFinishTest }: Props) => {
  const [btPassword] = useState(generator.generate(passwordConfig));

  const { register, handleSubmit, getValues } = useForm<Inputs>();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [eg1Password1, setEg1Password1] = useState<string | undefined>();
  const [eg2Password1, setEg2Password1] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  function onCompletedNewPasswordForm(
    words: InputType[],
    numbers: InputType[]
  ) {
    const password = generatePassword(
      words.map((w) => w.value),
      numbers.map((n) => Number(n.value))
    );
    if (password.password) setEg1Password1(password.password.slice(0, 16));
    onClose();
  }

  async function onSubmit(data: Inputs) {
    try {
      setLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/typing-tests`, {
        method: "POST",
        body: JSON.stringify({
          data: {
            eg1Password1,
            eg2Password1,
            btPassword,
            passwordsInfo: {
              eg1Password1Info,
              eg1Password2Info,
              eg1Password3Info,
              eg1Password4Info,
              eg1Password5Info,
              eg2Password1Info,
              eg2Password2Info,
              eg2Password3Info,
              eg2Password4Info,
              eg2Password5Info,
              btPassword1Info,
              btPassword2Info,
              btPassword3Info,
              btPassword4Info,
              btPassword5Info,
            },
            ...data,
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

  function changeEg2Password1() {
    setEg2Password1(generatePassword2().password);
  }

  useEffect(() => {
    if (eg1Password1 && eg2Password1) setStep((s) => s + 1);
  }, [eg1Password1, eg2Password1]);

  const defaultPasswordInfo: PasswordTypeInfo = {
    backspaceCount: 0,
    timestamp: { start: null, end: null },
  };

  const [eg1Password1Info, setEg1Password1Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [eg1Password2Info, setEg1Password2Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [eg1Password3Info, setEg1Password3Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [eg1Password4Info, setEg1Password4Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [eg1Password5Info, setEg1Password5Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);

  const [eg2Password1Info, setEg2Password1Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [eg2Password2Info, setEg2Password2Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [eg2Password3Info, setEg2Password3Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [eg2Password4Info, setEg2Password4Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [eg2Password5Info, setEg2Password5Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);

  const [btPassword1Info, setBtPassword1Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [btPassword2Info, setBtPassword2Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [btPassword3Info, setBtPassword3Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [btPassword4Info, setBtPassword4Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);
  const [btPassword5Info, setBtPassword5Info] =
    useState<PasswordTypeInfo>(defaultPasswordInfo);

  return {
    register,
    handleSubmit,
    getValues,
    isOpen,
    onOpen,
    onOpenChange,
    loading,
    step,
    setStep,
    onCompletedNewPasswordForm,
    onSubmit,
    changeEg2Password1,
    eg2Password1,
    setEg2Password1,
    eg1Password1,
    setEg1Password1,
    btPassword,
    eg1Password1Info,
    setEg1Password1Info,
    eg1Password2Info,
    setEg1Password2Info,
    eg1Password3Info,
    setEg1Password3Info,
    eg1Password4Info,
    setEg1Password4Info,
    eg1Password5Info,
    setEg1Password5Info,
    eg2Password1Info,
    setEg2Password1Info,
    eg2Password2Info,
    setEg2Password2Info,
    eg2Password3Info,
    setEg2Password3Info,
    eg2Password4Info,
    setEg2Password4Info,
    eg2Password5Info,
    setEg2Password5Info,
    btPassword1Info,
    setBtPassword1Info,
    btPassword2Info,
    setBtPassword2Info,
    btPassword3Info,
    setBtPassword3Info,
    btPassword4Info,
    setBtPassword4Info,
    btPassword5Info,
    setBtPassword5Info,
  };
};
