"use client";

import { useState } from "react";
import { C, fadeUp } from "./token";
import { useInView } from "./useInView";
import { CTAButton } from "./CTAButton";

const CHOICES = [
  { id: "A", text: "実行速度の低下" },
  { id: "B", text: "モック化できず単体テストが困難になる" },
  { id: "C", text: "メモリ使用量の増加" },
  { id: "D", text: "コンパイル時間の増大" },
];

const CORRECT = "B";

const EXPLANATION =
  "staticメソッドはインスタンスに紐づかないため、MockitoなどのテストフレームワークでDIによる差し替えができません。" +
  "その結果、依存するクラスを巻き込んだ結合テストしか書けなくなり、テスト工数が大幅に増加します。" +
  "実務では「テストしやすい設計かどうか」が重要な判断基準の一つです。";

export function ExampleSection() {
  const { ref, inView } = useInView();
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleReset = () => {
    setSelected(null);
    setRevealed(false);
  };

  return (
    <section style={{
      background: C.surface,
      padding: "clamp(48px,8vh,96px) 0",
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>
        <div ref={ref}>
          {/* heading */}
          <div style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: C.accent, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>
              ── 実際の問題を体験する
            </p>
            <h2 style={{ fontSize: "clamp(1.375rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              「これ、答えられますか？」
            </h2>
            <p style={{ color: C.sub, fontSize: "0.9375rem", margin: 0, lineHeight: 1.7 }}>
              実務で実際に判断を迫られる問題です。直感で選んでみてください。
            </p>
          </div>

          {/* question card */}
          <div style={{
            ...fadeUp(inView, 0.1),
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            overflow: "hidden",
          }}>
            {/* card header */}
            <div style={{
              padding: "14px 20px",
              background: C.surface,
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}>
              <span style={{
                fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em",
                color: "#a78bfa",
                background: "rgba(167,139,250,0.12)",
                border: "1px solid rgba(167,139,250,0.25)",
                borderRadius: 999, padding: "3px 10px",
              }}>Java · 設計判断</span>
              <span style={{ fontSize: "0.75rem", color: C.muted }}>難易度 ★★★☆☆</span>
            </div>

            {/* question body */}
            <div style={{ padding: "28px 24px 20px" }}>
              <p style={{ fontSize: "0.6875rem", color: C.muted, fontWeight: 700, letterSpacing: "0.08em", margin: "0 0 10px" }}>Q.</p>
              <p style={{ fontSize: "1.0625rem", fontWeight: 700, color: C.text, lineHeight: 1.6, margin: 0 }}>
                staticメソッドを多用しすぎることの<br />
                <span style={{ color: "#fde68a" }}>最大の弊害</span>はどれか？
              </p>
            </div>

            {/* choices */}
            <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
              {CHOICES.map((c) => {
                const isSelected = selected === c.id;
                const isCorrect = c.id === CORRECT;
                const showCorrect = revealed && isCorrect;
                const showWrong = revealed && isSelected && !isCorrect;

                let borderColor = C.border;
                let bg = "transparent";
                let textColor = C.sub;

                if (!revealed && isSelected) {
                  borderColor = C.accent;
                  bg = "rgba(14,165,233,0.08)";
                  textColor = C.text;
                }
                if (showCorrect) {
                  borderColor = C.success;
                  bg = "rgba(34,197,94,0.08)";
                  textColor = "#6ee7b7";
                }
                if (showWrong) {
                  borderColor = C.danger;
                  bg = "rgba(239,68,68,0.08)";
                  textColor = "#fca5a5";
                }

                return (
                  <button
                    key={c.id}
                    onClick={() => { if (!revealed) setSelected(c.id); }}
                    disabled={revealed}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 16px",
                      background: bg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: 8,
                      cursor: revealed ? "default" : "pointer",
                      textAlign: "left",
                      transition: "all 0.15s",
                      fontFamily: "inherit",
                    }}
                  >
                    <span style={{
                      width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.75rem", fontWeight: 700,
                      background: showCorrect ? C.success : showWrong ? C.danger : isSelected ? C.accent : C.surface,
                      color: (showCorrect || showWrong || isSelected) ? "#fff" : C.muted,
                      border: `1px solid ${borderColor}`,
                      transition: "all 0.15s",
                    }}>{c.id}</span>
                    <span style={{ fontSize: "0.9rem", color: textColor, transition: "color 0.15s", lineHeight: 1.5 }}>
                      {c.text}
                    </span>
                    {showCorrect && <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "#6ee7b7", fontWeight: 700, flexShrink: 0 }}>✓ 正解</span>}
                    {showWrong  && <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "#fca5a5", fontWeight: 700, flexShrink: 0 }}>✗ 不正解</span>}
                  </button>
                );
              })}
            </div>

            {/* action */}
            <div style={{ padding: "0 20px 24px" }}>
              {!revealed ? (
                <button
                  onClick={() => { if (selected) setRevealed(true); }}
                  disabled={!selected}
                  style={{
                    width: "100%", padding: "13px",
                    background: selected ? C.accent : C.surface,
                    color: selected ? "#fff" : C.muted,
                    border: `1px solid ${selected ? C.accent : C.border}`,
                    borderRadius: 8, fontSize: "0.9375rem", fontWeight: 700,
                    cursor: selected ? "pointer" : "not-allowed",
                    fontFamily: "inherit", transition: "all 0.2s",
                  }}
                >
                  {selected ? "答えを確認する →" : "選択肢を選んでください"}
                </button>
              ) : (
                <div>
                  <div style={{
                    padding: "16px 18px",
                    background: "rgba(34,197,94,0.06)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    borderRadius: 8, marginBottom: 12,
                  }}>
                    <p style={{ fontSize: "0.6875rem", color: "#4ade80", fontWeight: 700, letterSpacing: "0.08em", margin: "0 0 8px" }}>
                      解説
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "#a7f3d0", lineHeight: 1.85, margin: "0 0 10px" }}>
                      {EXPLANATION}
                    </p>
                    <p style={{ fontSize: "0.8125rem", color: C.muted, margin: 0, fontStyle: "italic" }}>
                      💡 DevTrainでは全問「なぜ正解か・なぜ不正解か」を解説します
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    style={{
                      width: "100%", padding: "11px",
                      background: "transparent", color: C.muted,
                      border: `1px solid ${C.border}`,
                      borderRadius: 8, fontSize: "0.875rem",
                      cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    もう一度試す
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CTA below */}
          <div style={{ ...fadeUp(inView, 0.2), textAlign: "center", marginTop: 32 }}>
            <p style={{ color: C.sub, fontSize: "0.875rem", marginBottom: 16, lineHeight: 1.7 }}>
              この問題は「設計判断」カテゴリの1問です。<br />
              無料登録で各言語100問まで解けます。
            </p>
            <CTAButton href="/login" primary>無料で続きを解く →</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}