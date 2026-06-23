"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * TutorialScene — 3강 튜토리얼 씬 엔진.
 * <section data-scene data-act> + Pin + 배경 + 2단 [좌 번호스텝 내러티브 | 우 Mockup].
 * 씬은 데이터 + Mockup 컴포넌트만 넘긴다.
 */

export type MockupRenderer = React.ComponentType<{ p: MotionValue<number>; reveal: MotionValue<number> }>;

export default function TutorialScene({
  scene,
  act,
  chapter,
  step,
  total = 56,
  title,
  goal,
  steps,
  platform,
  success,
  tip,
  warn,
  Mockup,
  heights = 4,
}: {
  scene: string;
  act: string;
  chapter: string;
  step: number;
  total?: number;
  title: string;
  goal: string;
  steps: string[];
  platform?: "win" | "mac" | "both";
  success?: string;
  tip?: string;
  warn?: string;
  Mockup: MockupRenderer;
  heights?: number;
}) {
  return (
    <section data-scene={scene} data-act={act} className="relative bg-ink text-bone">
      <Pin heights={heights}>
        {(p) => (
          <Stage
            p={p}
            chapter={chapter}
            step={step}
            total={total}
            title={title}
            goal={goal}
            steps={steps}
            platform={platform}
            success={success}
            tip={tip}
            warn={warn}
            Mockup={Mockup}
          />
        )}
      </Pin>
    </section>
  );
}

const PLATFORM_LABEL: Record<string, string> = { win: "Windows", mac: "macOS", both: "Windows · macOS" };

function Stage(props: {
  p: MotionValue<number>;
  chapter: string;
  step: number;
  total: number;
  title: string;
  goal: string;
  steps: string[];
  platform?: "win" | "mac" | "both";
  success?: string;
  tip?: string;
  warn?: string;
  Mockup: MockupRenderer;
}) {
  const { p, chapter, step, total, title, goal, steps, platform, success, tip, warn, Mockup } = props;

  const glowO = useTransform(p, [0, 0.5, 1], [0.14, 0.3, 0.44]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  const headO = useTransform(p, [0.02, 0.12], [0, 1]);
  const headY = useTransform(p, [0.02, 0.14], [28, 0]);
  const goalO = useTransform(p, [0.1, 0.2], [0, 1]);

  const reveal = useTransform(p, [0.26, 0.72], [0, 1]);

  const successO = useTransform(p, [0.82, 0.94], [0, 1]);
  const calloutO = useTransform(p, [0.74, 0.86], [0, 1]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* 배경 */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(48% 56% at 64% 46%, rgba(232,181,75,0.10), transparent 72%)" }} />
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
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,4vw,4.5rem)] px-[clamp(2rem,5vw,7rem)] py-[6vh] lg:grid-cols-[0.84fr_1.16fr]">
        {/* 좌측 내러티브 */}
        <div className="flex flex-col justify-center">
          <motion.div style={{ opacity: headO, y: headY }}>
            <Kicker>{chapter}</Kicker>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-mono text-[clamp(0.8rem,1vw,1.05rem)] tracking-[0.28em] text-gold/75">
                STEP {String(step).padStart(2, "0")}
              </span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-bone/30">/ {total}</span>
            </div>
            <h2 className="mt-3 text-balance-k font-display font-black leading-[1.14] text-bone text-[clamp(1.7rem,2.8vw,3.1rem)]">
              {title}
            </h2>
            <motion.p style={{ opacity: goalO }} className="mt-4 text-balance-k leading-relaxed text-bone/55 text-[clamp(0.98rem,1.2vw,1.25rem)]">
              {goal}
            </motion.p>
          </motion.div>

          {/* 번호 스텝 */}
          <div className="mt-[clamp(1.4rem,3vh,2.4rem)] flex flex-col gap-2.5">
            {steps.map((s, i) => (
              <StepRow key={i} idx={i} count={steps.length} text={s} p={p} />
            ))}
          </div>

          {/* 콜아웃 */}
          {tip ? (
            <motion.div style={{ opacity: calloutO }} className="mt-5 flex items-start gap-2.5 rounded-lg border border-[#82AAFF]/25 bg-[#82AAFF]/[0.06] px-3.5 py-2.5">
              <span className="mt-0.5 font-mono text-[11px] font-bold text-[#82AAFF]">팁</span>
              <span className="text-balance-k text-[clamp(0.85rem,1vw,1.05rem)] leading-snug text-bone/70">{tip}</span>
            </motion.div>
          ) : null}
          {warn ? (
            <motion.div style={{ opacity: calloutO }} className="mt-3 flex items-start gap-2.5 rounded-lg border border-ember/30 bg-ember/[0.06] px-3.5 py-2.5">
              <span className="mt-0.5 font-mono text-[11px] font-bold text-ember">주의</span>
              <span className="text-balance-k text-[clamp(0.85rem,1vw,1.05rem)] leading-snug text-bone/70">{warn}</span>
            </motion.div>
          ) : null}
          {success ? (
            <motion.div style={{ opacity: successO }} className="mt-5 flex items-center gap-2.5 rounded-lg border border-gold/30 bg-gold/[0.07] px-3.5 py-2.5">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-balance-k text-[clamp(0.88rem,1.05vw,1.15rem)] font-semibold leading-snug text-gold">{success}</span>
            </motion.div>
          ) : null}
        </div>

        {/* 우측 Mockup */}
        <div className="relative flex h-full items-center justify-center">
          {platform ? (
            <motion.span
              style={{ opacity: headO }}
              className="absolute -top-2 right-0 z-30 rounded-full border border-bone/15 bg-coal/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55 backdrop-blur-sm md:text-[11px]"
            >
              {PLATFORM_LABEL[platform]}
            </motion.span>
          ) : null}
          <Mockup p={p} reveal={reveal} />
        </div>
      </div>
    </div>
  );
}

function StepRow({ idx, count, text, p }: { idx: number; count: number; text: string; p: MotionValue<number> }) {
  const t0 = 0.16 + (idx / Math.max(count, 1)) * 0.44;
  const o = useTransform(p, [t0, t0 + 0.08], [0, 1]);
  const x = useTransform(p, [t0, t0 + 0.08], [-14, 0]);
  return (
    <motion.div style={{ opacity: o, x }} className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-mono text-[12px] font-bold text-gold tabular-nums">
        {idx + 1}
      </span>
      <span className="text-balance-k pt-0.5 leading-snug text-bone/80 text-[clamp(0.95rem,1.15vw,1.2rem)]">{text}</span>
    </motion.div>
  );
}
