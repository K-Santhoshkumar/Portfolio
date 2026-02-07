"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";
import MagicCard from "@/components/ui/MagicCard";

export default function ContactSection() {
  const contactMethods = [
    {
      name: "Email",
      value: "santhoshkumark2505@gmail.com",
      icon: <FiMail className="text-red-500" size={24} />,
      href: "mailto:santhoshkumark2505@gmail.com",
    },
    {
      name: "Phone",
      value: "+91 83447 90660",
      icon: <FiPhone className="text-green-500" size={24} />,
      href: "tel:+918344790660",
    },
    {
      name: "GitHub",
      value: "K-Santhoshkumar",
      icon: <FiGithub className="text-black" size={24} />,
      href: "https://github.com/K-Santhoshkumar",
    },
    {
      name: "LinkedIn",
      value: "santhoshkumar-k",
      icon: <FiLinkedin className="text-blue-600" size={24} />,
      href: "https://www.linkedin.com/in/santhoshkumar-k-83a2a8298",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 max-w-6xl mx-auto text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Get In Touch
        </h2>
        <p className="text-lg text-foreground dark:text-gray-300 max-w-xl mx-auto font-medium leading-relaxed">
          I am always open to discussing new opportunities, creative ideas or visions to be part of your projects.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <MagicCard className="p-6 rounded-2xl bg-card-bg/40 backdrop-blur-md border border-card-border hover:border-primary/50 transition-all duration-300 flex flex-col items-center group shadow-xl h-full w-full">
              <Link
                href={method.href}
                target="_blank"
                className="flex flex-col items-center gap-3 w-full h-full relative z-10 py-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{method.name}</h3>
                <span className="text-secondary text-xs break-all text-center">
                  {method.value}
                </span>
              </Link>
            </MagicCard>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 max-w-xl mx-auto text-center"
      >
        <Link href="/contact">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 font-medium rounded-md bg-cyan-500 hover:bg-cyan-600 text-white transition-colors text-lg shadow-lg"
          >
            Contact Me
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
