import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { weekId } = await req.json();

  if (!weekId) {
    return NextResponse.json({ error: "weekId is required" }, { status: 400 });
  }

  // Verify the week exists and user is enrolled in the course
  const week = await db.week.findUnique({
    where: { id: weekId },
    include: { course: { include: { enrollments: { where: { userId: session.user.id } } } } },
  });

  if (!week) {
    return NextResponse.json({ error: "Week not found" }, { status: 404 });
  }

  if (week.course.enrollments.length === 0) {
    return NextResponse.json({ error: "Not enrolled in this course" }, { status: 403 });
  }

  const progress = await db.progress.upsert({
    where: { userId_weekId: { userId: session.user.id, weekId } },
    update: { completed: true, completedAt: new Date() },
    create: {
      userId: session.user.id,
      weekId,
      completed: true,
      completedAt: new Date(),
    },
  });

  return NextResponse.json({ success: true, progress });
}

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  const progress = await db.progress.findMany({
    where: {
      userId: session.user.id,
      week: courseId ? { courseId } : undefined,
    },
    include: { week: true },
  });

  return NextResponse.json({ progress });
}
