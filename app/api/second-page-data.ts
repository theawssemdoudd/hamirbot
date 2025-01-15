import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // مثال لإرجاع بيانات JSON
    res.status(200).json({ data: 'This is some data from the server!' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
