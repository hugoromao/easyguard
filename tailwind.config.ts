import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              "50": "#ecfdf5",
              "100": "#d1fae5",
              "200": "#a7f3d0",
              "300": "#6ee7b7",
              "400": "#34d399",
              "500": "#10b981",
              "600": "#059669",
              "700": "#047857",
              "800": "#065f46",
              "900": "#064e3b",
              foreground: "#FFFFFF",
              DEFAULT: "#10b981",
            },
          },
        },
      },
    }),
  ],
};
export default config;
