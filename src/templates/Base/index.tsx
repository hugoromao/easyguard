import React from "react";

import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

type BaseProps = {
  children: React.ReactNode;
};

const Base = ({ children }: BaseProps) => {
  return (
    <body
      style={inter.style}
      className="h-screen grid grid-rows-[1fr_auto]"
    >
      {children}
      <Navbar />
    </body>
  );
};

export default Base;
