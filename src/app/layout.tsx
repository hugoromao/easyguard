import type { Metadata } from "next";

import Providers from "./Providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Gerenciador de Senhas Gamificado",
  description:
    "Proteja suas contas online com senhas seguras e memoráveis, geradas através de um processo personalizado e cientificamente testado.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
