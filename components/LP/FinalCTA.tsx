// ============================================================
// FINAL CTA

import { CTAButton } from "./CTAButton";
import { useInView } from "./useInView";
import {C, fadeUp} from "./token";

// ============================================================
export function FinalCTA() {
    const { ref, inView } = useInView();
    return (
      <section style={{
        background: C.surface,
        padding: "clamp(56px,10vh,96px) clamp(20px,5vw,40px)",
        textAlign: "center",
      }}>
        <div ref={ref} style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={fadeUp(inView)}>
            <h2 style={{ fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 800, color: C.text, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              今日から、変わり始める。
            </h2>
            <p style={{ color: C.sub, fontSize: "0.9375rem", lineHeight: 1.8, margin: "0 0 36px" }}>
              月額770円。いつでも解約できます。<br />実力を磨く1,500問が、あなたを待っています。
            </p>
            <CTAButton href="/login" primary>無料で始める →</CTAButton>
          </div>
        </div>
      </section>
    );
  }
  