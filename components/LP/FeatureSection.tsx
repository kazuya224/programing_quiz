"use client";

import { C, fadeUp } from "./token";
import { useInView } from "./useInView";

const FEATURES = [
  {
    icon: "⚡",
    tag: "継続しやすい",
    title: "1問30秒〜のスキマ学習",
    desc: "通勤・昼休み・就寝前の5分でも成立する問題設計。まとまった時間がなくても毎日続けられる。",
    tagColor: "#fbbf24",
    tagBg: "rgba(251,191,36,0.1)",
    tagBorder: "rgba(251,191,36,0.25)",
  },
  {
    icon: "🧠",
    tag: "実務直結",
    title: "「判断力」を直接鍛える設問",
    desc: "「この設計の何が問題か」「このバグの原因はどれか」知識の暗記ではなく、思考プロセスに問いかける。",
    tagColor: C.accent,
    tagBg: "rgba(14,165,233,0.1)",
    tagBorder: "rgba(14,165,233,0.25)",
  },
  {
    icon: "🔧",
    tag: "課題特化",
    title: "バグ修正・設計判断・コード読解",
    desc: "実務で詰まりやすい3パターンに特化。「何を鍛えているか」が明確だから、成長が実感しやすい。",
    tagColor: "#f87171",
    tagBg: "rgba(248,113,113,0.1)",
    tagBorder: "rgba(248,113,113,0.25)",
  },
  {
    icon: "📦",
    tag: "3言語対応",
    title: "Java / JavaScript / TypeScript",
    desc: "Web系・Java系どちらも対応。自分のキャリアに直結する言語を選んで集中できる。（今後、追加予定）",
    tagColor: "#a78bfa",
    tagBg: "rgba(167,139,250,0.1)",
    tagBorder: "rgba(167,139,250,0.25)",
  },
  {
    icon: "📊",
    tag: "成長が見える",
    title: "正答率・弱点の自動可視化",
    desc: "どのカテゴリが苦手かがひと目でわかる。感覚頼りの学習から、データ駆動の改善サイクルへ。",
    tagColor: "#34d399",
    tagBg: "rgba(52,211,153,0.1)",
    tagBorder: "rgba(52,211,153,0.25)",
  },
  {
    icon: "🆓",
    tag: "リスクゼロ",
    title: "無料で各言語100問まで解ける",
    desc: "課金なしで300問（3言語合計）にアクセス可能。まず試してから判断できる。",
    tagColor: C.success,
    tagBg: "rgba(34,197,94,0.1)",
    tagBorder: "rgba(34,197,94,0.25)",
  },
];

export function FeatureSection() {
  const { ref, inView } = useInView();

  return (
    <section style={{
      maxWidth: 960,
      margin: "0 auto",
      padding: "clamp(48px,8vh,96px) clamp(16px,5vw,40px)",
    }}>
      <div ref={ref}>
        <div style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: C.accent, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>
            ── サービスの特徴
          </p>
          <h2 style={{ fontSize: "clamp(1.375rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>
            実務力を育てる、6つの設計
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: 16,
        }}>
          {FEATURES.map(({ icon, tag, title, desc, tagColor, tagBg, tagBorder }, i) => (
            <div
              key={title}
              style={{
                ...fadeUp(inView, 0.08 + i * 0.06),
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "24px 20px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* top accent bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, #0ea5e9, #22c55e)",
              }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>{icon}</span>
                <span style={{
                  fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.06em",
                  color: tagColor,
                  background: tagBg,
                  border: `1px solid ${tagBorder}`,
                  borderRadius: 999,
                  padding: "3px 9px",
                }}>
                  {tag}
                </span>
              </div>

              <p style={{ fontWeight: 700, color: C.text, fontSize: "0.9375rem", margin: "0 0 8px" }}>
                {title}
              </p>
              <p style={{ color: C.sub, fontSize: "0.8125rem", lineHeight: 1.7, margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}