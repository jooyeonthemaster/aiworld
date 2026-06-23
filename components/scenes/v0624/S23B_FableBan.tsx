"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/* ============================================================
   S23B — 3일 만에 꺼진 모델 (핀 5 · 5비트)
   S23(FABLE 공개의 환희) 직후 충격 반전.
   ACT4 기밀문서 + ember 수출통제/지정학 → ACT5 골드 새벽으로 전환.
   2026.06.09 공개 → 06.12(3일 만) 트럼프 행정부 수출통제 발동 →
   미국 밖 전 지역 + 미국 내 모든 외국인 + 자사 외국 국적 직원까지 차단 →
   앤트로픽 전 세계 차단(Opus 4.8 등은 유지). 사유: 국가안보 / 90분 통보.

   모든 비트는 16:9 풀스크린을 시원하게 채운다(2단 grid · content-center).
   모든 모션은 Pin progress 의 useTransform 으로 직결(정적 in-view 금지).
   ============================================================ */

const EXPORT_ITEMS = [
  { code: "§ 01", text: "미국 밖 — 전 지역 차단" },
  { code: "§ 02", text: "미국 안 — 모든 외국인 차단 (H1-B 비자 포함)" },
  {
    code: "§ 03",
    text: "앤트로픽 자사 직원도 — 외국 국적이면 차단 (캐나다·영국 동맹국까지)",
  },
];

/* 5비트 진행도 윈도우 [enter0, enter1, exit0, exit1] */
const WIN = {
  a: [0.0, 0.05, 0.16, 0.21] as const,
  b: [0.21, 0.27, 0.39, 0.44] as const,
  c: [0.44, 0.5, 0.62, 0.67] as const,
  d: [0.67, 0.73, 0.83, 0.88] as const,
  e: [0.88, 0.93, 1.0, 1.0] as const,
};

export default function Scene23B() {
  return (
    <section
      data-scene="s23b"
      data-act="ACT 4 — 어떤 회사 이야기"
      className="relative bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 핀 스테이지 — render-prop 내부 hook 금지 → 분리                      */
/* ------------------------------------------------------------------ */
function Stage({ p }: { p: MotionValue<number> }) {
  /* 배경 — ember 경고가 차오르다 비트E에서 가심 */
  const emberO = useTransform(p, [0.0, 0.2, 0.62, 0.86, 1], [0.12, 0.6, 0.7, 0.5, 0]);
  /* 하단 골드 새벽빛 — 비트E에서 차오름 (ACT5 톤 전환) — 더 일찍/높게 */
  const dawnO = useTransform(p, [0.84, 0.92, 1], [0, 0.7, 1]);
  /* 세계지도 — 미국만 골드 점등 강도 / 배경 패럴랙스 시프트 */
  const usGlowO = useTransform(p, [0.0, 0.46, 0.9], [0.22, 0.7, 0.45]);
  const mapShift = useTransform(p, [0, 1], [0, -52]);
  const mapO = useTransform(p, [0.0, 0.2, 0.86, 1], [0.42, 0.55, 0.5, 0.16]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ─────────────── 배경: 세계지도 / 국경선 암시 ─────────────── */}
      <motion.div style={{ y: mapShift, opacity: mapO }} className="absolute inset-0">
        <WorldGrid usGlowO={usGlowO} />
      </motion.div>

      {/* 상단 ember 경고 기운 */}
      <motion.div
        aria-hidden
        style={{ opacity: emberO }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[62vh]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ember/[0.16] to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(64% 72% at 50% 0%, rgba(255,75,46,0.17), transparent 72%)",
          }}
        />
      </motion.div>

      {/* 하단 골드 새벽빛 — ACT5 톤 전환 */}
      <motion.div
        aria-hidden
        style={{ opacity: dawnO }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[68vh]"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(85% 110% at 50% 100%, rgba(232,181,75,0.22), transparent 70%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[24vh] bg-gradient-to-t from-gold/[0.12] to-transparent" />
      </motion.div>

      {/* 비네트 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 92% 82% at 50% 50%, transparent 40%, #07060a 98%)",
        }}
      />

      {/* 좌측 세로 파일 라벨 */}
      <div
        aria-hidden
        className="absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[10px] tracking-[0.5em] text-ember/35 lg:block"
      >
        FILE 23B — EXPORT CONTROL // 96 HOURS
      </div>

      {/* 우측 단계 인디케이터 */}
      <div className="absolute right-7 top-1/2 hidden -translate-y-1/2 flex-col gap-5 lg:flex">
        <PhaseTick p={p} at={0.05} label="DROP" />
        <PhaseTick p={p} at={0.27} label="ORDER" />
        <PhaseTick p={p} at={0.5} label="BLOCK" />
        <PhaseTick p={p} at={0.73} label="ASSET" />
        <PhaseTick p={p} at={0.93} label="DAWN" tone="gold" />
      </div>

      {/* ─────────────── 비트들 ─────────────── */}
      <BeatA p={p} />
      <BeatB p={p} />
      <BeatC p={p} />
      <BeatD p={p} />
      <BeatE p={p} />
    </div>
  );
}

/* shell — 비트 공통 풀스크린 래퍼 + 크로스페이드 */
function BeatShell({
  p,
  win,
  children,
}: {
  p: MotionValue<number>;
  win: readonly [number, number, number, number];
  children: React.ReactNode;
}) {
  const [e0, e1, x0, x1] = win;
  const o = useTransform(p, [e0, e1, x0, x1], [0, 1, 1, 0]);
  const y = useTransform(p, [e0, e1], [46, 0]);
  return (
    <motion.div
      style={{ opacity: o, y }}
      className="absolute inset-0 z-10 mx-auto grid h-full w-full max-w-[1600px] content-center items-center px-[clamp(2.5rem,6vw,8rem)]"
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   비트 A — 그 환희는 3일을 가지 못했다 (메가 선언, 가로 풀폭)
   ============================================================ */
function BeatA({ p }: { p: MotionValue<number> }) {
  return (
    <BeatShell p={p} win={WIN.a}>
      <div className="grid grid-cols-1 content-center items-center gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[1.18fr_0.82fr]">
        {/* 좌 — 메가 선언 */}
        <div>
          <Kicker tone="ember">ACT 4 — THE LIGHT WENT OUT</Kicker>
          <h2 className="mt-10 font-display font-black leading-[1.14] text-bone text-[clamp(3rem,7vw,7.2rem)]">
            <span className="block whitespace-nowrap">그런데 — 그 환희는,</span>
            <span className="block whitespace-nowrap">
              <span className="animate-flicker text-ember [text-shadow:0_0_56px_rgba(255,75,46,0.5)]">
                3일
              </span>
              을 가지 못했다.
            </span>
          </h2>
          <p className="mt-12 font-mono text-[12px] tracking-[0.42em] text-ember/70 md:text-[13px]">
            2026. 06. 09 — PUBLIC DROP · T+72H
          </p>
        </div>

        {/* 우 — 꺼지는 카운트다운 비주얼 */}
        <div className="relative hidden h-[58vh] items-center justify-center lg:flex">
          <CountdownGlyph p={p} />
        </div>
      </div>
    </BeatShell>
  );
}

/* 우측 비주얼 — T+72H 가 ember 로 깜빡이다 차단되는 듯한 거대 글리프 */
function CountdownGlyph({ p }: { p: MotionValue<number> }) {
  const ringLen = useTransform(p, [0.04, 0.16], [0, 1]);
  const slashSx = useTransform(p, [0.12, 0.19], [0, 1]);
  return (
    <div className="relative w-full max-w-[460px]">
      <svg viewBox="0 0 400 400" className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="s23b-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,75,46,0.95)" />
            <stop offset="100%" stopColor="rgba(255,75,46,0.25)" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,75,46,0.12)" strokeWidth={2} />
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="url(#s23b-ring)"
          strokeWidth={6}
          strokeLinecap="round"
          transform="rotate(-90 200 200)"
          style={{ pathLength: ringLen, filter: "drop-shadow(0 0 16px rgba(255,75,46,0.5))" }}
        />
        {/* 차단 사선 */}
        <motion.line
          x1="92"
          y1="92"
          x2="308"
          y2="308"
          stroke="rgba(255,75,46,0.85)"
          strokeWidth={7}
          strokeLinecap="round"
          style={{ pathLength: slashSx, filter: "drop-shadow(0 0 14px rgba(255,75,46,0.55))" }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="animate-flicker font-display text-[clamp(3rem,6vw,5rem)] font-black leading-none text-ember [text-shadow:0_0_40px_rgba(255,75,46,0.45)]">
          72h
        </span>
        <span className="mt-3 font-mono text-[10px] tracking-[0.4em] text-ember/70">
          DROP → DARK
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   비트 B — 날짜 스탬프 / 수출통제 발동 (거대 모노 날짜 + 내러티브)
   ============================================================ */
function BeatB({ p }: { p: MotionValue<number> }) {
  return (
    <BeatShell p={p} win={WIN.b}>
      <div className="flex flex-col">
        <Kicker tone="ember">ACT 4 — 96 HOURS LATER</Kicker>
        <DateStamp p={p} from={WIN.b[1]} to={WIN.b[1] + 0.06} />
        <div className="mt-[clamp(2.5rem,5vh,4rem)] grid grid-cols-1 items-end gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[1.3fr_0.7fr]">
          <p className="font-display font-bold leading-[1.34] text-bone text-[clamp(2rem,4vw,4rem)]">
            <span className="whitespace-nowrap">트럼프 행정부가 —</span>{" "}
            <span className="whitespace-nowrap text-ember [text-shadow:0_0_42px_rgba(255,75,46,0.4)]">
              수출통제를 발동했다.
            </span>
          </p>
          <p className="font-mono text-[11px] leading-relaxed tracking-[0.26em] text-bone/45 md:text-[12px]">
            상무장관 러트닉
            <br />→ 아모데이 서한
            <br />
            FABLE 5 · MYTHOS 5
          </p>
        </div>
      </div>
    </BeatShell>
  );
}

/* DateStamp — 거대 모노 날짜, 글자별 드롭 (S23 DropChars 문법) */
function DateStamp({
  p,
  from,
  to,
}: {
  p: MotionValue<number>;
  from: number;
  to: number;
}) {
  const text = "2026. 06. 12.";
  const chars = Array.from(text);
  const step = (to - from) / chars.length;

  return (
    <div className="relative mt-10 w-full">
      <span
        className="flex items-end font-mono font-bold leading-none tracking-[-0.02em] text-bone text-[clamp(3.5rem,12vw,11rem)]"
        aria-label={text}
      >
        {chars.map((ch, i) => (
          <DropChar key={i} p={p} at={from + i * step} ch={ch} />
        ))}
      </span>
      <UnderBar p={p} at={to} />
    </div>
  );
}

function DropChar({ p, at, ch }: { p: MotionValue<number>; at: number; ch: string }) {
  const y = useTransform(p, [at, at + 0.02], ["-118%", "0%"]);
  const o = useTransform(p, [at, at + 0.02], [0, 1]);
  return (
    <span className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]">
      <motion.span style={{ y, opacity: o }} className="inline-block">
        {ch === " " ? " " : ch}
      </motion.span>
    </span>
  );
}

function UnderBar({ p, at }: { p: MotionValue<number>; at: number }) {
  const sx = useTransform(p, [at, at + 0.05], [0, 1]);
  return (
    <motion.span
      aria-hidden
      style={{ scaleX: sx }}
      className="mt-6 block h-[2px] w-full origin-left bg-gradient-to-r from-ember/80 via-ember/40 to-transparent"
    />
  );
}

/* ============================================================
   비트 C — 공문서 카드 (차단 범위). 화면을 크게 점유.
   2단: 좌 거대 헤드라인 / 우 공문서 카드(ember 보더, 종이 스캔, redacted 걷힘).
   ============================================================ */
function BeatC({ p }: { p: MotionValue<number> }) {
  const emberLineSx = useTransform(p, [WIN.c[1], WIN.c[2]], [0, 1]);
  return (
    <BeatShell p={p} win={WIN.c}>
      <div className="grid grid-cols-1 content-center items-center gap-[clamp(2rem,4vw,4.5rem)] lg:grid-cols-[0.78fr_1.22fr]">
        {/* 좌 — 헤드라인 (컬럼 세로 채움) */}
        <div className="flex h-full flex-col justify-center">
          <Kicker tone="ember">U.S. DEPT. OF COMMERCE</Kicker>
          <h2 className="mt-9 font-display font-black leading-[1.18] text-bone text-[clamp(2.2rem,3.6vw,4rem)]">
            <span className="block">수출통제</span>
            <span className="block text-ember [text-shadow:0_0_40px_rgba(255,75,46,0.4)]">
              차단 범위
            </span>
          </h2>
          <p className="mt-8 max-w-[34ch] font-body leading-relaxed text-bone/55 text-[clamp(1rem,1.4vw,1.5rem)]">
            앤트로픽은 컴플라이언스를 위해
            <br className="hidden lg:block" /> 전 세계 고객 대상으로
            <br className="hidden lg:block" /> Fable·Mythos 를 전면 차단했다.
          </p>

          {/* 하단 ember 진행선 + 모노 캡션 — 컬럼 세로 채움 */}
          <div className="mt-[clamp(2.5rem,6vh,4.5rem)] flex flex-col gap-3">
            <motion.span
              aria-hidden
              style={{ scaleX: emberLineSx }}
              className="block h-px w-full origin-left bg-gradient-to-r from-ember/70 via-ember/35 to-transparent"
            />
            <span className="font-mono text-[10px] tracking-[0.42em] text-ember/55 md:text-[11px]">
              EXPORT CONTROL // GLOBAL BLOCK
            </span>
          </div>
        </div>

        {/* 우 — 공문서 카드 (크게) */}
        <ExportDoc p={p} />
      </div>
    </BeatShell>
  );
}

function ExportDoc({ p }: { p: MotionValue<number> }) {
  /* 카드 스캔 인 — clipPath 위→아래 */
  const clip = useTransform(
    p,
    [WIN.c[1], WIN.c[1] + 0.06],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const headO = useTransform(p, [WIN.c[1] + 0.02, WIN.c[1] + 0.06], [0, 1]);
  const punchO = useTransform(p, [WIN.c[1] + 0.085, WIN.c[1] + 0.12], [0, 1]);
  const punchY = useTransform(p, [WIN.c[1] + 0.085, WIN.c[1] + 0.12], [18, 0]);
  const barSx = useTransform(p, [WIN.c[1] + 0.1, WIN.c[1] + 0.14], [0, 1]);

  return (
    <motion.div
      style={{ clipPath: clip }}
      className="relative w-full border border-ember/50 bg-coal/85 text-left shadow-[0_50px_120px_rgba(0,0,0,0.65)] backdrop-blur-sm"
    >
      {/* 코너 틱 */}
      <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-ember/85" />
      <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-ember/85" />
      <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-ember/85" />
      <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-ember/85" />

      {/* 헤더 */}
      <motion.div
        style={{ opacity: headO }}
        className="flex items-center justify-between border-b border-ember/30 px-[clamp(1.5rem,2.2vw,2.6rem)] py-[clamp(1rem,1.6vw,1.4rem)]"
      >
        <div className="font-mono text-[clamp(0.7rem,1vw,0.95rem)] tracking-[0.2em] text-ember/90">
          EXPORT CONTROL — RE: FABLE 5 · MYTHOS 5
        </div>
        <span className="shrink-0 border border-ember/70 px-2.5 py-[3px] font-mono text-[9px] font-bold tracking-[0.3em] text-ember/90 md:text-[10px]">
          CLASSIFIED
        </span>
      </motion.div>

      {/* 항목 — redacted 바 걷히며 등장. 큰 모노. */}
      <ul className="px-[clamp(1.5rem,2.2vw,2.6rem)] py-[clamp(1.2rem,2vw,2rem)]">
        {EXPORT_ITEMS.map((item, i) => (
          <DocLine key={item.code} p={p} item={item} index={i} />
        ))}
      </ul>

      {/* 펀치 — 한국에 있는 당신 (거대, 골드 펀치) */}
      <motion.div
        style={{ opacity: punchO, y: punchY }}
        className="relative border-t border-ember/30 px-[clamp(1.5rem,2.2vw,2.6rem)] py-[clamp(1.6rem,2.6vw,2.4rem)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 120% at 30% 50%, rgba(232,181,75,0.1), transparent 72%)",
          }}
        />
        <p className="relative font-display font-black leading-[1.22] text-gold [text-shadow:0_0_38px_rgba(232,181,75,0.32)] text-[clamp(1.7rem,3.2vw,3rem)]">
          <span className="block whitespace-nowrap">한국에 있는 당신은 —</span>
          <span className="block whitespace-nowrap">이 모델을, 쓸 수 없다.</span>
        </p>
      </motion.div>

      {/* 푸터 진행바 */}
      <div className="border-t border-ember/25 px-[clamp(1.5rem,2.2vw,2.6rem)] py-4">
        <motion.div
          aria-hidden
          style={{ scaleX: barSx }}
          className="h-[2px] origin-left bg-gradient-to-r from-ember/75 to-transparent"
        />
      </div>
    </motion.div>
  );
}

function DocLine({
  p,
  item,
  index,
}: {
  p: MotionValue<number>;
  item: (typeof EXPORT_ITEMS)[number];
  index: number;
}) {
  const base = WIN.c[1] + 0.02 + index * 0.018;
  const barSx = useTransform(p, [base, base + 0.016], [1, 0]);
  const textO = useTransform(p, [base + 0.01, base + 0.026], [0, 1]);
  return (
    <li className="flex items-baseline gap-[clamp(0.8rem,1.4vw,1.6rem)] py-[clamp(0.6rem,1.1vw,1rem)] font-mono leading-snug">
      <span className="shrink-0 text-[clamp(0.7rem,1vw,0.95rem)] tracking-[0.22em] text-ember/70">
        {item.code}
      </span>
      <span className="relative flex-1">
        <motion.span
          style={{ opacity: textO }}
          className="block text-bone/90 text-[clamp(1.05rem,1.7vw,1.6rem)]"
        >
          {item.text}
        </motion.span>
        {/* redacted 바 — 우→좌로 걷힘 */}
        <motion.span
          aria-hidden
          style={{ scaleX: barSx }}
          className="absolute -inset-x-1.5 -inset-y-[3px] flex origin-right items-center bg-coal"
        >
          <span className="ml-1 font-mono text-[9px] tracking-[0.5em] text-ember/45">
            REDACTED
          </span>
        </motion.span>
      </span>
    </li>
  );
}

/* ============================================================
   비트 D — 의미(지정학 · 전략 자산). 2단: 거대 인용 / 보조 데이터.
   ============================================================ */
function BeatD({ p }: { p: MotionValue<number> }) {
  const lineSx = useTransform(p, [WIN.d[1] + 0.02, WIN.d[1] + 0.08], [0, 1]);
  return (
    <BeatShell p={p} win={WIN.d}>
      <div className="grid grid-cols-1 content-center items-center gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[1.25fr_0.75fr]">
        {/* 좌 — 거대 인용 */}
        <div className="relative">
          <Kicker tone="ember">STRATEGIC ASSET — RECLASSIFIED</Kicker>
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 top-6 font-display text-[clamp(7rem,14vw,13rem)] font-black leading-none text-ember/15"
          >
            &ldquo;
          </span>
          <h2 className="relative mt-10 font-display font-bold leading-[1.3] text-bone text-[clamp(2.1rem,4.4vw,4.4rem)]">
            AI가 드디어,
            <br />
            핵·반도체와 같은{" "}
            <span className="whitespace-nowrap text-gold [text-shadow:0_0_44px_rgba(232,181,75,0.34)]">
              &lsquo;전략 자산&rsquo;
            </span>
            의<br className="hidden lg:block" /> 반열에 올랐다.
          </h2>
        </div>

        {/* 우 — 보조 데이터 / 90분 */}
        <div className="flex flex-col gap-[clamp(1.5rem,3vh,2.5rem)] border-l border-ember/25 pl-[clamp(1.5rem,2.5vw,3rem)]">
          <div>
            <p className="font-mono text-[11px] tracking-[0.32em] text-ember/60 md:text-xs">
              REASON
            </p>
            <p className="mt-3 font-display font-bold leading-snug text-bone text-[clamp(1.4rem,2.2vw,2.2rem)]">
              사유는 <span className="text-ember">국가안보.</span>
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.32em] text-ember/60 md:text-xs">
              NOTICE → GLOBAL BLOCK
            </p>
            <p className="mt-1 flex items-baseline gap-3">
              <span className="font-mono font-black leading-none text-ember tabular-nums [text-shadow:0_0_40px_rgba(255,75,46,0.4)] text-[clamp(3.5rem,7vw,6.5rem)]">
                90
              </span>
              <span className="font-display font-bold text-bone/85 text-[clamp(1.4rem,2.4vw,2.4rem)]">
                분.
              </span>
            </p>
            <p className="mt-2 font-body leading-relaxed text-bone/45 text-[clamp(0.95rem,1.3vw,1.3rem)]">
              통보부터 전 세계 차단까지.
            </p>
          </div>
          <motion.div
            aria-hidden
            style={{ scaleX: lineSx }}
            className="h-px w-full origin-left bg-gradient-to-r from-ember/60 to-transparent"
          />
          <p className="font-mono text-[clamp(0.78rem,1.05vw,1rem)] leading-relaxed tracking-[0.18em] text-bone/55">
            이제 격차는 개인을 넘어 —<br />국가 단위로 벌어진다.
          </p>
        </div>
      </div>
    </BeatShell>
  );
}

/* ============================================================
   비트 E — 최강의 문은 닫혔다 → ACT5 (어깨/Opus 4.8). 골드로 전환.
   ============================================================ */
function BeatE({ p }: { p: MotionValue<number> }) {
  /* 우측 골드 카드 등장을 좌측 BeatShell ramp([WIN.e[0],WIN.e[1]])와 겹치게 앞당김 →
     좌측이 full 되는 시점(p≈0.93)에 우측 카드도 100% (데드존 제거) */
  const punchO = useTransform(p, [WIN.e[0] + 0.02, WIN.e[1]], [0, 1]);
  const punchY = useTransform(p, [WIN.e[0] + 0.02, WIN.e[1]], [26, 0]);
  return (
    <BeatShell p={p} win={WIN.e}>
      <div className="grid grid-cols-1 content-center items-center gap-[clamp(2rem,4vw,4.5rem)] lg:grid-cols-[1.05fr_0.95fr]">
        {/* 좌 — 메가 선언 (ember 꺼지고 골드로) */}
        <div>
          <h2 className="font-display font-black leading-[1.16] text-bone text-[clamp(2.6rem,5.6vw,5.8rem)]">
            <span className="block whitespace-nowrap">최강의 문은 닫혔다.</span>
            <span className="mt-3 block leading-[1.24] text-[clamp(2rem,4.4vw,4.6rem)]">
              그러나 거인은, 아직
              <br />
              <span className="text-gold [text-shadow:0_0_50px_rgba(232,181,75,0.4)]">
                어깨를 내주고 있다.
              </span>
            </span>
          </h2>
        </div>

        {/* 우 — 골드 카드 (Opus 4.8 / 행동 촉구) */}
        <motion.div style={{ opacity: punchO, y: punchY }} className="relative w-full">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 50% 55%, rgba(232,181,75,0.16), transparent 72%)",
            }}
          />
          <div className="relative border border-gold/50 bg-gold/[0.05] px-[clamp(1.8rem,3.2vw,3.4rem)] py-[clamp(2rem,3.4vw,3.2rem)]">
            <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-gold" />
            <span aria-hidden className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-gold" />
            <span aria-hidden className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-gold" />
            <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-gold" />

            <p className="font-mono text-[11px] uppercase tracking-[0.42em] text-gold/75 md:text-xs">
              STILL IN YOUR HANDS
            </p>
            <p className="mt-7 font-display font-bold leading-[1.3] text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.3)] text-[clamp(1.7rem,3.2vw,2.9rem)]">
              Opus 4.8은 지금도
              <br className="hidden lg:block" /> 당신 손안에 있다.
            </p>
            <p className="mt-6 font-body leading-relaxed text-bone/75 text-[clamp(1.1rem,1.7vw,1.6rem)]">
              지금 올라타지 않으면 —<br className="hidden lg:block" /> 그 문마저, 언제 닫힐지 모른다.
            </p>
          </div>
        </motion.div>
      </div>
    </BeatShell>
  );
}

/* ============================================================
   WorldGrid — 세계지도/국경선 암시. 가는 SVG 경위선 + 미국만 골드,
   그 외 ember/haze 노드. 결정적 좌표만 사용.
   ============================================================ */
function WorldGrid({ usGlowO }: { usGlowO: MotionValue<number> }) {
  const cols = Array.from({ length: 16 }, (_, i) => 36 + i * 84);
  const rows = Array.from({ length: 9 }, (_, i) => 48 + i * 78);
  /* 미국 밖 ember 노드 — 결정적 의사난수 좌표 */
  const nodes = Array.from({ length: 30 }, (_, i) => ({
    x: 70 + ((i * 173) % 1180),
    y: 60 + ((i * 271) % 560),
    r: 1.2 + ((i * 37) % 3) * 0.55,
  }));

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        maskImage:
          "radial-gradient(80% 80% at 50% 48%, black 30%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(80% 80% at 50% 48%, black 30%, transparent 100%)",
      }}
    >
      <svg
        viewBox="0 0 1280 680"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        {/* 경위선 격자 */}
        {cols.map((x) => (
          <line
            key={`c${x}`}
            x1={x}
            y1={0}
            x2={x}
            y2={680}
            stroke="rgba(139,132,148,0.15)"
            strokeWidth={0.6}
          />
        ))}
        {rows.map((y) => (
          <line
            key={`r${y}`}
            x1={0}
            y1={y}
            x2={1280}
            y2={y}
            stroke="rgba(139,132,148,0.15)"
            strokeWidth={0.6}
          />
        ))}

        {/* 미국 밖 ember 노드 (차단된 세계) */}
        {nodes.map((n, i) => (
          <circle key={`n${i}`} cx={n.x} cy={n.y} r={n.r} fill="rgba(255,75,46,0.5)" />
        ))}

        {/* 미국 영역 — 골드 점등 (좌상단 대륙 암시) */}
        <motion.g style={{ opacity: usGlowO }}>
          <path
            d="M150 200 L370 178 L450 240 L410 330 L250 368 L160 308 Z"
            fill="rgba(232,181,75,0.1)"
            stroke="rgba(232,181,75,0.72)"
            strokeWidth={1.2}
          />
          <circle cx="300" cy="270" r="4" fill="rgba(255,211,122,0.95)" />
          <circle cx="300" cy="270" r="11" fill="none" stroke="rgba(232,181,75,0.4)" strokeWidth={1.1} />
          <circle
            cx="300"
            cy="270"
            r="20"
            fill="none"
            stroke="rgba(232,181,75,0.18)"
            strokeWidth={1}
          />
        </motion.g>
      </svg>
    </div>
  );
}

/* ============================================================
   PhaseTick — 우측 단계 인디케이터 점등
   ============================================================ */
function PhaseTick({
  p,
  at,
  label,
  tone = "ember",
}: {
  p: MotionValue<number>;
  at: number;
  label: string;
  tone?: "ember" | "gold";
}) {
  const o = useTransform(p, [at - 0.03, at + 0.03], [0.16, 1]);
  const color = tone === "gold" ? "text-gold/90" : "text-ember/90";
  const dot = tone === "gold" ? "bg-gold/90" : "bg-ember/90";
  return (
    <motion.div style={{ opacity: o }} className="flex items-center justify-end gap-3">
      <span className={`font-mono text-[10px] tracking-[0.35em] ${color}`}>{label}</span>
      <span className={`h-[6px] w-[6px] ${dot}`} />
    </motion.div>
  );
}
