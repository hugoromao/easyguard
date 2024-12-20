"use client";

import React, { useState } from "react";

import { Button, Card, Input, Radio, RadioGroup } from "@nextui-org/react";

import questionsData from "./questions.json";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";

type QuestionProps = {
  id: number;
  question: string;
  register: UseFormRegister<FieldValues>;
};

const Question = ({ id, question, register }: QuestionProps) => {
  return (
    <Card className="p-4">
      <p className="mb-2">{`${id} - ${question}`}</p>
      <RadioGroup name={`qo${id}`}>
        <Radio value="true" {...register(`qo${id}`, { required: true })}>
          Verdadeiro
        </Radio>
        <Radio value="false" {...register(`qo${id}`, { required: true })}>
          Falso
        </Radio>
      </RadioGroup>
    </Card>
  );
};

type StrongPasswordKnowledTestProps = {
  onFinishTest: () => void;
};

const StrongPasswordKnowledTest = ({
  onFinishTest,
}: StrongPasswordKnowledTestProps) => {
  const { register, handleSubmit, formState } = useForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/strong-password-knowledge-tests`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_KEY}`,
          },
          method: "POST",
          body: JSON.stringify({ data }),
        }
      ).then((r) => r.json());
      onFinishTest();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col gap-2 py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-bold text-2xl">
        Teste de conhecimento sobre senhas fortes
      </h1>

      <p>Nome completo</p>
      <Input placeholder="Digite aqui" {...register("name")} />

      <strong className="mt-4">Questão discursiva</strong>
      <p>
        Crie uma senha que você considere forte e adequada para utilizar no seu
        dia a dia.
      </p>
      <Input placeholder="Digite aqui" {...register("qd1")} />

      <p>Justifique por quais motivos essa senha é forte.</p>
      <Input placeholder="Digite aqui" {...register("qd2")} />

      <strong className="mt-4">Questões objetivas</strong>
      <p>Responda com verdadeiro ou falso.</p>

      {questionsData.map(({ id, question }) => (
        <Question key={id} id={id} question={question} register={register} />
      ))}

      <Button
        isDisabled={!formState.isValid}
        color={formState.isValid ? "primary" : "default"}
        type="submit"
        variant="solid"
        isLoading={loading}
      >
        Próximo
      </Button>
    </form>
  );
};

export default StrongPasswordKnowledTest;
