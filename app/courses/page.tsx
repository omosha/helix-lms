import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Clock, Layers } from "lucide-react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export default async function CoursesPage() {
  const session = await auth();

  const courses = await db.course.findMany({
    include: {
      _count: { select: { weeks: true, enrollments: true } },
      enrollments: session?.user?.id
        ? { where: { userId: session.user.id } }
        : false,
    },
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div
        className="py-16 px-4"
        style={{ backgroundColor: "#0F1F3D" }}
      >
        <div className="max-w-7xl mx-auto">
          <Badge
            className="mb-4 text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: "rgba(245,130,30,0.15)", color: "#F5821E", border: "none" }}
          >
            Course Catalog
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Digital Pathways Program
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            A 4-year workforce readiness track built on 12-week modular semesters.
            Move through Vision → Skill → Practice → Portfolio → Pathway.
          </p>
        </div>
      </div>

      {/* Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {courses.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No courses available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course) => {
              const isEnrolled = session?.user?.id
                ? (course.enrollments as { userId: string; courseId: string }[]).length > 0
                : false;

              return (
                <div
                  key={course.id}
                  className="rounded-2xl border border-slate-100 p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(245,130,30,0.1)", color: "#F5821E" }}
                    >
                      <BookOpen className="w-6 h-6" />
                    </div>
                    {isEnrolled && (
                      <Badge style={{ backgroundColor: "#7AC943", color: "white", border: "none" }}>
                        Enrolled
                      </Badge>
                    )}
                  </div>

                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: "#0F1F3D" }}
                  >
                    {course.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-6 mb-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      8 Semesters
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {course.totalWeeks} Weeks Total
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      {course._count.enrollments} Students
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/courses/${course.slug}`} className="flex-1">
                      <Button
                        className="w-full gap-2"
                        style={{ backgroundColor: "#0F1F3D", color: "white" }}
                      >
                        View Program <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    {!session?.user && (
                      <Link href="/signup">
                        <Button
                          variant="outline"
                          style={{ borderColor: "#F5821E", color: "#F5821E" }}
                        >
                          Enroll Free
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
