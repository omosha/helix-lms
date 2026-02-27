import { AuthForm } from "@/components/auth/AuthForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
              style={{ backgroundColor: "#0F1F3D", color: "#F5821E" }}
            >
              H
            </div>
            <span
              className="text-lg font-bold"
              style={{ color: "#0F1F3D" }}
            >
              Helix Adult Academy
            </span>
          </Link>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "#0F1F3D" }}
          >
            Welcome back!
          </h1>
          <p className="text-slate-500">
            Sign in to continue your learning journey.
          </p>
        </div>

        <AuthForm mode="signin" />

        <p className="text-center text-sm text-slate-500 mt-6">
          New to Helix?{" "}
          <Link
            href="/signup"
            className="font-medium"
            style={{ color: "#F5821E" }}
          >
            Create your free account
          </Link>
        </p>
      </div>
    </div>
  );
}
