"use client";

import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";
import { Briefcase, Building2, Code2 } from "lucide-react";


const experiences = [
    {
        role: "Software Engineer",
        company: "NMSWorks Software Private Limited",
        date: "April 2026 – Present",
        description: [
            "Engineered scalable network management and orchestration systems for enterprise telecommunications infrastructure.",
            "Designed high-performance backend modules utilizing Java, Spring Boot, Kafka messaging queues, and Docker microservices."
        ],
        techStack: ["Java", "Spring Boot", "Kafka", "Docker", "Linux", "REST APIs", "PostgreSQL"]
    },
    {
        role: "Software Development Intern",
        company: "GoalStox, Mumbai",
        date: "Nov 2025 – Feb 2026",
        description: [
            "Worked on the development and maintenance of an enterprise-grade Django-based platform for managing Alternative Investment Funds (AIF) and Portfolio Management Services (PMS), supporting secure onboarding, KYC compliance, deal management, and investment portfolio tracking for customers, brokers, and internal employees.",
            "Implemented and enhanced role-based access control workflows for Customers, Brokers, Employees, and Admins, including OTP-based authentication, profile completion gates, and activation approvals through the Django Admin interface."
        ],
        techStack: ["Python", "Django", "PostgreSQL", "SQLite", "Django ORM", "Django Admin", "HTML", "CSS", "JavaScript"]
    },
    {
        role: "AIML Intern",

        company: "CubeAI Solutions",
        date: "June – July 2025",
        description: [

            "Developed an AI-driven Rainfall Prediction System using Python and Streamlit, enabling interactive meteorological data input and real-time forecast generation.",

            "Implemented a Random Forest classifier with GridSearchCV for hyper-parameter tuning to enhance model accuracy and reliability, delivering an intuitive interface for both prediction and visualization of rainfall patterns."
        ],
        techStack: ["Streamlit", "Python", "NumPy", "Pandas", "Matplotlib", "Seaborn"]
    }
];





export default function ExperiencePage() {
    return (
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-12 relative z-10">
            {/* Career Metrics HUD Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
                <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl backdrop-blur-xl">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <Briefcase size={22} />
                    </div>
                    <div>
                        <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase">Total Roles</span>
                        <span className="text-sm font-mono font-bold text-slate-100">Software Engineer & Internships</span>
                    </div>
                </div>

                <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl backdrop-blur-xl">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                        <Building2 size={22} />
                    </div>
                    <div>
                        <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase">Companies</span>
                        <span className="text-sm font-mono font-bold text-slate-100">NMSWorks, GoalStox & CubeAI</span>
                    </div>
                </div>

                <div className="col-span-1 bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3 shadow-xl backdrop-blur-xl">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <Code2 size={22} />
                    </div>
                    <div>
                        <span className="text-[10px] font-mono text-slate-400 font-bold block uppercase">Focus</span>
                        <span className="text-sm font-mono font-bold text-slate-100">Java, Django & AI/ML</span>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 sm:mb-12"
            >
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-mono">
                    Professional Experience
                </h1>
                <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium">
                    A track record of building scalable web applications and AI-driven solutions.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {experiences.map((exp, index) => (
                    <ExperienceCard key={index} {...exp} />
                ))}
            </div>
        </div>
    );
}

