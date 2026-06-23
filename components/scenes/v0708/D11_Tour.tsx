"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D11 — 첫 화면 둘러보기 [VSCodeMock explorer 뷰 + 영역 이름표 ClickRing 견본]
 * 클릭 타깃이 아니라 "영역 이름표"로 ClickRing(label)을 다섯 군데에 붙여
 * 완전 초심자가 VS Code의 다섯 영역을 한 화면으로 익히게 한다.
 */

const TREE = [{ name: "(열린 폴더 없음)", depth: 0, kind: "folder" as const }];

// 패널(터미널) 영역을 실제로 렌더해 ④ 링이 가리킬 시각적 타깃을 만든다.
const TERMINAL = [{ p: "PS C:\\my-ai>", t: "터미널이 여기에 열립니다" }];

/** 편집기 본문 — 폴더가 없을 때의 빈 안내(영역이 무엇인지 보여주는 무대). */
function EditorBody() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
      <svg
        viewBox="0 0 24 24"
        className="h-12 w-12 text-bone/15"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
      </svg>
      <p className="font-display text-[clamp(1rem,1.5vw,1.5rem)] font-bold text-bone/45">편집기 — 코드를 쓰는 곳</p>
      <p className="font-body text-[clamp(0.8rem,0.95vw,1rem)] text-bone/30">폴더를 열면 여기에 파일 내용이 펼쳐진다</p>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  // 창 등장
  const winO = useTransform(reveal, [0, 0.2], [0, 1]);
  // 다섯 이름표 순차 등장 (좌→우, 위→아래 순서로 자연스럽게)
  const r1 = useTransform(reveal, [0.24, 0.36], [0, 1]); // 활동바
  const r2 = useTransform(reveal, [0.36, 0.48], [0, 1]); // 사이드바
  const r3 = useTransform(reveal, [0.48, 0.6], [0, 1]); // 편집기
  const r4 = useTransform(reveal, [0.6, 0.72], [0, 1]); // 패널(터미널)
  const r5 = useTransform(reveal, [0.72, 0.86], [0, 1]); // 상태바

  return (
    <motion.div style={{ opacity: winO }} className="relative w-full max-w-[1000px]">
      <VSCodeMock title="VS Code — 시작하기" view="explorer" activeIcon="explorer" tree={TREE} terminalLines={TERMINAL}>
        <EditorBody />
      </VSCodeMock>

      {/* ① 활동바 — 왼쪽 세로 띠(아이콘 모음). 아이콘과 안 겹치는 빈 구간으로 내림 + 라벨은 창 안쪽(우측). */}
      <motion.div style={{ opacity: r1 }}>
        <ClickRing x={3.2} y={52} label="활동바" dir="right" tone="gold" size={32} />
      </motion.div>

      {/* ② 사이드바 — 활동바 옆 넓은 칸(탐색기) */}
      <motion.div style={{ opacity: r2 }}>
        <ClickRing x={14} y={58} label="사이드바" dir="down" tone="gold" />
      </motion.div>

      {/* ③ 편집기 — 가운데 코드 영역 */}
      <motion.div style={{ opacity: r3 }}>
        <ClickRing x={58} y={32} label="편집기" dir="up" tone="gold" />
      </motion.div>

      {/* ④ 패널(터미널) — 편집기 아래 실제 터미널 띠 위에 얹음 */}
      <motion.div style={{ opacity: r4 }}>
        <ClickRing x={62} y={90} label="패널(터미널)" dir="up" tone="gold" />
      </motion.div>

      {/* ⑤ 상태바 — 맨 아래 줄 */}
      <motion.div style={{ opacity: r5 }}>
        <ClickRing x={50} y={97} label="상태바" dir="left" tone="gold" />
      </motion.div>
    </motion.div>
  );
}

export default function D11Tour() {
  return (
    <TutorialScene
      scene="d11"
      act="첫 화면 · 한국어"
      chapter="첫 화면 · 한국어"
      step={11}
      total={56}
      title="첫 화면 둘러보기"
      goal="이번 단계: VS Code 화면의 다섯 영역 이름 익히기"
      platform="both"
      steps={[
        "왼쪽 세로 띠 = 활동바(아이콘 모음)",
        "그 옆 넓은 칸 = 사이드바(파일·확장 목록)",
        "가운데 = 편집기(코드 쓰는 곳)",
        "아래 = 패널(터미널이 여기 나옴)",
        "맨 아래 줄 = 상태바",
      ]}
      success="각 영역이 뭘 하는지 감이 온다"
      Mockup={Mockup}
    />
  );
}
