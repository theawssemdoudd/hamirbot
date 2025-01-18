'use client';

import { useEffect, useState } from 'react';
import BottomNavigation from '@/components/BottomNavigation';

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

interface Task {
  id: number;
  title: string;
  url: string;
  completed: boolean;
}

export default function TasksPage() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([]);

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
              setPoints(data.points || 0);
              fetchTasks(); // جلب المهام بعد تحميل بيانات المستخدم
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

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks = await response.json();
      setTasks(tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks');
    }
  };

  const handleTaskClick = async (taskId: number) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        window.open(task.url, '_blank');
      }

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, completed: true } : t
        )
      );
    } catch (error) {
      console.error('Error opening task:', error);
    }
  };

  const handleCheckClick = async (taskId: number) => {
    try {
      if (!user) {
        throw new Error('User not found');
      }

      // إرسال طلب POST لتحديث النقاط
      const response = await fetch('/api/update-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId: user.telegramId, // إرسال معرّف المستخدم
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update points');
      }

      const data = await response.json();
      setPoints(data.points); // تحديث النقاط من الاستجابة

      // إخفاء المهمة بعد الضغط على "Check"
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error('Error updating points:', error);
    }
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

      {/* عرض المهام */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Tasks</h2>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="mb-4 p-4 border border-gray-300 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <span>{task.title}</span>
              {!task.completed ? (
                <button
                  onClick={() => handleTaskClick(task.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={() => handleCheckClick(task.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Check
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* خط سفلي */}
      <hr className="border-t-4 border-gray-300 mt-4" />

      {/* إضافة الشريط السفلي */}
      <BottomNavigation />
    </div>
  );
}
