"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * B01 — RECAP · 다시, 환경  [2강 다리 / 1강 압축 리캡]
 * 16:9 풀스크린 메가 세리프 선언 3비트 순차 점등 (Pin 스크롤 스테이지).
 * 배경: 희미한 코드 에디터 창 외곽선(골드, 낮은 opacity)이 progress 따라 떠오른다.
 * 비트2 '환경' + 비트3 '코드 에디터' 만 골드 점등(골드 강조 1개 원칙 — 한 줄기).
 * 하단 모노 캡션이 마지막에 점등하며 다음 씬(B02 약속)으로 톤 브릿지.
 */

export default function B01Recap() {
  return (
    <section
      data-scene="b01"
      data-act="RECAP · 다시, 환경"
      className="relative bg-ink text-bone"
    >
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 글로우 + 그리드 패럴랙스 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.5]);
  const gridShift = useTransform(p, [0, 1], [0, -38]);

  /* ── 떠오르는 코드 에디터 창 외곽선 (골드, 낮은 opacity) ── */
  const frameO = useTransform(p, [0.04, 0.34, 1], [0, 0.12, 0.2]);
  const frameScale = useTransform(p, [0.04, 1], [0.9, 1.04]);
  const frameY = useTransform(p, [0, 1], [26, -14]);

  /* ── 비트 1: "지난 시간, 우리는 결론을 냈다." ── */
  const b1O = useTransform(p, [0.06, 0.18, 0.86, 1], [0, 1, 1, 0.5]);
  const b1Y = useTransform(p, [0.06, 0.2], [40, 0]);

  /* ── 비트 2: "본질은 '모델'이 아니라 — '환경'이다." ── */
  const b2O = useTransform(p, [0.3, 0.42], [0, 1]);
  const b2Y = useTransform(p, [0.3, 0.44], [40, 0]);
  const goldEnvO = useTransform(p, [0.4, 0.52], [0, 1]);

  /* ── 비트 3: "그리고 그 환경의 이름은 — 코드 에디터." ── */
  const b3O = useTransform(p, [0.56, 0.68], [0, 1]);
  const b3Y = useTransform(p, [0.56, 0.7], [40, 0]);
  const goldEdO = useTransform(p, [0.66, 0.78], [0, 1]);
  const edGlow = useTransform(p, [0.7, 0.86], [0, 0.5]);

  /* ── 하단 모노 캡션 ── */
  const capO = useTransform(p, [0.84, 0.96], [0, 0.85]);
  const capX = useTransform(p, [0.84, 0.96], [-16, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(54% 58% at 50% 46%, rgba(232,181,75,0.11), transparent 72%)" }}
        />
      </motion.div>

      {/* ── 그리드 패럴랙스 ── */}
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

      {/* ── 떠오르는 코드 에디터 창 외곽선 (배경 깊이) ── */}
      <motion.div
        aria-hidden
        style={{ opacity: frameO, scale: frameScale, y: frameY }}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[min(74vw,1120px)] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="aspect-[16/9] w-full rounded-[1.6rem] border border-gold/20"
          style={{ boxShadow: "0 0 90px rgba(232,181,75,0.10), inset 0 0 60px rgba(232,181,75,0.04)" }}
        >
          {/* 타이틀바 외곽선 */}
          <div className="flex h-[clamp(2.2rem,3.4vh,3rem)] items-center gap-2 border-b border-gold/12 px-6">
            <span className="h-2 w-2 rounded-full border border-gold/40" />
            <span className="h-2 w-2 rounded-full border border-gold/30" />
            <span className="h-2 w-2 rounded-full border border-gold/25" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.32em] text-gold/40 md:text-[12px]">
              code-editor
            </span>
          </div>
          {/* 활동바 외곽선 */}
          <div className="absolute bottom-0 left-0 top-[clamp(2.2rem,3.4vh,3rem)] w-[clamp(2.4rem,4vw,4rem)] border-r border-gold/10" />
        </div>
      </motion.div>

      {/* ── 콘텐츠: 메가 세리프 선언 3비트 ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(1.6rem,3.6vh,3.4rem)] px-[clamp(2.5rem,6vw,8rem)] py-[8vh] text-center">
        <motion.div style={{ opacity: b1O, y: b1Y }}>
          <Kicker className="justify-center">RECAP · 1강 요약 / 지난 시간</Kicker>
        </motion.div>

        <div className="flex flex-col items-center gap-[clamp(1.4rem,3vh,3rem)]">
          {/* 비트 1 */}
          <motion.p
            style={{ opacity: b1O, y: b1Y }}
            className="font-display font-bold leading-[1.24] text-bone/85 text-[clamp(1.7rem,3.4vw,3.4rem)]"
          >
            <span className="block whitespace-nowrap">지난 시간, 우리는 결론을 냈다.</span>
          </motion.p>

          {/* 비트 2 — '환경' 골드 점등 */}
          <motion.p
            style={{ opacity: b2O, y: b2Y }}
            className="font-display font-black leading-[1.18] text-bone text-[clamp(2.3rem,5.4vw,5.4rem)]"
          >
            <span className="block whitespace-nowrap">
              본질은 <span className="text-bone/65">&apos;모델&apos;</span>이 아니라 —
            </span>
            <span className="block whitespace-nowrap">
              <motion.span
                style={{ opacity: goldEnvO }}
                className="text-gold [text-shadow:0_0_42px_rgba(232,181,75,0.45)]"
              >
                &apos;환경&apos;
              </motion.span>
              이다.
            </span>
          </motion.p>

          {/* 비트 3 — '코드 에디터' 골드 점등 */}
          <motion.p
            style={{ opacity: b3O, y: b3Y }}
            className="relative font-display font-bold leading-[1.22] text-bone/85 text-[clamp(1.8rem,3.7vw,3.7rem)]"
          >
            <motion.span
              aria-hidden
              style={{ opacity: edGlow }}
              className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-3xl"
            >
              <span
                className="block h-full w-full"
                style={{ background: "radial-gradient(58% 70% at 50% 50%, rgba(232,181,75,0.13), transparent 72%)" }}
              />
            </motion.span>
            <span className="relative block whitespace-nowrap">
              그리고 그 환경의 이름은 —{" "}
              <motion.span
                style={{ opacity: goldEdO }}
                className="font-black text-gold [text-shadow:0_0_46px_rgba(232,181,75,0.5)]"
              >
                코드 에디터.
              </motion.span>
            </span>
          </motion.p>
        </div>

        {/* ── 하단 모노 캡션 ── */}
        <motion.p
          style={{ opacity: capO, x: capX }}
          className="mt-[clamp(1rem,3vh,2.4rem)] flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold/75 md:text-xs"
        >
          <span className="inline-block h-px w-9 bg-gold/55" />
          기억나죠? 그럼, 이제 —
        </motion.p>
      </div>
    </div>
  );
}
