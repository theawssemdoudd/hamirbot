import { NextResponse } from 'next/server';

let userPoints = 50; // النقاط المخزنة مبدئيًا

export async function POST(request: Request) {
  const { points } = await request.json();
  userPoints += points;

  return NextResponse.json({ success: true, totalPoints: userPoints });
}
