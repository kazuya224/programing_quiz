"ui client";

export const Timer = ({seconds, total} : {seconds: number; total: number}) => {
  const percentage = (seconds / total) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-1000 ${
          seconds < 10 ? 'bg-rose-500' : 'bg-indigo-500'
        }`}
        style = {{width: `${percentage}%`}}
        />
      </div>
      <span className={`text-sm font-mono ${seconds < 10 ? 'text-rose-400' : 'text-slate-400'}`}>
        {seconds}s
      </span>
    </div>
  );
};