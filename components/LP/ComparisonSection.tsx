"use client";

import { C, fadeUp } from "./token";
import { useInView } from "./useInView";
import { useMediaQuery, BP } from "./useMediaQuery";

type Rating = "◎" | "○" | "△" | "×";

interface CompRow {
  label: string;
  devtrain: Rating;
  service1: Rating;
  service2: Rating;
  school: Rating;
}

const RATING_COLOR: Record<Rating, string> = {
  "◎": C.success,
  "○": "#60a5fa",
  "△": C.warn,
  "×": C.danger,
};

const RATING_LABEL: Record<Rating, string> = {
  "◎": "優れている",
  "○": "良い",
  "△": "普通",
  "×": "課題あり",
};

const COLS = ["DevTrain", "動画学習系", "技術書・教材", "スクール"];

const ROWS: CompRow[] = [
  { label: "実務レベルの問題", devtrain: "◎", service1: "△", service2: "○", school: "○" },
  { label: "アウトプット量",   devtrain: "◎", service1: "×", service2: "△", school: "○" },
  { label: "学習効率",         devtrain: "◎", service1: "△", service2: "△", school: "○" },
  { label: "解説の丁寧さ",     devtrain: "◎", service1: "○", service2: "○", school: "◎" },
  { label: "価格",             devtrain: "◎", service1: "○", service2: "○", school: "×" },
];

// モバイル用カード形式の比較
function MobileComparison() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {ROWS.map((row) => (
        <div key={row.label} style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 10, overflow: "hidden",
        }}>
          <div style={{
            padding: "10px 14px", background: C.surface,
            borderBottom: `1px solid ${C.border}`,
            fontSize: "0.8125rem", fontWeight: 700, color: C.sub,
          }}>
            {row.label}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
            {(["devtrain", "service1", "service2", "school"] as const).map((key, ci) => {
              const rating = row[key] as Rating;
              const isDevtrain = ci === 0;
              return (
                <div key={key} style={{
                  padding: "12px 6px", textAlign: "center",
                  background: isDevtrain ? "rgba(14,165,233,0.08)" : "transparent",
                  borderRight: ci < 3 ? `1px solid ${C.border}` : "none",
                }}>
                  <div style={{
                    fontSize: "0.625rem", color: isDevtrain ? C.accent : C.muted,
                    fontWeight: isDevtrain ? 700 : 400, marginBottom: 4,
                  }}>
                    {COLS[ci]}
                  </div>
                  <span
                    title={RATING_LABEL[rating]}
                    aria-label={RATING_LABEL[rating]}
                    style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      width: 28, height: 28, borderRadius: "50%",
                      background: `${RATING_COLOR[rating]}18`,
                      fontSize: "0.875rem", fontWeight: 800,
                      color: RATING_COLOR[rating],
                    }}
                  >
                    {rating}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// デスクトップ用テーブル形式
function DesktopComparison() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: 540 }}>
        <thead>
          <tr>
            <th style={{
              padding: "14px 16px", textAlign: "left", fontSize: "0.75rem",
              color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}`,
            }}>
              比較項目
            </th>
            {COLS.map((col, i) => (
              <th key={col} style={{
                padding: "14px 12px", textAlign: "center", fontSize: "0.8125rem",
                fontWeight: 700, borderBottom: `1px solid ${C.border}`,
                color: i === 0 ? C.accent : C.sub,
                background: i === 0 ? "rgba(14,165,233,0.06)" : "transparent",
                borderLeft: i === 0 ? "2px solid rgba(14,165,233,0.4)" : "none",
                borderRight: i === 0 ? "2px solid rgba(14,165,233,0.4)" : "none",
                borderTop: i === 0 ? "2px solid rgba(14,165,233,0.4)" : "none",
              }}>
                {i === 0 && (
                  <div style={{
                    background: C.accent, color: "#fff", fontSize: "0.625rem",
                    fontWeight: 800, padding: "2px 8px", borderRadius: 999,
                    marginBottom: 4, display: "inline-block", letterSpacing: "0.05em",
                  }}>おすすめ</div>
                )}
                <div>{col}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, ri) => (
            <tr key={row.label}>
              <td style={{
                padding: "14px 16px", fontSize: "0.8125rem", color: C.sub,
                borderBottom: ri < ROWS.length - 1 ? `1px solid ${C.border}` : "none",
                whiteSpace: "nowrap",
              }}>
                {row.label}
              </td>
              {(["devtrain", "service1", "service2", "school"] as const).map((key, ci) => {
                const rating = row[key] as Rating;
                const isDevtrain = ci === 0;
                return (
                  <td key={key} style={{
                    padding: "14px 12px", textAlign: "center",
                    background: isDevtrain ? "rgba(14,165,233,0.06)" : "transparent",
                    borderLeft: isDevtrain ? "2px solid rgba(14,165,233,0.4)" : "none",
                    borderRight: isDevtrain ? "2px solid rgba(14,165,233,0.4)" : "none",
                    borderBottom: ri < ROWS.length - 1
                      ? `1px solid ${isDevtrain ? "rgba(14,165,233,0.2)" : C.border}`
                      : isDevtrain ? "2px solid rgba(14,165,233,0.4)" : "none",
                  }}>
                    <span
                      title={RATING_LABEL[rating]}
                      aria-label={RATING_LABEL[rating]}
                      style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 32, height: 32, borderRadius: "50%",
                        background: `${RATING_COLOR[rating]}18`,
                        fontSize: "1rem", fontWeight: 800,
                        color: RATING_COLOR[rating],
                      }}
                    >
                      {rating}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ComparisonSection() {
  const { ref, inView } = useInView();
  const isMobile = useMediaQuery(BP.isMobile);

  return (
    <section style={{ maxWidth: 860, margin: "0 auto", padding: "clamp(48px,8vh,96px) clamp(16px,5vw,40px)" }}>
      <div ref={ref}>
        <div style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: C.accent, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>
            ── 他の選択肢と比べてみる
          </p>
          <h2 style={{ fontSize: "clamp(1.375rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>
            なぜDevTrainが選ばれるのか
          </h2>
        </div>

        <div style={fadeUp(inView, 0.15)}>
          {isMobile ? <MobileComparison /> : <DesktopComparison />}
        </div>

        {/* legend */}
        <div style={{ ...fadeUp(inView, 0.2), display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {(["◎", "○", "△", "×"] as Rating[]).map(r => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ color: RATING_COLOR[r], fontWeight: 700 }}>{r}</span>
              <span style={{ fontSize: "0.75rem", color: C.muted }}>{RATING_LABEL[r]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}