import type { Metadata, Viewport } from "next";

import Providers from "./Providers";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <Script
        id="HotJarAnalytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:3892775,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
