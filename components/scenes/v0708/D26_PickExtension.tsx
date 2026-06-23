"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D26 — 좋은 확장 고르는 법 [VSCodeMock extensions 뷰 + 판단기준 ClickRing]
 * 상세 패널의 설치 수·별점·만든이 위치에 ClickRing 라벨로 "믿을 만한지" 판단 기준을 표시.
 */

const CHECKS: { k: string; v: string; note: string }[] = [
  { k: "설치 수", v: "1.4M+", note: "수백만 = 많은 사람이 검증" },
  { k: "별점", v: "★ 4.9 (2.1K)", note: "높을수록 만족도가 높음" },
  { k: "만든이", v: "cline", note: "공식·유명 제작자" },
  { k: "최근 업데이트", v: "3일 전", note: "최근일수록 안전" },
];

function CheckCard({ c, i, reveal }: { c: (typeof CHECKS)[number]; i: number; reveal: MotionValue<number> }) {
  const at = 0.42 + i * 0.05;
  const o = useTransform(reveal, [at, at + 0.08], [0, 1]);
  return (
    <motion.div style={{ opacity: o }} className="rounded-lg border border-bone/10 bg-bone/[0.03] px-3 py-2.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/40">{c.k}</p>
      <p className="mt-1 font-display text-[clamp(0.95rem,1.25vw,1.35rem)] font-bold text-gold">{c.v}</p>
      <p className="mt-0.5 font-body text-[clamp(0.66rem,0.78vw,0.84rem)] leading-snug text-bone/70">{c.note}</p>
    </motion.div>
  );
}

function ClineDetail({ reveal }: { reveal: MotionValue<number> }) {
  const okO = useTransform(reveal, [0.78, 0.94], [0, 1]);

  return (
    <div className="flex h-full flex-col p-[clamp(1rem,1.5vw,1.7rem)]">
      {/* 헤더 — 신뢰할 확장 */}
      <div className="flex items-start gap-3.5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="7" width="16" height="11" rx="3" />
            <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <path d="M12 3.5V7" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-[clamp(1.1rem,1.55vw,1.55rem)] font-bold text-bone">Cline</h3>
            <span className="inline-flex items-center gap-1 rounded-full border border-gold/35 bg-gold/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden><path d="M12 2l2.6 6.3L21 9l-4.8 4 1.5 6.6L12 16l-5.7 3.6L7.8 13 3 9l6.4-.7z" /></svg>
              인증됨
            </span>
          </div>
          <p className="mt-0.5 font-mono text-[clamp(0.68rem,0.82vw,0.88rem)] text-bone/45">cline · 자율 코딩 에이전트</p>
        </div>
        <span className="shrink-0 rounded-md bg-gold px-4 py-2 font-body text-[clamp(0.78rem,0.92vw,0.98rem)] font-bold text-ink">설치</span>
      </div>

      {/* 판단 기준 4가지 — 라벨 표적 */}
      <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-bone/10 pt-4">
        {CHECKS.map((c, i) => (
          <CheckCard key={c.k} c={c} i={i} reveal={reveal} />
        ))}
      </div>

      {/* 판정 결과 */}
      <motion.div style={{ opacity: okO }} className="mt-3.5 flex items-center gap-2.5 rounded-lg border border-gold/30 bg-gold/[0.07] px-3.5 py-2.5">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 13l4 4L19 7" />
        </svg>
        <p className="font-body text-[clamp(0.78rem,0.95vw,1rem)] font-semibold text-bone/85">네 기준 모두 통과 — 믿고 설치해도 좋다</p>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  // 짝퉁 경고 링 — 사이드 검색결과의 둘째(가짜) 항목
  const fakeO = useTransform(reveal, [0.24, 0.4], [0, 1]);
  // 판단 기준 링 3개 (설치 수·별점·만든이) — 상세 카드 위치
  const r1 = useTransform(reveal, [0.5, 0.62], [0, 1]);
  const r2 = useTransform(reveal, [0.58, 0.7], [0, 1]);
  const r3 = useTransform(reveal, [0.66, 0.78], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[900px]">
      <VSCodeMock
        title="확장 — VS Code"
        view="extensions"
        activeIcon="extensions"
        search="Cline"
        extResults={[
          { name: "Cline", pub: "cline", installs: "1.4M", active: true },
          { name: "Clinee (짝퉁)", pub: "unknown" },
        ]}
      >
        <ClineDetail reveal={reveal} />
      </VSCodeMock>

      {/* 짝퉁 주의 — 사이드패널 둘째 카드(Clinee) 정중앙 */}
      <motion.div style={{ opacity: fakeO }}>
        <ClickRing x={21.8} y={29.3} label="짝퉁 주의" dir="down" tone="ember" size={34} />
      </motion.div>

      {/* 판단 기준 3표적 — 상세 카드 값 정중앙(설치 수·별점·만든이) */}
      <motion.div style={{ opacity: r1 }}>
        <ClickRing x={51.6} y={33.5} label="설치 수" dir="up" size={34} />
      </motion.div>
      <motion.div style={{ opacity: r2 }}>
        <ClickRing x={80.4} y={33.5} label="별점" dir="up" size={34} />
      </motion.div>
      <motion.div style={{ opacity: r3 }}>
        <ClickRing x={47.9} y={51} label="만든이" dir="left" size={34} />
      </motion.div>
    </motion.div>
  );
}

export default function D26PickExtension() {
  return (
    <TutorialScene
      scene="d26"
      act="확장 · 도구 장착"
      chapter="확장 · 도구 장착"
      step={26}
      total={56}
      title="좋은 확장 고르는 법"
      goal="이번 단계: 짝퉁 피하고 진짜 고르기"
      platform="both"
      steps={[
        "설치 수가 많은 것(보통 수백만+)을 고른다",
        "별점(★)이 높은지 본다",
        "만든이(publisher) 이름을 확인한다(공식·유명 제작자)",
        "최근 업데이트된 것이 안전하다",
      ]}
      success="이제 확장 하나를 보면 믿을 만한지 판단할 수 있다"
      Mockup={Mockup}
    />
  );
}
