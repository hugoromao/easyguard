import { Card, CardBody } from "@nextui-org/react";
import React from "react";

type PasswordStrengthProps = {
  entropy: number;
  passwordLength: number;
};

const PasswordStrength = ({
  entropy,
  passwordLength,
}: PasswordStrengthProps) => {
  const data = [
    {
      activate: (e: number, l: number) => e < 60 || l < 16,
      emoji: "⚠️",
      title: "Sua senha não é segura",
      description:
        "Sua senha não atende aos requisitos mínimos de segurança e pode ser facilmente quebrada. Utilize mais caracteres ou acresente mais palavras na criação da senha.",
    },
    {
      activate: (e: number) => e >= 200,
      emoji: "🎉",
      title: "Sua senha é Incrível!",
      description: `Sua senha possui <strong>${new Intl.NumberFormat(
        "pt-BR"
      ).format(entropy)}</strong> bits de entropia. Use o
      botão de copiar senha para contabilizar suas conquistas.`,
    },
    {
      activate: (e: number) => e >= 60 && e < 200,
      emoji: "🔒",
      title: "Sua senha é forte",
      description: `Sua senha possui <strong>${new Intl.NumberFormat(
        "pt-BR"
      ).format(
        entropy
      )}</strong> bits de entropia. Adicionando mais caracteres sua senha pode ficar ainda mais segura!`,
    },
  ];

  const content = data.find((d) => d.activate(entropy, passwordLength));

  if (content === undefined) return null;

  return (
    <Card>
      <CardBody>
        <span className="flex gap-4 items-center">
          <p style={{ fontSize: 84 }}>{content.emoji}</p>

          <span className="flex flex-col">
            <h3 className="text-xl font-semibold">{content.title}</h3>
            <p
              className="text-medium"
              dangerouslySetInnerHTML={{ __html: content.description }}
            />
          </span>
        </span>
      </CardBody>
    </Card>
  );
};

export default PasswordStrength;
