"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles } from "lucide-react";

interface MarkCompleteButtonProps {
  weekId: string;
  courseSlug: string;
}

export function MarkCompleteButton({ weekId, courseSlug }: MarkCompleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  const handleMarkComplete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekId }),
      });

      if (res.ok) {
        setCelebrated(true);
        setTimeout(() => {
          router.refresh();
        }, 1200);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (celebrated) {
    return (
      <div className="flex flex-col items-center gap-2 py-2">
        <div className="flex items-center gap-2 text-2xl font-bold" style={{ color: "#7AC943" }}>
          <CheckCircle2 className="w-8 h-8" />
          You did it!
        </div>
        <div className="flex gap-1 text-lg">
          <Sparkles className="w-5 h-5" style={{ color: "#F5821E" }} />
          <Sparkles className="w-5 h-5" style={{ color: "#4CBFBF" }} />
          <Sparkles className="w-5 h-5" style={{ color: "#7AC943" }} />
        </div>
        <p className="text-sm text-slate-500">Loading your progress...</p>
      </div>
    );
  }

  return (
    <Button
      onClick={handleMarkComplete}
      disabled={loading}
      size="lg"
      className="h-14 px-10 text-base font-semibold rounded-xl gap-2 w-full sm:w-auto"
      style={{ backgroundColor: "#F5821E", color: "#FFFFFF" }}
    >
      {loading ? (
        <>Saving your progress...</>
      ) : (
        <>
          <CheckCircle2 className="w-5 h-5" />
          Mark Week Complete!
        </>
      )}
    </Button>
  );
}
