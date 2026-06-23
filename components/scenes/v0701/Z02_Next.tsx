"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * Z02 — NEXT / FIN (피날레, 시리즈 연결)  [CLOSE · 습관이 전부다]
 * 16:9 풀스크린 선언형 + Pin 스크롤 스테이지.
 * beat①(오늘 — 무에서 전부 만들었다) → beat②(다음 시간 — 당신이, 직접 만든다, 골드)
 * 하단에서 골드 새벽빛이 차오르며(dawn/sun, N07 패턴 차용) 막을 닫는다.
 * 크레딧 한 줄 + 모노 caption("FIN.") + 하단 스크롤 큐로 시리즈 연결.
 */

export default function Z02Next() {
  return (
    <section
      data-scene="z02"
      data-act="CLOSE · 습관이 전부다"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.14, 0.3, 0.2]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);
  const gridO = useTransform(p, [0, 0.6, 1], [0.05, 0.05, 0.018]);

  /* ── 하단 골드 새벽빛 — 후반부에 차오르며 막을 닫는다 (N07 dawn/sun 차용) ── */
  const dawnScale = useTransform(p, [0.4, 0.96], [0.12, 1]);
  const dawnO = useTransform(p, [0.4, 0.74, 1], [0, 0.78, 1]);
  const sunO = useTransform(p, [0.56, 1], [0, 0.92]);
  const sunY = useTransform(p, [0.56, 1], ["16vh", "1vh"]);
  const sunScale = useTransform(p, [0.56, 1], [0.7, 1.08]);

  /* ── beat ① — 오늘, 무에서 전부 만들었다 (먼저 점등 → 후반 살짝 물러남) ── */
  const b1O = useTransform(p, [0.06, 0.18, 0.6, 0.78], [0, 1, 1, 0.58]);
  const b1Y = useTransform(p, [0.06, 0.2], [44, 0]);
  const b1Scale = useTransform(p, [0.6, 0.86], [1, 0.96]);

  /* ── beat ② — 다음 시간, 당신이 직접 만든다 (메가 골드) ── */
  const b2O = useTransform(p, [0.46, 0.62], [0, 1]);
  const b2Y = useTransform(p, [0.46, 0.64], [50, 0]);
  const goldGlow = useTransform(p, [0.58, 0.82], [0, 0.5]);

  /* ── 크레딧 + 캡션 ── */
  const creditO = useTransform(p, [0.78, 0.9], [0, 1]);
  const creditY = useTransform(p, [0.78, 0.92], [24, 0]);
  const capO = useTransform(p, [0.88, 0.98], [0, 1]);
  const cueO = useTransform(p, [0.9, 1], [0, 0.75]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(54% 56% at 50% 38%, rgba(232,181,75,0.12), transparent 72%)" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: gridShift, opacity: gridO }}
        className="pointer-events-none absolute inset-[-10%]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(78% 78% at 50% 46%, black, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── 하단 골드 새벽빛 (피날레가 차오른다) ── */}
      <motion.div
        aria-hidden
        style={{ scaleX: dawnScale, opacity: dawnO }}
        className="pointer-events-none absolute -bottom-[34vh] left-1/2 h-[92vh] w-[170vw] -translate-x-1/2 origin-bottom rounded-[100%]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 100%, rgba(255,211,122,0.38), rgba(232,181,75,0.13) 46%, transparent 72%)",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ opacity: sunO, y: sunY, scale: sunScale }}
        className="pointer-events-none absolute bottom-[-12vh] left-1/2 h-[40vh] w-[40vh] -translate-x-1/2 rounded-full blur-[110px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,211,122,0.6), transparent 70%)" }}
        />
      </motion.div>

      {/* ── 콘텐츠 (선언형, 수직 중앙 — content-center) ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(2rem,5vh,4.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[8vh] text-center">
        {/* kicker */}
        <motion.div style={{ opacity: b1O }}>
          <Kicker className="justify-center">NEXT</Kicker>
        </motion.div>

        {/* beat ① — 오늘 */}
        <motion.p
          style={{ opacity: b1O, y: b1Y, scale: b1Scale }}
          className="font-display font-bold leading-[1.28] text-bone/90 text-[clamp(1.7rem,3.4vw,3.4rem)]"
        >
          <span className="block whitespace-nowrap">
            오늘 — <span className="text-bone">무(無)</span>에서, 전부 만들었다.
          </span>
        </motion.p>

        {/* beat ② — 다음 시간 (메가 골드) */}
        <motion.div style={{ opacity: b2O, y: b2Y }} className="relative">
          <motion.div
            aria-hidden
            style={{ opacity: goldGlow }}
            className="pointer-events-none absolute -inset-x-[12vw] -inset-y-[8vh]"
          >
            <div
              className="h-full w-full"
              style={{ background: "radial-gradient(50% 60% at 50% 55%, rgba(232,181,75,0.18), transparent 72%)" }}
            />
          </motion.div>
          <p className="relative font-display font-black leading-[1.12] text-bone text-[clamp(2.6rem,6.4vw,6.6rem)]">
            <span className="block text-bone/70 text-[clamp(1.3rem,2.4vw,2.4rem)] font-bold tracking-[0.02em]">
              다음 시간 —
            </span>
            <span
              className="mt-3 block whitespace-nowrap text-gold"
              style={{ textShadow: "0 0 60px rgba(232,181,75,0.5), 0 0 22px rgba(232,181,75,0.35)" }}
            >
              당신이, 직접 만든다
            </span>
          </p>
        </motion.div>

        {/* 크레딧 한 줄 */}
        <motion.div
          style={{ opacity: creditO, y: creditY }}
          className="mt-[clamp(0.5rem,2vh,1.5rem)] flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/80 md:text-xs">
            MADE IN VS CODE
          </span>
          <p className="text-balance-k leading-relaxed text-bone/55 text-[clamp(1rem,1.4vw,1.45rem)]">
            이 발표 자료도, 바로 그 환경에서 —{" "}
            <span className="whitespace-nowrap text-bone/85">AI와 함께.</span>
          </p>
        </motion.div>
      </div>

      {/* ── 하단 caption (모노) + 스크롤 큐 ── */}
      <motion.div
        style={{ opacity: capO }}
        className="pointer-events-none absolute bottom-[clamp(2rem,5vh,3.5rem)] left-1/2 z-20 flex -translate-x-1/2 items-center gap-3"
      >
        <span className="h-px w-9 bg-gold/55" />
        <span className="font-mono text-[11px] uppercase tracking-[0.42em] text-gold/85 md:text-xs">FIN.</span>
        <span className="h-px w-9 bg-gold/55" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ opacity: cueO }}
        className="pointer-events-none absolute bottom-[clamp(0.7rem,2vh,1.4rem)] left-1/2 z-20 -translate-x-1/2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-bone/35 md:text-[11px]">
          to be continued ↓
        </span>
      </motion.div>
    </div>
  );
}
