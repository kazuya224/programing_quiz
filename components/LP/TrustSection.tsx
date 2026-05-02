"use client";

import { C, fadeUp } from "./token";
import { useInView } from "./useInView";

const VOICES = [
  {
    text: "ProgateとUdemyで半年学んだが、業務でコードを読むとき毎回止まってた。DevTrainで2週間で「読める感覚」が変わった。",
    name: "K.T.",
    role: "Java研修中（27歳）",
    star: 5,
  },
  {
    text: "staticとインスタンスの使い分けとか、教材では学べないことが問題になってる。実務感があって続けられる。",
    name: "M.S.",
    role: "Web系転職準備中（24歳）",
    star: 5,
  },
  {
    text: "設計判断系の問題が特に刺さった。「なぜこう書くのか」を問われるから、頭への残り方が全然違う。",
    name: "R.N.",
    role: "SESエンジニア1年目（23歳）",
    star: 5,
  },
];

export function TrustSection() {
  const { ref, inView } = useInView();

  return (
    <section style={{
      background: C.surface,
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      padding: "clamp(40px,6vh,72px) 0",
    }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>
        <div ref={ref}>
          <p style={{
            ...fadeUp(inView),
            textAlign: "center",
            fontSize: "0.75rem",
            color: C.muted,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: 32,
          }}>
            実際に使っている方の声
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: 16,
          }}>
            {VOICES.map(({ text, name, role, star }, i) => (
              <div
                key={name}
                style={{
                  ...fadeUp(inView, 0.1 + i * 0.08),
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: "20px 18px",
                }}
              >
                {/* stars */}
                <div style={{ marginBottom: 10 }}>
                  {Array.from({ length: star }).map((_, si) => (
                    <span key={si} style={{ color: C.warn, fontSize: 13 }}>★</span>
                  ))}
                </div>

                <p style={{ fontSize: "0.8125rem", color: C.sub, lineHeight: 1.85, margin: "0 0 14px" }}>
                  "{text}"
                </p>

                <div>
                  <p style={{ fontSize: "0.875rem", color: C.text, fontWeight: 600, margin: 0 }}>{name}</p>
                  <p style={{ fontSize: "0.75rem", color: C.muted, margin: "3px 0 0" }}>{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}