"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import TextSplit from "@/components/ui/TextSplit";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* 탈주 곡선 (viewBox 1200 × 340 기준 2차 베지에) */
const P0 = { x: 250, y: 212 };
const P1 = { x: 600, y: 64 };
const P2 = { x: 950, y: 212 };
const qx = (t: number) => (1 - t) * (1 - t) * P0.x + 2 * (1 - t) * t * P1.x + t * t * P2.x;
const qy = (t: number) => (1 - t) * (1 - t) * P0.y + 2 * (1 - t) * t * P1.y + t * t * P2.y;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* ANTHROPIC 글자 — 점이 도착하는 타이밍에 하나씩 생성 */
function OrgLetter({ sp, i, ch }: { sp: MotionValue<number>; i: number; ch: string }) {
  const a = 0.6 + i * 0.024;
  const o = useTransform(sp, [a, a + 0.06], [0, 1]);
  const y = useTransform(sp, [a, a + 0.06], [12, 0]);
  return (
    <motion.span style={{ opacity: o, y }} className="inline-block">
      {ch}
    </motion.span>
  );
}

/* 경로 위 잔광 스파크 — 점이 지나간 자리에 점등 */
function Spark({ dotT, t }: { dotT: MotionValue<number>; t: number }) {
  const o = useTransform(dotT, [t - 0.03, t], [0, 0.5]);
  return <motion.circle cx={qx(t)} cy={qy(t)} r={2.4} fill="#E8B54B" style={{ opacity: o }} />;
}

export default function Scene18() {
  const visRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sp } = useScroll({
    target: visRef,
    offset: ["start end", "center center"],
  });
  const quoteInView = useInView(quoteRef, { margin: "-30% 0px -30% 0px" });

  const draw = useTransform(sp, [0.16, 0.64], [0, 1]);
  const dotT = useTransform(sp, (v: number) => clamp01((v - 0.2) / 0.44));
  const cx = useTransform(dotT, qx);
  const cy = useTransform(dotT, qy);
  const dotO = useTransform(sp, [0.16, 0.24], [0, 1]);
  const openaiO = useTransform(sp, [0.3, 0.62], [1, 0.35]);
  const coreO = useTransform(dotT, [0, 0.1], [1, 0]); // 출발점에 남는 빈 자리
  const arriveO = useTransform(dotT, [0.92, 1], [0, 0.5]); // 도착 헤일로
  const estO = useTransform(sp, [0.86, 0.94], [0, 1]); // EST. 2021 라벨

  return (
    <section
      data-scene="s18"
      data-act="ACT 4 — 어떤 회사 이야기"
      className="relative overflow-hidden bg-ink text-bone"
    >
      {/* ---------- 배경 ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[-10%] top-[10%] h-[60vh] w-[55vw] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(232,181,75,0.08), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-8%] h-[40vh] w-[40vw] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(139,132,148,0.06), transparent 70%)" }}
        />
      </div>

      {/* 인용구 스포트라이트용 디머 */}
      <motion.div
        aria-hidden
        animate={{ opacity: quoteInView ? 0.55 : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="pointer-events-none absolute inset-0 z-[5] bg-ink"
      />

      <div className="relative mx-auto max-w-[1400px] px-[6vw] py-[16vh]">
        {/* 파일 라벨 */}
        <Reveal y={18} className="mb-[8vh]">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-gold md:text-xs">
            <span className="h-px w-10 bg-gold/60" />
            <span>FILE 18 — THE EXODUS</span>
          </div>
        </Reveal>

        {/* ---------- 분리 비주얼 ---------- */}
        <div ref={visRef} className="relative mx-auto w-full max-w-[1100px]">
          <div className="relative aspect-[1200/340] w-full">
            <svg viewBox="0 0 1200 340" className="absolute inset-0 h-full w-full" aria-hidden>
              {/* 가이드 경로 (희미하게) */}
              <path
                d="M 250 212 Q 600 64 950 212"
                fill="none"
                stroke="rgba(242,237,227,0.08)"
                strokeWidth={1}
                strokeDasharray="3 7"
              />
              {/* 골드 경로 — 진행에 따라 그려짐 */}
              <motion.path
                d="M 250 212 Q 600 64 950 212"
                fill="none"
                stroke="rgba(232,181,75,0.5)"
                strokeWidth={1.6}
                style={{ pathLength: draw }}
              />
              {/* 출발점 — 심장부의 한 점 */}
              <circle cx={P0.x} cy={P0.y} r={11} fill="none" stroke="rgba(139,132,148,0.4)" strokeWidth={1} />
              <motion.circle cx={P0.x} cy={P0.y} r={5} fill="#E8B54B" style={{ opacity: coreO }} />
              {/* 잔광 스파크 */}
              <Spark dotT={dotT} t={0.2} />
              <Spark dotT={dotT} t={0.36} />
              <Spark dotT={dotT} t={0.52} />
              <Spark dotT={dotT} t={0.68} />
              <Spark dotT={dotT} t={0.84} />
              {/* 이동하는 골드 점 */}
              <motion.circle cx={cx} cy={cy} r={16} fill="rgba(232,181,75,0.18)" style={{ opacity: dotO }} />
              <motion.circle cx={cx} cy={cy} r={6} fill="#FFD37A" style={{ opacity: dotO }} />
              {/* 도착 헤일로 */}
              <motion.circle cx={P2.x} cy={P2.y} r={26} fill="rgba(232,181,75,0.25)" style={{ opacity: arriveO }} />
            </svg>

            {/* OPENAI 블록 */}
            <motion.div
              style={{ opacity: openaiO }}
              className="absolute left-[20.8%] top-[62.4%] -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <span className="font-mono text-[clamp(1.2rem,2.7vw,2.3rem)] font-bold tracking-[0.2em] text-haze">
                OPENAI
              </span>
              <div className="mt-2 font-mono text-[9px] tracking-[0.32em] text-haze/50 md:text-[10px]">
                THE CORE — 심장부
              </div>
            </motion.div>

            {/* ANTHROPIC 블록 — 글자가 생성됨 */}
            <div className="absolute left-[79.2%] top-[62.4%] -translate-x-1/2 -translate-y-1/2 text-center">
              <span
                className="whitespace-nowrap font-mono text-[clamp(1.2rem,2.7vw,2.3rem)] font-bold tracking-[0.16em] text-gold"
                style={{ textShadow: "0 0 30px rgba(232,181,75,0.35)" }}
              >
                {Array.from("ANTHROPIC").map((ch, i) => (
                  <OrgLetter key={i} sp={sp} i={i} ch={ch} />
                ))}
              </span>
              <motion.div
                style={{ opacity: estO }}
                className="mt-2 font-mono text-[9px] tracking-[0.32em] text-gold/50 md:text-[10px]"
              >
                EST. 2021
              </motion.div>
            </div>
          </div>
        </div>

        {/* ---------- 내러티브 ---------- */}
        <div className="mx-auto mt-[14vh] max-w-[900px] text-center">
          <Reveal blur>
            <p className="text-balance-k text-[clamp(1.15rem,2vw,1.7rem)] leading-relaxed text-bone/70">
              OpenAI 의 심장부에, 다리오 아모데이라는 연구자가 있었다.
            </p>
          </Reveal>
        </div>

        {/* 인용 — 스포트라이트 */}
        <div ref={quoteRef} className="relative z-10 mx-auto max-w-[1100px] py-[16vh] text-center">
          <motion.div
            aria-hidden
            animate={{ opacity: quoteInView ? 1 : 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(232,181,75,0.1), transparent 65%)" }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-[2vh] left-[4%] select-none font-display text-[clamp(6rem,14vw,13rem)] leading-none text-gold/15"
          >
            &ldquo;
          </span>
          <h2 className="relative">
            <TextSplit
              text={"“우리는, 방향이 다르다.”"}
              per="char"
              stagger={0.05}
              className="text-balance-k font-display text-[clamp(2.2rem,5.6vw,5rem)] font-black leading-[1.2] text-bone"
            />
          </h2>
          <Reveal delay={0.8} y={12} className="mt-6">
            <span className="font-mono text-[10px] tracking-[0.4em] text-bone/35 md:text-[11px]">
              DARIO AMODEI — ON RECORD
            </span>
          </Reveal>
        </div>

        <div className="mx-auto max-w-[900px] text-center">
          <Reveal blur>
            <p className="text-balance-k text-[clamp(1.15rem,2vw,1.7rem)] leading-relaxed text-bone/70">
              그는 핵심 동료들과 함께 걸어 나와, 회사를 차렸다. 내건 기치는 단 하나 —
            </p>
          </Reveal>
        </div>

        {/* 강조 — 안전한 AI. */}
        <div className="mt-[10vh] text-center">
          <div style={{ textShadow: "0 0 50px rgba(232,181,75,0.35), 0 0 120px rgba(232,181,75,0.15)" }}>
            <TextSplit
              text="안전한 AI."
              per="char"
              stagger={0.08}
              delay={0.15}
              className="font-display text-[clamp(3rem,9vw,8rem)] font-black leading-[1.05] text-gold"
            />
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
            className="mx-auto mt-8 h-px w-[min(420px,60vw)] origin-center bg-gold/50"
          />
          <Reveal delay={1.1} y={12} className="mt-6">
            <span className="font-mono text-[9px] tracking-[0.4em] text-bone/30 md:text-[10px]">
              ONE BANNER — SAFETY
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
