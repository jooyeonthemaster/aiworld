"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D39 — Cline 동작 이해 · 승인 [VSCodeMock activeIcon='cline' 견본]
 * Cline 패널: 작업 제안 카드(생성 hello.txt) + [승인] 골드 / [거부] + 하단 Auto-approve 토글.
 * ClickRing → [승인] 버튼.
 */

function CodeLine({ k, fn, s, n, plain }: { k?: string; fn?: string; s?: string; n?: string; plain?: string }) {
  return (
    <span className="block">
      {k ? <span className="text-[#C792EA]">{k} </span> : null}
      {fn ? <span className="text-[#82AAFF]">{fn}</span> : null}
      {plain ? <span className="text-bone/70">{plain}</span> : null}
      {s ? <span className="text-[#C3E88D]">{s}</span> : null}
      {n ? <span className="text-[#F78C6C]">{n}</span> : null}
    </span>
  );
}

function ClinePanel({ reveal }: { reveal: MotionValue<number> }) {
  const askO = useTransform(reveal, [0.06, 0.24], [0, 1]);
  const cardO = useTransform(reveal, [0.24, 0.42], [0, 1]);
  const cardY = useTransform(reveal, [0.24, 0.42], [14, 0]);
  const btnO = useTransform(reveal, [0.42, 0.6], [0, 1]);
  const toggleO = useTransform(reveal, [0.78, 0.94], [0, 1]);

  return (
    <div className="flex h-full flex-col bg-[#0B0A0F] p-[clamp(0.9rem,1.4vw,1.5rem)]">
      {/* 패널 헤더 */}
      <div className="flex items-center gap-2.5 border-b border-bone/10 pb-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-gold/30 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="7" width="16" height="11" rx="3" />
            <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <path d="M12 3.5V7" />
          </svg>
        </span>
        <span className="font-display text-[clamp(0.9rem,1.1vw,1.15rem)] font-bold text-bone/85">CLINE</span>
        <span className="ml-auto rounded-full border border-gold/35 bg-gold/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold md:text-[11px]">
          Act 모드
        </span>
      </div>

      {/* Cline의 질문 말풍선 */}
      <motion.div style={{ opacity: askO }} className="mt-3 rounded-lg rounded-tl-sm border border-bone/12 bg-bone/[0.04] px-3.5 py-2.5">
        <p className="font-body text-[clamp(0.85rem,1vw,1.08rem)] leading-relaxed text-bone/80">
          새 파일 <span className="font-mono text-gold">hello.txt</span> 를 만들까요?
        </p>
      </motion.div>

      {/* 작업 제안 카드 */}
      <motion.div style={{ opacity: cardO, y: cardY }} className="mt-3 overflow-hidden rounded-lg border border-gold/30 bg-gold/[0.05]">
        <div className="flex items-center gap-2 border-b border-gold/20 bg-gold/[0.07] px-3.5 py-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="font-mono text-[clamp(0.78rem,0.92vw,0.98rem)] font-semibold text-gold">생성 · hello.txt</span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-bone/40 md:text-[11px]">제안된 작업</span>
        </div>
        <div className="bg-[#08070B] px-3.5 py-2.5 font-mono text-[clamp(0.78rem,0.9vw,0.96rem)] leading-relaxed">
          <CodeLine s="안녕하세요! 제 첫 파일입니다." />
        </div>
      </motion.div>

      {/* 승인 / 거부 버튼 */}
      <motion.div style={{ opacity: btnO }} className="mt-3.5 flex items-center gap-2.5">
        <span className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold to-gold-bright px-4 py-2.5 font-body text-[clamp(0.88rem,1.05vw,1.12rem)] font-bold text-ink shadow-[0_0_30px_rgba(232,181,75,0.4)]">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </svg>
          승인 (Approve)
        </span>
        <span className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-bone/20 bg-bone/[0.04] px-4 py-2.5 font-body text-[clamp(0.85rem,1vw,1.05rem)] font-semibold text-bone/55">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
          거부 (Reject)
        </span>
      </motion.div>

      {/* 하단 Auto-approve 토글 */}
      <motion.div style={{ opacity: toggleO }} className="mt-auto flex items-center gap-3 border-t border-bone/10 pt-3">
        <span className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-gold/40 bg-gold/25">
          <span className="absolute right-0.5 h-3.5 w-3.5 rounded-full bg-gold shadow-[0_0_10px_rgba(232,181,75,0.6)]" />
        </span>
        <div className="min-w-0">
          <p className="font-body text-[clamp(0.8rem,0.95vw,1rem)] font-semibold text-bone/80">자동 승인 (Auto-approve)</p>
          <p className="font-body text-[clamp(0.72rem,0.85vw,0.9rem)] leading-snug text-bone/45">켜두면 매번 묻지 않고 바로 실행한다</p>
        </div>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.18], [0, 1]);
  const ringO = useTransform(reveal, [0.5, 0.7], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <VSCodeMock title="my-ai — VS Code" view="editor" activeIcon="cline">
        <ClinePanel reveal={reveal} />
      </VSCodeMock>
      <ClickRing x={43} y={48} label="승인 클릭" dir="up" o={ringO} />
    </motion.div>
  );
}

export default function D39Approve() {
  return (
    <TutorialScene
      scene="d39"
      act="첫 작동 · 테스트"
      chapter="첫 작동 · 테스트"
      step={39}
      total={56}
      title="Cline 동작 이해 — 승인"
      goal="이번 단계: AI가 묻는 승인 버튼 누르기"
      platform="both"
      steps={[
        'Cline이 "파일을 만들까요?" 하며 작업을 제안한다',
        "[승인](Approve) 버튼을 클릭하면 실제로 실행된다",
        "(편하게) 자동 승인(Auto-approve)을 켜면 매번 안 물어본다",
      ]}
      success="Cline이 파일을 생성한다"
      tip="Plan(계획) / Act(실행) 모드가 있다 — Act가 실제 실행"
      Mockup={Mockup}
    />
  );
}
