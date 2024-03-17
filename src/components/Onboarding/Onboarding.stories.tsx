import type { Meta, StoryObj } from "@storybook/react";

import Onboarding from ".";

const meta: Meta<typeof Onboarding> = {
  component: Onboarding,
};

export default meta;

type Story = StoryObj<typeof Onboarding>;

export const Primary: Story = {
  parameters: {
    viewport: {
      defaultViewport: "Android Small",
    },
  },
};
