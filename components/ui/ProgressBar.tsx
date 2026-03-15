"use client"

interface Props {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total}: Props) {
    const progress = ((current + 1) / total) * 100;

    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Progress</span>
                <span>{current + 1} / {total}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}