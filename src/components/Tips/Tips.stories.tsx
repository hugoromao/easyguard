import type { Meta, StoryObj } from "@storybook/react";

import Tips from ".";

const meta: Meta<typeof Tips> = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  component: Tips,
  decorators: [
    (Story) => (
      <div className="p-2">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Tips>;

export const Primary: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "Android Small",
    },
  },
};
