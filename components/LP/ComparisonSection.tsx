// ============================================================
// ③ 比較表

import { useInView } from "./useInView";
import {C, fadeUp} from "./token";

// ============================================================
export type Rating = "◎" | "○" | "△" | "×";
 
export interface CompRow {
  label: string;
  devtrain: Rating;
  service1: Rating;
  service2: Rating;
  school: Rating;
}
 
export const RATING_COLOR: Record<Rating, string> = {
  "◎": C.success,
  "○": "#60a5fa",
  "△": C.warn,
  "×": C.danger,
};
 
export function ComparisonSection() {
  const { ref, inView } = useInView();
 
  const cols = ["DevTrain", "動画学習系", "技術書・教材", "スクール"];
  const rows: CompRow[] = [
    { label: "実務レベルの問題",  devtrain: "◎", service1: "△", service2: "○", school: "○" },
    { label: "アウトプット量",    devtrain: "◎", service1: "×", service2: "△", school: "○" },
    { label: "学習効率",          devtrain: "◎", service1: "△", service2: "△", school: "○" },
    { label: "解説の丁寧さ",      devtrain: "◎", service1: "○", service2: "○", school: "◎" },
    { label: "価格",              devtrain: "◎", service1: "○", service2: "○", school: "×" },
  ];
 
  const ratingLabel: Record<Rating, string> = {
    "◎": "優れている", "○": "良い", "△": "普通", "×": "課題あり",
  };
 
  return (
    <section style={{ maxWidth: 860, margin: "0 auto", padding: "clamp(48px,8vh,96px) clamp(20px,5vw,40px)" }}>
      <div ref={ref}>
        <div style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: C.accent, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>
            ── 他の選択肢と比べてみる
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>
            なぜDevTrainが選ばれるのか
          </h2>
        </div>
 
        <div style={{ ...fadeUp(inView, 0.15), overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: 540 }}>
            <thead>
              <tr>
                <th style={{ padding: "14px 16px", textAlign: "left", fontSize: "0.75rem", color: C.muted, fontWeight: 600, borderBottom: `1px solid ${C.border}` }}>
                  比較項目
                </th>
                {cols.map((col, i) => (
                  <th key={col} style={{
                    padding: "14px 12px", textAlign: "center", fontSize: "0.8125rem",
                    fontWeight: 700, borderBottom: `1px solid ${C.border}`,
                    color: i === 0 ? C.accent : C.sub,
                    background: i === 0 ? "rgba(14,165,233,0.06)" : "transparent",
                    borderLeft: i === 0 ? `2px solid rgba(14,165,233,0.4)` : "none",
                    borderRight: i === 0 ? `2px solid rgba(14,165,233,0.4)` : "none",
                    borderTop: i === 0 ? `2px solid rgba(14,165,233,0.4)` : "none",
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
              {rows.map((row, ri) => (
                <tr key={row.label}>
                  <td style={{
                    padding: "14px 16px", fontSize: "0.8125rem", color: C.sub,
                    borderBottom: ri < rows.length - 1 ? `1px solid ${C.border}` : "none",
                    whiteSpace: "nowrap",
                  }}>{row.label}</td>
                  {(["devtrain", "service1", "service2", "school"] as const).map((key, ci) => {
                    const rating = row[key] as Rating;
                    const isDevtrain = ci === 0;
                    return (
                      <td key={key} style={{
                        padding: "14px 12px", textAlign: "center",
                        borderBottom: ri < rows.length - 1 ? `1px solid ${C.border}` : "none",
                        background: isDevtrain ? "rgba(14,165,233,0.06)" : "transparent",
                        borderLeft: isDevtrain ? `2px solid rgba(14,165,233,0.4)` : "none",
                        borderRight: isDevtrain ? `2px solid rgba(14,165,233,0.4)` : "none",
                        borderBottomColor: ri < rows.length - 1
                          ? isDevtrain ? `rgba(14,165,233,0.2)` : C.border
                          : isDevtrain ? `rgba(14,165,233,0.4)` : "transparent",
                        borderBottomWidth: ri === rows.length - 1 && isDevtrain ? 2 : 1,
                        borderBottomStyle: "solid",
                      }}>
                        <span
                          title={ratingLabel[rating]}
                          aria-label={ratingLabel[rating]}
                          style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            width: 32, height: 32, borderRadius: "50%",
                            background: `${RATING_COLOR[rating]}18`,
                            fontSize: "1rem", fontWeight: 800,
                            color: RATING_COLOR[rating],
                          }}>{rating}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
 
        {/* legend */}
        <div style={{ ...fadeUp(inView, 0.2), display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {(["◎", "○", "△", "×"] as Rating[]).map(r => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: RATING_COLOR[r], fontWeight: 700 }}>{r}</span>
              <span style={{ fontSize: "0.75rem", color: C.muted }}>{ratingLabel[r]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}