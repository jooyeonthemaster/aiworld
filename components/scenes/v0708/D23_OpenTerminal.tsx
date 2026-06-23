"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D23 — 터미널 여는 법 [VSCodeMock view='editor' + 하단 터미널 + ClickRing 견본]
 * 상단 메뉴 [터미널] 위치 라벨 + 하단 터미널 영역 'Ctrl + ` 로 열림' 링.
 */

// VS Code 상단 메뉴바(파일/편집/…/터미널) — '터미널' 메뉴 강조
const MENUS = ["파일", "편집", "선택", "보기", "이동", "실행", "터미널", "도움말"];

function EditorBody({ reveal }: { reveal: MotionValue<number> }) {
  const menuO = useTransform(reveal, [0.04, 0.2], [0, 1]);
  const termOpenO = useTransform(reveal, [0.5, 0.66], [0, 1]);
  // 터미널이 열리면 에디터 영역이 위로 살짝 양보(빈 화면 방지용 미세 모션)
  const editorPad = useTransform(reveal, [0.5, 0.66], [0, -6]);
  // 단축키 안내 핀: 등장 후 터미널이 열리면 사라짐
  const hintO = useTransform(reveal, [0.2, 0.34, 0.5, 0.62], [0, 1, 1, 0]);

  return (
    <div className="flex h-full flex-col bg-[#0B0A0F]">
      {/* 메뉴바 */}
      <motion.div
        style={{ opacity: menuO }}
        className="flex items-center gap-4 border-b border-bone/10 bg-[#100D13] px-4 py-1.5"
      >
        {MENUS.map((m) => (
          <span
            key={m}
            className={`font-body text-[clamp(0.72rem,0.85vw,0.92rem)] ${
              m === "터미널"
                ? "rounded-[3px] bg-gold/15 px-1.5 py-0.5 font-semibold text-gold"
                : "text-bone/45"
            }`}
          >
            {m}
          </span>
        ))}
      </motion.div>

      {/* 에디터 탭 + 코드 본문 */}
      <motion.div style={{ y: editorPad }} className="min-h-0 flex-1 overflow-hidden">
        <div className="flex border-b border-bone/10 bg-[#0C0A11]">
          <span className="flex items-center gap-2 border-r border-bone/10 bg-[#0B0A0F] px-3.5 py-2 font-mono text-[clamp(0.72rem,0.85vw,0.9rem)] text-bone/80">
            <span className="h-2 w-2 rounded-[2px] bg-[#82AAFF]/60" />
            app.js
          </span>
        </div>
        <div className="flex flex-col gap-1 px-4 py-3 font-mono text-[clamp(0.78rem,0.9vw,0.96rem)] leading-relaxed">
          <CodeLine n={1}>
            <span className="text-[#C792EA]">const</span>{" "}
            <span className="text-[#82AAFF]">app</span>{" "}
            <span className="text-bone/45">=</span>{" "}
            <span className="text-[#82AAFF]">create</span>
            <span className="text-bone/55">();</span>
          </CodeLine>
          <CodeLine n={2}>
            <span className="text-[#82AAFF]">app</span>
            <span className="text-bone/45">.</span>
            <span className="text-[#82AAFF]">listen</span>
            <span className="text-bone/55">(</span>
            <span className="text-[#F78C6C]">3000</span>
            <span className="text-bone/55">);</span>
          </CodeLine>
          <CodeLine n={3}>
            <span className="text-bone/30">{"// 이제 아래 터미널에서 실행한다"}</span>
          </CodeLine>
          <CodeLine n={4}>{null}</CodeLine>
          <CodeLine n={5}>{null}</CodeLine>
          <CodeLine n={6}>{null}</CodeLine>
        </div>
      </motion.div>

      {/* 안내 핀: 단축키 (터미널 열리기 전, 본문 하단에 살짝) */}
      <motion.div
        style={{ opacity: hintO }}
        className="pointer-events-none absolute bottom-[34%] left-1/2 -translate-x-1/2 rounded-full border border-bone/15 bg-coal/80 px-3.5 py-1.5 font-mono text-[clamp(0.7rem,0.82vw,0.9rem)] text-bone/70 backdrop-blur-sm"
      >
        <span className="text-gold">Ctrl</span>
        <span className="mx-1 text-bone/40">+</span>
        <span className="text-gold">`</span>
        <span className="ml-2 text-bone/45">(백틱)</span>
      </motion.div>

      {/* 하단 터미널 — 등장 */}
      <motion.div style={{ opacity: termOpenO }}>
        <div className="border-t border-bone/10 bg-[#08070B] px-4 py-2.5">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F]/80" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/35 md:text-[11px]">
              터미널
            </span>
          </div>
          <div className="flex flex-col gap-0.5 font-mono text-[clamp(0.8rem,0.92vw,0.98rem)] leading-relaxed">
            <div className="flex gap-2">
              <span className="text-[#27C93F]/80">PS C:\Users\you\my-ai&gt;</span>
              <span className="text-bone/45">
                (여기에 명령을 입력)
                <span className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] animate-pulse-soft bg-bone/55 align-middle" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="w-4 shrink-0 select-none text-right text-bone/20">{n}</span>
      <span className="text-bone/75">{children}</span>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.18], [0, 1]);
  const menuRingO = useTransform(reveal, [0.22, 0.4, 0.62, 0.72], [0, 1, 1, 0]);
  const termRingO = useTransform(reveal, [0.66, 0.84], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <VSCodeMock title="my-ai — VS Code" view="editor" activeIcon="explorer">
        <EditorBody reveal={reveal} />
      </VSCodeMock>

      {/* 상단 메뉴 '터미널' 위치 라벨 */}
      <motion.div style={{ opacity: menuRingO }}>
        <ClickRing x={43} y={11} label="터미널 → 새 터미널" dir="down" size={34} />
      </motion.div>

      {/* 하단 터미널 영역 — Ctrl + ` 로 열림 */}
      <motion.div style={{ opacity: termRingO }}>
        <ClickRing x={50} y={86} label="Ctrl + ` 로 열림" dir="up" />
      </motion.div>
    </motion.div>
  );
}

export default function D23OpenTerminal() {
  return (
    <TutorialScene
      scene="d23"
      act="Node.js · 엔진"
      chapter="Node.js · 엔진"
      step={23}
      total={56}
      title="터미널 여는 법"
      goal="이번 단계: 명령을 입력하는 터미널 열기"
      platform="both"
      steps={[
        "VS Code 상단 메뉴 [터미널] → [새 터미널] 클릭",
        "(또는 단축키) Ctrl + ` (백틱) 키를 누른다",
        "백틱(`) 키는 키보드 왼쪽 위, 숫자 1 왼쪽·Esc 아래에 있다",
      ]}
      success="화면 아래쪽에 검은 터미널 칸이 열린다"
      tip="Mac은 Ctrl + ` 동일(또는 메뉴 Terminal → New Terminal)"
      Mockup={Mockup}
    />
  );
}
