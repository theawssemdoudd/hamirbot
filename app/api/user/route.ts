export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();

    if (!userData || !userData.id || typeof userData.id !== 'number') {
      return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
    }

    const referrerId = userData.referrerId; // معرّف المستخدم الذي قام بالإحالة (اختياري)

    // البحث عن المستخدم
    let user = await prisma.user.findUnique({
      where: { telegramId: userData.id },
    });

    if (!user) {
      // إنشاء مستخدم جديد مع الإحالة
      user = await prisma.user.create({
        data: {
          telegramId: userData.id,
          username: userData.username || null,
          firstName: userData.first_name || null,
          lastName: userData.last_name || null,
          walletAddress: userData.walletAddress || null,
          referrerId: referrerId || null, // تخزين معرّف المحيل إذا كان موجودًا
        },
      });

      // تحديث نقاط المحيل إذا كان هناك إحالة
      if (referrerId) {
        await prisma.user.update({
          where: { id: referrerId },
          data: {
            points: { increment: 10 }, // مكافأة المحيل بالنقاط
          },
        });
      }
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error processing user data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

}
