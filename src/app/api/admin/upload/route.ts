import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import fs from "fs";
import path from "path";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const type = formData.get("type") as string | null; // "resume" | "project" | "avatar"
    const projectTitle = formData.get("projectTitle") as string | null;

    // Support single file or multiple files
    let files: File[] = [];
    const allFiles = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    if (allFiles && allFiles.length > 0 && allFiles[0].size > 0) {
      files = allFiles;
    } else if (singleFile && singleFile.size > 0) {
      files = [singleFile];
    }

    if (files.length === 0) {
      return NextResponse.json({ error: "No file provided for upload" }, { status: 400 });
    }

    const savedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid file type (${file.type}). Allowed: JPG, PNG, WEBP, PDF.` },
          { status: 400 }
        );
      }

      const fileExt = (path.extname(file.name) || ".png").toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
        return NextResponse.json(
          { error: `Invalid file extension (${fileExt}). Allowed: .png, .jpg, .jpeg, .webp, .pdf` },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds 25MB limit.` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      let destinationDir = path.join(process.cwd(), "public");
      let fileName = "";
      let publicUrl = "";

      if (type === "resume") {
        // Resume upload saves directly to public/Santhosh.pdf
        fileName = "Santhosh.pdf";
        const fullPath = path.join(destinationDir, fileName);
        fs.writeFileSync(fullPath, buffer);
        publicUrl = `/${fileName}`;
      } else if (type === "project" && projectTitle) {
        // Create dedicated folder in public/<Clean_Title>_Screenshots/
        const sanitizedFolder =
          projectTitle
            .trim()
            .replace(/[^a-zA-Z0-9]/g, "_")
            .replace(/_+/g, "_") + "_Screenshots";

        destinationDir = path.join(process.cwd(), "public", sanitizedFolder);
        if (!fs.existsSync(destinationDir)) {
          fs.mkdirSync(destinationDir, { recursive: true });
        }

        // Count existing files in folder to order sequentially
        const existingFiles = fs.readdirSync(destinationDir).filter((f) => !f.startsWith("."));

        const ext = path.extname(file.name) || ".png";
        const orderNum = existingFiles.length + 1;
        const formattedIndex = String(orderNum).padStart(2, "0");

        fileName = `Screenshot ${formattedIndex}${ext}`;
        const fullPath = path.join(destinationDir, fileName);
        fs.writeFileSync(fullPath, buffer);
        publicUrl = `/${sanitizedFolder}/${fileName}`;
      } else {
        // Default uploads directory inside public/uploads
        destinationDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(destinationDir)) {
          fs.mkdirSync(destinationDir, { recursive: true });
        }
        const cleanOriginal = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        fileName = `${Date.now()}_${cleanOriginal}`;
        const fullPath = path.join(destinationDir, fileName);
        fs.writeFileSync(fullPath, buffer);
        publicUrl = `/uploads/${fileName}`;
      }

      savedUrls.push(publicUrl);
    }

    return NextResponse.json({
      success: true,
      url: savedUrls[0],
      urls: savedUrls,
      fileName: path.basename(savedUrls[0]),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload processing failed";
    console.error("Upload error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await verifyAdminRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const filePath = searchParams.get("filePath");

    if (!filePath) {
      return NextResponse.json({ error: "No filePath provided" }, { status: 400 });
    }

    // Security check: prevent directory traversal
    const normalized = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, "");
    const cleanRelative = normalized.startsWith("/") || normalized.startsWith("\\") ? normalized.slice(1) : normalized;
    const fullPath = path.join(process.cwd(), "public", cleanRelative);

    // Verify it stays within public directory
    const publicDir = path.join(process.cwd(), "public");
    if (!fullPath.startsWith(publicDir)) {
      return NextResponse.json({ error: "Invalid file target" }, { status: 403 });
    }

    // Protect core assets
    if (path.basename(fullPath).toLowerCase() === "portfolio_logo.png" || path.basename(fullPath).toLowerCase() === "favicon.ico") {
      return NextResponse.json({ error: "Cannot delete core portfolio branding assets" }, { status: 400 });
    }

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    return NextResponse.json({
      success: true,
      message: `File ${cleanRelative} deleted from disk.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Deletion failed";
    console.error("Delete error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
