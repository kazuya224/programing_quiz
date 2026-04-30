// ============================================================
// ④ Before / After

import { useInView } from "./useInView";
import {C, fadeUp} from "./token";

// ============================================================
export function BeforeAfterSection() {
    const { ref, inView } = useInView();
   
    const before = [
      { icon: "🌀", text: "何をやるべきか、わからない" },
      { icon: "😰", text: "コードを見ても手が動かない" },
      { icon: "😶", text: "実力がないという自信のなさ" },
    ];
    const after = [
      { icon: "🚀", text: "自走できる。迷わずコードを書ける" },
      { icon: "🏆", text: "実務レベルの基礎が身についている" },
      { icon: "💡", text: "自分のスキルに自信がある" },
    ];
   
    return (
      <section style={{
        background: C.surface,
        padding: "clamp(48px,8vh,96px) 0",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(20px,5vw,40px)" }}>
          <div ref={ref}>
            <div style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 52 }}>
              <p style={{ color: C.accent, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>
                ── 学習前と学習後
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>
                DevTrainで変わること
              </h2>
            </div>
   
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "clamp(12px,3vw,24px)", alignItems: "center" }}>
              {/* Before */}
              <div style={{ ...fadeUp(inView, 0.1) }}>
                <div style={{
                  background: C.card, border: `1px solid rgba(239,68,68,0.25)`,
                  borderRadius: 12, overflow: "hidden",
                }}>
                  <div style={{
                    background: "rgba(239,68,68,0.1)", padding: "14px 20px",
                    borderBottom: `1px solid rgba(239,68,68,0.15)`,
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <span style={{ fontSize: 16 }}>😔</span>
                    <span style={{ fontWeight: 700, color: "#f87171", fontSize: "0.875rem" }}>Before</span>
                  </div>
                  <div style={{ padding: "20px" }}>
                    {before.map(({ icon, text }) => (
                      <div key={text} style={{
                        display: "flex", gap: 10, alignItems: "flex-start",
                        marginBottom: 14, padding: "10px 12px",
                        background: "rgba(239,68,68,0.05)", borderRadius: 8,
                        border: "1px solid rgba(239,68,68,0.1)",
                      }}>
                        <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                        <span style={{ fontSize: "0.8125rem", color: C.sub, lineHeight: 1.5 }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
   
              {/* Arrow */}
              <div style={{ ...fadeUp(inView, 0.2), textAlign: "center" }}>
                <div style={{
                  width: "clamp(36px,6vw,52px)", height: "clamp(36px,6vw,52px)",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.accent}, #22c55e)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "clamp(16px,3vw,22px)", color: "#fff", fontWeight: 900,
                  boxShadow: "0 0 24px rgba(14,165,233,0.4)",
                }}>→</div>
              </div>
   
              {/* After */}
              <div style={{ ...fadeUp(inView, 0.15) }}>
                <div style={{
                  background: C.card, border: `1px solid rgba(34,197,94,0.25)`,
                  borderRadius: 12, overflow: "hidden",
                }}>
                  <div style={{
                    background: "rgba(34,197,94,0.1)", padding: "14px 20px",
                    borderBottom: `1px solid rgba(34,197,94,0.15)`,
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <span style={{ fontSize: 16 }}>🎯</span>
                    <span style={{ fontWeight: 700, color: "#4ade80", fontSize: "0.875rem" }}>After</span>
                  </div>
                  <div style={{ padding: "20px" }}>
                    {after.map(({ icon, text }) => (
                      <div key={text} style={{
                        display: "flex", gap: 10, alignItems: "flex-start",
                        marginBottom: 14, padding: "10px 12px",
                        background: "rgba(34,197,94,0.05)", borderRadius: 8,
                        border: "1px solid rgba(34,197,94,0.12)",
                      }}>
                        <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                        <span style={{ fontSize: "0.8125rem", color: C.sub, lineHeight: 1.5 }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }