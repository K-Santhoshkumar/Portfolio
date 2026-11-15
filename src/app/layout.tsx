import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://santhoshkumar-portfolio.vercel.app"
  ),
  title: "Santhoshkumar K | Full Stack Web Developer & Software Engineer",
  description:
    "Personal portfolio of Santhoshkumar K - Full Stack Web Developer & Software Engineer specializing in scalable web systems, React, Next.js, Java, and Python.",
  keywords: [
    "Santhoshkumar K",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Java",
    "Spring Boot",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Santhoshkumar K" }],
  openGraph: {
    title: "Santhoshkumar K | Portfolio",
    description:
      "Full Stack Web Developer & Software Engineer crafting scalable, interactive digital experiences.",
    url: "https://santhoshkumar-portfolio.vercel.app",
    siteName: "Santhoshkumar K Portfolio",
    images: [
      {
        url: "/portfolio_logo.png",
        width: 800,
        height: 800,
        alt: "Santhoshkumar K",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#07080A] text-[#F2F2EE] selection:bg-[#D4F933]/20 selection:text-[#D4F933] smokey-black-bg antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
