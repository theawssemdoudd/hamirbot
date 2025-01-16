"use client"

import React, { useState } from 'react';
import { TonConnect } from '@tonconnect/sdk';

const App: React.FC = () => {
  const [tonConnect, setTonConnect] = useState<TonConnect | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // Initialize TonConnect
      const tonConnectInstance = new TonConnect({ manifestUrl: '/tonconnect-manifest.json' });
      setTonConnect(tonConnectInstance);

      // Request wallet connection
      const result = await tonConnectInstance.connect();
      if (result) {
        setWalletAddress(result.account.address);
        console.log('Connected to wallet:', result);
      } else {
        console.log('Connection cancelled');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    if (tonConnect) {
      tonConnect.disconnect();
      setWalletAddress(null);
      console.log('Wallet disconnected');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>TON Wallet Connection</h1>
      {walletAddress ? (
        <div>
          <p>Connected Wallet Address: {walletAddress}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default App;
