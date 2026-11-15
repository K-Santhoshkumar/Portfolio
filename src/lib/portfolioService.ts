import fs from "fs";
import path from "path";
import { projects as defaultProjects, Project } from "@/data/projects";
import { skills as defaultSkills, SkillItem } from "@/data/skills";
import {
  initialProfile,
  initialExperiences,
  initialEducations,
  initialCertifications,
  initialLeadership,
  initialWebsiteSettings,
  ProfileData,
  ExperienceData,
  EducationData,
  WebsiteSettingsData,
} from "@/data/initialData";

const PROJECTS_FILE = path.join(process.cwd(), "src", "data", "projects.ts");
const SKILLS_FILE = path.join(process.cwd(), "src", "data", "skills.ts");
const LOCAL_STORE_DIR = path.join(process.cwd(), ".data");
const LOCAL_STORE_FILE = path.join(LOCAL_STORE_DIR, "portfolio_store.json");

interface LocalStoreData {
  profile: ProfileData;
  experiences: ExperienceData[];
  educations: EducationData[];
  settings: WebsiteSettingsData;
  messages: Array<{
    id: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    isRead: boolean;
    createdAt: string;
  }>;
  resume: {
    fileName: string;
    filePath: string;
    fileSize: number;
    updatedAt: string;
  };
  projects?: Project[];
  skills?: SkillItem[];
}

function getLocalStore(): LocalStoreData {
  try {
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      const raw = fs.readFileSync(LOCAL_STORE_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Could not read local store, using default data:", err);
  }

  const initialStore: LocalStoreData = {
    profile: initialProfile,
    experiences: initialExperiences,
    educations: initialEducations,
    settings: initialWebsiteSettings,
    messages: [],
    resume: {
      fileName: "Santhosh.pdf",
      filePath: "/Santhosh.pdf",
      fileSize: 154000,
      updatedAt: new Date().toISOString(),
    },
  };

  try {
    if (!fs.existsSync(LOCAL_STORE_DIR)) {
      fs.mkdirSync(LOCAL_STORE_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(initialStore, null, 2), "utf-8");
  } catch {
    // Read-only filesystem fallback (e.g. serverless runtime)
  }

  return initialStore;
}

function saveLocalStore(store: LocalStoreData) {
  try {
    if (!fs.existsSync(LOCAL_STORE_DIR)) {
      fs.mkdirSync(LOCAL_STORE_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write to local store (read-only filesystem):", err);
  }
}

// ---------------- PROJECTS (DIRECTLY USING src/data/projects.ts) ----------------

export async function getProjects(): Promise<Project[]> {
  try {
    const store = getLocalStore();
    if (store && store.projects && store.projects.length > 0) {
      return store.projects;
    }
  } catch {
    // fallback to imported
  }
  return defaultProjects;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const allProjects = await getProjects();
  return allProjects.find((p) => String(p.id) === String(id)) || null;
}

export function saveProjectsToFile(projectsList: Project[]): boolean {
  try {
    const store = getLocalStore();
    store.projects = projectsList;
    saveLocalStore(store);
  } catch (err) {
    console.warn("Could not write projects to store:", err);
  }

  try {
    const code = `export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  imagePath: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  screenshots?: string[];
  category?: string;
}

export const projects: Project[] = ${JSON.stringify(projectsList, null, 2)};
`;
    fs.writeFileSync(PROJECTS_FILE, code, "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to write to src/data/projects.ts (read-only filesystem in serverless):", err);
    return false;
  }
}

export async function addProject(project: Project): Promise<Project[]> {
  const current = await getProjects();
  const newProject = {
    ...project,
    id: project.id || String(current.length + 1),
  };
  const updated = [newProject, ...current];
  saveProjectsToFile(updated);
  return updated;
}

export async function updateProject(id: string, updated: Partial<Project>): Promise<Project[]> {
  const current = await getProjects();
  const updatedList = current.map((p) => (String(p.id) === String(id) ? { ...p, ...updated } : p));
  saveProjectsToFile(updatedList);
  return updatedList;
}

export async function deleteProject(id: string): Promise<Project[]> {
  const current = await getProjects();
  const updatedList = current.filter((p) => String(p.id) !== String(id));
  saveProjectsToFile(updatedList);
  return updatedList;
}

// ---------------- SKILLS (DIRECTLY USING src/data/skills.ts) ----------------

export async function getSkills(): Promise<SkillItem[]> {
  try {
    const store = getLocalStore();
    if (store && store.skills && store.skills.length > 0) {
      return store.skills;
    }
  } catch {
    // fallback
  }
  return defaultSkills;
}

export async function getAllAdminSkills(): Promise<SkillItem[]> {
  return getSkills();
}

export function saveSkillsToFile(skillsList: SkillItem[]): boolean {
  try {
    const store = getLocalStore();
    store.skills = skillsList;
    saveLocalStore(store);
  } catch (err) {
    console.warn("Could not write skills to store:", err);
  }

  try {
    const code = `export interface SkillItem {
  name: string;
  icon: string; // icon name as string
  color: string; // tailwind color class or hex
  type: "technical" | "soft";
}

export const skills: SkillItem[] = ${JSON.stringify(skillsList, null, 2)};
`;
    fs.writeFileSync(SKILLS_FILE, code, "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to write to src/data/skills.ts (read-only filesystem in serverless):", err);
    return false;
  }
}

export async function addSkill(skill: SkillItem): Promise<SkillItem[]> {
  const current = await getSkills();
  const exists = current.find((s) => s.name.toLowerCase() === skill.name.toLowerCase());
  if (!exists) {
    const updated = [...current, skill];
    saveSkillsToFile(updated);
    return updated;
  }
  return current;
}

export async function updateSkill(originalName: string, updated: SkillItem): Promise<SkillItem[]> {
  const current = await getSkills();
  const updatedList = current.map((s) => (s.name === originalName ? updated : s));
  saveSkillsToFile(updatedList);
  return updatedList;
}

export async function deleteSkill(skillName: string): Promise<SkillItem[]> {
  const current = await getSkills();
  const updatedList = current.filter((s) => s.name !== skillName);
  saveSkillsToFile(updatedList);
  return updatedList;
}

// ---------------- PROFILE ----------------

export async function getProfile(): Promise<ProfileData> {
  const store = getLocalStore();
  return store.profile;
}

export async function updateProfile(data: Partial<ProfileData>): Promise<ProfileData> {
  const store = getLocalStore();
  const updated: ProfileData = { ...store.profile, ...data };
  store.profile = updated;
  saveLocalStore(store);
  return updated;
}

// ---------------- EXPERIENCES ----------------

export async function getExperiences(): Promise<ExperienceData[]> {
  const store = getLocalStore();
  return store.experiences;
}

export async function addExperience(exp: Omit<ExperienceData, "id">): Promise<ExperienceData[]> {
  const store = getLocalStore();
  const newExp: ExperienceData = { ...exp, id: `exp-${Date.now()}` };
  store.experiences.push(newExp);
  saveLocalStore(store);
  return store.experiences;
}

export async function updateExperience(id: string, exp: Partial<ExperienceData>): Promise<ExperienceData[]> {
  const store = getLocalStore();
  store.experiences = store.experiences.map((e) => (e.id === id ? { ...e, ...exp } : e));
  saveLocalStore(store);
  return store.experiences;
}

export async function deleteExperience(id: string): Promise<ExperienceData[]> {
  const store = getLocalStore();
  store.experiences = store.experiences.filter((e) => e.id !== id);
  saveLocalStore(store);
  return store.experiences;
}

// ---------------- EDUCATIONS ----------------

export async function getEducations(): Promise<EducationData[]> {
  const store = getLocalStore();
  return store.educations;
}

export async function addEducation(edu: Omit<EducationData, "id">): Promise<EducationData[]> {
  const store = getLocalStore();
  const newEdu: EducationData = { ...edu, id: `edu-${Date.now()}` };
  store.educations.push(newEdu);
  saveLocalStore(store);
  return store.educations;
}

export async function updateEducation(id: string, edu: Partial<EducationData>): Promise<EducationData[]> {
  const store = getLocalStore();
  store.educations = store.educations.map((e) => (e.id === id ? { ...e, ...edu } : e));
  saveLocalStore(store);
  return store.educations;
}

export async function deleteEducation(id: string): Promise<EducationData[]> {
  const store = getLocalStore();
  store.educations = store.educations.filter((e) => e.id !== id);
  saveLocalStore(store);
  return store.educations;
}

// ---------------- CERTIFICATIONS & LEADERSHIP ----------------

export async function getCertifications() {
  return initialCertifications;
}

export async function getLeadership() {
  return initialLeadership;
}

// ---------------- RESUME ----------------

export async function getResume() {
  const store = getLocalStore();
  return store.resume;
}

export async function updateResume(filePath: string, fileName: string, fileSize?: number) {
  const store = getLocalStore();
  store.resume = {
    fileName,
    filePath,
    fileSize: fileSize || 154000,
    updatedAt: new Date().toISOString(),
  };
  store.profile.resumeUrl = filePath;
  saveLocalStore(store);
  return store.resume;
}

// ---------------- CONTACT MESSAGES ----------------

export async function getContactMessages() {
  const store = getLocalStore();
  return store.messages;
}

export async function createContactMessage(data: { name: string; email: string; subject?: string; message: string }) {
  const newMsg = {
    id: `msg-${Date.now()}`,
    name: data.name,
    email: data.email,
    subject: data.subject || "Portfolio Contact Inquiry",
    message: data.message,
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  const store = getLocalStore();
  store.messages.unshift(newMsg);
  saveLocalStore(store);
  return newMsg;
}

export async function markMessageRead(id: string, isRead = true) {
  const store = getLocalStore();
  store.messages = store.messages.map((m) => (m.id === id ? { ...m, isRead } : m));
  saveLocalStore(store);
  return store.messages;
}

export async function deleteMessage(id: string) {
  const store = getLocalStore();
  store.messages = store.messages.filter((m) => m.id !== id);
  saveLocalStore(store);
  return store.messages;
}

// ---------------- WEBSITE SETTINGS ----------------

export async function getWebsiteSettings(): Promise<WebsiteSettingsData> {
  const store = getLocalStore();
  return store.settings;
}

export async function updateWebsiteSettings(data: Partial<WebsiteSettingsData>): Promise<WebsiteSettingsData> {
  const store = getLocalStore();
  const updated = { ...store.settings, ...data };
  store.settings = updated;
  saveLocalStore(store);
  return updated;
}

// ---------------- DASHBOARD STATS ----------------

export async function getDashboardStats() {
  const [profile, skills, projects, experiences, educations, messages] = await Promise.all([
    getProfile(),
    getSkills(),
    getProjects(),
    getExperiences(),
    getEducations(),
    getContactMessages(),
  ]);

  const unreadMessages = messages.filter((m) => !m.isRead).length;

  return {
    totalProjects: projects.length,
    totalSkills: skills.length,
    totalExperiences: experiences.length,
    totalEducations: educations.length,
    totalMessages: messages.length,
    unreadMessages,
    lastUpdated: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    profileName: profile.name,
    status: profile.status,
  };
}
