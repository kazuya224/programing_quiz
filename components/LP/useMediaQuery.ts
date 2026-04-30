"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia(query);
        setMatches(mq.matches);
        const fn = (e: MediaQueryListEvent) => setMatches(e.matches);
        mq.addEventListener("change", fn);
        return () => mq.removeEventListener("change", fn);
    }, [query]);

    return matches;
}

// よく使うブレークポイント
export const BP = {
    isMobile: "(max-width: 639px)",
    isTablet: "(max-width: 767px)",
};
