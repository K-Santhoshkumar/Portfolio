"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiGithub, FiLinkedin } from "react-icons/fi";
import MagicCard from "@/components/ui/MagicCard";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

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
      icon: <FiGithub className="text-black dark:text-white" size={24} />,
      href: "https://github.com/K-Santhoshkumar",
    },
    {
      name: "LinkedIn",
      value: "santhoshkumar-k",
      icon: <FiLinkedin className="text-blue-600" size={24} />,
      href: "https://www.linkedin.com/in/santhoshkumar-k-83a2a8298",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message.",
        });
      }
    } catch {
      setStatus({ type: "error", message: "Failed to send message." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-xl mx-auto text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {
            contactMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="h-full"
              >
                <MagicCard className="p-6 rounded-xl bg-gray-800/70 shadow-sm hover:shadow-md transition-all border border-gray-700 flex flex-col items-center h-full w-full group">
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 w-full h-full relative z-10"
                    aria-label={method.name}
                  >
                    <div className="mb-1 p-3 rounded-full bg-cyan-500/10 group-hover:scale-110 transition-transform duration-300">{method.icon}</div>
                    <h3 className="font-medium text-cyan-300 mb-1 group-hover:text-cyan-200 transition-colors">
                      {method.name}
                    </h3>
                    <span className="text-white text-sm break-all text-center">
                      {method.value}
                    </span>
                  </a>
                </MagicCard>
              </motion.div>
            ))
          }

        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">
          Contact Me
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Fill out the form below to send me a message directly.
        </p>
      </motion.div>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/70 rounded-xl p-8 shadow-lg border border-gray-700 flex flex-col gap-4"
      >
        <input
          suppressHydrationWarning
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          suppressHydrationWarning
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <textarea
          suppressHydrationWarning
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          suppressHydrationWarning
          type="submit"
          disabled={loading}
          className="px-8 py-3 font-medium rounded-md bg-cyan-500 hover:bg-cyan-600 text-white transition-colors text-lg shadow-lg disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        {status.message && (
          <div
            className={`text-center mt-2 ${status.type === "success" ? "text-green-400" : "text-red-400"
              }`}
          >
            {status.message}
          </div>
        )}
      </motion.form>
    </section>
  );
}
