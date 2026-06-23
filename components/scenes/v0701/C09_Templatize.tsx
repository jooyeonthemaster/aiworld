"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C09 — 템플릿화 → 다른 프로젝트 이식 [CASE / 클러스터 B · 눈에 보이게]
 * Result: 중앙 template/ 폴더 카드 → 세 갈래 화살표 → 프로젝트 A/B/C 카드(재사용).
 * "한 번 만들고, 무한 재활용" 골드 캡션. 허브-스포크 다이어그램으로 다른 사례와 확연히 구별.
 */

const SCRIPT: ClineScript = {
  project: "report-kit",
  userPrompt:
    "이 리포트 디자인을 템플릿으로 빼서 다른 프로젝트에도 쓸 수 있게 해줘.",
  steps: [
    { kind: "read", label: "report.html 분석", detail: "스타일·레이아웃 구조 파악" },
    { kind: "create", label: "template/ 분리", detail: "재사용 가능한 골격으로 추출" },
    { kind: "edit", label: "내용 변수화", detail: "{{title}} · {{data}} 슬롯화" },
  ],
};

/* ── 재사용 대상 프로젝트 카드(결정적 데이터) ── */
const PROJECTS = [
  { tag: "A", name: "q3-sales", tint: "#82AAFF" },
  { tag: "B", name: "team-okr", tint: "#C3E88D" },
  { tag: "C", name: "ad-recap", tint: "#C792EA" },
] as const;

function FolderGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  /* 0~0.3 허브 등장 / 0.25~0.6 가지(화살표) 뻗음 / 0.5~0.85 프로젝트 카드 / 0.82~1 캡션 */
  const hubO = useTransform(reveal, [0, 0.28], [0, 1]);
  const hubScale = useTransform(reveal, [0, 0.28], [0.82, 1]);
  const lineLen = useTransform(reveal, [0.25, 0.6], [0, 1]);
  const capO = useTransform(reveal, [0.82, 1], [0, 1]);

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden px-[clamp(0.9rem,1.6vw,1.6rem)] py-[clamp(0.9rem,1.8vh,1.6rem)]">
      {/* 다이어그램 무대: 상단 허브 → 화살표 → 하단 3카드 */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* 1) 중앙 template/ 폴더 (허브) */}
        <motion.div style={{ opacity: hubO, scale: hubScale }} className="relative z-10 mx-auto">
          <div className="relative rounded-xl border border-gold/40 bg-gold/[0.08] px-[clamp(1rem,1.8vw,1.8rem)] py-[clamp(0.6rem,1.2vh,1rem)] [box-shadow:0_0_36px_-8px_rgba(232,181,75,0.45)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl"
              style={{ background: "radial-gradient(70% 120% at 50% 0%, rgba(232,181,75,0.14), transparent 72%)" }}
            />
            <div className="relative flex items-center gap-2.5">
              <span className="text-gold"><FolderGlyph className="h-[clamp(1.1rem,1.6vw,1.5rem)] w-[clamp(1.1rem,1.6vw,1.5rem)]" /></span>
              <div className="min-w-0">
                <p className="font-mono font-bold leading-none text-gold text-[clamp(0.85rem,1.2vw,1.15rem)]">template/</p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.04em] text-bone/70 md:text-[10px]">report-kit · 단일 원본</p>
              </div>
            </div>
            <div className="relative mt-2 flex flex-wrap gap-1.5">
              {["{{title}}", "{{data}}", "{{brand}}"].map((s) => (
                <span key={s} className="rounded border border-gold/25 bg-gold/[0.07] px-1.5 py-0.5 font-mono text-[9px] text-gold/85 md:text-[10px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 2) 세 갈래 화살표 (허브 → 카드, SVG pathLength) */}
        <div className="pointer-events-none relative z-0 min-h-0 flex-1">
          <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
            <defs>
              <marker id="c09-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0 0L9 5L0 10z" fill="rgba(232,181,75,0.7)" />
              </marker>
            </defs>
            {[58, 150, 242].map((x, i) => (
              <motion.path
                key={x}
                d={`M150 2 C 150 ${40 + i * 0}, ${x} 46, ${x} 96`}
                fill="none"
                stroke="rgba(232,181,75,0.55)"
                strokeWidth={1.6}
                strokeLinecap="round"
                markerEnd="url(#c09-arrow)"
                style={{ pathLength: lineLen }}
              />
            ))}
          </svg>
        </div>

        {/* 3) 프로젝트 A/B/C 카드 (재사용) */}
        <div className="relative z-10 grid grid-cols-3 gap-[clamp(0.5rem,1vw,1rem)]">
          {PROJECTS.map((proj, i) => (
            <ProjectCard key={proj.tag} proj={proj} reveal={reveal} i={i} />
          ))}
        </div>
      </div>

      {/* 4) 골드 캡션 */}
      <motion.div style={{ opacity: capO }} className="mt-[clamp(0.6rem,1.4vh,1.1rem)] flex items-center justify-center gap-2.5">
        <span className="inline-block h-px w-6 bg-gold/55" />
        <span className="font-display font-bold text-gold text-[clamp(0.78rem,1.05vw,1.05rem)] [text-shadow:0_0_22px_rgba(232,181,75,0.35)]">
          한 번 만들고, 무한 재활용
        </span>
        <span className="inline-block h-px w-6 bg-gold/55" />
      </motion.div>
    </div>
  );
}

function ProjectCard({
  proj,
  reveal,
  i,
}: {
  proj: { tag: string; name: string; tint: string };
  reveal: MotionValue<number>;
  i: number;
}) {
  const at = 0.5 + i * 0.1;
  const o = useTransform(reveal, [at, at + 0.18], [0, 1]);
  const y = useTransform(reveal, [at, at + 0.18], [16, 0]);
  return (
    <motion.div
      style={{ opacity: o, y }}
      className="flex flex-col gap-1.5 rounded-lg border border-bone/12 bg-bone/[0.035] px-[clamp(0.4rem,0.7vw,0.75rem)] py-[clamp(0.5rem,1vh,0.85rem)]"
    >
      <div className="flex items-center gap-1">
        <span
          className="flex h-[clamp(1rem,1.5vw,1.4rem)] w-[clamp(1rem,1.5vw,1.4rem)] shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold md:text-[11px]"
          style={{ color: proj.tint, backgroundColor: `${proj.tint}1f` }}
        >
          {proj.tag}
        </span>
        <p className="min-w-0 whitespace-nowrap font-mono tracking-tight text-[clamp(0.6rem,0.82vw,0.82rem)] text-bone/85">{proj.name}/</p>
      </div>
      {/* 재사용 — 같은 골격, 다른 내용 */}
      <div className="flex flex-col gap-1">
        <span className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: `${proj.tint}55` }} />
        <span className="h-1.5 w-full rounded-full bg-bone/12" />
        <span className="h-1.5 w-5/6 rounded-full bg-bone/10" />
      </div>
      <span className="mt-0.5 self-start rounded border border-bone/12 bg-bone/[0.05] px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-bone/70 md:text-[10px]">
        재사용 ✓
      </span>
    </motion.div>
  );
}

export default function C09Templatize() {
  return (
    <CaseScene
      scene="c09"
      act="CASE · 눈에 보이게"
      cluster="B · 눈에 보이게"
      num={9}
      title="템플릿화→다른 프로젝트 이식"
      oldTool="매번 새로 만들기 · 디자인 외주 반복"
      lead="한 번 만든 디자인을 템플릿으로. 다음 프로젝트에 그대로 재활용."
      script={SCRIPT}
      Result={Result}
      resultTab="템플릿"
    />
  );
}
