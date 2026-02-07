"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Phone } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const socialLinks: { icon: React.ReactNode; href: string; label: string }[] =
    [
      {
        icon: <Phone size={24} className="text-green-500" />,
        href: "tel:+918344790660",
        label: "Phone",
      },
      {
        icon: <Mail size={24} className="text-red-500" />,
        href: "mailto:santhoshkumark2505@gmail.com",
        label: "Email",
      },
      {
        icon: <Linkedin size={24} className="text-blue-600" />,
        href: "https://www.linkedin.com/in/santhoshkumar-k-83a2a8298",
        label: "LinkedIn",
      },
      {
        icon: (
          <FaGithub
            size={28}
            className="text-foreground hover:text-cyan-400 transition-colors"
          />
        ),
        href: "https://github.com/K-Santhoshkumar",
        label: "GitHub",
      },
    ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="z-10 border-t border-card-border/50 bg-background/40 backdrop-blur-xl relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start mb-10 md:mb-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center mb-4"
            >
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">SANTHOSHKUMAR K</span>
            </motion.div>
            <p className="text-foreground font-medium mb-6 max-w-sm text-center md:text-left">
              Crafting premium digital experiences with precision and innovative design.
            </p>
            <div className="flex gap-6">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            <p className="mt-8 text-xs font-bold text-foreground uppercase tracking-widest">
              © {new Date().getFullYear()} SANTHOSHKUMAR K
            </p>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-8 mb-6 md:mb-0">
            <div>
              <h3 className="text-sm font-semibold mb-3">Navigation</h3>
              <ul className="space-y-2">
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/skills">Skills</FooterLink>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Connect</h3>
              <ul className="space-y-2">
                <FooterLink href="/projects">Projects</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Attribution line */}
      </div>
    </motion.footer>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}
function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <Link href={href}>
        <motion.p
          whileHover={{ x: 5 }}
          className="text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          {children}
        </motion.p>
      </Link>
    </li>
  );
}
