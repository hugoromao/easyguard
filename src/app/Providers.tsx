"use client";
import React from "react";

import { SnackbarProvider } from "notistack";
import { NextUIProvider } from "@nextui-org/react";
import { GlobalProvider } from "@/context/global";

const Contexts = ({ children }: { children: React.ReactNode }) => {
  return <GlobalProvider>{children}</GlobalProvider>;
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <SnackbarProvider />
      <Contexts>{children}</Contexts>
    </NextUIProvider>
  );
};

export default Providers;
