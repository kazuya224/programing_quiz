import { useState } from "react";
import {GenreItem} from "./GenreItem"
import type {Genre} from "./types"

type Props = {
    language: string;
    genres: Genre[];
  };
  
  export function LanguageAccordion({ language, genres }: Props) {
    const [open, setOpen] = useState(false);
  
    const toggle = (e: React.MouseEvent) => {
      e.preventDefault(); // 予期せぬ動作を防止
      setOpen(!open);
    };

    const totalQuestions = genres.reduce((sum, g) => sum + g.totalCount, 0);
  
    return (
      <div className="border border-slate-700 rounded-xl bg-slate-800 relative mb-4">
        <button 
          onClick={toggle}
          type="button"
          className="w-full text-left p-4 flex justify-between items-center hover:bg-slate-700 transition-colors rounded-xl focus:outline-none"
          style={{ cursor: 'pointer', position: 'relative', zIndex: 10 }}
        >
          <span>{language}</span>
          <span className="text-xs text-slate-400 ml-auto mr-4">
            合計: {totalQuestions}問
          </span>
          <span>{open ? "▲" : "▼"}</span>
        </button>
  
        {open && (
          <div className="p-4 border-t border-slate-700 space-y-4 bg-slate-900/50">
            {genres && genres.length > 0 ? (
              genres.map((g) => (
                <GenreItem key={`${language}-${g.genre}`} language={language} genre={g} />
              ))
            ) : (
              <div className="text-gray-500 text-sm">データがありません</div>
            )}
          </div>
        )}
      </div>
    );
  }