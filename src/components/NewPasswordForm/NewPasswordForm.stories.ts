import type { Meta, StoryObj } from "@storybook/react";

import NewPasswordForm from ".";

const meta: Meta<typeof NewPasswordForm> = {
  component: NewPasswordForm,
};

export default meta;

type Story = StoryObj<typeof NewPasswordForm>;

export const Primary: Story = {};
