"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

interface MarkCompleteButtonProps {
  weekId: string;
  courseSlug: string;
  weekNumber: number;
  sem: number;
  nextWeekNumber?: number;
  nextWeekTitle?: string;
}

export function MarkCompleteButton({
  weekId,
  courseSlug,
  weekNumber,
  sem,
  nextWeekNumber,
  nextWeekTitle,
}: MarkCompleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleMarkComplete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekId }),
      });
      if (res.ok) {
        setShowCelebration(true);
      }
    } catch {
      // keep it warm — no alarming error alerts
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    setShowCelebration(false);
    if (nextWeekNumber) {
      router.push(`/courses/${courseSlug}/semester/${sem}/week/${nextWeekNumber}`);
    } else {
      router.push("/dashboard");
    }
  };

  const handleStay = () => {
    setShowCelebration(false);
    router.refresh();
  };

  return (
    <>
      {/* ── Full-screen celebration overlay ── */}
      {showCelebration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(15,31,61,0.92)" }}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            style={{ animation: "celebrate 0.35s ease-out" }}
          >
            {/* Sparkle row */}
            <div className="flex justify-center gap-2 mb-5">
              {(["#F07B2A", "#5CBFBF", "#7AC943", "#F07B2A", "#5CBFBF"] as const).map(
                (color, i) => (
                  <Sparkles key={i} className="w-5 h-5" style={{ color }} />
                )
              )}
            </div>

            {/* Big checkmark */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "rgba(122,201,67,0.12)" }}
            >
              <CheckCircle2 className="w-14 h-14" style={{ color: "#7AC943" }} />
            </div>

            <h2 className="text-3xl font-black mb-2" style={{ color: "#0F1F3D" }}>
              You crushed it!
            </h2>
            <p className="text-lg font-semibold mb-1" style={{ color: "#F07B2A" }}>
              Week {weekNumber} is done.
            </p>
            <p className="text-slate-500 mb-7 text-sm leading-relaxed">
              You made something real today.{" "}
              {nextWeekNumber
                ? "Ready to keep going?"
                : "You finished the whole semester. That's huge! 🏆"}
            </p>

            {nextWeekNumber ? (
              <div className="space-y-3">
                <button
                  onClick={handleContinue}
                  className="helix-btn-pill helix-btn-primary w-full justify-center text-base"
                >
                  Go to Week {nextWeekNumber}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleStay}
                  className="text-sm text-slate-400 hover:text-slate-600 transition-colors w-full py-2"
                >
                  Stay here for now
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  className="p-3 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: "rgba(122,201,67,0.1)", color: "#7AC943" }}
                >
                  🏆 Semester 1 complete — amazing work!
                </div>
                <button
                  onClick={handleContinue}
                  className="helix-btn-pill helix-btn-primary w-full justify-center text-base"
                >
                  See my journey
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── The button ── */}
      <Button
        onClick={handleMarkComplete}
        disabled={loading}
        size="lg"
        className="h-14 px-10 text-base font-semibold rounded-xl gap-2 w-full"
        style={{ backgroundColor: "#F07B2A", color: "#FFFFFF" }}
      >
        {loading ? (
          "Saving your progress…"
        ) : (
          <>
            <CheckCircle2 className="w-5 h-5" />
            Mark Week Complete!
          </>
        )}
      </Button>
    </>
  );
}
