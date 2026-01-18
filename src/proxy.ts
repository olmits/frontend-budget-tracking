import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value
  
  // Define protected routes
  const protectedRoutes = ['/dashboard']

  // Check if the current path is protected
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    // If no user token found, redirect to login
    if (!currentUser) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Optional: Redirect / to /dashboard if logged in
  if (request.nextUrl.pathname === '/' && currentUser) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}