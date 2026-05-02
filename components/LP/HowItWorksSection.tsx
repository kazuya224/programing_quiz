"use client";

import { C, fadeUp } from "./token";
import { useInView } from "./useInView";
import { useMediaQuery, BP } from "./useMediaQuery";

const STEPS = [
  {
    num: "01",
    title: "言語を選ぶ",
    desc: "Java・JavaScript・TypeScriptから学習したい言語を選択。複数言語を切り替えることも可能。",
    time: "30秒",
  },
  {
    num: "02",
    title: "4択問題を解く",
    desc: "「バグの原因」「設計判断」「コード読解」の問題に答える。1問30秒〜なのでスキマ時間でOK。",
    time: "30秒〜",
  },
  {
    num: "03",
    title: "解説で理解を深める",
    desc: "なぜ正解か・なぜ不正解かを丁寧に解説。Progateでは教わらない「実務の判断基準」が言語化されている。",
    time: "1〜2分",
  },
  {
    num: "04",
    title: "弱点を把握・繰り返す",
    desc: "正答率とカテゴリ別成績が自動集計される。苦手な判断パターンに集中して取り組める。",
    time: "ダッシュボード",
  },
];

export function HowItWorksSection() {
  const { ref, inView } = useInView();
  const isMobile = useMediaQuery(BP.isMobile);

  return (
    <section style={{
      maxWidth: 860,
      margin: "0 auto",
      padding: "clamp(48px,8vh,96px) clamp(16px,5vw,40px)",
    }}>
      <div ref={ref}>
        <div style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: C.accent, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>
            ── 使い方
          </p>
          <h2 style={{ fontSize: "clamp(1.375rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>
            今すぐ使いこなせる4ステップ
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              style={{
                ...fadeUp(inView, 0.08 + i * 0.08),
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "64px 1fr auto",
                gap: isMobile ? 8 : 24,
                alignItems: isMobile ? "flex-start" : "center",
                padding: "24px 0",
                borderBottom: i < STEPS.length - 1 ? `1px solid ${C.border}` : "none",
              }}
            >
              {/* step number */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 12 : 0,
              }}>
                <span style={{
                  fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em",
                  color: C.accent,
                  background: "rgba(14,165,233,0.1)",
                  border: "1px solid rgba(14,165,233,0.25)",
                  borderRadius: 999,
                  padding: "4px 10px",
                  display: "inline-block",
                }}>{s.num}</span>
                {isMobile && (
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: C.text, margin: 0 }}>
                    {s.title}
                  </h3>
                )}
              </div>

              {/* text */}
              <div>
                {!isMobile && (
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: C.text, margin: "0 0 6px" }}>
                    {s.title}
                  </h3>
                )}
                <p style={{ fontSize: "0.875rem", color: C.sub, margin: 0, lineHeight: 1.8 }}>
                  {s.desc}
                </p>
              </div>

              {/* time badge */}
              <div style={{ display: isMobile ? "none" : "flex" }}>
                <span style={{
                  fontSize: "0.75rem", color: C.muted,
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 999,
                  padding: "4px 12px",
                  whiteSpace: "nowrap",
                }}>{s.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}