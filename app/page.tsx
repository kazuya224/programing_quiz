export default function LandingPage() {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
  
        {/* ナビ */}
        <nav style={{ borderBottom: "1px solid #1e293b", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#0f172a", zIndex: 10 }}>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "#f8fafc", letterSpacing: "0.02em" }}>
            DevTrain
          </span>
          <a href="/login" style={{ fontSize: "0.875rem", color: "#94a3b8", textDecoration: "none", padding: "6px 16px", border: "1px solid #334155", borderRadius: "6px" }}>
            ログイン / 登録
          </a>
        </nav>
  
        <main>
          {/* ヒーロー */}
          <section style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px 64px", textAlign: "center" }}>
            <div style={{ display: "inline-block", background: "#1e3a5f", color: "#60a5fa", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", padding: "4px 14px", borderRadius: "999px", marginBottom: "24px" }}>
              プログラミング問題演習プラットフォーム
            </div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1.2, color: "#f8fafc", marginBottom: "20px" }}>
              1,500問で、<br />
              <span style={{ color: "#38bdf8" }}>実力</span>を可視化する。
            </h1>
            <p style={{ fontSize: "1.0625rem", color: "#94a3b8", lineHeight: 1.75, maxWidth: "520px", margin: "0 auto 40px" }}>
              基礎から応用まで網羅した問題集に、復習機能と正答率グラフを組み合わせ。弱点を自動検出して、効率よく伸ばします。
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/login" style={{ background: "#0ea5e9", color: "#fff", fontWeight: 700, fontSize: "0.9375rem", padding: "12px 36px", borderRadius: "8px", textDecoration: "none" }}>
                無料で始める
              </a>
              <a href="#pricing" style={{ background: "transparent", color: "#94a3b8", fontWeight: 500, fontSize: "0.9375rem", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", border: "1px solid #334155" }}>
                料金を確認する
              </a>
            </div>
          </section>
  
          {/* 機能カード */}
          <section style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 80px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <FeatureCard icon="📚" title="約1,500問" desc="基礎・アルゴリズム・実践まで幅広いカテゴリをカバー" />
              <FeatureCard icon="🔁" title="復習機能" desc="間違えた問題を自動ピックアップ。弱点に集中できる" />
              <FeatureCard icon="📊" title="正答率の可視化" desc="分野ごとの正答率をグラフで確認。伸びが一目でわかる" />
            </div>
          </section>
  
          {/* 料金 */}
          <section id="pricing" style={{ maxWidth: "480px", margin: "0 auto", padding: "0 24px 80px" }}>
            <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#f8fafc", textAlign: "center", marginBottom: "32px" }}>
              料金・お支払い
            </h2>
            <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ background: "#0f172a", padding: "32px 32px 24px", textAlign: "center", borderBottom: "1px solid #334155" }}>
                <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginBottom: "8px", marginTop: 0 }}>月額</p>
                <p style={{ fontSize: "3rem", fontWeight: 800, color: "#f8fafc", lineHeight: 1, margin: 0 }}>¥770</p>
                <p style={{ color: "#64748b", fontSize: "0.8125rem", marginTop: "6px", marginBottom: 0 }}>税込</p>
              </div>
              <div style={{ padding: "24px 32px" }}>
                <PricingRow label="課金タイミング" value="登録時に課金。以後毎月同日に自動更新" />
                <PricingRow label="支払い方法" value="クレジットカード（Stripe 決済）" />
                <PricingRow label="解約" value="いつでも可能。解約後は次回更新日まで利用可" last />
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <a href="/login" style={{ background: "#0ea5e9", color: "#fff", fontWeight: 700, fontSize: "0.9375rem", padding: "12px 48px", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>
                今すぐ始める
              </a>
            </div>
          </section>
        </main>
  
        {/* フッター */}
        <footer style={{ borderTop: "1px solid #1e293b", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ color: "#475569", fontSize: "0.8125rem", margin: 0 }}>© 2026 CodeDrill</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="/legal" style={{ color: "#64748b", fontSize: "0.8125rem", textDecoration: "none" }}>特定商取引法に基づく表記</a>
            <a href="/login" style={{ color: "#64748b", fontSize: "0.8125rem", textDecoration: "none" }}>ログイン</a>
          </div>
        </footer>
      </div>
    );
  }
  
  function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
    return (
      <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "10px", padding: "24px 20px" }}>
        <div style={{ fontSize: "24px", marginBottom: "12px" }}>{icon}</div>
        <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#f1f5f9", marginBottom: "8px", marginTop: 0 }}>{title}</p>
        <p style={{ fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.6, margin: 0 }}>{desc}</p>
      </div>
    );
  }
  
  function PricingRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", padding: "12px 0", borderBottom: last ? "none" : "1px solid #334155" }}>
        <span style={{ fontSize: "0.8125rem", color: "#64748b", flexShrink: 0 }}>{label}</span>
        <span style={{ fontSize: "0.8125rem", color: "#cbd5e1", textAlign: "right" }}>{value}</span>
      </div>
    );
  }