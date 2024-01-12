import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "default-50": "#fafafa",
        "default-100": "#F4F4F5",
        "default-200": "#e4e4e7",
        "default-400": "#A1A1AA",
        "green-50": "#E8FAF0",
        "green-100": "#D1F4E0",
        "green-200": "#A2E9C1",
        "green-300": "#74DFA2",
        "green-400": "#45D483",
        "green-500": "#17C964",
        "green-600": "#12A150",
        "green-700": "#0E793C",
        "green-800": "#095028",
        "green-900": "#095028",
        "green-icon": "#2B403C",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
