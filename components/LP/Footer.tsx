import { C } from "./token";

export function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`,
      padding: "20px clamp(16px,5vw,48px)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 12,
    }}>
      <p style={{ color: C.muted, fontSize: "0.8125rem", margin: 0 }}>© 2026 DevTrain</p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <a href="/legal" style={{ color: C.muted, fontSize: "0.8125rem", textDecoration: "none" }}>特定商取引法に基づく表記</a>
        <a href="/login" style={{ color: C.muted, fontSize: "0.8125rem", textDecoration: "none" }}>ログイン</a>
      </div>
    </footer>
  );
}