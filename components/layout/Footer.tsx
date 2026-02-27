import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="py-10 mt-auto"
      style={{ backgroundColor: "#0F1F3D" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                style={{ backgroundColor: "#F5821E", color: "#0F1F3D" }}
              >
                H
              </div>
              <span className="font-bold text-white">Helix Adult Academy</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering young adults with disabilities to build digital skills,
              confidence, and a clear pathway to their future.
            </p>
          </div>

          {/* Program */}
          <div>
            <h4
              className="font-semibold text-sm mb-3"
              style={{ color: "#4CBFBF" }}
            >
              Program
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-white transition-colors"
                >
                  Digital Pathways Program
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/digital-pathways"
                  className="hover:text-white transition-colors"
                >
                  Year 1: Envision Your Future
                </Link>
              </li>
              <li>
                <Link
                  href="/signin"
                  className="hover:text-white transition-colors"
                >
                  Student Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4
              className="font-semibold text-sm mb-3"
              style={{ color: "#7AC943" }}
            >
              About
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href="https://www.helixadultacademy.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  helixadultacademy.org ↗
                </a>
              </li>
              <li className="text-slate-500">
                Serving young adults with disabilities
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p>© {new Date().getFullYear()} Helix Adult Academy. All rights reserved.</p>
          <div className="flex gap-1 items-center">
            <span>Vision</span>
            <span style={{ color: "#F5821E" }}>→</span>
            <span>Skill</span>
            <span style={{ color: "#4CBFBF" }}>→</span>
            <span>Practice</span>
            <span style={{ color: "#7AC943" }}>→</span>
            <span>Portfolio</span>
            <span style={{ color: "#F5821E" }}>→</span>
            <span>Pathway</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
