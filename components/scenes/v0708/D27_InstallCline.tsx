"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D27 — Cline 설치 [VSCodeMock extensions 뷰 견본]
 */
function ClineDetail({ reveal }: { reveal: MotionValue<number> }) {
  // 버튼 스왑은 링이 완전히 사라진 뒤(0.82~)에만 — '설치됨 + 설치 클릭 링' 동시노출 금지
  const installO = useTransform(reveal, [0.82, 0.9], [1, 0]);
  const installedO = useTransform(reveal, [0.84, 0.94], [0, 1]);
  return (
    <div className="flex h-full flex-col p-[clamp(1.3rem,2vw,2.2rem)]">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-bone/15 bg-bone/[0.04]">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-bone/70" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="7" width="16" height="11" rx="3" />
            <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <path d="M12 3.5V7" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[clamp(1.25rem,1.8vw,1.8rem)] font-bold text-bone">Cline</h3>
          <p className="mt-0.5 font-mono text-[clamp(0.74rem,0.9vw,0.95rem)] text-bone/70">cline · 자율 코딩 에이전트</p>
          <div className="mt-2 flex items-center gap-3 font-mono text-[11px] text-bone/70 md:text-[12px]">
            <span className="text-bone/70">★ 4.9</span>
            <span>1.4M 설치</span>
          </div>
        </div>
        <div className="relative shrink-0 self-start">
          <motion.span style={{ opacity: installO }} className="inline-block rounded-md bg-gold px-5 py-2.5 font-body text-[clamp(0.85rem,1vw,1.05rem)] font-bold text-ink">
            설치
          </motion.span>
          <motion.span style={{ opacity: installedO }} className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-md border border-gold/40 bg-gold/10 px-3 font-body text-[clamp(0.8rem,0.92vw,0.98rem)] font-bold text-gold">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
            설치됨
          </motion.span>
        </div>
      </div>
      <p className="mt-5 border-t border-bone/10 pt-5 font-body text-[clamp(0.88rem,1.05vw,1.15rem)] leading-relaxed text-bone/75">
        파일을 읽고, 코드를 쓰고, 터미널 명령을 직접 실행하는 — VS Code 안의 자율 AI 에이전트.
        OpenRouter·Claude·Qwen 등 원하는 모델을 연결해 쓴다.
      </p>
      {/* 하단 정보 칩 — 우하단 void 채움 */}
      <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
        {["자율 에이전트", "터미널 실행", "멀티 모델", "오픈소스"].map((t) => (
          <span key={t} className="rounded-full border border-bone/15 bg-bone/[0.03] px-3.5 py-1.5 font-mono text-[11px] text-bone/70 md:text-[12px]">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  // 링은 '설치' 버튼이 살아있는 구간(~0.8)에만 보이고, 버튼 스왑(0.82~) 전에 사라진다
  const ringO = useTransform(reveal, [0.52, 0.62, 0.78, 0.82], [0, 1, 1, 0]);
  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[1000px]">
      <VSCodeMock
        title="my-ai — VS Code"
        view="extensions"
        activeIcon="extensions"
        search="Cline"
        extResults={[
          { name: "Cline", pub: "cline", installs: "1.4M" },
          { name: "Continue", pub: "continue.dev" },
          { name: "Roo Code", pub: "roo" },
        ]}
      >
        <ClineDetail reveal={reveal} />
      </VSCodeMock>
      {/* 링 중심점 = 헤더 우상단 '설치' 버튼 정중앙. dir='left'로 라벨은 빈 본문 쪽으로 */}
      <ClickRing x={91} y={16} label="설치 클릭" dir="left" o={ringO} />
    </motion.div>
  );
}

export default function D27InstallCline() {
  return (
    <TutorialScene
      scene="d27"
      act="확장 · 도구 장착"
      chapter="확장 · 도구 장착"
      step={27}
      title="Cline 설치"
      goal="이번 단계: VS Code 안에 AI 에이전트를 심는다"
      platform="both"
      steps={[
        "왼쪽 활동바의 확장 아이콘(네모 4개)을 클릭",
        "검색창에 Cline 입력",
        "맨 위 'Cline'(만든이 cline)을 클릭",
        "오른쪽 위 '설치' 버튼을 클릭",
      ]}
      success="설치 후 왼쪽 활동바에 Cline 로봇 아이콘이 생긴다"
      tip="비슷한 이름의 짝퉁 주의 — 만든이가 'cline'이고 설치수가 가장 많은 것을 고른다"
      Mockup={Mockup}
    />
  );
}
