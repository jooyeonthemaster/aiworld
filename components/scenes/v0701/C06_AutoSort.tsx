"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C06 — 자료 폴더 자동 분류·정리 [CASE / A · 문서를 다루다]
 * Result: 뒤죽박죽 평면 파일 리스트(흐림) → 정리된 폴더 트리(골드 폴더 + 개수).
 *   before 가 흐려지며 빠지고, 그 자리에 8개 폴더 트리가 stagger 로 차오른다(before→after 대비).
 */

const SCRIPT: ClineScript = {
  project: "downloads",
  userPrompt:
    "이 다운로드 폴더 파일 300개를 종류랑 날짜별로 폴더 나눠서 정리해줘.",
  steps: [
    { kind: "read", label: "폴더 스캔", detail: "312 files" },
    { kind: "think", label: "분류 규칙 결정", detail: "확장자 · 날짜 기준" },
    { kind: "run", label: "이동 스크립트 실행", detail: "organize.py" },
  ],
  terminal: [
    { p: "$", t: "python organize.py" },
    { p: ">", t: "312 files → 8 folders 정리 완료", gold: true },
  ],
};

/* before: 평면 카오스 파일 리스트(흐림) */
const CHAOS = [
  "IMG_2931.jpg",
  "회의록_최종_진짜최종.docx",
  "송장(1).pdf",
  "캡처 2024-03-11.png",
  "promo_v3.mp4",
  "무제 폴더.zip",
  "스크린샷_(7).png",
  "report_q2_FIN.xlsx",
  "다운로드.pdf",
  "voice memo.m4a",
];

/* after: 정리된 폴더 트리 — 종류별 골드 폴더 + 개수 */
const TREE: { name: string; count: number }[] = [
  { name: "이미지", count: 128 },
  { name: "문서", count: 74 },
  { name: "영상", count: 31 },
  { name: "보고서", count: 22 },
  { name: "압축", count: 19 },
  { name: "음성", count: 14 },
  { name: "스크린샷", count: 17 },
  { name: "기타", count: 7 },
];

function FolderGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-gold md:h-4 md:w-4" aria-hidden>
      <path
        d="M3 6.2a1.4 1.4 0 0 1 1.4-1.4h4.3l1.6 1.8h8.3A1.4 1.4 0 0 1 20 8v9.4a1.4 1.4 0 0 1-1.4 1.4H4.4A1.4 1.4 0 0 1 3 17.4z"
        fill="currentColor"
        fillOpacity="0.16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.16], [0, 1]);
  // before: 평면 카오스 → 흐려지며 사라짐
  const beforeO = useTransform(reveal, [0.04, 0.2, 0.42, 0.56], [0, 1, 1, 0]);
  const beforeBlur = useTransform(reveal, [0.2, 0.56], [1.5, 6]);
  const beforeFilter = useTransform(beforeBlur, (b) => `blur(${b}px)`);
  const beforeY = useTransform(reveal, [0.42, 0.56], [0, -10]);
  // after: 정리된 폴더 트리 → 차오름
  const afterO = useTransform(reveal, [0.5, 0.66], [0, 1]);
  const sumO = useTransform(reveal, [0.86, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 경로 바 */}
      <div className="flex items-center gap-2 rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <span className="font-mono text-[10px] text-bone/50 md:text-[11px]">~/Downloads</span>
        <span className="ml-auto font-mono text-[9px] text-bone/60 md:text-[10px]">312 items</span>
      </div>

      {/* 본문: before 카오스(흐림) → after 트리 */}
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0E0C12]">
        {/* before — 뒤죽박죽 평면 리스트 */}
        <motion.div
          style={{ opacity: beforeO, filter: beforeFilter, y: beforeY }}
          className="absolute inset-0 flex flex-col gap-[3px] p-3"
          aria-hidden
        >
          <span className="mb-1 font-mono text-[8px] uppercase tracking-[0.28em] text-ember/70 md:text-[9px]">
            BEFORE · 뒤죽박죽
          </span>
          {CHAOS.map((f) => (
            <div key={f} className="flex items-center gap-2 rounded bg-bone/[0.03] px-2 py-[5px]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-bone/20" />
              <span className="truncate font-mono text-[9px] text-bone/40 md:text-[10px]">{f}</span>
            </div>
          ))}
        </motion.div>

        {/* after — 정리된 폴더 트리 */}
        <motion.div
          style={{ opacity: afterO }}
          className="absolute inset-0 flex flex-col p-3"
        >
          <span className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.28em] text-gold/70 md:text-[9px]">
            AFTER · 8 folders
          </span>
          <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-1.5">
            {TREE.map((d, i) => {
              const seg = 0.56 + i * 0.044;
              return <TreeRow key={d.name} reveal={reveal} from={seg} name={d.name} count={d.count} />;
            })}
          </div>
          {/* 요약 풋 */}
          <motion.div
            style={{ opacity: sumO }}
            className="mt-2 flex items-center justify-between rounded-md border border-gold/25 bg-gold/[0.06] px-3 py-1.5"
          >
            <span className="font-body text-[9px] font-semibold text-bone/75 md:text-[11px]">
              312 files 분류 완료
            </span>
            <span className="font-mono text-[9px] text-gold md:text-[11px]">0개 누락</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TreeRow({
  reveal,
  from,
  name,
  count,
}: {
  reveal: MotionValue<number>;
  from: number;
  name: string;
  count: number;
}) {
  const o = useTransform(reveal, [from, from + 0.06], [0, 1]);
  const x = useTransform(reveal, [from, from + 0.06], [-10, 0]);
  return (
    <motion.div
      style={{ opacity: o, x }}
      className="flex items-center gap-2 rounded-md border border-bone/10 bg-bone/[0.03] px-2 py-1.5"
    >
      <FolderGlyph />
      <span className="truncate font-body text-[10px] font-semibold text-bone/80 md:text-[12px]">
        {name}/
      </span>
      <span className="ml-auto font-mono text-[9px] tabular-nums text-bone/45 md:text-[10px]">
        {count}
      </span>
    </motion.div>
  );
}

export default function C06AutoSort() {
  return (
    <CaseScene
      scene="c06"
      act="CASE · 문서를 다루다"
      cluster="A · 문서를 다루다"
      num={6}
      title="자료 폴더 자동 분류·정리"
      oldTool="수작업 폴더 정리 · 파일정리 유료앱"
      lead="다운로드 폴더 카오스. 종류·날짜·프로젝트별로 알아서 정리."
      script={SCRIPT}
      Result={Result}
      resultTab="폴더"
    />
  );
}
