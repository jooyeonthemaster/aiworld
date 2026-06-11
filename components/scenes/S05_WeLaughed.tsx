"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextSplit from "@/components/ui/TextSplit";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Scene05() {
  return (
    <section
      data-scene="s05"
      data-act="ACT 1 — 3년 전, 우리는 웃었다"
      className="relative overflow-hidden bg-ink text-bone"
    >
      <BeatOne />
      <BeatTwo />
    </section>
  );
}

/** 비트 1 — 그때, 우리는 웃었다. */
function BeatOne() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-[6vw]">
      {/* 미세한 잔광 — 직전 씬(채팅창)의 빛이 남아 있는 느낌 */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 40% at 50% 46%, rgba(242,237,227,0.045), transparent 70%)",
        }}
      />
      {/* 좌우로 길게 누운 헤어라인 — 정적의 수평선 */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 1.6, delay: 0.9, ease: EASE }}
        className="absolute left-1/2 top-[68%] h-px w-[min(520px,60vw)] -translate-x-1/2 origin-center bg-bone/10"
      />

      <h2 className="relative z-10 text-balance-k text-center font-display font-black leading-[1.08]">
        <TextSplit
          text="그때, 우리는 웃었다."
          per="char"
          stagger={0.07}
          delay={0.2}
          className="text-[clamp(2.8rem,8.5vw,8.5rem)] text-bone"
        />
      </h2>
    </div>
  );
}

/** 비트 2 — 그리고, 3년이 지났다. (배경이 밝아졌다 가라앉음) */
function BeatTwo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-32% 0px" });

  return (
    <div
      ref={ref}
      className="relative flex min-h-screen items-center justify-center px-[6vw]"
    >
      {/* 배경 점등 — 한 번 밝아졌다가 낮은 잔광으로 가라앉는다 */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 1, 0.22] } : { opacity: 0 }}
        transition={{ duration: 2.8, times: [0, 0.32, 1], ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 44% at 50% 50%, rgba(242,237,227,0.12), transparent 72%)",
        }}
      />
      {/* 골드의 첫 예감 — 아래에서 스미는 아주 옅은 기운 */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 2.4, delay: 1.2, ease: "easeOut" }}
        className="absolute inset-x-0 bottom-0 h-[38vh]"
        style={{
          background:
            "radial-gradient(60% 90% at 50% 100%, rgba(232,181,75,0.10), transparent 75%)",
        }}
      />

      <div className="relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 56, filter: "blur(14px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{ duration: 1.3, ease: EASE }}
          className="text-balance-k font-display font-black leading-[1.12] text-bone"
        >
          <span className="text-[clamp(2.4rem,7vw,6.5rem)]">
            그리고 —{" "}
            <span className="animate-flicker text-gold">3년</span>
            이 지났다.
          </span>
        </motion.h2>

        {/* 점멸하는 시간 눈금 — 흐른 시간의 암시 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2, delay: 1.6, ease: EASE }}
          className="mt-12 flex items-center justify-center gap-3"
          aria-hidden
        >
          {Array.from({ length: 37 }, (_, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0.3, opacity: 0.15 }}
              animate={
                inView
                  ? { scaleY: i % 12 === 0 ? 1 : 0.55, opacity: i % 12 === 0 ? 0.8 : 0.3 }
                  : undefined
              }
              transition={{ duration: 0.8, delay: 1.7 + i * 0.035, ease: EASE }}
              className={`hidden w-px origin-bottom md:block ${
                i % 12 === 0 ? "h-4 bg-gold/80" : "h-2.5 bg-bone/30"
              }`}
            />
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 1.0, delay: 2.6, ease: EASE }}
          className="mt-4 font-mono text-[10px] uppercase tracking-[0.5em] text-bone/30"
        >
          2022 — 2026
        </motion.p>
      </div>
    </div>
  );
}
