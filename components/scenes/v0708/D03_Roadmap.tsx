"use client";

import { ReactNode } from "react";
import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D03 — 오늘의 로드맵 (설치할 8가지 한눈에)  [준비 · 시작 전]
 * 선언/정보형 독립 Pin 씬 (N06/N07 패턴 상속).
 * 16:9 풀스크린: 중앙 리드 → 8개 노드(2행 4열)가 연결선을 따라 순차 점등 →
 * 마지막 '배포' 노드가 골드로 점등(오늘의 도착지). 연결선은 SVG pathLength 스크롤 연동.
 */

type Step = { n: number; name: string; sub: string; icon: string };

/* 오늘 지날 8단계 — 설치/세팅 순서 그대로 */
const STEPS: Step[] = [
  { n: 1, name: "VS Code", sub: "에디터 설치", icon: "editor" },
  { n: 2, name: "한국어팩", sub: "언어 한글화", icon: "globe" },
  { n: 3, name: "폴더", sub: "작업공간 만들기", icon: "folder" },
  { n: 4, name: "Node.js", sub: "엔진 설치", icon: "engine" },
  { n: 5, name: "확장", sub: "Cline 등 장착", icon: "puzzle" },
  { n: 6, name: "API 키", sub: "AI 연결", icon: "key" },
  { n: 7, name: "Git / GitHub", sub: "백업·협업", icon: "git" },
  { n: 8, name: "Vercel 배포", sub: "세상에 공개", icon: "rocket" },
];

/* 노드 등장 progress 기준점 (순차) */
const START = 0.2;
const STEP_GAP = 0.072;
const atOf = (i: number) => START + i * STEP_GAP;

export default function D03Roadmap() {
  return (
    <section
      data-scene="d03"
      data-act="준비 · 시작 전"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.5]);
  const gridShift = useTransform(p, [0, 1], [0, -38]);

  /* ── 리드 카피 ── */
  const kickO = useTransform(p, [0.02, 0.1], [0, 1]);
  const kickY = useTransform(p, [0.02, 0.12], [30, 0]);
  const headO = useTransform(p, [0.05, 0.15], [0, 1]);
  const headY = useTransform(p, [0.05, 0.17], [38, 0]);

  /* 마지막 노드(배포) 골드 점등 시점 — lastAt ≈ 0.704, goldGlow는 [+0.05,+0.16] */
  const lastAt = atOf(STEPS.length - 1);

  /* ── 진척 라벨 (노드8 골드 점등과 같은 비트에 결착) ── */
  const footO = useTransform(p, [lastAt - 0.02, lastAt + 0.06], [0, 1]);
  const footY = useTransform(p, [lastAt - 0.02, lastAt + 0.08], [26, 0]);
  const arriveGlow = useTransform(p, [lastAt + 0.05, lastAt + 0.16], [0, 1]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowO, background: "radial-gradient(54% 58% at 50% 46%, rgba(232,181,75,0.11), transparent 72%)" }}
        className="pointer-events-none absolute inset-0"
      />
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

      {/* ── 콘텐츠 ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(2rem,5vh,4.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[8vh]">
        {/* 리드 */}
        <div className="text-center">
          <motion.div style={{ opacity: kickO, y: kickY }}>
            <Kicker className="justify-center">준비 · 시작 전 — TODAY&apos;S ROADMAP</Kicker>
          </motion.div>
          <motion.h2
            style={{ opacity: headO, y: headY }}
            className="mt-7 font-display font-black leading-[1.16] text-bone text-[clamp(2.2rem,5vw,5rem)]"
          >
            오늘 지날 길 —{" "}
            <span className="whitespace-nowrap text-bone/90">여덟 걸음</span>
          </motion.h2>
          <motion.p
            style={{ opacity: headO }}
            className="mx-auto mt-6 max-w-[1080px] text-balance-k leading-relaxed text-bone/78 text-[clamp(1.05rem,1.6vw,1.65rem)]"
          >
            0에서 1까지. 이 여덟 단계만 차례로 밟으면 — 오늘, 직접 만든 결과물을{" "}
            <span className="whitespace-nowrap text-bone/85">세상에 공개</span>한다.
          </motion.p>
        </div>

        {/* 로드맵 (연결선 + 8노드 2행 그리드) */}
        <div className="relative w-full max-w-[1480px]">
          <RoadLine p={p} />
          <div className="relative grid grid-cols-2 gap-x-[clamp(1rem,1.6vw,1.8rem)] gap-y-[clamp(1.4rem,2.6vh,2.6rem)] sm:grid-cols-4">
            {STEPS.map((s, i) => (
              <StepNode key={s.n} s={s} index={i} p={p} />
            ))}
          </div>
        </div>

        {/* 진척 풋라벨 */}
        <motion.div style={{ opacity: footO, y: footY }} className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/72 md:text-xs">
          <span className="inline-block h-px w-9 bg-bone/45" />
          <span>START</span>
          <span className="text-bone/45">────────</span>
          <motion.span style={{ opacity: arriveGlow }} className="text-gold">도착 · 세상에 공개</motion.span>
          <span className="inline-block h-px w-9 bg-gold/55" />
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────────────────── 연결선 (8노드를 잇는 진행 지도) ───────────────────────── */
/* 2행 4열 그리드의 '카드 사이 갭'만 채우는 커넥터들 — 노드↔노드를 잇는 짧은 길.
 * 카드는 z-10(불투명)이라 카드 위는 안 지나고, 갭 영역에서만 길이 보이도록 좌표를 갭에 한정.
 * preserveAspectRatio='none'(퍼센트=뷰박스 선형 매핑)이므로 0~100 분수 좌표로 계산. */
function RoadLine({ p }: { p: MotionValue<number> }) {
  // 컬럼 중심 x(%) — grid-cols-4 1/8,3/8,5/8,7/8
  const cx = [12.5, 37.5, 62.5, 87.5];
  // 카드 우/좌 가장자리(%) — 갭의 시작/끝. 카드 폭의 절반(≈11.5) 만큼 중심에서 떨어진 지점.
  const half = 11.5;
  // 두 행의 세로 중심(%) — 카드 번호배지~부제가 들어찬 카드의 수직 중앙.
  const ry = [25, 75];

  // 위 행: 카드1↔2, 2↔3, 3↔4 의 갭만 채우는 수평 커넥터 (카드 가장자리 사이)
  const topGaps = [0, 1, 2].map(
    (i) => `M ${cx[i] + half} ${ry[0]} L ${cx[i + 1] - half} ${ry[0]}`,
  );
  // 아래 행: 카드5↔6, 6↔7, 7↔8 갭 커넥터
  const botGaps = [0, 1, 2].map(
    (i) => `M ${cx[i] + half} ${ry[1]} L ${cx[i + 1] - half} ${ry[1]}`,
  );
  // 행 전환 커넥터: 카드4(우끝, 위행) 하단중앙 → 두 행 사이 빈 띠 → 카드5(좌끝, 아래행) 상단중앙.
  // 광폭 베지어는 가운데로 부풀어 양끝이 카드 뒤로 빠지고 중앙만 점등(=정체불명 사선) → '직각 ㄷ자(계단)' 라우팅으로 교체.
  // 가시 세그먼트가 두 카드 끝점에 정확히 닿고, 수평 구간은 빈 띠(midY) 안에서만 그려져 카드 뒤로 숨지 않음.
  const sx0 = cx[3]; // 4번 카드 중심 x (우상)
  const sy0 = ry[0] + 14; // 위 행 카드 하단 바로 아래 (=39)
  const sx1 = cx[0]; // 5번 카드 중심 x (좌하)
  const sy1 = ry[1] - 14; // 아래 행 카드 상단 바로 위 (=61)
  const midY = (ry[0] + ry[1]) / 2; // 두 행 사이 빈 띠 중앙 (=50, 카드 바깥 안전지대)
  // 카드4 하단중앙 ↓ → midY에서 우→좌 수평 → 카드5 상단중앙 ↓ (모서리는 살짝 둥글게: 짧은 호 대신 직각 꺾임)
  const sStep = `M ${sx0} ${sy0} L ${sx0} ${midY} L ${sx1} ${midY} L ${sx1} ${sy1}`;

  const segs = [...topGaps, sStep, ...botGaps];
  const full = segs.join(" ");

  const len = useTransform(p, [START, atOf(STEPS.length - 1) + 0.08], [0, 1]);
  const lineO = useTransform(p, [START - 0.04, START + 0.04], [0, 1]);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="d03road" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(207,200,184,0.5)" />
          <stop offset="78%" stopColor="rgba(232,181,75,0.7)" />
          <stop offset="100%" stopColor="rgba(255,211,122,0.9)" />
        </linearGradient>
      </defs>
      {/* 바닥 점선 트랙(전체 경로) */}
      <path
        d={full}
        fill="none"
        stroke="rgba(242,237,227,0.1)"
        strokeWidth={2}
        strokeDasharray="2 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* 진행 라인(스크롤 따라 채워짐) */}
      <motion.path
        d={full}
        fill="none"
        stroke="url(#d03road)"
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: len, opacity: lineO, filter: "drop-shadow(0 0 5px rgba(232,181,75,0.35))" }}
      />
    </svg>
  );
}

/* ───────────────────────── 단계 노드 카드 ───────────────────────── */
function StepNode({ s, index, p }: { s: Step; index: number; p: MotionValue<number> }) {
  const at = atOf(index);
  const o = useTransform(p, [at, at + 0.06], [0, 1]);
  const y = useTransform(p, [at, at + 0.08], [34, 0]);
  const gold = s.n === STEPS.length; // 마지막 '배포'만 골드
  const goldGlow = useTransform(p, [at + 0.05, at + 0.16], [0, 1]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className={`relative z-10 flex flex-col items-center gap-3 rounded-2xl border bg-coal/75 px-[clamp(0.9rem,1.3vw,1.5rem)] py-[clamp(1.2rem,2vh,1.9rem)] text-center backdrop-blur-sm ${gold ? "border-gold/55" : "border-bone/12"}`}
    >
      {gold ? (
        <motion.div
          aria-hidden
          style={{ opacity: goldGlow, background: "radial-gradient(62% 70% at 50% 42%, rgba(232,181,75,0.2), transparent 72%)" }}
          className="pointer-events-none absolute -inset-4 rounded-3xl"
        />
      ) : null}

      {/* 번호 배지 + 아이콘 */}
      <div className="relative flex items-center gap-3">
        <span
          className={`flex h-[clamp(2.1rem,2.8vw,2.8rem)] w-[clamp(2.1rem,2.8vw,2.8rem)] items-center justify-center rounded-full border font-display font-black tabular-nums leading-none text-[clamp(1rem,1.5vw,1.5rem)] ${gold ? "border-gold/60 bg-gold/15 text-gold [text-shadow:0_0_22px_rgba(232,181,75,0.5)]" : "border-bone/20 bg-bone/[0.05] text-bone/80"}`}
        >
          {s.n}
        </span>
        <StepIcon kind={s.icon} gold={gold} />
      </div>

      {/* 이름 */}
      <h3 className={`relative font-display font-bold leading-tight text-[clamp(1.05rem,1.45vw,1.55rem)] ${gold ? "text-gold" : "text-bone"}`}>
        {s.name}
      </h3>

      {/* 부제 */}
      <p className={`relative font-mono text-[clamp(0.72rem,0.92vw,0.95rem)] tracking-[0.04em] ${gold ? "text-gold/80" : "text-bone/70"}`}>
        {s.sub}
      </p>
    </motion.div>
  );
}

/* ───────────────────────── 미니 아이콘 (인라인 SVG, 단계별) ───────────────────────── */
const ICONS: Record<string, ReactNode> = {
  editor: ( // 코드 에디터 < >
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 9l-2 3 2 3" />
      <path d="M15 9l2 3-2 3" />
    </>
  ),
  globe: ( // 한국어팩 (지구)
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
    </>
  ),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />,
  engine: ( // Node.js (육각형)
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M9 14V9.5L15 14v-4.5" />
    </>
  ),
  puzzle: ( // 확장 (퍼즐)
    <path d="M10 4a2 2 0 0 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 0 1 0 4h-1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 0 0-4 0v1H6a1 1 0 0 1-1-1v-3H4a2 2 0 0 1 0-4h1V6a1 1 0 0 1 1-1h4V4z" />
  ),
  key: ( // API 키
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l8 8" />
      <path d="M16 16l2-2" />
      <path d="M19 19l1.5-1.5" />
    </>
  ),
  git: ( // Git/GitHub (분기)
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="9" r="2.4" />
      <path d="M6 8.4v7.2" />
      <path d="M6 12a6 6 0 0 0 6-6h3.6" />
    </>
  ),
  rocket: ( // 배포 (로켓)
    <>
      <path d="M12 3c3.5 1.5 6 5 6 9l-3 3H9l-3-3c0-4 2.5-7.5 6-9z" />
      <circle cx="12" cy="9.5" r="1.6" />
      <path d="M9 18l-2.5 3M15 18l2.5 3" />
    </>
  ),
};

function StepIcon({ kind, gold }: { kind: string; gold: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={gold ? "var(--color-gold)" : "rgba(242,237,227,0.55)"}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[clamp(1.3rem,1.8vw,1.8rem)] w-[clamp(1.3rem,1.8vw,1.8rem)]"
      aria-hidden
    >
      {ICONS[kind] ?? <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}
