// ============================================================
// ① 悩みの可視化

import { useInView } from "./useInView";
import {C, fadeUp} from "./token";

// ============================================================
export function PainSection() {
    const { ref, inView } = useInView();
    const pains = [
      {
        icon: "🧭",
        title: "何をやればいいか、わからない",
        desc: "Qiitaやyoutubeを見ても、結局何を勉強すれば実務に繋がるのかがわからない。情報が多すぎて迷子になる。",
        tag: "方向性の迷い",
      },
      {
        icon: "📖",
        title: "インプットばかりで成長しない",
        desc: "動画を見てわかった気になる。でも手を動かしていないから、いざコードを書こうとすると何も出てこない。",
        tag: "アウトプット不足",
      },
      {
        icon: "🏢",
        title: "実務レベルに届いているか不安",
        desc: "独学で勉強しているけど、これが現場で通じるレベルかどうか判断できない。比較する基準がない。",
        tag: "基準がわからない",
      },
    ];
   
    return (
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "clamp(48px,8vh,96px) clamp(20px,5vw,40px)" }}>
        <div ref={ref}>
          <div style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: C.danger, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>
              ── こんな悩み、ありませんか？
            </p>
            <h2 style={{ fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>
              独学には、落とし穴がある。
            </h2>
          </div>
   
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {pains.map(({ icon, title, desc, tag }, i) => (
              <div key={tag} style={{
                ...fadeUp(inView, 0.1 + i * 0.1),
                background: C.card,
                border: `1px solid rgba(239,68,68,0.2)`,
                borderRadius: 12, padding: "28px 24px",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: "linear-gradient(90deg, #ef4444, #f97316)",
                }} />
                <div style={{
                  display: "inline-block", background: "rgba(239,68,68,0.1)",
                  color: "#f87171", fontSize: "0.6875rem", fontWeight: 700,
                  letterSpacing: "0.08em", padding: "3px 10px", borderRadius: 999, marginBottom: 16,
                }}>{tag}</div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <p style={{ fontWeight: 700, color: C.text, fontSize: "0.9375rem", marginBottom: 10, marginTop: 0 }}>{title}</p>
                <p style={{ color: C.sub, fontSize: "0.8125rem", lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }