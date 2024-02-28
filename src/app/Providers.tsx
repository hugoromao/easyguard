"use client";
import React from "react";

import { SnackbarProvider } from "notistack";
import { NextUIProvider } from "@nextui-org/react";
import { GlobalProvider } from "@/context/global";

import { ClientOnly } from "@/components/ClientOnly";
import ReportComplete from "@/components/AchievementSnack";
import { usePathname } from "next/navigation";

const Contexts = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientOnly>
      <GlobalProvider>{children}</GlobalProvider>
    </ClientOnly>
  );
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <NextUIProvider>
      <Contexts>
        <SnackbarProvider
          preventDuplicate
          classes={
            pathname?.includes("generatePassword")
              ? {}
              : { containerRoot: "mb-[64px]" }
          }
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          Components={{ info: ReportComplete }}
        />
        {children}
      </Contexts>
    </NextUIProvider>
  );
};

export default Providers;
