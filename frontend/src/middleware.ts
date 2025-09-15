import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const validRoutes = ['/', '/login', '/register', '/landing', '/api'];
  const isRouteValid = validRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  if (!isRouteValid) {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 