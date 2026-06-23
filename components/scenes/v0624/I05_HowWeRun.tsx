"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * I05 — AI로 회사를 굴린다 (운영의 방식)  [재설계 / 16:9 풀스크린]
 * 2단 grid(content-center) — 좌: 도시에 카피(리드 → 핵심 선언 → 캡션) / 우: 도미노 3카드.
 * Pin heights={5}. 도미노가 우측에서 하나씩 묵직하게 꽂히고(scale 0.94→1, 골드 림 슬램),
 * 마지막 비트에서 좌측 카피가 리드→핵심 선언으로 전환되며 '인력'이 골드 글로우로 화면을 압도.
 * render-prop 내부 hook 금지 → Stage/Domino 보조 컴포넌트 분리(견본 I03 동일 규칙).
 */

/* 도미노 카드 — "AI로 — XXX한다." 한 장씩 묵직하게 꽂힌다 */
type Card = { lead: string; verb: string };
const DOMINO_CARDS: Card[] = [
  { lead: "AI로 —", verb: "마케팅한다." },
  { lead: "AI로 —", verb: "개발한다." },
  { lead: "AI로 —", verb: "회사를 운영한다." },
];

export default function I05HowWeRun() {
  return (
    <section
      data-scene="i05"
      data-act="OPENING — 김주연"
      className="relative overflow-x-clip bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

/* ───────────────────────── 핀 스테이지 (2단 grid) ───────────────────────── */

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경: 도미노 동안 차오르고, 핵심 선언에서 폭발 ── */
  const glowO = useTransform(p, [0, 0.18, 0.52, 0.72, 1], [0.14, 0.24, 0.3, 0.5, 0.56]);
  const gridShift = useTransform(p, [0, 1], [0, -46]);
  const bloomO = useTransform(p, [0.7, 0.84, 1], [0, 0.42, 0.34]);
  const bloomS = useTransform(p, [0.7, 1], [0.62, 1.16]);

  /* ── 좌측 카피: 리드(초반) → 핵심 선언(후반) 크로스페이드 ── */
  // 리드: "우리는 'AI로 비즈니스를 한다'가 아니다."
  const leadO = useTransform(p, [0.02, 0.1, 0.58, 0.66], [0, 1, 1, 0]);
  const leadY = useTransform(p, [0.02, 0.1, 0.58, 0.66], [40, 0, 0, -40]);

  // 핵심 선언 (풀폭 단일 컬럼으로 화면 압도) — 도미노 퇴장과 겹치게 0.6부터 등장
  const decKickO = useTransform(p, [0.6, 0.68], [0, 1]);
  const decLeadO = useTransform(p, [0.62, 0.7], [0, 1]);
  const decLeadY = useTransform(p, [0.62, 0.72], [44, 0]);
  const decBodyO = useTransform(p, [0.66, 0.76], [0, 1]);
  const decBodyY = useTransform(p, [0.66, 0.78], [60, 0]);
  const decBodyB = useTransform(p, [0.66, 0.76], ["blur(16px)", "blur(0px)"]);

  // '인력' 골드 글로우 — 선언 직후 숨 쉬듯 차오름
  const forceGlow = useTransform(
    p,
    [0.82, 0.9, 1],
    [
      "0 0 0px rgba(232,181,75,0)",
      "0 0 60px rgba(232,181,75,0.5), 0 0 22px rgba(232,181,75,0.35)",
      "0 0 80px rgba(232,181,75,0.55), 0 0 26px rgba(232,181,75,0.4)",
    ]
  );

  // 우측 도미노 묶음 — 선언 등장과 크로스페이드되도록 퇴장을 늦춤 [0.62,0.72]
  const stackO = useTransform(p, [0.62, 0.72], [1, 0]);
  const stackY = useTransform(p, [0.62, 0.72], [0, -56]);

  // 마감 캡션
  const capO = useTransform(p, [0.9, 0.97], [0, 1]);
  const capY = useTransform(p, [0.9, 0.97], [18, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ===== 배경 레이어 ===== */}
      <motion.div
        aria-hidden
        style={{ opacity: glowO }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(54% 60% at 70% 52%, rgba(232,181,75,0.16), transparent 72%)",
          }}
        />
        <div
          className="animate-pulse-soft absolute right-[16%] top-[48%] h-[46vh] w-[46vh] -translate-y-1/2 rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(255,211,122,0.12), transparent 70%)" }}
        />
      </motion.div>

      {/* 핵심 선언 골드 블룸 (좌측 중심) */}
      <motion.div
        aria-hidden
        style={{ opacity: bloomO, scale: bloomS }}
        className="pointer-events-none absolute left-[26%] top-1/2 h-[110vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,211,122,0.36) 0%, rgba(232,181,75,0.12) 44%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* 그리드 패럴랙스 */}
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
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(75% 75% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>

      {/* 칠흑 비네트 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 94% 94% at 50% 50%, transparent 56%, rgba(7,6,10,0.82) 100%)",
        }}
      />

      {/* 거대 워터마크 — AI// */}
      <div
        aria-hidden
        className="text-stroke-gold pointer-events-none absolute -left-[2vw] top-[5vh] rotate-[-7deg] select-none font-mono text-[clamp(8rem,20vw,18rem)] font-bold leading-none opacity-[0.04]"
      >
        AI//
      </div>

      {/* ===== 콘텐츠 컨테이너 ===== */}
      <div className="relative z-10 mx-auto h-full w-full max-w-[1600px] px-[clamp(2.5rem,6vw,8rem)]">
        {/* ── 도미노 비트: 2단 grid (좌 카피 리드 / 우 도미노 3카드) ── */}
        <div className="grid h-full w-full grid-cols-1 content-center items-center gap-[clamp(2rem,5vw,5.5rem)] lg:grid-cols-[0.92fr_1.08fr]">
          {/* 좌측: 킥커 + 리드 (선언 진입 시 퇴장) */}
          <div className="relative flex min-h-[58vh] flex-col justify-center">
            <Kicker tone="gold">HOW — 운영의 방식</Kicker>

            <motion.p
              style={{ opacity: leadO, y: leadY }}
              className="mt-9 font-display font-bold leading-[1.3] text-bone/90 text-[clamp(1.7rem,2.9vw,3.2rem)]"
            >
              <span className="block whitespace-nowrap">우리는</span>
              <span className="block whitespace-nowrap text-bone/55">
                &lsquo;AI로 비즈니스를 한다&rsquo;
              </span>
              <span className="block whitespace-nowrap">— 가 아니다.</span>
            </motion.p>
          </div>

          {/* 우측: 도미노 3카드 (16:9 가로 폭을 채우는 큰 카드 스택) */}
          <motion.div
            style={{ opacity: stackO, y: stackY }}
            className="flex h-full flex-col justify-center gap-[clamp(1.1rem,2.4vh,2rem)]"
          >
            {DOMINO_CARDS.map((card, i) => (
              <Domino key={i} p={p} i={i} card={card} />
            ))}
          </motion.div>
        </div>

        {/* ── 핵심 선언: 컨테이너 전체를 덮는 풀폭 단일 컬럼 레이어 (좌측 정렬은 내부 max-w로) ── */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center px-[clamp(2.5rem,6vw,8rem)]">
          <div className="w-full max-w-[1180px]">
            <motion.div style={{ opacity: decKickO }}>
              <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-gold md:text-xs">
                <span className="h-px w-9 bg-gold/60" />
                운영자의 시선
              </span>
            </motion.div>

            <motion.p
              style={{ opacity: decLeadO, y: decLeadY }}
              className="mt-[clamp(1.6rem,3vh,2.6rem)] font-display font-bold leading-[1.25] text-bone/85 text-[clamp(1.4rem,2.5vw,2.6rem)]"
            >
              운영자의 자리에서 보면 —
            </motion.p>

            <motion.h2
              style={{ opacity: decBodyO, y: decBodyY, filter: decBodyB }}
              className="mt-[clamp(1.4rem,3vh,2.4rem)] max-w-[1180px] font-display font-black leading-[1.14] text-bone text-[clamp(2.6rem,6vw,6.8rem)]"
            >
              <span className="block whitespace-nowrap">비즈니스 확장에서</span>
              <span className="block whitespace-nowrap">
                <motion.span className="text-gold" style={{ textShadow: forceGlow }}>
                  &lsquo;인력&rsquo;
                </motion.span>
                의 가치는,
              </span>
              <span className="block whitespace-nowrap">빠르게 떨어지고 있다.</span>
            </motion.h2>
          </div>
        </div>
      </div>

      {/* ===== 마감 모노 캡션 ===== */}
      <motion.div
        style={{ opacity: capO, y: capY }}
        className="absolute inset-x-0 bottom-[6vh] z-10 flex justify-center px-[6vw]"
      >
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.34em] text-bone/45 md:text-[11px]">
          냉정하지만, 이게 지금 현장의 언어다.
        </span>
      </motion.div>

      {/* 하단 진행 큐 */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
      />
    </div>
  );
}

/* ───────────────────────── 도미노 카드 (스크롤 슬램) ───────────────────────── */

function Domino({ p, i, card }: { p: MotionValue<number>; i: number; card: Card }) {
  // 카드 등장 구간: 0.16 → 0.58 사이에 하나씩 꽂힌다
  const t0 = 0.16 + i * 0.13;
  const o = useTransform(p, [t0, t0 + 0.05], [0, 1]);
  const y = useTransform(p, [t0, t0 + 0.07], [56, 0]);
  // 꽂히는 묵직함: scale 0.94 → 1
  const s = useTransform(p, [t0, t0 + 0.08], [0.94, 1]);
  // 가로로 살짝 밀려들어오며 자리잡음
  const x = useTransform(p, [t0, t0 + 0.08], [38, 0]);
  // 꽂히는 순간 골드 림 라이트 번쩍 → 가라앉음
  const rimO = useTransform(p, [t0, t0 + 0.04, t0 + 0.13], [0, 0.95, 0.26]);
  // 임팩트 가중치 그림자
  const shadow = useTransform(
    p,
    [t0, t0 + 0.045, t0 + 0.12],
    [
      "0 0 0px rgba(0,0,0,0)",
      "0 28px 64px rgba(0,0,0,0.55)",
      "0 16px 40px rgba(0,0,0,0.4)",
    ]
  );
  // 인덱스 번호 점등
  const numO = useTransform(p, [t0 + 0.02, t0 + 0.1], [0.2, 1]);

  return (
    <motion.div style={{ opacity: o, y, x, scale: s }} className="relative origin-left">
      {/* 골드 림 라이트 (슬램 순간 번쩍) */}
      <motion.div
        aria-hidden
        style={{ opacity: rimO }}
        className="pointer-events-none absolute inset-0 rounded-2xl border border-gold/70 shadow-[0_0_46px_rgba(232,181,75,0.3)]"
      />
      <motion.div
        style={{ boxShadow: shadow }}
        className="relative flex items-center gap-6 overflow-hidden rounded-2xl border border-bone/10 bg-coal/85 px-[clamp(1.6rem,2.6vw,3rem)] py-[clamp(1.5rem,3vh,2.6rem)] md:gap-9"
      >
        {/* 좌측 골드 인덱스 라인 */}
        <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0" />

        <motion.span
          style={{ opacity: numO }}
          className="font-mono text-sm font-semibold tracking-[0.3em] text-gold/80 md:text-base"
        >
          {String(i + 1).padStart(2, "0")}
        </motion.span>
        <span aria-hidden className="h-12 w-px shrink-0 bg-bone/12" />

        {/* 카피 — 의미 단위 nowrap (단어 중간/구절 중간 깨짐 방지) */}
        <p className="flex items-baseline gap-x-3 font-display font-bold leading-[1.18] text-bone text-[clamp(1.5rem,3vw,3rem)]">
          <span className="whitespace-nowrap text-bone/50">{card.lead}</span>
          <span className="whitespace-nowrap">{card.verb}</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
