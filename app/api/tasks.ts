import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // الحصول على المهام من قاعدة البيانات أو مصدر آخر
    const tasks = await getTasksFromDatabase(); // هذه دالة مثال تحتاج إلى تحديدها بناءً على تطبيقك

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

