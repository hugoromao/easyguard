import type { Meta, StoryObj } from "@storybook/react";

import NewPasswordForm from ".";
import { SnackbarProvider } from "notistack";

const meta: Meta<typeof NewPasswordForm> = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  component: NewPasswordForm,
  decorators: [
    (Story) => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NewPasswordForm>;

export const Primary: Story = { args: { active: true, setActive: () => ({}) } };
