import { NextResponse } from 'next/server';

export default async function middleware(req) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken && req.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/users/login', req.url));
  }

  if (refreshToken && req.nextUrl.pathname === '/users/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (refreshToken && req.nextUrl.pathname === '/users/register') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
