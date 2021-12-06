import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  //   token will exist if the user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  // allow the request if following is true...
  // 1. it's a request for next-auth session & provider fetching
  // 2. the token exists

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  //   redirect them to login if they don't have a token and requesting a protected route
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
}
