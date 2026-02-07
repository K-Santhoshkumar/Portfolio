import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import MeteorBackground from "../components/MeteorBackground";
import Footer from "../components/Footer";
import { Providers } from "./providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SANTHOSHKUMAR K's Portfolio",
  description: "SANTHOSHKUMAR K's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased min-h-screen`}
        style={{
          fontFamily: "var(--font-montserrat), Arial, Helvetica, sans-serif",
        }}
      >
        <Providers>
          <MeteorBackground />
          <Navbar />
          <div className="pt-16 pb-16 min-h-screen relative z-10">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
