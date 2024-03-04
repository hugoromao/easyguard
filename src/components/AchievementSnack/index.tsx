"use client";
import React, { useContext, useEffect } from "react";
import { CustomContentProps, SnackbarContent } from "notistack";
import Image from "next/image";
import { GlobalContext } from "@/context/global";

interface AchivementSnackProps extends CustomContentProps {}

// eslint-disable-next-line react/display-name
const AchivementSnack = React.forwardRef<HTMLDivElement, AchivementSnackProps>(
  (props, ref) => {
    const [title, message] = String(props.message).split(":");
    const { goParty } = useContext(GlobalContext);

    useEffect(() => {
      goParty();
    }, []);

    return (
      <SnackbarContent ref={ref} role="alert">
        <div className="flex items-center gap-4 bg-white flex-1 px-6 py-4 rounded-lg shadow-2xl">
          <Image
            src="/profile.png"
            width={60}
            height={60}
            alt="achievement"
            className="rounded-full"
          />

          <span>
            <strong className="text-medium text-neutral-700">{title}</strong>
            <p className="text-medium text-neutral-400">{message}</p>
          </span>
        </div>
      </SnackbarContent>
    );
  }
);

export default AchivementSnack;
