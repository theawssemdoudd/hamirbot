'use client'

import "./globals.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Telegram Mini App with TON Connect</title>
      </head>
      <body>
        {/* تحميل Telegram WebApp SDK */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

        {/* توفير إمكانية الاتصال بمحفظة TON */}
        <TonConnectUIProvider manifestUrl="https://violet-traditional-rabbit-103.mypinata.cloud/ipfs/QmQJJAdZ2qSwdepvb5evJq7soEBueFenHLX3PoM6tiBffm">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
