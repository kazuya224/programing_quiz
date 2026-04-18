import type { Genre } from "./types";
import Link from "next/link"; // 追加

type Props = {
  language: string; // 親から受け取るために追加
  genre: Genre;
};

export function GenreItem({ language, genre }: Props) {
  const percent =
    genre.accuracy !== null ? Math.round(genre.accuracy * 100) : null;

  // 間違えた問題がある場合のみ、ボタンを有効化または目立たせることができます
  const hasMistakes = genre.totalCount - genre.correctCount > 0;

  return (
    <div className="py-3 border-b border-slate-700/50 last:border-0">
      <div className="flex justify-between items-start mb-2">
        {/* 左側：ジャンル名と進捗 */}
        <div className="flex-1 mr-4">
          <div className="flex justify-between items-end mb-1">
            <span className="text-sm font-medium text-slate-200">{genre.genre}</span>
            <div className="text-right">
              <span className="text-xs text-slate-400 mr-2">
                {genre.correctCount} / {genre.totalCount} 正解
              </span>
              <span className="text-sm font-bold text-blue-400">
                {percent !== null ? `${percent}%` : "- %"}
              </span>
            </div>
          </div>
          {/* プログレスバー */}
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            {percent !== null ? (
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            ) : (
              <div className="h-full w-0 bg-slate-600" />
            )}
          </div>
        </div>

        {/* 右側：復習ボタン */}
        <Link
          href={`/quiz?mode=review&language=${encodeURIComponent(language)}&genre=${encodeURIComponent(genre.genre)}`}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
            hasMistakes 
              ? "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/20" 
              : "bg-slate-700 text-slate-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          復習
        </Link>
      </div>
    </div>
  );
}