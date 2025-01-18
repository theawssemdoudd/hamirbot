'use client';

import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  url: string;
  points: number;
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Visit Example Site', url: 'https://example.com', points: 10, completed: false },
    { id: 2, title: 'Check Blog Post', url: 'https://example.com/blog', points: 15, completed: false },
  ]);

  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    // جلب النقاط من قاعدة البيانات عند تحميل الصفحة
fetch('/api/user', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(initDataUnsafe.user),
})


  const handleOpenTask = (id: number) => {
    // تحديث المهمة لجعلها مكتملة
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

    // استدعاء API لتحديث النقاط في قاعدة البيانات
    await fetch('/api/update-points', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points, telegramId: 'user-telegram-id' }),
    });
  };

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
