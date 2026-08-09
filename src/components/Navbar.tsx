"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Cpu, Activity, Sun, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const rotatingWords: string[] = [
  "Portfolio",
  "Works",
  "Insights",
  "Experience",
];
const colorPalette: string[] = [
  "text-cyan-400",
  "text-purple-400",
  "text-blue-400",
  "text-emerald-400",
];

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link
        href={href}
        className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-1.5 border ${
          isActive
            ? "text-cyan-300 bg-cyan-500/20 border-cyan-400/70 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            : "text-slate-300 hover:text-cyan-300 bg-slate-900/80 border-white/10 hover:border-cyan-500/40"
        }`}
      >
        <span className="text-[10px] text-cyan-400 font-mono">&gt;</span>
        {children}
      </Link>
    </motion.div>
  );
}

interface MobileNavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}
function MobileNavLink({ href, isActive, children }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2.5 rounded-xl font-mono text-sm font-bold transition-all ${
        isActive
          ? "text-cyan-300 bg-cyan-500/20 border border-cyan-400/50"
          : "text-slate-300 hover:text-cyan-300 hover:bg-slate-900/80"
      }`}
    >
      <span className="text-cyan-400 mr-2">&gt;</span>
      {children}
    </Link>
  );
}

export default function Navbar(): React.ReactElement {
  const pathname = usePathname();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [systemTime, setSystemTime] = useState("");
  const [systemDate, setSystemDate] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("28°C // CLEAR SKY");

  useEffect(() => {
    setMounted(true);

    // 12-Hour AM/PM Clock
    const updateDateTime = () => {
      const now = new Date();
      setSystemTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      setSystemDate(now.toLocaleDateString("en-US", options).toUpperCase());
    };
    updateDateTime();
    const clockInterval = setInterval(updateDateTime, 1000);

    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
      setColorIndex((prev) => (prev + 1) % colorPalette.length);
    }, 3000);

    // Live Geolocation Weather Fetching
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            );
            const data = await res.json();
            if (data && data.current_weather) {
              const temp = Math.round(data.current_weather.temperature);
              setWeatherInfo(`${temp}°C // LOCAL WEATHER (LIVE)`);
            }
          } catch {
            setWeatherInfo("28°C // CLEAR SKY (LIVE)");
          }
        },
        () => {
          setWeatherInfo("28°C // Erode, IN (CLEAR)");
        }
      );
    }

    return () => {
      clearInterval(clockInterval);
      clearInterval(wordInterval);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md z-50 h-16 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="w-48 h-8 bg-slate-800 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-slate-800 rounded-full animate-pulse"></div>
        </div>
      </nav>
    );
  }

  const isHomeActive = pathname === "/";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed top-0 w-full bg-slate-950/85 backdrop-blur-3xl z-50 border-b border-cyan-500/25 shadow-2xl shadow-cyan-950/50"
    >
      {/* Top AI OS Telemetry & Status Ribbon */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-slate-900/90 border-b border-white/5 font-mono text-[10px] text-slate-400 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            JARVIS_AI_OS::v4.5.0
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            NEURAL_LINK: 100%
          </span>
          <span className="text-slate-700">|</span>
          {/* Live Weather Widget */}
          <span className="text-amber-300 flex items-center gap-1">
            <Sun className="w-3 h-3 text-amber-400" />
            {weatherInfo}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* AI Audio Waveform Visualizer */}
          <div className="flex items-center gap-0.5">
            <span className="w-0.5 h-3 bg-cyan-400 animate-pulse" />
            <span className="w-0.5 h-4 bg-purple-400 animate-pulse delay-75" />
            <span className="w-0.5 h-2 bg-emerald-400 animate-pulse delay-150" />
            <span className="w-0.5 h-3 bg-cyan-400 animate-pulse delay-100" />
          </div>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1 text-purple-300">
            <Cpu className="w-3 h-3 text-purple-400" />
            CPU 14% | RAM 4.8GB
          </span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3 h-3" />
            SECURED
          </span>
          <span className="text-slate-700">|</span>
          {/* Live Date & Time Widget (12-Hour Format) */}
          <span className="text-cyan-300 font-bold">
            {systemDate} {"//"} {systemTime || "12:00:00 PM"}
          </span>

        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 md:h-18 justify-between">
          {/* Logo and Identity */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Image
                  src="/portfolio_logo.png"
                  alt="KSR Logo"
                  width={44}
                  height={44}
                  className="rounded-full border-2 border-cyan-400/60 group-hover:border-cyan-300 transition-colors shadow-lg shadow-cyan-500/30"
                />
                <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <div className="ml-3 flex flex-col">
                <motion.span
                  className={`text-xl font-black font-mono tracking-tight ${colorPalette[colorIndex]} transition-colors duration-1000 group-hover:text-cyan-300`}
                  whileHover={{ scale: 1.05 }}
                >
                  K Santhoshkumar
                </motion.span>
                <div className="text-xs font-mono font-bold text-slate-400 group-hover:text-cyan-300 flex items-center gap-1.5">
                  <span className="text-cyan-400 font-mono">&gt;</span>
                  {rotatingWords[currentWordIndex]}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop OS Navigation Modules */}
          <div className="hidden md:flex items-center space-x-2 ml-auto">
            <NavLink href="/" isActive={isHomeActive}>
              root
            </NavLink>
            <NavLink
              href="/about"
              isActive={pathname?.startsWith("/about") ?? false}
            >
              about
            </NavLink>
            <NavLink
              href="/experience"
              isActive={pathname?.startsWith("/experience") ?? false}
            >
              experience
            </NavLink>
            <NavLink
              href="/skills"
              isActive={pathname?.startsWith("/skills") ?? false}
            >
              skills
            </NavLink>
            <NavLink
              href="/projects"
              isActive={pathname?.startsWith("/projects") ?? false}
            >
              projects
            </NavLink>
            <NavLink
              href="/contact"
              isActive={pathname?.startsWith("/contact") ?? false}
            >
              contact
            </NavLink>
          </div>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-400 focus:outline-none hover:bg-slate-800 transition-colors ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle AI OS menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-slate-950/95 backdrop-blur-3xl border-t border-cyan-500/30 shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 font-mono">
              <MobileNavLink href="/" isActive={isHomeActive}>
                root
              </MobileNavLink>
              <MobileNavLink
                href="/about"
                isActive={pathname?.startsWith("/about") ?? false}
              >
                about
              </MobileNavLink>
              <MobileNavLink
                href="/experience"
                isActive={pathname?.startsWith("/experience") ?? false}
              >
                experience
              </MobileNavLink>
              <MobileNavLink
                href="/skills"
                isActive={pathname?.startsWith("/skills") ?? false}
              >
                skills
              </MobileNavLink>
              <MobileNavLink
                href="/projects"
                isActive={pathname?.startsWith("/projects") ?? false}
              >
                projects
              </MobileNavLink>
              <MobileNavLink
                href="/contact"
                isActive={pathname?.startsWith("/contact") ?? false}
              >
                contact
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}


