import { NextResponse } from 'next/server';

let userPoints = 50; // النقاط المخزنة مبدئيًا

export async function GET() {
  return NextResponse.json({ totalPoints: userPoints });
}
