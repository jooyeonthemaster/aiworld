"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * N07 — 코드 에디터 위에서 AI는 100% (본론 예고)  [ACT6 클라이맥스]
 * 16:9 풀스크린 2단 + Pin 스크롤 스테이지.
 * 좌: 리드 → 100% 게이지/카운터(0→100) → 다리 카피(세리프, 본론 예고).
 * 우: 중앙 '코드 에디터' 창 노드에서 연결선이 파일·터미널·브라우저·컴퓨터 노드로
 *     뻗어나가는(무한 확장) SVG(pathLength 스크롤 연동) + 노드 점등.
 * 하단 골드 새벽빛이 차올라 다음 씬 S28(칠흑→새벽)로 톤 브릿지.
 */

/* ── 무한 확장 SVG 좌표계 (우측 비주얼) ── */
const VB = { w: 900, h: 620 };
const HUB = { x: 450, y: 310 }; // 중앙 코드 에디터 창

type Node = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  at: number; // 등장 progress 기준점
};
/* 4방으로 뻗는 노드 — '네 컴퓨터'의 구성요소 (세로로 더 벌려 컬럼을 적극 채움) */
const NODES: Node[] = [
  { id: "file", label: "파일", sub: "FILE", x: 138, y: 86, at: 0.4 },
  { id: "term", label: "터미널", sub: "TERMINAL", x: 762, y: 86, at: 0.46 },
  { id: "web", label: "브라우저", sub: "BROWSER", x: 138, y: 534, at: 0.52 },
  { id: "pc", label: "컴퓨터", sub: "COMPUTER", x: 762, y: 534, at: 0.58 },
];

/* 허브 → 노드 곡선 패스 (S자 베지에) */
function linkD(n: Node): string {
  const dx = n.x - HUB.x;
  const c1x = HUB.x + dx * 0.42;
  const c1y = HUB.y;
  const c2x = n.x - dx * 0.42;
  const c2y = n.y;
  return `M ${HUB.x} ${HUB.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${n.x} ${n.y}`;
}

export default function N07HundredPercent() {
  return (
    <section
      data-scene="n07"
      data-act="ACT 6 — 본질: 코드 에디터"
      className="relative bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.34, 0.46]);
  const gridShift = useTransform(p, [0, 1], [0, -42]);

  /* ── 하단 골드 새벽빛 (S28 브릿지) — 후반부에 차오름 ── */
  const dawnScale = useTransform(p, [0.46, 0.96], [0.1, 1]);
  const dawnO = useTransform(p, [0.46, 0.78, 1], [0, 0.7, 0.95]);
  const sunO = useTransform(p, [0.6, 1], [0, 0.85]);
  const sunY = useTransform(p, [0.6, 1], ["12vh", "2vh"]);

  /* ── 좌측 카피 비트 ── */
  const leadO = useTransform(p, [0.02, 0.13], [0, 1]);
  const leadY = useTransform(p, [0.02, 0.16], [40, 0]);

  const bigO = useTransform(p, [0.18, 0.3], [0, 1]);
  const bigY = useTransform(p, [0.18, 0.32], [34, 0]);

  const metaO = useTransform(p, [0.62, 0.72], [0, 1]);
  const metaY = useTransform(p, [0.62, 0.74], [22, 0]);

  const bridgeO = useTransform(p, [0.78, 0.9], [0, 1]);
  const bridgeY = useTransform(p, [0.78, 0.92], [30, 0]);
  const bridgeGlow = useTransform(p, [0.86, 0.98], [0, 0.45]);

  const cueO = useTransform(p, [0.92, 1], [0, 0.8]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(50% 54% at 68% 42%, rgba(232,181,75,0.12), transparent 72%)" }}
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

      {/* ── 하단 골드 새벽빛 (S28 톤 브릿지) ── */}
      <motion.div
        aria-hidden
        style={{ scaleX: dawnScale, opacity: dawnO }}
        className="pointer-events-none absolute -bottom-[30vh] left-1/2 h-[80vh] w-[150vw] -translate-x-1/2 origin-bottom rounded-[100%]"
      >
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(50% 60% at 50% 100%, rgba(255,211,122,0.34), rgba(232,181,75,0.12) 46%, transparent 72%)" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ opacity: sunO, y: sunY }}
        className="pointer-events-none absolute bottom-[-8vh] left-1/2 h-[34vh] w-[34vh] -translate-x-1/2 rounded-full blur-[100px]"
      >
        <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, rgba(255,211,122,0.55), transparent 70%)" }} />
      </motion.div>

      {/* ── 콘텐츠: 2단 (content-center 로 단일 row 수직 중앙) ── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,5vw,5.5rem)] px-[clamp(2.5rem,6vw,8rem)] lg:grid-cols-[0.94fr_1.06fr]">
        {/* ── 좌측: 카피 + 100% 게이지 ── */}
        <div className="flex flex-col justify-center">
          <motion.div style={{ opacity: leadO, y: leadY }}>
            <Kicker>ACT 6 — 본질 / 100% &amp; INFINITE</Kicker>
            <p className="mt-9 font-display font-bold leading-[1.42] text-bone/90 text-[clamp(1.5rem,2.5vw,2.5rem)]">
              그리고 — 이 코드 에디터 위에서,
              <br />
              AI는 비로소{" "}
              <span className="whitespace-nowrap text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.4)]">
                100%의 성능
              </span>
              을 낸다.
            </p>
          </motion.div>

          <motion.div style={{ opacity: bigO, y: bigY }} className="mt-[clamp(2.5rem,5vh,4rem)]">
            <Gauge p={p} />
          </motion.div>

          {/* 메타 (선택) */}
          <motion.p
            style={{ opacity: metaO, y: metaY }}
            className="mt-[clamp(2rem,4.5vh,3.4rem)] text-balance-k leading-relaxed text-bone/55 text-[clamp(1rem,1.35vw,1.4rem)]"
          >
            지금 이 발표 자료도, 바로 그 환경에서 —{" "}
            <span className="whitespace-nowrap text-bone/85">AI와 함께 만들어졌다.</span>
          </motion.p>

          {/* 다리 — 본론 예고 (세리프) */}
          <motion.div style={{ opacity: bridgeO, y: bridgeY }} className="relative mt-[clamp(2.2rem,5vh,3.6rem)]">
            <motion.div
              aria-hidden
              style={{ opacity: bridgeGlow }}
              className="pointer-events-none absolute -inset-x-8 -inset-y-6 rounded-3xl"
            >
              <div className="h-full w-full" style={{ background: "radial-gradient(60% 70% at 30% 50%, rgba(232,181,75,0.14), transparent 72%)" }} />
            </motion.div>
            <p className="relative font-display font-bold leading-[1.42] text-bone text-[clamp(1.7rem,2.9vw,2.9rem)]">
              무슨 모델이 좋은지가 아니라 —
              <br />
              <span className="whitespace-nowrap">
                이 <span className="text-gold">&apos;환경&apos;</span>을 다루는 법.
              </span>
            </p>
            <motion.p
              style={{ opacity: cueO }}
              className="relative mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold/80 md:text-xs"
            >
              <span className="inline-block h-px w-9 bg-gold/55" />
              지금부터, 본격적으로 시작한다.
            </motion.p>
          </motion.div>
        </div>

        {/* ── 우측: 무한 확장 다이어그램 ── */}
        <div className="grid h-full w-full place-items-center">
          <ExpansionMap p={p} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── 100% 게이지 (스크롤 연동 0→100) ───────────────────────── */
function Gauge({ p }: { p: MotionValue<number> }) {
  const fill = useTransform(p, [0.22, 0.56], ["0%", "100%"]);
  const num = useTransform(p, [0.22, 0.56], [0, 100]);
  const text = useTransform(num, (n: number) => Math.round(n).toString());
  const barGlow = useTransform(p, [0.46, 0.6], [0, 1]);
  const infO = useTransform(p, [0.5, 0.62], [0, 1]);
  const infX = useTransform(p, [0.5, 0.64], [-18, 0]);

  return (
    <div className="w-full max-w-[560px]">
      {/* 숫자 + ∞ */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-baseline">
          <span
            className="relative inline-block font-display font-black leading-none tabular-nums text-gold text-[clamp(3.4rem,6.4vw,6rem)]"
            style={{ textShadow: "0 0 55px rgba(232,181,75,0.5), 0 0 18px rgba(232,181,75,0.35)" }}
          >
            <span
              aria-hidden
              className="animate-pulse-soft absolute -inset-x-7 -inset-y-4 rounded-full"
              style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(232,181,75,0.2), transparent 70%)" }}
            />
            <motion.span className="relative">{text}</motion.span>
          </span>
          <span className="ml-1 font-display font-bold leading-none text-gold text-[clamp(1.6rem,2.8vw,2.6rem)]">%</span>
        </div>

        {/* 무한 — 게이지가 차면 ∞ 로 넘어감 */}
        <motion.div
          style={{ opacity: infO, x: infX }}
          className="flex items-baseline gap-2.5 pb-2"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone/45 md:text-xs">활용 가능성</span>
          <span
            className="font-display font-black leading-none text-gold text-[clamp(2.4rem,4.6vw,4rem)]"
            style={{ textShadow: "0 0 40px rgba(232,181,75,0.5)" }}
          >
            ∞
          </span>
        </motion.div>
      </div>

      {/* 트랙 */}
      <div className="relative mt-5 h-[clamp(12px,1.3vw,18px)] w-full overflow-hidden rounded-full border border-bone/12 bg-bone/[0.04]">
        <motion.div
          style={{ width: fill }}
          className="relative h-full rounded-full bg-gradient-to-r from-gold/55 via-gold to-gold-bright"
        >
          <motion.div
            aria-hidden
            style={{ opacity: barGlow }}
            className="absolute inset-0 rounded-full"
          >
            <div className="h-full w-full rounded-full" style={{ boxShadow: "0 0 28px rgba(232,181,75,0.65)" }} />
          </motion.div>
        </motion.div>
      </div>

      {/* 라벨 */}
      <p className="mt-5 text-balance-k leading-relaxed text-bone/80 text-[clamp(1.05rem,1.5vw,1.55rem)]">
        코드 에디터를 쥐면 — AI가{" "}
        <span className="whitespace-nowrap text-gold">&apos;네 컴퓨터&apos;</span>에 직접 접속한다.
        <br />
        거기서부터, 활용 가능성은 — <span className="whitespace-nowrap text-gold">무한하다.</span>
      </p>
    </div>
  );
}

/* ───────────────────────── 무한 확장 다이어그램 ───────────────────────── */
function ExpansionMap({ p }: { p: MotionValue<number> }) {
  /* 허브 등장 */
  const hubO = useTransform(p, [0.14, 0.26], [0, 1]);
  const hubScale = useTransform(p, [0.14, 0.28], [0.86, 1]);
  const hubGlow = useTransform(p, [0.3, 0.6], [0.2, 0.6]);

  return (
    <div className="relative aspect-[900/620] w-full max-w-[900px]">
      {/* 후광 */}
      <motion.div
        aria-hidden
        style={{ opacity: hubGlow }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
      >
        <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, rgba(232,181,75,0.4), transparent 70%)" }} />
      </motion.div>

      {/* SVG — 연결선 + 노드 마커 */}
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="n07link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(232,181,75,0.85)" />
            <stop offset="100%" stopColor="rgba(255,211,122,0.55)" />
          </linearGradient>
        </defs>
        {NODES.map((n) => (
          <Link key={n.id} p={p} n={n} />
        ))}
      </svg>

      {/* 노드 카드 (HTML 오버레이 — 텍스트 가독성) */}
      {NODES.map((n) => (
        <NodeCard key={n.id} p={p} n={n} />
      ))}

      {/* 중앙 코드 에디터 창 */}
      <motion.div
        style={{
          opacity: hubO,
          scale: hubScale,
          left: `${(HUB.x / VB.w) * 100}%`,
          top: `${(HUB.y / VB.h) * 100}%`,
        }}
        className="absolute z-10 w-[clamp(220px,34%,300px)] -translate-x-1/2 -translate-y-1/2"
      >
        <EditorWindow p={p} />
      </motion.div>
    </div>
  );
}

/* 허브→노드 연결선 (pathLength 스크롤 연동) + 흐르는 펄스 */
function Link({ p, n }: { p: MotionValue<number>; n: Node }) {
  const len = useTransform(p, [n.at, n.at + 0.14], [0, 1]);
  const o = useTransform(p, [n.at, n.at + 0.08], [0, 1]);
  const d = linkD(n);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="url(#n07link)"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeDasharray="0.5 0.06"
      style={{ pathLength: len, opacity: o, filter: "drop-shadow(0 0 6px rgba(232,181,75,0.45))" }}
    />
  );
}

/* 끝점 노드 카드 */
function NodeCard({ p, n }: { p: MotionValue<number>; n: Node }) {
  const o = useTransform(p, [n.at + 0.1, n.at + 0.2], [0, 1]);
  const s = useTransform(p, [n.at + 0.1, n.at + 0.22], [0.8, 1]);
  return (
    <motion.div
      style={{ opacity: o, scale: s, left: `${(n.x / VB.w) * 100}%`, top: `${(n.y / VB.h) * 100}%` }}
      className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-xl border border-gold/35 bg-coal/85 px-[clamp(0.9rem,1.5vw,1.5rem)] py-[clamp(0.6rem,1.1vh,1rem)] backdrop-blur-sm"
    >
      <span className="font-display font-bold leading-none text-bone text-[clamp(0.95rem,1.3vw,1.35rem)]">{n.label}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold/65 md:text-[12px]">{n.sub}</span>
    </motion.div>
  );
}

/* 중앙 코드 에디터 창 목업 (VSCode 톤) */
function EditorWindow({ p }: { p: MotionValue<number> }) {
  const caret = useTransform(p, [0.3, 0.34, 0.38, 0.42], [0.2, 1, 0.2, 1]);
  return (
    <div className="overflow-hidden rounded-xl border border-gold/45 bg-[#0c0a10] shadow-[0_0_60px_rgba(232,181,75,0.28)]">
      {/* 타이틀바 */}
      <div className="flex items-center gap-1.5 border-b border-bone/10 bg-coal/90 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ember/70" />
        <span className="h-2 w-2 rounded-full bg-gold/70" />
        <span className="h-2 w-2 rounded-full bg-bone/30" />
        <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/45 md:text-[11px]">CODE EDITOR</span>
      </div>
      {/* 코드 라인 */}
      <div className="space-y-2 px-3.5 py-3.5">
        {[
          { w: "62%", c: "bg-gold/55" },
          { w: "82%", c: "bg-bone/22" },
          { w: "48%", c: "bg-bone/22" },
          { w: "70%", c: "bg-gold/35" },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-mono text-[7px] text-bone/25 md:text-[8px]">{i + 1}</span>
            <span className="h-[5px] rounded-full md:h-1.5" style={{ width: row.w }} >
              <span className={`block h-full rounded-full ${row.c}`} />
            </span>
            {i === 0 ? (
              <motion.span style={{ opacity: caret }} className="ml-0.5 h-[10px] w-[1.5px] bg-gold md:h-3" />
            ) : null}
          </div>
        ))}
      </div>
      {/* 터미널 점 */}
      <div className="flex items-center gap-2 border-t border-bone/10 bg-[#08070b] px-3.5 py-2">
        <span className="font-mono text-[9px] text-gold/70 md:text-[11px]">$</span>
        <span className="font-mono text-[9px] tracking-[0.15em] text-bone/35 md:text-[11px]">AI · connected</span>
      </div>
    </div>
  );
}
