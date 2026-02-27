import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, TrendingUp, CheckCircle2 } from "lucide-react";
import { AdminUserRow } from "@/components/dashboard/AdminUserRow";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const [users, courses, totalProgress] = await Promise.all([
    db.user.findMany({
      include: {
        enrollments: { include: { course: true } },
        progress: { where: { completed: true } },
        _count: { select: { progress: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.course.findMany({
      include: {
        _count: { select: { enrollments: true, weeks: true } },
      },
    }),
    db.progress.count({ where: { completed: true } }),
  ]);

  const totalStudents = users.filter((u) => u.role === "STUDENT").length;
  const totalEnrollments = await db.enrollment.count();

  return (
    <div style={{ backgroundColor: "#F8FAFC" }} className="min-h-screen">
      {/* Header */}
      <div style={{ backgroundColor: "#0F1F3D" }} className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <Badge
            className="mb-3 text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: "rgba(122,201,67,0.2)", color: "#7AC943", border: "none" }}
          >
            Admin Panel
          </Badge>
          <h1 className="text-3xl font-bold text-white mb-1">
            Program Overview
          </h1>
          <p className="text-slate-400">
            Manage students, track progress, and oversee the Digital Pathways Program.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "Total Students",
              value: totalStudents,
              icon: <Users className="w-5 h-5" />,
              color: "#4CBFBF",
            },
            {
              label: "Total Enrollments",
              value: totalEnrollments,
              icon: <BookOpen className="w-5 h-5" />,
              color: "#F5821E",
            },
            {
              label: "Weeks Completed",
              value: totalProgress,
              icon: <CheckCircle2 className="w-5 h-5" />,
              color: "#7AC943",
            },
            {
              label: "Active Courses",
              value: courses.length,
              icon: <TrendingUp className="w-5 h-5" />,
              color: "#F5821E",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-100 p-5"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="text-2xl font-bold" style={{ color: "#0F1F3D" }}>
                {stat.value}
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Course overview */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-8">
          <h2 className="font-bold text-lg mb-4" style={{ color: "#0F1F3D" }}>
            Courses
          </h2>
          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ backgroundColor: "#F8FAFC" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(245,130,30,0.1)", color: "#F5821E" }}
                  >
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm" style={{ color: "#0F1F3D" }}>
                      {course.title}
                    </div>
                    <div className="text-xs text-slate-400">
                      {course._count.weeks} weeks · {course._count.enrollments} enrolled
                    </div>
                  </div>
                </div>
                <Badge
                  style={{ backgroundColor: "#7AC943", color: "white", border: "none" }}
                  className="text-xs"
                >
                  Active
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* User management table */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="font-bold text-lg" style={{ color: "#0F1F3D" }}>
              All Users ({users.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "#F8FAFC" }}>
                  {["Name", "Email", "Role", "Enrolled", "Weeks Done", "Last Active"].map(
                    (header) => (
                      <th
                        key={header}
                        className="text-left text-xs font-bold uppercase tracking-wider px-6 py-3"
                        style={{ color: "#64748B" }}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <AdminUserRow key={user.id} user={user} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
