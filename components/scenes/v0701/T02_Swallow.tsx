"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import AppWindow from "@/components/ui/AppWindow";

/**
 * T02 — SaaS를 삼키다 (THESIS 충격 종합)  [순수 타이포/연출 · CLIMAX]
 * 화면 가장자리에 흩어진 수십 개 SaaS 칩이 progress 에 따라 중앙 VS Code 창(HUB)으로
 * 빨려 들어가는 수렴 모션 — 각 칩의 x/y/scale/opacity 가 중앙으로 수렴.
 * 빨려든 칩은 사라지지 않고 HUB 내부 "흡수됨" 칩 그리드로 재출현(시각 질량 유지).
 * 마지막엔 큼직한 중앙 VS Code 창 + 결론 선언이 하나의 수직 스택으로 묶여 16:9를 채운다.
 * 강조어 '하나의 창'(상단)·'삼켜졌다'(결론) 은 각 비트에서 골드 1개 원칙.
 */

const KICKER = "THESIS · 삼켜진다";
const GOLD = "하나의 창";
const CAPTION = "— 전부, VS Code 안으로.";

/* 가장자리에 흩어진 SaaS 칩 — 결정적 좌표(vw/vh 기준 -50~50, 중앙=0). 12개. */
type Chip = { name: string; x: number; y: number; r: number; at: number };
const CHIPS: Chip[] = [
  { name: "Canva", x: -40, y: -30, r: -8, at: 0.30 },
  { name: "Adobe PDF", x: -46, y: 2, r: 5, at: 0.34 },
  { name: "Notion", x: -38, y: 30, r: -6, at: 0.38 },
  { name: "윅스 Wix", x: -22, y: -38, r: 7, at: 0.32 },
  { name: "Figma", x: -16, y: 36, r: -4, at: 0.40 },
  { name: "Google 워크스페이스", x: 0, y: -40, r: 4, at: 0.36 },
  { name: "Tableau", x: 0, y: 40, r: -7, at: 0.42 },
  { name: "Zapier", x: 18, y: -36, r: -5, at: 0.33 },
  { name: "DeepL", x: 16, y: 36, r: 6, at: 0.41 },
  { name: "엑셀 매크로", x: 38, y: -28, r: -6, at: 0.37 },
  { name: "CapCut", x: 46, y: 4, r: 5, at: 0.35 },
  { name: "Webflow", x: 40, y: 32, r: -8, at: 0.39 },
];

export default function T02Swallow() {
  return (
    <section
      data-scene="t02"
      data-act="THESIS · SaaS를 삼키다"
      className="relative bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.4, 0.62]);
  const gridShift = useTransform(p, [0, 1], [0, -44]);

  /* ── 카피 비트 (상단 2개 순차 점등) ── */
  const b0o = useTransform(p, [0.03, 0.12, 0.24, 0.3], [0, 1, 1, 0]);
  const b0y = useTransform(p, [0.03, 0.12], [34, 0]);

  const b1o = useTransform(p, [0.4, 0.5, 0.62, 0.68], [0, 1, 1, 0]);
  const b1y = useTransform(p, [0.4, 0.5], [30, 0]);

  /* 하단 캡션 */
  const capO = useTransform(p, [0.92, 1], [0, 0.85]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(46% 54% at 50% 50%, rgba(232,181,75,0.14), transparent 72%)" }}
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

      {/* ── 콘텐츠 무대 (풀스크린) ── */}
      <div className="relative z-10 mx-auto h-full w-full max-w-[1600px] px-[clamp(2.5rem,6vw,8rem)]">
        {/* 상단 킥커 + 비트 0/1 (좌상단, 칩 수렴 동안만 표시) */}
        <div className="absolute left-[clamp(2.5rem,6vw,8rem)] top-[clamp(5vh,8vh,10vh)] z-40 max-w-[900px]">
          <Kicker>{KICKER}</Kicker>
          <motion.p
            style={{ opacity: b0o, y: b0y }}
            className="mt-7 font-display font-bold leading-[1.3] text-bone/90 text-[clamp(1.6rem,3.2vw,3.2rem)]"
          >
            <span className="whitespace-nowrap">그런데 지금 —</span>
          </motion.p>
          {/* 비트 1 — 같은 위치에서 크로스페이드 */}
          <motion.p
            style={{ opacity: b1o, y: b1y }}
            className="absolute left-0 top-[clamp(3.4rem,7vh,5rem)] mt-7 font-display font-bold leading-[1.34] text-bone text-[clamp(1.5rem,2.7vw,2.7rem)]"
          >
            그 수십 개가,{" "}
            <span className="whitespace-nowrap">
              <span className="text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.4)]">{GOLD}</span> 안으로 빨려 들어간다.
            </span>
          </motion.p>
        </div>

        {/* 가장자리 흩어진 SaaS 칩 (수렴 모션 전용 레이어 — 전체화면 기준) */}
        <div className="absolute inset-0 z-20">
          <div className="relative h-full w-full">
            {CHIPS.map((c) => (
              <ChipSwallow key={c.name} chip={c} p={p} />
            ))}
          </div>
        </div>

        {/* ── 중앙 수직 스택: HUB(주인공) + 결론 선언 — content-center 로 수직 중앙 ── */}
        <div className="relative z-30 grid h-full w-full grid-cols-1 content-center justify-items-center gap-[clamp(1.8rem,4vh,3.4rem)] py-[clamp(8vh,11vh,13vh)]">
          {/* 중앙 VS Code 창 (HUB) — climax 주인공 */}
          <HubCluster p={p} />

          {/* 결론 선언 (THESIS 한 방) — HUB 바로 아래 */}
          <Conclusion p={p} />
        </div>

        {/* 하단 캡션 (모노) */}
        <motion.p
          style={{ opacity: capO }}
          className="absolute bottom-[clamp(3.5vh,5vh,6vh)] left-1/2 z-40 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-gold/75 md:text-xs"
        >
          {CAPTION}
        </motion.p>
      </div>
    </div>
  );
}

/* ───────── 중앙 HUB 클러스터 — 오비탈 잔광 + 큼직한 VS Code 창 ───────── */
function HubCluster({ p }: { p: MotionValue<number> }) {
  const hubScale = useTransform(p, [0.18, 0.46, 0.86], [0.82, 0.96, 1.12]);
  const hubO = useTransform(p, [0.16, 0.28], [0, 1]);
  const hubGlow = useTransform(p, [0.5, 0.78, 1], [0.2, 0.6, 0.92]);
  const ringO = useTransform(p, [0.6, 0.86, 1], [0, 0.5, 0.78]);
  const ringScale = useTransform(p, [0.6, 1], [0.86, 1.04]);

  return (
    <motion.div
      style={{ opacity: hubO, scale: hubScale }}
      className="relative w-[clamp(420px,46vw,700px)]"
    >
      {/* 오비탈 잔광 링 — 흡수된 SaaS 의 잔상 */}
      <motion.div
        aria-hidden
        style={{ opacity: ringO, scale: ringScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(232,181,75,0.16)" }}
        />
        <div
          className="absolute inset-[14%] rounded-full"
          style={{ border: "1px solid rgba(232,181,75,0.12)" }}
        />
      </motion.div>

      {/* 본체 후광 */}
      <motion.div
        aria-hidden
        style={{ opacity: hubGlow }}
        className="pointer-events-none absolute -inset-16 rounded-[4rem]"
      >
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(232,181,75,0.4), transparent 70%)" }}
        />
      </motion.div>

      <HubWindow p={p} />
    </motion.div>
  );
}

/* ───────── 결론 선언 ───────── */
function Conclusion({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0.78, 0.88], [0, 1]);
  const y = useTransform(p, [0.78, 0.9], [28, 0]);
  const glow = useTransform(p, [0.84, 0.96], [0, 0.4]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className="relative w-full max-w-[1180px] px-[clamp(1rem,3vw,4rem)] text-center"
    >
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute -inset-x-8 -inset-y-5 rounded-3xl"
      >
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(60% 80% at 50% 50%, rgba(232,181,75,0.12), transparent 72%)" }}
        />
      </motion.div>
      <p className="relative font-display font-bold leading-[1.36] text-bone/90 text-[clamp(1.5rem,2.8vw,2.8rem)]">
        이게{" "}
        <span className="whitespace-nowrap text-bone">&apos;AI가 모든 소프트웨어를 대체한다&apos;</span>
        의 진짜 의미다 —{" "}
        <span className="whitespace-nowrap text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.42)]">전부 삼켜졌다.</span>
      </p>
    </motion.div>
  );
}

/* ───────── SaaS 칩 — 가장자리에서 중앙으로 수렴 (x/y/scale/opacity) ───────── */
function ChipSwallow({ chip, p }: { chip: Chip; p: MotionValue<number> }) {
  /* 등장: at 구간에서 페이드 인 → 그 후 중앙(0,0)으로 빨려 들어감 */
  const appear = useTransform(p, [chip.at, chip.at + 0.06], [0, 1]);
  const pull = useTransform(p, [chip.at + 0.08, 0.84], [0, 1]);

  /* 가장자리 좌표 → 중앙(0) 으로 보간. 박스 중앙 정렬(-50%)을 calc 에 합쳐
     translate 클래스 의존 제거(framer x/y 가 transform 을 덮어쓰므로). */
  const x = useTransform(pull, (v) => `calc(-50% + ${chip.x * (1 - v)}vw)`);
  const y = useTransform(pull, (v) => `calc(-50% + ${chip.y * (1 - v)}vh)`);
  const scale = useTransform(pull, [0, 0.7, 1], [1, 0.5, 0.04]);
  /* 빨려 들어가며 사라짐: 등장 페이드 × 흡수 페이드 */
  const swallow = useTransform(pull, [0, 0.6, 1], [1, 0.9, 0]);
  const opacity = useTransform([appear, swallow], ([a, s]: number[]) => a * s);
  const blur = useTransform(pull, [0.55, 1], [0, 6]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      style={{ x, y, scale, opacity, rotate: chip.r, filter }}
      className="absolute left-1/2 top-1/2"
    >
      <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-bone/15 bg-coal/85 px-[clamp(0.9rem,1.3vw,1.4rem)] py-[clamp(0.45rem,0.8vh,0.7rem)] font-mono tracking-[0.02em] text-bone/70 text-[clamp(0.85rem,1.05vw,1.15rem)] shadow-[0_10px_34px_rgba(0,0,0,0.5)]">
        <span className="h-1.5 w-1.5 rounded-full bg-ember/60" />
        {chip.name}
      </span>
    </motion.div>
  );
}

/* ───────── 중앙 VS Code 창 목업 (AppWindow 골드 강조) ───────── */
function HubWindow({ p }: { p: MotionValue<number> }) {
  const caret = useTransform(p, [0.5, 0.54, 0.58, 0.62], [0.2, 1, 0.2, 1]);
  const intakeO = useTransform(p, [0.5, 0.7], [0, 1]);
  const gridO = useTransform(p, [0.6, 0.78], [0, 1]);

  return (
    <AppWindow title="everything — VS Code" icon="vscode" accent rightLabel="ALL IN ONE">
      {/* 코드 라인 — 마지막 줄에 흡수 라벨 */}
      <div className="space-y-[clamp(0.55rem,1vh,0.85rem)] px-[clamp(1.4rem,2vw,2.4rem)] pt-[clamp(1.2rem,2vh,2rem)] pb-[clamp(0.8rem,1.4vh,1.4rem)]">
        {[
          { w: "58%", c: "bg-gold/55" },
          { w: "80%", c: "bg-bone/22" },
          { w: "46%", c: "bg-bone/22" },
          { w: "68%", c: "bg-gold/40" },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-[clamp(0.6rem,1vw,1rem)]">
            <span className="font-mono text-[10px] text-bone/30 md:text-[12px]">{i + 1}</span>
            <span className="h-[clamp(7px,0.9vw,11px)] rounded-full" style={{ width: row.w }}>
              <span className={`block h-full rounded-full ${row.c}`} />
            </span>
            {i === 0 ? (
              <motion.span style={{ opacity: caret }} className="ml-1 h-[clamp(14px,1.4vw,20px)] w-[2px] bg-gold" />
            ) : null}
          </div>
        ))}
      </div>

      {/* 흡수된 SaaS 칩 그리드 — 빨려든 12개가 HUB 내부에 "흡수됨" 으로 재출현 */}
      <motion.div
        style={{ opacity: gridO }}
        className="border-t border-bone/8 px-[clamp(1.4rem,2vw,2.4rem)] pt-[clamp(0.9rem,1.5vh,1.4rem)] pb-[clamp(1rem,1.6vh,1.5rem)]"
      >
        <div className="grid grid-cols-3 gap-[clamp(0.4rem,0.7vw,0.7rem)] md:grid-cols-4">
          {CHIPS.map((c, i) => (
            <AbsorbedChip key={c.name} name={c.name} index={i} p={p} />
          ))}
        </div>
      </motion.div>

      {/* 흡수 스트립 — "absorbed · 12 SaaS → one window" */}
      <motion.div
        style={{ opacity: intakeO }}
        className="flex items-center gap-2 border-t border-gold/25 bg-[#08070b] px-[clamp(1.4rem,2vw,2.4rem)] py-[clamp(0.7rem,1.2vh,1.05rem)]"
      >
        <span className="font-mono text-[clamp(11px,1vw,14px)] text-gold/80">$</span>
        <span className="font-mono tracking-[0.12em] text-bone/55 text-[clamp(11px,1vw,14px)]">
          absorbed · <span className="text-gold">12 SaaS</span> → one window
        </span>
      </motion.div>
    </AppWindow>
  );
}

/* 흡수된 칩 — HUB 내부 그리드에서 stagger 점등 (결정적 지연) */
function AbsorbedChip({ name, index, p }: { name: string; index: number; p: MotionValue<number> }) {
  const at = 0.62 + (index % 4) * 0.018 + Math.floor(index / 4) * 0.03;
  const o = useTransform(p, [at, at + 0.07], [0, 1]);
  const s = useTransform(p, [at, at + 0.08], [0.85, 1]);
  return (
    <motion.span
      style={{ opacity: o, scale: s }}
      className="flex items-center gap-1.5 overflow-hidden rounded-md border border-gold/20 bg-gold/[0.06] px-[clamp(0.5rem,0.8vw,0.8rem)] py-[clamp(0.3rem,0.6vh,0.5rem)]"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/55" />
      <span className="truncate font-mono tracking-[0.01em] text-bone/70 text-[clamp(0.62rem,0.78vw,0.85rem)]">
        {name}
      </span>
    </motion.span>
  );
}
