import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // استبدل بـ `telegramId` أو أي تعريف مستخدم آخر إذا لزم الأمر
    const telegramId = 'some-telegram-id';

    const user = await prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) {
      return NextResponse.json({ points: 0 }); // إذا لم يتم العثور على المستخدم، يرجع صفر
    }

    return NextResponse.json({ points: user.points });
  } catch (error) {
    console.error('Error fetching points:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
