"use client";
import { Confidence } from "@/types/quiz";

interface Props {
  currentConfidence: Confidence;
  onSelect: (value: Confidence) => void;
  disabled: boolean;
}

export const ConfidenceSelector = ({ currentConfidence, onSelect, disabled }: Props) => {
  const options: { value: Confidence; label: string; icon: string }[] = [
    { value: 1, label: "自信あり", icon: "★" },
    { value: 2, label: "勘", icon: "🎲" },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">自信度:</span>
      <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
        {options.map((opt) => (
          <button
            key={opt.value}
            disabled={disabled}
            onClick={() => onSelect(opt.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              currentConfidence === opt.value
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>{opt.icon}</span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};