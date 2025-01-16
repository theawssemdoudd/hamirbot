'use client';

import BottomNavigation from '@/components/BottomNavigation'; // استيراد الشريط السفلي
import React, { useEffect, useState } from 'react';
import { TonConnect } from '@tonconnect/sdk';

const App: React.FC = () => {
  const [tonConnect, setTonConnect] = useState<TonConnect | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    // Initialize TonConnect instance on component mount
    const tonConnectInstance = new TonConnect({ manifestUrl: '/tonconnect-manifest.json' });
    setTonConnect(tonConnectInstance);

    // Subscribe to connection events
    tonConnectInstance.onStatusChange((status) => {
      if (status && status.connected) {
        // Ensure status is not null and connected is true
        setWalletAddress(status.account.address); // Set wallet address if connected
        console.log('Wallet connected:', status.account.address);
      } else {
        setWalletAddress(null); // Clear address if disconnected
        console.log('Wallet disconnected');
      }
    });

    return () => {
      // Cleanup: Unsubscribe from events
      tonConnectInstance.offStatusChange();
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

      
