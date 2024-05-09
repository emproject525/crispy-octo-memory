import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set('x-pathname', req.nextUrl.pathname);
  headers.set('x-referrer', req.referrer);

  return NextResponse.next({
    request: {
      headers,
    },
  });
}
