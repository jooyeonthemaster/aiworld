"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import Starfield from "@/components/ui/Starfield";
import TextSplit from "@/components/ui/TextSplit";

export default function Scene26() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 어둠 → 새벽: 하단에서 골드 새벽빛이 차오른다
  const dawnY = useTransform(scrollYProgress, [0.05, 0.55], ["42%", "0%"]);
  const dawnOpacity = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);
  const sunScale = useTransform(scrollYProgress, [0.1, 0.65], [0.72, 1.18]);
  const starsOpacity = useTransform(scrollYProgress, [0.25, 0.7], [0.85, 0.2]);
  const horizonScale = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);
  const yearsScale = useTransform(scrollYProgress, [0.35, 0.62], [0, 1]);

  return (
    <section
      ref={ref}
      data-scene="s26"
      data-act="ACT 5 — 올라타는 법"
      className="relative overflow-hidden bg-ink text-bone"
    >
      <div className="relative flex min-h-[135vh] flex-col items-center justify-center px-[6vw] py-[20vh] text-center">
        {/* 별 — 새벽이 밝아오며 서서히 사라진다 */}
        <motion.div style={{ opacity: starsOpacity }} className="absolute inset-0">
          <div className="relative h-full w-full">
            <Starfield density={95} opacity={0.5} drift={0.04} />
          </div>
        </motion.div>

        {/* 새벽빛 레이어 — 스크롤 진입에 따라 상승 */}
        <motion.div
          style={{ y: dawnY, opacity: dawnOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[80vh]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-gold/[0.06] to-transparent" />
          {/* 지평선 너머의 태양 글로우 */}
          <div className="absolute -bottom-[46vh] left-1/2 h-[85vh] w-[150vw] -translate-x-1/2">
            <motion.div
              style={{
                scale: sunScale,
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(255,211,122,0.32), rgba(232,181,75,0.1) 46%, transparent 72%)",
              }}
              className="h-full w-full rounded-[50%]"
            />
          </div>
          {/* 지평선 라인 */}
          <div className="absolute bottom-[9vh] left-1/2 w-[72vw] -translate-x-1/2">
            <motion.div
              style={{ scaleX: horizonScale }}
              className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent"
            />
          </div>
        </motion.div>

        {/* 측면 모노 캡션 (장식) */}
        <div className="pointer-events-none absolute left-[3vw] top-1/2 z-10 hidden -translate-y-1/2 md:block">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.5em] text-bone/25"
            style={{ writingMode: "vertical-rl" }}
          >
            FROM DARKNESS — TO DAWN
          </span>
        </div>

        {/* ============ 콘텐츠 ============ */}
        <div className="relative z-10 flex w-full max-w-[1100px] flex-col items-center">
          <Reveal y={18}>
            <Kicker>ACT 5 — 올라타는 법</Kicker>
          </Reveal>

          <h2 className="mt-10 text-balance-k font-display text-[clamp(2.6rem,7vw,6.3rem)] font-black leading-[1.18]">
            <TextSplit
              text="그래서 우리는,"
              per="char"
              stagger={0.05}
              delay={0.1}
              className="block text-bone"
            />
            <TextSplit
              text="거인의 어깨에 올라탄다."
              per="char"
              stagger={0.05}
              delay={0.6}
              className="block text-gold"
            />
          </h2>

          {/* 세로 골드 헤어라인 */}
          <Reveal delay={0.5} y={0} className="mt-12">
            <div className="mx-auto h-12 w-px bg-gradient-to-b from-gold/70 to-transparent" />
          </Reveal>

          {/* 뉴턴 인용 — 작고 단정하게 */}
          <Reveal delay={0.6} y={22} blur className="mt-8">
            <p className="text-balance-k font-mono text-[11px] leading-relaxed tracking-[0.06em] text-bone/55 md:text-sm">
              {`"내가 더 멀리 보았다면, 그것은 거인들의 어깨 위에 서 있었기 때문이다." — 아이작 뉴턴, 1675`}
            </p>
          </Reveal>

          {/* 350년 타임 스팬 (장식) */}
          <Reveal delay={0.75} y={14} className="mt-10 w-full max-w-[520px]">
            <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-bone/35">
              <span>1675</span>
              <span className="relative h-px flex-1 bg-bone/15">
                <motion.span
                  style={{ scaleX: yearsScale }}
                  className="absolute inset-0 origin-left bg-gold/50"
                />
              </span>
              <span>2026</span>
            </div>
            <div className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-bone/25">
              350 YEARS
            </div>
          </Reveal>

          {/* 마무리 — 크게 */}
          <Reveal delay={0.25} y={30} className="mt-[9vh]">
            <p className="text-balance-k font-display text-[clamp(1.35rem,2.9vw,2.4rem)] leading-[1.65] text-bone/85">
              350년 뒤 — 그 거인이 진짜로 나타났다. 그리고 지금,{" "}
              <span className="text-gold-bright">누구에게나</span> 어깨를 내어주고 있다.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
