"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * W01 — 두 개의 무기 (WHY · 왜 차원이 다른가)  [내러티브 / 순수 타이포 연출]
 * 16:9 풀스크린 + Pin 스크롤 스테이지(N06/N07 패턴 차용).
 * 비트①("차원이 다르다") 점등 → 비트②("무기는 두 개다", 골드 강조) →
 * 카드 2개가 좌우에서 꽂힘(scale 0.94→1, 번호 골드) → 하단 모노 caption.
 * 배경 글로우 + 그리드 패럴랙스(gridShift) 레이어. 골드 강조 1개 원칙(=「두 개」).
 */

type Weapon = {
  no: string;
  glyph: "term" | "folder";
  title: string;
  highlight: string;
  body: string;
  from: number; // 카드가 꽂혀 들어오는 시작 x (px)
  at: number; // 등장 progress 기준점
};

const WEAPONS: Weapon[] = [
  {
    no: "01",
    glyph: "term",
    title: "터미널",
    highlight: "직접 실행한다",
    body: "AI가 네 컴퓨터에서, 명령을 직접 실행한다.",
    from: -64,
    at: 0.58,
  },
  {
    no: "02",
    glyph: "folder",
    title: "폴더 전체 맥락",
    highlight: "안 잘린다",
    body: "30페이지가 안 잘린다 — 폴더를 통째로 읽는다.",
    from: 64,
    at: 0.66,
  },
];

export default function W01TwoWeapons() {
  return (
    <section
      data-scene="w01"
      data-act="WHY · 두 개의 무기"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.5]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* ── 비트 ① : "차원이 다르다" ── */
  const b1O = useTransform(p, [0.04, 0.16], [0, 1]);
  const b1Y = useTransform(p, [0.04, 0.18], [40, 0]);
  /* 비트①은 비트②가 들어오면 살짝 가라앉아 위계를 양보 */
  const b1Fade = useTransform(p, [0.3, 0.42], [1, 0.42]);

  /* ── 비트 ② : "무기는 — 두 개다." (골드 강조 = 유일) ── */
  const b2O = useTransform(p, [0.3, 0.42], [0, 1]);
  const b2Y = useTransform(p, [0.3, 0.44], [34, 0]);
  const goldGlow = useTransform(p, [0.4, 0.54], [0, 0.5]);

  /* ── 캡션(모노) ── */
  const capO = useTransform(p, [0.84, 0.94], [0, 0.85]);
  const capY = useTransform(p, [0.84, 0.96], [18, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(54% 58% at 50% 40%, rgba(232,181,75,0.11), transparent 72%)" }}
        />
      </motion.div>
      <motion.div aria-hidden style={{ y: gridShift }} className="pointer-events-none absolute inset-[-10%] opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(78% 78% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── 콘텐츠 (content-center 로 단일 컬럼 수직 중앙) ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(2rem,5.5vh,4.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[7vh]">
        {/* ── 헤드라인 비트 ── */}
        <div className="flex flex-col items-center text-center">
          <motion.div style={{ opacity: b1O, y: b1Y }}>
            <Kicker className="justify-center">WHY · 왜 차원이 다른가</Kicker>
            <motion.p
              style={{ opacity: b1Fade }}
              className="mt-8 font-display font-bold leading-[1.34] text-bone/90 text-[clamp(1.45rem,2.9vw,2.9rem)]"
            >
              <span className="block whitespace-nowrap">
                챗GPT 창과 VS Code는 — 같은 AI라도,
              </span>
              <span className="block whitespace-nowrap text-bone">차원이 다르다.</span>
            </motion.p>
          </motion.div>

          {/* 비트② — 메가 선언, 골드 강조 "두 개" (유일) */}
          <motion.h2
            style={{ opacity: b2O, y: b2Y }}
            className="relative mt-[clamp(1.4rem,3.4vh,2.6rem)] font-display font-black leading-[1.08] text-bone text-[clamp(2.6rem,6.4vw,6.4rem)]"
          >
            <motion.span
              aria-hidden
              style={{ opacity: goldGlow }}
              className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-[40%]"
            >
              <div
                className="h-full w-full"
                style={{ background: "radial-gradient(50% 60% at 50% 50%, rgba(232,181,75,0.16), transparent 72%)" }}
              />
            </motion.span>
            <span className="relative whitespace-nowrap">
              무기는 —{" "}
              <span
                className="text-gold"
                style={{ textShadow: "0 0 50px rgba(232,181,75,0.5), 0 0 16px rgba(232,181,75,0.35)" }}
              >
                두 개
              </span>
              다.
            </span>
          </motion.h2>
        </div>

        {/* ── 두 카드 (좌우에서 꽂힘) ── */}
        <div className="grid w-full max-w-[1320px] grid-cols-1 gap-[clamp(1.2rem,2.4vw,2.6rem)] md:grid-cols-2">
          {WEAPONS.map((w) => (
            <WeaponCard key={w.no} w={w} p={p} />
          ))}
        </div>

        {/* ── 캡션 (모노) ── */}
        <motion.p
          style={{ opacity: capO, y: capY }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold/80 md:text-xs"
        >
          <span className="inline-block h-px w-9 bg-gold/55" />
          이 둘이, 게임을 바꾼다.
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────── 무기 카드 (scale 0.94→1, 좌우에서 꽂힘) ───────────────────────── */
function WeaponCard({ w, p }: { w: Weapon; p: MotionValue<number> }) {
  const o = useTransform(p, [w.at, w.at + 0.1], [0, 1]);
  const x = useTransform(p, [w.at, w.at + 0.14], [w.from, 0]);
  const s = useTransform(p, [w.at, w.at + 0.14], [0.94, 1]);
  const edgeGlow = useTransform(p, [w.at + 0.06, w.at + 0.2], [0, 1]);

  return (
    <motion.div
      style={{ opacity: o, x, scale: s }}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-gold/45 bg-coal/70 px-[clamp(1.6rem,2.2vw,2.6rem)] py-[clamp(1.6rem,2.6vh,2.6rem)] backdrop-blur-sm"
    >
      {/* 모서리 골드 글로우 */}
      <motion.div
        aria-hidden
        style={{ opacity: edgeGlow }}
        className="pointer-events-none absolute -inset-6 rounded-[28px]"
      >
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(58% 70% at 22% 28%, rgba(232,181,75,0.14), transparent 72%)" }}
        />
      </motion.div>

      {/* 상단: 번호 + 아이콘 */}
      <div className="relative flex items-center justify-between">
        <span
          className="font-display font-black leading-none tabular-nums text-gold text-[clamp(2.2rem,3.6vw,3.4rem)]"
          style={{ textShadow: "0 0 38px rgba(232,181,75,0.45)" }}
        >
          {w.no}
        </span>
        <WeaponGlyph kind={w.glyph} />
      </div>

      {/* 구분선 */}
      <span className="relative mt-5 h-px w-full bg-gold/35" />

      {/* 제목 */}
      <h3 className="relative mt-6 font-display font-black leading-tight text-bone text-[clamp(1.7rem,2.6vw,2.6rem)]">
        {w.title}
      </h3>

      {/* 본문 — 강조어는 골드가 아닌 본(골드 1개 원칙: 강조는 「두 개」 + 번호) */}
      <p className="relative mt-4 text-balance-k leading-relaxed text-bone/65 text-[clamp(1.05rem,1.45vw,1.5rem)]">
        {w.body.split(w.highlight)[0]}
        <span className="whitespace-nowrap font-semibold text-bone">{w.highlight}</span>
        {w.body.split(w.highlight)[1]}
      </p>
    </motion.div>
  );
}

/* 카드별 아이콘: 터미널 `>_` / 폴더 */
function WeaponGlyph({ kind }: { kind: Weapon["glyph"] }) {
  if (kind === "term") {
    return (
      <span className="flex h-[clamp(2.6rem,3.4vw,3.4rem)] w-[clamp(2.6rem,3.4vw,3.4rem)] items-center justify-center rounded-xl border border-gold/40 bg-ink/70 font-mono font-bold text-gold text-[clamp(1.2rem,1.8vw,1.7rem)]">
        &gt;_
      </span>
    );
  }
  return (
    <span className="flex h-[clamp(2.6rem,3.4vw,3.4rem)] w-[clamp(2.6rem,3.4vw,3.4rem)] items-center justify-center rounded-xl border border-gold/40 bg-ink/70">
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none" aria-hidden>
        <path
          d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.1c.5 0 .97.24 1.26.65L11 7h8.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"
          stroke="#e8b54b"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
