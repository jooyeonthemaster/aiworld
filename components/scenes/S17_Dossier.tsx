"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import TextSplit from "@/components/ui/TextSplit";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ------------------------------------------------------------------ */
/* 타자기 한 줄 — start 가 true 가 된 뒤 delay(ms) 후 글자가 찍힌다     */
/* ------------------------------------------------------------------ */
function TypeLine({
  text,
  start,
  delay,
  labelLen,
  speed = 38,
  className = "",
}: {
  text: string;
  start: boolean;
  delay: number;
  labelLen: number;
  speed?: number;
  className?: string;
}) {
  const [n, setN] = useState(0);
  const [begun, setBegun] = useState(false);

  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setBegun(true), delay);
    return () => clearTimeout(t);
  }, [start, delay]);

  useEffect(() => {
    if (!begun || n >= text.length) return;
    const t = setTimeout(() => setN((v) => v + 1), speed);
    return () => clearTimeout(t);
  }, [begun, n, text.length, speed]);

  const done = n >= text.length;
  const chars = Array.from(text).slice(0, n);

  return (
    <span className={`inline-flex items-baseline whitespace-pre font-mono ${className}`}>
      <span>
        {chars.map((c, i) => (
          <span key={i} className={i < labelLen ? "text-haze" : "text-bone"}>
            {c}
          </span>
        ))}
      </span>
      {begun && !done && (
        <span className="ml-[3px] inline-block h-[1em] w-[0.55em] translate-y-[0.12em] bg-gold/90" />
      )}
    </span>
  );
}

/* REDACTED 바 — 검은 블록이 좌→우로 한 칸씩 채워진다 (카피: ■■■■■■■■■) */
function RedactedBlocks({ start, delay }: { start: boolean; delay: number }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [start, delay]);

  return (
    <span aria-label="■■■■■■■■■" className="ml-1 inline-flex items-center gap-[3px]">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={on ? { scaleX: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.26, delay: i * 0.085, ease: EASE }}
          className="inline-block h-[1.02em] w-[0.6em] origin-left bg-bone/85"
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
export default function Scene17() {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-22% 0px" });

  return (
    <section
      data-scene="s17"
      data-act="ACT 4 — 어떤 회사 이야기"
      className="relative overflow-hidden bg-ink text-bone"
    >
      {/* ---------- 배경 레이어 ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* 미세 그리드 — 수사 보드 느낌 */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 45%, transparent 30%, #07060a 92%)",
          }}
        />
        {/* 골드 글로우 + 엠버 경고 기운 */}
        <div
          className="absolute -left-[15%] top-[8%] h-[55vh] w-[55vw] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(232,181,75,0.07), transparent 70%)" }}
        />
        <div
          className="absolute -right-[12%] bottom-[5%] h-[45vh] w-[45vw] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(255,75,46,0.05), transparent 70%)" }}
        />
        {/* 거대 워터마크 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="-rotate-12 select-none whitespace-nowrap font-mono text-[clamp(6rem,17vw,17rem)] font-black tracking-tight text-transparent"
            style={{ WebkitTextStroke: "1.5px rgba(242,237,227,0.045)" }}
          >
            CASE FILE
          </span>
        </div>
      </div>

      {/* ---------- 콘텐츠 ---------- */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-[6vw] py-[14vh]">
        <Reveal y={20} className="mb-12 self-center">
          <Kicker tone="gold">ACT 4 — CASE FILE</Kicker>
        </Reveal>

        {/* ---------- 도시에 카드 ---------- */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 56, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.8 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative w-[min(560px,90vw)] rounded-md border border-bone/15 bg-coal p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:p-10"
        >
          {/* 폴더 탭 */}
          <div className="absolute -top-[26px] left-6 rounded-t-md border border-b-0 border-bone/15 bg-coal px-4 py-1 font-mono text-[9px] tracking-[0.32em] text-bone/45">
            DOSSIER NO. A-017
          </div>
          {/* 클립 장식 */}
          <div aria-hidden className="absolute -top-5 right-12">
            <div className="h-11 w-5 rounded-full border-2 border-bone/35" />
            <div className="absolute left-1/2 top-[10px] h-8 w-[9px] -translate-x-1/2 rounded-full border-2 border-bone/25" />
          </div>
          {/* 코너 브래킷 */}
          <span aria-hidden className="absolute left-2 top-2 h-4 w-4 border-l border-t border-gold/40" />
          <span aria-hidden className="absolute right-2 top-2 h-4 w-4 border-r border-t border-gold/40" />
          <span aria-hidden className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-gold/40" />
          <span aria-hidden className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-gold/40" />

          {/* 스캔라인 스윕 */}
          <motion.div
            aria-hidden
            initial={{ top: "-18%" }}
            animate={cardInView ? { top: ["-18%", "112%"] } : undefined}
            transition={{ duration: 5.2, repeat: Infinity, ease: "linear", delay: 0.8 }}
            className="pointer-events-none absolute inset-x-0 h-14 bg-gradient-to-b from-transparent via-gold/[0.06] to-transparent"
          />

          {/* 메타 헤더 */}
          <div className="mb-5 flex items-center justify-between border-b border-bone/10 pb-4 font-mono text-[9px] tracking-[0.3em] text-bone/40 md:text-[10px]">
            <span>EYES ONLY</span>
            <span className="text-gold/60">2026.06 — REV.4</span>
          </div>

          {/* 타자기 본문 */}
          <div className="space-y-3 text-[13px] leading-relaxed tracking-wider md:space-y-4 md:text-[15px]">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] text-bone/25">01</span>
              <TypeLine text="대상: ANTHROPIC" start={cardInView} delay={700} labelLen={3} />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] text-bone/25">02</span>
              <TypeLine text="설립: 2021 — 샌프란시스코" start={cardInView} delay={1800} labelLen={3} />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] text-bone/25">03</span>
              <TypeLine text="분류: AI 연구기업" start={cardInView} delay={2900} labelLen={3} />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] text-bone/25">04</span>
              <span className="inline-flex items-baseline">
                <TypeLine text="상태: " start={cardInView} delay={4000} labelLen={4} />
                <RedactedBlocks start={cardInView} delay={4400} />
              </span>
            </div>
          </div>

          {/* CLASSIFIED 도장 */}
          <motion.div
            initial={{ opacity: 0, scale: 1.7, rotate: 14 }}
            animate={cardInView ? { opacity: 1, scale: 1, rotate: 9 } : undefined}
            transition={{ duration: 0.32, delay: 5.5, ease: EASE }}
            className="pointer-events-none absolute -right-3 top-[34%] border-[3px] border-ember/80 px-3 py-1"
            style={{ boxShadow: "0 0 30px rgba(255,75,46,0.18)" }}
          >
            <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-ember/90 md:text-xs">
              CLASSIFIED
            </span>
          </motion.div>

          {/* 바코드 푸터 */}
          <div className="mt-8 flex items-end justify-between border-t border-bone/10 pt-4">
            <div className="flex h-7 items-end gap-[2px]" aria-hidden>
              {Array.from({ length: 26 }).map((_, i) => {
                const v = ((i * 37) % 89) / 89;
                return (
                  <span
                    key={i}
                    className="inline-block bg-bone/55"
                    style={{ width: `${1 + Math.round(v * 3)}px`, height: `${60 + v * 40}%` }}
                  />
                );
              })}
            </div>
            <span className="font-mono text-[9px] tracking-[0.3em] text-bone/35">
              SCAN — 2026.06
            </span>
          </div>
        </motion.div>

        {/* ---------- 타이틀 + 서브 ---------- */}
        <h2 className="mt-16 text-center md:mt-20">
          <TextSplit
            text="여기, 한 회사의 이야기가 있다."
            per="char"
            stagger={0.045}
            delay={0.2}
            className="text-balance-k font-display text-[clamp(2.2rem,6vw,5.5rem)] font-bold leading-[1.15] text-bone"
          />
        </h2>
        <Reveal delay={0.7} blur className="mt-7 max-w-[760px] text-center">
          <p className="text-balance-k text-[clamp(1.05rem,1.8vw,1.6rem)] leading-relaxed text-bone/60">
            이 이야기를 끝까지 들으면 — &apos;민감하게 반응한다&apos;는 말의 의미가 달라질
            것이다.
          </p>
        </Reveal>

        {/* 하단 모노 마감 */}
        <Reveal delay={1.1} y={14} className="mt-14">
          <div className="flex items-center gap-4 font-mono text-[9px] tracking-[0.4em] text-bone/30 md:text-[10px]">
            <span className="h-px w-8 bg-bone/20" />
            <span>FILE OPENED — READ TO THE END</span>
            <span className="h-px w-8 bg-bone/20" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
