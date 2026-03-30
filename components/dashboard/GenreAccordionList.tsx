import { LanguageAccordion } from "./LanguageAccordion";
import type { Genre } from "./types";

type Props = {
  data: Record<string, Genre[]>;
};

export default function GenreAccordionList({ data }: Props) {
  if(!data) return null;
  return (
    <div className="space-y-4">
      {Object.entries(data).map(([language, genres]) => (
        <LanguageAccordion
          key={language}
          language={language}
          genres={genres}
        />
      ))}
    </div>
  );
}