import { ReactNode } from "react";

/** 씬 상단의 모노스페이스 액트 라벨 */
export default function Kicker({
  children,
  tone = "gold",
  className = "",
}: {
  children: ReactNode;
  tone?: "gold" | "bone" | "ember" | "ink";
  className?: string;
}) {
  const text = {
    gold: "text-gold",
    bone: "text-bone/70",
    ember: "text-ember",
    ink: "text-ink/70",
  }[tone];
  const line = {
    gold: "bg-gold/60",
    bone: "bg-bone/40",
    ember: "bg-ember/60",
    ink: "bg-ink/40",
  }[tone];

  return (
    <div
      className={`flex items-center gap-3 font-mono text-[11px] md:text-xs tracking-[0.35em] uppercase ${text} ${className}`}
    >
      <span className={`h-px w-10 ${line}`} />
      <span>{children}</span>
    </div>
  );
}
