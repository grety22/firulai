import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const password = request.cookies.get('site_password')?.value;
  const correctPassword = process.env.NEXT_PUBLIC_PROTECTED_PASSWORD;

  if (password !== correctPassword) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

// src/middleware.ts
export const config = {
  matcher: [
    // “anything except api, _next files, favicon, robots, sitemap, or /auth”
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth).*)',
  ],
}
