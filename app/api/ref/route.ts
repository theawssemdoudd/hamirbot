import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { referrerId } = await request.json();

    if (!referrerId) {
      return NextResponse.json({ error: 'Referrer ID is required' }, { status: 400 });
    }

    // تحقق من وجود المحيل في قاعدة البيانات
    const referrer = await db.users.findUnique({ where: { id: referrerId } });

    if (!referrer) {
      return NextResponse.json({ error: 'Referrer not found' }, { status: 404 });
    }

    // تحديث النقاط
    const updatedReferrer = await db.users.update({
      where: { id: referrerId },
      data: { points: referrer.points + 500 }, // تعديل عدد النقاط حسب النظام
    });

    return NextResponse.json({ success: true, referrer: updatedReferrer });
  } catch (error) {
    console.error('Error in referral API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
