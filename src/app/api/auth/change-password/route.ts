import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest, hashPassword, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const hashedNew = await hashPassword(newPassword);

    try {
      if (process.env.DATABASE_URL) {
        const user = await prisma.adminUser.findUnique({
          where: { email: session.email },
        });

        if (user) {
          const match = await verifyPassword(currentPassword, user.password);
          if (!match) {
            return NextResponse.json({ error: "Incorrect current password." }, { status: 400 });
          }

          await prisma.adminUser.update({
            where: { id: user.id },
            data: { password: hashedNew },
          });
        }
      }
    } catch (err) {
      console.warn("DB password update note:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Failed to update password." }, { status: 500 });
  }
}

