"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D49 — Vercel CLI 설치 [VSCodeMock editor + terminal 견본]
 * 터미널에 `npm i -g vercel` 입력 → 설치 → `vercel --version` 으로 확인.
 */

/** 에디터 본문 — 무엇을/왜 하는지 한 화면으로 안내(클릭 타깃은 아래 터미널). */
function EditorBody({ reveal }: { reveal: MotionValue<number> }) {
  const headO = useTransform(reveal, [0.05, 0.22], [0, 1]);
  const cmdO = useTransform(reveal, [0.22, 0.4], [0, 1]);
  const verO = useTransform(reveal, [0.6, 0.78], [0, 1]);

  return (
    <div className="flex h-full flex-col gap-[clamp(0.7rem,1.4vh,1.3rem)] p-[clamp(1.1rem,2vw,2rem)]">
      <motion.div style={{ opacity: headO }} className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="currentColor" aria-hidden>
            <path d="M12 3 22 20H2z" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-display text-[clamp(1.05rem,1.5vw,1.55rem)] font-bold leading-tight text-bone">
            Vercel 배포 도구 설치
          </p>
          <p className="font-mono text-[clamp(0.68rem,0.82vw,0.88rem)] text-bone/45">
            터미널 한 줄이면 끝납니다
          </p>
        </div>
      </motion.div>

      {/* 입력할 명령 1: 설치 */}
      <motion.div
        style={{ opacity: cmdO }}
        className="rounded-lg border border-bone/12 bg-bone/[0.03] p-[clamp(0.8rem,1.3vw,1.2rem)]"
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/35 md:text-[11px]">
          1. 아래를 터미널에 그대로 입력
        </p>
        <pre className="overflow-x-auto whitespace-pre font-mono text-[clamp(0.9rem,1.25vw,1.35rem)] leading-relaxed">
          <span className="text-[#82AAFF]">npm</span>{" "}
          <span className="text-[#C3E88D]">i</span>{" "}
          <span className="text-[#C792EA]">-g</span>{" "}
          <span className="text-bone">vercel</span>
        </pre>
        <p className="mt-2 font-body text-[clamp(0.78rem,0.95vw,1rem)] text-bone/55">
          <span className="text-bone/80">-g</span> 는 &apos;컴퓨터 전체에서&apos; 쓰겠다는 뜻 (global)
        </p>
      </motion.div>

      {/* 입력할 명령 2: 확인 */}
      <motion.div
        style={{ opacity: verO }}
        className="rounded-lg border border-gold/20 bg-gold/[0.05] p-[clamp(0.8rem,1.3vw,1.2rem)]"
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-gold/65 md:text-[11px]">
          2. 설치됐는지 확인
        </p>
        <pre className="overflow-x-auto whitespace-pre font-mono text-[clamp(0.9rem,1.25vw,1.35rem)] leading-relaxed">
          <span className="text-[#82AAFF]">vercel</span>{" "}
          <span className="text-[#C792EA]">--version</span>
        </pre>
        <p className="mt-2 font-body text-[clamp(0.78rem,0.95vw,1rem)] text-bone/55">
          숫자(예: <span className="font-mono text-gold">33.0.1</span>)가 나오면 성공
        </p>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.18], [0, 1]);
  const ringO = useTransform(reveal, [0.42, 0.6, 0.74, 0.84], [0, 1, 1, 0]);
  const ring2O = useTransform(reveal, [0.78, 0.94], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[900px]">
      <VSCodeMock
        title="my-ai — VS Code"
        view="editor"
        activeIcon="explorer"
        terminalLines={[
          { p: ">", t: "npm i -g vercel" },
          { p: "", t: "added 1 package in 6s" },
          { p: ">", t: "vercel --version" },
          { p: "", t: "33.0.1", gold: true },
        ]}
      >
        <EditorBody reveal={reveal} />
      </VSCodeMock>

      {/* 첫 명령 입력 지점(터미널 첫 줄) */}
      <motion.div style={{ opacity: ringO }}>
        <ClickRing x={32} y={80} label="여기에 입력" dir="up" />
      </motion.div>
      {/* 확인 결과(골드 버전 숫자) — 링 중심을 '33.0.1' 텍스트 정중앙(x=13,y=90)에 유지.
          dir='down'으로 라벨칩을 '33.0.1' 아래 터미널 빈 패딩(상태바 위)으로 보내
          'added 1 package in 6s' 출력 줄을 덮던 회귀를 제거(어떤 터미널 텍스트도 가리지 않음). */}
      <motion.div style={{ opacity: ring2O }}>
        <ClickRing x={13} y={90} label="버전 = 성공" dir="down" />
      </motion.div>
    </motion.div>
  );
}

export default function D49VercelCLI() {
  return (
    <TutorialScene
      scene="d49"
      act="Vercel · 세상에 공개"
      chapter="Vercel · 세상에 공개"
      step={49}
      total={56}
      title="Vercel CLI 설치"
      goal="이번 단계: 터미널 배포 도구 설치"
      platform="both"
      steps={[
        "터미널에 입력: npm i -g vercel",
        "Enter — 설치가 진행된다(잠시 기다림)",
        "확인: vercel --version → 숫자가 나오면 성공",
      ]}
      success="vercel 명령을 쓸 수 있게 된다"
      warn="'권한 거부'가 나오면(Mac) 앞에 sudo 를 붙인다: sudo npm i -g vercel"
      Mockup={Mockup}
    />
  );
}
