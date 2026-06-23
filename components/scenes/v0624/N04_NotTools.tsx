"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * N04 — 이 강의는 '컴퓨터 쓰는 법'이다 (도발)  [ACT 6 — 본질: 코드 에디터]
 * 대비 + 거대 비유 + 도발. Pin 5비트 스크롤 무대.
 *  A. 리드 — '진짜'들은 코딩으로 모든 것을 구현한다
 *  B. 대비 — 모델 이름들 취소선(haze) → "이런 얘기가 아니다"
 *  C. 핵심(골드) — AI를 '어떻게' 써야 하는가
 *  D. 거대 비유 — 어도비/PPT/캔바가 아니라 → '컴퓨터' 거대 골드 점등
 *  E. 도발 — "단 한 명도 없다" → 지금부터 배운다
 */

const TOOLS = ["클로드가 좋다더라", "GPT가 좋다더라", "힉스필드가 좋다더라"] as const;

export default function N04NotTools() {
  return (
    <section
      data-scene="n04"
      data-act="ACT 6 — 본질: 코드 에디터"
      className="relative bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경: 스크롤에 미세 반응 (D 비트에서 골드가 가장 차오름) ── */
  const glowO = useTransform(p, [0, 0.55, 0.74, 1], [0.16, 0.26, 0.62, 0.5]);
  const glowScale = useTransform(p, [0, 0.74, 1], [0.9, 1.18, 1.06]);
  const gridShift = useTransform(p, [0, 1], [0, -46]);
  const emberO = useTransform(p, [0.84, 0.94], [0, 0.42]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── 배경 레이어 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowO, scale: glowScale }}
        className="pointer-events-none absolute inset-0 origin-center"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(54% 58% at 50% 50%, rgba(232,181,75,0.14), transparent 72%)",
          }}
        />
        <div
          className="animate-pulse-soft absolute left-1/2 top-1/2 h-[58vh] w-[58vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(255,211,122,0.10), transparent 70%)" }}
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
            maskImage: "radial-gradient(78% 78% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>
      {/* 도발 비트 — 미세 ember 경고 워시 */}
      <motion.div
        aria-hidden
        style={{ opacity: emberO }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-x-0 bottom-0 h-[34vh]"
          style={{ background: "radial-gradient(60% 100% at 50% 100%, rgba(255,75,46,0.10), transparent 72%)" }}
        />
      </motion.div>

      {/* ── 콘텐츠: 풀스크린 무대 (비트가 같은 자리에서 크로스페이드) ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] content-center items-center justify-center px-[clamp(2.5rem,6vw,8rem)]">
        <BeatLead p={p} />
        <BeatContrast p={p} />
        <BeatCore p={p} />
        <BeatComputer p={p} />
        <BeatProvoke p={p} />

        {/* 비트 진행 도트 */}
        <BeatDots p={p} />
      </div>
    </div>
  );
}

/* 공통 훅: 한 비트를 화면 중앙에 절대배치하고 in/out 크로스페이드 */
function useBeatStyle(
  p: MotionValue<number>,
  inAt: number,
  holdEnd: number,
) {
  const opacity = useTransform(
    p,
    [inAt, inAt + 0.05, holdEnd, holdEnd + 0.05],
    [0, 1, 1, 0],
  );
  const y = useTransform(p, [inAt, inAt + 0.06], [42, 0]);
  return { opacity, y };
}

/* ── A. 리드 ── */
function BeatLead({ p }: { p: MotionValue<number> }) {
  const s = useBeatStyle(p, 0.0, 0.15);
  const goldGlow = useTransform(p, [0.04, 0.1], [0, 1]);
  const allO = useTransform(goldGlow, [0, 1], [0.5, 1]);
  return (
    <motion.div
      style={s}
      className="absolute inset-x-0 flex flex-col items-center px-[clamp(2.5rem,6vw,8rem)] text-center"
    >
      <Kicker className="justify-center">ACT 6 — 본질: 코드 에디터</Kicker>
      <p className="mt-12 font-display font-bold leading-[1.3] text-bone text-[clamp(2rem,4.2vw,4.4rem)]">
        <span className="block whitespace-nowrap">
          AI 시대의 <span className="text-gold [text-shadow:0_0_40px_rgba(232,181,75,0.42)]">&apos;진짜&apos;</span>들은 —
        </span>
        <span className="mt-3 block whitespace-nowrap">
          코딩으로 말 그대로{" "}
          <motion.span style={{ opacity: allO }} className="text-gold">
            &apos;모든 것&apos;
          </motion.span>
          을 구현하고,
        </span>
        <span className="mt-3 block whitespace-nowrap">자기만의 프로그램을 만든다.</span>
      </p>
    </motion.div>
  );
}

/* ── B. 대비: 모델 이름 취소선(haze) → "이런 얘기가 아니다." ── */
function BeatContrast({ p }: { p: MotionValue<number> }) {
  const s = useBeatStyle(p, 0.17, 0.34);
  return (
    <motion.div
      style={s}
      className="absolute inset-x-0 flex flex-col items-center gap-[clamp(2.2rem,5vh,4rem)] px-[clamp(2.5rem,6vw,8rem)] text-center"
    >
      <Kicker tone="bone" className="justify-center">
        NOT THIS — 도구 자랑
      </Kicker>
      <div className="flex flex-col gap-[clamp(0.6rem,1.6vh,1.3rem)]">
        {TOOLS.map((t, i) => (
          <StrikeLine key={t} p={p} index={i} text={t} />
        ))}
      </div>
      <p className="mt-2 font-display font-bold leading-[1.25] text-bone text-[clamp(2rem,4.4vw,4.6rem)]">
        <span className="whitespace-nowrap">이런 얘기가, 아니다.</span>
      </p>
    </motion.div>
  );
}

function StrikeLine({ p, index, text }: { p: MotionValue<number>; index: number; text: string }) {
  const at = 0.185 + index * 0.028;
  const strike = useTransform(p, [at, at + 0.045], ["0%", "100%"]);
  const dim = useTransform(p, [at, at + 0.05], [0.7, 0.34]);
  return (
    <motion.div
      style={{ opacity: dim }}
      className="relative inline-flex items-center self-center font-display font-medium leading-tight text-haze text-[clamp(1.5rem,3vw,3rem)]"
    >
      <span className="whitespace-nowrap">&ldquo;{text}&rdquo;</span>
      {/* 취소선 (스크롤로 좌→우 그어짐) */}
      <motion.span
        aria-hidden
        style={{ width: strike }}
        className="pointer-events-none absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-haze/80"
      />
    </motion.div>
  );
}

/* ── C. 핵심(골드): AI를 '어떻게' 써야 하는가 ── */
function BeatCore({ p }: { p: MotionValue<number> }) {
  const s = useBeatStyle(p, 0.36, 0.5);
  const lineW = useTransform(p, [0.4, 0.47], ["0%", "100%"]);
  return (
    <motion.div
      style={s}
      className="absolute inset-x-0 flex flex-col items-center px-[clamp(2.5rem,6vw,8rem)] text-center"
    >
      <Kicker className="justify-center">BUT THIS — 우리가 다루는 것</Kicker>
      <p className="mt-12 font-display font-bold leading-[1.28] text-bone text-[clamp(2.2rem,4.6vw,5rem)]">
        <span className="block whitespace-nowrap">우리는 —</span>
        <span className="mt-3 block whitespace-nowrap">
          AI를{" "}
          <span className="relative inline-block text-gold [text-shadow:0_0_46px_rgba(232,181,75,0.5)]">
            &apos;어떻게&apos;
            <motion.span
              aria-hidden
              style={{ width: lineW }}
              className="absolute -bottom-2 left-0 h-[4px] rounded-full bg-gold/80"
            />
          </span>{" "}
          써야 하는가를 다룬다.
        </span>
      </p>
    </motion.div>
  );
}

/* ── D. 거대 비유: 어도비/PPT/캔바가 아니라 → '컴퓨터' 거대 골드 ── */
function BeatComputer({ p }: { p: MotionValue<number> }) {
  const s = useBeatStyle(p, 0.52, 0.78);
  /* 상단 "~쓰는 법이 아니라" 는 살짝 흐려지며 '컴퓨터'에 양보 */
  const topDim = useTransform(p, [0.62, 0.7], [1, 0.4]);
  /* 컴퓨터 메가 점등 */
  const compO = useTransform(p, [0.62, 0.7], [0, 1]);
  const compScale = useTransform(p, [0.62, 0.72], [0.86, 1]);
  const compGlow = useTransform(p, [0.66, 0.74], [0, 1]);
  return (
    <motion.div
      style={s}
      className="absolute inset-x-0 flex flex-col items-center px-[clamp(2rem,5vw,7rem)] text-center"
    >
      <motion.p
        style={{ opacity: topDim }}
        className="font-display font-medium leading-[1.4] text-bone/70 text-[clamp(1.3rem,2.5vw,2.4rem)]"
      >
        <span className="whitespace-nowrap">
          어도비 쓰는 법, PPT 쓰는 법, 캔바 쓰는 법이 아니라 —
        </span>
      </motion.p>

      <div className="relative mt-[clamp(2.2rem,5.5vh,4.6rem)] flex items-baseline justify-center gap-[clamp(0.5rem,1.2vw,1.2rem)]">
        {/* 컴퓨터 거대 골드 */}
        <span className="relative inline-block">
          <motion.span
            aria-hidden
            style={{
              opacity: compGlow,
              background: "radial-gradient(50% 50% at 50% 50%, rgba(232,181,75,0.26), transparent 70%)",
            }}
            className="animate-pulse-soft pointer-events-none absolute -inset-x-[16%] -inset-y-[34%] rounded-full"
          />
          <motion.span
            style={{
              opacity: compO,
              scale: compScale,
              textShadow: "0 0 70px rgba(232,181,75,0.55), 0 0 26px rgba(232,181,75,0.4)",
            }}
            className="relative block origin-bottom font-display font-black leading-[0.95] text-gold text-[clamp(4.5rem,13.5vw,15rem)]"
          >
            &apos;컴퓨터&apos;
          </motion.span>
        </span>
        <motion.span
          style={{ opacity: compO }}
          className="font-display font-bold leading-tight text-bone text-[clamp(2rem,4.6vw,4.8rem)]"
        >
          쓰는 법.
        </motion.span>
      </div>

      <motion.p
        style={{ opacity: compO }}
        className="mt-[clamp(2.4rem,5.5vh,4.4rem)] font-mono text-[11px] uppercase tracking-[0.3em] text-bone/45 md:text-[13px]"
      >
        {"// 도구가 아니라 — '컴퓨터' 자체를 다루는 법을 알려주는 강의다."}
      </motion.p>
    </motion.div>
  );
}

/* ── E. 도발: "단 한 명도 없다" → 지금부터 배운다 ── */
function BeatProvoke({ p }: { p: MotionValue<number> }) {
  const s = useBeatStyle(p, 0.8, 1.0);
  /* "단 한 명도 없다" ember-ish 골드 임팩트 점등 */
  const punchO = useTransform(p, [0.86, 0.92], [0, 1]);
  const punchScale = useTransform(p, [0.86, 0.94], [0.92, 1]);
  const tailO = useTransform(p, [0.92, 0.98], [0, 1]);
  return (
    <motion.div
      style={s}
      className="absolute inset-x-0 flex flex-col items-center px-[clamp(2.5rem,6vw,8rem)] text-center"
    >
      <p className="font-display font-medium leading-[1.4] text-bone/75 text-[clamp(1.3rem,2.4vw,2.3rem)]">
        <span className="whitespace-nowrap">
          &lsquo;우리 AI 쓸 줄 알아!&rsquo; — 장담한다.
        </span>
      </p>
      <p className="mt-[clamp(1.4rem,3.4vh,2.8rem)] font-display font-bold leading-[1.26] text-bone text-[clamp(2rem,4.4vw,4.6rem)]">
        <span className="block whitespace-nowrap">여기서 AI를 &apos;제대로&apos; 쓸 줄 아는 사람은,</span>
        <motion.span
          style={{ opacity: punchO, scale: punchScale }}
          className="mt-3 block origin-center whitespace-nowrap text-gold [text-shadow:0_0_52px_rgba(232,181,75,0.55)]"
        >
          단 한 명도 없다.
        </motion.span>
      </p>
      <motion.p
        style={{ opacity: tailO }}
        className="mt-[clamp(1.8rem,4.5vh,3.4rem)] font-display font-medium leading-[1.4] text-bone/70 text-[clamp(1.2rem,2.2vw,2.1rem)]"
      >
        <span className="whitespace-nowrap">
          지금부터 배운다. <span className="text-bone">어렵지만, 본질적인 이야기.</span>
        </span>
      </motion.p>
    </motion.div>
  );
}

/* ── 비트 진행 도트(하단) ── */
function BeatDots({ p }: { p: MotionValue<number> }) {
  const centers = [0.07, 0.25, 0.43, 0.66, 0.9];
  return (
    <div className="pointer-events-none absolute bottom-[clamp(2rem,5vh,3.5rem)] left-1/2 flex -translate-x-1/2 items-center gap-3">
      {centers.map((c, i) => (
        <Dot key={i} p={p} center={c} />
      ))}
    </div>
  );
}

function Dot({ p, center }: { p: MotionValue<number>; center: number }) {
  const span = 0.09;
  const o = useTransform(
    p,
    [center - span, center, center + span],
    [0.22, 1, 0.22],
  );
  const w = useTransform(
    p,
    [center - span, center, center + span],
    [8, 26, 8],
  );
  const bg = useTransform(
    p,
    [center - span, center, center + span],
    ["rgba(242,237,227,0.3)", "rgba(232,181,75,0.95)", "rgba(242,237,227,0.3)"],
  );
  return (
    <motion.span
      style={{ opacity: o, width: w, backgroundColor: bg }}
      className="h-[3px] rounded-full"
    />
  );
}
