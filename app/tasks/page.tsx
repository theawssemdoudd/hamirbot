'use client';

import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  url: string;
  points: number;
  completed: boolean;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Visit Example Site', url: 'https://example.com', points: 10, completed: false },
    { id: 2, title: 'Check Blog Post', url: 'https://example.com/blog', points: 15, completed: false },
  ]);
  const [userPoints, setUserPoints] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // التأكد من وجود Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      const initDataUnsafe = tg.initDataUnsafe || {};

      // جلب بيانات المستخدم
      if (initDataUnsafe.user) {
        fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(initDataUnsafe.user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              setUser(data);
              setUserPoints(data.points || 0); // إعداد النقاط من البيانات القادمة
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

  const handleOpenTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  const handleCompleteTask = async (id: number, points: number) => {
    const newPoints = userPoints + points; // حساب النقاط الجديدة
    setUserPoints(newPoints); // تحديث النقاط محليًا
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // إزالة المهمة المكتملة

    // إرسال البيانات باستخدام الكود الخاص بك
    await fetch('/api/increase-points', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegramId: user?.telegramId, // إرسال معرّف المستخدم
        points: newPoints, // النقاط الجديدة
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
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">Tasks</h1>

      {/* عرض النقاط الحالية */}
      <div className="mb-4 text-lg font-medium">
        Your Points: <span className="text-blue-500">{userPoints}</span>
      </div>

      {/* قائمة المهام */}
      <ul className="w-full max-w-lg">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-4 border-b"
          >
            <span className="text-lg">{task.title}</span>
            {!task.completed ? (
              <button
                onClick={() => {
                  window.open(task.url, '_blank');
                  handleOpenTask(task.id);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
              >
                Task
              </button>
            ) : (
              <button
                onClick={() => handleCompleteTask(task.id, task.points)}
                className="bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded"
              >
                Check
              </button>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

