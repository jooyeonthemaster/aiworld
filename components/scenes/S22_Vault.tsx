"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import TextSplit from "@/components/ui/TextSplit";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** 점호 명단 — 빅테크 & 월스트리트 보안 책임자들 */
const ATTENDEES = [
  { name: "GOOGLE", code: "ATTENDEE 01", div: "BIG TECH" },
  { name: "AMAZON", code: "ATTENDEE 02", div: "BIG TECH" },
  { name: "MICROSOFT", code: "ATTENDEE 03", div: "BIG TECH" },
  { name: "GOLDMAN SACHS", code: "ATTENDEE 04", div: "WALL STREET" },
  { name: "JP MORGAN", code: "ATTENDEE 05", div: "WALL STREET" },
];

/** 점호 간격 (초) — 호명하듯 무겁게 */
const STEP = 0.55;

export default function Scene22() {
  return (
    <section
      data-scene="s22"
      data-act="ACT 4 — 어떤 회사 이야기"
      className="relative overflow-hidden bg-ink text-bone"
    >
      {/* ===== 배경 레이어: 기밀 브리핑룸 ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* 미세 그리드 — 보안 시설 도면 느낌 */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.035) 1px, transparent 1px)",
            backgroundSize: "88px 88px",
          }}
        />
        {/* 상단 골드 글로우 — 회의실 조명 */}
        <div
          className="absolute -top-[30vh] left-1/2 h-[70vh] w-[120vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 50% 0%, rgba(232,181,75,0.10) 0%, rgba(232,181,75,0.03) 45%, transparent 72%)",
          }}
        />
        {/* 하단 비네트 */}
        <div
          className="absolute inset-x-0 bottom-0 h-[40vh]"
          style={{
            background: "linear-gradient(to top, rgba(7,6,10,0.9), transparent)",
          }}
        />
      </div>

      {/* ===== 도시에 파일 장식: 헤더 스트립 + 코너 브래킷 ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[6vw] pt-7 font-mono text-[10px] tracking-[0.3em] text-bone/30 uppercase"
      >
        <span>Confidential // Pre-Release Briefing</span>
        <span className="hidden md:inline">Eyes Only — 2026.06</span>
      </div>
      <span aria-hidden className="pointer-events-none absolute left-[4vw] top-16 h-6 w-6 border-l border-t border-gold/25" />
      <span aria-hidden className="pointer-events-none absolute right-[4vw] top-16 h-6 w-6 border-r border-t border-gold/25" />
      <span aria-hidden className="pointer-events-none absolute bottom-10 left-[4vw] h-6 w-6 border-b border-l border-gold/25" />
      <span aria-hidden className="pointer-events-none absolute bottom-10 right-[4vw] h-6 w-6 border-b border-r border-gold/25" />
      {/* 세로 도시에 라벨 */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[2vw] top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.5em] text-bone/15 uppercase lg:block"
      >
        Dossier 22 — The Vault
      </div>

      {/* ===== 콘텐츠 ===== */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-[6vw] py-[18vh]">
        <Reveal>
          <Kicker>ACT 4 — 공개 전야</Kicker>
        </Reveal>

        {/* 내러티브 타이틀 */}
        <h2 className="mt-10 font-display font-bold leading-[1.15] text-[clamp(2.2rem,6vw,5.5rem)] text-balance-k">
          <TextSplit text="그래서 공개 전, 초유의 일이 벌어진다." per="char" stagger={0.035} delay={0.15} />
        </h2>
        <Reveal delay={0.7} blur>
          <p className="mt-7 max-w-3xl text-[clamp(1.05rem,1.8vw,1.6rem)] leading-relaxed text-bone/70 text-balance-k">
            빅테크와 월스트리트의 보안 책임자들이, 한자리에 소집됐다.
          </p>
        </Reveal>

        {/* ===== 기업명 점호 ===== */}
        <RollCall />

        {/* ===== 인용 — 거대 따옴표 장식 ===== */}
        <Reveal y={48} blur className="relative mt-[18vh]">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-[0.35em] -top-[0.5em] select-none font-display leading-none text-[clamp(7rem,16vw,14rem)] text-gold/15"
          >
            &ldquo;
          </span>
          <blockquote className="relative max-w-4xl pl-[clamp(2rem,5vw,4.5rem)]">
            <p className="font-display font-semibold leading-[1.4] text-[clamp(1.5rem,3.4vw,3rem)] text-bone text-balance-k">
              &ldquo;먼저 드린다. 이 모델로 당신들의 방어부터 메우라. — 시간이 없다.&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-bone/40">
              <span className="h-px w-10 bg-gold/50" />
              <span>Briefing Transcript — Sealed</span>
            </footer>
          </blockquote>
        </Reveal>

        {/* ===== 펀치라인 ===== */}
        <div className="mt-[16vh]">
          <h3 className="font-display font-black leading-[1.2] text-[clamp(2rem,5.5vw,4.8rem)] text-gold text-balance-k">
            <TextSplit text="골드만삭스가, 모델 하나 때문에 집합했다." per="char" stagger={0.04} />
          </h3>
        </div>

        {/* ===== 마무리 캡션 ===== */}
        <Reveal delay={0.3} blur className="mt-[10vh]">
          <div className="flex items-start gap-4">
            <span className="mt-[0.55em] h-px w-12 shrink-0 bg-bone/25" />
            <p className="max-w-2xl font-mono text-sm leading-relaxed tracking-wide text-bone/50 md:text-base text-balance-k">
              세상이 그 이름을 알기도 전에 — 세상에서 가장 영리한 돈들은 이미 움직이고 있었다.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   RollCall — 기업명이 점호하듯 하나씩 호명되는 명단
   ============================================================ */
function RollCall() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });

  return (
    <ol ref={ref} className="relative mt-[12vh] space-y-2 md:space-y-3">
      {/* 좌측 골드 수직선 — 점호가 진행되며 아래로 자람 */}
      <motion.span
        aria-hidden
        className="absolute -left-[clamp(1rem,3vw,2.5rem)] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-gold/70 via-gold/35 to-transparent"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : undefined}
        transition={{ duration: STEP * ATTENDEES.length + 0.8, ease: "linear" }}
      />

      {ATTENDEES.map((a, i) => {
        const delay = 0.25 + i * STEP;
        return (
          <motion.li
            key={a.name}
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.9, delay, ease: EASE }}
            className="group flex items-baseline gap-4 border-b border-bone/8 pb-3 md:gap-6 md:pb-4"
          >
            {/* 호명 불릿 — 점등 */}
            <motion.span
              aria-hidden
              className="relative top-[-0.1em] h-2.5 w-2.5 shrink-0 rotate-45 bg-gold md:h-3 md:w-3"
              style={{ boxShadow: "0 0 18px rgba(232,181,75,0.65)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : undefined}
              transition={{ duration: 0.5, delay: delay + 0.18, ease: EASE }}
            />

            {/* 출석 번호 */}
            <motion.span
              className="hidden w-24 shrink-0 font-mono text-[10px] tracking-[0.25em] text-bone/30 uppercase md:inline-block"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.6, delay: delay + 0.1 }}
            >
              {a.code}
            </motion.span>

            {/* 기업명 — bone/40 에서 호명 시 bone 으로 점등 */}
            <motion.span
              className="font-mono font-bold leading-none tracking-[-0.01em] text-[clamp(1.6rem,4.2vw,3.8rem)] whitespace-nowrap"
              initial={{ color: "rgba(242,237,227,0.32)" }}
              animate={inView ? { color: "#F2EDE3" } : undefined}
              transition={{ duration: 0.7, delay: delay + 0.22, ease: EASE }}
            >
              {a.name}
            </motion.span>

            {/* 점선 리더 */}
            <motion.span
              aria-hidden
              className="hidden flex-1 translate-y-[-0.35em] border-b border-dotted border-bone/15 sm:block"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.8, delay: delay + 0.3 }}
            />

            {/* 소속 + 확인 스탬프 */}
            <motion.span
              className="hidden shrink-0 text-right font-mono text-[10px] tracking-[0.25em] uppercase sm:block"
              initial={{ opacity: 0, y: 6 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: delay + 0.38, ease: EASE }}
            >
              <span className="text-bone/30">{a.div}</span>
              <span className="ml-3 text-gold/80">// Confirmed</span>
            </motion.span>
          </motion.li>
        );
      })}

      {/* 명단 마감 라벨 */}
      <motion.div
        aria-hidden
        className="flex items-center gap-3 pt-4 font-mono text-[10px] tracking-[0.35em] uppercase text-bone/25"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 0.25 + ATTENDEES.length * STEP + 0.4 }}
      >
        <span className="h-px w-8 bg-bone/20" />
        <span>Roll Call Complete — 05 / 05</span>
      </motion.div>
    </ol>
  );
}
