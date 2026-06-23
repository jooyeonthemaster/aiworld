"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C11 — 개인 포트폴리오 웹사이트 [CASE]
 * Result: 미니 브라우저(my-portfolio.vercel.app) + 포트폴리오 페이지 —
 *   히어로(이름/직함) + 프로젝트 카드 2×3 그리드(썸네일+제목) 가 reveal 로 차오름.
 *   C12(랜딩: 강점3+문의폼)와 확연히 구별: 다크 골드 갤러리형 카드 그리드.
 */

const SCRIPT: ClineScript = {
  project: "my-portfolio",
  userPrompt: "내 마케팅 포트폴리오 사이트 만들어줘. 프로젝트 6개, 다크 골드 톤.",
  steps: [
    { kind: "think", label: "섹션 기획 — 히어로 · 프로젝트 6", detail: "personal portfolio layout" },
    { kind: "create", label: "index.html 생성", detail: "+ Tailwind CDN · 다크 골드" },
    { kind: "edit", label: "프로젝트 그리드 (2×3)", detail: "thumbnail · 제목 · 카드" },
    { kind: "run", label: "vercel 배포", detail: "vercel --prod" },
  ],
  terminal: [
    { p: "$", t: "vercel --prod" },
    { p: ">", t: "✔ my-portfolio.vercel.app", gold: true },
  ],
};

/* 6개 프로젝트 카드 — 결정적 데이터(인덱스 기반, 랜덤/Date 금지) */
const PROJECTS: { id: string; title: string }[] = [
  { id: "01", title: "리브랜딩 캠페인" },
  { id: "02", title: "퍼포먼스 광고" },
  { id: "03", title: "콘텐츠 시리즈" },
  { id: "04", title: "SNS 그로스" },
  { id: "05", title: "런칭 전략" },
  { id: "06", title: "데이터 리포트" },
];

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);

  const heroO = useTransform(reveal, [0.12, 0.4], [0, 1]);
  const heroY = useTransform(reveal, [0.12, 0.4], [14, 0]);

  const gridO = useTransform(reveal, [0.34, 0.6], [0, 1]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 미니 브라우저 주소창 */}
      <div className="flex items-center gap-2 rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-bone/20" />
        <div className="flex flex-1 items-center gap-2 rounded-md bg-bone/[0.05] px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F]/70" />
          <span className="font-mono text-[10px] text-bone/55 md:text-[11px]">my-portfolio.vercel.app</span>
        </div>
      </div>

      {/* 렌더된 포트폴리오 페이지 (다크 골드) */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0E0B09]">
        {/* 히어로 — 이름 / 직함 */}
        <motion.div
          style={{ opacity: heroO, y: heroY }}
          className="relative flex items-center gap-3 px-4 pb-3 pt-4"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(80% 120% at 0% 0%, rgba(232,181,75,0.18), transparent 65%)" }}
          />
          <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/[0.1] font-display text-[12px] font-black text-gold md:h-9 md:w-9">
            JY
          </span>
          <div className="relative min-w-0">
            <p className="truncate font-display font-black leading-tight text-bone text-[clamp(0.95rem,1.5vw,1.45rem)]">
              주연 · 마케터
            </p>
            <p className="truncate font-mono text-[8px] uppercase tracking-[0.28em] text-gold/75 md:text-[9px]">
              BRAND · GROWTH · CONTENT
            </p>
          </div>
        </motion.div>

        {/* 프로젝트 카드 그리드 2×3 */}
        <motion.div style={{ opacity: gridO }} className="grid min-h-0 flex-1 grid-cols-2 grid-rows-3 gap-2 px-3.5 pb-3.5">
          {PROJECTS.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} i={i} reveal={reveal} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* 카드 1개 — reveal 하위구간으로 stagger 등장 */
function ProjectCard({
  proj,
  i,
  reveal,
}: {
  proj: { id: string; title: string };
  i: number;
  reveal: MotionValue<number>;
}) {
  // 0.42~0.92 구간을 6장에 stagger 분배 (결정적)
  const at = 0.42 + i * 0.07;
  const o = useTransform(reveal, [at, at + 0.12], [0, 1]);
  const y = useTransform(reveal, [at, at + 0.12], [12, 0]);

  // 썸네일 톤 — 인덱스 기반 결정적 골드 농도 변주 (5번째=골드 강조 1개)
  const isAccent = i === 4;
  const tone = 0.05 + ((i * 37) % 11) / 110; // 0.05~0.14 사이 결정적

  return (
    <motion.div
      style={{ opacity: o, y }}
      className={`group flex flex-col overflow-hidden rounded-lg border ${
        isAccent ? "border-gold/40" : "border-bone/10"
      } bg-bone/[0.02]`}
    >
      {/* 썸네일 */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: isAccent
              ? "linear-gradient(135deg, rgba(232,181,75,0.32), rgba(255,211,122,0.1) 60%, transparent)"
              : `linear-gradient(135deg, rgba(232,181,75,${tone}), transparent 70%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.08) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />
        {/* 인덱스 번호 워터마크 */}
        <span
          className={`absolute right-2 top-1.5 font-display text-[clamp(0.9rem,1.4vw,1.4rem)] font-black leading-none ${
            isAccent ? "text-gold/55" : "text-bone/15"
          }`}
        >
          {proj.id}
        </span>
      </div>

      {/* 제목 바 */}
      <div className="flex items-center justify-between gap-1.5 border-t border-bone/10 px-2 py-1.5">
        <span className="truncate font-body text-[9px] font-semibold text-bone/80 md:text-[11px]">
          {proj.title}
        </span>
        <span className={`shrink-0 font-mono text-[10px] leading-none ${isAccent ? "text-gold" : "text-bone/30"}`}>
          ↗
        </span>
      </div>
    </motion.div>
  );
}

export default function C11Portfolio() {
  return (
    <CaseScene
      scene="c11"
      act="CASE · 웹을 짓다"
      cluster="C · 웹을 짓다"
      num={11}
      title="개인 포트폴리오 웹사이트"
      oldTool="윅스/노션 구독 · 제작 외주"
      lead="내 작업물·이력을 담은 포트폴리오 사이트. 명령 한 줄, 배포까지."
      script={SCRIPT}
      Result={Result}
      resultTab="미리보기 — index.html"
    />
  );
}
