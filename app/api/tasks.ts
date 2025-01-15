import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle GET request to fetch all tasks
    try {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PATCH') {
    // Handle PATCH request to update a task's status
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    try {
      const updatedTask = await prisma.task.update({
        where: { id },
        data: { status },
      });

      res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: 'Method not allowed' });
  }
}
