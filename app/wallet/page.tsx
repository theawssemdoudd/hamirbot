'use client';

import BottomNavigation from '@/components/BottomNavigation'; // استيراد الشريط السفلي
import React, { useEffect, useState } from 'react';
import { TonConnect, Wallet } from '@tonconnect/sdk';

const App: React.FC = () => {
  const [tonConnect, setTonConnect] = useState<TonConnect | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    // Initialize TonConnect instance on component mount
    const tonConnectInstance = new TonConnect({ manifestUrl: '/tonconnect-manifest.json' });
    setTonConnect(tonConnectInstance);

    // Define the event handler
    const handleStatusChange = (wallet: Wallet | null) => {
      if (wallet && wallet.account) {
        setWalletAddress(wallet.account.address);
        console.log('Wallet connected:', wallet.account.address);
      } else {
        setWalletAddress(null);
        console.log('Wallet disconnected');
      }
    };

    // Subscribe to connection events
    tonConnectInstance.onStatusChange(handleStatusChange);

    return () => {
      // Cleanup: Unsubscribe from events by removing the listener manually
      tonConnectInstance.onStatusChange(null);
    };
  }, []);

  const connectWallet = async () => {
    try {
      if (tonConnect) {
        await tonConnect.connectWallet({ jsBridgeKey: 'tonkeeper' }); // Specify wallet type
        console.log('Connection initiated');
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

    <BottomNavigation/>
    </div>
  );
};

export default App;

      
