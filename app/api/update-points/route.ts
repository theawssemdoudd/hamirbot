import { NextResponse } from 'next/server';

let userPoints = 0; // مؤقت للتجربة

export async function POST(request: Request) {
  const { points } = await request.json();
  userPoints += points;

  return NextResponse.json({ success: true, totalPoints: userPoints });
}
const handleCompleteTask = async (id: number, points: number) => {
  setTasks(tasks.filter((task) => task.id !== id)); // إزالة المهمة
  setUserPoints(userPoints + points); // تحديث النقاط محليًا

  // استدعاء API لتحديث النقاط
  await fetch('/api/update-points', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ points }),
  });
};
