"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, LayoutDashboard, Users, LogOut, LogIn } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "#0F1F3D" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: "#F5821E", color: "#0F1F3D" }}
            >
              H
            </div>
            <div className="hidden sm:block">
              <div
                className="text-sm font-bold leading-tight"
                style={{ color: "#FFFFFF" }}
              >
                Helix Adult Academy
              </div>
              <div className="text-xs" style={{ color: "#4CBFBF" }}>
                Digital Pathways Program
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/courses"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: "#CBD5E1" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5821E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#CBD5E1")}
            >
              <BookOpen className="w-4 h-4" />
              Courses
            </Link>

            {session?.user && (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: "#CBD5E1" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5821E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#CBD5E1")}
              >
                <LayoutDashboard className="w-4 h-4" />
                My Dashboard
              </Link>
            )}

            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: "#7AC943" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7AC943")}
              >
                <Users className="w-4 h-4" />
                Admin
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "#4CBFBF", color: "#0F1F3D" }}
                  >
                    {session.user.name?.[0] ?? session.user.email?.[0] ?? "U"}
                  </div>
                  <span className="text-sm" style={{ color: "#CBD5E1" }}>
                    {session.user.name ?? session.user.email}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-slate-400 hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <Link href="/signin">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-300 hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="font-semibold"
                    style={{ backgroundColor: "#F5821E", color: "#FFFFFF" }}
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden py-4 border-t space-y-3"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <Link
              href="/courses"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-2 py-2 text-sm text-slate-300 hover:text-white"
            >
              <BookOpen className="w-4 h-4" />
              Courses
            </Link>
            {session?.user && (
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-2 py-2 text-sm text-slate-300 hover:text-white"
              >
                <LayoutDashboard className="w-4 h-4" />
                My Dashboard
              </Link>
            )}
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-2 py-2 text-sm"
                style={{ color: "#7AC943" }}
              >
                <Users className="w-4 h-4" />
                Admin Panel
              </Link>
            )}
            <div className="pt-2 flex flex-col gap-2">
              {session?.user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full justify-start text-slate-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <>
                  <Link href="/signin" onClick={() => setMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full text-slate-300">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)}>
                    <Button
                      size="sm"
                      className="w-full"
                      style={{ backgroundColor: "#F5821E" }}
                    >
                      Get Started Free
                    </Button>
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
