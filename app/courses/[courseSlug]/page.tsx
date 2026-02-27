import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Lock, ArrowRight } from "lucide-react";
import { SEMESTER_NAMES, YEAR_THEMES } from "@/lib/course-data";

interface PageProps {
  params: Promise<{ courseSlug: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { courseSlug } = await params;
  const session = await auth();

  const course = await db.course.findUnique({
    where: { slug: courseSlug },
    include: {
      weeks: { orderBy: [{ semester: "asc" }, { weekNumber: "asc" }] },
      enrollments: session?.user?.id
        ? { where: { userId: session.user.id } }
        : false,
    },
  });

  if (!course) notFound();

  const isEnrolled = session?.user?.id
    ? (course.enrollments as { userId: string }[]).length > 0
    : false;

  // Get user progress
  const progressRecords = session?.user?.id
    ? await db.progress.findMany({
        where: {
          userId: session.user.id,
          week: { courseId: course.id },
          completed: true,
        },
        select: { weekId: true },
      })
    : [];

  const completedWeekIds = new Set(progressRecords.map((p) => p.weekId));

  // Group weeks by year and semester
  const semesterMap: Record<number, typeof course.weeks> = {};
  for (const week of course.weeks) {
    if (!semesterMap[week.semester]) semesterMap[week.semester] = [];
    semesterMap[week.semester].push(week);
  }

  const semesters = Object.keys(semesterMap)
    .map(Number)
    .sort((a, b) => a - b);

  // Group semesters into years (2 per year)
  const yearMap: Record<number, number[]> = {};
  for (const sem of semesters) {
    const year = Math.ceil(sem / 2);
    if (!yearMap[year]) yearMap[year] = [];
    yearMap[year].push(sem);
  }

  const totalCompleted = completedWeekIds.size;
  const s1Weeks = semesterMap[1] ?? [];
  const s1Completed = s1Weeks.filter((w) => completedWeekIds.has(w.id)).length;

  return (
    <div className="bg-white min-h-screen">
      {/* Course Header */}
      <div className="py-16 px-4" style={{ backgroundColor: "#0F1F3D" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="text-slate-400 hover:text-white text-sm transition-colors">
              Courses
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300 text-sm">{course.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <Badge
                className="mb-3 text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: "rgba(76,191,191,0.2)", color: "#4CBFBF", border: "none" }}
              >
                4-Year Program
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {course.title}
              </h1>
              <p className="text-slate-400 max-w-2xl leading-relaxed">
                {course.description}
              </p>
            </div>

            {isEnrolled && totalCompleted > 0 && (
              <div className="shrink-0 p-5 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                <div className="text-sm text-slate-400 mb-1">Your Progress</div>
                <div className="text-3xl font-bold" style={{ color: "#7AC943" }}>
                  {totalCompleted}
                </div>
                <div className="text-sm text-slate-400">weeks complete</div>
              </div>
            )}
          </div>

          {/* Semester 1 quick progress */}
          {isEnrolled && s1Weeks.length > 0 && (
            <div className="mt-8 p-5 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Semester 1 — Envisioning Your Future</span>
                <span style={{ color: "#7AC943" }}>{s1Completed} / {s1Weeks.length}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(s1Completed / s1Weeks.length) * 100}%`,
                    backgroundColor: "#7AC943",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Year/Semester Accordion */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          {Object.entries(yearMap).map(([yearStr, yearSemesters]) => {
            const year = Number(yearStr);
            return (
              <div key={year}>
                {/* Year header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                    style={{ backgroundColor: "#0F1F3D" }}
                  >
                    Y{year}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Year {year}
                    </div>
                    <div className="text-lg font-bold" style={{ color: "#0F1F3D" }}>
                      {YEAR_THEMES[year] ?? `Year ${year}`}
                    </div>
                  </div>
                </div>

                {/* Semesters in this year */}
                <div className="space-y-6 pl-14">
                  {yearSemesters.map((sem) => {
                    const weeks = semesterMap[sem] ?? [];
                    const semCompleted = weeks.filter((w) => completedWeekIds.has(w.id)).length;
                    const isFirstSem = sem === 1;

                    return (
                      <div
                        key={sem}
                        className="border border-slate-100 rounded-2xl overflow-hidden"
                      >
                        {/* Semester header */}
                        <div
                          className="flex items-center justify-between px-6 py-4"
                          style={{ backgroundColor: isFirstSem ? "rgba(245,130,30,0.05)" : "#FAFAFA" }}
                        >
                          <div>
                            <div
                              className="text-xs font-bold uppercase tracking-wider mb-0.5"
                              style={{ color: isFirstSem ? "#F5821E" : "#94A3B8" }}
                            >
                              Semester {sem}
                            </div>
                            <div className="font-semibold" style={{ color: "#0F1F3D" }}>
                              {SEMESTER_NAMES[sem] ?? `Semester ${sem}`}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {isEnrolled && (
                              <span className="text-sm text-slate-500">
                                {semCompleted}/{weeks.length} complete
                              </span>
                            )}
                            {!isEnrolled && (
                              <Badge variant="outline" className="text-xs">
                                {sem === 1 ? "Preview Available" : "Enroll to Access"}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Week cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                          {weeks.map((week) => {
                            const isComplete = completedWeekIds.has(week.id);
                            const canAccess = isEnrolled || sem === 1;

                            return (
                              <Link
                                key={week.id}
                                href={
                                  canAccess
                                    ? `/courses/${courseSlug}/semester/${sem}/week/${week.weekNumber}`
                                    : "/signup"
                                }
                              >
                                <div
                                  className={`p-4 rounded-xl border transition-all ${
                                    isComplete
                                      ? "border-green-200 bg-green-50"
                                      : canAccess
                                      ? "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                                      : "border-slate-100 bg-slate-50 opacity-60"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="mt-0.5 shrink-0">
                                      {isComplete ? (
                                        <CheckCircle2
                                          className="w-5 h-5"
                                          style={{ color: "#7AC943" }}
                                        />
                                      ) : canAccess ? (
                                        <Circle className="w-5 h-5 text-slate-300" />
                                      ) : (
                                        <Lock className="w-4 h-4 text-slate-300" />
                                      )}
                                    </div>
                                    <div>
                                      <div className="text-xs text-slate-400 mb-0.5">
                                        Week {week.weekNumber}
                                      </div>
                                      <div
                                        className="text-sm font-medium leading-tight"
                                        style={{ color: "#0F1F3D" }}
                                      >
                                        {week.title}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA if not enrolled */}
        {!isEnrolled && (
          <div
            className="mt-12 p-8 rounded-2xl text-center"
            style={{ backgroundColor: "#0F1F3D" }}
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to start?
            </h3>
            <p className="text-slate-400 mb-6">
              Create your free account to enroll and begin Week 1 today.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="gap-2"
                style={{ backgroundColor: "#F5821E", color: "white" }}
              >
                Enroll Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
