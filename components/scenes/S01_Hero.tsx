"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Starfield from "@/components/ui/Starfield";
import TextSplit from "@/components/ui/TextSplit";
import Reveal from "@/components/ui/Reveal";

/**
 * S01 — 오프닝 히어로
 * 칠흑 + 골드 별 + 지평선 너머로 떠오르는 거인의 어깨.
 * 글자별 마스크 리빌, 마우스 패럴랙스, 스크롤 이탈 시 카메라 틸트.
 */
export default function Scene01() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ---------- 마우스 패럴랙스 (±10px, 스프링 감쇠) ---------- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 38, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 38, damping: 18, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const glowX = useTransform(sx, (v: number) => v * 20);
  const glowY = useTransform(sy, (v: number) => v * 14);
  const titleX = useTransform(sx, (v: number) => v * -12);
  const titleY = useTransform(sy, (v: number) => v * -8);

  /* ---------- 스크롤 이탈: 콘텐츠가 위로 흘러가며 어둠 속으로 ---------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const exitY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const shoulderRise = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      data-scene="s01"
      data-act="PROLOGUE — 두 가지 질문"
      className="relative h-screen min-h-[640px] overflow-hidden bg-ink text-bone"
    >
      {/* ============ LAYER 0 — 별 필드 ============ */}
      <Starfield density={160} color="232,181,75" opacity={0.85} drift={0.06} />

      {/* ============ LAYER 1 — 거인의 어깨 (마우스 패럴랙스 그룹) ============ */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        {/* 지평선 너머의 거대한 골드 광원 — 숨 쉬듯 맥동 */}
        <div
          className="animate-pulse-soft absolute bottom-0 left-1/2 aspect-square w-[165vw] -translate-x-1/2 translate-y-[55%] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,211,122,0.30) 0%, rgba(232,181,75,0.14) 38%, rgba(232,181,75,0.04) 58%, transparent 72%)",
          }}
        />
        {/* 광원의 뜨거운 심지 */}
        <div
          className="absolute bottom-0 left-1/2 aspect-square w-[72vw] -translate-x-1/2 translate-y-[62%] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,211,122,0.32) 0%, rgba(232,181,75,0.10) 50%, transparent 72%)",
          }}
        />
        {/* 어깨의 검은 질량 — 화면 폭보다 큰 반원 실루엣, 골드 림 라이트 */}
        <motion.div
          style={{ y: shoulderRise }}
          className="absolute left-1/2 top-[91vh] aspect-square w-[240vw] -translate-x-1/2 rounded-full"
        >
          <div
            className="h-full w-full rounded-full border border-gold/45"
            style={{
              background:
                "radial-gradient(closest-side, #0b0911 0%, #07060a 62%, #07060a 100%)",
              boxShadow:
                "0 -1px 0 rgba(255,211,122,0.5), 0 -18px 60px rgba(232,181,75,0.28), inset 0 24px 80px rgba(232,181,75,0.10)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ============ LAYER 2 — 비네트 (가장자리 침잠) ============ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 42%, transparent 55%, rgba(7,6,10,0.72) 100%)",
        }}
      />

      {/* ============ LAYER 3 — 센터 타이포그래피 ============ */}
      <motion.div
        style={{ y: exitY, opacity: exitOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-[6vw] pb-[10vh]"
      >
        {/* 킥커 */}
        <Reveal delay={0.15} y={18} duration={1.1} className="mb-[5vh]">
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-gold/85 md:text-xs">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
            <span>INTERACTIVE KEYNOTE — 2026.06</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
        </Reveal>

        {/* 메가 타이틀 — 글자별 마스크 리빌 */}
        <motion.h1
          style={{ x: titleX, y: titleY }}
          className="text-balance-k relative text-center font-display font-black leading-[1.05] text-[clamp(3.5rem,11vw,11rem)]"
        >
          {/* 타이틀 뒤 은은한 후광 — 별빛 위 가독성 */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[140%] w-[130%] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(closest-side, rgba(7,6,10,0.85), transparent 75%)",
            }}
          />
          <span className="flex flex-wrap items-baseline justify-center gap-x-[0.24em]">
            <TextSplit text="거인의" per="char" stagger={0.07} delay={0.55} duration={1.2} />
            <TextSplit text="어깨" per="char" stagger={0.07} delay={0.76} duration={1.2} />
          </span>
          <span className="block text-gold [text-shadow:0_0_70px_rgba(232,181,75,0.35)]">
            <TextSplit text="위에서" per="char" stagger={0.07} delay={1.02} duration={1.2} />
          </span>
        </motion.h1>

        {/* 오너먼트 — 라인 + 다이아몬드 */}
        <Reveal delay={1.4} y={10} duration={1} className="mt-[4.5vh]">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/55" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/55" />
          </div>
        </Reveal>

        {/* 서브 카피 — 1.2s+ 지연 블러 리빌 */}
        <Reveal delay={1.55} y={26} blur duration={1.3} className="mt-[3.2vh]">
          <p className="text-balance-k pl-[0.3em] text-center tracking-[0.3em] text-bone/75 text-[clamp(1.05rem,1.8vw,1.6rem)]">
            AI 시대에 살아남기
          </p>
        </Reveal>
      </motion.div>

      {/* ============ LAYER 4 — 하단 스크롤 큐 ============ */}
      <motion.div
        style={{ opacity: exitOpacity }}
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-4 pb-9"
      >
        <Reveal delay={2.2} y={14} duration={1}>
          <p className="text-balance-k px-6 text-center font-mono text-[11px] tracking-[0.2em] text-bone/45">
            이 발표는 스크롤로 진행됩니다 — 천천히, 끝까지.
          </p>
        </Reveal>
        <Reveal delay={2.45} y={8} duration={1}>
          <span className="relative block h-12 w-px overflow-hidden bg-bone/10">
            <span className="animate-scroll-cue absolute left-0 top-0 h-full w-px bg-gold" />
          </span>
        </Reveal>
      </motion.div>

      {/* ============ LAYER 5 — 코너 크롭 마크 + 마이크로 라벨 ============ */}
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
          transition={{ delay: 2.6 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute z-20 h-5 w-5 border-gold/25 ${pos}`}
        />
      ))}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.9, duration: 1.2 }}
        className="absolute left-12 top-[26px] z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/30"
      >
        On the Shoulders of Giants
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.05, duration: 1.2 }}
        className="absolute right-12 top-[26px] z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/30"
      >
        S.01 — Prologue
      </motion.p>
    </section>
  );
}
