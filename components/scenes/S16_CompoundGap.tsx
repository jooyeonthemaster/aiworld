"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Counter from "@/components/ui/Counter";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import TextSplit from "@/components/ui/TextSplit";

const BAR_COUNT = 44;

export default function Scene16() {
  return (
    <section
      data-scene="s16"
      data-act="ACT 3 — 보이지 않는 격차"
      className="relative overflow-hidden bg-ink text-bone"
    >
      {/* 배경 글로우 레이어 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 28%, rgba(232,181,75,0.07), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 animate-pulse-soft"
        style={{
          background:
            "radial-gradient(38% 28% at 50% 40%, rgba(232,181,75,0.05), transparent 70%)",
        }}
      />

      {/* 워터마크 — 거대한 ×37.8 윤곽 */}
      <div
        aria-hidden
        className="text-stroke-gold pointer-events-none absolute -right-[7vw] top-1/2 -translate-y-1/2 rotate-[-8deg] select-none font-mono text-[clamp(10rem,26vw,24rem)] font-bold leading-none opacity-[0.05]"
      >
        {"×37.8"}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1300px] flex-col items-center justify-center px-[6vw] py-[16vh]">
        {/* 헤더 */}
        <Reveal y={18}>
          <Kicker className="justify-center">ACT 3 — COMPOUND INTEREST</Kicker>
        </Reveal>
        <h2 className="mt-8 text-center text-balance-k font-display text-[clamp(2.2rem,6vw,5.5rem)] font-black leading-[1.15] text-bone">
          <TextSplit text="이 격차는, 복리로 벌어진다." per="char" stagger={0.045} delay={0.1} />
        </h2>

        {/* ============ 수식 1 — 골드 (메인 이벤트) ============ */}
        <div className="mt-[9vh] w-full">
          <Reveal delay={0.15} blur>
            <div className="flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3">
              <span className="font-mono text-[clamp(1.15rem,2.4vw,2.1rem)] tracking-tight text-bone/85">
                매일 1% — 1.01³⁶⁵ =
              </span>
              <span
                className="relative inline-block"
                style={{
                  textShadow:
                    "0 0 70px rgba(232,181,75,0.5), 0 0 24px rgba(232,181,75,0.3)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute -inset-x-16 -inset-y-10 animate-pulse-soft rounded-full"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(232,181,75,0.16), transparent 70%)",
                  }}
                />
                <Counter
                  to={37.8}
                  decimals={1}
                  duration={2.8}
                  delay={0.3}
                  className="relative font-mono text-[clamp(4.2rem,11vw,9.5rem)] font-semibold leading-none text-gold"
                />
              </span>
            </div>
          </Reveal>

          {/* 복리 바 스트립 — 365일의 누적 */}
          <div className="mx-auto mt-9 flex h-16 max-w-[760px] items-end justify-center gap-[3px]">
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  delay: 0.5 + i * 0.02,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ height: 5 + Math.pow(i / (BAR_COUNT - 1), 2.5) * 56 }}
                className="w-[5px] origin-bottom rounded-t-[2px] bg-gold/50"
              />
            ))}
          </div>
          <div className="mx-auto mt-2 flex max-w-[760px] items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-bone/35">
            <span>DAY 001</span>
            <span className="mx-4 h-px flex-1 bg-bone/10" />
            <span>DAY 365</span>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-[7vh] h-px w-full max-w-[760px] bg-bone/10" />

        {/* ============ 수식 2 — 헤이즈 (점점 흐려짐) ============ */}
        <HazeEquation />

        {/* 마무리 */}
        <Reveal delay={0.2} y={28} className="mt-[10vh]">
          <p className="text-center text-balance-k font-display text-[clamp(1.25rem,2.6vw,2.1rem)] leading-[1.7] text-bone/75">
            하루하루는 비슷해 보인다. 그러나 3년 뒤, 두 사람은{" "}
            <span className="text-gold">완전히 다른 종(種)</span>이 되어 있다.
          </p>
        </Reveal>

        {/* 모노 각주 */}
        <Reveal delay={0.35} y={14}>
          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/30 md:text-[11px]">
            {"// 1.01^365 = 37.78343433289 — COMPOUNDED DAILY"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* 헤이즈 수식 — 등장 후 서서히 흐려지는 연출 (in-view 기반) */
function HazeEquation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={
          inView
            ? {
                opacity: [0, 1, 0.42],
                y: 0,
                filter: ["blur(8px)", "blur(0px)", "blur(1.5px)"],
              }
            : undefined
        }
        transition={{
          duration: 3.8,
          times: [0, 0.28, 1],
          ease: "easeOut",
          y: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
        }}
        className="flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3"
      >
        <span className="font-mono text-[clamp(1.05rem,2.1vw,1.8rem)] tracking-tight text-haze/90">
          매일 그대로 — 1.00³⁶⁵ =
        </span>
        <span className="font-mono text-[clamp(2.6rem,6.5vw,5.5rem)] font-medium leading-none text-haze">
          1.0
        </span>
      </motion.div>

      {/* 평평한 틱 스트립 — 복리 없는 365일 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.5 } : undefined}
        transition={{ delay: 0.6, duration: 1.4 }}
        className="mx-auto mt-8 flex h-16 max-w-[760px] items-end justify-center gap-[3px]"
      >
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <span key={i} style={{ height: 5 }} className="w-[5px] rounded-t-[2px] bg-haze/30" />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="mx-auto mt-2 flex max-w-[760px] items-center justify-center font-mono text-[10px] uppercase tracking-[0.25em] text-haze/40"
      >
        <span>FLATLINE — NO COMPOUNDING</span>
      </motion.div>
    </div>
  );
}
