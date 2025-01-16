"use client"; 

import { useState, useEffect } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "@ton/core";

export default function WalletPage() {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if (tonConnectUI.account?.address) {
      setTonWalletAddress(tonConnectUI.account.address);
    }
  }, [tonConnectUI]);

  const handleConnect = async () => {
    await tonConnectUI.openModal();
  };

  const handleDisconnect = async () => {
    await tonConnectUI.disconnect();
    setTonWalletAddress(null);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">TON Wallet</h1>
      {tonWalletAddress ? (
        <div>
          <p>Connected Wallet: {tonWalletAddress}</p>
          <button
            onClick={handleDisconnect}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
      <BottomNavigation />
    </main>
  );
}
