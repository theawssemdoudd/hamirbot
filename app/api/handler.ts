import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // إرسال البيانات كـ JSON
    res.status(200).json({ data: 'This is some data from the server!' });
  } else {
    // إرسال خطأ في حال استخدام طرق غير مدعومة
    res.status(405).json({ error: 'Method not allowed' });
  }
}
