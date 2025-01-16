'use client';

import BottomNavigation from '@/components/BottomNavigation'; // استيراد الشريط السفلي
import React, { useEffect, useState } from 'react';
import { TonConnect, Wallet } from '@tonconnect/sdk';

const App: React.FC = () => {
  const [tonConnect, setTonConnect] = useState<TonConnect | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const tonConnectInstance = new TonConnect({ manifestUrl: '/tonconnect-manifest.json' });
    setTonConnect(tonConnectInstance);

    const handleStatusChange = (wallet: Wallet | null) => {
      console.log('Status changed:', wallet);
      if (wallet && wallet.account) {
        setWalletAddress(wallet.account.address);
        console.log('Wallet connected:', wallet.account.address);
      } else {
        setWalletAddress(null);
        console.log('Wallet disconnected or no wallet connected');
      }
    };

    const unsubscribe = tonConnectInstance.onStatusChange(handleStatusChange);

    return () => {
      unsubscribe();
    };
  }, []);

  const connectWallet = async () => {
    try {
      if (tonConnect) {
        console.log('Attempting to connect to the wallet...');
        await tonConnect.connect({ jsBridgeKey: 'tonkeeper' });
        console.log('Connection initiated successfully');
      } else {
        console.error('TonConnect instance is not initialized');
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
          <button
            onClick={disconnectWallet}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#ff4d4f',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#1890ff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Connect Wallet
        </button>
      )}

    <BottomNavigation/>
    </div>
  );
};

export default App;

      
