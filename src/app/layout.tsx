import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import SpaceStarsBackground from "../components/background/SpaceStarsBackground";






import Footer from "../components/Footer";
import { Providers } from "./providers";
import AiOsDesktopDock from "../components/ui/AiOsDesktopDock";
import AiOsDesktopIcons from "../components/ui/AiOsDesktopIcons";
import OsBootSequence from "../components/ui/OsBootSequence";
import CustomCursor from "../components/ui/CustomCursor";

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
        className={`${montserrat.variable} ${geistMono.variable} antialiased min-h-screen cursor-default`}
        style={{
          fontFamily: "var(--font-montserrat), Arial, Helvetica, sans-serif",
        }}
      >
        <Providers>
          <OsBootSequence />
          <CustomCursor />
          <SpaceStarsBackground />






          <Navbar />
          <AiOsDesktopIcons />
          <div className="pt-16 sm:pt-20 pb-36 sm:pb-40 min-h-screen relative z-10">{children}</div>

          <AiOsDesktopDock />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}


