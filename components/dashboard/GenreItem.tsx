import type {Genre} from "./types"
type Props = {
    genre: Genre;
  };
  
  export function GenreItem({ genre }: Props) {
    const percent =
      genre.accuracy !== null
        ? Math.round(genre.accuracy * 100)
        : null;
  
    return (
      <div>
        <div className="flex justify-between text-sm">
          <span>{genre.genre}</span>
          <span>
            {percent !== null ? `${percent}%` : "未回答"}
          </span>
        </div>
  
        {percent !== null && (
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="h-2 rounded bg-blue-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        )}
      </div>
    );
  }