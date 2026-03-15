"use client"

interface OptionProps {
    text: string;
    index: number;
    selected: boolean;
    submitted: boolean;
    isCorrect: boolean;
    onClick: () => void;
}

export const OptionButton = ({ text, index, selected, submitted, isCorrect, onClick}: OptionProps) => {
    let variant = "border-slate-700 bg-slate-800/50 hover:border-slate-500";
    if(selected) variant = "border-indigo-500 bg-indigo-500/10";
    if(submitted) {
        if(isCorrect) variant = "border-emerald-500 bg-emerald-500/20 text-emerald-400";
        else if (selected) variant = "border-rose-500 bg-rose-500/20 text-rose-400";
    }

    return (
        <button
      onClick={onClick}
      disabled={submitted}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${variant}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">
          {String.fromCharCode(65 + index)}
        </span>
        {text}
      </div>
    </button>
  );
};