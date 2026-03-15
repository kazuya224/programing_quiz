"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

interface UserStats {
  totalAnswers: number;
  correctAnswers: number;
  accuracyRate: number;
  masteredCount: number;
}

export default function HomePage() {
  // 進捗データのモック（本来はSupabaseから取得）
  const [statsData, setStatsData] = useState<UserStats | null>(null);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const storedName = localStorage.getItem("userName");

    if(!userId) {
      router.push("/login");
      return;
    }
    setUserName(storedName || "Engineer");

    const fetchStats = async() => {
      try {
        const res = await apiFetch(`/questions/stats/${userId}`);
        if(res.ok) {
          const data = await res.json();
          setStatsData(data);
        }
      } catch(err) {
        console.error("統計データの取得に失敗:", err);
      }
    };
    fetchStats();
    const handleFocus =() => fetchStats();
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  },[])

  const displayStats = [
    { label: "習得済み", count: statsData?.masteredCount ?? 0, color: "text-emerald-400" },
    { label: "正解率", count: `${statsData?.accuracyRate ?? 0}%`, color: "text-indigo-400" },
    { label: "総解答数", count: statsData?.totalAnswers ?? 0, color: "text-slate-400" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ヒーローセクション */}
        <header className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Engineering <span className="text-indigo-500">Mastery</span>
          </h1>
          <p className="text-slate-400 text-lg">
            おかえりなさい、<span className="text-white font-bold">{userName}</span> さん。
            仕組み化で最短ルートの成長を。
          </p>
        </header>

        {/* 進捗ダッシュボード（リアルデータ） */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayStats.map((stat, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
              <p className="text-sm text-slate-500 font-bold mb-1">{stat.label}</p>
              <p className={`text-3xl font-mono font-bold ${stat.color}`}>{stat.count}</p>
            </div>
          ))}
        </div>

        {/* 学習メニュー */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold">学習を始める</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/quiz" className="group p-8 bg-indigo-600 hover:bg-indigo-500 rounded-2xl transition-all shadow-xl shadow-indigo-500/20">
              <h3 className="text-2xl font-bold mb-2">ランダムトレーニング</h3>
              <p className="text-indigo-100 opacity-80">全ジャンルからランダムに出題。実力を試すならここから。</p>
            </Link>
            
            <Link href="/history" className="group p-8 bg-slate-800 border border-slate-700 hover:border-indigo-500 rounded-2xl transition-all">
              <h3 className="text-2xl font-bold mb-2 text-indigo-400">解答履歴</h3>
              <p className="text-slate-400">過去の自分の解答を振り返り、弱点を把握する。</p>
            </Link>
          </div>
        </section>

        {/* ログアウトボタン（仕組みとして必須） */}
        <div className="flex justify-end">
          <button 
            onClick={() => { localStorage.clear(); router.push("/login"); }}
            className="text-slate-500 hover:text-rose-400 text-sm underline"
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
}