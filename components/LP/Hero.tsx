"use client";

import { C } from "./token";
import { CTAButton } from "./CTAButton";
import { useMediaQuery, BP } from "./useMediaQuery";

const STATS = [
  { val: "1,500+", label: "収録問題数" },
  { val: "月額770円", label: "税込・いつでも解約" },
  { val: "丁寧な解説", label: "1問ごとに詳しく" },
];

export function Hero() {
  const isMobile = useMediaQuery(BP.isMobile);

  return (
    <section
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: isMobile
          ? "56px 20px 48px"
          : "clamp(56px,10vh,120px) clamp(20px,5vw,40px) clamp(56px,8vh,96px)",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: isMobile ? 300 : 600, height: 300,
        background: "radial-gradient(ellipse at center, rgba(14,165,233,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "rgba(14,165,233,0.1)", color: C.accent,
        fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em",
        padding: "5px 14px", borderRadius: 999, marginBottom: 24,
        border: "1px solid rgba(14,165,233,0.25)",
      }}>
        <span>●</span> プログラミング問題演習プラットフォーム
      </div>

      <h1 style={{
        fontSize: isMobile ? "1.875rem" : "clamp(2.2rem,6vw,3.25rem)",
        fontWeight: 900, lineHeight: 1.2, color: C.text,
        margin: "0 0 20px", letterSpacing: "-0.03em",
      }}>
        実務レベルの問題で、<br />
        <span style={{ color: C.accent }}>本物のスキル</span>を身につける。
      </h1>

      <p style={{
        fontSize: isMobile ? "0.9375rem" : "clamp(0.9375rem,2vw,1.0625rem)",
        color: C.sub, lineHeight: 1.8,
        maxWidth: 520, margin: "0 auto 36px",
      }}>
        実務経験ゼロでも、独学で伸び悩んでいても大丈夫。<br />
        丁寧な解説と1,500問の演習で、確かな実力へ。月額770円。
      </p>

      <div style={{
        display: "flex", gap: 12, justifyContent: "center",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
      }}>
        <CTAButton href="/login" primary>無料で始める →</CTAButton>
        <CTAButton href="#pricing">料金を確認する</CTAButton>
      </div>

      {/* stats */}
      <div style={{
        display: "flex",
        gap: isMobile ? 24 : "clamp(24px,5vw,56px)",
        justifyContent: "center",
        marginTop: isMobile ? 40 : 52,
        flexWrap: "wrap",
      }}>
        {STATS.map(({ val, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: isMobile ? "1.125rem" : "clamp(1.25rem,3vw,1.5rem)", fontWeight: 800, color: C.text }}>{val}</div>
            <div style={{ fontSize: "0.75rem", color: C.muted, marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}