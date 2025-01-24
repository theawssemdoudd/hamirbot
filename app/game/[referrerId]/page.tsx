"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ReferralPage({ params }: { params: { referrerId: string } }) {
  const { referrerId } = params;
  const router = useRouter();

  useEffect(() => {
    // إرسال معرف المحيل إلى الخادم
    const registerReferral = async () => {
      try {
        const res = await fetch('/api/ref', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ referrerId }),
        });

        if (res.ok) {
          console.log('Referral registered successfully');
        } else {
          console.error('Failed to register referral');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    registerReferral();
  }, [referrerId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome!</h1>
      <p>You were referred by user ID: {referrerId}.</p>
      <p>Sign up or log in to start earning rewards.</p>
      <button
        onClick={() => router.push('/game')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Game
      </button>
    </div>
  );
}
