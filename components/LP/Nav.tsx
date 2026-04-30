"use client";
// ============================================================
// NAV

import { useState, useEffect } from "react";
import {C, fadeUp} from "./token";

// ============================================================
export function Nav() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
      const fn = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", fn);
      return () => window.removeEventListener("scroll", fn);
    }, []);
    return (
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        background: scrolled ? `${C.bg}ee` : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        padding: "0 clamp(20px,5vw,48px)",
        height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.3s ease",
      }}>
        <span style={{ fontWeight: 800, fontSize: "1.125rem", color: C.text, letterSpacing: "-0.02em" }}>
          Dev<span style={{ color: C.accent }}>Train</span>
        </span>
        <a href="/login" style={{
          fontSize: "0.8125rem", color: C.sub, textDecoration: "none",
          padding: "6px 18px", border: `1px solid ${C.border}`, borderRadius: 6,
          transition: "border-color 0.2s, color 0.2s",
        }}
          onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = C.accent; (e.target as HTMLElement).style.color = C.text; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = C.border; (e.target as HTMLElement).style.color = C.sub; }}
        >ログイン / 登録</a>
      </nav>
    );
  }