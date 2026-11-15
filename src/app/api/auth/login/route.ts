import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, verifyPassword, SESSION_COOKIE_NAME } from "@/lib/auth";
import { prisma } from "@/lib/db";

// In-memory rate limiting map for login attempts
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 }); // 15 min window
    return true;
  }
  if (record.count >= 7) {
    return false; // Rate limited
  }
  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many login attempts. Please wait 15 minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const defaultAdminEmail = (process.env.ADMIN_EMAIL || "santhoshkumark2505@gmail.com").toLowerCase().trim();
    const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD || "Admin@Portfolio2026!";
    const trimmedEmail = email.toLowerCase().trim();

    let authenticated = false;
    let adminPayload = {
      userId: "admin-default",
      email: trimmedEmail,
      name: "Santhoshkumar K",
      role: "ADMIN",
    };

    // 1. Try DB user check if Prisma is connected
    try {
      if (process.env.DATABASE_URL) {
        const dbUser = await prisma.adminUser.findUnique({
          where: { email: trimmedEmail },
        });

        if (dbUser) {
          const isValid = await verifyPassword(password, dbUser.password);
          if (isValid) {
            authenticated = true;
            adminPayload = {
              userId: dbUser.id,
              email: dbUser.email,
              name: dbUser.name,
              role: dbUser.role,
            };
          }
        }
      }
    } catch (dbErr) {
      console.warn("DB user check failed, checking fallback credentials:", dbErr);
    }

    // 2. Fallback check against configured admin credentials (allows instant login even before DB seeding)
    if (!authenticated) {
      if (trimmedEmail === defaultAdminEmail && password === defaultPassword) {
        authenticated = true;
      }
    }

    if (!authenticated) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Reset rate limit on success
    loginAttempts.delete(ip);

    // Create signed JWT session token
    const token = await createSessionToken(adminPayload);

    const response = NextResponse.json({
      success: true,
      user: adminPayload,
      message: "Authentication successful.",
    });

    const host = req.headers.get("host") || "";
    const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" && !isLocalhost,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ error: "Internal server error during authentication." }, { status: 500 });
  }
}
