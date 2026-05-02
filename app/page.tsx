"use client";
// app/page.tsx

import { Nav }               from "@/components/LP/Nav";
import { Hero }              from "@/components/LP/Hero";
import { TrustSection }      from "@/components/LP/TrustSection";
import { PainSection }       from "@/components/LP/PainSection";
import { SolutionSection }   from "@/components/LP/SolutionSection";
import { FeatureSection }    from "@/components/LP/FeatureSection";
import { ExampleSection }    from "@/components/LP/ExampleSection";
import { HowItWorksSection } from "@/components/LP/HowItWorksSection";
import { BeforeAfterSection }from "@/components/LP/BeforeAfterSection";
import { ComparisonSection } from "@/components/LP/ComparisonSection";
import { PricingSection }    from "@/components/LP/PricingSection";
import { FAQSection }        from "@/components/LP/FAQSection";
import { FinalCTA }          from "@/components/LP/FinalCTA";
import { Footer }            from "@/components/LP/Footer";
import { C }                 from "@/components/LP/token";

export default function Page() {
  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      color: C.text,
      fontFamily: "'Inter', 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif",
    }}>
      <Nav />
      <main>
        {/* 1. Hero ── キャッチコピーとCTA */}
        <Hero />

        {/* 2. Trust ── ユーザーの声（社会的証明） */}
        {/* <TrustSection /> */}

        {/* 3. Pain ── 共感・課題の言語化 */}
        <PainSection />

        {/* 4. Solution ── 解決策の提示 */}
        <SolutionSection />

        {/* 5. Feature ── 6つの特徴 */}
        <FeatureSection />

        {/* 6. Example ── インタラクティブ例題（最重要） */}
        <ExampleSection />

        {/* 7. HowItWorks ── 4ステップの使い方 */}
        <HowItWorksSection />

        {/* 8. BeforeAfter ── 変化の可視化 */}
        <BeforeAfterSection />

        {/* 9. Comparison ── Progate / Udemy との比較 */}
        <ComparisonSection />

        {/* 10. Pricing ── トライアル強調 */}
        <PricingSection />

        {/* 11. FAQ ── 解約・無料期間の安心感 */}
        <FAQSection />

        {/* 12. FinalCTA ── 最後の後押し */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}