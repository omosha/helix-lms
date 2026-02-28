import Link from "next/link";

function FooterHelixMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M22 22 C16 7 40 4 39 19 C38 29 26 26 22 22Z" fill="#F07B2A" />
      <path d="M22 22 C28 37 4 40 5 25 C6 15 18 18 22 22Z" fill="#5CBFBF" />
    </svg>
  );
}

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
            <div className="flex items-center gap-2 mb-2">
              <FooterHelixMark />
              <span className="font-bold text-white text-sm">The Helix Adult Academy</span>
            </div>
            <p className="text-xs font-medium mb-3" style={{ color: "#7fc6c7" }}>
              Nurturing Lifelong Learners
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering adults to build skills, confidence, and a clear pathway
              to independence and community.
            </p>
          </div>

          {/* Program */}
          <div>
            <h4
              className="font-semibold text-sm mb-3"
              style={{ color: "#7fc6c7" }}
            >
              Programs
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  Programs &amp; Workshops
                </Link>
              </li>
              <li>
                <Link href="/courses/digital-pathways" className="hover:text-white transition-colors">
                  Digital Pathways Program
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  Register — April 2026
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-white transition-colors">
                  Student Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-semibold text-sm mb-3"
              style={{ color: "#F07B2A" }}
            >
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>San Rafael, CA 94903</li>
              <li>
                <a
                  href="mailto:info@HelixAdultAcademy.org"
                  className="hover:text-white transition-colors"
                >
                  info@HelixAdultAcademy.org
                </a>
              </li>
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
            </ul>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p>© {new Date().getFullYear()} The Helix Adult Academy. All rights reserved.</p>
          <p style={{ color: "#7fc6c7" }}>Nurturing Lifelong Learners</p>
        </div>
      </div>
    </footer>
  );
}
