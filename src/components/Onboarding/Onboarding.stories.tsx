import type { Meta, StoryObj } from "@storybook/react";

import Onboarding from ".";

const meta: Meta<typeof Onboarding> = {
  component: Onboarding,
};

export default meta;

type Story = StoryObj<typeof Onboarding>;

export const Primary: Story = {
  args: {
    steps: [
      {
        title: "Sua segurança vale o esforço",
        description:
          "Proteja suas contas online com nosso gerador de senhas seguras e memoráveis.",
      },
      {
        title: "Segurança em primeiro lugar",
        description:
          "Nosso algoritmo de geração é baseado em métodos científicos amplamente testados.",
      },
      {
        title: "Compartilhe suas Conquistas",
        description:
          "Desenvolva comportamentos seguros enquanto se diverte completando os desafios.",
      },
      {
        title: "Melhor ainda com um gerenciador",
        description:
          "Utilize nossa solução juntamente com o gerenciador de senhas Bitwarden.",
      },
      {
        title: "",
        description:
          "Sua jornada para uma presença online mais segura começa com um simples clique.",
      },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: "Android Small",
    },
  },
};
