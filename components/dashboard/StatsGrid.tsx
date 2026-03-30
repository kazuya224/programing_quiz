"use client";

import { Icons } from "./icons";

interface Props {
  todayCount: number;
  weeklyTotal: number;
  accuracy: number;
  totalDiff: number;
  accuracyDiff: number;
}

export default function StatsGrid({
  todayCount,
  weeklyTotal,
  accuracy,
  totalDiff,
  accuracyDiff
}: Props) {

  const renderDiff = (value: number) => {
    const isPositive = value >= 0;
    return (
      <div className={`text-xs flex items-center mt-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <Icons.TrendingUp /> : <Icons.TrendingDown />}
        {Math.abs(value)} {isPositive ? "UP" : "DOWN"}
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-slate-800 p-6 rounded-2xl">
        <p className="text-sm text-slate-400">Today's</p>
        <p className="text-3xl">{todayCount}</p>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl">
        <p className="text-sm text-slate-400">Weekly</p>
        <p className="text-3xl">{weeklyTotal}</p>
        {renderDiff(totalDiff)}
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl">
        <p className="text-sm text-slate-400">Accuracy</p>
        <p className="text-3xl">{accuracy}%</p>
        {renderDiff(accuracyDiff)}
      </div>
    </div>
  );
}