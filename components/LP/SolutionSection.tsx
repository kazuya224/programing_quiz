"use client";

import { C, fadeUp } from "./token";
import { useInView } from "./useInView";

const SOLUTIONS = [
  {
    icon: "⚡",
    title: "現場レベルの問題でスキルが身につく",
    desc: "実務で実際に問われる観点・設計・実装を問題形式で体験。理解が「使える知識」に変わる。",
  },
  {
    icon: "🗺️",
    title: "何を勉強すべきか、迷わない",
    desc: "体系的なカリキュラムで学習順序を設計済み。今日やるべき問題が明確になる。",
  },
  {
    icon: "💪",
    title: "実務で使える力がつく",
    desc: "正答率グラフと復習機能で弱点を可視化。繰り返すことで確かな自信がつく。",
  },
];

export function SolutionSection() {
  const { ref, inView } = useInView();

  return (
    <section style={{
      background: `linear-gradient(180deg, ${C.bg} 0%, ${C.surface} 50%, ${C.bg} 100%)`,
      padding: "clamp(48px,8vh,96px) 0",
    }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>
        <div ref={ref}>
          <div style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: C.accent, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>
              ── DevTrainなら、こう変わる
            </p>
            <h2 style={{ fontSize: "clamp(1.375rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>
              悩みを解決する、3つの柱。
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: 16,
          }}>
            {SOLUTIONS.map(({ icon, title, desc }, i) => (
              <div key={title} style={{
                ...fadeUp(inView, 0.1 + i * 0.1),
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: "24px 20px",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: "linear-gradient(90deg, #0ea5e9, #22c55e)",
                }} />
                <div style={{ fontSize: 26, marginBottom: 12 }}>{icon}</div>
                <p style={{ fontWeight: 700, color: C.text, fontSize: "0.9375rem", marginBottom: 8, marginTop: 0 }}>{title}</p>
                <p style={{ color: C.sub, fontSize: "0.8125rem", lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}