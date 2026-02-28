import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Circle, Flame, Sparkles } from "lucide-react";

// Artifact framing — what students "made" each week
const WEEK_ARTIFACTS: Record<number, string> = {
  1: "Set up your digital home base",
  2: "Built your Pinterest inspiration board",
  3: "Created your personal avatar",
  4: "Wrote your Dream Day story",
  5: "Made your mood map",
  6: "Designed your vision board",
  7: "Built your personal brand board",
  8: "Created your digital introduction",
  9: "Made your first Canva design",
  10: "Wrote your career interests page",
  11: "Built your digital portfolio draft",
  12: "Completed your Semester 1 showcase",
};

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

  const completedWeekIds = new Set(user.progress.map((p) => p.weekId));
  const totalCompleted = user.progress.length;
  const firstName = user.name?.split(" ")[0] ?? "there";

  return (
    <div style={{ backgroundColor: "#F8FAFC" }} className="min-h-screen">

      {/* ── Header ── */}
      <div style={{ backgroundColor: "#0F1F3D" }} className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4" style={{ color: "#F07B2A" }} />
                <span className="text-sm font-medium" style={{ color: "#F07B2A" }}>
                  Your Journey
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {totalCompleted === 0
                  ? `Let's go, ${firstName}! Your first week is ready.`
                  : `Keep going, ${firstName}! You're doing great.`}
              </h1>
              <p style={{ color: "#7fc6c7" }} className="text-sm font-medium">
                {totalCompleted === 0
                  ? "Week 1 is waiting — let's make something real today."
                  : `You've made ${totalCompleted} thing${totalCompleted !== 1 ? "s" : ""} so far. That's real progress.`}
              </p>
            </div>
            {user.role === "ADMIN" && (
              <Link href="/admin">
                <Badge className="text-xs font-bold" style={{ backgroundColor: "#7AC943", color: "white", border: "none" }}>
                  Admin Panel →
                </Badge>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {user.enrollments.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🌱</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#0F1F3D" }}>
              Your journey hasn&apos;t started yet
            </h2>
            <p className="text-slate-500 mb-6">
              Head to the programs page to get started.
            </p>
            <Link href="/courses">
              <Button style={{ backgroundColor: "#F07B2A", color: "white" }}>
                See the programs <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Main column ── */}
            <div className="lg:col-span-2 space-y-8">
              {user.enrollments.map((enrollment) => {
                const course = enrollment.course;
                const semester1Weeks = course.weeks.filter((w) => w.semester === 1);
                const s1Completed = semester1Weeks.filter((w) => completedWeekIds.has(w.id)).length;
                const nextWeek = semester1Weeks.find((w) => !completedWeekIds.has(w.id));
                const allDone = s1Completed === semester1Weeks.length && semester1Weeks.length > 0;

                return (
                  <div key={enrollment.id} className="space-y-5">

                    {/* ── Big "Continue" CTA ── */}
                    {!allDone && nextWeek && (
                      <div
                        className="rounded-2xl p-6"
                        style={{ background: "linear-gradient(135deg, #0F1F3D 0%, #1a3060 100%)" }}
                      >
                        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#7fc6c7" }}>
                          Up next
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          Week {nextWeek.weekNumber} — {nextWeek.title}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: "#94A3B8" }}>
                          Semester 1 · {s1Completed} of {semester1Weeks.length} done
                        </p>
                        <Link href={`/courses/${course.slug}/semester/1/week/${nextWeek.weekNumber}`}>
                          <button className="helix-btn-pill helix-btn-primary gap-2">
                            <Flame className="w-4 h-4" />
                            Let&apos;s go!
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
                    )}

                    {allDone && (
                      <div
                        className="rounded-2xl p-6 text-center"
                        style={{ background: "linear-gradient(135deg, #1a3a1a 0%, #0a2a0a 100%)" }}
                      >
                        <div className="text-4xl mb-2">🏆</div>
                        <h3 className="text-xl font-bold text-white mb-1">Semester 1 complete!</h3>
                        <p className="text-sm" style={{ color: "#7AC943" }}>
                          You finished all 12 weeks. That&apos;s something to be proud of.
                        </p>
                      </div>
                    )}

                    {/* ── Journey map — Semester 1 weeks ── */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6">
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "#F07B2A" }}>
                            Semester 1
                          </div>
                          <h3 className="font-bold" style={{ color: "#0F1F3D" }}>
                            Envisioning Your Future
                          </h3>
                        </div>
                        <span className="text-sm font-semibold" style={{ color: "#7AC943" }}>
                          {s1Completed} / {semester1Weeks.length}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2 rounded-full bg-slate-100 mb-6">
                        <div
                          className="h-2 rounded-full transition-all duration-700"
                          style={{
                            width: `${semester1Weeks.length > 0 ? (s1Completed / semester1Weeks.length) * 100 : 0}%`,
                            backgroundColor: allDone ? "#7AC943" : "#F07B2A",
                          }}
                        />
                      </div>

                      {/* Week-by-week journey */}
                      <div className="space-y-2">
                        {semester1Weeks.map((week) => {
                          const done = completedWeekIds.has(week.id);
                          const isCurrent = nextWeek?.id === week.id;
                          return (
                            <Link
                              key={week.id}
                              href={`/courses/${course.slug}/semester/1/week/${week.weekNumber}`}
                            >
                              <div
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                                  done
                                    ? "bg-green-50 border border-green-100"
                                    : isCurrent
                                    ? "border-2 cursor-pointer hover:shadow-sm"
                                    : "opacity-50 cursor-default"
                                }`}
                                style={isCurrent ? { borderColor: "#F07B2A", backgroundColor: "rgba(240,123,42,0.04)" } : {}}
                              >
                                <div className="shrink-0">
                                  {done ? (
                                    <CheckCircle2 className="w-5 h-5" style={{ color: "#7AC943" }} />
                                  ) : isCurrent ? (
                                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "#F07B2A" }}>
                                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#F07B2A" }} />
                                    </div>
                                  ) : (
                                    <Circle className="w-5 h-5 text-slate-300" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-400 shrink-0">
                                      Week {week.weekNumber}
                                    </span>
                                    {isCurrent && (
                                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(240,123,42,0.1)", color: "#F07B2A" }}>
                                        Up next
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm font-medium truncate" style={{ color: done ? "#166534" : "#0F1F3D" }}>
                                    {week.title}
                                  </div>
                                  {done && WEEK_ARTIFACTS[week.weekNumber] && (
                                    <div className="text-xs text-slate-400 mt-0.5">
                                      ✓ {WEEK_ARTIFACTS[week.weekNumber]}
                                    </div>
                                  )}
                                </div>
                                {(done || isCurrent) && (
                                  <ArrowRight className="w-4 h-4 shrink-0 text-slate-300" />
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">

              {/* What you've made */}
              {totalCompleted > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h3 className="font-bold mb-4" style={{ color: "#0F1F3D" }}>
                    Look What You Made 🎨
                  </h3>
                  <div className="space-y-3">
                    {user.progress.slice(0, 4).map((p) => (
                      <div key={p.id} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#7AC943" }} />
                        <div>
                          <div className="text-sm font-medium" style={{ color: "#0F1F3D" }}>
                            {p.week.title}
                          </div>
                          {WEEK_ARTIFACTS[p.week.weekNumber] && (
                            <div className="text-xs text-slate-400">
                              {WEEK_ARTIFACTS[p.week.weekNumber]}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {totalCompleted > 4 && (
                      <p className="text-xs text-slate-400">
                        + {totalCompleted - 4} more things made
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Milestones */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-bold mb-4" style={{ color: "#0F1F3D" }}>
                  Your Milestones
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "First thing made!", sub: "Week 1 done", unlocked: totalCompleted >= 1, color: "#F07B2A", emoji: "⭐" },
                    { label: "Halfway through!", sub: "6 weeks done", unlocked: totalCompleted >= 6, color: "#5CBFBF", emoji: "🌟" },
                    { label: "Semester 1 graduate", sub: "All 12 weeks done", unlocked: totalCompleted >= 12, color: "#7AC943", emoji: "🏆" },
                  ].map((badge) => (
                    <div
                      key={badge.label}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${badge.unlocked ? "" : "opacity-40"}`}
                      style={{ backgroundColor: badge.unlocked ? `${badge.color}12` : "#F8FAFC" }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                        style={{ backgroundColor: badge.unlocked ? badge.color : "#E2E8F0" }}
                      >
                        {badge.unlocked ? badge.emoji : "🔒"}
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: badge.unlocked ? "#0F1F3D" : "#94A3B8" }}>
                          {badge.label}
                        </div>
                        <div className="text-xs text-slate-400">{badge.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio teaser */}
              <div
                className="p-5 rounded-2xl"
                style={{ background: "linear-gradient(135deg, #0F1F3D, #1a3060)" }}
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#7fc6c7" }}>
                  Coming at Semester End
                </div>
                <h4 className="text-white font-bold mb-1">Your Digital Portfolio</h4>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "#94A3B8" }}>
                  Complete all 12 weeks to get your personal portfolio — everything you made, all in one place.
                </p>
                <div className="h-1.5 rounded-full bg-white/10 mb-1">
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min((totalCompleted / 12) * 100, 100)}%`,
                      backgroundColor: "#7fc6c7",
                    }}
                  />
                </div>
                <div className="text-xs" style={{ color: "#64748B" }}>
                  {totalCompleted}/12 weeks done
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
