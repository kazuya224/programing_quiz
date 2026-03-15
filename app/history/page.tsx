"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DifficultyBadge from "@/components/ui/DifficultyBadge";
import Link from "next/link";
import { Question } from "@/types/quiz";
import { apiFetch } from "@/lib/api";

export default function HistoryPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect (() => {
    const fetchHistory = async () => {
      try {
        const res = await apiFetch (`/questions/history/${localStorage.getItem("userId")}`);
        const data = await res.json();
        setLogs(data);
        console.log("logs", logs);
        console.log("userId", localStorage.getItem("userId"));
        console.log("レスポンス", res);
      } catch(err) {
        console.error("データ取得失敗");
      }
    };
    fetchHistory();
  },[])

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-end">
          <h1 className="text-3xl font-bold">学習履歴</h1>
          <Link href="/" className="text-sm text-slate-400 hover:text-white">ホームに戻る</Link>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-700/50 text-slate-400 text-xs uppercase">
              <tr>
                <th className="p-4">日時</th>
                <th className="p-4">問題 / 言語</th>
                <th className="p-4">結果</th>
                <th className="p-4">自信度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {logs.map((log) => (
                <tr key={log.answerLogId} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-sm text-slate-400">
                    {new Date(log.answeredAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="font-bold">{log.title}</div>
                    <div className="text-xs text-slate-500">{log.language}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      log.isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {log.isCorrect ? "正解" : "不正解"}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    {log.confidence === 1 ? '★ 自信あり' : '🎲 勘'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}