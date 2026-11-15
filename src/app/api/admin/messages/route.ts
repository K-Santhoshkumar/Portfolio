import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { getContactMessages, markMessageRead, deleteMessage } from "@/lib/portfolioService";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await getContactMessages();
  return NextResponse.json({ success: true, messages });
}

export async function PATCH(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, isRead } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    }

    const messages = await markMessageRead(id, isRead);
    return NextResponse.json({ success: true, messages });
  } catch (err) {
    console.error("Patch message error:", err);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    }

    const messages = await deleteMessage(id);
    return NextResponse.json({ success: true, messages });
  } catch (err) {
    console.error("Delete message error:", err);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}

