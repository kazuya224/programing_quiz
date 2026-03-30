export interface UserStats {
    todayCount: number;
    streak: number;
    thisWeek: { total: number; accuracy: number };
    lastWeek: { total: number; accuracy: number };
    diff: { totalDiff: number; accuracyDiff: number };
    hasResume: boolean;
}

export type Genre = {
    genre: string;
    accuracy: number | null; // 未回答対応
    totalCount: number;      // 回答数
    correctCount: number;    // 正解数
}