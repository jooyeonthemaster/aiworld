"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import Starfield from "@/components/ui/Starfield";
import TextSplit from "@/components/ui/TextSplit";

const ACT = "FINALE — 거인의 어깨 위에서";

export default function Scene29() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  /* 마지막 닫는 골드 수평선 — 페이지 최하단에 닿을수록 좌우로 그어진다 */
  const closeLine = useTransform(scrollYProgress, [0.68, 0.98], [0, 1]);
  /* 센터 잔광 호흡 */
  const glowO = useTransform(scrollYProgress, [0.15, 0.7], [0, 0.5]);
  /* 고스트 타이포 미세 패럴랙스 (S01 타이틀의 에코) */
  const ghostY = useTransform(scrollYProgress, [0, 1], [70, -50]);

  return (
    <section
      ref={ref}
      data-scene="s29"
      data-act={ACT}
      className="relative overflow-hidden bg-ink text-bone"
    >
      {/* ===== 배경 레이어 ===== */}
      {/* 희미한 별 — S01 수미상관 */}
      <Starfield density={70} color="232,181,75" opacity={0.26} drift={0.03} maxRadius={1.3} />

      {/* S28 새벽의 잔광 (상단에서 스며듦) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[28vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(232,181,75,0.07), rgba(7,6,10,0))",
        }}
      />

      {/* 센터 골드 잔광 — 느린 호흡 */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="absolute inset-0">
        <div
          className="animate-pulse-soft absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(232,181,75,0.1) 0%, rgba(7,6,10,0) 65%)",
          }}
        />
      </motion.div>

      {/* 고스트 타이포 — 오프닝 타이틀의 메아리 */}
      <motion.div
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="font-display text-[clamp(8rem,28vw,26rem)] font-black leading-none text-stroke-bone opacity-[0.04]">
          거인
        </span>
      </motion.div>

      {/* ===== 코너 마이크로 라벨 ===== */}
      <Reveal delay={0.2} y={0} duration={1.6} className="pointer-events-none absolute inset-x-[6vw] top-[6vh] z-20 flex items-center justify-between font-mono text-[10px] tracking-[0.4em] uppercase text-bone/30">
        <span>Scene 29 / 29</span>
        <span>Echo</span>
      </Reveal>

      {/* ===== 본문 ===== */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1100px] flex-col items-center justify-center px-[6vw] py-[18vh] text-center">
        {/* 에필로그 킥커 */}
        <Reveal y={20} duration={1.4}>
          <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.45em] uppercase text-gold/70">
            <span className="h-px w-10 bg-gold/40" />
            <span>Epilogue — Echo</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </Reveal>

        {/* 두 질문 — 작고 단정하게 재등장 */}
        <div className="mt-[9vh] flex flex-col gap-[5.5vh]">
          <Reveal delay={0.15} y={28} blur duration={1.5}>
            <p className="font-mono text-[10px] tracking-[0.5em] text-haze">Q.01</p>
            <p className="mt-4 font-display text-[clamp(1.4rem,2.6vw,2.5rem)] font-semibold leading-[1.55] text-bone/70 text-balance-k">
              당신은 지금, AI를 얼마나 활용하고 있습니까.
            </p>
          </Reveal>

          <Reveal delay={0.5} y={28} blur duration={1.5}>
            <p className="font-mono text-[10px] tracking-[0.5em] text-haze">Q.02</p>
            <p className="mt-4 font-display text-[clamp(1.4rem,2.6vw,2.5rem)] font-semibold leading-[1.55] text-bone/70 text-balance-k">
              AI가 일으키는 변화에, 얼마나 민감하게 반응하고 있습니까.
            </p>
          </Reveal>
        </div>

        {/* 행동 제안 — 골드 */}
        <div className="mt-[11vh]">
          <Reveal delay={0.1} y={16} duration={1.3}>
            <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-gold/60">
              One Last Thing
            </p>
          </Reveal>
          <h2 className="mt-5">
            <TextSplit
              text="이번 주 — 검색 대신, 질문 하나로 시작해 보십시오."
              per="char"
              stagger={0.03}
              delay={0.35}
              duration={1.1}
              className="font-display text-[clamp(1.5rem,3.1vw,3rem)] font-bold leading-[1.45] text-gold text-balance-k"
            />
          </h2>
        </div>

        {/* 닫는 골드 수평선 — 스크롤 끝에서 좌우로 그어짐 */}
        <div className="relative mt-[10vh] flex w-screen justify-center">
          <motion.div
            aria-hidden
            style={{ scaleX: closeLine }}
            className="h-px w-full origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent"
          />
        </div>

        {/* 크레딧 */}
        <div className="mt-[8vh] flex flex-col items-center gap-3 font-mono text-[10px] leading-relaxed tracking-[0.18em] text-haze md:text-[11px]">
          <Reveal delay={0.1} y={14} duration={1.4}>
            <p>거인의 어깨 위에서 — AI 시대에 살아남기 / 2026.06</p>
          </Reveal>
          <Reveal delay={0.3} y={14} duration={1.4}>
            <p className="text-balance-k">
              MADE WITH FABLE 5 — 발표자가 어제부터 하루 종일 쓰고 있는, 바로 그 모델.
            </p>
          </Reveal>
        </div>

        {/* FIN. + 점멸 캐럿 */}
        <Reveal delay={0.55} y={10} duration={1.6} className="mt-[7vh]">
          <p className="flex items-center gap-3 font-mono text-sm tracking-[0.6em] uppercase text-bone/80">
            <span>FIN.</span>
            <span className="animate-blink-caret inline-block h-[1.05em] w-[0.55em] translate-y-[1px] bg-gold" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
