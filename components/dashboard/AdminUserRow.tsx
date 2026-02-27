"use client";

import { Badge } from "@/components/ui/badge";

interface UserWithRelations {
  id: string;
  name: string | null;
  email: string;
  role: "STUDENT" | "ADMIN" | "USER";
  createdAt: Date;
  enrollments: { course: { title: string } }[];
  progress: { weekId: string }[];
  _count: { progress: number };
}

interface AdminUserRowProps {
  user: UserWithRelations;
  index: number;
}

const ROLE_COLORS = {
  ADMIN: { bg: "#7AC943", text: "white" },
  STUDENT: { bg: "rgba(76,191,191,0.15)", text: "#4CBFBF" },
  USER: { bg: "rgba(148,163,184,0.15)", text: "#64748B" },
};

export function AdminUserRow({ user, index }: AdminUserRowProps) {
  const roleColors = ROLE_COLORS[user.role];
  const completedCount = user.progress.length;

  return (
    <tr
      className="border-t border-slate-50 hover:bg-slate-50 transition-colors"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ backgroundColor: index % 2 === 0 ? "#0F1F3D" : "#4CBFBF" }}
          >
            {(user.name?.[0] ?? user.email[0]).toUpperCase()}
          </div>
          <span className="font-medium text-sm" style={{ color: "#0F1F3D" }}>
            {user.name ?? "—"}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">{user.email}</td>
      <td className="px-6 py-4">
        <Badge
          className="text-xs font-semibold"
          style={{
            backgroundColor: roleColors.bg,
            color: roleColors.text,
            border: "none",
          }}
        >
          {user.role}
        </Badge>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500">
        {user.enrollments.length > 0
          ? user.enrollments.map((e) => e.course.title).join(", ")
          : "None"}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: completedCount > 0 ? "#7AC943" : "#94A3B8" }}>
            {completedCount}
          </span>
          {completedCount > 0 && (
            <div className="w-16 h-1.5 rounded-full bg-slate-100">
              <div
                className="h-1.5 rounded-full"
                style={{
                  width: `${Math.min((completedCount / 12) * 100, 100)}%`,
                  backgroundColor: "#7AC943",
                }}
              />
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-xs text-slate-400">
        {new Date(user.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>
    </tr>
  );
}
