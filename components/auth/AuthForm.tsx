"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AuthFormProps {
  mode: "signin" | "signup";
}

const FIRST_LESSON = "/courses/digital-pathways/semester/1/week/1";

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Something went wrong. Let's try again!");
          setLoading(false);
          return;
        }
        // Sign in then drop straight into Week 1 — no profile setup friction
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        router.push(FIRST_LESSON);
      } else {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        if (result?.error) {
          setError("Hmm, that email or password didn't match. Let's try again!");
        } else {
          router.push("/dashboard");
          router.refresh();
        }
      }
    } catch {
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // New signups go to Week 1; returning sign-ins go to dashboard
    signIn("google", {
      callbackUrl: mode === "signup" ? FIRST_LESSON : "/dashboard",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8" style={{ border: "1px solid #E2E8F0" }}>
      {/* OAuth Buttons */}
      <div className="space-y-3 mb-6">
        <Button
          variant="outline"
          className="w-full h-12 text-sm font-medium gap-3 border-slate-200 hover:bg-slate-50"
          onClick={handleGoogleSignIn}
          type="button"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </Button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs text-slate-400 bg-white px-3">
          or {mode === "signin" ? "sign in" : "sign up"} with email
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#0F1F3D" }} htmlFor="name">
              Your name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Alex Rivera"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#0F1F3D" }} htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#0F1F3D" }} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 transition-all"
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: "#FFF8F0", color: "#8B4A00", border: "1px solid #FDE8C8" }}>
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold rounded-xl"
          style={{ backgroundColor: "#F07B2A", color: "#FFFFFF" }}
          disabled={loading}
        >
          {loading
            ? "Just a moment..."
            : mode === "signin"
            ? "Let's go!"
            : "Create my account"}
        </Button>
      </form>
    </div>
  );
}
