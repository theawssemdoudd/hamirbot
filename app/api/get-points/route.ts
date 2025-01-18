import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const { telegramId } = await req.json()

        if (!telegramId) {
            return NextResponse.json({ error: 'Invalid telegramId' }, { status: 400 })
        }

        // تحقق من وجود المستخدم
        const user = await prisma.user.findUnique({
            where: { telegramId },
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        // تحديث النقاط
        const updatedUser = await prisma.user.update({
            where: { telegramId },
            data: { points: { increment: 1 } }
        })

        return NextResponse.json({ success: true, points: updatedUser.points })
    } catch (error) {
        console.error('Error increasing points:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
