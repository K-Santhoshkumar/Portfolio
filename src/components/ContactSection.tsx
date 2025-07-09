"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";

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
    <section id="contact" className="py-20 px-4 max-w-6xl mx-auto text-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Feel free to reach out for collaborations or opportunities
        </p>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-xl bg-gray-800/70 shadow-sm hover:shadow-md transition-all border border-gray-700 flex flex-col items-center"
          >
            <Link
              href={method.href}
              target="_blank"
              className="flex flex-col items-center gap-2"
            >
              <div className="mb-1">{method.icon}</div>
              <h3 className="font-medium text-cyan-300 mb-1">{method.name}</h3>
              <span className="text-white text-sm break-all">
                {method.value}
              </span>
            </Link>
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
