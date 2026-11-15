import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { getAllAdminSkills, addSkill, updateSkill, deleteSkill } from "@/lib/portfolioService";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const skills = await getAllAdminSkills();
  return NextResponse.json({ success: true, skills });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, icon, color, type } = await req.json();
    if (!name || !icon) {
      return NextResponse.json({ error: "Skill name and icon are required." }, { status: 400 });
    }

    const updatedSkills = await addSkill({
      name: name.trim(),
      icon: icon.trim(),
      color: color || "text-cyan-400",
      type: type === "soft" ? "soft" : "technical",
    });

    revalidatePath("/");
    revalidatePath("/skills");

    return NextResponse.json({ success: true, skills: updatedSkills });
  } catch (err) {
    console.error("Skill creation error:", err);
    return NextResponse.json({ error: "Failed to add skill" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { originalName, updated } = await req.json();
    if (!originalName || !updated?.name) {
      return NextResponse.json({ error: "Invalid skill update data." }, { status: 400 });
    }

    const updatedSkills = await updateSkill(originalName, updated);

    revalidatePath("/");
    revalidatePath("/skills");

    return NextResponse.json({ success: true, skills: updatedSkills });
  } catch (err) {
    console.error("Skill update error:", err);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    if (!name) {
      return NextResponse.json({ error: "Skill name is required for deletion." }, { status: 400 });
    }

    const updatedSkills = await deleteSkill(name);

    revalidatePath("/");
    revalidatePath("/skills");

    return NextResponse.json({ success: true, skills: updatedSkills });
  } catch (err) {
    console.error("Skill deletion error:", err);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}

