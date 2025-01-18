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

    // إرسال النقاط و telegramId إلى المسار الصحيح
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
    <div className="container mx-auto p-4 bg-gray-100">
      {/* خط علوي */}
      <hr className="border-t-4 border-gray-300 mb-4" />

      <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
      <p>Your current points: {points}</p>

      {/* صورة قابلة للنقر */}
      <div className="my-4 text-center">
        <img
          src="../images/background.png"
          alt="Click me"
          className="cursor-pointer mx-auto w-32 h-32"
          onClick={handleImageClick}
        />
      </div>

      {/* خط سفلي */}
      <hr className="border-t-4 border-gray-300 mt-4" />

      {/* إضافة الشريط السفلي */}
      <BottomNavigation />
    </div>
  );
}
