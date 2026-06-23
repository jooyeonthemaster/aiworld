"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C14 — 인터랙티브 이력서 [CASE / C · 웹을 짓다]
 * Result: 미니 브라우저 + 스크롤되는 웹 이력서 —
 *   좌 프로필(사진 자리·이름) | 우 경력 타임라인(점+선 3개) + 하단 스킬 바(골드 채움).
 * reveal 하위구간으로 프로필 → 타임라인 점들 → 스킬 바 채움이 순차 stagger.
 */

const SCRIPT: ClineScript = {
  project: "resume-web",
  userPrompt:
    "내 이력서를 인터랙티브 웹페이지로 만들어줘. 경력 타임라인, 스킬 바.",
  steps: [
    { kind: "create", label: "resume.html 생성", detail: "프로필 · 반응형 · 모바일 완벽" },
    { kind: "edit", label: "경력 타임라인", detail: "스크롤 점등 · 점+선" },
    { kind: "edit", label: "스킬 바 애니메이션", detail: "퍼센트 채움 · 골드" },
  ],
};

/* ── 데이터(결정적) ── */
const CAREER: { year: string; role: string; org: string }[] = [
  { year: "2024", role: "그로스 마케팅 리드", org: "네안데르 AX" },
  { year: "2021", role: "퍼포먼스 마케터", org: "스튜디오 루멘" },
  { year: "2018", role: "콘텐츠 기획자", org: "메종 컬러" },
];
const SKILLS: { name: string; pct: number }[] = [
  { name: "콘텐츠 전략", pct: 92 },
  { name: "데이터 분석", pct: 78 },
  { name: "AI 워크플로우", pct: 86 },
  { name: "브랜드 카피", pct: 71 },
];

function SkillBar({
  reveal,
  name,
  pct,
  i,
}: {
  reveal: MotionValue<number>;
  name: string;
  pct: number;
  i: number;
}) {
  const start = 0.5 + i * 0.06;
  const sx = useTransform(reveal, [start, start + 0.18], [0, pct / 100]);
  return (
    <div className="flex items-center gap-2">
      <span className="w-[clamp(48px,5vw,72px)] shrink-0 font-body text-[9px] text-bone/70 md:text-[11px]">
        {name}
      </span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-bone/[0.07]">
        <motion.div
          style={{ scaleX: sx }}
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-gold to-gold-bright"
        />
      </div>
      <span className="w-7 shrink-0 text-right font-mono text-[9px] tabular-nums text-gold md:text-[10px]">
        {pct}
      </span>
    </div>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const profO = useTransform(reveal, [0.14, 0.4], [0, 1]);
  const profX = useTransform(reveal, [0.14, 0.4], [-16, 0]);
  const lineSY = useTransform(reveal, [0.34, 0.72], [0, 1]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 미니 브라우저 주소창 */}
      <div className="flex items-center gap-2 rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-bone/20" />
        <div className="flex flex-1 items-center gap-2 rounded-md bg-bone/[0.05] px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F]/70" />
          <span className="font-mono text-[10px] text-bone/55 md:text-[11px]">resume.html</span>
        </div>
        <span className="font-mono text-[9px] text-bone/35 md:text-[10px]">100% 모바일</span>
      </div>

      {/* 렌더된 이력서 — 2단(프로필 | 타임라인) + 하단 스킬 */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0E0C12]">
        <div className="grid min-h-0 flex-1 grid-cols-[0.78fr_1fr] gap-3 p-3.5">
          {/* 좌 프로필 */}
          <motion.div
            style={{ opacity: profO, x: profX }}
            className="flex flex-col items-center gap-2 rounded-lg border border-bone/10 bg-bone/[0.03] px-2.5 py-3.5 text-center"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30"
              style={{ background: "radial-gradient(120% 120% at 50% 20%, rgba(232,181,75,0.22), transparent 70%)" }}
            >
              <span className="font-display text-[15px] font-black text-gold">정</span>
            </div>
            <div>
              <p className="font-display text-[11px] font-black text-bone md:text-[13px]">정주연</p>
              <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-bone/45 md:text-[9px]">
                MARKETER
              </p>
            </div>
            <span className="rounded-full bg-gold/15 px-2 py-0.5 font-body text-[8px] text-gold md:text-[9px]">
              7년 차 · AX
            </span>
          </motion.div>

          {/* 우 경력 타임라인 */}
          <div className="relative min-h-0 pl-3.5">
            {/* 세로 선 (위→아래 그려짐) */}
            <motion.span
              style={{ scaleY: lineSY }}
              className="absolute left-[3px] top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-gradient-to-b from-gold via-gold/50 to-transparent"
            />
            <div className="flex h-full flex-col justify-between py-0.5">
              {CAREER.map((c, i) => {
                const at = 0.36 + i * 0.1;
                return <TimelineItem key={c.year} reveal={reveal} at={at} item={c} />;
              })}
            </div>
          </div>
        </div>

        {/* 하단 스킬 바 */}
        <div className="border-t border-bone/10 bg-bone/[0.02] px-3.5 py-3">
          <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.25em] text-bone/40 md:text-[9px]">
            SKILLS
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {SKILLS.map((s, i) => (
              <SkillBar key={s.name} reveal={reveal} name={s.name} pct={s.pct} i={i} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineItem({
  reveal,
  at,
  item,
}: {
  reveal: MotionValue<number>;
  at: number;
  item: { year: string; role: string; org: string };
}) {
  const o = useTransform(reveal, [at, at + 0.16], [0, 1]);
  const x = useTransform(reveal, [at, at + 0.16], [12, 0]);
  const dot = useTransform(reveal, [at, at + 0.1], [0.2, 1]);
  return (
    <motion.div style={{ opacity: o, x }} className="relative">
      <motion.span
        style={{ scale: dot }}
        className="absolute -left-[15px] top-1 h-2 w-2 rounded-full bg-gold ring-2 ring-gold/20"
      />
      <p className="font-mono text-[8px] text-gold/80 md:text-[9px]">{item.year}</p>
      <p className="font-body text-[10px] font-semibold leading-tight text-bone md:text-[12px]">
        {item.role}
      </p>
      <p className="font-body text-[8px] text-bone/55 md:text-[10px]">{item.org}</p>
    </motion.div>
  );
}

export default function C14ResumeWeb() {
  return (
    <CaseScene
      scene="c14"
      act="CASE · 웹을 짓다"
      cluster="C · 웹을 짓다"
      num={14}
      title="인터랙티브 이력서"
      oldTool="PDF 이력서 · 디자인 외주"
      lead="스크롤되는 웹 이력서. 링크 하나로 공유, 모바일도 완벽."
      script={SCRIPT}
      Result={Result}
      resultTab="미리보기 — resume.html"
    />
  );
}
