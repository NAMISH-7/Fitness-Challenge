import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, Next.js internals, and images
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hasAuth = request.cookies.has("admin_auth");

  // If not authenticated and trying to access any page other than /login
  if (!hasAuth && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already authenticated and trying to access /login, redirect to dashboard
  if (hasAuth && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
