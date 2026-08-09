import { motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";
import AiOsWindow from "@/components/ui/AiOsWindow";

interface ExperienceProps {
    role: string;
    company: string;
    date: string;
    description: string[];
    techStack: string[];
}

export default function ExperienceCard({ role, company, date, description, techStack }: ExperienceProps) {
    return (
        <AiOsWindow
            title="CAREER_LOG_ENTRY"
            command={`cat /var/log/experience_${company.toLowerCase().replace(/[^a-z0-9]/g, "")}.log`}
            statusText="LOG::VERIFIED"
            depth={30}
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
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-100 hover:text-cyan-300 transition-colors font-mono">
                            {role}
                        </h3>
                        <p className="text-base md:text-lg font-mono font-semibold text-cyan-400 mt-1">
                            {company}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono font-semibold text-cyan-300 whitespace-nowrap shadow-inner">
                        <Calendar size={14} />
                        {date}
                    </div>
                </div>

                <div className="space-y-3 flex-grow">
                    {description.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                            <p className="text-slate-200 leading-relaxed text-sm md:text-base font-medium">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-cyan-500/20">
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <motion.span
                                key={tech}
                                whileHover={{ scale: 1.08 }}
                                className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 shadow-sm hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AiOsWindow>
    );
}


