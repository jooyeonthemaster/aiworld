"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D40 — 성공 확인 [VSCodeMock explorer 뷰]
 * 탐색기에 hello.txt 가 새로 등장 → 클릭해서 열기 → 편집기에 '첫 성공' 글자 확인.
 */

/** 본문(편집기) — 열린 hello.txt 에 '첫 성공' 글자가 떠오르고 성공 글로우. */
function Editor({ reveal }: { reveal: MotionValue<number> }) {
  // 파일을 열기 전엔 빈 편집기, 클릭 후 탭+내용 등장
  const tabO = useTransform(reveal, [0.6, 0.74], [0, 1]);
  const lineO = useTransform(reveal, [0.66, 0.8], [0, 1]);
  const wordO = useTransform(reveal, [0.78, 0.92], [0, 1]);
  const wordY = useTransform(reveal, [0.78, 0.92], [10, 0]);
  const glowO = useTransform(reveal, [0.82, 0.98], [0, 1]);

  return (
    <div className="relative flex h-full flex-col">
      {/* 성공 글로우(편집기 배경) */}
      <motion.div
        style={{ opacity: glowO }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.14] blur-3xl"
        aria-hidden
      />

      {/* 편집기 탭(파일이 열렸음을 표시) */}
      <motion.div
        style={{ opacity: tabO }}
        className="flex shrink-0 items-center gap-2 border-b border-bone/10 bg-[#0C0A11] px-3.5 py-2"
      >
        <span className="h-2 w-2 rounded-[2px] bg-[#82AAFF]/70" />
        <span className="font-mono text-[clamp(0.72rem,0.85vw,0.92rem)] text-bone/80">hello.txt</span>
        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-bone/50" />
      </motion.div>

      {/* 편집기 본문 */}
      <div className="relative flex min-h-0 flex-1 flex-col justify-center px-[clamp(1.6rem,3vw,3.4rem)]">
        <motion.div style={{ opacity: lineO }} className="flex items-baseline gap-[clamp(0.9rem,1.6vw,1.8rem)]">
          <span className="select-none font-mono text-[clamp(0.85rem,1vw,1.15rem)] tabular-nums text-bone/25">1</span>
          <motion.span
            style={{ opacity: wordO, y: wordY }}
            className="font-display font-black leading-none text-bone text-[clamp(2.2rem,4.6vw,4.6rem)] [text-shadow:0_0_38px_rgba(232,181,75,0.45)]"
          >
            <span className="text-gold">첫</span> 성공
          </motion.span>
        </motion.div>

        <motion.div
          style={{ opacity: wordO }}
          className="mt-[clamp(1rem,2vh,1.6rem)] flex items-baseline gap-[clamp(0.9rem,1.6vw,1.8rem)]"
        >
          {/* 빈 라인넘버 거터(폭 맞춤) — 본문이 아니라 안내 주석임을 구분 */}
          <span className="select-none font-mono text-[clamp(0.85rem,1vw,1.15rem)] tabular-nums text-transparent" aria-hidden>1</span>
          <p className="font-body text-[clamp(0.82rem,1vw,1.1rem)] leading-relaxed text-bone/70">
            AI가 직접 타이핑해 만든 진짜 파일 — 네 컴퓨터에 저장됨.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.18], [0, 1]);
  // 새로 생긴 hello.txt 강조(살짝 점멸 후 안착)
  const newBadgeO = useTransform(reveal, [0.14, 0.28, 0.66, 0.78], [0, 1, 1, 0]);
  // hello.txt 클릭 링: 등장 → 파일 열린 뒤 사라짐
  const ringO = useTransform(reveal, [0.3, 0.46], [0, 1]);
  const ringFade = useTransform(reveal, [0.58, 0.68], [1, 0]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[900px]">
      <VSCodeMock
        title="MY-AI — VS Code"
        view="explorer"
        activeIcon="explorer"
        tree={[
          { name: "MY-AI", depth: 0, kind: "folder" },
          { name: "hello.txt", depth: 1, kind: "file", active: true },
          { name: "index.html", depth: 1, kind: "file" },
        ]}
      >
        <Editor reveal={reveal} />
      </VSCodeMock>

      {/* hello.txt 옆 'NEW' 배지(방금 생김) */}
      <motion.div
        style={{ opacity: newBadgeO }}
        className="absolute left-[19.5%] top-[27.5%] z-20 rounded-[3px] border border-gold/40 bg-gold/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-gold"
      >
        new
      </motion.div>

      {/* hello.txt 클릭 링(탐색기 두 번째 줄) */}
      <motion.div style={{ opacity: ringFade }}>
        <ClickRing x={15} y={19} label="이 파일 클릭" dir="right" o={ringO} />
      </motion.div>
    </motion.div>
  );
}

export default function D40Success() {
  return (
    <TutorialScene
      scene="d40"
      act="첫 작동 · 테스트"
      chapter="첫 작동 · 테스트"
      step={40}
      total={56}
      title="성공 확인"
      goal="이번 단계: 첫 결과물 확인"
      platform="both"
      steps={[
        "왼쪽 탐색기에 hello.txt 가 새로 생긴 것을 확인",
        "그 파일을 한 번 클릭(또는 더블클릭)해 연다",
        "편집기에 '첫 성공' 글자가 보이면 — 끝!",
      ]}
      success="🎉 AI가 네 컴퓨터에 직접 파일을 만들었다 — 개발환경이 살아있다"
      Mockup={Mockup}
    />
  );
}
