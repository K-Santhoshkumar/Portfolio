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
            className="text-white hover:text-cyan-400 transition-colors"
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
      className="z-10 border-t border-gray-800 bg-black text-white shadow-[0_-2px_16px_0_rgba(0,0,0,0.7)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <span className="text-xl font-bold mr-2">SANTHOSHKUMAR K</span>
              <span className="text-sm text-gray-400">Erode, Tamil Nadu</span>
            </motion.div>
            <div className="flex gap-6 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  aria-label={link.label}
                  className="hover:scale-110 transition-transform"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              © {new Date().getFullYear()} All rights reserved
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
          className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
        >
          {children}
        </motion.p>
      </Link>
    </li>
  );
}
