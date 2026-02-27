import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle2, Wrench, ListChecks } from "lucide-react";
import { MarkCompleteButton } from "@/components/course/MarkCompleteButton";

interface PageProps {
  params: Promise<{
    courseSlug: string;
    sem: string;
    week: string;
  }>;
}

export default async function WeekLessonPage({ params }: PageProps) {
  const { courseSlug, sem, week: weekNum } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/signin?callbackUrl=/courses/${courseSlug}/semester/${sem}/week/${weekNum}`);
  }

  const course = await db.course.findUnique({
    where: { slug: courseSlug },
    include: {
      enrollments: { where: { userId: session.user.id } },
    },
  });

  if (!course) notFound();

  // Allow semester 1 even if not enrolled (preview), require enrollment for others
  const isEnrolled = course.enrollments.length > 0;
  if (!isEnrolled && Number(sem) > 1) {
    redirect(`/courses/${courseSlug}`);
  }

  const week = await db.week.findFirst({
    where: {
      courseId: course.id,
      semester: Number(sem),
      weekNumber: Number(weekNum),
    },
  });

  if (!week) notFound();

  // Get adjacent weeks for navigation
  const [prevWeek, nextWeek] = await Promise.all([
    db.week.findFirst({
      where: {
        courseId: course.id,
        semester: Number(sem),
        weekNumber: Number(weekNum) - 1,
      },
      select: { weekNumber: true, title: true },
    }),
    db.week.findFirst({
      where: {
        courseId: course.id,
        semester: Number(sem),
        weekNumber: Number(weekNum) + 1,
      },
      select: { weekNumber: true, title: true },
    }),
  ]);

  const progress = await db.progress.findUnique({
    where: { userId_weekId: { userId: session.user.id, weekId: week.id } },
  });

  const isCompleted = progress?.completed ?? false;

  const activities: string[] = JSON.parse(week.activities);
  const tools: string[] = JSON.parse(week.tools);

  const semesterTotal = await db.week.count({
    where: { courseId: course.id, semester: Number(sem) },
  });

  const semesterCompleted = await db.progress.count({
    where: {
      userId: session.user.id,
      completed: true,
      week: { courseId: course.id, semester: Number(sem) },
    },
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Top progress bar */}
      <div className="h-1 bg-slate-100">
        <div
          className="h-1 transition-all duration-500"
          style={{
            width: `${(semesterCompleted / semesterTotal) * 100}%`,
            backgroundColor: "#7AC943",
          }}
        />
      </div>

      {/* Header */}
      <div style={{ backgroundColor: "#0F1F3D" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/courses" className="hover:text-white transition-colors">
              Courses
            </Link>
            <span>/</span>
            <Link href={`/courses/${courseSlug}`} className="hover:text-white transition-colors">
              {course.title}
            </Link>
            <span>/</span>
            <span>Semester {sem}</span>
            <span>/</span>
            <span className="text-slate-200">Week {week.weekNumber}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div
                className="flex items-center gap-2 text-sm mb-2"
                style={{ color: "#F5821E" }}
              >
                <span className="font-bold uppercase tracking-wider text-xs">
                  Week {week.weekNumber} of {semesterTotal}
                </span>
                {isCompleted && (
                  <span
                    className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "rgba(122,201,67,0.2)", color: "#7AC943" }}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Completed!
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {week.title}
              </h1>
            </div>

            {/* Semester progress pill */}
            <div
              className="hidden sm:flex flex-col items-end shrink-0 ml-4"
            >
              <span className="text-xs text-slate-400 mb-1">Semester Progress</span>
              <span className="text-lg font-bold" style={{ color: "#7AC943" }}>
                {semesterCompleted}/{semesterTotal}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <p className="text-lg text-slate-600 leading-relaxed">
                {week.description}
              </p>
            </div>

            {/* Activities */}
            <div>
              <h2
                className="flex items-center gap-2 text-xl font-bold mb-5"
                style={{ color: "#0F1F3D" }}
              >
                <ListChecks className="w-5 h-5" style={{ color: "#F5821E" }} />
                What You&apos;ll Do This Week
              </h2>
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl"
                    style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0" }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                      style={{ backgroundColor: "#0F1F3D", color: "#FFFFFF" }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{activity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mark Complete */}
            <div
              className="p-6 rounded-2xl border-2"
              style={{
                borderColor: isCompleted ? "#7AC943" : "#F5821E",
                backgroundColor: isCompleted
                  ? "rgba(122,201,67,0.05)"
                  : "rgba(245,130,30,0.05)",
              }}
            >
              {isCompleted ? (
                <div className="flex items-center gap-3 text-center justify-center">
                  <CheckCircle2
                    className="w-8 h-8"
                    style={{ color: "#7AC943" }}
                  />
                  <div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: "#7AC943" }}
                    >
                      You crushed it! Week {week.weekNumber} is done.
                    </div>
                    <div className="text-sm text-slate-500">
                      Keep going — the next week is waiting for you!
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-slate-600 mb-4 text-sm">
                    Finished all the activities? Make sure you saved your work,
                    then mark this week complete!
                  </p>
                  <MarkCompleteButton weekId={week.id} courseSlug={courseSlug} />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tools needed */}
            <div
              className="p-5 rounded-2xl"
              style={{ backgroundColor: "#0F1F3D" }}
            >
              <h3
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4"
                style={{ color: "#4CBFBF" }}
              >
                <Wrench className="w-4 h-4" />
                Tools You&apos;ll Use
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Badge
                    key={tool}
                    className="text-xs"
                    style={{
                      backgroundColor: "rgba(76,191,191,0.15)",
                      color: "#4CBFBF",
                      border: "1px solid rgba(76,191,191,0.3)",
                    }}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Learning goals */}
            <div
              className="p-5 rounded-2xl border border-slate-100"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-500">
                Remember This Week
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span style={{ color: "#F5821E" }}>→</span>
                  Take your time — there&apos;s no rush
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#4CBFBF" }}>→</span>
                  Save your work as you go
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#7AC943" }}>→</span>
                  Ask for help whenever you need it
                </li>
              </ul>
            </div>

            {/* Semester overview */}
            <Link href={`/courses/${courseSlug}`}>
              <div
                className="p-4 rounded-xl text-sm text-center cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "rgba(15,31,61,0.05)", color: "#0F1F3D" }}
              >
                View full course overview →
              </div>
            </Link>
          </div>
        </div>

        {/* Week Navigation */}
        <div
          className="mt-12 pt-8 flex items-center justify-between border-t border-slate-100"
        >
          {prevWeek ? (
            <Link
              href={`/courses/${courseSlug}/semester/${sem}/week/${prevWeek.weekNumber}`}
            >
              <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <div>
                  <div className="text-xs text-slate-400">Previous Week</div>
                  <div className="font-medium">{prevWeek.title}</div>
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextWeek ? (
            <Link
              href={`/courses/${courseSlug}/semester/${sem}/week/${nextWeek.weekNumber}`}
            >
              <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors text-right">
                <div>
                  <div className="text-xs text-slate-400">Next Week</div>
                  <div className="font-medium">{nextWeek.title}</div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ) : (
            <Link href={`/courses/${courseSlug}`}>
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#7AC943" }}>
                Back to Course Overview
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
