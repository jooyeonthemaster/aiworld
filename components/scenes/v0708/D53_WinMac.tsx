"use client";

import { ReactNode } from "react";
import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D53 — Windows vs Mac 차이 요약  [마무리 · 완성]
 * 선언/정보형 독립 Pin 씬 (N06/N07 패턴 상속).
 * 16:9 풀스크린: 중앙 메가 리드 → 좌(Windows) · 우(macOS) 비교표가
 * 행 단위로 순차 점등. macOS 컬럼 헤더만 골드 강조(이 씬의 유일한 강조).
 * "거의 똑같고, 키만 살짝 다르다" — 같은 키(label)에 키만 다르다는 메시지를
 * 가운데 '항목' 컬럼을 축으로 좌우 대칭 그리드로 시원하게.
 */

type Row = {
  label: string; // 비교 항목
  win: string; // Windows 값
  mac: string; // macOS 값
  mono?: boolean; // 단축키/명령어/확장자는 모노로
  same?: boolean; // 좌우가 사실상 같은 행(우클릭 메뉴 등)
};

/* 비교표 — 실제 단축키/확장자/명령어 그대로 (BIBLE 정확성) */
const ROWS: Row[] = [
  { label: "복사", win: "Ctrl + C", mac: "⌘ + C", mono: true },
  { label: "붙여넣기", win: "Ctrl + V", mac: "⌘ + V", mono: true },
  { label: "터미널 열기", win: "Ctrl + `", mac: "Ctrl + `", mono: true, same: true },
  { label: "설치 파일", win: ".exe", mac: ".pkg · .dmg", mono: true },
  { label: "전역 설치", win: "npm i -g", mac: "sudo npm i -g", mono: true },
  { label: "우클릭 메뉴", win: "‘Code로 열기’", mac: "‘Code로 열기’(설정)", same: true },
];

/* 행 등장 progress 기준점 (순차 점등) */
const START = 0.26;
const GAP = 0.075;
const atOf = (i: number) => START + i * GAP;

export default function D53WinMac() {
  return (
    <section
      data-scene="d53"
      data-act="마무리 · 완성"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.48]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* ── 리드 카피 ── */
  const kickO = useTransform(p, [0.02, 0.1], [0, 1]);
  const kickY = useTransform(p, [0.02, 0.12], [30, 0]);
  const headO = useTransform(p, [0.05, 0.16], [0, 1]);
  const headY = useTransform(p, [0.05, 0.18], [40, 0]);

  /* ── 표 헤더 (OS 라벨) ── */
  const tblO = useTransform(p, [0.2, 0.28], [0, 1]);
  const tblY = useTransform(p, [0.2, 0.3], [30, 0]);
  const macGlow = useTransform(p, [0.24, 0.34], [0, 1]);

  /* ── 풋라벨 (마지막에 점등) ── */
  const lastAt = atOf(ROWS.length - 1);
  const footO = useTransform(p, [lastAt + 0.04, lastAt + 0.14], [0, 1]);
  const footY = useTransform(p, [lastAt + 0.04, lastAt + 0.16], [24, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowO, background: "radial-gradient(54% 58% at 50% 44%, rgba(232,181,75,0.10), transparent 72%)" }}
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
            <Kicker className="justify-center">마무리 · 완성 — WINDOWS vs macOS</Kicker>
          </motion.div>
          <motion.h2
            style={{ opacity: headO, y: headY }}
            className="mt-7 font-display font-black leading-[1.16] text-bone text-[clamp(2.2rem,5vw,5rem)]"
          >
            거의 똑같고,{" "}
            <span className="whitespace-nowrap text-gold [text-shadow:0_0_38px_rgba(232,181,75,0.4)]">키만 살짝</span>{" "}
            다르다.
          </motion.h2>
          <motion.p
            style={{ opacity: headO }}
            className="mx-auto mt-6 max-w-[1100px] text-balance-k leading-relaxed text-bone/72 text-[clamp(1.05rem,1.6vw,1.65rem)]"
          >
            오늘 배운 흐름은 두 OS가 거의 같다. 아래{" "}
            <span className="whitespace-nowrap text-bone/85">여섯 항목</span>을 비교해도{" "}
            <span className="whitespace-nowrap">진짜 다른 건 키 하나 — Ctrl 자리에 ⌘다.</span>
          </motion.p>
        </div>

        {/* 비교표 */}
        <div className="w-full max-w-[1320px]">
          <CompareTable p={p} tblO={tblO} tblY={tblY} macGlow={macGlow} />
        </div>

        {/* 풋라벨 */}
        <motion.div
          style={{ opacity: footO, y: footY }}
          className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/70 md:text-xs"
        >
          <span className="inline-block h-px w-9 bg-bone/30" />
          <span>같은 길</span>
          <span className="text-bone/30">·</span>
          <span className="text-gold">다른 키 하나뿐</span>
          <span className="inline-block h-px w-9 bg-gold/55" />
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────────────────── 비교표 (항목 | Windows | macOS) ───────────────────────── */
function CompareTable({
  p,
  tblO,
  tblY,
  macGlow,
}: {
  p: MotionValue<number>;
  tblO: MotionValue<number>;
  tblY: MotionValue<number>;
  macGlow: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ opacity: tblO, y: tblY }}
      className="relative overflow-hidden rounded-3xl border border-bone/12 bg-coal/70 backdrop-blur-sm"
    >
      {/* macOS 컬럼 골드 글로우 (유일한 강조) */}
      <motion.div
        aria-hidden
        style={{ opacity: macGlow, background: "radial-gradient(50% 80% at 84% 50%, rgba(232,181,75,0.10), transparent 70%)" }}
        className="pointer-events-none absolute inset-0"
      />

      {/* 헤더 행 */}
      <div className="relative grid grid-cols-[1.05fr_1.35fr_1.35fr] border-b border-bone/12">
        <Cell head className="text-bone/45">항목</Cell>
        <Cell head className="text-bone/85">
          <OsBadge os="win" />
          <span className="font-display font-bold leading-none">Windows</span>
        </Cell>
        <Cell head className="border-l border-bone/10 text-gold">
          <OsBadge os="mac" />
          <span className="font-display font-bold leading-none text-gold [text-shadow:0_0_26px_rgba(232,181,75,0.4)]">
            macOS
          </span>
        </Cell>
      </div>

      {/* 데이터 행 */}
      {ROWS.map((r, i) => (
        <TableRow key={r.label} r={r} index={i} p={p} last={i === ROWS.length - 1} />
      ))}
    </motion.div>
  );
}

function TableRow({ r, index, p, last }: { r: Row; index: number; p: MotionValue<number>; last: boolean }) {
  const at = atOf(index);
  const o = useTransform(p, [at, at + 0.06], [0, 1]);
  const x = useTransform(p, [at, at + 0.08], [-28, 0]);

  return (
    <motion.div
      style={{ opacity: o, x }}
      className={`relative grid grid-cols-[1.05fr_1.35fr_1.35fr] ${last ? "" : "border-b border-bone/[0.08]"}`}
    >
      {/* 항목 */}
      <Cell className="text-bone/70 text-[clamp(0.95rem,1.3vw,1.4rem)]">{r.label}</Cell>

      {/* Windows */}
      <Cell className={`text-[clamp(0.95rem,1.35vw,1.5rem)] ${r.mono ? "font-mono tracking-[0.01em]" : "font-display font-medium"} text-bone/85`}>
        {r.win}
      </Cell>

      {/* macOS */}
      <Cell
        className={`border-l border-bone/[0.08] text-[clamp(0.95rem,1.35vw,1.5rem)] ${
          r.mono ? "font-mono tracking-[0.01em]" : "font-display font-medium"
        } ${r.same ? "text-bone/85" : "text-gold"}`}
      >
        <span className={r.same ? "" : "[text-shadow:0_0_20px_rgba(232,181,75,0.3)]"}>{r.mac}</span>
        {r.same ? <SameTag /> : null}
      </Cell>
    </motion.div>
  );
}

/* 셀 — 헤더/본문 공용 패딩 */
function Cell({
  children,
  head = false,
  className = "",
}: {
  children: ReactNode;
  head?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-[clamp(1.1rem,2vw,2.4rem)] ${
        head
          ? "py-[clamp(1rem,2vh,1.6rem)] font-mono text-[11px] uppercase tracking-[0.28em] md:text-[13px]"
          : "py-[clamp(0.85rem,2vh,1.5rem)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* 좌우가 같은 행 표시 칩 */
function SameTag() {
  return (
    <span className="ml-2.5 inline-flex items-center gap-1 rounded-full border border-bone/15 bg-bone/[0.04] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40 md:text-[10px]">
      = 동일
    </span>
  );
}

/* OS 미니 배지 (인라인 SVG) */
function OsBadge({ os }: { os: "win" | "mac" }) {
  const stroke = os === "mac" ? "var(--color-gold)" : "rgba(242,237,227,0.7)";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[clamp(1.1rem,1.5vw,1.5rem)] w-[clamp(1.1rem,1.5vw,1.5rem)] shrink-0"
      aria-hidden
    >
      {os === "win" ? (
        // 창 4분할 (Windows)
        <>
          <path d="M4 5.5l7-1v6.5H4V5.5z" />
          <path d="M13 4.2l7-1v8.3h-7V4.2z" />
          <path d="M4 13h7v6.5l-7-1V13z" />
          <path d="M13 13h7v8.3l-7-1V13z" />
        </>
      ) : (
        // 사과 (macOS)
        <>
          <path d="M16 13.5c0 3-2 6-4 6-1 0-1.5-.6-2.6-.6S7.6 19.5 6.5 19.5c-2 0-3.5-3.4-3.5-6.4 0-3 1.9-4.6 3.7-4.6 1.1 0 1.9.6 2.8.6.8 0 1.6-.6 2.9-.6 1.6 0 3 .9 3.6 2.3-1.6.9-2.3 3.1-1.7 4.7" transform="translate(2 0)" />
          <path d="M13 6c.4-1.6 1.8-2.9 3.2-3-.1 1.5-1.4 3-2.9 3" transform="translate(0 0)" />
        </>
      )}
    </svg>
  );
}
