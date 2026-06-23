"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import TextSplit from "@/components/ui/TextSplit";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** 모델에 걸린 제약 — 경고 카드 항목 */
const RULES = [
  { code: "R-01", text: "비윤리적 시도 감지 시 — 즉시 차단." },
  { code: "R-02", text: "반복 시 — 하위 모델로 강등." },
  { code: "R-03", text: "그 정도의 힘이라는 뜻이다." },
];

/**
 * S23 (6/24 에디션) — FABLE 공개의 환희.
 * 기존 S23_FableDrop 과 동일하되, 6/24 발표 시점에 맞춰 시제만 조정하고
 * 바로 뒤 S23B(차단 사건)로 넘어가는 복선 한 줄을 메타 카드에 더했다.
 */
export default function Scene23() {
  return (
    <section
      data-scene="s23"
      data-act="ACT 4 — 어떤 회사 이야기"
      className="relative overflow-hidden bg-ink text-bone"
    >
      {/* ===== 배경 레이어 ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* 중앙 골드 글로우 — FABLE 의 잔광 */}
        <div
          className="absolute left-1/2 top-[42%] h-[90vh] w-[120vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 50% 50%, rgba(232,181,75,0.08) 0%, rgba(232,181,75,0.02) 50%, transparent 75%)",
          }}
        />
        {/* 미세 수평 스캔라인 — 릴리즈 로그 느낌 */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(242,237,227,0.025) 0px, rgba(242,237,227,0.025) 1px, transparent 1px, transparent 7px)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[35vh]"
          style={{ background: "linear-gradient(to top, rgba(7,6,10,0.95), transparent)" }}
        />
      </div>

      {/* 도시에 헤더 스트립 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[6vw] pt-7 font-mono text-[10px] tracking-[0.3em] text-bone/30 uppercase"
      >
        <span>Release Log — Public Drop</span>
        <span className="hidden md:inline">Status: Declassified</span>
      </div>

      {/* ===== 콘텐츠 ===== */}
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-[6vw] py-[18vh] text-center">
        {/* ===== 거대 날짜 스탬프 — 글자별 드롭 ===== */}
        <div className="relative">
          <DropChars
            text="2026. 06. 09."
            className="font-mono font-bold leading-none tracking-[-0.02em] text-[clamp(3rem,11vw,10.5rem)] text-bone"
          />
          {/* 날짜 아래 골드 언더라인 */}
          <motion.span
            aria-hidden
            className="absolute -bottom-5 left-0 h-px w-full origin-left bg-gradient-to-r from-gold/70 via-gold/40 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
          />
        </div>
        <Reveal delay={1.1} y={10} className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.4em] uppercase text-gold/70">
            T-Minus 0 — Public Release
          </p>
        </Reveal>

        {/* ===== "불과 2주 전." ===== */}
        <h2 className="mt-[16vh] font-display font-black leading-[1.15] text-[clamp(2.4rem,7vw,6rem)] text-balance-k">
          <TextSplit text="불과 2주 전." per="char" stagger={0.09} duration={1.1} />
        </h2>

        {/* ===== 내러티브 → FABLE ===== */}
        <Reveal delay={0.2} blur className="mt-[14vh]">
          <p className="text-[clamp(1.05rem,1.8vw,1.6rem)] leading-relaxed text-bone/70 text-balance-k">
            그 힘이 마침내 일반에 공개됐다. 이름은 —
          </p>
        </Reveal>

        {/* FABLE. — 글로우가 번지는 메가 타이포 */}
        <div className="relative mt-12 font-display font-black leading-none tracking-[-0.01em] text-[clamp(4.5rem,17vw,15rem)]">
          {/* 배후 라디얼 블룸 */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[68vmin] w-[68vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,211,122,0.20) 0%, rgba(232,181,75,0.07) 45%, transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.45 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 2, delay: 0.5, ease: EASE }}
          />
          {/* 블러 잔광 레이어 */}
          <motion.span
            aria-hidden
            className="absolute inset-0 select-none text-gold-bright blur-[26px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.55 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.8, delay: 0.7, ease: EASE }}
          >
            FABLE.
          </motion.span>
          <TextSplit text="FABLE." per="char" stagger={0.08} duration={1.1} className="relative text-gold" />
        </div>

        {/* ===== 제약 카드 — 경고 테두리 ===== */}
        <ConstraintCard />

        {/* ===== 메타 펀치라인 카드 — 마이크 드롭 ===== */}
        <Reveal y={80} duration={1.8} blur className="mt-[16vh] w-full max-w-3xl">
          <div className="relative">
            {/* 카드 배후 글로우 */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8"
              style={{
                background:
                  "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(232,181,75,0.10) 0%, transparent 70%)",
              }}
            />
            <div className="relative border border-gold/50 bg-gold/[0.05] px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(2rem,5vw,4rem)]">
              {/* 코너 틱 */}
              <span aria-hidden className="absolute -left-px -top-px h-3.5 w-3.5 border-l-2 border-t-2 border-gold" />
              <span aria-hidden className="absolute -right-px -top-px h-3.5 w-3.5 border-r-2 border-t-2 border-gold" />
              <span aria-hidden className="absolute -bottom-px -left-px h-3.5 w-3.5 border-b-2 border-l-2 border-gold" />
              <span aria-hidden className="absolute -bottom-px -right-px h-3.5 w-3.5 border-b-2 border-r-2 border-gold" />

              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-gold/70">
                Live Proof — This Very Deck
              </p>
              <p className="mt-7 font-display font-bold leading-[1.45] text-[clamp(1.3rem,2.8vw,2.4rem)] text-bone text-balance-k">
                믿기지 않는가? — 지금 보고 있는 이 발표 자료가, 바로 그 모델과 함께 만들어졌다.
              </p>
              {/* 6/24 복선 — 바로 뒤 S23B(차단 사건)로 */}
              <p className="mt-6 font-mono text-[11px] leading-relaxed tracking-[0.12em] text-gold/55 text-balance-k">
                …그리고 곧, 이 자랑이 어떻게 뒤집히는지 보게 된다.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   DropChars — 글자가 위에서 한 자씩 떨어지는 날짜 스탬프
   ============================================================ */
function DropChars({
  text,
  className = "",
  delay = 0,
  stagger = 0.075,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <span ref={ref} className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]">
          <motion.span
            className="inline-block"
            initial={{ y: "-118%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : undefined}
            transition={{ duration: 0.75, delay: delay + i * stagger, ease: EASE }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ============================================================
   ConstraintCard — 모노 리스트, 경고(ember) 테두리
   ============================================================ */
function ConstraintCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1.1, ease: EASE }}
      className="relative mt-[16vh] w-full max-w-2xl border border-ember/40 bg-coal/80 text-left"
    >
      {/* 카드 헤더 */}
      <div className="flex items-center justify-between border-b border-ember/25 px-6 py-4 md:px-8">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-ember/90">
          Restrictions — Enforced
        </p>
        <span aria-hidden className="h-2 w-2 bg-ember animate-blink-caret" />
      </div>

      {/* 제약 항목 */}
      <ul className="px-6 py-6 md:px-8 md:py-8">
        {RULES.map((r, i) => (
          <motion.li
            key={r.code}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.45, ease: EASE }}
            className={`flex items-baseline gap-4 py-3 font-mono leading-relaxed ${
              i === RULES.length - 1
                ? "text-[clamp(0.95rem,1.5vw,1.2rem)] text-bone"
                : "text-[clamp(0.9rem,1.4vw,1.1rem)] text-bone/75"
            }`}
          >
            <span className="shrink-0 text-[10px] tracking-[0.25em] text-ember/70">{r.code}</span>
            <span className="text-balance-k">{r.text}</span>
          </motion.li>
        ))}
      </ul>

      {/* 카드 푸터 — 진행 바 장식 */}
      <div className="border-t border-ember/25 px-6 py-3 md:px-8">
        <motion.div
          aria-hidden
          className="h-px origin-left bg-gradient-to-r from-ember/70 to-transparent"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : undefined}
          transition={{ duration: 1.6, delay: 0.5 + RULES.length * 0.45, ease: EASE }}
        />
      </div>
    </motion.div>
  );
}
