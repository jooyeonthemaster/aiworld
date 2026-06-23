"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C29 — 캡처 일괄 처리 [CASE · 전부 자동으로 / F]
 * Result: 경쟁사 페이지 5×2 풀페이지 스크린샷 썸네일 그리드(미니 웹페이지 목업 + URL 라벨)
 *         + "30개 자동 캡처" 폴더 배지. reveal 하위구간으로 썸네일이 한 장씩 떨어진다.
 */

const SCRIPT: ClineScript = {
  project: "capture",
  userPrompt:
    "이 경쟁사 페이지 30개 URL 전부 풀페이지 스크린샷 떠서 폴더에 정리해줘.",
  steps: [
    { kind: "read", label: "urls.txt 읽기", detail: "30 URLs · 경쟁사 목록" },
    { kind: "web", label: "playwright 자동 캡처", detail: "headless · 풀페이지 스크롤" },
    { kind: "create", label: "shots/ 폴더 생성", detail: "30 png · 1280px width" },
  ],
  terminal: [
    { p: "$", t: "node capture.js" },
    { p: ">", t: "✔ captured 30 pages → shots/", gold: true },
  ],
};

/* 결정적 목업 사이트 데이터 (10개) — Math.random 없이 수식/인덱스로 변형 */
const SITES = [
  "rival.io",
  "acme.co",
  "northwind.com",
  "lumen.app",
  "vertex.dev",
  "halo-shop.kr",
  "studio7.net",
  "pulse.team",
  "orbit.store",
  "delta.market",
];

/* 본문 라인 스택 — '풀페이지(긴 스크롤)'다운 텍스트 단락. 셀 세로를 실제로 채운다. */
function BodyLines({ rows, gold }: { rows: number; gold: boolean }) {
  // 결정적 폭 변형: 라인마다 다른 길이로 텍스트 단락처럼
  const widths = ["100%", "92%", "78%", "96%", "84%", "70%", "98%", "88%"];
  return (
    <div className="flex flex-1 flex-col gap-[3px]">
      {Array.from({ length: rows }).map((_, k) => (
        <span
          key={k}
          className={`h-[3px] rounded-full ${
            k === 0 && gold ? "bg-gold/45" : "bg-bone/[0.13]"
          }`}
          style={{ width: widths[k % widths.length] }}
        />
      ))}
    </div>
  );
}

function Thumb({
  reveal,
  i,
}: {
  reveal: MotionValue<number>;
  i: number;
}) {
  // 5x2 = 10장, reveal 0.18~0.92 구간을 가로(열) 우선으로 stagger
  const a = 0.18 + (i / 10) * 0.62;
  const o = useTransform(reveal, [a, a + 0.14], [0, 1]);
  const y = useTransform(reveal, [a, a + 0.14], [16, 0]);
  const s = useTransform(reveal, [a, a + 0.14], [0.94, 1]);

  // 결정적 레이아웃 아키타입: 0=히어로형 / 1=좌사이드바형 / 2=갤러리그리드형
  const archetype = i % 3;
  const heroLeft = i % 2 === 0;
  const cols = 2 + (i % 3 === 1 ? 0 : 1); // 갤러리는 3열, 그 외 2~3
  const gold = i % 5 === 0; // 10장 중 2장만 골드 액센트(강조 절제)

  return (
    <motion.div
      style={{ opacity: o, y, scale: s }}
      className="group relative flex flex-col overflow-hidden rounded-md border border-bone/10 bg-[#0E0C12]"
    >
      {/* 미니 브라우저 헤더 */}
      <div className="flex items-center gap-1 border-b border-bone/10 bg-[#15121A] px-1.5 py-1">
        <span className="h-1 w-1 rounded-full bg-ember/50" />
        <span className="h-1 w-1 rounded-full bg-gold/40" />
        <span className="h-1 w-1 rounded-full bg-[#27C93F]/40" />
      </div>

      {/* 풀페이지 웹페이지 목업 — 셀 세로를 가득 채운다 */}
      {archetype === 0 ? (
        /* ── 아키타입 0: 히어로형 (큰 히어로 + 본문 단락 + 카드 2개) ── */
        <div className="flex flex-1 flex-col gap-1.5 p-1.5">
          <div
            className={`flex flex-col gap-1 ${heroLeft ? "items-start" : "items-center"}`}
          >
            <span
              className={`h-1.5 rounded-full ${gold ? "bg-gold/70" : "bg-bone/45"} ${heroLeft ? "w-3/4" : "w-4/5"}`}
            />
            <span className="h-1 w-1/2 rounded-full bg-bone/20" />
            <span
              className={`mt-0.5 h-[6px] rounded-[2px] ${gold ? "bg-gold/80" : "bg-bone/30"} ${heroLeft ? "w-7" : "w-9"}`}
            />
          </div>
          <BodyLines rows={5} gold={gold} />
          <div className="grid grid-cols-2 gap-1">
            <span className="h-5 rounded-[2px] bg-bone/[0.08]" />
            <span className="h-5 rounded-[2px] bg-bone/[0.08]" />
          </div>
          <span className="h-[3px] w-full rounded-full bg-bone/10" />
        </div>
      ) : archetype === 1 ? (
        /* ── 아키타입 1: 좌사이드바형 (사이드바 + 본문 컬럼) ── */
        <div className="flex flex-1 gap-1.5 p-1.5">
          <div className="flex w-1/3 flex-col gap-1">
            <span
              className={`h-1.5 w-full rounded-full ${gold ? "bg-gold/65" : "bg-bone/35"}`}
            />
            <span className="h-1 w-full rounded-full bg-bone/15" />
            <span className="h-1 w-3/4 rounded-full bg-bone/15" />
            <span className="h-1 w-full rounded-full bg-bone/15" />
            <span className="mt-auto h-3 w-full rounded-[2px] bg-bone/[0.08]" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <span
              className={`h-1.5 w-2/3 rounded-full ${gold ? "bg-gold/70" : "bg-bone/45"}`}
            />
            <BodyLines rows={7} gold={gold} />
          </div>
        </div>
      ) : (
        /* ── 아키타입 2: 갤러리그리드형 (히어로 + 카드 그리드 빼곡) ── */
        <div className="flex flex-1 flex-col gap-1.5 p-1.5">
          <span
            className={`h-1.5 w-3/5 rounded-full ${gold ? "bg-gold/70" : "bg-bone/45"}`}
          />
          <span className="h-1 w-2/5 rounded-full bg-bone/20" />
          <div
            className="grid flex-1 gap-1"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
              gridAutoRows: "minmax(0, 1fr)",
            }}
          >
            {Array.from({ length: cols * 3 }).map((_, k) => (
              <span
                key={k}
                className={`rounded-[2px] ${
                  k % 4 === 0 ? "bg-bone/[0.11]" : "bg-bone/[0.06]"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* URL 라벨 — 사이트명 통째 표시(nowrap), png 칩은 우측 고정 */}
      <div className="flex items-center gap-1.5 border-t border-bone/10 bg-bone/[0.02] px-1.5 py-1">
        <span className="font-mono text-[7px] text-bone/40 md:text-[8px]">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="whitespace-nowrap font-mono text-[7px] text-bone/75 md:text-[10px]">
          {SITES[i]}
        </span>
        <span className="ml-auto shrink-0 rounded-[2px] bg-bone/[0.06] px-1 font-mono text-[6px] text-bone/60 md:text-[7px]">
          png
        </span>
      </div>
    </motion.div>
  );
}

function Result({
  reveal,
}: {
  p: MotionValue<number>;
  reveal: MotionValue<number>;
}) {
  const frameO = useTransform(reveal, [0, 0.16], [0, 1]);
  const badgeO = useTransform(reveal, [0.04, 0.2], [0, 1]);
  const badgeX = useTransform(reveal, [0.04, 0.2], [-14, 0]);
  const barW = useTransform(reveal, [0.2, 1], ["0%", "100%"]);

  return (
    <motion.div
      style={{ opacity: frameO }}
      className="absolute inset-0 flex flex-col gap-2.5 p-3"
    >
      {/* 폴더 배지 헤더 */}
      <motion.div
        style={{ opacity: badgeO, x: badgeX }}
        className="flex items-center gap-2.5 rounded-lg border border-gold/30 bg-gold/[0.07] px-3 py-2"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] tracking-[0.04em] text-bone/75 md:text-[11px]">
            shots/
          </p>
          <p className="font-mono text-[8px] tracking-[0.06em] text-bone/40 md:text-[9px]">
            30 files · full-page png
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-gradient-to-r from-gold to-gold-bright px-2.5 py-1 font-body text-[9px] font-bold text-ink md:text-[10px]">
          30개 자동 캡처
        </span>
      </motion.div>

      {/* 5×2 썸네일 그리드 */}
      <div className="grid min-h-0 flex-1 grid-cols-5 grid-rows-2 gap-2">
        {SITES.map((_, i) => (
          <Thumb key={i} reveal={reveal} i={i} />
        ))}
      </div>

      {/* 진행 완료 바 */}
      <div className="flex items-center gap-2.5">
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-bone/[0.08]">
          <motion.div
            style={{ width: barW }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold/60 to-gold"
          />
        </div>
        <span className="shrink-0 font-mono text-[9px] tracking-[0.1em] text-bone/70 md:text-[10px]">
          30 / 30
        </span>
      </div>
    </motion.div>
  );
}

export default function C29ScreenshotBatch() {
  return (
    <CaseScene
      scene="c29"
      act="CASE · 전부 자동으로"
      cluster="F · 전부 자동으로"
      num={29}
      title="캡처 일괄 처리"
      oldTool="캡처 도구 Pro · 수작업"
      lead="URL 목록만 주면 수십 페이지를 자동 캡처·정리. 한 장씩 띄워 찍던 일을 한 줄로 끝낸다."
      script={SCRIPT}
      Result={Result}
      resultTab="shots/"
    />
  );
}
