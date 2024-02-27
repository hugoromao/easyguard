"use client";
import React, { useContext, useEffect } from "react";
import { CustomContentProps, SnackbarContent } from "notistack";
import Image from "next/image";
import { GlobalContext } from "@/context/global";

interface ReportCompleteProps extends CustomContentProps {}

// eslint-disable-next-line react/display-name
const ReportComplete = React.forwardRef<HTMLDivElement, ReportCompleteProps>(
  (props, ref) => {
    const { message } = props;
    const { goParty } = useContext(GlobalContext);

    useEffect(() => {
      goParty();
    }, []);

    return (
      <SnackbarContent ref={ref} role="alert">
        <div className="flex items-center gap-4 bg-white flex-1 px-6 py-4 rounded-lg shadow-2xl mb-[70px]">
          <Image
            src="/profile.png"
            width={60}
            height={60}
            alt="achievement"
            className="rounded-full"
          />

          <span>
            <strong className="text-medium text-neutral-700">
              Conquista alcançada!
            </strong>
            <p className="text-medium text-neutral-400">{message}</p>
          </span>
        </div>
      </SnackbarContent>
    );
  }
);

export default ReportComplete;
