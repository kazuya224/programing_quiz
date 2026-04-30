"use client";
// app/page.tsx
import { Nav } from "@/components/LP/Nav";
import { Hero } from "@/components/LP/Hero";
import { PainSection } from "@/components/LP/PainSection";
import { SolutionSection } from "@/components/LP/SolutionSection";
import { ComparisonSection } from "@/components/LP/ComparisonSection";
import { BeforeAfterSection } from "@/components/LP/BeforeAfterSection";
import { PricingSection } from "@/components/LP/PricingSection";
import { FinalCTA } from "@/components/LP/FinalCTA";
import { Footer } from "@/components/LP/Footer";
import { C } from "@/components/LP/token";

export default function Page() {
  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      color: C.text,
      fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif",
    }}>
      <Nav />
      <main>
        <Hero />
        <PainSection />
        <SolutionSection />
        <ComparisonSection />
        <BeforeAfterSection />
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}