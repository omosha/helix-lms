import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Award, Users, Calendar, MapPin, Mail } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white">

      {/* Registration Banner */}
      <div
        className="py-3 px-4 text-center text-sm font-semibold"
        style={{ backgroundColor: "#F07B2A", color: "#ffffff" }}
      >
        <span className="inline-flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Registration opens April 2026 —{" "}
          <Link href="/signup" className="underline underline-offset-2 hover:no-underline">
            Join the waitlist
          </Link>
        </span>
      </div>

      {/* Hero */}
      <section
        className="relative overflow-hidden py-24 sm:py-32"
        style={{ backgroundColor: "#0F1F3D" }}
      >
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "#F07B2A", transform: "translate(30%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "#7fc6c7", transform: "translate(-30%, 30%)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: "rgba(127,198,199,0.15)", color: "#7fc6c7" }}
            >
              <MapPin className="w-4 h-4" />
              San Rafael, CA · Adult Education Programs
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Nurturing{" "}
              <span style={{ color: "#F07B2A" }}>Lifelong</span>{" "}
              Learners
            </h1>

            <p
              className="text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl"
              style={{ color: "#94A3B8" }}
            >
              The Helix Adult Academy offers flexible programs and workshops for
              adult learners — building real skills, confidence, and community
              in a supportive, dignity-centered environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-semibold rounded-xl gap-2"
                  style={{ backgroundColor: "#F07B2A", color: "#FFFFFF" }}
                >
                  Register for April 2026
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
                  Explore Programs
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-10 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              {[
                { value: "6 Tracks", label: "Flexible Scheduling" },
                { value: "Year-Round", label: "Programs Available" },
                { value: "San Rafael", label: "Northern California" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold" style={{ color: "#7fc6c7" }}>
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
      <section className="py-20" style={{ backgroundColor: "#f0f9f9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#0F1F3D" }}
            >
              A Flexible Program Track for Every Learner
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Every adult learner has different goals, schedules, and support needs.
              Our track system gives you the freedom to choose a program structure
              that works for your life.
            </p>
          </div>

          {/* Value pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                color: "#F07B2A",
                bg: "rgba(240,123,42,0.1)",
                title: "Real Skills",
                desc: "Hands-on learning across digital tools, creative arts, life skills, and workforce readiness — taught in a real-world context.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                color: "#5CBFBF",
                bg: "rgba(92,191,191,0.1)",
                title: "Community & Connection",
                desc: "Build peer relationships and a sense of belonging through collaborative projects, workshops, and shared experiences.",
              },
              {
                icon: <Award className="w-6 h-6" />,
                color: "#7AC943",
                bg: "rgba(122,201,67,0.1)",
                title: "Independence & Confidence",
                desc: "Develop the personal clarity, practical competence, and self-advocacy skills needed to build a future you're proud of.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="p-8 rounded-2xl border border-slate-100 bg-white hover:shadow-md transition-shadow"
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

      {/* Program Tracks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="text-sm font-bold uppercase tracking-wider mb-2"
              style={{ color: "#F07B2A" }}
            >
              Enrollment Tracks
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#0F1F3D" }}>
              Choose the Schedule That Works for You
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Whether you&apos;re looking for full immersion or targeted skill-building,
              you can design a schedule that fits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                track: "Platinum Track",
                tagline: "The Full Immersion",
                desc: "A 6-day weekly rhythm, including specialized Saturday workshops for a deeper dive into community activities.",
                color: "#F07B2A",
              },
              {
                track: "Premier Track",
                tagline: "The Academic Standard",
                desc: "A full Monday through Friday schedule focused on consistent daily engagement and a steady routine.",
                color: "#5CBFBF",
              },
              {
                track: "Plus Track",
                tagline: "The Flexible Week",
                desc: "A Monday through Thursday schedule that balances active learning with a three-day weekend for family time.",
                color: "#7AC943",
              },
              {
                track: "Advantage Track",
                tagline: "The Targeted Approach",
                desc: "A part-time schedule (morning or afternoon) for students balancing other interests or community commitments.",
                color: "#F07B2A",
              },
              {
                track: "Access Track",
                tagline: "The Weekend Connection",
                desc: "Focused Friday and Saturday programming for those looking for a social and instructional anchor.",
                color: "#5CBFBF",
              },
              {
                track: "Summer Rec",
                tagline: "The Bridge Program",
                desc: "A month-long bridge blending recreational adventure with practical life-skills to foster peer connections.",
                color: "#7AC943",
              },
            ].map((item) => (
              <div
                key={item.track}
                className="relative p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-1 h-10 rounded-full absolute left-0 top-6"
                  style={{ backgroundColor: item.color }}
                />
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-1 pl-3"
                  style={{ color: item.color }}
                >
                  {item.track}
                </div>
                <h3 className="text-sm font-bold mb-2 pl-3" style={{ color: "#0F1F3D" }}>
                  {item.tagline}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed pl-3">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview — Digital Pathways */}
      <section className="py-20" style={{ backgroundColor: "#f0f9f9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div
                className="text-sm font-bold uppercase tracking-wider mb-2"
                style={{ color: "#F07B2A" }}
              >
                Featured Program
              </div>
              <h2 className="text-3xl font-bold" style={{ color: "#0F1F3D" }}>
                Digital Pathways Program
              </h2>
              <p className="text-slate-500 mt-2">
                A 4-year workforce readiness track — 12 weeks at a time.
              </p>
            </div>
            <Link href="/courses/digital-pathways">
              <Button
                variant="outline"
                className="gap-2"
                style={{ borderColor: "#0F1F3D", color: "#0F1F3D" }}
              >
                View full program <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { week: 1, title: "Digital Safety & Google Account", tool: "Google Account", color: "#5CBFBF" },
              { week: 2, title: "Me in Pictures", tool: "Pinterest", color: "#F07B2A" },
              { week: 3, title: "Build My Avatar", tool: "Avaturn", color: "#7AC943" },
              { week: 4, title: "My Dream Day Story", tool: "Google Docs", color: "#F07B2A" },
              { week: 5, title: "Mood Mapping & Visual Reflection", tool: "Google Slides", color: "#5CBFBF" },
              { week: 6, title: "Vision Board", tool: "Google Slides", color: "#7AC943" },
            ].map((item) => (
              <Link
                key={item.week}
                href={`/courses/digital-pathways/semester/1/week/${item.week}`}
              >
                <div className="p-5 rounded-xl border border-slate-100 bg-white hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group">
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
                        backgroundColor: `${item.color}18`,
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
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: "rgba(127,198,199,0.15)", color: "#7fc6c7" }}
          >
            <Calendar className="w-4 h-4" />
            Registration opens April 2026
          </div>

          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "#FFFFFF" }}
          >
            Ready to start your journey?
          </h2>
          <p className="text-lg mb-8" style={{ color: "#94A3B8" }}>
            Join The Helix Adult Academy and take your first step toward
            real skills, community, and a future you&apos;re proud of.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/signup">
              <Button
                size="lg"
                className="h-14 px-10 text-base font-semibold rounded-xl gap-2"
                style={{ backgroundColor: "#F07B2A", color: "#FFFFFF" }}
              >
                Register Now
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

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm" style={{ color: "#64748B" }}>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              San Rafael, CA 94903
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              info@HelixAdultAcademy.org
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
