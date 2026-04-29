// app/home
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

import { Genre, UserStats} from "@/components/dashboard/types";

export default function HomePage() {
  const [statsData, setStatsData] = useState<UserStats | null>(null);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [genreData, setGenreData] = useState<Record<string, Genre[]> | null>(null);
  const router = useRouter();
  const availableLanguages = Object.keys(genreData || {});
  const { isPremium, subscription, checkout } = useSubscription();

  // HomePage.tsx の fetchStats 関数内
  const fetchStats = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await apiFetch(`/questions/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });    // const res = await apiFetch(`/api/questions/stats/${userId}`);
      
      const data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }
      
      // バックエンドの Map<String, List<GenreDto>> は data.genres に入っているはず
      if (data.genres) {
        setGenreData(data.genres);
      }
      setStatsData(data.stats);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMe = async () => {
    const token = localStorage.getItem("token");

    const res = await apiFetch("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      <Header
        userName={userName}
        streak={statsData?.streak ?? 0}
      />

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

      {<GenreAccordionList data={genreData || {}} />}

      <MainMenu hasResume={statsData?.hasResume ?? false} availableLanguages={availableLanguages} />

      <Footer />
    </div>
  );
}