"use client";

import { useState } from "react";
import { C, fadeUp } from "./token";
import { useInView } from "./useInView";
import { CTAButton } from "./CTAButton";

const FAQS = [
  
  
  {
    q: "これからプログラミングの勉強を始める人でも使えますか？",
    a: "はい、使えます。ただし本サービスは「インプット後の判断力強化」に特化しているため、入門程度の知識がある方に最もフィットします。",
    category: "対象レベル",
  },
  {
    q: "どの言語に対応していますか？",
    a: "現在、Java・JavaScript・TypeScriptの各言語で「バグ修正・設計判断・コード読解」カテゴリの問題を用意しています。言語ごとに独立しているため、1言語に集中することも、複数を切り替えることも可能です。（今後、追加予定）",
    category: "対応言語",
  },
  {
    q: "問題は追加されますか？すぐに全問解き終わりそうです。",
    a: "有料プランでは定期的に問題が追加されます。現在は言語ごとに数百〜1,200問ありますが、実務での頻出パターンを随時追加予定です。",
    category: "問題数",
  },
  {
    q: "スマートフォンでも使えますか？",
    a: "はい、スマートフォン・タブレット・PCすべてに対応しています。1問30秒〜という設計はスマホでの通勤学習を想定して作られています。",
    category: "端末",
  },
  {
    q: "7日間の無料トライアル中に解約すれば、料金はかかりませんか？",
    a: "はい、7日以内に解約すれば一切費用はかかりません。クレジットカードの登録は必要ですが、トライアル終了前に解約すれば請求は発生しません。",
    category: "料金",
  },
  {
    q: "解約はいつでもできますか？手続きは複雑ですか？",
    a: "ホーム画面からで即時解約できます。解約後は次回更新日まで引き続きご利用いただけます。複雑な手続きは一切不要です。",
    category: "解約",
  },
  {
    q: "無料プランはずっと使えますか？",
    a: "はい、現在400問程度は期限なく永久に無料で解けます。有料プランに移行しなくても、無料範囲内でサービスの価値をご確認いただけます。",
    category: "無料プラン",
  },
];

export function FAQSection() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{
      maxWidth: 720,
      margin: "0 auto",
      padding: "clamp(48px,8vh,96px) clamp(16px,5vw,40px)",
    }}>
      <div ref={ref}>
        <div style={{ ...fadeUp(inView), textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: C.accent, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>
            ── よくある質問
          </p>
          <h2 style={{ fontSize: "clamp(1.375rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: 0, letterSpacing: "-0.02em" }}>
            FAQ
          </h2>
        </div>

        <div style={fadeUp(inView, 0.1)}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "20px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 16,
                  fontFamily: "inherit",
                }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.05em",
                    color: C.accent,
                    background: "rgba(14,165,233,0.1)",
                    border: "1px solid rgba(14,165,233,0.2)",
                    borderRadius: 999,
                    padding: "3px 8px",
                    whiteSpace: "nowrap" as const,
                    marginTop: 2,
                    flexShrink: 0,
                  }}>
                    {faq.category}
                  </span>
                  <span style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: open === i ? C.text : C.sub,
                    lineHeight: 1.6,
                    transition: "color 0.2s",
                  }}>
                    {faq.q}
                  </span>
                </div>
                <span style={{
                  fontSize: 20,
                  color: C.muted,
                  flexShrink: 0,
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  lineHeight: 1,
                  marginTop: 2,
                }}>+</span>
              </button>

              <div style={{
                maxHeight: open === i ? 400 : 0,
                overflow: "hidden",
                transition: "max-height 0.3s ease",
              }}>
                <p style={{
                  fontSize: "0.875rem",
                  color: C.sub,
                  lineHeight: 1.85,
                  margin: "0 0 20px",
                  paddingLeft: "calc(10px + 0.625rem * 2 + 8px + 10px)", // align with question text
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* bottom CTA */}
        <div style={{ ...fadeUp(inView, 0.2), textAlign: "center", marginTop: 48 }}>
          <p style={{ color: C.sub, fontSize: "0.875rem", marginBottom: 20, lineHeight: 1.7 }}>
            他にご不明な点はお気軽にお問い合わせください。
          </p>
          <CTAButton href="/login" primary>7日間 無料で試してみる →</CTAButton>
          <p style={{ color: C.muted, fontSize: "0.75rem", marginTop: 12 }}>
            クレジットカード登録のみ。7日以内の解約は完全無料。
          </p>
        </div>
      </div>
    </section>
  );
}