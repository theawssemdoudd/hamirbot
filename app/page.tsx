'use client';

import { useEffect, useState } from 'react';
import BottomNavigation from '@/components/BottomNavigation'; // استيراد الشريط السفلي

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      const initDataUnsafe = tg.initDataUnsafe || {};

      if (initDataUnsafe.user) {
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(initDataUnsafe.user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              setUser(data);
              setPoints(data.points || 0); // إعداد النقاط من البيانات القادمة
            }
          })
          .catch((err) => {
            console.error('Error fetching user data:', err);
            setError('Failed to fetch user data');
          });
      } else {
        setError('No user data available');
      }
    } else {
      setError('This app should be opened in Telegram');
    }
  }, []);

  const handleImageClick = () => {
    const newPoints = points + 1;
    setPoints(newPoints);

    fetch('/api/increase-points', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        telegramId: user.telegramId, // إرسال معرّف المستخدم
        points: newPoints,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error('Error updating points:', data.error);
        } else {
          console.log('Points updated successfully');
        }
      })
      .catch((err) => {
        console.error('Error updating points:', err);
      });
  };

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!user) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
      {/* محتوى الصفحة */}
      <div className="p-6">
        {/* عنوان مرحب */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-500">Welcome, {user.firstName}!</h1>
          <p className="text-lg text-gray-300 mt-2"><span className="text-green-400 font-bold">{points}</span>$MY</p>
        </div>

        {/* بطاقة النقاط */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg text-center border border-gray-700">
          <p className="text-xl font-medium text-gray-300 mb-4">Click the image below to earn points!</p>
          <img
            src="/images/dog.png"
            alt="Click to earn points"
            className="cursor-pointer mx-auto w-40 h-40 rounded-xl border-4 border-blue-500 shadow-md transition-transform duration-300 hover:scale-105"
            onClick={handleImageClick}
          />
        </div>
      </div>

      {/* شريط سفلي */}
      <BottomNavigation />
    </div>
  );
}

