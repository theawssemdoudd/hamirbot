import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const tasks = await prisma.task.findMany();

        return NextResponse.json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, url, points } = await req.json();

        if (!title || !url || points === undefined) {
            return NextResponse.json({ error: 'Missing task data' }, { status: 400 });
        }

        const newTask = await prisma.task.create({
            data: {
                title,
                url,
                points,
            },
        });

        return NextResponse.json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
        }

        await prisma.task.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
