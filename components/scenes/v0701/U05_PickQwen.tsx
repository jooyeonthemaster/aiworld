"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import AppWindow from "@/components/ui/AppWindow";

/**
 * U05 — 두뇌를 고른다: Qwen3.7-plus [SETUP]
 * Cline 모델 선택 목업: 검색창에 'Qwen' 타이핑 → 모델 리스트 펼쳐짐 →
 * 'Qwen3.7-plus' 행이 골드 점등 + 체크 → 상단에 선택된 모델 칩이 박힘. 나머지 행은 흐림.
 * U03(AppWindow 목업 + 스크롤 점등) 구조를 그대로 차용.
 */

type ModelRow = { name: string; vendor: string; tag: string; pick?: boolean };

const MODELS: ModelRow[] = [
  { name: "Claude Opus 4.8", vendor: "Anthropic", tag: "최강 · 비쌈" },
  { name: "GPT-5.1", vendor: "OpenAI", tag: "범용" },
  { name: "Gemini 3 Pro", vendor: "Google", tag: "멀티모달" },
  { name: "Qwen3.7-plus", vendor: "Alibaba", tag: "빠름 · 똑똑 · 충분", pick: true },
  { name: "DeepSeek V3.2", vendor: "DeepSeek", tag: "저렴" },
  { name: "Llama 4 Maverick", vendor: "Meta", tag: "오픈" },
];

export default function U05PickQwen() {
  return (
    <section data-scene="u05" data-act="SETUP · 무에서 시작한다" className="relative bg-ink text-bone">
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  const glowO = useTransform(p, [0, 0.5, 1], [0.14, 0.32, 0.46]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  const kickO = useTransform(p, [0.02, 0.1], [0, 1]);
  const kickY = useTransform(p, [0.02, 0.12], [26, 0]);
  const titleO = useTransform(p, [0.06, 0.18], [0, 1]);
  const titleY = useTransform(p, [0.06, 0.2], [34, 0]);
  const leadO = useTransform(p, [0.24, 0.36], [0, 1]);
  const leadY = useTransform(p, [0.24, 0.36], [20, 0]);
  const noteO = useTransform(p, [0.62, 0.74], [0, 1]);
  const noteY = useTransform(p, [0.62, 0.74], [18, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* 배경 */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(48% 56% at 66% 46%, rgba(232,181,75,0.10), transparent 72%)" }} />
      </motion.div>
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

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,4vw,4.5rem)] px-[clamp(2rem,5vw,7rem)] py-[6vh] lg:grid-cols-[0.82fr_1.18fr]">
        {/* 좌측 내러티브 */}
        <div className="flex flex-col justify-center">
          <motion.div style={{ opacity: kickO, y: kickY }}>
            <Kicker>SETUP · 무에서 시작한다</Kicker>
          </motion.div>
          <motion.div style={{ opacity: titleO, y: titleY }} className="mt-7">
            <span className="font-mono text-[clamp(0.8rem,1vw,1rem)] tracking-[0.3em] text-gold/70">STEP 04 / 06</span>
            <h2 className="mt-3 font-display font-black leading-[1.14] text-bone text-[clamp(1.9rem,3vw,3.4rem)]">
              두뇌를 고른다,
              <br />
              <span className="whitespace-nowrap text-gold [text-shadow:0_0_30px_rgba(232,181,75,0.35)]">Qwen3.7-plus</span>
            </h2>
          </motion.div>
          <motion.div style={{ opacity: leadO, y: leadY }} className="mt-[clamp(1.6rem,3.4vh,2.6rem)] max-w-[460px]">
            <p className="text-balance-k leading-relaxed text-bone/70 text-[clamp(1rem,1.3vw,1.35rem)]">
              수십 개 모델 중 오늘 쓸 <span className="text-bone/90">두뇌</span> 하나. 빠르고, 똑똑하고,{" "}
              <span className="whitespace-nowrap text-bone/90">수업엔 충분하다.</span>
            </p>
            <p className="mt-3 text-balance-k leading-relaxed text-bone/45 text-[clamp(0.9rem,1.1vw,1.1rem)]">
              제일 비싼 게 정답이 아니다. <span className="whitespace-nowrap">목적에 맞는 걸 고른다.</span>
            </p>
          </motion.div>
          <motion.p style={{ opacity: noteO, y: noteY }} className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/75 md:text-[11px]">
            <span className="inline-block h-px w-8 bg-gold/55" />
            오늘의 두뇌 — 선택 완료.
          </motion.p>
        </div>

        {/* 우측 모델 선택 목업 */}
        <div className="flex h-full items-center justify-center">
          <Picker p={p} />
        </div>
      </div>
    </div>
  );
}

function Picker({ p }: { p: MotionValue<number> }) {
  const winO = useTransform(p, [0.04, 0.16], [0, 1]);
  const winY = useTransform(p, [0.04, 0.18], [56, 0]);
  const winS = useTransform(p, [0.04, 0.18], [0.965, 1]);

  /* 검색어 타이핑 'Qwen' */
  const typed = useTransform(p, [0.16, 0.26], [0, 4]);
  const caretO = useTransform(p, [0.16, 0.26, 0.28], [1, 1, 0]);

  /* 리스트 펼쳐짐 */
  const listO = useTransform(p, [0.26, 0.36], [0, 1]);

  /* 선택 점등 + 상단 칩 */
  const pickGlow = useTransform(p, [0.5, 0.58], [0, 1]);
  const chipO = useTransform(p, [0.58, 0.68], [0, 1]);
  const chipY = useTransform(p, [0.58, 0.68], [-10, 0]);

  return (
    <motion.div style={{ opacity: winO, y: winY, scale: winS }} className="w-full max-w-[860px]">
      <AppWindow title="Cline — 모델 선택" icon="settings" accent rightLabel="OpenRouter">
        <div className="flex h-[clamp(380px,58vh,600px)] flex-col p-[clamp(1rem,1.6vw,1.8rem)]">
          {/* 상단: 선택된 모델 칩 */}
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/40 md:text-[11px]">선택된 모델</span>
            <motion.div
              style={{ opacity: chipO, y: chipY }}
              className="flex items-center gap-2 rounded-full border border-gold/45 bg-gold/[0.1] px-3 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
              <span className="font-mono text-[clamp(0.72rem,0.85vw,0.92rem)] font-bold text-gold">Qwen3.7-plus</span>
              <CheckMark className="h-3.5 w-3.5 text-gold" />
            </motion.div>
          </div>

          {/* 검색창 */}
          <div className="mt-3.5">
            <SearchBox typed={typed} caretO={caretO} />
          </div>

          {/* 모델 리스트 */}
          <motion.div style={{ opacity: listO }} className="mt-3 flex min-h-0 flex-1 flex-col justify-center gap-1 overflow-hidden">
            {MODELS.map((m, i) => (
              <ModelRowItem key={m.name} model={m} index={i} p={p} pickGlow={pickGlow} />
            ))}
          </motion.div>
        </div>
      </AppWindow>
    </motion.div>
  );
}

function ModelRowItem({
  model,
  index,
  p,
  pickGlow,
}: {
  model: ModelRow;
  index: number;
  p: MotionValue<number>;
  pickGlow: MotionValue<number>;
}) {
  /* 행 stagger 등장: 결정적 구간 분할 */
  const start = 0.28 + index * 0.025;
  const rowO = useTransform(p, [start, start + 0.08], [0, 1]);
  const rowX = useTransform(p, [start, start + 0.08], [18, 0]);
  /* 비선택 행은 점등 시 흐려짐(가독 하한 확보: 0.5) */
  const dim = useTransform(pickGlow, [0, 1], [1, model.pick ? 1 : 0.5]);

  return (
    <motion.div
      style={{ opacity: model.pick ? rowO : dim, x: rowX }}
      className={`flex items-center gap-3 rounded-lg border p-[clamp(0.45rem,0.65vw,0.7rem)] ${
        model.pick ? "border-gold/45 bg-gold/[0.06]" : "border-bone/8 bg-bone/[0.02]"
      }`}
    >
      {/* 벤더 타일 */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border font-display text-[clamp(0.78rem,0.95vw,1rem)] font-bold ${
          model.pick ? "border-gold/40 bg-gold/10 text-gold" : "border-bone/12 bg-bone/[0.04] text-bone/45"
        }`}
      >
        {model.vendor.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`whitespace-nowrap font-body font-semibold text-[clamp(0.85rem,1vw,1.05rem)] ${model.pick ? "text-gold" : "text-bone/80"}`}>
            {model.name}
          </span>
          {model.pick ? (
            <span className="shrink-0 rounded bg-gold/15 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-gold md:text-[9px]">오늘의 두뇌</span>
          ) : null}
        </div>
        <span className="mt-0.5 block whitespace-nowrap font-mono text-[9px] tracking-[0.04em] text-bone/55 md:text-[10px]">
          {model.vendor} · {model.tag}
        </span>
      </div>
      {/* 체크 / 선택 표식 */}
      {model.pick ? (
        <motion.span
          style={{ opacity: pickGlow }}
          className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15"
        >
          <motion.span
            aria-hidden
            style={{ opacity: pickGlow }}
            className="animate-pulse-soft absolute -inset-1.5 rounded-full"
          >
            <span className="block h-full w-full rounded-full" style={{ boxShadow: "0 0 22px rgba(232,181,75,0.55)" }} />
          </motion.span>
          <CheckMark className="h-3.5 w-3.5 text-gold" />
        </motion.span>
      ) : (
        <span className="h-6 w-6 shrink-0 rounded-full border border-bone/12" />
      )}
    </motion.div>
  );
}

function SearchBox({ typed, caretO }: { typed: MotionValue<number>; caretO: MotionValue<number> }) {
  const text = useTransform(typed, (v: number) => "Qwen".slice(0, Math.round(v)));
  return (
    <div className="flex items-center gap-2 rounded-md border border-bone/15 bg-bone/[0.04] px-3 py-2.5">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-bone/40" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
        <circle cx="11" cy="11" r="6" />
        <path d="m20 20-4-4" />
      </svg>
      <span className="flex items-center font-mono text-[clamp(0.8rem,0.95vw,1rem)] text-bone/80">
        <motion.span>{text}</motion.span>
        <motion.span style={{ opacity: caretO }} className="ml-px inline-block h-3.5 w-[1.5px] bg-gold" />
      </span>
      <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.2em] text-bone/30 md:text-[10px]">모델 검색</span>
    </div>
  );
}

function CheckMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
