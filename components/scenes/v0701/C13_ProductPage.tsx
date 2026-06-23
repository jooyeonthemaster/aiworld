"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C13 — 제품 원페이지 + 신청폼 [CASE]
 * Result: 미니 브라우저 + 제품 히어로 → 가격표 3플랜(가운데 골드 추천) →
 * 사전예약 폼(입력+버튼, Sheets 연동 배지) 가 reveal 로 차오름.
 * C12(랜딩)와 확연히 구별: 가격표 3열 비교가 패널의 주인공.
 */

const SCRIPT: ClineScript = {
  project: "product-launch",
  userPrompt:
    "신제품 사전예약 페이지 만들어줘. 특징·가격·신청폼, 구글시트 연동.",
  steps: [
    { kind: "create", label: "index.html 생성", detail: "히어로 · 특징 · 가격 · 폼" },
    { kind: "edit", label: "가격표 3플랜 구성", detail: "Basic · Pro(추천) · Team" },
    { kind: "create", label: "폼 → Google Sheets 연동", detail: "Apps Script 웹훅" },
    { kind: "run", label: "배포", detail: "vercel --prod" },
  ],
};

const PLANS: { name: string; price: string; per: string; feats: string[]; hot?: boolean }[] = [
  { name: "Basic", price: "₩9k", per: "/월", feats: ["1인", "기본 기능"] },
  { name: "Pro", price: "₩29k", per: "/월", feats: ["5인", "우선 지원", "사전예약가"], hot: true },
  { name: "Team", price: "₩79k", per: "/월", feats: ["무제한", "전담 매니저"] },
];

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const heroO = useTransform(reveal, [0.12, 0.36], [0, 1]);
  const heroY = useTransform(reveal, [0.12, 0.36], [14, 0]);
  const planO = useTransform(reveal, [0.34, 0.64], [0, 1]);
  const planY = useTransform(reveal, [0.34, 0.64], [16, 0]);
  const hotScale = useTransform(reveal, [0.46, 0.7], [0.96, 1]);
  const formO = useTransform(reveal, [0.64, 0.94], [0, 1]);
  const formY = useTransform(reveal, [0.64, 0.94], [14, 0]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 미니 브라우저 주소창 */}
      <div className="flex items-center gap-2 rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-bone/20" />
        <div className="flex flex-1 items-center gap-2 rounded-md bg-bone/[0.05] px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F]/70" />
          <span className="font-mono text-[10px] text-bone/55 md:text-[11px]">product-launch.vercel.app</span>
        </div>
      </div>

      {/* 렌더된 제품 페이지 */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0E0C12]">
        {/* 제품 히어로 */}
        <motion.div
          style={{ opacity: heroO, y: heroY }}
          className="relative flex flex-col items-center gap-1.5 px-4 py-4 text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(70% 100% at 50% 0%, rgba(232,181,75,0.14), transparent 70%)" }}
          />
          <span className="relative rounded-full border border-gold/30 bg-gold/[0.08] px-2.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.28em] text-gold/80 md:text-[9px]">
            COMING SOON · 사전예약
          </span>
          <p className="relative font-display font-black leading-tight text-bone text-[clamp(0.95rem,1.5vw,1.5rem)]">
            새로운 기준, 지금 예약하세요
          </p>
        </motion.div>

        {/* 가격표 3플랜 — 가운데 골드 추천 */}
        <motion.div
          style={{ opacity: planO, y: planY }}
          className="grid grid-cols-3 items-stretch gap-2 px-3.5"
        >
          {PLANS.map((plan) =>
            plan.hot ? (
              <motion.div
                key={plan.name}
                style={{ scale: hotScale }}
                className="relative flex flex-col rounded-lg border border-gold/45 bg-gold/[0.07] px-2 py-2.5 shadow-[0_0_24px_-6px_rgba(232,181,75,0.5)]"
              >
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-2 py-[2px] font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-ink md:text-[8px]">
                  추천
                </span>
                <p className="font-body text-[9px] font-semibold text-gold md:text-[11px]">{plan.name}</p>
                <p className="mt-0.5 font-display font-black text-bone text-[clamp(0.85rem,1.2vw,1.2rem)]">
                  {plan.price}
                  <span className="font-body text-[8px] font-normal text-bone/55 md:text-[9px]">{plan.per}</span>
                </p>
                <ul className="mt-1.5 flex flex-col gap-1">
                  {plan.feats.map((f) => (
                    <li key={f} className="flex items-center gap-1 font-body text-[8px] text-bone/80 md:text-[9px]">
                      <span className="text-gold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <div
                key={plan.name}
                className="flex flex-col rounded-lg border border-bone/10 bg-bone/[0.03] px-2 py-2.5"
              >
                <p className="font-body text-[9px] font-semibold text-bone/75 md:text-[11px]">{plan.name}</p>
                <p className="mt-0.5 font-display font-black text-bone/85 text-[clamp(0.8rem,1.1vw,1.1rem)]">
                  {plan.price}
                  <span className="font-body text-[8px] font-normal text-bone/45 md:text-[9px]">{plan.per}</span>
                </p>
                <ul className="mt-1.5 flex flex-col gap-1">
                  {plan.feats.map((f) => (
                    <li key={f} className="flex items-center gap-1 font-body text-[8px] text-bone/65 md:text-[9px]">
                      <span className="text-bone/35">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </motion.div>

        {/* 사전예약 폼 + Sheets 연동 배지 */}
        <motion.div style={{ opacity: formO, y: formY }} className="mt-auto px-3.5 pb-3.5 pt-3">
          <div className="rounded-lg border border-gold/25 bg-gold/[0.05] p-2.5">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="font-body text-[9px] font-semibold text-bone/80 md:text-[11px]">사전예약 신청</p>
              <span className="flex items-center gap-1 rounded-full bg-[#C3E88D]/[0.12] px-1.5 py-[2px] font-mono text-[7px] text-[#C3E88D] md:text-[8px]">
                <span className="h-1 w-1 rounded-full bg-[#C3E88D]" />
                Sheets 자동수집
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex-1 rounded bg-bone/[0.06] px-2 py-1.5 font-mono text-[8px] text-bone/45 md:text-[9px]">이름</span>
              <span className="flex-[1.4] rounded bg-bone/[0.06] px-2 py-1.5 font-mono text-[8px] text-bone/45 md:text-[9px]">you@email.com</span>
              <span className="rounded bg-gold px-3 py-1.5 font-body text-[9px] font-bold text-ink md:text-[10px]">예약</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function C13ProductPage() {
  return (
    <CaseScene
      scene="c13"
      act="CASE · 웹을 짓다"
      cluster="C · 웹을 짓다"
      num={13}
      title="제품 원페이지 + 신청폼"
      oldTool="랜딩 빌더 구독 · 폼 SaaS"
      lead="신제품 소개+사전신청 폼. 제출되면 시트로 자동 수집."
      script={SCRIPT}
      Result={Result}
      resultTab="미리보기 — index.html"
    />
  );
}
