"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C24 — SNS 공개데이터 수집·정리 [CASE / E · 데이터를 캐다]
 * Result: 좌측 인기 게시물 카드(좋아요/댓글) + 우측 24h 시간대별 반응 히트 막대.
 * 핵심 시간대(피크) 1구간만 골드 — 한 씬 강조색 1개 원칙.
 */

const SCRIPT: ClineScript = {
  project: "sns-trend",
  userPrompt:
    "이 해시태그 최근 공개 게시물 모아서 인기 게시물이랑 시간대별 반응 정리해줘.",
  steps: [
    { kind: "web", label: "해시태그 게시물 수집", detail: "#네안데르 · 최근 7일 · 공개만" },
    { kind: "create", label: "posts.csv", detail: "318행 · 좋아요·댓글·게시시각" },
    { kind: "think", label: "시간대별 분석", detail: "인기 게시물 · 24h 반응 분포" },
  ],
};

/* 24시간 반응량 — 결정적 수식(저녁 21시 피크) */
const PEAK = 21;
const HEAT = Array.from({ length: 24 }, (_, h) => {
  const d = Math.abs(h - PEAK);
  const wrap = Math.min(d, 24 - d); // 원형 거리(자정 넘김 고려)
  const base = 14 + ((h * 17) % 11); // 잔잔한 결정적 노이즈
  const peak = Math.max(0, 64 - wrap * wrap * 4.6); // 피크 주변 솟음
  return Math.min(100, Math.round(base + peak));
});

const POSTS: { tag: string; text: string; like: string; cmt: string; top?: boolean }[] = [
  {
    tag: "@studio_neander",
    text: "신상 골드 에디션 오픈런 후기 — 진짜 미쳤다 #네안데르",
    like: "12.4K",
    cmt: "1,820",
    top: true,
  },
  {
    tag: "@daily_market",
    text: "이번주 #네안데르 협업 픽 3종 정리해봄 (가격까지)",
    like: "6,910",
    cmt: "742",
  },
  {
    tag: "@trend_log",
    text: "왜 다들 이거 사는지 알겠다… 재입고 알림 거는 중",
    like: "3,180",
    cmt: "411",
  },
];

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);

  /* 좌: 인기 게시물 카드 stagger */
  const postsO = useTransform(reveal, [0.18, 0.42], [0, 1]);

  /* 우: 히트 막대 그로우 */
  const barsO = useTransform(reveal, [0.4, 0.62], [0, 1]);
  const barGrow = useTransform(reveal, [0.46, 0.92], [0, 1]);
  const peakO = useTransform(reveal, [0.72, 0.96], [0, 1]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3.5">
      {/* 분석 헤더 */}
      <div className="flex items-center justify-between border-b border-bone/10 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/70 md:text-[11px]">
            #네안데르 · 트렌드 리포트
          </span>
        </div>
        <span className="rounded-full border border-bone/15 bg-bone/[0.04] px-2 py-0.5 font-mono text-[9px] tracking-[0.05em] text-bone/55 md:text-[10px]">
          공개 318건
        </span>
      </div>

      {/* 본문 2단: 좌 인기 게시물 · 우 시간대별 히트 */}
      <div className="grid min-h-0 flex-1 grid-cols-[1.1fr_0.9fr] gap-3 pt-3">
        {/* ── 좌: 인기 게시물 카드 ── */}
        <motion.div style={{ opacity: postsO }} className="flex min-h-0 flex-col gap-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/45 md:text-[10px]">
            인기 게시물 TOP
          </p>
          {POSTS.map((post, i) => (
            <PostCard key={post.tag} post={post} reveal={reveal} idx={i} />
          ))}
        </motion.div>

        {/* ── 우: 24h 시간대별 반응 히트 ── */}
        <motion.div
          style={{ opacity: barsO }}
          className="flex min-h-0 flex-col rounded-lg border border-bone/10 bg-bone/[0.025] p-3"
        >
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/45 md:text-[10px]">
              시간대별 반응
            </p>
            <motion.span
              style={{ opacity: peakO }}
              className="font-mono text-[9px] font-bold tracking-[0.06em] text-gold md:text-[10px]"
            >
              피크 21시
            </motion.span>
          </div>

          {/* 막대 */}
          <div className="mt-3 flex min-h-0 flex-1 items-end gap-[3px]">
            {HEAT.map((v, h) => (
              <HeatBar key={h} hour={h} value={v} grow={barGrow} peak={h === PEAK} />
            ))}
          </div>

          {/* 시간축 라벨 */}
          <div className="mt-2 flex justify-between font-mono text-[8px] tracking-[0.04em] text-bone/30 md:text-[9px]">
            <span>0</span>
            <span>6</span>
            <span>12</span>
            <span>18</span>
            <span>24</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── 인기 게시물 카드 ── */
function PostCard({
  post,
  reveal,
  idx,
}: {
  post: { tag: string; text: string; like: string; cmt: string; top?: boolean };
  reveal: MotionValue<number>;
  idx: number;
}) {
  const at = 0.2 + idx * 0.08;
  const o = useTransform(reveal, [at, at + 0.16], [0, 1]);
  const x = useTransform(reveal, [at, at + 0.16], [-14, 0]);
  return (
    <motion.div
      style={{ opacity: o, x }}
      className={`flex min-h-0 flex-1 flex-col gap-1.5 rounded-lg border p-2.5 ${
        post.top
          ? "border-gold/30 bg-gold/[0.06]"
          : "border-bone/10 bg-bone/[0.03]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full font-mono text-[8px] ${
            post.top ? "bg-gold text-ink" : "bg-bone/10 text-bone/70"
          }`}
        >
          {idx + 1}
        </span>
        <span className="truncate font-mono text-[10px] tracking-[0.02em] text-bone/70 md:text-[11px]">
          {post.tag}
        </span>
        {post.top ? (
          <span className="ml-auto shrink-0 rounded-full bg-gold/15 px-1.5 py-px font-mono text-[8px] font-bold tracking-[0.06em] text-gold md:text-[9px]">
            TOP
          </span>
        ) : null}
      </div>
      <p className="line-clamp-2 font-body text-[10px] leading-snug text-bone/80 md:text-[11px]">
        {post.text}
      </p>
      <div className="mt-auto flex items-center gap-3 pt-0.5 font-mono text-[9px] text-bone/55 md:text-[10px]">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
          </svg>
          <span className={post.top ? "text-gold" : "text-bone/70"}>{post.like}</span>
        </span>
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1.1-4.2A8 8 0 1 1 21 12z" />
          </svg>
          <span className="text-bone/70">{post.cmt}</span>
        </span>
      </div>
    </motion.div>
  );
}

/* ── 24h 히트 막대(결정적 height, grow 로 scaleY) ── */
function HeatBar({
  hour,
  value,
  grow,
  peak,
}: {
  hour: number;
  value: number;
  grow: MotionValue<number>;
  peak: boolean;
}) {
  const start = (hour / 24) * 0.5;
  const sy = useTransform(grow, [start, start + 0.5], [0, 1]);
  return (
    <div className="flex min-w-0 flex-1 items-end self-stretch">
      <motion.span
        style={{ scaleY: sy, height: `${value}%` }}
        className={`w-full origin-bottom rounded-[2px] ${
          peak
            ? "bg-gold [box-shadow:0_0_16px_rgba(232,181,75,0.55)]"
            : "bg-bone/20"
        }`}
      />
    </div>
  );
}

export default function C24SNSData() {
  return (
    <CaseScene
      scene="c24"
      act="CASE · 데이터를 캐다"
      cluster="E · 데이터를 캐다"
      num={24}
      title="SNS 공개데이터 수집·정리"
      oldTool="SNS 분석 SaaS 구독"
      lead="공개 게시물·해시태그·인게이지먼트를 수집해 트렌드를 본다. 인기 게시물과 반응이 몰리는 시간대까지 한 번에."
      script={SCRIPT}
      Result={Result}
      resultTab="분석"
    />
  );
}
