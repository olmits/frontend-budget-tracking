import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  // 1. Get the token from cookies
  const token = request.cookies.get("token")?.value;
  
  const isProtectedRoute = protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path));
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  // If user is on a protected route AND has no token -> Redirect to Login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is on login page AND has a token -> Redirect to Dashboard
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};