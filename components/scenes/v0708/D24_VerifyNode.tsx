"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D24 — node -v / npm -v 검증 [VSCodeMock editor + 터미널 + ClickRing 견본 수준]
 * Mockup(p,reveal): 화면(editor+터미널) → 터미널 출력 점등 → 성공 ClickRing 순으로 stagger.
 */

/** 코드 라인 한 줄(신택스 컬러 토큰 — 키워드/함수/문자열/숫자). */
type Tok = { t: string; c?: "kw" | "fn" | "str" | "num" | "dim" };
const COLOR: Record<NonNullable<Tok["c"]>, string> = {
  kw: "text-[#C792EA]",
  fn: "text-[#82AAFF]",
  str: "text-[#C3E88D]",
  num: "text-[#F78C6C]",
  dim: "text-bone/55",
};

const CODE: Tok[][] = [
  [{ t: "// 첫 파일 — 환경이 준비됐는지 확인용", c: "dim" }],
  [{ t: "const", c: "kw" }, { t: " greet ", c: "fn" }, { t: "= ", c: "dim" }, { t: "() => {", c: "dim" }],
  [{ t: "  console.", c: "dim" }, { t: "log", c: "fn" }, { t: "(", c: "dim" }, { t: '"준비 끝!"', c: "str" }, { t: ")", c: "dim" }],
  [{ t: "}", c: "dim" }],
  [{ t: "" }],
  [{ t: "greet", c: "fn" }, { t: "()", c: "dim" }],
];

/** 에디터 본문 — VSCodeMock children 슬롯(view='editor'). */
function EditorBody({ reveal }: { reveal: MotionValue<number> }) {
  const codeO = useTransform(reveal, [0.04, 0.22], [0, 1]);
  return (
    <div className="flex h-full flex-col">
      {/* 탭바 */}
      <div className="flex items-center gap-0 border-b border-bone/10 bg-[#0A090E] px-1">
        <span className="flex items-center gap-2 border-r border-bone/10 border-t-2 border-t-gold bg-[#0B0A0F] px-3.5 py-2 font-mono text-[11px] text-bone/80 md:text-xs">
          <span className="h-2 w-2 rounded-[2px] bg-[#82AAFF]/60" />
          index.js
        </span>
      </div>
      {/* 코드 — flex-1 로 본문 전체를 채우고 안내문은 바닥에 고정해 데드스페이스 제거 */}
      <motion.div style={{ opacity: codeO }} className="flex flex-1 flex-col px-4 py-4">
        <div className="flex-1">
          {CODE.map((line, li) => (
            <div key={li} className="flex gap-4 font-mono text-[clamp(0.82rem,0.94vw,1rem)] leading-[1.75]">
              <span className="w-4 shrink-0 select-none text-right text-bone/25">{li + 1}</span>
              <span className="min-w-0">
                {line.map((tk, ti) => (
                  <span key={ti} className={tk.c ? COLOR[tk.c] : "text-bone/70"}>
                    {tk.t}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
        {/* 바닥 고정: 안내문 + 사실적 상태 행(문제 0) */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-bone/10 pt-3">
          <p className="font-body text-[clamp(0.8rem,0.92vw,1rem)] text-bone/70">
            {/* 안내: 아래 터미널에서 버전을 확인 */}
            {"↓"} 아래 터미널에 명령을 입력해 보세요
          </p>
          <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[clamp(0.66rem,0.78vw,0.82rem)] text-bone/45">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#C3E88D]/70" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
            문제 0
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  // 화면(에디터+터미널) 등장 → (EditorBody 내부에서 코드 점등) → 성공 ClickRing 순 stagger.
  const o = useTransform(reveal, [0, 0.18], [0, 1]);
  // 성공 ClickRing은 버전 숫자 위로 마지막에 등장.
  const ringO = useTransform(reveal, [0.6, 0.82], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <VSCodeMock
        title="my-ai — VS Code"
        view="editor"
        activeIcon="explorer"
        terminalLines={[
          { p: ">", t: "node -v" },
          { p: "", t: "v20.11.1", gold: true },
          { p: ">", t: "npm -v" },
          { p: "", t: "10.2.4", gold: true },
        ]}
      >
        <EditorBody reveal={reveal} />
      </VSCodeMock>

      {/* 성공 강조: 터미널 첫 줄 버전 숫자 v20.11.1 정중앙. 라벨은 우측 빈 공간(dir="right")으로 뻗어 명령어를 가리지 않음 */}
      <ClickRing x={13} y={82.5} label="v20... 나오면 성공" dir="right" tone="gold" o={ringO} />
    </motion.div>
  );
}

export default function D24VerifyNode() {
  return (
    <TutorialScene
      scene="d24"
      act="Node.js · 엔진"
      chapter="Node.js · 엔진"
      step={24}
      total={56}
      title="node -v 검증"
      goal="이번 단계: Node가 잘 깔렸는지 확인"
      platform="both"
      steps={[
        "터미널에 node -v 입력하고 Enter",
        "v20.x.x 같은 숫자가 나오면 성공",
        "npm -v 도 입력 → 10.x.x 가 나오면 완벽",
      ]}
      success="v20.x.x / 10.x.x 처럼 버전 숫자가 보인다"
      warn="'... 인식할 수 없는 명령' 이 나오면: VS Code를 완전히 껐다 켠다 → 그래도면 PC 재부팅(PATH 적용)"
      Mockup={Mockup}
    />
  );
}
