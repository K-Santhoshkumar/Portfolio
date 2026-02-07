"use client";

import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";

const experiences = [
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Professional Experience
                </h1>
                <p className="text-gray-800 dark:text-gray-300 text-lg max-w-2xl mx-auto font-medium">
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
