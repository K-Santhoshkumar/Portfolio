import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import MagicCard from "@/components/ui/MagicCard";

interface ExperienceProps {
    role: string;
    company: string;
    date: string;
    description: string[];
    techStack: string[];
}

export default function ExperienceCard({ role, company, date, description, techStack }: ExperienceProps) {
    return (
        <MagicCard
            className="group block p-8 rounded-3xl bg-card-bg/50 backdrop-blur-xl border border-card-border/60 shadow-lg"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col h-full gap-6"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {role}
                        </h3>
                        <p className="text-lg font-medium text-foreground/80 mt-1">
                            {company}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-sm font-semibold text-secondary whitespace-nowrap">
                        <Calendar size={16} />
                        {date}
                    </div>
                </div>

                <div className="space-y-3 flex-grow">
                    {description.map((item, index) => (
                        <p key={index} className="text-foreground dark:text-gray-300 leading-relaxed text-[15px] font-medium">
                            {item}
                        </p>
                    ))}
                </div>

                <div className="pt-4 border-t border-card-border/50">
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <span
                                key={tech}
                                className="text-xs font-bold px-3 py-1.5 rounded-full bg-background border border-card-border text-foreground/70 group-hover:border-primary/30 group-hover:text-primary transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </MagicCard>
    );
}
