"use client";

interface BadgeProps {
  level: number;
}

export default function DifficultyBadge({ level }: BadgeProps) {
  const config: Record<number, { label: string; color: string; bg: string }> = {
    1: { label: "入門", color: "#34d399", bg: "rgba(16,185,129,0.1)" },
    2: { label: "基礎", color: "#60a5fa", bg: "rgba(59,130,246,0.1)" },
    3: { label: "中級", color: "#fbbf24", bg: "rgba(234,179,8,0.1)" },
    4: { label: "上級", color: "#fb923c", bg: "rgba(249,115,22,0.1)" },
    5: { label: "達人", color: "#f87171", bg: "rgba(239,68,68,0.1)" },
  };

  const { label, color, bg } = config[level] || config[1];

  return (
    <span 
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border"
      style={{ 
        backgroundColor: bg, 
        color: color, 
        borderColor: `${color}40` 
      }}
    >
      {"★".repeat(level)} {label}
    </span>
  );
}