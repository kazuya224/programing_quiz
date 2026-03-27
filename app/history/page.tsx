"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DifficultyBadge from "@/components/ui/DifficultyBadge";
import Link from "next/link";
import { Question } from "@/types/quiz";
import { apiFetch } from "@/lib/api";

export default function HistoryPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    const fetchHistory = async () => {
      const userId = localStorage.getItem("userId");
        if (!userId) {
          setLoading(false);
          return;
        }
      try {
        const res = await apiFetch (`/answers/history/${localStorage.getItem("userId")}`);
        if(!res.ok) {
          throw new Error(`サーバーエラー: ${res.status}`);
        }
        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
        
        console.log("userId", localStorage.getItem("userId"));
        console.log("レスポンス", res);
        console.log("logs", logs);
      } catch(err) {
        console.error("データ取得失敗");
        setLogs([]);
      } finally {
        setLoading(false);
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
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">読み込み中...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">履歴がありません</td></tr>
              ) : (
                logs.map((log, index) => (
                  // keyに index を含めることで warning を確実に回避
                  <tr key={log.answer_log_id || index} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-slate-400">
                      {log.answeredAt ? new Date(log.answeredAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="p-4">
                      <div className="font-bold">{log.title || "不明な問題"}</div>
                      <div className="text-xs text-slate-500">{log.language}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        log.correct ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {log.correct ? "正解" : "不正解"}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      {log.confidence === 1 ? '★ 自信あり' : '🎲 勘'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}