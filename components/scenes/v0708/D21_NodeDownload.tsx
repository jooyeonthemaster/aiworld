"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import BrowserMock from "@/components/ui/BrowserMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D21 — Node.js 다운로드 (LTS) [BrowserMock + ClickRing]
 * 본문: Node.js 로고/제목 + 다운로드 버튼 2개(골드 'LTS · 권장' / 회색 'Current').
 * reveal stagger: 화면 → 버튼 → ClickRing(LTS) → 다운로드 진행(성공).
 */
function NodeLogo() {
  return (
    <span className="flex h-[clamp(2.6rem,3.6vw,3.4rem)] w-[clamp(2.6rem,3.6vw,3.4rem)] items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-full w-full text-[#27C93F]" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 2.5 21 7.5v9L12 21.5 3 16.5v-9z" opacity="0.9" />
        <path d="M9 15.5c0 1 .8 1.6 2 1.6s2-.5 2-1.6V9" />
      </svg>
    </span>
  );
}

function DownloadBtn({
  primary,
  badge,
  ver,
  label,
}: {
  primary?: boolean;
  badge: string;
  ver: string;
  label: string;
}) {
  return (
    <span
      className={`flex w-[clamp(8.5rem,12vw,11rem)] flex-col items-center gap-1 rounded-xl px-4 py-[clamp(0.9rem,1.5vw,1.3rem)] text-center ${
        primary
          ? "bg-gradient-to-br from-gold to-gold-bright text-ink shadow-[0_0_40px_rgba(232,181,75,0.4)]"
          : "border border-bone/15 bg-bone/[0.04] text-bone/70"
      }`}
    >
      <span className={`font-mono text-[10px] uppercase tracking-[0.16em] md:text-[11px] ${primary ? "text-ink/70" : "text-bone/40"}`}>
        {badge}
      </span>
      <span className="font-display text-[clamp(1.05rem,1.5vw,1.5rem)] font-black leading-none">{ver}</span>
      <span className={`font-body text-[clamp(0.78rem,0.95vw,1rem)] font-bold ${primary ? "text-ink" : "text-bone/65"}`}>
        {label}
      </span>
    </span>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.22], [0, 1]);
  const btnO = useTransform(reveal, [0.24, 0.5], [0, 1]);
  const ringO = useTransform(reveal, [0.52, 0.76], [0, 1]);
  const dlO = useTransform(reveal, [0.8, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <BrowserMock url="nodejs.org">
        <div className="flex flex-col items-center gap-4 px-6 py-[clamp(2rem,5vh,4rem)] text-center">
          <div className="flex items-center gap-3">
            <NodeLogo />
            <span className="font-display font-black leading-none text-bone text-[clamp(1.6rem,2.8vw,2.8rem)]">
              Node<span className="text-[#27C93F]">.js</span>
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70 md:text-[11px]">
            DOWNLOAD NODE.JS
          </p>
          <p className="max-w-[80%] font-body text-[clamp(0.85rem,1vw,1.05rem)] text-bone/70">
            크로스 플랫폼 JavaScript 런타임 · 무료 · 오픈소스
          </p>

          {/* 다운로드 버튼 2개 나란히 */}
          <motion.div style={{ opacity: btnO }} className="relative mt-3 flex items-end justify-center gap-4">
            <DownloadBtn primary badge="LTS · 권장" ver="v22.x" label="안정 버전" />
            <DownloadBtn badge="Current" ver="v24.x" label="실험 버전" />
          </motion.div>

          {/* 다운로드 진행 표시(브라우저 하단) */}
          <motion.div style={{ opacity: dlO }} className="mt-5 w-[78%] rounded-lg border border-bone/12 bg-bone/[0.04] px-3 py-2">
            <div className="flex items-center justify-between font-mono text-[10px] text-bone/55 md:text-[11px]">
              <span className="truncate">node-v22.x.x-x64.msi</span>
              <span className="text-gold">받는 중…</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-bone/10">
              <div className="h-full w-2/3 rounded-full bg-gold" />
            </div>
          </motion.div>
        </div>
      </BrowserMock>
      {/* 클릭 타깃 = 왼쪽 골드 'LTS' 버튼 본체 (v22.x) */}
      <ClickRing x={42} y={71} label="여기 클릭" dir="down" o={ringO} />
    </motion.div>
  );
}

export default function D21NodeDownload() {
  return (
    <TutorialScene
      scene="d21"
      act="Node.js · 엔진"
      chapter="Node.js · 엔진"
      step={21}
      total={56}
      title="Node.js 다운로드 (LTS)"
      goal="이번 단계: 공식 사이트에서 Node.js 받기"
      platform="both"
      steps={[
        "주소창에 nodejs.org 입력 후 Enter",
        "왼쪽 'LTS · 권장' 버튼을 클릭(최신 말고 LTS = 안정 버전)",
        "받은 설치 파일을 실행",
      ]}
      success="설치 마법사가 열린다"
      tip="버튼이 두 개면 왼쪽 'LTS'(권장)를 고른다 — 오른쪽 'Current'는 실험 버전"
      Mockup={Mockup}
    />
  );
}
