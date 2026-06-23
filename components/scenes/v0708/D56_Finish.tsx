"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D56 — 마무리 / 피날레 (FIN)  [3강 "0에서 1까지" 엔딩]
 * 칠흑에서 골드 새벽빛이 하단에서 가득 차오르며 끝맺는 선언형 피날레.
 * 선언형(N06/N07 패턴): TutorialScene 미사용 — 자체 Pin + Stage.
 * 비트: 킥커 → 리드 '0에서 시작해 —' → 메가 골드 '너는 개발자의 책상을 갖췄다.'
 *      → 보조('이제 무엇이든…') → 모노 크레딧 'MADE IN VS CODE' → 시리즈 연결 큐.
 * 하단 dawn/sun 글로우(N07 패턴 차용)가 후반부에 완전히 떠오르며 4강으로 톤 브릿지.
 */

/* 결정적 별 배치(렌더 중 Math.random 금지) — 골든앵글 + 반경 지터 */
type Star = { x: number; y: number; s: number; d: number };
const STARS: Star[] = Array.from({ length: 42 }, (_, i) => {
  const a = i * 137.508;
  const r = (i % 11) / 11;
  // 좌표를 2자리로 양자화 — 서버/클라이언트 직렬화 정밀도 차이로 인한 하이드레이션 불일치 방지
  const q = (v: number) => Math.round(v * 100) / 100;
  return {
    x: q(50 + Math.cos((a * Math.PI) / 180) * (10 + r * 44)),
    y: q(44 + Math.sin((a * Math.PI) / 180) * (5 + r * 36)),
    s: q(0.6 + ((i * 7) % 5) * 0.4),
    d: q((i % 9) * 0.32),
  };
});

export default function D56Finish() {
  return (
    <section
      data-scene="d56"
      data-act="마무리 · 완성"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.18, 0.4, 0.58]);
  const gridShift = useTransform(p, [0, 1], [0, -44]);
  const starsO = useTransform(p, [0.02, 0.18, 0.86, 1], [0, 1, 1, 0.35]);
  const starsY = useTransform(p, [0, 1], [0, -26]);

  /* ── 하단 골드 새벽빛 (N07 dawn/sun 패턴 — 후반부에 완전히 차오름) ── */
  const dawnScale = useTransform(p, [0.18, 0.92], [0.18, 1]);
  const dawnO = useTransform(p, [0.18, 0.6, 1], [0.1, 0.62, 0.95]);
  const sunO = useTransform(p, [0.5, 1], [0, 0.92]);
  const sunY = useTransform(p, [0.5, 1], ["16vh", "1vh"]);
  const sunScale = useTransform(p, [0.5, 1], [0.7, 1.06]);

  /* ── 카피 비트 ── */
  const kickO = useTransform(p, [0.02, 0.12], [0, 1]);
  const kickY = useTransform(p, [0.02, 0.14], [24, 0]);

  const leadO = useTransform(p, [0.12, 0.24], [0, 1]);
  const leadY = useTransform(p, [0.12, 0.26], [30, 0]);

  const titleO = useTransform(p, [0.26, 0.42], [0, 1]);
  const titleY = useTransform(p, [0.26, 0.46], [50, 0]);
  const titleGlow = useTransform(p, [0.4, 0.7], [0.25, 0.65]);

  const noteO = useTransform(p, [0.5, 0.64], [0, 1]);
  const noteY = useTransform(p, [0.5, 0.66], [26, 0]);

  const creditO = useTransform(p, [0.66, 0.8], [0, 1]);
  const creditY = useTransform(p, [0.66, 0.82], [20, 0]);

  const cueO = useTransform(p, [0.84, 0.96], [0, 0.88]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowO }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(56% 58% at 50% 38%, rgba(232,181,75,0.12), transparent 72%)",
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
              "radial-gradient(80% 80% at 50% 44%, black, transparent 100%)",
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

      {/* ── 하단 골드 새벽빛 (dawn 띠) ── */}
      <motion.div
        aria-hidden
        style={{ scaleX: dawnScale, opacity: dawnO }}
        className="pointer-events-none absolute -bottom-[32vh] left-1/2 h-[80vh] w-[150vw] -translate-x-1/2 origin-bottom rounded-[100%]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 100%, rgba(255,211,122,0.34), rgba(232,181,75,0.12) 46%, transparent 72%)",
          }}
        />
      </motion.div>

      {/* ── 떠오르는 태양 (sun) ── */}
      <motion.div
        aria-hidden
        style={{ opacity: sunO, y: sunY, scale: sunScale }}
        className="pointer-events-none absolute bottom-[-12vh] left-1/2 h-[42vh] w-[42vh] -translate-x-1/2 rounded-full blur-[110px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,211,122,0.6), transparent 70%)",
          }}
        />
      </motion.div>

      {/* ── 콘텐츠 (중앙정렬 메가타이포 — 16:9 가로 시원하게) ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(1.4rem,3.2vh,2.8rem)] px-[clamp(2.5rem,6vw,8rem)] py-[8vh] text-center">
        {/* 킥커 */}
        <motion.div style={{ opacity: kickO, y: kickY }}>
          <Kicker className="justify-center">3강 · 0에서 1까지 · FIN</Kicker>
        </motion.div>

        {/* 리드 */}
        <motion.p
          style={{ opacity: leadO, y: leadY }}
          className="font-display font-bold leading-[1.3] text-bone/70 text-[clamp(1.3rem,2.6vw,2.4rem)]"
        >
          <span className="whitespace-nowrap">0에서 시작해 —</span>
        </motion.p>

        {/* 메가 골드 선언 */}
        <motion.h1
          style={{ opacity: titleO, y: titleY }}
          className="font-display font-black leading-[1.04] text-bone text-[clamp(2.6rem,6.6vw,6.6rem)]"
        >
          <span className="relative inline-block">
            <motion.span
              aria-hidden
              style={{ opacity: titleGlow }}
              className="pointer-events-none absolute -inset-x-12 -inset-y-8 rounded-full"
            >
              <span
                className="block h-full w-full"
                style={{
                  background:
                    "radial-gradient(50% 60% at 50% 50%, rgba(232,181,75,0.24), transparent 70%)",
                }}
              />
            </motion.span>
            <span className="relative block whitespace-nowrap">
              너는 <span className="text-bone/85">개발자의 책상</span>을
            </span>
            <span
              className="relative block whitespace-nowrap text-gold"
              style={{
                textShadow:
                  "0 0 70px rgba(232,181,75,0.5), 0 0 22px rgba(232,181,75,0.32)",
              }}
            >
              갖췄다.
            </span>
          </span>
        </motion.h1>

        {/* 보조 카피 */}
        <motion.p
          style={{ opacity: noteO, y: noteY }}
          className="mt-[clamp(0.4rem,1.4vh,1.2rem)] max-w-[1080px] text-balance-k leading-relaxed text-bone/65 text-[clamp(1.05rem,1.6vw,1.65rem)]"
        >
          <span className="whitespace-nowrap">
            이제 <span className="text-bone/90">무엇이든 만들 수 있다.</span>
          </span>{" "}
          <span className="whitespace-nowrap">
            다음 시간 — <span className="text-gold">직접 만든다.</span>
          </span>
        </motion.p>

        {/* 크레딧 (모노) */}
        <motion.div
          style={{ opacity: creditO, y: creditY }}
          className="mt-[clamp(0.8rem,2.4vh,2rem)] flex items-center gap-4"
        >
          <span className="h-px w-10 bg-gold/40" />
          <span className="font-mono text-[11px] uppercase tracking-[0.42em] text-gold/75 md:text-[13px]">
            MADE IN VS CODE
          </span>
          <span className="h-px w-10 bg-gold/40" />
        </motion.div>
      </div>

      {/* ── 하단 시리즈 연결 큐 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: cueO }}
        className="pointer-events-none absolute inset-x-0 bottom-[clamp(2rem,4.5vh,3.6rem)] z-20 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-bone/55 md:text-xs">
          NEXT · 4강 — 직접 만드는 첫 프로젝트
        </span>
        <span className="relative block h-11 w-px overflow-hidden bg-bone/10">
          <span className="animate-scroll-cue absolute left-0 top-0 h-full w-px bg-gold" />
        </span>
      </motion.div>
    </div>
  );
}
