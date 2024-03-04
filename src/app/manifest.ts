import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gerador de Senhas Gamificado",
    description:
      "Proteja suas contas online com senhas seguras e memoráveis, geradas através de um processo personalizado e cientificamente testado.",
    short_name: "Gerador de Senhas Gamificado",
    icons: [
      {
        src: "/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/android-chrome-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#185449",
    background_color: "#FAFAFA",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
  };
}
