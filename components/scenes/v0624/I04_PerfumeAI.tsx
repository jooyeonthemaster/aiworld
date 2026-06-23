"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * I04 — 향수 × AI (대표 사례) + 네이버 플레이스  [재설계]
 * 16:9 풀스크린 2단 레이아웃 + Pin 스크롤 연동 모션.
 * 좌: 킥커·타이틀·골드 반전·팩트 3장이 스크롤 비트로 순차 점등.
 * 우: NAVER PLACE 카드(우측을 꽉 채움) — 헤더/별/본문/QR/CTA 가 progress 로 차오르고
 *     QR 박스가 마지막에 또렷하게 떠오른다. 카드 전체는 네이버 직링크 <a>.
 */

const PLACE_URL = "https://naver.me/GyY5B6SD";

/** 좌측 팩트 3장 — 골드 다이아몬드 불릿 */
const FACTS: { lead: string; tail: string }[] = [
  { lead: "직영 3개 매장", tail: "직접 런칭, 직접 운영" },
  { lead: "국내 최초", tail: "AI 향수로 실제 매출을 낸다" },
  { lead: "2026. 09", tail: "현대백화점 팝업 예정" },
];

export default function I04PerfumeAI() {
  return (
    <section
      data-scene="i04"
      data-act="OPENING — 김주연"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 — 스크롤에 미세 반응 (좌측 내러티브 조명 → 우측 카드 잔광으로 무게 이동) ── */
  const glowL = useTransform(p, [0, 0.5, 1], [0.4, 0.26, 0.2]);
  const glowR = useTransform(p, [0, 0.55, 1], [0.12, 0.45, 0.6]);
  const gridShift = useTransform(p, [0, 1], [0, -46]);

  /* ── 좌측 카피 비트 ── */
  const kickerO = useTransform(p, [0.02, 0.1], [0, 1]);
  const kickerY = useTransform(p, [0.02, 0.12], [26, 0]);

  const titleO = useTransform(p, [0.06, 0.18], [0, 1]);
  const titleY = useTransform(p, [0.06, 0.2], [42, 0]);

  const flipO = useTransform(p, [0.3, 0.42], [0, 1]);
  const flipY = useTransform(p, [0.3, 0.44], [34, 0]);
  const flipBar = useTransform(p, [0.32, 0.5], [0, 1]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ───────── 배경 레이어 ───────── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowL }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(46% 60% at 26% 42%, rgba(232,181,75,0.13), transparent 72%)",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ opacity: glowR }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="animate-pulse-soft absolute right-[16%] top-1/2 h-[52vh] w-[52vh] -translate-y-1/2 rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,211,122,0.14), transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: gridShift }}
        className="pointer-events-none absolute inset-[-10%] opacity-[0.05]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.5) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
            maskImage:
              "radial-gradient(78% 78% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>
      {/* 향(香) 워터마크 */}
      <div
        aria-hidden
        className="text-stroke-gold pointer-events-none absolute -right-[2vw] bottom-[2vh] rotate-[6deg] select-none font-display text-[clamp(8rem,24vw,22rem)] font-black leading-none opacity-[0.04]"
      >
        香
      </div>

      {/* ───────── 콘텐츠: 2단 grid (content-center 로 단일 row 수직 중앙) ───────── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2.5rem,5vw,6rem)] px-[clamp(2.5rem,6vw,8rem)] lg:grid-cols-[1.08fr_0.92fr]">
        {/* ─────── 좌측 — 내러티브 ─────── */}
        <div className="flex flex-col justify-center">
          <motion.div style={{ opacity: kickerO, y: kickerY }}>
            <Kicker>CASE — 국내 최초 AI 향수 비즈니스</Kicker>
          </motion.div>

          {/* 타이틀 — 의미 단위 줄바꿈 + nowrap 으로 단어 중간 깨짐 방지 */}
          <motion.h2
            style={{ opacity: titleO, y: titleY }}
            className="mt-9 font-display font-bold leading-[1.2] text-bone text-[clamp(2rem,4vw,4.2rem)]"
          >
            <span className="block whitespace-nowrap">서울에만 수백 개.</span>
            <span className="block whitespace-nowrap">
              커플이라면 한 번쯤 가보는 —
            </span>
            <span className="block whitespace-nowrap text-bone/90">
              향수 공방.
            </span>
          </motion.h2>

          {/* 반전 — 골드 강조 + 진행 바 점등 */}
          <motion.div
            style={{ opacity: flipO, y: flipY }}
            className="relative mt-[clamp(2rem,4vh,3.2rem)] pl-7"
          >
            <motion.span
              aria-hidden
              style={{ scaleY: flipBar }}
              className="absolute -top-1 left-0 h-[calc(100%+0.5rem)] w-[3px] origin-top rounded-full bg-gradient-to-b from-gold via-gold/50 to-transparent"
            />
            <p className="font-display font-bold leading-[1.3] text-[clamp(1.5rem,2.8vw,2.6rem)]">
              <span className="block whitespace-nowrap text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.42)]">
                우리는 거기에 AI를 넣었다.
              </span>
              <span className="mt-1 block whitespace-nowrap text-bone/90">
                — 대한민국에서 가장 빠르게.
              </span>
            </p>
          </motion.div>

          {/* 팩트 3장 — 스크롤 비트로 한 장씩 꽂힘 */}
          <ul className="mt-[clamp(2.2rem,4.5vh,3.4rem)] flex flex-col gap-3.5">
            {FACTS.map((f, i) => (
              <FactRow key={f.lead} fact={f} index={i} p={p} />
            ))}
          </ul>

          <motion.p
            style={{ opacity: useTransform(p, [0.84, 0.94], [0, 1]) }}
            className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/30 md:text-[12px]"
          >
            {"// NEANDER — AI FRAGRANCE ATELIER · DIRECT-RUN · SEOUL"}
          </motion.p>
        </div>

        {/* ─────── 우측 — NAVER PLACE 카드 (우측을 꽉 채움) ─────── */}
        <div className="flex h-full items-center justify-center">
          <PlaceCard p={p} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── 좌측 팩트 행 (스크롤 연동) ───────────────────────── */
function FactRow({
  fact,
  index,
  p,
}: {
  fact: { lead: string; tail: string };
  index: number;
  p: MotionValue<number>;
}) {
  const start = 0.46 + index * 0.1;
  const o = useTransform(p, [start, start + 0.1], [0, 1]);
  const x = useTransform(p, [start, start + 0.12], [-26, 0]);
  const bulletS = useTransform(p, [start + 0.03, start + 0.13], [0, 1]);

  return (
    <motion.li
      style={{ opacity: o, x }}
      className="relative flex items-baseline gap-4 border-l border-bone/10 py-2.5 pl-6 md:gap-5"
    >
      <motion.span
        aria-hidden
        style={{ scale: bulletS }}
        className="absolute -left-[6px] top-[1.35em] h-2.5 w-2.5 rotate-45 bg-gold"
      >
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ boxShadow: "0 0 16px rgba(232,181,75,0.6)" }}
        />
      </motion.span>
      <span className="whitespace-nowrap font-display font-bold leading-tight text-[clamp(1.2rem,1.9vw,1.7rem)] text-gold">
        {fact.lead}
      </span>
      <span className="leading-relaxed text-[clamp(0.95rem,1.3vw,1.2rem)] text-bone/65">
        — {fact.tail}
      </span>
    </motion.li>
  );
}

/* ───────────────────────── NAVER PLACE 카드 (스크롤 연동) ─────────────────────────
   네이버 플레이스 UI 를 다크 키노트 톤으로 재해석. 카드 전체를 <a> 로 감싸 클릭 가능.
   우측 컬럼을 가득 채우도록 크게. QR 박스는 흰/bone 패딩, 마지막에 또렷하게 점등. */
function PlaceCard({ p }: { p: MotionValue<number> }) {
  /* 카드 전체 부상 */
  const cardO = useTransform(p, [0.12, 0.26], [0, 1]);
  const cardY = useTransform(p, [0.12, 0.3], [60, 0]);
  const cardGlow = useTransform(p, [0.2, 0.6], [0, 1]);

  /* 헤더 / 카테고리 / 본문 */
  const headO = useTransform(p, [0.24, 0.34], [0, 1]);
  const headY = useTransform(p, [0.24, 0.36], [16, 0]);
  const dotS = useTransform(p, [0.3, 0.4], [0, 1]);
  const catO = useTransform(p, [0.34, 0.44], [0, 1]);
  const catY = useTransform(p, [0.34, 0.46], [16, 0]);
  const bodyO = useTransform(p, [0.5, 0.62], [0, 1]);
  const bodyY = useTransform(p, [0.5, 0.64], [16, 0]);

  /* QR — 가장 마지막에 또렷하게 (발표자가 "지금 찍어보세요") */
  const qrO = useTransform(p, [0.66, 0.8], [0, 1]);
  const qrS = useTransform(p, [0.66, 0.84], [0.9, 1]);
  const capO = useTransform(p, [0.78, 0.9], [0, 1]);
  const ctaO = useTransform(p, [0.84, 0.96], [0, 1]);

  return (
    <motion.a
      href={PLACE_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ opacity: cardO, y: cardY }}
      className="group relative block w-full max-w-[600px]"
    >
      {/* 카드 배후 글로우 */}
      <motion.div
        aria-hidden
        style={{ opacity: cardGlow }}
        className="pointer-events-none absolute -inset-8"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse 62% 66% at 50% 46%, rgba(232,181,75,0.16) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="relative border border-gold/40 bg-coal/80 backdrop-blur-sm transition-colors duration-500 group-hover:border-gold/70">
        {/* 코너 틱 */}
        <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-gold" />
        <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-gold" />
        <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-gold" />
        <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-gold" />

        {/* ── 헤더 — NAVER PLACE 라벨 ── */}
        <motion.div
          style={{ opacity: headO, y: headY }}
          className="flex items-center justify-between border-b border-gold/20 px-7 py-4 md:px-8 md:py-5"
        >
          <span className="font-mono text-[12px] tracking-[0.42em] text-gold/75 md:text-[13px]">
            NAVER PLACE
          </span>
          <motion.span
            aria-hidden
            style={{ scale: dotS }}
            className="animate-pulse-soft h-2.5 w-2.5 rounded-full bg-gold"
          />
        </motion.div>

        {/* ── 카테고리 + 별점 ── */}
        <div className="px-7 pt-6 md:px-8 md:pt-7">
          <motion.p
            style={{ opacity: catO, y: catY }}
            className="font-display font-bold leading-tight text-[clamp(1.45rem,2.3vw,2.1rem)] text-bone"
          >
            AI 향수 공방 · 직영
          </motion.p>

          {/* 골드 별 5개 — 수치 없이 분위기만 */}
          <div className="mt-3.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} index={i} p={p} />
              ))}
            </div>
            <motion.span
              style={{ opacity: useTransform(p, [0.6, 0.7], [0, 1]) }}
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/35"
            >
              리뷰
            </motion.span>
          </div>

          {/* 사실 기반 본문 */}
          <motion.div
            style={{ opacity: bodyO, y: bodyY }}
            className="mt-5 space-y-1.5 border-t border-bone/10 pt-5 font-mono text-[clamp(0.85rem,1.05vw,1rem)] leading-relaxed text-bone/60"
          >
            <p>직영 매장 · 서울</p>
            <p>AI 추천 조향 · 현장 운영</p>
          </motion.div>
        </div>

        {/* ── QR 박스 — 흰/bone 패딩, 키워서 ── */}
        <div className="px-7 pb-7 pt-5 md:px-8 md:pb-8">
          <motion.div
            style={{ opacity: qrO, scale: qrS }}
            className="mx-auto w-fit rounded-sm bg-bone p-4 shadow-[0_0_48px_rgba(232,181,75,0.22)]"
          >
            <div className="animate-pulse-soft">
              {/* QR 로컬 경로 — 일반 img (스펙상 예외 허용) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/0624/naver-place-qr.png"
                alt="네이버 플레이스 QR"
                width={210}
                height={210}
                className="block h-[clamp(170px,13.5vw,210px)] w-[clamp(170px,13.5vw,210px)]"
              />
            </div>
          </motion.div>

          {/* QR 캡션 */}
          <motion.p
            style={{ opacity: capO }}
            className="mt-5 text-center font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-bone/45"
          >
            네이버 플레이스에서 보기
            <span className="mt-1.5 block normal-case tracking-[0.15em] text-gold/75">
              naver.me/GyY5B6SD
            </span>
          </motion.p>
        </div>

        {/* ── 하단 CTA 바 ── */}
        <motion.div
          style={{ opacity: ctaO }}
          className="flex items-center justify-between border-t border-gold/20 px-7 py-4 md:px-8"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40">
            지금 찍어보세요
          </span>
          <span className="font-mono text-[12px] tracking-[0.2em] text-gold transition-transform duration-500 group-hover:translate-x-1">
            OPEN →
          </span>
        </motion.div>
      </div>
    </motion.a>
  );
}

/* ── 골드 별 SVG (스크롤 연동 점등, 수치 없음) ── */
function Star({ index, p }: { index: number; p: MotionValue<number> }) {
  const start = 0.54 + index * 0.025;
  const s = useTransform(p, [start, start + 0.05], [0, 1]);
  const o = useTransform(p, [start, start + 0.05], [0, 1]);
  return (
    <motion.svg
      viewBox="0 0 24 24"
      style={{ scale: s, opacity: o }}
      className="h-[clamp(18px,1.6vw,22px)] w-[clamp(18px,1.6vw,22px)]"
      fill="#E8B54B"
      aria-hidden
    >
      <path d="M12 2.2l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.27l-5.9 3.1 1.13-6.57L2.45 9.14l6.6-.96z" />
    </motion.svg>
  );
}
