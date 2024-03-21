import React from "react";

import Home from "@/components/Home";
import { achievements } from "@/utils/achievements";
import { Metadata } from "next";

type Props = {
  searchParams?: { achv_id: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const achv_id = searchParams?.achv_id;
  const achivement = achievements.find(({ id }) => String(id) === achv_id);

  if (achv_id && achivement) {
    return {
      title: "Gerador de Senhas Gamificado",
      description:
        "Proteja suas contas online com senhas seguras e memoráveis, geradas através de um processo personalizado e cientificamente testado.",
      openGraph: {
        images: {
          url: `https://gamified-password-generator.vercel.app${achivement.badge.image.smallUrl}`,
          width: 800,
          height: 800,
          alt: achivement.title,
        },
        type: "website",
      },
      twitter: {
        images: {
          url: `https://gamified-password-generator.vercel.app${achivement.badge.image.smallUrl}`,
          width: 800,
          height: 800,
          alt: achivement.title,
        },
      },
      icons: [
        {
          url: `https://gamified-password-generator.vercel.app${achivement.badge.image.smallUrl}`,
        },
      ],
    };
  }

  return {
    title: "Gerador de Senhas Gamificado",
    description:
      "Proteja suas contas online com senhas seguras e memoráveis, geradas através de um processo personalizado e cientificamente testado.",
    openGraph: {
      images: ["https://gamified-password-generator.vercel.app/meta-tags.jpg"],
    },
    icons: {
      icon: "/icons/icon-512x512.png",
    },
  };
}

export default function index() {
  return <Home />;
}
