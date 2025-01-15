import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const tasks = await prisma.task.findMany(); // جلب جميع المهام من قاعدة البيانات
      res.status(200).json(tasks); // إرجاع المهام مع حالة 200
    } catch (error) {
      console.error('Error fetching tasks:', error); // تسجيل الخطأ في الخادم
      res.status(500).json({ error: 'Internal server error' }); // إرجاع خطأ داخلي في الخادم
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' }); // إرجاع خطأ إذا كانت الطريقة غير مسموحة
  }
}
