import { useState } from "react";
import {GenreItem} from "./GenreItem"
import type {Genre} from "./types"

type Props = {
    language: string;
    genres: Genre[];
  };
  
  export function LanguageAccordion({ language, genres }: Props) {
    const [open, setOpen] = useState(false);
  
    return (
      <div className="border rounded-xl p-4">
        <button onClick={() => setOpen(!open)} className="w-full text-left">
          {language}
        </button>
  
        {open && (
          <div className="mt-3 space-y-2">
            {genres.map((g) => (
              <GenreItem key={g.genre} genre={g} />
            ))}
          </div>
        )}
      </div>
    );
  }