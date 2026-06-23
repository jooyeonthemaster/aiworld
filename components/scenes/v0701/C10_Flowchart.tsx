"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C10 — 플로우차트 자동 생성 [CASE · 눈에 보이게 / 클러스터 B]
 * Result: SVG 로 렌더된 업무 플로우차트. 노드(주문→결제→포장→배송) + 분기(재고없음→대기).
 *   연결선이 pathLength 로 그려지고 노드가 순차 점등. 시작(주문)/끝(배송) 노드는 골드.
 */

const SCRIPT: ClineScript = {
  project: "process-map",
  userPrompt: "우리 주문→배송 프로세스 플로우차트로 그려줘. 단계별 분기 포함.",
  steps: [
    { kind: "think", label: "프로세스 파싱", detail: "단계·분기·조건 추출" },
    { kind: "create", label: "flow.svg (mermaid)", detail: "노드 5 · 분기 1 · 화살표 6" },
  ],
  // terminal 없음 (다이어그램 렌더 결과)
};

/* ── 플로우차트 노드 정의(결정적 좌표) ── */
type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  label: string;
  tone: "gold" | "step" | "branch";
};

const VB_W = 320;
const VB_H = 272;
const NH = 28; // 노드 높이

/*
 * 레이아웃 재설계 — 0길이 엣지·박스 관통·X충돌 제거:
 *  주문(160,30) → 결제(160,82) → ◇재고 확인(160,138)
 *      ├─[재고 있음]→ 포장(96,200)
 *      └─[재고 없음]→ 입고 대기(244,200) ─[입고]→ 포장(우변→좌변, 같은 행 옆면 연결)
 *  포장 → 배송 완료(160,248, 도착점 분리: pack→ship 만 진입)
 *  수직 간격을 넓혀(82-138-200-248) 모든 동일열 엣지가 충분한 길이를 갖는다.
 */
const NODES: Node[] = [
  { id: "order", x: 160, y: 30, w: 108, label: "주문 접수", tone: "gold" },
  { id: "pay", x: 160, y: 82, w: 96, label: "결제", tone: "step" },
  { id: "stock", x: 160, y: 138, w: 112, label: "재고 확인", tone: "branch" },
  { id: "pack", x: 96, y: 200, w: 90, label: "포장", tone: "step" },
  { id: "wait", x: 244, y: 200, w: 100, label: "입고 대기", tone: "step" },
  { id: "ship", x: 160, y: 248, w: 108, label: "배송 완료", tone: "gold" },
];

const byId = (id: string) => NODES.find((n) => n.id === id)!;

/* ── 간선. side: 동일 행 옆면(좌/우) 연결, port: 도착점 분리(top 진입 위치 오프셋) ── */
type Edge = {
  from: string;
  to: string;
  label?: string;
  seg: [number, number];
  side?: boolean; // 같은 행 노드 옆면(좌↔우) 가로 직선 연결
  fromPortX?: number; // 출발 x 오프셋(상단 충돌 분리)
  toPortX?: number; // 도착 x 오프셋(상단 충돌 분리)
};
const EDGES: Edge[] = [
  { from: "order", to: "pay", seg: [0.22, 0.34] },
  { from: "pay", to: "stock", seg: [0.34, 0.46] },
  { from: "stock", to: "pack", label: "재고 있음", seg: [0.46, 0.62], toPortX: -14 },
  { from: "stock", to: "wait", label: "재고 없음", seg: [0.5, 0.66] },
  { from: "wait", to: "pack", label: "입고", seg: [0.62, 0.76], side: true },
  { from: "pack", to: "ship", seg: [0.72, 0.86] },
];

function NodeBox({ node, reveal, seg }: { node: Node; reveal: MotionValue<number>; seg: [number, number] }) {
  const o = useTransform(reveal, [seg[0], seg[1]], [0, 1]);
  const s = useTransform(reveal, [seg[0], seg[1]], [0.86, 1]);
  const isGold = node.tone === "gold";
  const isBranch = node.tone === "branch";
  // 한 씬 한 색 원칙: 분기(◇)도 골드 톤 다운으로 통일(블루 제거).
  const fill = isGold
    ? "rgba(232,181,75,0.14)"
    : isBranch
      ? "rgba(232,181,75,0.06)"
      : "rgba(255,247,237,0.04)";
  const stroke = isGold
    ? "rgba(232,181,75,0.85)"
    : isBranch
      ? "rgba(232,181,75,0.45)"
      : "rgba(255,247,237,0.2)";
  const txt = isGold ? "#E8B54B" : "rgba(255,247,237,0.85)";
  const isDiamond = isBranch;
  return (
    <motion.g style={{ opacity: o, scale: s, transformOrigin: `${node.x}px ${node.y}px`, transformBox: "fill-box" as const }}>
      {isDiamond ? (
        <polygon
          points={`${node.x},${node.y - NH / 2 - 4} ${node.x + node.w / 2},${node.y} ${node.x},${node.y + NH / 2 + 4} ${node.x - node.w / 2},${node.y}`}
          fill={fill}
          stroke={stroke}
          strokeWidth={1.2}
        />
      ) : (
        <rect
          x={node.x - node.w / 2}
          y={node.y - NH / 2}
          width={node.w}
          height={NH}
          rx={7}
          fill={fill}
          stroke={stroke}
          strokeWidth={isGold ? 1.4 : 1}
        />
      )}
      {isGold && (
        <rect
          x={node.x - node.w / 2}
          y={node.y - NH / 2}
          width={node.w}
          height={NH}
          rx={7}
          fill="none"
          stroke="rgba(232,181,75,0.35)"
          strokeWidth={3}
          style={{ filter: "blur(2px)" }}
        />
      )}
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={11}
        fontWeight={isGold ? 700 : 600}
        fill={txt}
        style={{ fontFamily: "var(--font-body), system-ui" }}
      >
        {node.label}
      </text>
    </motion.g>
  );
}

// 노드 가장자리 인셋(다이아몬드는 꼭짓점이 더 멀어 인셋 작게)
const halfH = (n: Node) => (n.tone === "branch" ? NH / 2 + 4 : NH / 2);

function EdgePath({ edge, reveal }: { edge: Edge; reveal: MotionValue<number> }) {
  const a = byId(edge.from);
  const b = byId(edge.to);
  const len = useTransform(reveal, [edge.seg[0], edge.seg[1]], [0, 1]);
  const labO = useTransform(reveal, [edge.seg[1] - 0.04, edge.seg[1]], [0, 1]);

  let d: string;
  let lx: number;
  let ly: number;

  if (edge.side) {
    // 같은 행 노드: 박스 옆면(좌↔우)으로 가로 직선 연결 → 박스 관통 금지
    const goingLeft = b.x < a.x;
    const x1 = goingLeft ? a.x - a.w / 2 - 2 : a.x + a.w / 2 + 2;
    const x2 = goingLeft ? b.x + b.w / 2 + 4 : b.x - b.w / 2 - 4;
    const y = a.y; // 같은 행 → 수평선
    d = `M ${x1} ${y} L ${x2} ${y}`;
    lx = (x1 + x2) / 2;
    ly = y - 6;
  } else {
    // 수직(또는 분기) — 도착점 분리(toPortX/fromPortX)로 상단 화살표 충돌 제거
    const x1 = a.x + (edge.fromPortX ?? 0);
    const y1 = a.y + halfH(a) + 2;
    const x2 = b.x + (edge.toPortX ?? 0);
    const y2 = b.y - halfH(b) - 4;
    const sameX = Math.abs(x1 - x2) < 6;
    const midY = (y1 + y2) / 2;
    d = sameX
      ? `M ${x1} ${y1} L ${x2} ${y2}`
      : `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
    lx = sameX ? x1 : (x1 + x2) / 2 + (edge.to === "wait" ? 6 : -6);
    ly = midY - 4;
  }

  const stroke = edge.label ? "rgba(232,181,75,0.5)" : "rgba(255,247,237,0.34)";
  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd="url(#c10-arrow)"
        style={{ pathLength: len }}
      />
      {edge.label && (
        <motion.text
          style={{ opacity: labO }}
          x={lx}
          y={ly}
          textAnchor="middle"
          fontSize={8.5}
          fontWeight={600}
          fill="rgba(255,247,237,0.75)"
        >
          {edge.label}
        </motion.text>
      )}
    </g>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const titleO = useTransform(reveal, [0.08, 0.24], [0, 1]);
  const titleX = useTransform(reveal, [0.08, 0.24], [-10, 0]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 헤더: 렌더 모드 토글 */}
      <div className="flex items-center justify-between rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <motion.div style={{ opacity: titleO, x: titleX }} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm bg-gold" />
          <span className="font-mono text-[10px] text-bone/70 md:text-[11px]">process-map / flow.svg</span>
        </motion.div>
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-gold/15 px-2 py-0.5 font-mono text-[8px] font-bold text-gold md:text-[9px]">RENDER</span>
          <span className="rounded bg-bone/[0.05] px-2 py-0.5 font-mono text-[8px] text-bone/40 md:text-[9px]">CODE</span>
        </div>
      </div>

      {/* 렌더된 플로우차트(SVG) */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0C0A10]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 80% at 50% 12%, rgba(232,181,75,0.08), transparent 72%)" }}
        />
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="relative h-full w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="c10-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 1 1 L 9 5 L 1 9" fill="none" stroke="rgba(255,247,237,0.5)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          {/* 간선 먼저(노드 아래로) */}
          {EDGES.map((e) => (
            <EdgePath key={`${e.from}-${e.to}`} edge={e} reveal={reveal} />
          ))}
          {/* 노드(간선 위로) */}
          {NODES.map((n, i) => {
            const start = 0.16 + i * 0.1;
            return <NodeBox key={n.id} node={n} reveal={reveal} seg={[start, start + 0.12]} />;
          })}
        </svg>

        {/* 범례 */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-3 font-mono text-[9px] text-bone/65 md:text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2.5 rounded-[2px] border border-gold/80 bg-gold/15" /> 시작·끝
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rotate-45 border border-gold/55 bg-gold/10" /> 분기
          </span>
        </div>
        <span className="absolute bottom-2.5 right-3 font-mono text-[9px] text-bone/50 md:text-[10px]">mermaid → svg</span>
      </div>
    </motion.div>
  );
}

export default function C10Flowchart() {
  return (
    <CaseScene
      scene="c10"
      act="CASE · 눈에 보이게"
      cluster="B · 눈에 보이게"
      num={10}
      title="플로우차트 자동 생성"
      oldTool="draw.io 수작업 · 다이어그램 유료툴"
      lead="글로 설명만 하면 업무 플로우차트가 그려진다. 단계도 분기도, 채팅 한 줄로."
      script={SCRIPT}
      Result={Result}
      resultTab="flow.svg"
    />
  );
}
