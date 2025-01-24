"use client";

import BottomNavigation from '@/components/BottomNavigation';  //


import { useEffect } from 'react';

export default function ReferralPage({ params }: { params: { telegramId: string } }) {
  const { telegramId } = params;

  useEffect(() => {
    const registerReferral = async () => {
      try {
        const response = await fetch('/api/ref', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ telegramId }),
        });

        const result = await response.json();
        if (response.ok) {
          console.log('Referral registered:', result);
        } else {
          console.error('Error registering referral:', result.error);
        }
      } catch (error) {
        console.error('Error connecting to API:', error);
      }
    };

    if (telegramId) {
      registerReferral();
    }
  }, [telegramId]);

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Your referral ID: {telegramId}</p>
       <BottomNavigation />

    </div>
  );
}
