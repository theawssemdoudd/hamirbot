'use client';
import BottomNavigation from '@/components/BottomNavigation';  // 
import { useEffect, useState } from 'react';

interface Referral {
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
}

interface UserReferralsData {
  userId: string;
  username: string | null;
  referrerLink: string;
  referrals: Referral[];
}

export default function ReferralPage() {
  const [data, setData] = useState<UserReferralsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = 'USER_ID_HERE'; // استبدل بمعرّف المستخدم الفعلي

    fetch(`/api/referrals?userId=${userId}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setData(response);
        }
      })
      .catch((err) => {
        console.error('Error fetching referrals:', err);
        setError('Failed to load data');
      });
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Referral Dashboard</h1>

      {/* رابط الإحالة */}
      <div className="mb-6">
        <p className="text-lg">Your Referral Link:</p>
        <input
          type="text"
          value={data.referrerLink}
          readOnly
          className="p-2 border rounded w-full max-w-lg"
        />
        <button
          onClick={() => navigator.clipboard.writeText(data.referrerLink)}
          className="bg-blue-500 text-white py-1 px-4 rounded mt-2"
        >
          Copy Link
        </button>
      </div>

      {/* الأشخاص المُحالين */}
      <div className="w-full max-w-lg">
        <h2 className="text-xl font-medium mb-2">Referred Users:</h2>
        {data.referrals.length > 0 ? (
          <ul className="list-disc pl-6">
            {data.referrals.map((referral) => (
              <li key={referral.id} className="mb-2">
                <p>
                  <strong>Username:</strong> {referral.username || 'N/A'}
                </p>
                <p>
                  <strong>Name:</strong>{' '}
                  {referral.firstName || ''} {referral.lastName || ''}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No referrals yet.</p>
        )}
        <BottomNavigation />
      </div>
    </main>
  );
}
