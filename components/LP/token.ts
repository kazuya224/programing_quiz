export const C = {
    bg: "#080e1a",
    surface: "#0f1b2d",
    card: "#111d30",
    border: "#1a2d45",
    accent: "#0ea5e9",
    accentDim: "#0369a1",
    success: "#22c55e",
    warn: "#f59e0b",
    danger: "#ef4444",
    text: "#e2eaf4",
    muted: "#64748b",
    sub: "#94a3b8",
};

export const fadeUp = (inView: boolean, delay = 0): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
});