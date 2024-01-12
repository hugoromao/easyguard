import "../src/app/globals.css";

import type { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const customViewports = {
  "Android Small": {
    name: "Android Small",
    styles: {
      width: "360px",
      height: "640px",
    },
  },
};

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: { ...INITIAL_VIEWPORTS, ...customViewports },
      defaultViewport: "Android Small",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
