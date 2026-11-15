import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { getProjects, addProject, updateProject, deleteProject } from "@/lib/portfolioService";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await getProjects();
  return NextResponse.json({ success: true, projects });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.description || !body.imagePath) {
      return NextResponse.json(
        { error: "Title, description, and imagePath are required." },
        { status: 400 }
      );
    }

    const newProject = {
      id: body.id || String(Date.now()),
      title: body.title.trim(),
      description: body.description.trim(),
      tags: Array.isArray(body.tags) ? body.tags : (body.tags || "").split(",").map((t: string) => t.trim()).filter(Boolean),
      githubUrl: body.githubUrl || "https://github.com/K-Santhoshkumar",
      demoUrl: body.demoUrl || undefined,
      imagePath: body.imagePath,
      features: Array.isArray(body.features) ? body.features : [],
      challenges: Array.isArray(body.challenges) ? body.challenges : [],
      solutions: Array.isArray(body.solutions) ? body.solutions : [],
      screenshots: Array.isArray(body.screenshots) ? body.screenshots : [],
    };

    const updatedProjects = await addProject(newProject);

    revalidatePath("/");
    revalidatePath("/projects");

    return NextResponse.json({ success: true, projects: updatedProjects });
  } catch (err) {
    console.error("Add project error:", err);
    return NextResponse.json({ error: "Failed to add project" }, { status: 500 });
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
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    if (data.tags && typeof data.tags === "string") {
      data.tags = data.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
    }

    const updatedProjects = await updateProject(id, data);

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);

    return NextResponse.json({ success: true, projects: updatedProjects });
  } catch (err) {
    console.error("Update project error:", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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
      return NextResponse.json({ error: "Project ID is required." }, { status: 400 });
    }

    const updatedProjects = await deleteProject(id);

    revalidatePath("/");
    revalidatePath("/projects");

    return NextResponse.json({ success: true, projects: updatedProjects });
  } catch (err) {
    console.error("Delete project error:", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

