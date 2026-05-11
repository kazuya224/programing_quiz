"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

interface Props {
  availableLanguages: string[];
  onComplete: () => void;
}

export default function OnboardingModal({ availableLanguages, onComplete }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = async () => {
    if (!selected) return;
    setIsStarting(true);
    try {
      await apiFetch("/auth/me/onboarding-complete", { method: "PATCH" });
      onComplete();
      router.push(`/quiz?mode=onboarding&language=${encodeURIComponent(selected)}`);
    } catch (e) {
      console.error(e);
      setIsStarting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">

        {/* Header */}
        <div className="space-y-1 text-center">
          <div className="text-3xl">⚡</div>
          <h1 className="text-xl font-bold text-white">1分で実力診断できます</h1>
          <p className="text-slate-400 text-sm">まずは3問だけ解いてみましょう</p>
        </div>

        {/* Language selection */}
        <div className="space-y-2">
          <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
            言語を選ぶ
          </p>
          <div className="grid grid-cols-2 gap-2">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelected(lang)}
                className={`
                  px-3 py-2 rounded-xl text-sm font-semibold text-left transition-all duration-150
                  ${selected === lang
                    ? "bg-indigo-600 text-white ring-2 ring-indigo-400"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }
                `}
              >
                {selected === lang && <span className="mr-1">✓</span>}
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          disabled={!selected || isStarting}
          className="w-full py-3 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 active:scale-95"
        >
          {isStarting ? "読み込み中..." : "3問だけ解いてみる →"}
        </button>
      </div>
    </div>
  );
}