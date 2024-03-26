"use client";
import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";
import { CustomContentProps, SnackbarContent } from "notistack";

import { GlobalContext } from "@/context/global";
import { achievements } from "@/utils/achievements";
import Link from "next/link";

interface AchivementSnackProps extends CustomContentProps {}

// eslint-disable-next-line react/display-name
const AchivementSnack = React.forwardRef<HTMLDivElement, AchivementSnackProps>(
  (props, ref) => {
    const [title, message] = String(props.message).split(":");
    const [achivement] = useState(achievements.find((a) => a.title === title));
    const { goParty } = useContext(GlobalContext);

    useEffect(() => {
      goParty();
    }, []);

    if (achivement === undefined) return null;

    return (
      <SnackbarContent ref={ref} role="alert">
        <Link href="/achivements" className="mx-auto">
          <div className="flex items-center gap-4 bg-white flex-1 px-6 py-4 rounded-lg shadow-2xl">
            <Image
              src={achivement.badge.image.url}
              width={60}
              height={60}
              alt="achievement"
            />
            <span>
              <strong className="text-medium text-neutral-700">{title}</strong>
              <p className="text-medium text-neutral-400">{message}</p>
            </span>
          </div>
        </Link>
      </SnackbarContent>
    );
  }
);

export default AchivementSnack;
