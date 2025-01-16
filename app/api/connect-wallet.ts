import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, address } = req.body;

    // تحقق من أن البيانات المطلوبة موجودة
    if (!userId || !address) {
      return res.status(400).json({ error: 'UserId and address are required' });
    }

    try {
      // البحث عن المستخدم أو تحديث بيانات المحفظة
      let wallet = await prisma.wallet.findUnique({
        where: { userId: userId },
      });

      if (!wallet) {
        // إذا لم يتم العثور على المحفظة، قم بإنشائها
        wallet = await prisma.wallet.create({
          data: {
            userId: userId,
            address: address,
          },
        });
      } else {
        // إذا كانت المحفظة موجودة، قم بتحديث العنوان
        wallet = await prisma.wallet.update({
          where: { userId: userId },
          data: { address: address },
        });
      }

      // إعادة المحفظة كاستجابة
      res.status(200).json(wallet);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
