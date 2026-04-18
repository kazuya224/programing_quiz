"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";

interface Props {
  hasResume: boolean;
  availableLanguages: string[]; // 利用可能な言語リストを親から受け取る
}

export default function MainMenu({ hasResume, availableLanguages }: Props) {
  const router = useRouter();
  // どのモードの言語選択中か（null, "training", "resume"）
  const [selectingMode, setSelectingMode] = useState<"training" | "resume" | "review" | null>(null);

  const handleLangSelect = (lang: string) => {
    const modeParam = selectingMode === "resume" ? "mode=resume&" : selectingMode === "review" ? "mode=review&" : "";
    router.push(`/quiz?${modeParam}language=${encodeURIComponent(lang)}`);
  };

  return (
    <section className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        {/* 言語選択が表示されていない時のメニュー */}
        {!selectingMode ? (
          <>
            {hasResume && (
              <button 
                onClick={() => setSelectingMode("resume")}
                className="w-full flex justify-between p-6 bg-yellow-600 rounded-2xl hover:opacity-90 transition"
              >
                <span>再開</span>
                <Icons.Play fill="white" />
              </button>
            )}

            <button 
              onClick={() => setSelectingMode("training")}
              className="w-full flex justify-between p-6 bg-indigo-600 rounded-2xl hover:opacity-90 transition"
            >
              <span>勉強開始</span>
              <Icons.Play fill="white" />
            </button>
            <button 
              onClick={() => setSelectingMode("review")}
              className="w-full flex justify-between p-6 bg-rose-600 rounded-2xl hover:opacity-90 transition"
            >
              <span>復習</span>
              <Icons.Play fill="white" />
            </button>
          </>
        ) : (
          /* 言語選択中の表示 */
          <div className="p-6 bg-slate-800 rounded-2xl border border-indigo-500 animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-indigo-300">
                {selectingMode === "resume" ? "再開する言語を選択" : "学習する言語を選択"}
              </h3>
              <button onClick={() => setSelectingMode(null)} className="text-xs text-slate-400 hover:text-white">
                キャンセル
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangSelect(lang)}
                  className="p-3 bg-slate-700 hover:bg-indigo-600 rounded-xl text-left transition-colors font-bold"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={() => router.push("/history")}
        className="w-full p-6 bg-slate-800 rounded-2xl text-left hover:bg-slate-700 transition"
      >
        学習履歴
      </button>
    </section>
  );
}