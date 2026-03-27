"use client"

interface OptionProps {
    text: string;
    index: number;
    selected: boolean;
    submitted: boolean;
    isCorrect: boolean;
    onClick: () => void;
}

export const OptionButton = ({ text, index, selected, submitted, isCorrect, onClick }: OptionProps) => {
  // 基本スタイル
  let variant = "border-slate-700 bg-slate-800/50 hover:border-slate-500 text-slate-300";

  if (selected) {
    variant = "border-indigo-500 bg-indigo-500/10 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.1)]";
  }

  // 解答提出後の「はっきりした」演出
  if (submitted) {
    if (isCorrect) {
      // 正解：常に緑色で光らせる
      variant = "border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] font-bold scale-[1.02]";
    } else if (selected && !isCorrect) {
      // 自分が選んだのが不正解だった場合：赤色で強調
      variant = "border-rose-500 bg-rose-500/20 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)] animate-shake";
    } else {
      // それ以外（選んでいない不正解）：暗くして視界から外す
      variant = "border-slate-800 bg-slate-900/30 text-slate-600 opacity-40 scale-[0.98]";
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={submitted}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${variant} relative overflow-hidden`}
    >
      <div className="flex items-center gap-3 relative z-10">
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold ${
          submitted && isCorrect ? "bg-emerald-500 text-slate-900 border-none" : ""
        }`}>
          {submitted && isCorrect ? "✓" : String.fromCharCode(65 + index)}
        </span>
        <span className="flex-1">{text}</span>
        
        {/* 正解・不正解のラベルを右端に追加する演出 */}
        {submitted && isCorrect && <span className="text-[10px] font-black tracking-widest uppercase ml-2 px-2 py-0.5 rounded bg-emerald-500/20">CORRECT</span>}
        {submitted && selected && !isCorrect && <span className="text-[10px] font-black tracking-widest uppercase ml-2 px-2 py-0.5 rounded bg-rose-500/20">WRONG</span>}
      </div>
    </button>
  );
};