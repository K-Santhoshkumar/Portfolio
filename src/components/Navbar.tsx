"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import React from "react";

const rotatingWords: string[] = [
  "Portfolio",
  "Works",
  "Insights",
  "Experience",
];
const colorPalette: string[] = [
  "text-sky-500",
  "text-blue-500",
  "text-indigo-500",
  "text-cyan-400",
];

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}
const MagneticLink = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <MagneticLink>
      <motion.div
        className="relative px-2"
        whileHover={{ scale: 1.05 }}
      >
        <Link
          href={href}
          className={`px-5 py-2 rounded-full transition-all duration-300 font-bold text-sm tracking-wide ${isActive
            ? "text-background bg-primary shadow-[0_0_20px_rgba(14,165,233,0.5)] scale-105"
            : "text-foreground/80 hover:text-primary hover:shadow-[0_0_10px_rgba(14,165,233,0.3)]"
            }`}
        >
          {children}
        </Link>
      </motion.div>
    </MagneticLink>
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
      className={`block px-4 py-2 rounded transition-colors font-medium ${isActive
        ? "text-primary bg-primary/10"
        : "text-foreground hover:text-primary"
        }`}
    >
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

  useTheme(); // Keeping useTheme if needed for other logic, but removing toggle
  // const toggleTheme = ... removed

  useEffect(() => {
    const handleScroll = () => {
      // setScrolled(window.scrollY > 10); // This line was removed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
      setColorIndex((prev) => (prev + 1) % colorPalette.length);
    }, 3000);
    return () => clearInterval(wordInterval);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 h-16 md:h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="w-40 h-8 bg-gray-800 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-800 rounded-full animate-pulse"></div>
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
      className="fixed top-0 w-full bg-background/60 backdrop-blur-xl z-50 transition-all duration-300 border-b border-card-border/50 shadow-lg shadow-primary/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 md:h-20 justify-between">
          {/* Logo and text left-aligned */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Image
                  src="/portfolio_logo.png"
                  alt="KSR Logo"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-gray-800 group-hover:border-cyan-400 transition-colors"
                />
              </motion.div>
              <div className="ml-3 flex flex-col">
                <motion.span
                  className={`text-2xl font-extrabold ${colorPalette[colorIndex]} transition-colors duration-1000 group-hover:text-cyan-400`}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  K Santhoshkumar
                </motion.span>
                <motion.div
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-base font-semibold text-secondary group-hover:text-cyan-300"
                >
                  {rotatingWords[currentWordIndex]}
                </motion.div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation right-aligned */}
          <div className="hidden md:flex items-center space-x-1 ml-auto">
            <NavLink href="/" isActive={isHomeActive}>
              Home
            </NavLink>
            <NavLink
              href="/about"
              isActive={pathname?.startsWith("/about") ?? false}
            >
              About
            </NavLink>
            <NavLink
              href="/experience"
              isActive={pathname?.startsWith("/experience") ?? false}
            >
              Experience
            </NavLink>
            <NavLink
              href="/skills"
              isActive={pathname?.startsWith("/skills") ?? false}
            >
              Skills
            </NavLink>
            <NavLink
              href="/projects"
              isActive={pathname?.startsWith("/projects") ?? false}
            >
              Projects
            </NavLink>
            <NavLink
              href="/contact"
              isActive={pathname?.startsWith("/contact") ?? false}
            >
              Contact
            </NavLink>
          </div>

          <motion.button
            className="md:hidden p-2 rounded-md focus:outline-none hover:bg-gray-800 transition-colors ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-background/80 backdrop-blur-2xl border-t border-card-border/50 shadow-2xl"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              <MobileNavLink href="/" isActive={isHomeActive}>
                Home
              </MobileNavLink>
              <MobileNavLink
                href="/about"
                isActive={pathname?.startsWith("/about") ?? false}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                href="/experience"
                isActive={pathname?.startsWith("/experience") ?? false}
              >
                Experience
              </MobileNavLink>
              <MobileNavLink
                href="/skills"
                isActive={pathname?.startsWith("/skills") ?? false}
              >
                Skills
              </MobileNavLink>
              <MobileNavLink
                href="/projects"
                isActive={pathname?.startsWith("/projects") ?? false}
              >
                Projects
              </MobileNavLink>
              <MobileNavLink
                href="/contact"
                isActive={pathname?.startsWith("/contact") ?? false}
              >
                Contact
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
