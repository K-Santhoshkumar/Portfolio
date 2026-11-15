import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createContactMessage } from "@/lib/portfolioService";

// Rate limiting map for contact submissions
const contactRateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = contactRateLimits.get(ip);
  if (!record || now > record.resetAt) {
    contactRateLimits.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 }); // 10 min window
    return true;
  }
  if (record.count >= 5) {
    return false; // Max 5 messages per 10 mins
  }
  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 1. Persist to database/store
    await createContactMessage({
      name: name.trim(),
      email: email.trim(),
      subject: subject ? subject.trim() : `Contact Inquiry from ${name}`,
      message: message.trim(),
    });

    // 2. Dispatch email notification via nodemailer if SMTP credentials present
    try {
      const smtpUser = process.env.SMTP_USER || "santhoshkumark2505@gmail.com";
      const smtpPass = process.env.SMTP_PASS;

      if (smtpPass && smtpPass !== "your-app-password-here") {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"${name}" <${smtpUser}>`,
          replyTo: email,
          to: smtpUser,
          subject: `Portfolio Contact: ${name} - ${subject || "New Message"}`,
          text: `You have received a new contact submission from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "None"}\n\nMessage:\n${message}`,
        });
      }
    } catch (emailErr) {
      console.warn("Nodemailer dispatch warning (message still saved to DB):", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Message received and saved successfully!",
    });
  } catch (error) {
    console.error("Contact API route error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}

