"use client";
// ============================================================
// CTA BUTTON

import { useState } from "react";
import {C, fadeUp} from "./token";

// ============================================================
export function CTAButton({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
    const [hovered, setHovered] = useState(false);
    const base: React.CSSProperties = primary
      ? {
          background: hovered ? "#38bdf8" : C.accent,
          color: "#fff", fontWeight: 700, fontSize: "0.9375rem",
          padding: "13px 36px", borderRadius: 8, textDecoration: "none",
          transition: "background 0.2s, transform 0.2s",
          transform: hovered ? "translateY(-1px)" : "none",
          boxShadow: hovered ? "0 8px 24px rgba(14,165,233,0.35)" : "none",
        }
      : {
          background: "transparent", color: C.sub, fontWeight: 500,
          fontSize: "0.9375rem", padding: "13px 24px", borderRadius: 8,
          textDecoration: "none", border: `1px solid ${C.border}`,
          transition: "border-color 0.2s, color 0.2s",
          borderColor: hovered ? C.accent : C.border,
          ...(hovered ? { color: C.text } : {}),
        };
    return (
      <a href={href} style={base}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >{children}</a>
    );
  }