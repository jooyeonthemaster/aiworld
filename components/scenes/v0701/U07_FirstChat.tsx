"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import ClineStudio, { ClineScript } from "@/components/ui/ClineStudio";

/**
 * U07 — 첫 인사: 연결 끝 [SETUP / 세팅 마지막]
 * ClineStudio 직접 사용: 채팅 한 줄 → 폴더 스캔/파악/연결확인 → AI 답변(파일 리스트 + 말풍선).
 * Stage(배경+2단 그리드)는 U03 패턴 차용, 우측만 ClineStudio 로 교체.
 */

const SCRIPT: ClineScript = {
  project: "my-work",
  userPrompt: "안녕? 이 폴더에 뭐가 있는지 봐줘. 뭘 할 수 있어?",
  steps: [
    { kind: "read", label: "내 폴더 스캔", detail: "4 items 발견" },
    { kind: "read", label: "README.md 훑기", detail: "프로젝트 개요" },
    { kind: "think", label: "내용 파악", detail: "문서 · 자료 · 데이터" },
    { kind: "done", label: "연결 확인", detail: "준비 완료" },
  ],
};

export default function U07FirstChat() {
  return (
    <section data-scene="u07" data-act="SETUP · 무에서 시작한다" className="relative bg-ink text-bone">
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  const glowO = useTransform(p, [0, 0.5, 1], [0.14, 0.32, 0.48]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  const kickO = useTransform(p, [0.02, 0.1], [0, 1]);
  const kickY = useTransform(p, [0.02, 0.12], [26, 0]);
  const titleO = useTransform(p, [0.06, 0.18], [0, 1]);
  const titleY = useTransform(p, [0.06, 0.2], [34, 0]);
  const leadO = useTransform(p, [0.24, 0.36], [0, 1]);
  const leadY = useTransform(p, [0.24, 0.36], [20, 0]);
  const noteO = useTransform(p, [0.7, 0.84], [0, 1]);
  const noteY = useTransform(p, [0.7, 0.84], [18, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* 배경 글로우 */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(48% 56% at 66% 46%, rgba(232,181,75,0.10), transparent 72%)" }} />
      </motion.div>
      {/* 그리드 패럴랙스 */}
      <motion.div aria-hidden style={{ y: gridShift }} className="pointer-events-none absolute inset-[-10%] opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(78% 78% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>

      {/* 콘텐츠 — 2단 그리드 */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,4vw,4.5rem)] px-[clamp(2rem,5vw,7rem)] py-[6vh] lg:grid-cols-[0.82fr_1.18fr]">
        {/* 좌측 내러티브 */}
        <div className="flex flex-col justify-center">
          <motion.div style={{ opacity: kickO, y: kickY }}>
            <Kicker>SETUP · 무에서 시작한다</Kicker>
          </motion.div>
          <motion.div style={{ opacity: titleO, y: titleY }} className="mt-7">
            <span className="font-mono text-[clamp(0.8rem,1vw,1rem)] tracking-[0.3em] text-gold/70">STEP 06 / 06</span>
            <h2 className="mt-3 font-display font-black leading-[1.14] text-bone text-[clamp(1.9rem,3vw,3.4rem)]">
              첫 인사 — 연결 끝
              <br />
              <span className="text-gold [text-shadow:0_0_30px_rgba(232,181,75,0.35)]">이제, 진짜 시작.</span>
            </h2>
          </motion.div>
          <motion.div style={{ opacity: leadO, y: leadY }} className="mt-[clamp(1.6rem,3.4vh,2.6rem)] max-w-[460px]">
            <p className="text-balance-k leading-relaxed text-bone/70 text-[clamp(1rem,1.3vw,1.35rem)]">
              채팅창에 한 줄. AI가 <span className="text-bone/90">네 폴더를 읽고</span> 답하면 —{" "}
              <span className="whitespace-nowrap text-bone/90">세팅 끝.</span> 이제 진짜가 시작된다.
            </p>
          </motion.div>
          <motion.p style={{ opacity: noteO, y: noteY }} className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/75 md:text-[11px]">
            <span className="inline-block h-px w-8 bg-gold/55" />
            연결 확인. 다음은 — 30가지 실전.
          </motion.p>
        </div>

        {/* 우측 — ClineStudio */}
        <div className="flex h-full items-center justify-center">
          <div className="w-full max-w-[920px]">
            <ClineStudio p={p} script={SCRIPT} Result={Result} resultTab="AI 답변" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 결과 패널: AI 답변 (폴더 파일 리스트 + Cline 말풍선) ── */
type ResultProps = { p: MotionValue<number>; reveal: MotionValue<number> };

const FILES: { name: string; kind: "doc" | "pdf" | "folder" | "csv" }[] = [
  { name: "README.md", kind: "doc" },
  { name: "자료.pdf", kind: "pdf" },
  { name: "이미지/", kind: "folder" },
  { name: "data.csv", kind: "csv" },
];

const FLOW: { label: string; kind: "read" | "think" | "done" }[] = [
  { label: "스캔", kind: "read" },
  { label: "읽기", kind: "read" },
  { label: "파악", kind: "think" },
  { label: "확인", kind: "done" },
];

function Result({ reveal }: ResultProps) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const headO = useTransform(reveal, [0.08, 0.32], [0, 1]);
  const headY = useTransform(reveal, [0.08, 0.32], [14, 0]);
  const flowO = useTransform(reveal, [0.34, 0.56], [0, 1]);
  const flowY = useTransform(reveal, [0.34, 0.56], [14, 0]);
  const bubbleO = useTransform(reveal, [0.58, 0.92], [0, 1]);
  const bubbleY = useTransform(reveal, [0.58, 0.92], [16, 0]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col justify-center gap-[clamp(0.9rem,1.8vh,1.4rem)] p-[clamp(0.9rem,1.4vw,1.5rem)]">
      {/* 내 폴더 — 파일 리스트 */}
      <motion.div style={{ opacity: headO, y: headY }} className="rounded-xl border border-bone/10 bg-[#0E0C12] p-[clamp(0.8rem,1.1vw,1.2rem)]">
        <div className="mb-2.5 flex items-center gap-2">
          <FileGlyph kind="folder" className="h-4 w-4 text-gold/80" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/60 md:text-[11px]">내 폴더 — my-work</span>
          <span className="ml-auto rounded bg-bone/[0.06] px-1.5 py-0.5 font-mono text-[9px] text-bone/60 md:text-[10px]">4 items</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {FILES.map((f) => (
            <div key={f.name} className="flex items-center gap-2.5 rounded-lg border border-bone/10 bg-bone/[0.03] px-2.5 py-2.5">
              <FileGlyph kind={f.kind} className="h-4 w-4 shrink-0 text-[#82AAFF]" />
              <span className="truncate font-mono text-[clamp(0.78rem,0.9vw,0.95rem)] text-bone/80">{f.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 진행 흐름 — 스캔 → 읽기 → 파악 → 확인 (가운데 공백 메움) */}
      <motion.div style={{ opacity: flowO, y: flowY }} className="rounded-xl border border-bone/10 bg-bone/[0.02] px-[clamp(0.9rem,1.2vw,1.3rem)] py-[clamp(0.7rem,1vh,1rem)]">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/60 md:text-[11px]">진행 — 폴더 읽는 중</span>
          <span className="ml-auto font-mono text-[10px] tracking-[0.1em] text-gold/75 md:text-[11px]">100%</span>
        </div>
        <div className="flex items-center gap-1.5">
          {FLOW.map((step, i) => (
            <div key={step.label} className="flex flex-1 items-center gap-1.5">
              <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gold/25 bg-gold/[0.06] px-1.5 py-1.5">
                <FlowGlyph kind={step.kind} className="h-3.5 w-3.5 shrink-0 text-gold" />
                <span className="font-mono text-[10px] tracking-[0.12em] text-bone/80 md:text-[11px]">{step.label}</span>
              </div>
              {i < FLOW.length - 1 ? (
                <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 text-gold/45" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 6l6 6-6 6" />
                </svg>
              ) : null}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cline 답변 말풍선 (좌측, 골드 보더) */}
      <motion.div style={{ opacity: bubbleO, y: bubbleY }} className="flex items-start gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="7" width="16" height="11" rx="3" />
            <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <path d="M12 3.5V7" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="rounded-2xl rounded-tl-sm border border-gold/35 bg-gold/[0.07] px-3.5 py-2.5">
            <p className="font-body text-[clamp(0.85rem,1vw,1.05rem)] leading-relaxed text-bone/90">
              README와 자료 3개가 보이네요. <span className="text-gold">요약·정리·시각화·제작</span> — 뭐든 시작할 수 있어요.
            </p>
          </div>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70 md:text-[10px]">Cline</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FlowGlyph({ kind, className = "" }: { kind: "read" | "think" | "done"; className?: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "read":
      return <svg viewBox="0 0 24 24" className={className} aria-hidden><path d="M4 5h7v15H4zM20 5h-7v15h7z" {...c} /></svg>;
    case "think":
      return <svg viewBox="0 0 24 24" className={className} aria-hidden><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" {...c} /></svg>;
    case "done":
    default:
      return <svg viewBox="0 0 24 24" className={className} aria-hidden><path d="M5 13l4 4L19 7" {...c} /></svg>;
  }
}

function FileGlyph({ kind, className = "" }: { kind: "doc" | "pdf" | "folder" | "csv"; className?: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "folder":
      return <svg viewBox="0 0 24 24" className={className} aria-hidden><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" {...c} /></svg>;
    case "pdf":
      return <svg viewBox="0 0 24 24" className={className} aria-hidden><path d="M14 3H6v18h12V7zM14 3v4h4" {...c} /><path d="M9 13h1.5a1.3 1.3 0 0 1 0 2.6H9zm0 0v4" {...c} /></svg>;
    case "csv":
      return <svg viewBox="0 0 24 24" className={className} aria-hidden><path d="M14 3H6v18h12V7zM14 3v4h4" {...c} /><path d="M8 12h8M8 15.5h8M12 12v3.5" {...c} /></svg>;
    case "doc":
    default:
      return <svg viewBox="0 0 24 24" className={className} aria-hidden><path d="M14 3H6v18h12V7zM14 3v4h4" {...c} /><path d="M8.5 12h7M8.5 15h7M8.5 18h4" {...c} /></svg>;
  }
}
