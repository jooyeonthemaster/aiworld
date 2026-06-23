"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C12 — 회사 광고 랜딩페이지 [CASE 견본 / REFERENCE]
 * Result: 미니 브라우저 + 렌더된 랜딩페이지(히어로/강점3/문의폼) 가 reveal 로 차오름.
 */

const SCRIPT: ClineScript = {
  project: "neander-campaign",
  userPrompt:
    "우리 회사 광고용 랜딩페이지 만들어줘. 히어로 + 강점 3개 + 문의폼, 골드 톤으로. 다 만들면 바로 배포까지.",
  steps: [
    { kind: "think", label: "구조 기획 — 히어로·강점·CTA·폼", detail: "1-page conversion layout" },
    { kind: "create", label: "index.html 생성", detail: "+ Tailwind CDN, 반응형" },
    { kind: "edit", label: "브랜드 골드 테마 적용", detail: "hero gradient · CTA" },
    { kind: "create", label: "문의폼 연결 (Formspree)", detail: "name · email · message" },
    { kind: "run", label: "빌드 & 배포", detail: "vercel --prod" },
  ],
  terminal: [
    { p: "$", t: "vercel --prod" },
    { p: ">", t: "Building… 12 files · optimizing" },
    { p: ">", t: "✔ 배포 완료 — neander-campaign.vercel.app", gold: true },
  ],
};

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.2], [0, 1]);
  const heroO = useTransform(reveal, [0.15, 0.45], [0, 1]);
  const heroY = useTransform(reveal, [0.15, 0.45], [14, 0]);
  const featO = useTransform(reveal, [0.4, 0.7], [0, 1]);
  const featY = useTransform(reveal, [0.4, 0.7], [14, 0]);
  const formO = useTransform(reveal, [0.65, 0.95], [0, 1]);
  const formY = useTransform(reveal, [0.65, 0.95], [14, 0]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 미니 브라우저 주소창 */}
      <div className="flex items-center gap-2 rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-bone/20" />
        <div className="flex flex-1 items-center gap-2 rounded-md bg-bone/[0.05] px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F]/70" />
          <span className="font-mono text-[10px] text-bone/55 md:text-[11px]">neander-campaign.vercel.app</span>
        </div>
      </div>

      {/* 렌더된 랜딩페이지 */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0E0C12]">
        {/* 히어로 */}
        <motion.div
          style={{ opacity: heroO, y: heroY }}
          className="relative flex flex-col items-center gap-2 px-4 py-5 text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(70% 100% at 50% 0%, rgba(232,181,75,0.16), transparent 70%)" }}
          />
          <span className="relative font-mono text-[8px] uppercase tracking-[0.3em] text-gold/70 md:text-[9px]">NEANDER · AX STUDIO</span>
          <p className="relative font-display font-black leading-tight text-bone text-[clamp(0.95rem,1.5vw,1.5rem)]">
            AI로, 비즈니스를 다시 짓다
          </p>
          <p className="relative max-w-[80%] font-body text-[10px] leading-snug text-bone/55 md:text-[11px]">
            마케팅부터 운영까지 — 사람이 아니라 환경으로 키우는 회사
          </p>
          <span className="relative mt-1 rounded-full bg-gradient-to-r from-gold to-gold-bright px-4 py-1.5 font-body text-[10px] font-bold text-ink md:text-[11px]">
            무료 상담 신청 →
          </span>
        </motion.div>

        {/* 강점 3개 */}
        <motion.div style={{ opacity: featO, y: featY }} className="grid grid-cols-3 gap-2 px-3.5">
          {["빠른 실행", "AI 자동화", "검증된 성과"].map((f, i) => (
            <div key={f} className="rounded-lg border border-bone/10 bg-bone/[0.03] px-2 py-2.5 text-center">
              <span className="font-mono text-[10px] text-gold md:text-[11px]">0{i + 1}</span>
              <p className="mt-1 font-body text-[9px] font-semibold text-bone/80 md:text-[11px]">{f}</p>
            </div>
          ))}
        </motion.div>

        {/* 문의폼 */}
        <motion.div style={{ opacity: formO, y: formY }} className="mt-auto px-3.5 pb-3.5 pt-3">
          <div className="rounded-lg border border-gold/25 bg-gold/[0.05] p-2.5">
            <p className="mb-1.5 font-body text-[9px] font-semibold text-bone/75 md:text-[11px]">문의하기</p>
            <div className="flex flex-col gap-1.5">
              <span className="h-4 rounded bg-bone/[0.06]" />
              <span className="h-4 rounded bg-bone/[0.06]" />
              <span className="self-end rounded bg-gold px-3 py-1 font-body text-[9px] font-bold text-ink md:text-[10px]">보내기</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function C12Landing() {
  return (
    <CaseScene
      scene="c12"
      act="CASE · 웹을 짓다"
      cluster="C · 웹을 짓다"
      num={12}
      title="회사 광고 랜딩페이지"
      oldTool="웹 외주 300만원 · 윅스/노션 구독"
      lead="회사 소개·강점·문의폼까지 한 페이지. 명령 한 줄로 만들고, 그 자리에서 고치고, 바로 배포한다."
      script={SCRIPT}
      Result={Result}
      resultTab="미리보기 — index.html"
    />
  );
}
