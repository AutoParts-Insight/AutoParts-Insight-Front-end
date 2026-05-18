import { NextRequest, NextResponse } from 'next/server';

/** Rotas que só ADMIN pode acessar */
const ADMIN_PATHS = ['/admin', '/roadmap'];

/** Rotas públicas (sem autenticação) */
const PUBLIC_PATHS = ['/login'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Deixa rotas públicas passarem livremente
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('ap_access')?.value;
  const role = request.cookies.get('ap_role')?.value;

  // Não autenticado → redireciona para /login
  if (!accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rota exclusiva de ADMIN → usuário common não passa
  if (ADMIN_PATHS.some((p) => pathname.startsWith(p)) && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
