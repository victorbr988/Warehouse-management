import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protectedPaths = ['/dashboard', '/history'];

  const isProtectedPath = protectedPaths.includes(pathname);
  const token = req.cookies.get('token')?.value;

  if (isProtectedPath && !token) {
    const loginUrl = new URL('/', req.url);
    loginUrl.searchParams.set('redirect', pathname); // Opcional: preserva o caminho original para redirecionar após o login
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === '/' && token) {
    const dashboardUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }
  return NextResponse.next();
}