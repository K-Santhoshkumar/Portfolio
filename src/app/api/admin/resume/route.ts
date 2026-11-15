import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { getResume, updateResume } from "@/lib/portfolioService";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resume = await getResume();
  return NextResponse.json({ success: true, resume });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { filePath, fileName, fileSize } = await req.json();
    if (!filePath || !fileName) {
      return NextResponse.json({ error: "File path and file name are required." }, { status: 400 });
    }

    const updatedResume = await updateResume(filePath, fileName, fileSize);

    revalidatePath("/");
    revalidatePath("/about");

    return NextResponse.json({ success: true, resume: updatedResume });
  } catch (err) {
    console.error("Resume update error:", err);
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
  }
}

