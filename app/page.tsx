import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Sparkles, BookOpen, Award, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="relative overflow-hidden py-24 sm:py-32"
        style={{ backgroundColor: "#0F1F3D" }}
      >
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "#F5821E", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "#4CBFBF", transform: "translate(-30%, 30%)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: "rgba(245,130,30,0.15)", color: "#F5821E" }}
            >
              <Sparkles className="w-4 h-4" />
              Digital Pathways Program — Year 1 Now Enrolling
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: "#FFFFFF" }}
            >
              Your Future{" "}
              <span style={{ color: "#F5821E" }}>Starts</span>{" "}
              Here.
            </h1>

            <p
              className="text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl"
              style={{ color: "#94A3B8" }}
            >
              The Digital Pathways Program gives young adults with disabilities the
              real digital skills, creative confidence, and personal clarity needed
              to build a future they're proud of.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-semibold rounded-xl gap-2"
                  style={{ backgroundColor: "#F5821E", color: "#FFFFFF" }}
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base font-medium rounded-xl"
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "#FFFFFF",
                    backgroundColor: "transparent",
                  }}
                >
                  Explore the Program
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-10 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              {[
                { value: "4 Years", label: "Complete Program" },
                { value: "8 Semesters", label: "Modular Learning" },
                { value: "96 Weeks", label: "of Real Skills" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold" style={{ color: "#4CBFBF" }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: "#64748B" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#0F1F3D" }}
            >
              Built for Young Adults Who Are Ready to Build Something Real
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Helix Adult Academy&apos;s Digital Pathways Program is designed specifically for
              young adults with disabilities — with dignity-centered design, scaffolded
              step-by-step instruction, and real creative tools that produce real artifacts.
            </p>
          </div>

          {/* Value pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                color: "#F5821E",
                bg: "rgba(245,130,30,0.1)",
                title: "Real Digital Skills",
                desc: "Google Drive, Canva, Pinterest, ChatGPT — tools used in the real world, taught in the right order.",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                color: "#4CBFBF",
                bg: "rgba(76,191,191,0.1)",
                title: "Creative Confidence",
                desc: "Every week produces something you made: an avatar, a comic, a vision board. Real artifacts. Real pride.",
              },
              {
                icon: <Award className="w-6 h-6" />,
                color: "#7AC943",
                bg: "rgba(122,201,67,0.1)",
                title: "A Clear Pathway",
                desc: "4 years. 8 semesters. A graduation with a portfolio, competencies, and a real next step.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="p-8 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: pillar.bg, color: pillar.color }}
                >
                  {pillar.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#0F1F3D" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Arc */}
      <section className="py-20" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#0F1F3D" }}>
              Vision → Skill → Practice → Portfolio → Pathway
            </h2>
            <p className="text-slate-500">
              Each year builds on the last. Here&apos;s where your journey goes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                year: "Year 1",
                theme: "Discovery & Digital Foundations",
                detail: "Build digital literacy, creative confidence, and identity clarity.",
                color: "#F5821E",
                semesters: "Envisioning Your Future · Build What You Imagine",
              },
              {
                year: "Year 2",
                theme: "Applied Skill Building",
                detail: "Select a pathway cluster and build a structured digital portfolio.",
                color: "#4CBFBF",
                semesters: "Make It Real · Collaborate & Present",
              },
              {
                year: "Year 3",
                theme: "Workforce Simulation",
                detail: "Real-world practice: resumes, mock interviews, or micro-business.",
                color: "#7AC943",
                semesters: "Practice the Real World · Professional Identity",
              },
              {
                year: "Year 4",
                theme: "Transition & Launch",
                detail: "Final portfolio. Public presentation. Step into your path.",
                color: "#F5821E",
                semesters: "Prepare to Launch · Step Into Your Path",
              },
            ].map((item, i) => (
              <div
                key={item.year}
                className="relative p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div
                  className="text-3xl font-black mb-1 opacity-15 absolute top-4 right-4"
                  style={{ color: item.color }}
                >
                  {i + 1}
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: item.color }}
                >
                  {item.year}
                </div>
                <h3 className="text-sm font-bold mb-2" style={{ color: "#0F1F3D" }}>
                  {item.theme}
                </h3>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                  {item.detail}
                </p>
                <div
                  className="text-xs px-3 py-1.5 rounded-full inline-block"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  {item.semesters}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview — Semester 1 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div
                className="text-sm font-bold uppercase tracking-wider mb-2"
                style={{ color: "#F5821E" }}
              >
                Semester 1 Spotlight
              </div>
              <h2 className="text-3xl font-bold" style={{ color: "#0F1F3D" }}>
                Envisioning Your Future
              </h2>
              <p className="text-slate-500 mt-2">12 weeks. Real tools. Real things you make.</p>
            </div>
            <Link href="/courses/digital-pathways">
              <Button
                variant="outline"
                className="gap-2"
                style={{ borderColor: "#0F1F3D", color: "#0F1F3D" }}
              >
                See all 12 weeks <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { week: 1, title: "Digital Safety & Google Account", tool: "Google Account", color: "#4CBFBF" },
              { week: 2, title: "Me in Pictures", tool: "Pinterest", color: "#F5821E" },
              { week: 3, title: "Build My Avatar", tool: "Avaturn", color: "#7AC943" },
              { week: 4, title: "My Dream Day Story", tool: "Google Docs", color: "#F5821E" },
              { week: 5, title: "Mood Mapping & Visual Reflection", tool: "Google Slides", color: "#4CBFBF" },
              { week: 6, title: "Vision Board", tool: "Google Slides", color: "#7AC943" },
            ].map((item) => (
              <Link
                key={item.week}
                href={`/courses/digital-pathways/semester/1/week/${item.week}`}
              >
                <div className="p-5 rounded-xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.week}
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      {item.tool}
                    </span>
                  </div>
                  <h4
                    className="text-sm font-semibold group-hover:text-orange-600 transition-colors"
                    style={{ color: "#0F1F3D" }}
                  >
                    {item.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #0F1F3D 0%, #1a3060 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: "#F5821E" }} />
              ))}
            </div>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "#FFFFFF" }}
          >
            Ready to start building your future?
          </h2>
          <p className="text-lg mb-8" style={{ color: "#94A3B8" }}>
            Join the Digital Pathways Program and take your first step toward
            digital confidence, a real portfolio, and a pathway that&apos;s yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="h-14 px-10 text-base font-semibold rounded-xl gap-2"
                style={{ backgroundColor: "#F5821E", color: "#FFFFFF" }}
              >
                Create Your Free Account
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-10 text-base font-medium rounded-xl"
                style={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                }}
              >
                <Users className="w-5 h-5 mr-2" />
                For Program Admins
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
