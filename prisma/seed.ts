import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  initialProfile,
  initialExperiences,
  initialEducations,
  initialWebsiteSettings,
  initialSkillsList,
  initialProjectsList,
} from "../src/data/initialData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed with exact existing portfolio content...");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "santhoshkumark2505@gmail.com";
  const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD || "Admin@Portfolio2026!";
  const hashedPassword = await bcrypt.hash(defaultPassword, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      name: "Santhoshkumar K",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin account seeded: ${admin.email}`);

  // 2. Seed Profile
  await prisma.profile.deleteMany();
  await prisma.profile.create({
    data: {
      name: initialProfile.name,
      title: initialProfile.title,
      tagline: initialProfile.tagline,
      bio: initialProfile.bio,
      approach: initialProfile.approach,
      funFact: initialProfile.funFact,
      location: initialProfile.location,
      status: initialProfile.status,
      phone: initialProfile.phone,
      email: initialProfile.email,
      githubUrl: initialProfile.githubUrl,
      linkedinUrl: initialProfile.linkedinUrl,
      resumeUrl: initialProfile.resumeUrl,
      avatarUrl: initialProfile.avatarUrl,
      domainInterests: initialProfile.domainInterests,
    },
  });
  console.log("✅ Profile information seeded");

  // 3. Seed Skills
  await prisma.skill.deleteMany();
  for (let i = 0; i < initialSkillsList.length; i++) {
    const s = initialSkillsList[i];
    await prisma.skill.create({
      data: {
        name: s.name,
        icon: s.icon,
        color: s.color,
        type: s.type,
        order: i,
        isVisible: true,
      },
    });
  }
  console.log(`✅ ${initialSkillsList.length} skills seeded`);

  // 4. Seed Projects
  await prisma.projectTechnology.deleteMany();
  await prisma.project.deleteMany();
  for (let i = 0; i < initialProjectsList.length; i++) {
    const p = initialProjectsList[i];
    await prisma.project.create({
      data: {
        numericId: p.id,
        title: p.title,
        description: p.description,
        githubUrl: p.githubUrl,
        demoUrl: p.demoUrl || null,
        imagePath: p.imagePath,
        isFeatured: i < 3, // First 3 are featured on home
        order: i,
        features: p.features || [],
        challenges: p.challenges || [],
        solutions: p.solutions || [],
        screenshots: p.screenshots || [],
        technologies: {
          create: (p.tags || []).map((tag) => ({ name: tag })),
        },
      },
    });
  }
  console.log(`✅ ${initialProjectsList.length} projects seeded with technologies`);

  // 5. Seed Experience
  await prisma.experience.deleteMany();
  for (let i = 0; i < initialExperiences.length; i++) {
    const e = initialExperiences[i];
    await prisma.experience.create({
      data: {
        role: e.role,
        company: e.company,
        date: e.date,
        type: e.type,
        order: i,
        description: e.description,
        techStack: e.techStack,
      },
    });
  }
  console.log(`✅ ${initialExperiences.length} experience entries seeded`);

  // 6. Seed Education
  await prisma.education.deleteMany();
  for (let i = 0; i < initialEducations.length; i++) {
    const edu = initialEducations[i];
    await prisma.education.create({
      data: {
        degree: edu.degree,
        institution: edu.institution,
        period: edu.period,
        grade: edu.grade,
        order: edu.order,
      },
    });
  }
  console.log(`✅ ${initialEducations.length} education entries seeded`);

  // 7. Seed Resume
  await prisma.resume.deleteMany();
  await prisma.resume.create({
    data: {
      title: "Santhoshkumar K - Resume",
      fileName: "Santhosh.pdf",
      filePath: "/Santhosh.pdf",
      fileSize: 154000,
      isActive: true,
    },
  });
  console.log("✅ Active resume document seeded");

  // 8. Seed Settings
  await prisma.websiteSettings.deleteMany();
  await prisma.websiteSettings.create({
    data: {
      siteTitle: initialWebsiteSettings.siteTitle,
      metaDescription: initialWebsiteSettings.metaDescription,
      ogImage: initialWebsiteSettings.ogImage,
      showExperience: true,
      showSkills: true,
      showProjects: true,
      showEducation: true,
      showContact: true,
    },
  });
  console.log("✅ Website settings seeded");

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

