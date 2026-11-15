import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "antigravity-magic-portfolio-secret-key-3b90c5dd-7051-40b5-9b8f-f2ae643bec10"
);
const SESSION_COOKIE_NAME = "admin_session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Intercept /admin pages and /api/admin endpoints
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  // Check cookie or Bearer token
  const token =
    req.cookies.get(SESSION_COOKIE_NAME)?.value ||
    (req.headers.get("authorization")?.startsWith("Bearer ")
      ? req.headers.get("authorization")?.substring(7)
      : undefined);

  let isAuthenticated = false;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (payload && payload.role === "ADMIN") {
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // Handle API admin routes
  if (isAdminApi) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized access to admin API" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // 1. Handle root /admin or /admin/
  if (pathname === "/admin" || pathname === "/admin/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    } else {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // 2. Handle /admin/login when already authenticated
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 3. Protect all other /admin/* pages from unauthenticated access
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

