"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D19 — 탐색기 + 첫 파일 만들기 [VSCodeMock explorer 뷰]
 * 폴더(MY-AI) 헤더에 호버 → '새 파일' 아이콘 클릭 → index.html 입력 → 파일 등장.
 */

/** 탐색기 사이드패널 위에 떠오르는 호버 툴바(새 파일 / 새 폴더 아이콘). */
function HoverToolbar({ reveal }: { reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0.22, 0.36], [0, 1]);
  return (
    <motion.div
      style={{ opacity: o }}
      className="absolute left-[18.5%] top-[12.5%] z-20 flex items-center gap-1.5 rounded-md border border-bone/15 bg-[#15121B] px-1.5 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
    >
      {/* 새 파일 (문서 + 플러스) — 클릭 타깃 */}
      <span className="flex h-5 w-5 items-center justify-center rounded border border-gold/45 bg-gold/15">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
          <path d="M13 3v5h5" />
          <path d="M18 13v6M15 16h6" />
        </svg>
      </span>
      {/* 새 폴더 */}
      <span className="flex h-5 w-5 items-center justify-center rounded text-bone/35">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M12 11v4M10 13h4" />
        </svg>
      </span>
    </motion.div>
  );
}

/** 본문(에디터) — 파일/폴더 아이콘이 어떻게 다른지 보여주는 범례. */
function Legend({ reveal }: { reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0.06, 0.2], [0, 1]);
  const fileO = useTransform(reveal, [0.82, 0.96], [0.25, 1]);
  return (
    <div className="flex h-full flex-col">
      {/* 에디터 탭 바 (사실감 + 우측 여백 흡수) */}
      <motion.div style={{ opacity: fileO }} className="flex shrink-0 items-stretch border-b border-bone/10 bg-[#0A090E]">
        <div className="flex items-center gap-2 border-r border-bone/10 border-t-2 border-t-[#82AAFF] bg-[#0B0A0F] px-3.5 py-2">
          <span className="h-2 w-2 shrink-0 rounded-[2px] bg-[#82AAFF]/80" aria-hidden />
          <span className="font-mono text-[clamp(0.72rem,0.85vw,0.9rem)] text-bone/85">index.html</span>
          <span className="ml-1 h-1.5 w-1.5 shrink-0 rounded-full bg-bone/40" aria-hidden />
        </div>
      </motion.div>

      <div className="flex flex-1 flex-col justify-center gap-[clamp(1rem,1.8vh,1.6rem)] px-[clamp(2rem,3.4vw,3.6rem)]">
      <motion.span style={{ opacity: o }} className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 md:text-[11px]">
        아이콘 읽는 법
      </motion.span>

      {/* 폴더 = 노랑 */}
      <motion.div style={{ opacity: o }} className="flex items-center gap-3.5">
        <svg viewBox="0 0 24 24" className="h-9 w-9 shrink-0 text-gold" fill="currentColor" aria-hidden>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" opacity="0.9" />
        </svg>
        <div className="min-w-0">
          <p className="font-body text-[clamp(0.95rem,1.2vw,1.3rem)] font-semibold text-bone">폴더 = 노란색</p>
          <p className="font-body text-[clamp(0.78rem,0.95vw,1rem)] text-bone/70">물건을 담는 상자</p>
        </div>
      </motion.div>

      {/* 파일 = 파랑 */}
      <motion.div style={{ opacity: fileO }} className="flex items-center gap-3.5">
        <svg viewBox="0 0 24 24" className="h-9 w-9 shrink-0 text-[#82AAFF]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
        </svg>
        <div className="min-w-0">
          <p className="font-body text-[clamp(0.95rem,1.2vw,1.3rem)] font-semibold text-bone">파일 = 파란색</p>
          <p className="font-mono text-[clamp(0.78rem,0.95vw,1rem)] text-[#82AAFF]/90">index.html</p>
        </div>
      </motion.div>

      <p className="font-body text-[clamp(0.78rem,0.95vw,1rem)] leading-relaxed text-bone/70">
        모양이 다르니 한눈에 구분된다 — 노랑은 폴더, 파랑은 그 안의 파일.
      </p>
      </div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  const ringO = useTransform(reveal, [0.38, 0.58], [0, 1]);
  // 파일이 생기기 직전 링은 사라짐
  const ringFade = useTransform(reveal, [0.74, 0.84], [1, 0]);
  // 입력 라벨(index.html | Enter)
  const typeO = useTransform(reveal, [0.6, 0.74, 0.82, 0.9], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[900px]">
      <VSCodeMock
        title="MY-AI — VS Code"
        view="explorer"
        activeIcon="explorer"
        tree={[
          // 범례(폴더=노랑/파일=파랑)와 트리 점색을 일치시킨다:
          // 폴더 노드는 active(골드 점)로 '노랑', 파일 노드는 file(파랑 점)로 표시.
          { name: "MY-AI", depth: 0, kind: "folder", active: true },
          { name: "index.html", depth: 1, kind: "file" },
        ]}
      >
        <Legend reveal={reveal} />
      </VSCodeMock>

      <HoverToolbar reveal={reveal} />

      {/* 입력 중 라벨(파일명 타이핑) */}
      <motion.div
        style={{ opacity: typeO }}
        className="absolute left-[15%] top-[28%] z-20 flex items-center gap-2 rounded border border-[#82AAFF]/50 bg-[#0E0C14] px-2 py-1"
      >
        <span className="font-mono text-[11px] text-bone/85">index.html</span>
        <span className="h-3 w-[1px] animate-pulse-soft bg-[#82AAFF]" />
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#82AAFF]/80">Enter</span>
      </motion.div>

      {/* '새 파일' 아이콘 클릭 링 (호버 툴바 위) */}
      <motion.div style={{ opacity: ringFade }}>
        <ClickRing x={20.5} y={13} label="새 파일" dir="up" o={ringO} />
      </motion.div>
    </motion.div>
  );
}

export default function D19ExplorerFile() {
  return (
    <TutorialScene
      scene="d19"
      act="폴더 · 작업공간"
      chapter="폴더 · 작업공간"
      step={19}
      total={56}
      title="탐색기 + 첫 파일 만들기"
      goal="이번 단계: 폴더 안에 첫 파일 만들기"
      platform="both"
      steps={[
        "왼쪽 탐색기에서 폴더 이름(MY-AI) 위에 마우스를 올린다",
        "나타나는 아이콘 중 '새 파일'(문서+) 아이콘을 클릭",
        "index.html 이라고 입력하고 Enter",
        "파일 아이콘(파랑)과 폴더 아이콘(노랑)은 모양이 다르다",
      ]}
      success="탐색기에 index.html 파일이 생긴다"
      Mockup={Mockup}
    />
  );
}
