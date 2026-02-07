export interface SkillItem {
  name: string;
  icon: string; // icon name as string
  color: string; // tailwind color class or hex
  type: "technical" | "soft";
}

export const skills: SkillItem[] = [
  // Technical Skills
  { name: "Java", icon: "FaJava", color: "text-red-500", type: "technical" },
  {
    name: "Python",
    icon: "FaPython",
    color: "text-yellow-500",
    type: "technical",
  },
  {
    name: "JavaScript",
    icon: "FaJs",
    color: "text-yellow-400",
    type: "technical",
  },
  {
    name: "TypeScript",
    icon: "SiTypescript",
    color: "text-blue-600",
    type: "technical",
  },
  { name: "PHP", icon: "FaPhp", color: "text-indigo-500", type: "technical" },
  {
    name: "SQL",
    icon: "FaDatabase",
    color: "text-blue-400",
    type: "technical",
  },
  {
    name: "HTML5",
    icon: "FaHtml5",
    color: "text-orange-500",
    type: "technical",
  },
  {
    name: "CSS3",
    icon: "FaCss3Alt",
    color: "text-blue-500",
    type: "technical",
  },
  {
    name: "TailwindCSS",
    icon: "SiTailwindcss",
    color: "text-cyan-400",
    type: "technical",
  },
  { name: "SASS", icon: "FaSass", color: "text-pink-400", type: "technical" },
  { name: "React", icon: "FaReact", color: "text-cyan-400", type: "technical" },
  {
    name: "Node.js",
    icon: "FaNodeJs",
    color: "text-green-600",
    type: "technical",
  },
  {
    name: "Express",
    icon: "SiExpress",
    color: "text-gray-800 dark:text-gray-200",
    type: "technical",
  },
  {
    name: "Mongoose",
    icon: "SiMongoose",
    color: "text-red-700",
    type: "technical",
  },
  { name: "Vite", icon: "SiVite", color: "text-yellow-400", type: "technical" },
  { name: "JWT", icon: "FaKey", color: "text-yellow-600", type: "technical" },
  {
    name: "REST APIs",
    icon: "FaCode",
    color: "text-blue-400",
    type: "technical",
  },
  { name: "OAuth", icon: "FaKey", color: "text-blue-600", type: "technical" },
  { name: "Axios", icon: "FaCode", color: "text-blue-400", type: "technical" },
  {
    name: "Redux",
    icon: "SiRedux",
    color: "text-purple-500",
    type: "technical",
  },
  {
    name: "Next.js",
    icon: "SiNextdotjs",
    color: "text-black dark:text-white",
    type: "technical",
  },
  {
    name: "Shadcn",
    icon: "SiShadcnui",
    color: "text-gray-700 dark:text-gray-200",
    type: "technical",
  },
  {
    name: "MongoDB",
    icon: "SiMongodb",
    color: "text-green-700",
    type: "technical",
  },
  { name: "MySQL", icon: "SiMysql", color: "text-blue-500", type: "technical" },
  {
    name: "PostgreSQL",
    icon: "SiPostgresql",
    color: "text-blue-800",
    type: "technical",
  },
  {
    name: "Prisma",
    icon: "SiPrisma",
    color: "text-indigo-400",
    type: "technical",
  },
  {
    name: "Supabase",
    icon: "SiSupabase",
    color: "text-green-500",
    type: "technical",
  },
  {
    name: "GitHub",
    icon: "FaGithub",
    color: "text-black dark:text-white",
    type: "technical",
  },
  {
    name: "VS Code",
    icon: "FaCode",
    color: "text-blue-500",
    type: "technical",
  },
  {
    name: "MongoDB Atlas",
    icon: "SiMongodb",
    color: "text-green-700",
    type: "technical",
  },
  {
    name: "Netlify",
    icon: "SiNetlify",
    color: "text-green-400",
    type: "technical",
  },
  {
    name: "Vercel",
    icon: "SiVercel",
    color: "text-black dark:text-white",
    type: "technical",
  },
  // Additional Backend & Real-time Frameworks
  { name: "Flask", icon: "SiFlask", color: "text-gray-700", type: "technical" },
  { name: "WebSockets", icon: "FaNetworkWired", color: "text-blue-500", type: "technical" },
  { name: "Django", icon: "SiDjango", color: "text-green-700", type: "technical" },
  { name: "FastAPI", icon: "SiFastapi", color: "text-teal-500", type: "technical" },
  // Soft Skills
  {
    name: "Quick Learner",
    icon: "GiBrain",
    color: "text-yellow-500",
    type: "soft",
  },
  {
    name: "Team Management",
    icon: "GiTeamIdea",
    color: "text-blue-500",
    type: "soft",
  },
  {
    name: "Adaptability",
    icon: "GiFlexibleStar",
    color: "text-green-500",
    type: "soft",
  },
];
