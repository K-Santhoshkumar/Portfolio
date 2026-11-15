import { Project, projects as existingProjects } from "./projects";
import { SkillItem, skills as existingSkills } from "./skills";

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  approach: string;
  funFact: string;
  location: string;
  status: string;
  phone: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  avatarUrl: string;
  domainInterests: string;
  favoriteTools: string[];
}

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  date: string;
  type: string;
  description: string[];
  techStack: string[];
}

export interface EducationData {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade: string;
  order: number;
}

export interface CertificationData {
  id: string;
  title: string;
  issuer: string;
}

export interface LeadershipData {
  id: string;
  title: string;
  badge: string;
  description: string;
}

export interface WebsiteSettingsData {
  siteTitle: string;
  metaDescription: string;
  ogImage: string;
  showExperience: boolean;
  showSkills: boolean;
  showProjects: boolean;
  showEducation: boolean;
  showContact: boolean;
}

export const initialProfile: ProfileData = {
  name: "Santhoshkumar K",
  title: "Software Engineer / Full Stack Developer",
  tagline: "Building digital products with thoughtful engineering.",
  bio: "Software engineer with strong computer science fundamentals in Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, and Database Management Systems. Experienced in building and testing full-stack applications using Python, JavaScript, TypeScript, and Java. Comfortable across the complete software development lifecycle, including requirements analysis, architecture, development, testing, debugging, and deployment.",
  approach: "Clean architecture, modular backend APIs, type safety, and performance-first engineering. I prioritize thoughtful code structure, robust error boundaries, and reliable end-to-end user experiences.",
  funFact: "Passionate about systems design, interactive web mechanics, and exploring algorithmic problem-solving.",
  location: "Tamil Nadu, India",
  status: "AVAILABLE FOR ROLES",
  phone: "+91 83447 90660",
  email: "santhoshkumark2505@gmail.com",
  githubUrl: "https://github.com/K-Santhoshkumar",
  linkedinUrl: "https://www.linkedin.com/in/santhoshkumar-k-83a2a8298",
  resumeUrl: "/Santhosh.pdf",
  avatarUrl: "/portfolio_logo.png",
  domainInterests: "Full stack engineering, backend architectures, distributed services, REST API design, real-time web mechanics, and database systems.",
  favoriteTools: ["VS Code", "Git", "Postman", "Docker", "Vercel", "MongoDB Atlas"],
};

export const initialExperiences: ExperienceData[] = [
  {
    id: "exp-nmsworks",
    role: "Software Engineer",
    company: "NMSWorks Pvt Ltd, Chennai",
    date: "July 2026 – Present",
    type: "FULL_TIME",
    description: [
      "Develop and maintain Java/Spring Boot backend components for network management and service management applications, implementing business validations, data processing and service-layer logic.",
      "Build and consume RESTful APIs with Spring MVC and Spring Data JPA/Hibernate, integrating application workflows with relational databases (MySQL) and network inventory data.",
      "Write HQL/SQL queries and troubleshoot data-retrieval and persistence issues across service and database layers.",
      "Implement validation and exception-handling flows that return clear status and failure information, improving the diagnosability of service operations.",
      "Debug issues by analyzing Java stack traces, application logs and database behavior, then identify root causes and deliver fixes."
    ],
    techStack: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
      "HQL",
      "MySQL",
      "Postman",
      "Maven",
      "Git",
      "Tomcat"
    ]
  },
  {
    id: "exp-1",
    role: "Software Development Intern",
    company: "GoalStox, Mumbai",
    date: "November 2025 – February 2026",
    type: "INTERNSHIP",
    description: [
      "Developed and unit-tested backend services and RESTful workflows using Python and Django.",
      "Implemented role-based access control across four user tiers.",
      "Worked on OTP authentication, profile-completion gates, and secure activation workflows.",
      "Built and tested REST APIs for deal management, portfolio tracking, KYC workflows, and secure onboarding.",
      "Collaborated with cross-functional teams in an Agile/Scrum environment."
    ],
    techStack: ["Python", "Django", "PostgreSQL", "REST APIs", "JWT", "RBAC", "Agile/Scrum"]
  }
];

export const initialEducations: EducationData[] = [
  {
    id: "edu-1",
    degree: "B.Tech (Hons.), Information Technology",
    institution: "Government College of Engineering, Erode",
    period: "November 2022 – June 2026",
    grade: "CGPA: 8.41 / 10",
    order: 1
  }
];

export const initialCertifications: CertificationData[] = [
  { id: "cert-1", title: "Java Programming Fundamentals", issuer: "Infosys Springboard" },
  { id: "cert-2", title: "Data Structures and Algorithms with Python", issuer: "NPTEL" },
  { id: "cert-3", title: "Privacy and Security in Online Social Media", issuer: "NPTEL" },
  { id: "cert-4", title: "SQL (MySQL)", issuer: "Newton School" }
];

export const initialLeadership: LeadershipData[] = [
  {
    id: "lead-1",
    title: "Overall Event Coordinator — GUESTO",
    badge: "COLLEGE SYMPOSIUM",
    description: "Orchestrated college symposium operations including event planning, technical competitions, logistics, budget allocation, and multi-college participant engagement."
  }
];

export const initialWebsiteSettings: WebsiteSettingsData = {
  siteTitle: "Santhoshkumar K — Software Engineer / Full Stack Developer",
  metaDescription: "Building digital products with thoughtful engineering. Portfolio of Santhoshkumar K, Software Engineer specializing in Python, JavaScript, TypeScript, React, Next.js, and backend architectures.",
  ogImage: "/portfolio_logo.png",
  showExperience: true,
  showSkills: true,
  showProjects: true,
  showEducation: true,
  showContact: true
};

export const initialSkillsList: SkillItem[] = existingSkills;
export const initialProjectsList: Project[] = existingProjects;
