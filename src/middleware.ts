import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  //   console.log('Token from cookie:', token);

  //   console.log('Token from cookie:', token); // Cetak nilai token ke console server

  const protectedRoutes = ["/dashboard"];
  const publicRoutes = ["/auth/login"];

  if (publicRoutes.includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/auth/login"],
};
