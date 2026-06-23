"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C25 — 수집데이터 → 마케팅 리포트 [CASE / E · 데이터를 캐다]
 * Result: report.html 한 장짜리 마케팅 인사이트 리포트.
 *   매스트헤드 → KPI 카드 3개 → 채널별 그룹 막대 미니차트 1개 →
 *   "인사이트" 불릿 2개 → "추천 액션" 골드 박스 1개. reveal 하위구간 stagger.
 *   (doc/chart 혼합 — C01 문서/ C08 도넛+라인 대시보드와 확연히 구별되는 "리포트 페이지")
 */

const SCRIPT: ClineScript = {
  project: "monthly-report",
  userPrompt:
    "지금까지 수집한 데이터 전부 합쳐서 이번 달 마케팅 리포트 만들어줘. 인사이트랑 액션까지.",
  steps: [
    { kind: "read", label: "여러 csv/xlsx 통합", detail: "crawl · price · review · sns" },
    { kind: "think", label: "인사이트 도출", detail: "채널·전환·이상치 교차분석" },
    { kind: "create", label: "report.html", detail: "KPI · 차트 · 액션 한 장" },
  ],
};

/* ── KPI 카드 (정적·결정적) ── */
const KPIS: { label: string; value: string; delta: string; up: boolean; gold?: boolean }[] = [
  { label: "월 매출", value: "₩48.2M", delta: "+19%", up: true, gold: true },
  { label: "신규 리드", value: "1,284", delta: "+31%", up: true },
  { label: "획득 단가", value: "₩3,910", delta: "-12%", up: false },
];

/* ── 채널별 성과 그룹 막대(0~1 정규화, 결정적) ── 검색/SNS/메일 ── */
const CHANNELS: { name: string; v: number; gold?: boolean }[] = [
  { name: "검색", v: 0.92, gold: true },
  { name: "SNS", v: 0.64 },
  { name: "메일", v: 0.41 },
  { name: "제휴", v: 0.27 },
];

/* ── 인사이트 불릿 2개 ── */
const INSIGHTS: { k: string; v: string }[] = [
  { k: "검색 채널이 전환의 49%", v: "리드당 단가도 최저 — 예산 재배분 신호." },
  { k: "주말 SNS 유입 급등", v: "그러나 전환은 정체 — 랜딩 이탈 구간 존재." },
];

/* ── 막대 한 개(hook 안전: 컴포넌트 최상위 useTransform) ── */
function Bar({ ch, draw, i }: { ch: { name: string; v: number; gold?: boolean }; draw: MotionValue<number>; i: number }) {
  const start = i * 0.12;
  const h = useTransform(draw, [start, start + 0.4], ["0%", `${Math.round(ch.v * 100)}%`]);
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
      <div className="relative flex h-full w-full max-w-[34px] flex-1 items-end justify-center">
        <motion.span
          style={{ height: h }}
          className={`w-full rounded-t-[3px] ${
            ch.gold
              ? "bg-gradient-to-t from-gold to-gold-bright shadow-[0_0_18px_rgba(232,181,75,0.45)]"
              : "bg-bone/25"
          }`}
        />
      </div>
      <span
        className={`font-mono text-[9px] tracking-[0.04em] md:text-[10px] ${
          ch.gold ? "text-gold" : "text-bone/55"
        }`}
      >
        {ch.name}
      </span>
    </div>
  );
}

/* ── 인사이트 한 행(reveal 하위구간 stagger) ── */
function InsightRow({ reveal, b, i }: { reveal: MotionValue<number>; b: { k: string; v: string }; i: number }) {
  const start = 0.6 + i * 0.1;
  const o = useTransform(reveal, [start, start + 0.16], [0, 1]);
  const x = useTransform(reveal, [start, start + 0.16], [-14, 0]);
  return (
    <motion.div style={{ opacity: o, x }} className="flex items-start gap-2.5">
      <span className="mt-[5px] h-2 w-2 shrink-0 rounded-[3px] bg-gold shadow-[0_0_12px_rgba(232,181,75,0.5)]" />
      <p className="min-w-0 flex-1 font-body text-[clamp(0.72rem,0.95vw,0.95rem)] leading-snug text-bone/70">
        <span className="font-bold text-bone/90">{b.k}</span>
        <span className="text-bone/70">{" — " + b.v}</span>
      </p>
    </motion.div>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const headO = useTransform(reveal, [0.08, 0.28], [0, 1]);
  const headY = useTransform(reveal, [0.08, 0.28], [12, 0]);
  const kpiO = useTransform(reveal, [0.2, 0.44], [0, 1]);
  const kpiY = useTransform(reveal, [0.2, 0.44], [14, 0]);
  const chartO = useTransform(reveal, [0.38, 0.6], [0, 1]);
  const chartY = useTransform(reveal, [0.38, 0.6], [14, 0]);
  const barDraw = useTransform(reveal, [0.44, 0.84], [0, 1]);
  const actO = useTransform(reveal, [0.82, 1], [0, 1]);
  const actY = useTransform(reveal, [0.82, 1], [16, 0]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 미니 브라우저 주소창 */}
      <div className="flex items-center gap-2 rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-bone/20" />
        <div className="flex flex-1 items-center gap-2 rounded-md bg-bone/[0.05] px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F]/70" />
          <span className="font-mono text-[10px] text-bone/55 md:text-[11px]">file:///monthly-report/report.html</span>
        </div>
        <span className="rounded border border-gold/30 bg-gold/10 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.1em] text-gold/85 md:text-[9px]">1-PAGE</span>
      </div>

      {/* 렌더된 리포트 페이지 */}
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0E0C12] p-3">
        {/* 매스트헤드 */}
        <motion.div style={{ opacity: headO, y: headY }} className="flex shrink-0 items-end justify-between border-b border-bone/10 pb-2">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-gold/70 md:text-[9px]">MONTHLY MARKETING REPORT</p>
            <h3 className="mt-1 font-display font-black leading-tight text-bone text-[clamp(0.9rem,1.4vw,1.45rem)]">
              이번 달 성과 · 인사이트
            </h3>
          </div>
          <div className="text-right">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/35 md:text-[9px]">SOURCES</p>
            <p className="mt-0.5 font-mono text-[9px] text-bone/60 md:text-[10px]">crawl · price · review · sns</p>
          </div>
        </motion.div>

        {/* KPI 카드 3개 */}
        <motion.div style={{ opacity: kpiO, y: kpiY }} className="grid shrink-0 grid-cols-3 gap-2">
          {KPIS.map((k) => (
            <div
              key={k.label}
              className={`rounded-lg border px-2.5 py-2 ${k.gold ? "border-gold/30 bg-gold/[0.06]" : "border-bone/10 bg-bone/[0.03]"}`}
            >
              <p className="font-body text-[8px] uppercase tracking-[0.16em] text-bone/45 md:text-[9px]">{k.label}</p>
              <p className={`mt-0.5 font-display font-black tabular-nums leading-none text-[clamp(0.9rem,1.55vw,1.5rem)] ${k.gold ? "text-gold" : "text-bone/90"}`}>
                {k.value}
              </p>
              <p className={`mt-1 font-mono text-[9px] md:text-[10px] ${k.up ? "text-[#27C93F]/80" : "text-gold/80"}`}>
                {(k.up ? "▲ " : "▼ ") + k.delta}
              </p>
            </div>
          ))}
        </motion.div>

        {/* 본문 2단: 채널 막대차트 | 인사이트 */}
        <div className="grid min-h-0 flex-1 grid-cols-[0.92fr_1.08fr] gap-2.5">
          {/* 미니 그룹 막대차트 1개 */}
          <motion.div style={{ opacity: chartO, y: chartY }} className="flex flex-col rounded-lg border border-bone/10 bg-bone/[0.025] p-2.5">
            <div className="flex items-baseline justify-between">
              <p className="font-body text-[8px] uppercase tracking-[0.16em] text-bone/45 md:text-[9px]">채널별 전환</p>
              <span className="font-mono text-[9px] text-gold/80 md:text-[10px]">검색 49%</span>
            </div>
            <div className="mt-2 flex min-h-0 flex-1 items-stretch gap-2">
              {CHANNELS.map((ch, i) => (
                <Bar key={ch.name} ch={ch} draw={barDraw} i={i} />
              ))}
            </div>
          </motion.div>

          {/* 인사이트 불릿 2개 */}
          <div className="flex min-h-0 flex-col justify-center gap-2.5 rounded-lg border border-bone/10 bg-bone/[0.025] p-2.5">
            <p className="shrink-0 font-body text-[8px] uppercase tracking-[0.16em] text-bone/45 md:text-[9px]">인사이트</p>
            <div className="flex flex-col gap-2.5">
              {INSIGHTS.map((b, i) => (
                <InsightRow key={b.k} reveal={reveal} b={b} i={i} />
              ))}
            </div>
          </div>
        </div>

        {/* 추천 액션 — 골드 박스 1개 */}
        <motion.div
          style={{ opacity: actO, y: actY }}
          className="flex shrink-0 items-center gap-3 rounded-lg border-l-[3px] border-gold bg-gold/[0.08] px-3.5 py-2.5"
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-gold/80 md:text-[9px] whitespace-nowrap">추천 액션</span>
          <p className="min-w-0 flex-1 font-body text-[clamp(0.72rem,0.95vw,0.95rem)] font-semibold leading-snug text-bone/90">
            검색 예산 +30% 재배분 · 주말 SNS 랜딩 이탈 구간 A/B 테스트.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function C25MarketingReport() {
  return (
    <CaseScene
      scene="c25"
      act="CASE · 데이터를 캐다"
      cluster="E · 데이터를 캐다"
      num={25}
      title="수집데이터 → 마케팅 리포트"
      oldTool="리포팅 SaaS · 대행사 리포트비"
      lead="여기저기 모은 데이터를 한 장의 마케팅 인사이트 리포트로."
      script={SCRIPT}
      Result={Result}
      resultTab="미리보기 — report.html"
    />
  );
}
