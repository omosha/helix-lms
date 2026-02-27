import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Award,
  Flame,
  LayoutDashboard,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      enrollments: {
        include: {
          course: {
            include: {
              weeks: { orderBy: [{ semester: "asc" }, { weekNumber: "asc" }] },
            },
          },
        },
      },
      progress: {
        where: { completed: true },
        include: { week: true },
        orderBy: { completedAt: "desc" },
      },
    },
  });

  if (!user) redirect("/signin");

  const totalCompleted = user.progress.length;
  const lastCompleted = user.progress[0];

  return (
    <div style={{ backgroundColor: "#F8FAFC" }} className="min-h-screen">
      {/* Header */}
      <div style={{ backgroundColor: "#0F1F3D" }} className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <LayoutDashboard className="w-5 h-5" style={{ color: "#4CBFBF" }} />
                <span className="text-sm font-medium" style={{ color: "#4CBFBF" }}>
                  My Dashboard
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Hey, {user.name?.split(" ")[0] ?? "there"}! 👋
              </h1>
              <p className="text-slate-400">
                {totalCompleted === 0
                  ? "Ready to start your journey? Your first week is waiting!"
                  : `You've completed ${totalCompleted} week${totalCompleted !== 1 ? "s" : ""}. Keep it going!`}
              </p>
            </div>

            {/* Role badge */}
            {user.role === "ADMIN" && (
              <Link href="/admin">
                <Badge
                  className="text-xs font-bold"
                  style={{ backgroundColor: "#7AC943", color: "white", border: "none" }}
                >
                  Admin Panel →
                </Badge>
              </Link>
            )}
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              {
                label: "Weeks Complete",
                value: totalCompleted,
                color: "#7AC943",
              },
              {
                label: "Courses Enrolled",
                value: user.enrollments.length,
                color: "#4CBFBF",
              },
              {
                label: "Current Streak",
                value: `${totalCompleted > 0 ? "Active" : "Not started"}`,
                color: "#F5821E",
              },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {user.enrollments.length === 0 ? (
          /* Not enrolled */
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <h2 className="text-xl font-bold mb-2" style={{ color: "#0F1F3D" }}>
              You&apos;re not enrolled in any courses yet
            </h2>
            <p className="text-slate-500 mb-6">
              Browse the course catalog and start your Digital Pathways journey.
            </p>
            <Link href="/courses">
              <Button style={{ backgroundColor: "#F5821E", color: "white" }}>
                Browse Courses <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enrolled courses - main column */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold" style={{ color: "#0F1F3D" }}>
                My Courses
              </h2>

              {user.enrollments.map((enrollment) => {
                const course = enrollment.course;
                const allWeeks = course.weeks;
                const semester1Weeks = allWeeks.filter((w) => w.semester === 1);
                const completedWeekIds = new Set(
                  user.progress.map((p) => p.weekId)
                );
                const s1Completed = semester1Weeks.filter((w) =>
                  completedWeekIds.has(w.id)
                ).length;
                const totalCourseCompleted = allWeeks.filter((w) =>
                  completedWeekIds.has(w.id)
                ).length;

                // Find next incomplete week in semester 1
                const nextWeek = semester1Weeks.find(
                  (w) => !completedWeekIds.has(w.id)
                );

                return (
                  <div
                    key={enrollment.id}
                    className="bg-white rounded-2xl border border-slate-100 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: "rgba(245,130,30,0.1)", color: "#F5821E" }}
                        >
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold" style={{ color: "#0F1F3D" }}>
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {totalCourseCompleted} of {allWeeks.length} weeks complete
                          </p>
                        </div>
                      </div>
                      <Link href={`/courses/${course.slug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>

                    {/* Semester 1 progress */}
                    <div className="mb-5">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500 font-medium">
                          Semester 1 — Envisioning Your Future
                        </span>
                        <span style={{ color: "#7AC943" }} className="font-semibold">
                          {s1Completed}/{semester1Weeks.length}
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-100">
                        <div
                          className="h-3 rounded-full transition-all duration-700"
                          style={{
                            width: `${semester1Weeks.length > 0 ? (s1Completed / semester1Weeks.length) * 100 : 0}%`,
                            backgroundColor: s1Completed === semester1Weeks.length ? "#7AC943" : "#F5821E",
                          }}
                        />
                      </div>
                    </div>

                    {/* Continue CTA */}
                    {nextWeek ? (
                      <Link
                        href={`/courses/${course.slug}/semester/1/week/${nextWeek.weekNumber}`}
                      >
                        <Button
                          className="w-full gap-2"
                          style={{ backgroundColor: "#0F1F3D", color: "white" }}
                        >
                          <Flame className="w-4 h-4" style={{ color: "#F5821E" }} />
                          Continue: Week {nextWeek.weekNumber} — {nextWeek.title}
                        </Button>
                      </Link>
                    ) : s1Completed === semester1Weeks.length && semester1Weeks.length > 0 ? (
                      <div
                        className="flex items-center justify-center gap-2 p-3 rounded-xl"
                        style={{ backgroundColor: "rgba(122,201,67,0.1)", color: "#7AC943" }}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="font-semibold text-sm">
                          Semester 1 Complete! Amazing work!
                        </span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Achievements */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3
                  className="flex items-center gap-2 font-bold mb-4"
                  style={{ color: "#0F1F3D" }}
                >
                  <Award className="w-5 h-5" style={{ color: "#F5821E" }} />
                  Your Milestones
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "First Week Done!",
                      unlocked: totalCompleted >= 1,
                      color: "#F5821E",
                    },
                    {
                      label: "Halfway There (6 weeks)",
                      unlocked: totalCompleted >= 6,
                      color: "#4CBFBF",
                    },
                    {
                      label: "Semester 1 Graduate",
                      unlocked: totalCompleted >= 12,
                      color: "#7AC943",
                    },
                  ].map((badge) => (
                    <div
                      key={badge.label}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        badge.unlocked ? "opacity-100" : "opacity-40"
                      }`}
                      style={{
                        backgroundColor: badge.unlocked
                          ? `${badge.color}10`
                          : "#F8FAFC",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                        style={{
                          backgroundColor: badge.unlocked ? badge.color : "#E2E8F0",
                        }}
                      >
                        {badge.unlocked ? "⭐" : "🔒"}
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: badge.unlocked ? "#0F1F3D" : "#94A3B8" }}
                      >
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              {lastCompleted && (
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h3 className="font-bold mb-3" style={{ color: "#0F1F3D" }}>
                    Last Completed
                  </h3>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "#7AC943" }} />
                    <div>
                      <div className="text-sm font-medium" style={{ color: "#0F1F3D" }}>
                        {lastCompleted.week.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        Week {lastCompleted.week.weekNumber}, Semester{" "}
                        {lastCompleted.week.semester}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Pathway Profile teaser */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #0F1F3D, #1a3060)",
                }}
              >
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "#4CBFBF" }}
                >
                  Coming at Year 1 End
                </div>
                <h4 className="text-white font-bold mb-1">
                  Personal Pathway Profile
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Complete all of Year 1 to receive your personalized profile:
                  interest clusters, skill strengths, and suggested Year 2 pathway.
                </p>
                <div className="mt-3 h-1.5 rounded-full bg-white/10">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${Math.min((totalCompleted / 24) * 100, 100)}%`,
                      backgroundColor: "#4CBFBF",
                    }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {totalCompleted}/24 weeks complete
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
