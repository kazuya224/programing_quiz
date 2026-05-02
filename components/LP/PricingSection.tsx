"use client";

import { C, fadeUp } from "./token";
import { useInView } from "./useInView";
import { CTAButton } from "./CTAButton";

const VALUE_POINTS = [
  { icon: "🏫", label: "プログラミングスクール", price: "30〜1000万円", note: "数ヶ月の受講費", highlight: false },
  { icon: "📘", label: "技術書・教材",           price: "3,000〜15,000円", note: "1冊ごとに購入", highlight: false },
  { icon: "🎓", label: "DevTrain",               price: "¥770 / 月",      note: "税込・解約自由", highlight: true },
];

const FEATURES = [
  "1,500問以上の現場ベース問題",
  "全問丁寧な解説付き",
  "弱点を自動ピックアップする復習機能",
  "分野別の正答率比較",
  "いつでも解約可能",
];

const PAYMENT_ROWS = [
  { label: "課金タイミング", value: "無料トライアル７日間終了時に課金。以後毎月同日に自動更新" },
  { label: "支払い方法",     value: "クレジットカード" },
  { label: "解約",           value: "7日以内の解約は完全無料。以後は次回更新日まで利用可" },
];

export function PricingSection() {
  const { ref, inView } = useInView();

  return (
    <section id="pricing" style={{ maxWidth: 640, margin: "0 auto", padding: "clamp(48px,8vh,96px) clamp(16px,5vw,40px)" }}>
      <div ref={ref}>
        <div style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: C.accent, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>
            ── 価格・料金
          </p>
          <h2 style={{ fontSize: "clamp(1.375rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            スクールの<span style={{ color: C.warn }}>数百分の1</span>で始められる。
          </h2>
          <p style={{ color: C.sub, fontSize: "0.9375rem", margin: 0, lineHeight: 1.7 }}>
            問題演習に特化することで、圧倒的な低価格を実現しました。
          </p>
        </div>

        {/* Cost comparison */}
        <div style={{ ...fadeUp(inView, 0.1), display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {VALUE_POINTS.map(({ icon, label, price, note, highlight }) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: highlight ? "rgba(14,165,233,0.08)" : C.card,
              border: `1px solid ${highlight ? "rgba(14,165,233,0.4)" : C.border}`,
              borderRadius: 10, padding: "14px 18px",
              position: "relative", overflow: "hidden",
              gap: 12,
            }}>
              {highlight && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, #0ea5e9, #22c55e)",
                }} />
              )}
              <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: highlight ? 700 : 500, color: highlight ? C.text : C.sub }}>{label}</div>
                  <div style={{ fontSize: "0.75rem", color: C.muted, marginTop: 2 }}>{note}</div>
                </div>
              </div>
              <div style={{
                fontSize: highlight ? "1.0625rem" : "0.875rem",
                fontWeight: 800, color: highlight ? C.accent : C.muted,
                flexShrink: 0,
              }}>
                {price}
              </div>
            </div>
          ))}
        </div>

        {/* Plan card */}
        <div style={{ ...fadeUp(inView, 0.2), background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
          <div style={{
            background: C.surface, padding: "32px 28px 24px", textAlign: "center",
            borderBottom: `1px solid ${C.border}`,
          }}>
            <p style={{ color: C.muted, fontSize: "0.8125rem", marginBottom: 8, marginTop: 0 }}>月額プラン</p>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
              <span style={{ fontSize: "0.9375rem", color: C.sub, fontWeight: 600 }}>¥</span>
              <span style={{ fontSize: "clamp(2.25rem,8vw,3.5rem)", fontWeight: 900, color: C.text, lineHeight: 1 }}>770</span>
              <span style={{ fontSize: "0.875rem", color: C.muted }}>/ 月（税込）</span>
            </div>
          </div>
          <div style={{ padding: "20px 24px" }}>
            {FEATURES.map((f, i) => (
              <div key={f} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 0",
                borderBottom: i < FEATURES.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
                <span style={{ color: C.success, fontSize: 15, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: "0.875rem", color: C.sub }}>{f}</span>
              </div>
            ))}
            <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
              {PAYMENT_ROWS.map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.75rem", color: C.muted, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: "0.75rem", color: C.sub, textAlign: "right" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ ...fadeUp(inView, 0.3), textAlign: "center", marginTop: 28 }}>
          <CTAButton href="/login" primary>今すぐ無料で始める →</CTAButton>
          <p style={{ color: C.muted, fontSize: "0.75rem", marginTop: 12 }}>
            まずは無料で試せます。カード登録は有料プランから。
          </p>
        </div>
      </div>
    </section>
  );
}