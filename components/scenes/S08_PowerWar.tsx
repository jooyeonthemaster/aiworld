"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Counter from "@/components/ui/Counter";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import TextSplit from "@/components/ui/TextSplit";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Scene08() {
  return (
    <section
      data-scene="s08"
      data-act="ACT 1 — 3년 전, 우리는 웃었다"
      className="relative min-h-screen overflow-hidden bg-ink text-bone"
    >
      {/* ── 배경: 상단에서 내려오는 ember 글로우 ── */}
      <div
        aria-hidden
        className="animate-pulse-soft absolute inset-x-0 -top-[18vh] h-[70vh]"
        style={{
          background:
            "radial-gradient(58% 62% at 50% 0%, rgba(255,75,46,0.20), transparent 72%)",
        }}
      />
      {/* 좌우 진영의 은은한 열기 */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(26% 40% at 12% 48%, rgba(255,75,46,0.06), transparent 75%), radial-gradient(26% 40% at 88% 48%, rgba(255,75,46,0.06), transparent 75%)",
        }}
      />
      {/* 가는 그리드 — 전선/지도 암시 */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,237,227,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.6) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage:
            "radial-gradient(70% 70% at 50% 45%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(70% 70% at 50% 45%, black 30%, transparent 100%)",
        }}
      />
      {/* 하단 비네트 */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-ink to-transparent"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center gap-12 px-[6vw] py-[14vh] md:gap-14">
        {/* ── 헤더 ── */}
        <div className="flex flex-col items-center gap-7 text-center">
          <Reveal y={18}>
            <Kicker tone="ember" className="justify-center">
              ACT 1 — 패권 전쟁
            </Kicker>
          </Reveal>
          <h2 className="text-balance-k font-display font-black leading-[1.08]">
            <TextSplit
              text="이미, 전쟁은 시작됐다."
              per="char"
              stagger={0.06}
              delay={0.25}
              className="text-[clamp(2.4rem,6.5vw,6rem)] text-bone"
            />
          </h2>
          <Reveal delay={0.9} y={22} blur>
            <p className="max-w-3xl text-balance-k text-[clamp(1rem,1.7vw,1.4rem)] leading-relaxed text-bone/65">
              미국과 중국 — 두 제국이 AI 패권을 놓고 천문학적인 인프라 투자를
              쏟아붓는다.
            </p>
          </Reveal>
        </div>

        {/* ── 중앙 대치: UNITED STATES vs CHINA ── */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5 md:gap-10">
          {/* 좌 — 미국 */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-18% 0px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            className="text-right"
          >
            <div className="mb-3 ml-auto h-px w-16 bg-ember/50 md:w-24" />
            <p className="font-mono text-[clamp(1.1rem,2.8vw,2.6rem)] font-bold leading-tight tracking-[0.18em] text-bone">
              UNITED
              <br className="md:hidden" /> STATES
            </p>
            <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-[0.14em] text-bone/40 md:text-[11px]">
              스타게이트 동맹 — 4년 · 5,000억 달러
            </p>
          </motion.div>

          {/* 중앙 — VS */}
          <motion.div
            initial={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-18% 0px" }}
            transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
            className="relative px-2 md:px-6"
          >
            <span
              aria-hidden
              className="animate-pulse-soft absolute inset-0 flex items-center justify-center font-display text-[clamp(3.2rem,9vw,8.5rem)] font-black text-ember opacity-50 blur-2xl"
            >
              VS
            </span>
            <span
              className="relative font-display text-[clamp(3.2rem,9vw,8.5rem)] font-black leading-none"
              style={{ WebkitTextStroke: "2px rgba(255,75,46,0.85)", color: "transparent" }}
            >
              VS
            </span>
          </motion.div>

          {/* 우 — 중국 */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-18% 0px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            className="text-left"
          >
            <div className="mb-3 h-px w-16 bg-ember/50 md:w-24" />
            <p className="font-mono text-[clamp(1.1rem,2.8vw,2.6rem)] font-bold leading-tight tracking-[0.18em] text-bone">
              CHINA
            </p>
            <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-[0.14em] text-bone/40 md:text-[11px]">
              국가 데이터센터망 — 5년 · 2조 위안
            </p>
          </motion.div>
        </div>

        {/* ── 투자 카운터 3 (검증 팩트 기준) ── */}
        <div className="grid gap-10 border-t border-ember/20 pt-10 md:grid-cols-3 md:gap-8">
          <WarStat
            delay={0.15}
            value={
              <Counter
                to={500}
                prefix="$"
                suffix="B+"
                duration={2.2}
                className="font-mono text-[clamp(2.8rem,5.2vw,4.8rem)] font-bold text-ember"
              />
            }
            desc="스타게이트 프로젝트 — 단일 AI 데이터센터 동맹에 걸린 돈"
            note="2025.01 발표 — 단일 프로젝트 사상 최대급"
          />
          <WarStat
            delay={0.35}
            value={
              <Counter
                to={725}
                prefix="$"
                suffix="B"
                duration={2.2}
                className="font-mono text-[clamp(2.8rem,5.2vw,4.8rem)] font-bold text-ember"
              />
            }
            desc="빅테크가 한 해에 쏟아붓는 AI 인프라 투자"
            note="2026년 4사 합계 — 전년 대비 77% 폭증"
          />
          <WarStat
            delay={0.55}
            value={
              <Counter
                to={1100}
                suffix="TWh"
                duration={2.2}
                className="font-mono text-[clamp(2.8rem,5.2vw,4.8rem)] font-bold text-ember"
              />
            }
            desc="전 세계 데이터센터가 한 해에 삼키는 전력"
            note="일본 전체 소비량 — 나라로 치면 세계 5위"
          />
        </div>

        {/* ── 마무리 선언 ── */}
        <div className="mx-auto mt-2 max-w-5xl text-center">
          <Reveal delay={0.2} y={36} blur>
            <p className="text-balance-k font-display text-[clamp(1.5rem,3vw,2.7rem)] font-bold leading-[1.5] text-bone">
              {"이것을 '버블'이라 부르기엔 — 국가들이 너무 진지하다."}
            </p>
          </Reveal>
          <Reveal delay={0.6} y={20}>
            <p className="mt-7 font-mono text-[clamp(0.8rem,1.3vw,1rem)] tracking-[0.45em] text-ember/80">
              전기, 토지, 반도체, 인재.
            </p>
          </Reveal>
          <Reveal delay={0.9} y={28} blur>
            <p className="mt-7 text-balance-k font-display text-[clamp(1.3rem,2.4vw,2.1rem)] font-bold leading-[1.5] text-bone/85">
              문명의 자원이 한 점으로 빨려 들어가고 있다.
            </p>
          </Reveal>
          {/* 한 점으로 수렴하는 라인 장식 */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 1.6, delay: 1.3, ease: EASE }}
            className="mx-auto mt-10 h-px w-[min(420px,56vw)] origin-center bg-gradient-to-r from-ember/0 via-ember/70 to-ember/0"
          />
        </div>
      </div>
    </section>
  );
}

function WarStat({
  value,
  desc,
  note,
  delay,
}: {
  value: ReactNode;
  desc: string;
  note: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} y={30} className="text-center md:text-left">
      <div className="tabular-nums leading-none">{value}</div>
      <p className="mt-4 text-balance-k text-[14px] leading-relaxed text-bone/65 md:text-[15px]">
        {desc}
      </p>
      <p className="mt-2 font-mono text-[10px] tracking-[0.1em] text-bone/35">
        — {note}
      </p>
    </Reveal>
  );
}
