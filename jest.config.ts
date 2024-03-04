import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/app/**/layout.{ts,tsx}",
    "src/app/**/page.{ts,tsx}",
    "src/context/**/*.{ts,tsx}",
    "src/components/**/*.{ts,tsx}",
    "src/templates/**/*.{ts,tsx}",
    "src/utils/**/*.{ts,tsx}",
    "!src/stories/**",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
  ],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
