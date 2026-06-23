"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import OsDialog from "@/components/ui/OsDialog";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D22 — Node 설치 마법사 (PATH·Tools 체크박스) [OsDialog 견본]
 * Node.js Setup 의 'Custom Setup / Tools' 화면. 체크박스 2개:
 *  ☑ Add to npm and PATH (골드 체크 — 꼭 확인)
 *  ☐ Automatically install the necessary tools (Chocolatey…) (꺼짐 — 끄기 권장)
 */

type Box = { en: string; ko: string; checked: boolean; tag: string; tone: "good" | "off" };

const BOXES: Box[] = [
  {
    en: "Add to npm and PATH",
    ko: "node·npm 명령을 어디서든 쓸 수 있게 등록 (기본 켜짐)",
    checked: true,
    tag: "꼭 확인",
    tone: "good",
  },
  {
    en: "Automatically install the necessary tools (Chocolatey…)",
    ko: "C++ 빌드 도구 자동 설치 — 초보는 필요 없음",
    checked: false,
    tag: "끄기 권장",
    tone: "off",
  },
];

function CheckRow({ box, i, reveal }: { box: Box; i: number; reveal: MotionValue<number> }) {
  const at = 0.24 + i * 0.1;
  const o = useTransform(reveal, [at, at + 0.12], [0, 1]);
  const ringO = useTransform(reveal, [0.5, 0.74], [0, 1]);
  return (
    <motion.div
      style={{ opacity: o }}
      className={`flex items-start gap-3 rounded-md border px-3 py-2.5 ${
        box.tone === "good" ? "border-gold/30 bg-gold/[0.05]" : "border-bone/12 bg-bone/[0.02]"
      }`}
    >
      <span
        className={`relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] border ${
          box.checked ? "border-gold bg-gold" : "border-bone/35 bg-transparent"
        }`}
      >
        {box.checked ? (
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3 text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth={3.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : null}
        {/* 첫 행(PATH 체크박스) 정중앙에 자식으로 앵커링 — 드리프트 0. 라벨은 빈 공간(왼쪽)으로 */}
        {box.tone === "good" ? (
          <ClickRing x={50} y={50} label="PATH 켜짐 확인" dir="left" o={ringO} />
        ) : null}
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-mono text-[clamp(0.78rem,0.92vw,0.98rem)] font-semibold leading-snug text-bone/90">
            {box.en}
          </span>
          <span
            className="shrink-0 rounded-full border border-bone/20 bg-bone/[0.04] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/60"
          >
            {box.tag}
          </span>
        </span>
        <span className="mt-1 block text-balance-k text-[clamp(0.74rem,0.86vw,0.92rem)] leading-snug text-bone/70">
          {box.ko}
        </span>
      </span>
    </motion.div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[860px]">
      <OsDialog
        title="Node.js Setup"
        os="win"
        buttons={[
          { label: "Back" },
          { label: "Next", ring: true, ringLabel: "Next", ringDir: "up" },
          { label: "Cancel" },
        ]}
      >
        <p className="font-body text-[clamp(0.92rem,1.1vw,1.2rem)] font-semibold text-bone/85">Custom Setup</p>
        <p className="mt-1 font-body text-[clamp(0.8rem,0.95vw,1rem)] text-bone/70">
          설치할 항목을 선택하세요. 아래 두 항목만 확인하면 됩니다.
        </p>
        <div className="mt-5 flex flex-col gap-3.5">
          {BOXES.map((b, i) => (
            <CheckRow key={i} box={b} i={i} reveal={reveal} />
          ))}
        </div>
      </OsDialog>
    </motion.div>
  );
}

export default function D22NodeWizard() {
  return (
    <TutorialScene
      scene="d22"
      act="Node.js · 엔진"
      chapter="Node.js · 엔진"
      step={22}
      total={56}
      title="Node 설치 마법사"
      goal="이번 단계: Node를 설치한다"
      platform="win"
      steps={[
        "Next(다음)를 누르며 진행, 라이선스 동의 체크 → Next",
        "'Add to PATH'가 켜져 있는지 확인(기본 켜짐 — 중요)",
        "'Automatically install the necessary tools…' 체크는 끈 채로 둔다(초보)",
        "[Install] → 끝나면 [Finish]",
      ]}
      success="설치가 끝난다(검증은 다음 단계 터미널에서)"
      Mockup={Mockup}
    />
  );
}
