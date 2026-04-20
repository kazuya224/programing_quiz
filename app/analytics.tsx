"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", "G-KHK7G2X36N", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}