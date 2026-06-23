"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import Starfield from "@/components/ui/Starfield";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * I06 — 선언 (막 0의 클라이맥스, 본론으로의 다리)
 * 16:9 풀스크린 Pin 스크롤 스테이지. 비트가 카메라처럼 크로스페이드되며
 * 별밭이 차오르고 하단 골드 새벽빛이 떠올라 다음 씬(S01 Hero: 칠흑+별)로 톤이 이어진다.
 * 비트1(그런데도…드물다) → 비트2(시간만 흐른다) → 메가 골드 선언(막 0 최대 타이포) → 모노 스크롤 큐.
 * Pin render-prop 내부 hook 금지 → Stage 보조 컴포넌트로 분리(I03 견본 동일 패턴).
 */
export default function I06Declare() {
  return (
    <section
      data-scene="i06"
      data-act="OPENING — 김주연"
      className="relative bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경: 별밭 — 스크롤이 진행될수록 점점 짙어진다 (S01 별밭으로 자연 연결) ── */
  const starsO = useTransform(p, [0, 0.45, 1], [0.28, 0.62, 1]);
  const starsScale = useTransform(p, [0, 1], [1.08, 1]);

  /* ── 하단 골드 새벽빛 — 막바지에 지평선 너머에서 차오른다 (다음 씬 광원 예고) ── */
  const dawnO = useTransform(p, [0.46, 0.9], [0, 1]);
  const dawnY = useTransform(p, [0.46, 0.95], ["38%", "0%"]);
  const dawnScale = useTransform(p, [0.46, 1], [0.66, 1.18]);

  /* ── 비네트 — 가장자리가 짙어지며 시선을 중앙으로 모은다 ── */
  const vignette = useTransform(p, [0.08, 0.62], [0.5, 0.86]);
  const vignetteBg = useTransform(
    vignette,
    (v: number) =>
      `radial-gradient(ellipse 120% 96% at 50% 47%, transparent 50%, rgba(7,6,10,${v}) 100%)`,
  );

  /* ── 비트1: 그런데도 — …는 말을, 진짜로 실감하는 사람은 드물다. ── */
  const b1O = useTransform(p, [0.04, 0.14, 0.3, 0.4], [0, 1, 1, 0]);
  const b1Y = useTransform(p, [0.04, 0.14], [42, 0]);
  const b1Lift = useTransform(p, [0.3, 0.4], [0, -36]);
  const b1YAll = useTransform([b1Y, b1Lift], ([a, b]: number[]) => a + b);

  /* ── 비트2: 무슨 상황인지 제대로 받아들이지 못한 채, 시간만 흐른다. ── */
  const b2O = useTransform(p, [0.18, 0.26, 0.42, 0.5], [0, 1, 1, 0]);
  const b2Y = useTransform(p, [0.18, 0.26], [30, 0]);
  const b2Lift = useTransform(p, [0.42, 0.5], [0, -30]);
  const b2YAll = useTransform([b2Y, b2Lift], ([a, b]: number[]) => a + b);

  /* ── 어둠을 가르는 골드 헤어라인 (선언 직전 정적) ── */
  const ruleO = useTransform(p, [0.46, 0.54, 0.62, 0.7], [0, 1, 1, 0]);
  const ruleW = useTransform(p, [0.46, 0.6], ["0%", "100%"]);

  /* ── 모노 스크롤 큐 (선언 정착 후 하단에 등장) ── */
  const cueO = useTransform(p, [0.9, 0.97], [0, 1]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ════ LAYER 0 — 차오르는 별밭 ════ */}
      <motion.div
        aria-hidden
        style={{ opacity: starsO, scale: starsScale }}
        className="absolute inset-0 z-0"
      >
        <div className="relative h-full w-full">
          <Starfield density={170} color="232,181,75" opacity={0.9} drift={0.04} />
        </div>
      </motion.div>

      {/* ════ LAYER 1 — 떠오르는 하단 골드 새벽빛 (S01로의 다리) ════ */}
      <motion.div
        aria-hidden
        style={{ opacity: dawnO, y: dawnY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[72vh]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gold/[0.18] via-gold/[0.05] to-transparent" />
        <div className="absolute -bottom-[46vh] left-1/2 h-[84vh] w-[160vw] -translate-x-1/2">
          <motion.div
            style={{
              scale: dawnScale,
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(255,211,122,0.30), rgba(232,181,75,0.10) 46%, transparent 72%)",
            }}
            className="h-full w-full rounded-[50%]"
          />
        </div>
      </motion.div>

      {/* ════ LAYER 2 — 비네트 ════ */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: vignetteBg }}
      />

      {/* ════ LAYER 3 — 측면 세로 모노 라벨 (와이드 캔버스 가장자리 점유) ════ */}
      <div className="pointer-events-none absolute right-[2.4vw] top-1/2 z-[3] hidden -translate-y-1/2 lg:block">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.55em] text-bone/20"
          style={{ writingMode: "vertical-rl" }}
        >
          END OF OPENING — INTO THE GIANT
        </span>
      </div>
      <div className="pointer-events-none absolute left-[2.4vw] top-1/2 z-[3] hidden -translate-y-1/2 lg:block">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.55em] text-bone/15"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          I.06 — DECLARE · 김주연
        </span>
      </div>

      {/* ════ 콘텐츠 무대 — 모든 비트가 같은 중앙 무대에서 크로스페이드 ════ */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center px-[clamp(2.5rem,6vw,8rem)] text-center">
        {/* 모든 비트를 한 셀에 겹쳐, 카메라가 멈춘 듯 같은 자리에서 교체된다 */}
        <div className="relative col-start-1 row-start-1 flex flex-col items-center justify-center">
          {/* ── 비트1 ── */}
          <motion.div
            style={{ opacity: b1O, y: b1YAll }}
            className="absolute inset-x-0 flex flex-col items-center"
          >
            <Kicker className="justify-center">BUT — 여전히</Kicker>
            <h2 className="mt-[clamp(2rem,4vh,3.5rem)] font-display font-bold leading-[1.26] text-bone">
              <span className="block text-[clamp(1.9rem,4vw,4rem)] text-bone/85">
                그런데도 —
              </span>
              <span className="mt-3 block whitespace-nowrap text-[clamp(1.7rem,3.6vw,3.5rem)] text-bone/90">
                「AI가 일자리를 대체한다」
                <span className="text-bone/75">는 말을,</span>
              </span>
              <span className="mt-3 block text-[clamp(1.7rem,3.6vw,3.5rem)]">
                <span className="text-bone/80">진짜로 실감하는 사람은</span>{" "}
                <span className="whitespace-nowrap text-bone">드물다.</span>
              </span>
            </h2>
          </motion.div>

          {/* ── 비트2 ── */}
          <motion.div
            style={{ opacity: b2O, y: b2YAll }}
            className="absolute inset-x-0 flex flex-col items-center"
          >
            <p className="font-display font-bold leading-[1.4] text-bone/80">
              <span className="block text-[clamp(1.6rem,3.4vw,3.2rem)] text-bone/70">
                무슨 상황인지 제대로 받아들이지 못한 채,
              </span>
              <span className="mt-4 block text-[clamp(1.9rem,4.4vw,4.4rem)] text-bone">
                <span className="whitespace-nowrap">
                  시간만{" "}
                  <span className="text-gold [text-shadow:0_0_44px_rgba(232,181,75,0.4)]">
                    흐른다.
                  </span>
                </span>
              </span>
            </p>
          </motion.div>

          {/* ── 골드 헤어라인 (선언 직전) ── */}
          <motion.div
            style={{ opacity: ruleO }}
            className="absolute inset-x-0 -top-[clamp(7rem,14vh,11rem)] flex items-center justify-center gap-4"
          >
            <span className="h-px w-[clamp(2rem,5vw,4.5rem)] bg-gradient-to-r from-transparent to-gold/55" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
            <span className="relative block h-px w-[clamp(8rem,22vw,20rem)] overflow-hidden bg-bone/8">
              <motion.span
                style={{ width: ruleW }}
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold/70 to-gold-bright"
              />
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
            <span className="h-px w-[clamp(2rem,5vw,4.5rem)] bg-gradient-to-l from-transparent to-gold/55" />
          </motion.div>

          {/* ── 선언 (메가 골드 — 막 0 최대 타이포, 16:9 압도) ── */}
          <Declaration p={p} />
        </div>
      </div>

      {/* ════ 다리 — 모노 하단 스크롤 큐 ════ */}
      <motion.div
        style={{ opacity: cueO }}
        className="pointer-events-none absolute inset-x-0 bottom-[clamp(2.5rem,6vh,4.5rem)] z-20 flex flex-col items-center gap-4"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-bone/55 md:text-xs">
          지금부터 — 본론입니다.
        </p>
        <span className="relative block h-12 w-px overflow-hidden bg-bone/10">
          <span className="animate-scroll-cue absolute left-0 top-0 h-full w-px bg-gold" />
        </span>
      </motion.div>

      {/* ════ 코너 크롭 마크 + 마이크로 라벨 ════ */}
      {[
        "left-6 top-6 border-l border-t",
        "right-6 top-6 border-r border-t",
        "left-6 bottom-6 border-l border-b",
        "right-6 bottom-6 border-r border-b",
      ].map((pos, i) => (
        <motion.span
          key={pos}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: EASE }}
          className={`absolute z-20 h-5 w-5 border-gold/25 ${pos}`}
        />
      ))}
      <span className="absolute left-12 top-[26px] z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/30">
        I.06 — Declare
      </span>
      <span className="absolute right-12 top-[26px] z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/30">
        Opening — 김주연
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * 선언 — 메가 골드, 막 0의 최대 타이포.
 * 스크롤 progress 직결: 골드 광배가 차오르고, 두 행이 순차로 점등하며 화면을 압도한다.
 * "박살내겠습니다."는 단어 중간 깨짐 방지(whitespace-nowrap) + animate-flicker 균열감.
 * ──────────────────────────────────────────────────────────────────────────── */
function Declaration({ p }: { p: MotionValue<number> }) {
  /* 선언 블록 전체 — 비트2가 빠진 직후 진입 */
  const blockO = useTransform(p, [0.58, 0.68], [0, 1]);
  const blockLift = useTransform(p, [0.58, 0.78], [40, 0]);

  /* 뒤편 골드 광배 — 선언과 함께 차오른다 */
  const haloO = useTransform(p, [0.6, 0.92], [0, 1]);
  const haloScale = useTransform(p, [0.6, 1], [0.74, 1.06]);

  /* 1행: "오늘, 그 틀 자체를" */
  const l1O = useTransform(p, [0.6, 0.7], [0, 1]);
  const l1Y = useTransform(p, [0.6, 0.72], [28, 0]);

  /* 2행(메가 골드): "박살내겠습니다." */
  const l2O = useTransform(p, [0.7, 0.8], [0, 1]);
  const l2Y = useTransform(p, [0.7, 0.82], [44, 0]);
  const l2Scale = useTransform(p, [0.7, 0.86], [0.92, 1]);
  const l2Glow = useTransform(p, [0.7, 0.9], [0, 1]);
  const l2Shadow = useTransform(
    l2Glow,
    (g: number) =>
      `0 0 ${60 + g * 60}px rgba(232,181,75,${0.18 + g * 0.34}), 0 0 ${20 + g * 24}px rgba(255,211,122,${g * 0.28})`,
  );

  return (
    <motion.div
      style={{ opacity: blockO, y: blockLift }}
      className="relative flex w-full flex-col items-center"
    >
      {/* 거대 타이포 뒤 골드 광배 */}
      <motion.div
        aria-hidden
        style={{ opacity: haloO, scale: haloScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[170%] w-[130%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,181,75,0.22), rgba(232,181,75,0.06) 48%, transparent 72%)",
          }}
        />
      </motion.div>

      <h1 className="font-display font-black leading-[1.05]">
        <motion.span
          style={{ opacity: l1O, y: l1Y }}
          className="block text-[clamp(2.6rem,5.8vw,6.2rem)] text-bone"
        >
          오늘, 그 틀 자체를
        </motion.span>
        <motion.span
          style={{ opacity: l2O, y: l2Y, scale: l2Scale }}
          className="mt-2 block text-[clamp(3.2rem,11.5vw,12.5rem)] tracking-[-0.01em] text-gold"
        >
          <motion.span
            style={{ textShadow: l2Shadow }}
            className="animate-flicker inline-block whitespace-nowrap"
          >
            박살내겠습니다.
          </motion.span>
        </motion.span>
      </h1>
    </motion.div>
  );
}
