"use client";
import React from "react";

import { SnackbarProvider } from "notistack";
import { NextUIProvider } from "@nextui-org/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <SnackbarProvider />
      {children}
    </NextUIProvider>
  );
};

export default Providers;
