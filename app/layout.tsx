'use client'
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import type { Metadata } from "next"
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'


export const metadata: Metadata = {
  title: 'Telegram Mini App',
  description: 'A simple Telegram mini app using Next.js and Prisma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className}>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
                <TonConnectUIProvider manifestUrl="https://violet-traditional-rabbit-103.mypinata.cloud/ipfs/QmQJJAdZ2qSwdepvb5evJq7soEBueFenHLX3PoM6tiBffm">  
                  {children}       
                </TonConnectUIProvider>
        {children}
      </body>
    </html>
  )
}
