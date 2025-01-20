import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        referrals: true, // استرداد الإحالات
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      userId: user.id,
      username: user.username,
      referrerLink: `${process.env.NEXT_PUBLIC_BASE_URL}/register?ref=${user.id}`,
      referrals: user.referrals.map((referral) => ({
        id: referral.id,
        username: referral.username,
        firstName: referral.firstName,
        lastName: referral.lastName,
      })),
    });
  } catch (error) {
    console.error('Error fetching user referrals:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

