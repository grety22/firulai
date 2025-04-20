import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();
  const correctPassword = process.env.NEXT_PUBLIC_PROTECTED_PASSWORD;
  if (!correctPassword) {
    console.error('NEXT_PUBLIC_PROTECTED_PASSWORD env var not set');
    return NextResponse.json(
      { message: 'Server misconfiguration: password not configured' },
      { status: 500 }
    );
  }
  if (password === correctPassword) {
    const response = NextResponse.json({ message: 'Authenticated' }, { status: 200 });
    response.cookies.set('auth-token', 'true', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
    });
    return response;
  }
  return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
}
