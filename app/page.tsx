"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

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
  const [genreData, setGenreData] = useState<Record<string, Genre[]>>({});
  const router = useRouter();

  const fetchStats = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }

    const res = await apiFetch(`/questions/stats/${userId}`);
    const data = await res.json();
    setStatsData(data.stats);
    setGenreData(data.genres); 
    setIsLoading(false);
    console.log("スタッツレスポンス", data.stats);
    console.log("ジャンルレスポンス", data.genres);
  };

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "Engineer");
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
      <GenreAccordionList data={genreData} />

      <MainMenu hasResume={statsData?.hasResume ?? false} />

      <Footer />
    </div>
  );
}