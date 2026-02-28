import { AuthForm } from "@/components/auth/AuthForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignUpPage() {
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
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <path d="M22 22 C16 7 40 4 39 19 C38 29 26 26 22 22Z" fill="#F07B2A" />
              <path d="M22 22 C28 37 4 40 5 25 C6 15 18 18 22 22Z" fill="#5CBFBF" />
            </svg>
            <div>
              <div className="text-sm font-bold leading-tight" style={{ color: "#0F1F3D" }}>
                The Helix Adult Academy
              </div>
              <div className="text-xs" style={{ color: "#5CBFBF" }}>
                Nurturing Lifelong Learners
              </div>
            </div>
          </Link>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "#0F1F3D" }}
          >
            Start your journey!
          </h1>
          <p className="text-slate-500">
            Create your free account — registration opens April 2026.
          </p>
        </div>

        <AuthForm mode="signup" />

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium"
            style={{ color: "#F5821E" }}
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
