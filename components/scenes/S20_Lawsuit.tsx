"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import TextSplit from "@/components/ui/TextSplit";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* 신문 스크랩 데이터 — 카피(비트2)를 몽타주로 분배 */
const CLIPPINGS: { tag: string; headline: string; rotate: number; fillers: number[] }[] = [
  { tag: "PRESS CLIPPING — 2026", headline: "'반미 기업' 낙인.", rotate: -2.5, fillers: [88, 64, 76] },
  { tag: "WIRE — BREAKING", headline: "여론전.", rotate: 1.8, fillers: [70, 92, 58] },
  { tag: "FEDERAL CONTRACTS", headline: "계약은 경쟁사에게로.", rotate: -1.2, fillers: [82, 60, 90] },
];

/* 기울어진 신문 스크랩 카드 */
function PressClip({
  tag,
  headline,
  rotate,
  fillers,
  index,
}: {
  tag: string;
  headline: string;
  rotate: number;
  fillers: number[];
  index: number;
}) {
  return (
    <Reveal delay={0.25 + index * 0.18} y={44}>
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5 + index * 0.9, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
        style={{ rotate }}
        className="relative rounded-[3px] bg-bone p-5 text-ink shadow-[0_24px_60px_rgba(0,0,0,0.55)] md:p-6"
      >
        <div className="mb-3 flex items-center justify-between border-b border-ink/20 pb-2 font-mono text-[8px] tracking-[0.3em] text-ink/50 md:text-[9px]">
          <span>{tag}</span>
          <span className="text-ember/80">A1</span>
        </div>
        <h3 className="text-balance-k font-display text-[clamp(1.2rem,2.2vw,1.8rem)] font-black leading-tight text-ink">
          {headline}
        </h3>
        <div className="mt-4 space-y-[6px]" aria-hidden>
          {fillers.map((w, i) => (
            <div key={i} className="h-[7px] rounded-[1px] bg-ink/75" style={{ width: `${w}%` }} />
          ))}
        </div>
        {/* 찢긴 가장자리 암시 — 하단 점선 */}
        <div className="mt-4 border-t border-dashed border-ink/25 pt-2 font-mono text-[8px] tracking-[0.25em] text-ink/40">
          CONT. ■■■ — P.04
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Scene20() {
  return (
    <section
      data-scene="s20"
      data-act="ACT 4 — 어떤 회사 이야기"
      className="relative overflow-x-clip bg-ink text-bone"
    >
      {/* ---------- 스티키 배경: 기울어진 워터마크 ---------- */}
      <div aria-hidden className="pointer-events-none sticky top-0 z-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="-rotate-12 select-none whitespace-nowrap font-mono text-[clamp(7rem,19vw,19rem)] font-black tracking-tight text-transparent"
            style={{ WebkitTextStroke: "1.5px rgba(242,237,227,0.06)" }}
          >
            A. vs U.S.
          </span>
        </div>
        <div className="absolute inset-x-0 top-0 h-[35vh] bg-gradient-to-b from-ember/[0.05] to-transparent" />
        <div
          className="absolute bottom-[-20%] left-1/2 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(232,181,75,0.06), transparent 70%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 45%, #07060a 96%)" }}
        />
      </div>

      {/* ---------- 콘텐츠 (워터마크 위로 흐름) ---------- */}
      <div className="relative z-10 mx-auto -mt-[100vh] max-w-[1400px] px-[6vw]">
        {/* 비트 1 — 격노 + 스크랩 몽타주 */}
        <div className="flex min-h-screen flex-col justify-center py-[12vh]">
          <Reveal y={18} className="mb-10">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-ember md:text-xs">
              <span className="h-px w-10 bg-ember/60" />
              <span>FILE 20 — THE LAWSUIT</span>
            </div>
          </Reveal>

          <h2 className="mb-[10vh]">
            <TextSplit
              text="행정부는 격노했다."
              per="char"
              stagger={0.055}
              className="text-balance-k font-display text-[clamp(2.4rem,6.5vw,6rem)] font-black leading-[1.12] text-bone"
            />
          </h2>

          {/* 비트 2 — 헤드라인 몽타주 */}
          <div className="grid gap-7 md:grid-cols-3 md:gap-9">
            {CLIPPINGS.map((c, i) => (
              <PressClip key={c.headline} {...c} index={i} />
            ))}
          </div>
        </div>

        {/* 비트 3 — 보복이 쏟아지자 */}
        <div className="flex min-h-[70vh] items-center justify-center">
          <Reveal blur>
            <p className="text-balance-k text-center font-display text-[clamp(1.4rem,3vw,2.5rem)] font-bold leading-snug text-bone/75">
              보복이 쏟아지자, 앤트로픽은 —
            </p>
          </Reveal>
        </div>

        {/* 메가 타이틀 — 소송 */}
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="mb-10 h-px w-[min(520px,70vw)] origin-center bg-bone/25"
          />
          <h2 className="space-y-2">
            <span className="block">
              <TextSplit
                text="미합중국 정부를 상대로"
                per="char"
                stagger={0.05}
                className="text-balance-k font-display text-[clamp(2.2rem,6vw,5.6rem)] font-bold leading-[1.15] text-bone"
              />
            </span>
            <span className="block">
              <TextSplit
                text="소송을 걸었다."
                per="char"
                stagger={0.06}
                delay={0.5}
                className="text-balance-k font-display text-[clamp(2.8rem,8vw,7.5rem)] font-black leading-[1.1] text-bone"
              />
            </span>
          </h2>
          <Reveal delay={1.4} y={14} className="mt-12">
            <span className="font-mono text-[9px] tracking-[0.45em] text-bone/35 md:text-[10px]">
              ANTHROPIC v. UNITED STATES — FILED
            </span>
          </Reveal>
        </div>

        {/* 1박자 침묵 — 의도된 여백 */}
        <div aria-hidden className="h-[55vh]" />

        {/* 단독 비트 — 그리고, 이겼다 */}
        <div className="relative flex min-h-screen items-center justify-center">
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-25% 0px" }}
            transition={{ duration: 1.8, ease: EASE }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
            style={{ background: "radial-gradient(circle, rgba(232,181,75,0.13), transparent 65%)" }}
          />
          <div
            className="relative text-center"
            style={{ textShadow: "0 0 60px rgba(232,181,75,0.4), 0 0 140px rgba(232,181,75,0.18)" }}
          >
            <TextSplit
              text="그리고 — 이겼다."
              per="char"
              stagger={0.07}
              delay={0.2}
              className="text-balance-k font-display text-[clamp(3rem,9vw,8.5rem)] font-black leading-[1.08] text-gold"
            />
          </div>
        </div>

        {/* 캡션 + 사건 종결 */}
        <div className="flex flex-col items-center pb-[20vh] text-center">
          <Reveal blur className="max-w-[860px]">
            <p className="text-balance-k text-[clamp(1.05rem,1.8vw,1.6rem)] leading-relaxed text-bone/60">
              역사상 어떤 스타트업도 가보지 않은 길. 다윗이 골리앗에게, 원칙으로 이긴 기록.
            </p>
          </Reveal>
          <Reveal delay={0.5} y={14} className="mt-12">
            <div className="flex items-center gap-4 font-mono text-[9px] tracking-[0.4em] text-gold/50 md:text-[10px]">
              <span className="h-px w-8 bg-gold/30" />
              <span>CASE NO. 26-CV-0610 — CLOSED</span>
              <span className="h-px w-8 bg-gold/30" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
