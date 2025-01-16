
'use client';

import { useState } from 'react';

export default function ConnectWalletPage() {
  const [userId, setUserId] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleConnectWallet = async () => {
    try {
      const response = await fetch('/api/connect-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, address }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect wallet');
      }

      const data = await response.json();
      setMessage(`Wallet connected successfully with ID: ${data.id}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Connect Your TON Wallet</h1>
      <div>
        <label className="block mb-2">User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
      </div>
      <div>
        <label className="block mb-2">Wallet Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleConnectWallet}
      >
        Connect Wallet
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
