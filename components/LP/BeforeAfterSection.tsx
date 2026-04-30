"use client";

import { C, fadeUp } from "./token";
import { useInView } from "./useInView";
import { useMediaQuery, BP } from "./useMediaQuery";

const BEFORE = [
  { icon: "🌀", text: "何をやるべきか、わからない" },
  { icon: "😰", text: "コードを見ても手が動かない" },
  { icon: "😶", text: "実力がないという自信のなさ" },
];

const AFTER = [
  { icon: "🚀", text: "自走できる。迷わずコードを書ける" },
  { icon: "🏆", text: "実務レベルの基礎が身についている" },
  { icon: "💡", text: "自分のスキルに自信がある" },
];

function StateCard({
  label, emoji, labelColor, headerBg, headerBorder, cardBorder, itemBg, itemBorder, items,
}: {
  label: string; emoji: string; labelColor: string;
  headerBg: string; headerBorder: string; cardBorder: string;
  itemBg: string; itemBorder: string;
  items: { icon: string; text: string }[];
}) {
  return (
    <div style={{ background: C.card, border: cardBorder, borderRadius: 12, overflow: "hidden" }}>
      <div style={{
        background: headerBg, padding: "14px 20px",
        borderBottom: headerBorder,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ fontSize: 16 }}>{emoji}</span>
        <span style={{ fontWeight: 700, color: labelColor, fontSize: "0.875rem" }}>{label}</span>
      </div>
      <div style={{ padding: "16px" }}>
        {items.map(({ icon, text }) => (
          <div key={text} style={{
            display: "flex", gap: 10, alignItems: "flex-start",
            marginBottom: 10, padding: "10px 12px",
            background: itemBg, borderRadius: 8, border: itemBorder,
          }}>
            <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{icon}</span>
            <span style={{ fontSize: "0.8125rem", color: C.sub, lineHeight: 1.5 }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const { ref, inView } = useInView();
  const isMobile = useMediaQuery(BP.isMobile);

  const arrow = (
    <div style={{ textAlign: "center", padding: isMobile ? "8px 0" : "0" }}>
      <div style={{
        width: isMobile ? 40 : "clamp(36px,6vw,52px)",
        height: isMobile ? 40 : "clamp(36px,6vw,52px)",
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${C.accent}, #22c55e)`,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: isMobile ? 18 : "clamp(16px,3vw,22px)",
        color: "#fff", fontWeight: 900,
        boxShadow: "0 0 24px rgba(14,165,233,0.4)",
        transform: isMobile ? "rotate(90deg)" : "none",
      }}>→</div>
    </div>
  );

  return (
    <section style={{ background: C.surface, padding: "clamp(48px,8vh,96px) 0" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>
        <div ref={ref}>
          <div style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: C.accent, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>
              ── 学習前と学習後
            </p>
            <h2 style={{ fontSize: "clamp(1.375rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>
              DevTrainで変わること
            </h2>
          </div>

          {isMobile ? (
            // モバイル：縦積み
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={fadeUp(inView, 0.1)}>
                <StateCard
                  label="Before" emoji="😔" labelColor="#f87171"
                  headerBg="rgba(239,68,68,0.1)" headerBorder="1px solid rgba(239,68,68,0.15)"
                  cardBorder="1px solid rgba(239,68,68,0.25)"
                  itemBg="rgba(239,68,68,0.05)" itemBorder="1px solid rgba(239,68,68,0.1)"
                  items={BEFORE}
                />
              </div>
              <div style={fadeUp(inView, 0.15)}>{arrow}</div>
              <div style={fadeUp(inView, 0.2)}>
                <StateCard
                  label="After" emoji="🎯" labelColor="#4ade80"
                  headerBg="rgba(34,197,94,0.1)" headerBorder="1px solid rgba(34,197,94,0.15)"
                  cardBorder="1px solid rgba(34,197,94,0.25)"
                  itemBg="rgba(34,197,94,0.05)" itemBorder="1px solid rgba(34,197,94,0.12)"
                  items={AFTER}
                />
              </div>
            </div>
          ) : (
            // デスクトップ：横並び
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "clamp(12px,3vw,24px)", alignItems: "center" }}>
              <div style={fadeUp(inView, 0.1)}>
                <StateCard
                  label="Before" emoji="😔" labelColor="#f87171"
                  headerBg="rgba(239,68,68,0.1)" headerBorder="1px solid rgba(239,68,68,0.15)"
                  cardBorder="1px solid rgba(239,68,68,0.25)"
                  itemBg="rgba(239,68,68,0.05)" itemBorder="1px solid rgba(239,68,68,0.1)"
                  items={BEFORE}
                />
              </div>
              <div style={fadeUp(inView, 0.2)}>{arrow}</div>
              <div style={fadeUp(inView, 0.15)}>
                <StateCard
                  label="After" emoji="🎯" labelColor="#4ade80"
                  headerBg="rgba(34,197,94,0.1)" headerBorder="1px solid rgba(34,197,94,0.15)"
                  cardBorder="1px solid rgba(34,197,94,0.25)"
                  itemBg="rgba(34,197,94,0.05)" itemBorder="1px solid rgba(34,197,94,0.12)"
                  items={AFTER}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}