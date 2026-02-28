"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, BookOpen, LayoutDashboard, Users, LogOut, LogIn } from "lucide-react";

// The Helix Adult Academy bird/wing logo mark
function HelixMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Orange upper wing */}
      <path
        d="M22 22 C16 7 40 4 39 19 C38 29 26 26 22 22Z"
        fill="#F07B2A"
      />
      {/* Teal lower wing */}
      <path
        d="M22 22 C28 37 4 40 5 25 C6 15 18 18 22 22Z"
        fill="#5CBFBF"
      />
    </svg>
  );
}

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "#7fc6c7", boxShadow: "0 2px 0 rgba(0,0,0,0.10)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" style={{ textDecoration: "none" }}>
            <HelixMark size={40} />
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-tight" style={{ color: "#1e2f4a" }}>
                The Helix Adult Academy
              </div>
              <div className="text-xs font-medium" style={{ color: "rgba(30,47,74,0.65)" }}>
                Nurturing Lifelong Learners
              </div>
            </div>
          </Link>

          {/* Desktop Nav pills */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/courses" className="helix-nav-pill">
              <BookOpen className="w-3.5 h-3.5" />
              Programs &amp; Workshops
            </Link>

            {session?.user && (
              <Link href="/dashboard" className="helix-nav-pill">
                <LayoutDashboard className="w-3.5 h-3.5" />
                My Dashboard
              </Link>
            )}

            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="helix-nav-pill"
                style={{ background: "rgba(122,201,67,0.25)", color: "#2d5a1b" }}
              >
                <Users className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-2">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(46,69,89,0.15)" }}>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "#F07B2A", color: "white" }}
                  >
                    {session.user.name?.[0]?.toUpperCase() ?? session.user.email?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#1e2f4a" }}>
                    {session.user.name?.split(" ")[0] ?? session.user.email}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    title="Sign out"
                    className="ml-1 opacity-50 hover:opacity-100 transition-opacity"
                    style={{ color: "#1e2f4a" }}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="helix-nav-pill"
                  style={{ textDecoration: "none" }}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="helix-btn-pill helix-btn-primary text-sm"
                  style={{ textDecoration: "none" }}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-full transition-colors"
            style={{ background: "rgba(46,69,89,0.18)", color: "#1e2f4a" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden py-4 space-y-2 border-t"
            style={{ borderColor: "rgba(30,47,74,0.12)" }}
          >
            <Link
              href="/courses"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-full text-sm font-medium"
              style={{ background: "rgba(46,69,89,0.15)", color: "#1e2f4a" }}
            >
              <BookOpen className="w-4 h-4" />
              Programs &amp; Workshops
            </Link>
            {session?.user && (
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-full text-sm font-medium"
                style={{ background: "rgba(46,69,89,0.15)", color: "#1e2f4a" }}
              >
                <LayoutDashboard className="w-4 h-4" />
                My Dashboard
              </Link>
            )}
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-full text-sm font-medium"
                style={{ background: "rgba(122,201,67,0.25)", color: "#2d5a1b" }}
              >
                <Users className="w-4 h-4" />
                Admin Panel
              </Link>
            )}
            <div className="pt-2 border-t flex flex-col gap-2" style={{ borderColor: "rgba(30,47,74,0.12)" }}>
              {session?.user ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-full text-sm font-medium w-full"
                  style={{ background: "rgba(46,69,89,0.15)", color: "#1e2f4a" }}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out ({session.user.name?.split(" ")[0] ?? session.user.email})
                </button>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-full text-sm font-medium"
                    style={{ background: "rgba(46,69,89,0.15)", color: "#1e2f4a" }}
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="helix-btn-pill helix-btn-primary text-sm w-full justify-center"
                    style={{ textDecoration: "none" }}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
