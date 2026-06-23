"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import OsDialog from "@/components/ui/OsDialog";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D25 — Mac 분기 · Node 설치 [OsDialog(os='mac') 견본]
 * macOS .pkg 설치 마법사 한 장면:
 *   좌: 단계 목록(소개·사용권·설치 유형·설치·요약, '소개' 강조)
 *   우: 'Node.js를 설치합니다' 설명
 * 하단 버튼 [계속(ring)·뒤로 가기] → ClickRing '계속'.
 */

/** 좌측 단계 목록 한 줄 */
type Stage = { label: string; active?: boolean; done?: boolean };
const STAGES: Stage[] = [
  { label: "소개", active: true },
  { label: "사용권 계약" },
  { label: "설치 유형" },
  { label: "설치" },
  { label: "요약" },
];

function StageRow({ s, i, reveal }: { s: Stage; i: number; reveal: MotionValue<number> }) {
  const at = 0.18 + i * 0.05;
  const o = useTransform(reveal, [at, at + 0.1], [0, 1]);
  return (
    <motion.div
      style={{ opacity: o }}
      className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 ${
        s.active ? "bg-gold/12" : ""
      }`}
    >
      <span
        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
          s.active ? "border-gold bg-gold" : "border-bone/30 bg-transparent"
        }`}
      >
        {s.active ? <span className="h-1.5 w-1.5 rounded-full bg-ink" /> : null}
      </span>
      <span
        className={`text-balance-k text-[clamp(0.74rem,0.9vw,0.96rem)] leading-snug ${
          s.active ? "font-semibold text-bone" : "text-bone/45"
        }`}
      >
        {s.label}
      </span>
    </motion.div>
  );
}

/** Node.js 육각 로고 글리프 */
function NodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2.6 20.5 7.3v9.4L12 21.4 3.5 16.7V7.3L12 2.6Z" />
      <path d="M9 15.4c0 1 .8 1.6 2.1 1.6 1.5 0 2.4-.8 2.4-2.2V9" />
    </svg>
  );
}

function WizardBody({ reveal }: { reveal: MotionValue<number> }) {
  const sideO = useTransform(reveal, [0.12, 0.26], [0, 1]);
  const bodyO = useTransform(reveal, [0.28, 0.46], [0, 1]);
  const bodyX = useTransform(reveal, [0.28, 0.46], [16, 0]);

  return (
    <div className="flex min-h-[clamp(16rem,32vh,22rem)] gap-[clamp(1rem,2vw,2rem)]">
      {/* 좌 — 단계 목록 */}
      <motion.div
        style={{ opacity: sideO }}
        className="flex w-[clamp(8.5rem,14vw,11rem)] shrink-0 flex-col gap-1 border-r border-bone/10 pr-[clamp(0.8rem,1.6vw,1.6rem)]"
      >
        <span className="mb-1.5 px-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/35 md:text-[10px]">
          설치 단계
        </span>
        {STAGES.map((s, i) => (
          <StageRow key={i} s={s} i={i} reveal={reveal} />
        ))}
      </motion.div>

      {/* 우 — 'Node.js를 설치합니다' 설명 */}
      <motion.div style={{ opacity: bodyO, x: bodyX }} className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#27C93F]/35 bg-[#27C93F]/10 text-[#5CE082]">
            <NodeIcon className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-[clamp(1.05rem,1.5vw,1.55rem)] font-bold leading-tight text-bone">
              Node.js를 설치합니다
            </h3>
            <p className="mt-0.5 font-mono text-[clamp(0.68rem,0.82vw,0.88rem)] text-bone/45">
              Node.js v20 LTS · macOS .pkg
            </p>
          </div>
        </div>

        <p className="mt-4 font-body text-[clamp(0.82rem,1vw,1.08rem)] leading-relaxed text-bone/65">
          이 설치 관리자가 Node.js와 npm을 컴퓨터에 설치하도록 안내합니다.
          계속하려면 <span className="font-semibold text-bone/90">[계속]</span>을 클릭하세요.
        </p>

        <div className="mt-auto flex items-center gap-2 rounded-lg border border-bone/10 bg-bone/[0.03] px-3.5 py-2.5">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-bone/45" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 16v-4" />
            <circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" />
          </svg>
          <span className="text-balance-k font-body text-[clamp(0.74rem,0.88vw,0.94rem)] leading-snug text-bone/55">
            설치 막바지에 Mac 로그인 <span className="whitespace-nowrap">암호 입력</span>을 한 번 요청합니다.
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.16], [0, 1]);
  const ringO = useTransform(reveal, [0.62, 0.84], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[840px]">
      <OsDialog
        title=""
        os="mac"
        buttons={[{ label: "뒤로 가기" }, { label: "계속", ring: true }]}
      >
        <WizardBody reveal={reveal} />
      </OsDialog>
      {/* '계속' = 2개 버튼 중 우측 골드 버튼 정중앙 (푸터 안에 링 전체가 들어오게) */}
      <motion.div style={{ opacity: ringO }}>
        <ClickRing x={91.2} y={92.5} label="계속" dir="up" />
      </motion.div>
    </motion.div>
  );
}

export default function D25NodeMac() {
  return (
    <TutorialScene
      scene="d25"
      act="Node.js · 엔진"
      chapter="Node.js · 엔진"
      step={25}
      total={56}
      title="Mac 분기 — Node 설치"
      goal="이번 단계: Mac에서 Node 설치(.pkg)"
      platform="mac"
      steps={[
        "nodejs.org에서 'LTS' 다운로드(macOS .pkg 자동)",
        "받은 .pkg 파일을 더블클릭 → 계속(Continue) → 동의 → 설치(Install)",
        "암호 입력 후 설치 완료",
        "터미널에서 node -v 로 검증(동일)",
      ]}
      success="v20.x.x 가 나오면 성공"
      Mockup={Mockup}
    />
  );
}
