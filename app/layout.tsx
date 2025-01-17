'use client';

import './globals.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Script from 'next/script';
import { Inter } from 'next/font/google';

// تحميل خط Google
const inter = Inter({ subsets: ['latin'] });

// بيانات الميتا الخاصة بالتطبيق
export const metadata = {
  title: 'Telegram & TON App',
  description: 'A simple app integrating Telegram Web App and TON Connect',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title || 'Default Title'}</title>
        <meta name="description" content={metadata.description} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        {/* تحميل مكتبة Telegram Web App */}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        {/* توفير تكامل TON Connect */}
        <TonConnectUIProvider manifestUrl="https://violet-traditional-rabbit-103.mypinata.cloud/ipfs/QmQJJAdZ2qSwdepvb5evJq7soEBueFenHLX3PoM6tiBffm">
          {/* محتويات الصفحات الفرعية */}
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
