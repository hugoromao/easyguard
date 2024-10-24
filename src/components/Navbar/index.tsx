"use client";
import React, { useContext } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon as SolidHomeIcon,
  GiftIcon as SolidGiftIcon,
  Cog6ToothIcon as SolidCog6ToothIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  GiftIcon as OutlineGiftIcon,
  Cog6ToothIcon as OutlineCog6ToothIcon,
} from "@heroicons/react/24/outline";
import { GlobalContext } from "../../context/global";
import { Tooltip } from "@nextui-org/react";

const Navbar = () => {
  const { onPasswordTypeOpen } = useContext(GlobalContext);

  const pathname = usePathname();

  return (
    <nav className="flex bg-white p-1 justify-center border-t-2 border-default-200 w-full max-w-2xl mx-auto md:rounded-md md:w-fit md:border-none md:shadow-2xl">
      <Tooltip content="Início">
        {pathname === "/" ? (
          <Link href="/" className="p-4 rounded-xl bg-green-50">
            <SolidHomeIcon
              aria-label="home-icon-solid"
              className="h-8 text-blue-icon fill-[#2B403C]"
            />
          </Link>
        ) : (
          <Link href="/" className="p-4 rounded-xl ">
            <OutlineHomeIcon
              aria-label="home-icon-outline"
              className="h-8 text-default-400"
            />
          </Link>
        )}
      </Tooltip>

      <Tooltip content="Conquistas">
        {pathname === "/achivements" ? (
          <Link href="/achivements" className="p-4 rounded-xl bg-green-50">
            <SolidGiftIcon
              aria-label="gift-icon-solid"
              className="h-8 text-blue-icon fill-[#2B403C]"
            />
          </Link>
        ) : (
          <Link
            href="/achivements"
            className="p-4 rounded-xl hover:bg-default-100"
          >
            <OutlineGiftIcon
              aria-label="gift-icon-outline"
              className="h-8 text-default-400"
            />
          </Link>
        )}
      </Tooltip>

      <Tooltip content="Configurações">
        {pathname === "/settings" ? (
          <Link href="/settings" className="p-4 rounded-xl bg-green-50">
            <SolidCog6ToothIcon
              aria-label="cog-icon-solid"
              className="h-8 text-blue-icon fill-[#2B403C]"
            />
          </Link>
        ) : (
          <Link
            href="/settings"
            className="p-4 rounded-xl hover:bg-default-100"
          >
            <OutlineCog6ToothIcon
              aria-label="cog-icon-outline"
              className="h-8 text-default-400"
            />
          </Link>
        )}
      </Tooltip>

      <Tooltip content="Nova senha">
        <button
          aria-label="nova-senha"
          className="p-4 rounded-xl hover:bg-default-100"
          onClick={onPasswordTypeOpen}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23 8.00001C24.0609 8.00001 25.0783 8.42143 25.8284 9.17158C26.5786 9.92172 27 10.9391 27 12M31 12C31.0002 13.1668 30.7451 14.3196 30.2527 15.3774C29.7603 16.4352 29.0424 17.3725 28.1494 18.1236C27.2565 18.8746 26.21 19.4213 25.0835 19.7251C23.9569 20.029 22.7775 20.0828 21.628 19.8827C20.8773 19.7533 20.0827 19.9173 19.544 20.456L16 24H13V27H10V30H5V26.2427C5 25.4467 5.316 24.6827 5.87867 24.1213L14.544 15.456C15.0827 14.9173 15.2467 14.1227 15.1173 13.372C14.9283 12.2802 14.968 11.1611 15.2342 10.0855C15.5003 9.00988 15.987 8.0013 16.6633 7.12364C17.3397 6.24598 18.1909 5.5184 19.1632 4.98699C20.1355 4.45558 21.2076 4.13194 22.3115 4.03658C23.4154 3.94122 24.5271 4.07622 25.5761 4.43302C26.6251 4.78982 27.5886 5.36065 28.4054 6.10931C29.2223 6.85798 29.8747 7.76817 30.3213 8.7822C30.7679 9.79623 30.999 10.892 31 12Z"
              stroke="#A1A1AA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.75 0.75C6.75 0.551088 6.67098 0.360322 6.53033 0.21967C6.38968 0.0790175 6.19891 0 6 0C5.80109 0 5.61032 0.0790175 5.46967 0.21967C5.32902 0.360322 5.25 0.551088 5.25 0.75V5.25H0.75C0.551088 5.25 0.360322 5.32902 0.21967 5.46967C0.0790175 5.61032 0 5.80109 0 6C0 6.19891 0.0790175 6.38968 0.21967 6.53033C0.360322 6.67098 0.551088 6.75 0.75 6.75H5.25V11.25C5.25 11.4489 5.32902 11.6397 5.46967 11.7803C5.61032 11.921 5.80109 12 6 12C6.19891 12 6.38968 11.921 6.53033 11.7803C6.67098 11.6397 6.75 11.4489 6.75 11.25V6.75H11.25C11.4489 6.75 11.6397 6.67098 11.7803 6.53033C11.921 6.38968 12 6.19891 12 6C12 5.80109 11.921 5.61032 11.7803 5.46967C11.6397 5.32902 11.4489 5.25 11.25 5.25H6.75V0.75Z"
              fill="#A1A1AA"
            />
          </svg>
        </button>
      </Tooltip>
    </nav>
  );
};

export default Navbar;
