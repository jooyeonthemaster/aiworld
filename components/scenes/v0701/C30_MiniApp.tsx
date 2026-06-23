"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C30 — 나만의 미니 프로그램 제작 [CASE]
 * Result: 미리보기로 열린 "roi.html" — 깔끔한 단일목적 도구 UI.
 *   입력 필드 3개(광고비·전환수·객단가, 값 채워짐) → 큰 골드 결과 "ROAS 420%" → 계산 버튼.
 *   reveal 하위구간으로 헤더 → 입력칸 stagger → 결과 숫자 → 버튼 순으로 차오름.
 *   (다른 사례의 브라우저 랜딩/대시보드와 달리, 폼 중심의 미니 앱 컨트롤 패널)
 */

const SCRIPT: ClineScript = {
  project: "roi-tool",
  userPrompt:
    "마케팅 ROI 계산기 만들어줘. 광고비·전환수·객단가 넣으면 ROAS 나오게.",
  steps: [
    { kind: "think", label: "입력/출력 설계", detail: "광고비 · 전환수 · 객단가 → ROAS" },
    { kind: "create", label: "roi.html", detail: "단일 파일 · 의존성 0" },
    { kind: "edit", label: "계산 로직", detail: "ROAS = 매출 ÷ 광고비 × 100" },
    { kind: "run", label: "브라우저로 열기", detail: "open roi.html" },
  ],
};

/* ── 입력 필드(정적·결정적, 값 채워짐) ── */
const FIELDS: { label: string; value: string; unit: string }[] = [
  { label: "광고비", value: "500,000", unit: "원" },
  { label: "전환수", value: "210", unit: "건" },
  { label: "객단가", value: "10,000", unit: "원" },
];

/* ── 입력 한 칸(hook 안전: 컴포넌트 최상위에서 useTransform) ── */
function FieldRow({
  field,
  reveal,
  at,
}: {
  field: { label: string; value: string; unit: string };
  reveal: MotionValue<number>;
  at: number;
}) {
  const o = useTransform(reveal, [at, at + 0.12], [0, 1]);
  const x = useTransform(reveal, [at, at + 0.12], [-14, 0]);
  return (
    <motion.div style={{ opacity: o, x }} className="flex flex-col gap-1">
      <span className="font-body text-[9px] uppercase tracking-[0.18em] text-bone/45 md:text-[10px]">
        {field.label}
      </span>
      <div className="flex items-center gap-2 rounded-lg border border-bone/15 bg-bone/[0.04] px-3 py-2">
        <span className="flex-1 font-mono tabular-nums leading-none text-bone/90 text-[clamp(0.95rem,1.3vw,1.25rem)]">
          {field.value}
        </span>
        <span className="font-mono text-[10px] text-bone/40 md:text-[11px]">{field.unit}</span>
      </div>
    </motion.div>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.16], [0, 1]);
  const headO = useTransform(reveal, [0.1, 0.32], [0, 1]);
  const headY = useTransform(reveal, [0.1, 0.32], [14, 0]);
  const resO = useTransform(reveal, [0.62, 0.86], [0, 1]);
  const resScale = useTransform(reveal, [0.62, 0.86], [0.92, 1]);
  const glowO = useTransform(reveal, [0.66, 0.92], [0, 1]);
  const btnO = useTransform(reveal, [0.84, 1], [0, 1]);
  const btnY = useTransform(reveal, [0.84, 1], [12, 0]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 앱 헤더 바 (미니 도구) */}
      <div className="flex items-center gap-2 rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <span className="grid h-4 w-4 place-content-center rounded-[5px] bg-gold/85 font-display text-[9px] font-black leading-none text-ink">
          R
        </span>
        <span className="font-mono text-[10px] tracking-[0.06em] text-bone/60 md:text-[11px]">roi.html</span>
        <span className="ml-auto rounded border border-bone/15 bg-bone/[0.05] px-1.5 py-0.5 font-mono text-[8px] tracking-[0.1em] text-bone/45 md:text-[9px]">
          내 도구
        </span>
      </div>

      {/* 도구 본문 */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0E0C12] p-4">
        {/* 타이틀 */}
        <motion.div style={{ opacity: headO, y: headY }} className="flex items-baseline justify-between">
          <p className="font-display font-black leading-tight text-bone text-[clamp(0.9rem,1.4vw,1.35rem)]">
            마케팅 ROI 계산기
          </p>
          <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-gold/70 md:text-[9px]">
            ROAS
          </span>
        </motion.div>

        {/* 입력 필드 3개 */}
        <div className="grid grid-cols-3 gap-2.5">
          {FIELDS.map((f, i) => (
            <FieldRow key={f.label} field={f} reveal={reveal} at={0.2 + i * 0.12} />
          ))}
        </div>

        {/* 결과 패널 — 큰 골드 ROAS */}
        <motion.div
          style={{ opacity: resO, scale: resScale }}
          className="relative mt-auto flex flex-col items-center justify-center overflow-hidden rounded-xl border border-gold/30 bg-gold/[0.05] px-4 py-[clamp(0.9rem,2.4vh,1.6rem)]"
        >
          <motion.div
            aria-hidden
            style={{ opacity: glowO }}
            className="pointer-events-none absolute inset-0"
          >
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(70% 120% at 50% 100%, rgba(232,181,75,0.22), transparent 72%)" }}
            />
          </motion.div>
          <span className="relative font-body text-[9px] uppercase tracking-[0.26em] text-gold/70 md:text-[10px]">
            결과 · ROAS
          </span>
          <p className="relative font-display font-black tabular-nums leading-none text-gold text-[clamp(2.2rem,5vw,4.2rem)] [text-shadow:0_0_36px_rgba(232,181,75,0.45)]">
            420<span className="text-[0.5em] align-top">%</span>
          </p>
          <span className="relative mt-1 font-mono text-[9px] text-bone/55 md:text-[10px]">
            매출 2,100,000원 ÷ 광고비 500,000원
          </span>
        </motion.div>

        {/* 계산 버튼 */}
        <motion.button
          type="button"
          style={{ opacity: btnO, y: btnY }}
          className="w-full rounded-lg bg-gradient-to-r from-gold to-gold-bright py-2.5 font-body font-bold text-ink text-[clamp(0.85rem,1.1vw,1.05rem)]"
        >
          계산
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function C30MiniApp() {
  return (
    <CaseScene
      scene="c30"
      act="CASE · 전부 자동으로"
      cluster="F · 전부 자동으로"
      num={30}
      title="나만의 미니 프로그램 제작"
      oldTool="유료 변환기/계산기 앱들"
      lead="필요한 도구가 없으면? 그냥 만든다 — 나만 쓰는 미니 프로그램."
      script={SCRIPT}
      Result={Result}
      resultTab="미리보기 — roi.html"
    />
  );
}
