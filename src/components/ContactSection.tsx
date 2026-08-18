"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";
import MagicCard from "@/components/ui/MagicCard";
import AiOsWindow from "@/components/ui/AiOsWindow";

export default function ContactSection() {
  const contactMethods = [
    {
      name: "Email",
      value: "santhoshkumark2505@gmail.com",
      icon: <FiMail className="text-rose-400" size={24} />,
      href: "mailto:santhoshkumark2505@gmail.com",
    },
    {
      name: "Phone",
      value: "+91 83447 90660",
      icon: <FiPhone className="text-emerald-400" size={24} />,
      href: "tel:+918344790660",
    },
    {
      name: "GitHub",
      value: "K-Santhoshkumar",
      icon: <FiGithub className="text-slate-100" size={24} />,
      href: "https://github.com/K-Santhoshkumar",
    },
    {
      name: "LinkedIn",
      value: "santhoshkumar-k",
      icon: <FiLinkedin className="text-blue-400" size={24} />,
      href: "https://www.linkedin.com/in/santhoshkumar-k-83a2a8298",
    },
  ];

  return (
    <section id="contact" className="py-8 sm:py-20 px-1 sm:px-4 max-w-6xl mx-auto text-foreground w-full">
      <AiOsWindow
        title="ENCRYPTED_COMMS_TERMINAL"
        command="./open_comms.sh --secure"
        statusText="COMMS::ENCRYPTED"
        depth={30}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 tracking-tight font-mono">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-lg text-slate-300 max-w-xl mx-auto font-medium leading-relaxed">
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
              <MagicCard className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 flex flex-col items-center group shadow-xl h-full w-full">
                <Link
                  href={method.href}
                  target="_blank"
                  className="flex flex-col items-center gap-3 w-full h-full relative z-10 py-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <h3 className="font-mono font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">{method.name}</h3>
                  <span className="text-cyan-400 text-xs font-mono break-all text-center">
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
          className="mt-12 max-w-xl mx-auto text-center"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-3.5 font-mono font-bold rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all text-base shadow-xl shadow-cyan-500/30 tracking-wider"
            >
              Contact Me
            </motion.button>
          </Link>
        </motion.div>
      </AiOsWindow>
    </section>
  );
}

