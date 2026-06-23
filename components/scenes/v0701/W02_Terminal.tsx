"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import AppWindow from "@/components/ui/AppWindow";

/**
 * W02 — 무기①: 터미널 (AI가 네 컴퓨터에서 직접 명령을 실행한다)  [WHY · 두 개의 무기]
 * 16:9 풀스크린 2단 + Pin 스크롤 스테이지.
 * 좌: 킥커 → beats 순차 점등(강조어 gold 1개) → 하단 caption(모노).
 * 우: AppWindow(icon terminal, accent) 터미널 목업 — 스크롤로 AI 주도 명령이 순차 실행:
 *     "$ ai ▸ pip install pandas" → "> installing…" → "$ ai ▸ python run.py" → "> ✔ 완료"(골드).
 */

type Line = {
  prompt: string; // "$ ai ▸" 또는 ">"
  text: string;
  at: number; // 등장 progress 기준점
  tone: "cmd" | "out" | "done"; // cmd=AI 명령(밝게) / out=출력(흐리게) / done=완료(골드)
};

/* 터미널 라인 — 스크롤 progress 로 한 줄씩 등장 */
const LINES: Line[] = [
  { prompt: "$ ai ▸", text: "pip install pandas", at: 0.3, tone: "cmd" },
  { prompt: ">", text: "installing…  collected 14 packages", at: 0.42, tone: "out" },
  { prompt: "$ ai ▸", text: "python run.py", at: 0.56, tone: "cmd" },
  { prompt: ">", text: "✔ 완료  ·  report.xlsx 생성됨", at: 0.7, tone: "done" },
];

export default function W02Terminal() {
  return (
    <section data-scene="w02" data-act="WHY · 두 개의 무기" className="relative bg-ink text-bone">
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.48]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* ── 좌측 카피 비트 ── */
  const leadO = useTransform(p, [0.02, 0.13], [0, 1]);
  const leadY = useTransform(p, [0.02, 0.16], [40, 0]);

  const b1O = useTransform(p, [0.14, 0.26], [0, 1]);
  const b1Y = useTransform(p, [0.14, 0.28], [34, 0]);

  const b2O = useTransform(p, [0.3, 0.44], [0, 1]);
  const b2Y = useTransform(p, [0.3, 0.46], [34, 0]);
  const goldGlow = useTransform(p, [0.42, 0.58], [0, 0.55]);

  const capO = useTransform(p, [0.8, 0.92], [0, 1]);
  const capY = useTransform(p, [0.8, 0.94], [22, 0]);

  /* ── 우측 창 마운트 ── */
  const winO = useTransform(p, [0.06, 0.2], [0, 1]);
  const winY = useTransform(p, [0.06, 0.22], [44, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(52% 56% at 70% 46%, rgba(232,181,75,0.12), transparent 72%)" }}
        />
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

      {/* ── 콘텐츠: 2단 (content-center 로 단일 row 수직 중앙) ── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,5vw,5.5rem)] px-[clamp(2.5rem,6vw,8rem)] lg:grid-cols-[0.92fr_1.08fr]">
        {/* ── 좌측: 카피 ── */}
        <div className="flex flex-col justify-center">
          <motion.div style={{ opacity: leadO, y: leadY }}>
            <Kicker>무기 ① — 터미널</Kicker>
          </motion.div>

          <div className="mt-[clamp(2rem,4.5vh,3.4rem)] font-display font-bold leading-[1.34] text-[clamp(2rem,4.2vw,4.2rem)]">
            <motion.p style={{ opacity: b1O, y: b1Y }} className="text-bone/85">
              <span className="whitespace-nowrap">AI가 &apos;말&apos;만</span>{" "}
              <span className="whitespace-nowrap">하는 게 아니다.</span>
            </motion.p>

            <motion.p style={{ opacity: b2O, y: b2Y }} className="relative mt-[clamp(1rem,2.4vh,2rem)] text-bone">
              <motion.span
                aria-hidden
                style={{ opacity: goldGlow }}
                className="pointer-events-none absolute -inset-x-8 -inset-y-5 rounded-3xl"
              >
                <span
                  className="block h-full w-full"
                  style={{ background: "radial-gradient(58% 70% at 32% 50%, rgba(232,181,75,0.16), transparent 72%)" }}
                />
              </motion.span>
              <span className="relative block whitespace-nowrap">네 컴퓨터에서, 직접</span>
              <span className="relative block whitespace-nowrap">
                <span className="text-gold [text-shadow:0_0_38px_rgba(232,181,75,0.45)]">명령을 실행한다.</span>
              </span>
            </motion.p>
          </div>

          {/* ── caption (모노) ── */}
          <motion.p
            style={{ opacity: capO, y: capY }}
            className="mt-[clamp(2.4rem,5.5vh,4rem)] flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold/80 md:text-xs"
          >
            <span className="inline-block h-px w-10 bg-gold/55" />
            말이 아니라 — 실행.
          </motion.p>
        </div>

        {/* ── 우측: 터미널 창 목업 ── */}
        <motion.div style={{ opacity: winO, y: winY }} className="w-full">
          <AppWindow icon="terminal" accent title="zsh — neander-campaign" rightLabel="AI · driving">
            <TerminalBody p={p} />
          </AppWindow>
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────────────────── 터미널 본문 (라인 순차 실행) ───────────────────────── */
function TerminalBody({ p }: { p: MotionValue<number> }) {
  return (
    <div className="relative flex min-h-[clamp(300px,42vh,440px)] flex-col justify-center bg-[#08070b] px-[clamp(1.2rem,1.8vw,2rem)] py-[clamp(1.2rem,2.2vh,2rem)]">
      {/* 헤더 한 줄 — 작업 디렉터리 */}
      <p className="mb-4 font-mono text-[clamp(0.72rem,0.95vw,0.95rem)] tracking-[0.04em] text-bone/50">
        ~/projects/neander-campaign
      </p>

      <div className="flex flex-col gap-[clamp(0.7rem,1.4vh,1.2rem)]">
        {LINES.map((l, i) => (
          <TermLine key={i} p={p} line={l} />
        ))}
      </div>

      {/* 살아있는 커서 — 다음 입력 대기 */}
      <Caret p={p} />
    </div>
  );
}

function TermLine({ p, line }: { p: MotionValue<number>; line: Line }) {
  const o = useTransform(p, [line.at, line.at + 0.08], [0, 1]);
  const x = useTransform(p, [line.at, line.at + 0.1], [-14, 0]);

  const promptColor =
    line.tone === "cmd" ? "text-gold/80" : line.tone === "done" ? "text-gold" : "text-bone/30";
  const textColor =
    line.tone === "cmd" ? "text-bone" : line.tone === "done" ? "text-gold [text-shadow:0_0_22px_rgba(232,181,75,0.4)]" : "text-bone/65";

  return (
    <motion.div
      style={{ opacity: o, x }}
      className="flex items-start gap-3 font-mono text-[clamp(0.85rem,1.25vw,1.3rem)] leading-snug"
    >
      <span className={`shrink-0 ${promptColor}`}>{line.prompt}</span>
      <span className={`tracking-[0.01em] ${textColor} ${line.tone === "cmd" ? "font-semibold" : ""}`}>
        {line.text}
      </span>
    </motion.div>
  );
}

/* 마지막 라인 뒤에서 깜빡이는 프롬프트 커서 */
function Caret({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0.82, 0.86], [0, 1]);
  const blink = useTransform(p, [0.86, 0.9, 0.94, 0.98], [1, 0.15, 1, 0.15]);
  return (
    <motion.div
      style={{ opacity: o }}
      className="mt-[clamp(0.8rem,1.6vh,1.3rem)] flex items-center gap-3 font-mono text-[clamp(0.85rem,1.25vw,1.3rem)]"
    >
      <span className="text-gold/80">$ ai ▸</span>
      <motion.span style={{ opacity: blink }} className="inline-block h-[1.1em] w-[0.55ch] bg-gold/80" />
    </motion.div>
  );
}
