// app/home/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useSubscription } from "@/hooks/useSubscription";

import {
  Header,
  StatsGrid,
  MainMenu,
  Footer,
  GenreAccordionList
} from "@/components/dashboard";

import { Genre, UserStats } from "@/components/dashboard/types";

export default function HomePage() {
  const [statsData, setStatsData] = useState<UserStats | null>(null);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [genreData, setGenreData] = useState<Record<string, Genre[]> | null>(null);

  // 解約UI用 state
  const [showConfirm, setShowConfirm] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelDone, setCancelDone] = useState(false);

  const router = useRouter();
  const availableLanguages = Object.keys(genreData || {});
  const { isPremium, subscription, checkout, cancel } = useSubscription();

  // 解約完了トーストを3秒後に消す
  useEffect(() => {
    if (cancelDone) {
      const timer = setTimeout(() => setCancelDone(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [cancelDone]);

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await cancel();
      setCancelDone(true);
      setTimeout(() => window.location.reload(), 1500);
    } finally {
      setIsCancelling(false);
      setShowConfirm(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await apiFetch(`/questions/stats`, {
      });
      const data = await res.json();
      if (res.status === 401) {
        router.push("/login");
      }
      if (data.genres) setGenreData(data.genres);
      setStatsData(data.stats);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMe = async () => {
    const res = await apiFetch("/auth/me", {
    });
    const user = await res.json();
    setUserName(user.userName || "Engineer");
  };

  useEffect(() => {
    fetchMe();
    fetchStats();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 space-y-8">
      <Header userName={userName} streak={statsData?.streak ?? 0} />

      <StatsGrid
        todayCount={statsData?.todayCount ?? 0}
        weeklyTotal={statsData?.thisWeek.total ?? 0}
        accuracy={statsData?.thisWeek.accuracy ?? 0}
        totalDiff={statsData?.diff.totalDiff ?? 0}
        accuracyDiff={statsData?.diff.accuracyDiff ?? 0}
      />

      {!isPremium && (
        <div className="bg-yellow-400 text-black p-4 rounded">
          <p className="font-bold">プレミアムで全問題解放</p>
          <p className="text-sm">月額770円(税込み)・復習機能・全ジャンル対応</p>
          <button
            onClick={checkout}
            className="mt-3 bg-black text-white px-4 py-2 rounded"
          >
            プレミアムになる
          </button>
        </div>
      )}

      {subscription?.cancelAtPeriodEnd && (
        <div className="bg-gray-600 p-3 rounded">
          次回更新で解約されます（それまではプレミアム利用可能）
        </div>
      )}

      <GenreAccordionList data={genreData || {}} />

      <MainMenu
        hasResume={statsData?.hasResume ?? false}
        availableLanguages={availableLanguages}
      />

      {isPremium && !subscription?.cancelAtPeriodEnd && (
        <div className="bg-green-500/20 border border-green-400 p-4 rounded">
          <p className="font-bold text-green-400">プレミアムプラン利用中</p>
          <button
            onClick={() => setShowConfirm(true)}
            className="mt-3 text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            サブスクを解約
          </button>
        </div>
      )}

      {isPremium && subscription?.cancelAtPeriodEnd && (
        <div className="bg-red-500/20 border border-red-400 p-4 rounded">
          <p className="font-bold text-red-400">解約予約済み</p>
          <p className="text-sm">
            {new Date(subscription.currentPeriodEnd).toLocaleDateString()} まで利用可能です
          </p>
        </div>
      )}

      <Footer />

      {/* ① 確認モーダル */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded w-80">
            <p className="font-bold mb-2">本当に解約しますか？</p>
            <p className="text-sm mb-4">期間終了までは引き続き利用できます。</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                キャンセル
              </button>
              <button
                onClick={handleCancel}
                disabled={isCancelling}
                className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
              >
                解約する
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ② ローディングトースト */}
      {isCancelling && (
        <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded z-50">
          解約処理中...
        </div>
      )}

      {/* ③ 完了トースト */}
      {cancelDone && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded z-50">
          解約しました
        </div>
      )}
    </div>
  );
}