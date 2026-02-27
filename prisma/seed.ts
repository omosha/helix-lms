import { PrismaClient } from "../lib/generated/prisma";
import bcrypt from "bcryptjs";
import { ALL_COURSES } from "../lib/course-data";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Helix LMS database...");

  // Primary admin — Brant Hindman
  const brantPassword = await bcrypt.hash("HelixAdmin2026!", 12);
  const brant = await db.user.upsert({
    where: { email: "branthindman@gmail.com" },
    update: { role: "ADMIN", name: "Brant Hindman" },
    create: {
      email: "branthindman@gmail.com",
      name: "Brant Hindman",
      password: brantPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Primary admin:", brant.email);

  // Create fallback admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await db.user.upsert({
    where: { email: "admin@helixacademy.org" },
    update: {},
    create: {
      email: "admin@helixacademy.org",
      name: "Helix Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user:", admin.email);

  // Create demo student
  const studentPassword = await bcrypt.hash("student123", 12);
  const student = await db.user.upsert({
    where: { email: "student@helixacademy.org" },
    update: {},
    create: {
      email: "student@helixacademy.org",
      name: "Alex Rivera",
      password: studentPassword,
      role: "STUDENT",
    },
  });
  console.log("✅ Demo student:", student.email);

  // Seed courses
  for (const courseData of ALL_COURSES) {
    const course = await db.course.upsert({
      where: { slug: courseData.slug },
      update: {
        title: courseData.title,
        description: courseData.description,
        totalWeeks: courseData.totalWeeks,
      },
      create: {
        slug: courseData.slug,
        title: courseData.title,
        description: courseData.description,
        year: courseData.year,
        totalWeeks: courseData.totalWeeks,
      },
    });
    console.log(`✅ Course: ${course.title}`);

    // Seed weeks
    for (const weekData of courseData.weeks) {
      await db.week.upsert({
        where: {
          // Use a composite unique identifier approach
          id: `${course.id}-s${weekData.semester}-w${weekData.weekNumber}`,
        },
        update: {
          title: weekData.title,
          description: weekData.description,
          activities: JSON.stringify(weekData.activities),
          tools: JSON.stringify(weekData.tools),
        },
        create: {
          id: `${course.id}-s${weekData.semester}-w${weekData.weekNumber}`,
          courseId: course.id,
          semester: weekData.semester,
          weekNumber: weekData.weekNumber,
          title: weekData.title,
          description: weekData.description,
          activities: JSON.stringify(weekData.activities),
          tools: JSON.stringify(weekData.tools),
        },
      });
    }
    console.log(`✅ Seeded ${courseData.weeks.length} weeks`);

    // Enroll demo student in the course
    await db.enrollment.upsert({
      where: { userId_courseId: { userId: student.id, courseId: course.id } },
      update: {},
      create: { userId: student.id, courseId: course.id },
    });
    console.log("✅ Enrolled demo student");

    // Mark first 3 weeks complete for demo student
    const firstThreeWeeks = await db.week.findMany({
      where: { courseId: course.id, semester: 1 },
      orderBy: { weekNumber: "asc" },
      take: 3,
    });

    for (const week of firstThreeWeeks) {
      await db.progress.upsert({
        where: { userId_weekId: { userId: student.id, weekId: week.id } },
        update: {},
        create: {
          userId: student.id,
          weekId: week.id,
          completed: true,
          completedAt: new Date(),
        },
      });
    }
    console.log("✅ Demo progress: 3 weeks marked complete");
  }

  console.log("\n🎉 Seeding complete!");
  console.log("   Admin:   admin@helixacademy.org / admin123");
  console.log("   Student: student@helixacademy.org / student123");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
