"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C20 — 상품 크롤링(가격·옵션·리뷰) [CASE · 데이터를 캐다]
 * Result: products.xlsx 스프레드시트 미리보기 — 헤더(상품명/가격/리뷰수/평점) +
 *         6행이 reveal 하위구간으로 한 줄씩 stagger 점등(₩ 가격 · ★ 평점). 마지막 "외 114건".
 */

const SCRIPT: ClineScript = {
  project: "crawler",
  userPrompt:
    "이 쇼핑몰 카테고리에서 상품명·가격·리뷰수 전부 긁어서 엑셀로 정리해줘.",
  steps: [
    { kind: "web", label: "페이지 순회", detail: "category · pagination 1→8" },
    { kind: "run", label: "크롤러 실행", detail: "120 items" },
    { kind: "create", label: "products.xlsx 생성", detail: "4 columns · 120 rows" },
  ],
  terminal: [
    { p: "$", t: "python crawl.py" },
    { p: ">", t: "✔ scraped 120 products → products.xlsx", gold: true },
  ],
};

/* ── 결과 표 데이터(결정적, 실제같은 가격/평점) ── */
type Row = { name: string; price: string; reviews: string; rating: string; gold?: boolean };
const ROWS: Row[] = [
  { name: "무선 블루투스 이어버드 Pro", price: "₩59,000", reviews: "4,182", rating: "★ 4.8", gold: true },
  { name: "USB-C 고속충전 어댑터 65W", price: "₩24,900", reviews: "2,037", rating: "★ 4.6" },
  { name: "노트북 거치대 알루미늄", price: "₩31,500", reviews: "1,564", rating: "★ 4.7" },
  { name: "기계식 키보드 적축 텐키리스", price: "₩89,000", reviews: "928", rating: "★ 4.5" },
  { name: "웹캠 1080p 자동초점", price: "₩42,300", reviews: "1,210", rating: "★ 4.4" },
  { name: "휴대용 SSD 1TB", price: "₩109,000", reviews: "3,051", rating: "★ 4.9" },
];

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.16], [0, 1]);
  const headO = useTransform(reveal, [0.1, 0.3], [0, 1]);
  const headY = useTransform(reveal, [0.1, 0.3], [10, 0]);
  // 행 stagger 구간: 0.26 → 0.92 를 6행으로 분배
  const ROW_SPAN = 0.66 / ROWS.length;
  const ROW_START = 0.26;
  const capO = useTransform(reveal, [0.9, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 스프레드시트 헤더(시트 탭 느낌) */}
      <div className="flex items-center gap-2 rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-sm border border-[#C3E88D]/50 bg-[#C3E88D]/15" />
        <span className="font-mono text-[10px] text-bone/55 md:text-[11px]">products.xlsx</span>
        <span className="ml-auto rounded-sm bg-[#C3E88D]/12 px-2 py-0.5 font-mono text-[9px] text-[#C3E88D]/80 md:text-[10px]">
          120 rows
        </span>
      </div>

      {/* 표 본문 */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0E0C12]">
        {/* 컬럼 헤더 행 */}
        <motion.div
          style={{ opacity: headO, y: headY }}
          className="grid grid-cols-[1.5rem_minmax(0,1fr)_4.6rem_3.4rem_3.4rem] items-center gap-1.5 border-b border-bone/10 bg-bone/[0.04] pl-2.5 pr-3 py-2"
        >
          <span className="font-mono text-[8px] text-bone/30 md:text-[9px]">#</span>
          {["상품명", "가격", "리뷰수", "평점"].map((h, i) => (
            <span
              key={h}
              className={`whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-bone/70 md:text-[10px] ${
                i === 0 ? "text-left" : "text-right"
              }`}
            >
              {h}
            </span>
          ))}
        </motion.div>

        {/* 데이터 행 — 한 줄씩 stagger */}
        <div className="flex min-h-0 flex-1 flex-col">
          {ROWS.map((r, i) => (
            <RowLine
              key={r.name}
              row={r}
              index={i}
              reveal={reveal}
              start={ROW_START + i * ROW_SPAN}
              end={ROW_START + (i + 1) * ROW_SPAN}
            />
          ))}

          {/* 외 114건 캡션 */}
          <motion.div
            style={{ opacity: capO }}
            className="mt-auto flex items-center justify-between border-t border-bone/10 bg-bone/[0.02] px-2.5 py-2"
          >
            <span className="font-mono text-[9px] text-bone/40 md:text-[10px]">⋯ 외 114건</span>
            <span className="font-mono text-[9px] text-[#C3E88D]/75 md:text-[10px]">전체 120 / 120 수집 완료</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function RowLine({
  row,
  index,
  reveal,
  start,
  end,
}: {
  row: Row;
  index: number;
  reveal: MotionValue<number>;
  start: number;
  end: number;
}) {
  const o = useTransform(reveal, [start, end], [0, 1]);
  const x = useTransform(reveal, [start, end], [-14, 0]);
  return (
    <motion.div
      style={{ opacity: o, x }}
      className={`grid grid-cols-[1.5rem_minmax(0,1fr)_4.6rem_3.4rem_3.4rem] items-center gap-1.5 pl-2.5 pr-3 py-[10px] ${
        index % 2 === 1 ? "bg-bone/[0.02]" : ""
      } ${row.gold ? "border-l-2 border-gold/60 bg-gold/[0.04]" : "border-l-2 border-transparent"}`}
    >
      <span className="font-mono text-[8px] text-bone/30 md:text-[9px]">{index + 1}</span>
      <span
        className={`truncate font-body text-[9px] md:text-[11px] ${
          row.gold ? "font-semibold text-bone" : "text-bone/75"
        }`}
      >
        {row.name}
      </span>
      <span
        className={`text-right font-mono text-[9px] tabular-nums md:text-[11px] ${
          row.gold ? "text-gold" : "text-[#F78C6C]/85"
        }`}
      >
        {row.price}
      </span>
      <span className="text-right font-mono text-[9px] tabular-nums text-bone/70 md:text-[10px]">
        {row.reviews}
      </span>
      <span className="text-right font-mono text-[9px] tabular-nums text-[#C3E88D]/85 md:text-[10px]">
        {row.rating}
      </span>
    </motion.div>
  );
}

export default function C20ProductCrawl() {
  return (
    <CaseScene
      scene="c20"
      act="CASE · 데이터를 캐다"
      cluster="E · 데이터를 캐다"
      num={20}
      title="상품 크롤링(가격·옵션·리뷰)"
      oldTool="크롤링 SaaS 구독 · 데이터 구매"
      lead="경쟁 상품 페이지에서 가격·옵션·리뷰수를 표로 긁어온다."
      script={SCRIPT}
      Result={Result}
      resultTab="products.xlsx"
    />
  );
}
