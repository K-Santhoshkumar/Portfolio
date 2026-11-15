import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { getEducations, addEducation, updateEducation, deleteEducation } from "@/lib/portfolioService";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const educations = await getEducations();
  return NextResponse.json({ success: true, educations });
}

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.degree || !body.institution || !body.period) {
      return NextResponse.json(
        { error: "Degree, institution, and period are required." },
        { status: 400 }
      );
    }

    const educations = await addEducation({
      degree: body.degree,
      institution: body.institution,
      period: body.period,
      grade: body.grade || "",
      order: body.order || 0,
    });

    revalidatePath("/");
    revalidatePath("/about");

    return NextResponse.json({ success: true, educations });
  } catch (err) {
    console.error("Add education error:", err);
    return NextResponse.json({ error: "Failed to add education" }, { status: 500 });
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
      return NextResponse.json({ error: "Education ID is required" }, { status: 400 });
    }

    const educations = await updateEducation(id, data);

    revalidatePath("/");
    revalidatePath("/about");

    return NextResponse.json({ success: true, educations });
  } catch (err) {
    console.error("Update education error:", err);
    return NextResponse.json({ error: "Failed to update education" }, { status: 500 });
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
      return NextResponse.json({ error: "Education ID is required." }, { status: 400 });
    }

    const educations = await deleteEducation(id);

    revalidatePath("/");
    revalidatePath("/about");

    return NextResponse.json({ success: true, educations });
  } catch (err) {
    console.error("Delete education error:", err);
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 });
  }
}

