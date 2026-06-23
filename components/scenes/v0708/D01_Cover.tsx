"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D01 — 표지 / 히어로  [3강 "0에서 1까지" 오프닝]
 * 칠흑 + 골드, 약한 별/글로우. 중앙정렬 메가 세리프가 16:9 가로를 시원하게 채운다.
 * Pin 스크롤 스테이지 — 킥커 → 메가타이포 '0에서 1까지' → 서브 → 보조 카피 → 하단 스크롤 큐 순차 점등.
 * 선언형(N06/N07 패턴): TutorialScene 미사용, 자체 Pin + Stage.
 */

/* 결정적 별 배치(렌더 중 Math.random 금지) — 골든앵글 + 사인 지터 */
type Star = { x: number; y: number; s: number; d: number };
const STARS: Star[] = Array.from({ length: 46 }, (_, i) => {
  const a = i * 137.508;
  const r = (i % 11) / 11;
  // 좌표를 2자리로 양자화 — 서버/클라이언트 직렬화 정밀도 차이로 인한 하이드레이션 불일치 방지
  const q = (v: number) => Math.round(v * 100) / 100;
  return {
    x: q(50 + Math.cos((a * Math.PI) / 180) * (8 + r * 46)),
    y: q(50 + Math.sin((a * Math.PI) / 180) * (6 + r * 42)),
    s: q(0.6 + ((i * 7) % 5) * 0.4),
    d: q((i % 9) * 0.32),
  };
});

export default function D01Cover() {
  return (
    <section
      data-scene="d01"
      data-act="준비 · 시작 전"
      className="relative bg-ink text-bone"
    >
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.22, 0.42, 0.55]);
  const glowScale = useTransform(p, [0, 1], [0.92, 1.08]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);
  const starsO = useTransform(p, [0.02, 0.2], [0, 1]);
  const starsY = useTransform(p, [0, 1], [0, -22]);

  /* 하단 골드 새벽빛 — 0→1 의 '1'을 향해 차오름 */
  const dawnScale = useTransform(p, [0.1, 0.9], [0.2, 1]);
  const dawnO = useTransform(p, [0.1, 0.6, 1], [0.1, 0.55, 0.85]);

  /* ── 카피 비트 ── */
  const kickO = useTransform(p, [0.02, 0.12], [0, 1]);
  const kickY = useTransform(p, [0.02, 0.14], [26, 0]);

  const titleO = useTransform(p, [0.12, 0.26], [0, 1]);
  const titleY = useTransform(p, [0.12, 0.3], [48, 0]);
  const titleGlow = useTransform(p, [0.22, 0.5], [0.25, 0.6]);

  const subO = useTransform(p, [0.36, 0.5], [0, 1]);
  const subY = useTransform(p, [0.36, 0.52], [28, 0]);

  const noteO = useTransform(p, [0.54, 0.68], [0, 1]);
  const noteY = useTransform(p, [0.54, 0.7], [24, 0]);

  const cueO = useTransform(p, [0.78, 0.92], [0, 0.85]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowO, scale: glowScale }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(54% 56% at 50% 40%, rgba(232,181,75,0.13), transparent 72%)",
          }}
        />
      </motion.div>

      {/* ── 그리드 패럴랙스 ── */}
      <motion.div
        aria-hidden
        style={{ y: gridShift }}
        className="pointer-events-none absolute inset-[-10%] opacity-[0.05]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.5) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
            maskImage:
              "radial-gradient(80% 80% at 50% 46%, black, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── 별 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: starsO, y: starsY }}
        className="pointer-events-none absolute inset-0"
      >
        {STARS.map((st, i) => (
          <span
            key={i}
            className="animate-pulse-soft absolute rounded-full bg-gold-bright"
            style={{
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: `${st.s}px`,
              height: `${st.s}px`,
              opacity: 0.55,
              boxShadow: "0 0 6px rgba(255,211,122,0.7)",
              animationDelay: `${st.d}s`,
            }}
          />
        ))}
      </motion.div>

      {/* ── 하단 골드 새벽빛 ── */}
      <motion.div
        aria-hidden
        style={{ scaleX: dawnScale, opacity: dawnO }}
        className="pointer-events-none absolute -bottom-[34vh] left-1/2 h-[72vh] w-[150vw] -translate-x-1/2 origin-bottom rounded-[100%]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 100%, rgba(255,211,122,0.28), rgba(232,181,75,0.1) 46%, transparent 72%)",
          }}
        />
      </motion.div>

      {/* ── 콘텐츠 (중앙정렬 메가타이포 — 16:9 가로 시원하게) ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(1.6rem,3.6vh,3rem)] px-[clamp(2.5rem,6vw,8rem)] py-[8vh] text-center">
        {/* 킥커 */}
        <motion.div style={{ opacity: kickO, y: kickY }}>
          <Kicker className="justify-center">AI WORLD · 실습 워크숍 · 3강</Kicker>
        </motion.div>

        {/* 메가 세리프 — '0에서 1까지' */}
        <motion.h1
          style={{ opacity: titleO, y: titleY }}
          className="font-display font-black leading-[0.98] text-bone text-[clamp(3.4rem,11vw,11rem)]"
        >
          <span className="relative inline-block whitespace-nowrap">
            <motion.span
              aria-hidden
              style={{ opacity: titleGlow }}
              className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-full"
            >
              <span
                className="block h-full w-full"
                style={{
                  background:
                    "radial-gradient(50% 60% at 50% 50%, rgba(232,181,75,0.22), transparent 70%)",
                }}
              />
            </motion.span>
            <span
              className="relative text-gold"
              style={{
                textShadow:
                  "0 0 70px rgba(232,181,75,0.5), 0 0 22px rgba(232,181,75,0.32)",
              }}
            >
              0<span className="mx-[0.12em] text-bone">에서</span>1
            </span>
            <span className="relative text-bone">까지</span>
          </span>
        </motion.h1>

        {/* 서브 헤드라인 */}
        <motion.p
          style={{ opacity: subO, y: subY }}
          className="font-display font-bold leading-[1.32] text-bone/90 text-[clamp(1.4rem,2.9vw,2.7rem)]"
        >
          <span className="whitespace-nowrap">개발환경 완전정복</span>
          <span className="mx-3 text-bone/30">—</span>
          <span className="whitespace-nowrap">한 단계도 빠짐없이</span>
        </motion.p>

        {/* 보조 카피 */}
        <motion.p
          style={{ opacity: noteO, y: noteY }}
          className="mt-[clamp(0.5rem,1.6vh,1.4rem)] max-w-[1080px] text-balance-k leading-relaxed text-bone/55 text-[clamp(1.02rem,1.5vw,1.55rem)]"
        >
          <span className="whitespace-nowrap">
            VS Code도 없는 지금부터, 첫 배포까지.
          </span>{" "}
          <span className="whitespace-nowrap text-bone/80">
            이 화면 하나로 끝낸다.
          </span>
        </motion.p>
      </div>

      {/* ── 하단 스크롤 큐 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: cueO }}
        className="pointer-events-none absolute inset-x-0 bottom-[clamp(2.2rem,5vh,4rem)] z-20 flex flex-col items-center gap-3.5"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.45em] text-gold/70 md:text-xs">
          스크롤하여 시작
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-bone/10">
          <span className="animate-scroll-cue absolute left-0 top-0 h-full w-px bg-gold" />
        </span>
      </motion.div>
    </div>
  );
}
