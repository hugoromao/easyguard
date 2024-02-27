"use client";
import React from "react";

import { SnackbarProvider } from "notistack";
import { NextUIProvider } from "@nextui-org/react";
import { GlobalProvider } from "@/context/global";

import { ClientOnly } from "@/components/ClientOnly";

const Contexts = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientOnly>
      <GlobalProvider>{children}</GlobalProvider>
    </ClientOnly>
  );
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
