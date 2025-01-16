import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, address } = req.body;

    if (!userId || !address) {
      return res.status(400).json({ error: 'UserId and address are required' });
    }

 
      });

      res.status(200).json(wallet);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
