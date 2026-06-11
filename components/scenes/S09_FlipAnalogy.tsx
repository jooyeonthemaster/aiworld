"use client";

import { motion } from "framer-motion";
import Kicker from "@/components/ui/Kicker";
import TextSplit from "@/components/ui/TextSplit";
import Reveal from "@/components/ui/Reveal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const EXHIBITS = [
  { no: "NO.1", name: "전구", year: "1879" },
  { no: "NO.2", name: "인터넷", year: "1991" },
  { no: "NO.3", name: "스마트폰", year: "2007" },
];

export default function Scene09() {
  return (
    <section
      data-scene="s09"
      data-act="ACT 2 — 다른 종류의 발명"
      className="relative overflow-hidden bg-bone text-ink"
    >
      {/* ───── 다크 → 라이트 그라디언트 브릿지 (S08 칠흑에서 자연스럽게 밝아짐) ───── */}
      <div className="h-[30vh] w-full bg-gradient-to-b from-ink to-bone" />

      <div className="relative flex min-h-screen items-center">
        {/* 종이 결 — 미세 헤어라인 텍스처 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(7,6,10,0.022) 0px, rgba(7,6,10,0.022) 1px, transparent 1px, transparent 10px)",
          }}
        />
        {/* 따뜻한 골드 글로우 — 종이에 비치는 햇빛 */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-10vw] top-[10vh] h-[70vmin] w-[70vmin] rounded-full animate-pulse-soft"
          style={{
            background:
              "radial-gradient(circle at center, rgba(232,181,75,0.16) 0%, rgba(232,181,75,0.05) 45%, transparent 70%)",
          }}
        />

        {/* 우측 세로 고스트 워드 — 에디토리얼 장식 */}
        <div className="pointer-events-none absolute right-[1.5vw] top-1/2 -translate-y-1/2 select-none">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <span className="font-display font-black text-stroke-ink opacity-[0.08] [writing-mode:vertical-rl] text-[clamp(5rem,12vw,11rem)] leading-none tracking-[0.06em]">
              ANALOGY
            </span>
          </motion.div>
        </div>

        {/* 레지스트레이션 마크 (인쇄물 모서리 십자) */}
        {[
          "left-[3vw] top-[6vh]",
          "right-[3vw] top-[6vh]",
          "left-[3vw] bottom-[6vh]",
          "right-[3vw] bottom-[6vh]",
        ].map((pos, i) => (
          <motion.span
            key={i}
            aria-hidden
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 + i * 0.12, ease: EASE }}
            className={`absolute ${pos} font-mono text-sm text-ink/25 select-none`}
          >
            +
          </motion.span>
        ))}

        {/* ───── 본문 에디토리얼 ───── */}
        <div className="relative mx-auto w-full max-w-[1400px] px-[6vw] py-[12vh]">
          <Reveal y={20} duration={0.9}>
            <Kicker tone="ink">AN ANALOGY — 비유 하나</Kicker>
          </Reveal>

          {/* 상단 룰 — 좌→우로 그어지는 헤어라인 */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.4, delay: 0.25, ease: EASE }}
            className="mt-8 h-px w-full origin-left bg-ink/20"
          />

          <h2 className="mt-[6vh] font-display font-black leading-[1.15] text-balance-k text-[clamp(2.2rem,6vw,5.5rem)]">
            <span className="block">
              <TextSplit
                text="여기까지 듣고도 감이 오지 않는다면,"
                per="char"
                stagger={0.032}
                delay={0.3}
              />
            </span>
            <span className="mt-[0.18em] block">
              <TextSplit
                text="비유를 하나 해보자."
                per="char"
                stagger={0.045}
                delay={1.15}
              />
            </span>
          </h2>

          <Reveal delay={1.9} y={28} blur className="mt-[5vh] max-w-[760px]">
            <p className="text-[clamp(1.05rem,1.8vw,1.6rem)] leading-relaxed text-ink/65 text-balance-k">
              인류의 &lsquo;위대한 발명&rsquo;들을 불러와서, 같은 질문을 던져
              보겠다.
            </p>
          </Reveal>

          {/* 증거물 예고 칩 — 다가올 세 실험 */}
          <div className="mt-[9vh] flex flex-wrap items-stretch gap-4">
            {EXHIBITS.map((ex, i) => (
              <motion.div
                key={ex.no}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1, delay: 2.2 + i * 0.18, ease: EASE }}
                className="group relative flex items-center gap-4 border border-ink/20 px-6 py-4"
              >
                <span className="font-mono text-[11px] tracking-[0.3em] text-ink/45">
                  {ex.no}
                </span>
                <span className="font-display text-lg font-bold md:text-xl">
                  {ex.name}
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40">
                  {ex.year}
                </span>
                {/* 모서리 틱 장식 */}
                <span className="absolute -left-px -top-px h-2.5 w-2.5 border-l-2 border-t-2 border-ink/50" />
                <span className="absolute -bottom-px -right-px h-2.5 w-2.5 border-b-2 border-r-2 border-ink/50" />
              </motion.div>
            ))}
          </div>

          {/* 하단 룰 + 마이크로 캡션 */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.4, delay: 2.7, ease: EASE }}
            className="mt-[9vh] h-px w-full origin-right bg-ink/20"
          />
          <Reveal delay={3} y={14} className="mt-5 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink/40 md:text-[11px]">
              SAME QUESTION — THREE TIMES
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink/40 md:text-[11px]">
              EXHIBITS 01–03
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
