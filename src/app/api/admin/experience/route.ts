import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { getExperiences, addExperience, updateExperience, deleteExperience } from "@/lib/portfolioService";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const experiences = await getExperiences();
  return NextResponse.json({ success: true, experiences });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.role || !body.company || !body.date) {
      return NextResponse.json(
        { error: "Role, company, and date are required." },
        { status: 400 }
      );
    }

    const newExp = {
      role: body.role,
      company: body.company,
      date: body.date,
      type: body.type || "FULL_TIME",
      description: Array.isArray(body.description)
        ? body.description
        : (body.description || "").split("\n").filter(Boolean),
      techStack: Array.isArray(body.techStack)
        ? body.techStack
        : (body.techStack || "").split(",").map((s: string) => s.trim()).filter(Boolean),
    };

    const experiences = await addExperience(newExp);

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/about");

    return NextResponse.json({ success: true, experiences });
  } catch (err) {
    console.error("Add experience error:", err);
    return NextResponse.json({ error: "Failed to add experience" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
    }

    if (data.description && typeof data.description === "string") {
      data.description = data.description.split("\n").filter(Boolean);
    }
    if (data.techStack && typeof data.techStack === "string") {
      data.techStack = data.techStack.split(",").map((s: string) => s.trim()).filter(Boolean);
    }

    const experiences = await updateExperience(id, data);

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/about");

    return NextResponse.json({ success: true, experiences });
  } catch (err) {
    console.error("Update experience error:", err);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
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
      return NextResponse.json({ error: "Experience ID is required." }, { status: 400 });
    }

    const experiences = await deleteExperience(id);

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/about");

    return NextResponse.json({ success: true, experiences });
  } catch (err) {
    console.error("Delete experience error:", err);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}

