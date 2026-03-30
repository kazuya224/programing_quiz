"use client";

import { Icons } from "./icons";

interface Props {
  userName: string;
  streak: number;
}

export default function Header({ userName, streak }: Props) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
      <div>
        <h1 className="text-4xl font-black text-white">
          ENGINEERING <span className="text-indigo-500">MASTERY</span>
        </h1>
        <p className="text-slate-400 mt-2">
          おかえりなさい、<span className="text-indigo-400 font-bold">{userName}</span> さん。
        </p>
      </div>

      <div className="flex items-center gap-3 bg-slate-800 px-5 py-3 rounded-2xl">
        <Icons.Flame />
        <div>
          <p className="text-xs text-slate-400">Streak</p>
          <p className="text-xl font-bold">{streak} Days</p>
        </div>
      </div>
    </header>
  );
}