import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  id: number;
  email: string;
  name: string;
  role_id: number;
  iat: number;
  exp: number;
};

const publicRoutesForGuestsOnly = ["/", "/login", "/register"];
const protectedRoutes = ["/event", "/dashboard"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (token) {
    try {
      const user: TokenPayload = jwtDecode(token);
      const now = Date.now() / 1000;

      if (user.exp && user.exp < now) {
        return NextResponse.next();
      }

      const isTryingToAccessGuestOnly = publicRoutesForGuestsOnly.some(
        (path) => req.nextUrl.pathname === path
      );

      if (isTryingToAccessGuestOnly) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      if (req.nextUrl.pathname.startsWith("/event") && user.role_id !== 2) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      return NextResponse.next();
    }
  }

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/event/:path*", "/dashboard/:path*"],
};
