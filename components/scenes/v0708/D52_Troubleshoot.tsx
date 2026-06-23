"use client";

import { ReactNode } from "react";
import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D52 — 자주 막히는 곳 (트러블슈팅)  [마무리 · 완성]
 * 선언/정보형 독립 Pin 씬 (N06/N07/D03 패턴 상속).
 * 16:9 풀스크린: 중앙 리드("막히면 90%는 여기서 해결") →
 * 6개 '문제 → 처방' 카드(3열 × 2행)가 순차 점등. 증상은 ember 절제,
 * 처방의 핵심 키워드(명령어/메뉴명)만 골드로 1포인트. 클릭 타깃 없는 치트 그리드.
 */

type Card = {
  n: number;
  icon: string;
  symptom: string; // 화면에 뜨는/겪는 증상 (ember 톤)
  cause: string; // 한 줄 원인
  fixes: { t: string; key?: string }[]; // 처방 단계 (key = 골드 강조 토큰)
};

/* 6개 자주 막히는 지점 — 증상→처방, 순서 그대로 */
const CARDS: Card[] = [
  {
    n: 1, icon: "terminal",
    symptom: "'node' / 'git' 인식 안 됨",
    cause: "방금 깐 프로그램을 터미널이 아직 모름",
    fixes: [{ t: "VS Code를 ", key: "완전히 종료" }, { t: "다시 켜고 다시 시도" }, { t: "그래도 안 되면 ", key: "PC 재부팅" }],
  },
  {
    n: 2, icon: "encoding",
    symptom: "한글이 □□□ 로 깨짐",
    cause: "파일 인코딩이 UTF-8 이 아님",
    fixes: [{ t: "우하단 인코딩 표시 클릭" }, { t: "'Save with Encoding' → ", key: "UTF-8" }, { t: "이후 새 파일도 UTF-8 유지" }],
  },
  {
    n: 3, icon: "shield",
    symptom: "백신 / 방화벽이 막음",
    cause: "공식 설치 파일을 위협으로 오인",
    fixes: [{ t: "출처가 ", key: "공식 사이트" }, { t: "백신에서 해당 파일 ", key: "허용 · 예외" }, { t: "방화벽 접근 허용 클릭" }],
  },
  {
    n: 4, icon: "key",
    symptom: "API 키 오류 (invalid · 크레딧)",
    cause: "키가 틀렸거나 잔액 부족",
    fixes: [{ t: "키 ", key: "다시 복사" }, { t: "앞뒤 ", key: "공백 제거" }, { t: "크레딧 잔액 확인" }],
  },
  {
    n: 5, icon: "wifi",
    symptom: "인터넷 안 됨 / 응답 없음",
    cause: "네트워크가 끊겨 AI에 못 닿음",
    fixes: [{ t: "와이파이 ", key: "연결 확인" }, { t: "브라우저로 접속 테스트" }, { t: "되면 다시 실행" }],
  },
  {
    n: 6, icon: "lock",
    symptom: "권한 거부 (Mac · permission denied)",
    cause: "macOS가 명령 실행을 막음",
    fixes: [{ t: "명령 앞에 ", key: "sudo" }, { t: "엔터 후 비밀번호 입력" }, { t: "(입력 중 화면엔 안 보임)" }],
  },
];

/* 카드 등장 progress 기준점 (3열 → 행 우선 순차) */
const START = 0.22;
const STEP_GAP = 0.082;
const atOf = (i: number) => START + i * STEP_GAP;

export default function D52Troubleshoot() {
  return (
    <section
      data-scene="d52"
      data-act="마무리 · 완성"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.34, 0.48]);
  const gridShift = useTransform(p, [0, 1], [0, -36]);

  /* ── 리드 카피 ── */
  const kickO = useTransform(p, [0.02, 0.1], [0, 1]);
  const kickY = useTransform(p, [0.02, 0.12], [30, 0]);
  const headO = useTransform(p, [0.05, 0.16], [0, 1]);
  const headY = useTransform(p, [0.05, 0.18], [38, 0]);
  const headGlow = useTransform(p, [0.1, 0.22], [0, 1]);

  /* ── 풋 라벨 (마지막 카드 후 안심 한마디) ── */
  const footO = useTransform(p, [0.86, 0.96], [0, 1]);
  const footY = useTransform(p, [0.86, 0.98], [24, 0]);

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
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(1.8rem,4.5vh,4rem)] px-[clamp(2.5rem,6vw,8rem)] py-[7vh]">
        {/* 리드 */}
        <div className="text-center">
          <motion.div style={{ opacity: kickO, y: kickY }}>
            <Kicker className="justify-center">마무리 · 완성 — TROUBLESHOOTING</Kicker>
          </motion.div>
          <motion.h2
            style={{ opacity: headO, y: headY }}
            className="mt-6 font-display font-black leading-[1.16] text-bone text-[clamp(2.1rem,4.8vw,4.8rem)]"
          >
            자주 막히는 곳 —{" "}
            <motion.span
              style={{ textShadow: useTransform(headGlow, (v) => `0 0 ${38 * v}px rgba(232,181,75,${0.45 * v})`) }}
              className="whitespace-nowrap text-gold"
            >
              막히면 90%는 여기서
            </motion.span>
          </motion.h2>
          <motion.p
            style={{ opacity: headO }}
            className="mx-auto mt-5 max-w-[1040px] text-balance-k leading-relaxed text-bone/65 text-[clamp(1.05rem,1.55vw,1.6rem)]"
          >
            당황하지 말 것. 거의 모든 문제는 아래 여섯 가지 중 하나다 —{" "}
            <span className="whitespace-nowrap text-bone/85">증상을 찾아, 그대로 따라만 하면 풀린다.</span>
          </motion.p>
        </div>

        {/* 6 카드 그리드 (3열 × 2행) */}
        <div className="grid w-full max-w-[1500px] grid-cols-1 gap-[clamp(0.9rem,1.4vw,1.6rem)] sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <FixCard key={c.n} card={c} index={i} p={p} />
          ))}
        </div>

        {/* 풋 — 안심 한마디 */}
        <motion.div
          style={{ opacity: footO, y: footY }}
          className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/45 md:text-xs"
        >
          <span className="inline-block h-px w-9 bg-bone/30" />
          <span>그래도 안 되면 — 옆 사람 · 강사에게 손들기</span>
          <span className="inline-block h-px w-9 bg-gold/55" />
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────────────────── 문제 → 처방 카드 ───────────────────────── */
function FixCard({ card, index, p }: { card: Card; index: number; p: MotionValue<number> }) {
  const at = atOf(index);
  const o = useTransform(p, [at, at + 0.07], [0, 1]);
  const y = useTransform(p, [at, at + 0.09], [38, 0]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className="relative flex flex-col rounded-2xl border border-bone/12 bg-coal/70 px-[clamp(1.2rem,1.5vw,1.8rem)] py-[clamp(1.2rem,2vh,1.8rem)] backdrop-blur-sm"
    >
      {/* 헤더: 번호 + 아이콘 + 증상 */}
      <div className="flex items-start gap-3">
        <span className="flex h-[clamp(1.9rem,2.3vw,2.4rem)] w-[clamp(1.9rem,2.3vw,2.4rem)] shrink-0 items-center justify-center rounded-xl border border-ember/35 bg-ember/[0.08]">
          <FixIcon kind={card.icon} />
        </span>
        <div className="min-w-0 flex-1">
          <span className="font-mono text-[10px] tracking-[0.28em] text-bone/35">
            {String(card.n).padStart(2, "0")} · 증상
          </span>
          <h3 className="mt-1 font-display font-bold leading-snug text-ember text-[clamp(1.05rem,1.35vw,1.45rem)]">
            {card.symptom}
          </h3>
        </div>
      </div>

      {/* 원인 한 줄 */}
      <p className="mt-3 text-[clamp(0.82rem,1.02vw,1.05rem)] leading-snug text-bone/45">
        {card.cause}
      </p>

      {/* 구분선 + 처방 라벨 */}
      <div className="mt-4 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold/75">처방</span>
        <span className="h-px flex-1 bg-bone/12" />
      </div>

      {/* 처방 단계 */}
      <ol className="mt-3.5 flex flex-col gap-2.5">
        {card.fixes.map((f, fi) => (
          <li key={fi} className="flex items-start gap-2.5">
            <span className="mt-[2px] flex h-[1.35rem] w-[1.35rem] shrink-0 items-center justify-center rounded-full border border-bone/18 bg-bone/[0.05] font-mono text-[11px] tabular-nums leading-none text-bone/70">
              {fi + 1}
            </span>
            <span className="text-[clamp(0.9rem,1.12vw,1.18rem)] leading-snug text-bone/80">
              {f.t}
              {f.key ? (
                <span className="whitespace-nowrap font-semibold text-gold">{f.key}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

/* ───────────────────────── 미니 아이콘 (인라인 SVG, 증상별) ───────────────────────── */
const ICONS: Record<string, ReactNode> = {
  // node/git 인식 안 됨 — 터미널
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M13 15h4" />
    </>
  ),
  // 한글 깨짐 — 문자/글자
  encoding: <path d="M5 6h14M12 6v12M8 18h8" />,
  // 백신/방화벽 — 방패
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10c-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12l2 2 3.5-3.5" />
    </>
  ),
  // API 키 오류 — 열쇠
  key: (
    <>
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l8 8M16 16l2-2M19 19l1.5-1.5" />
    </>
  ),
  // 인터넷 안 됨 — 와이파이
  wifi: (
    <>
      <path d="M5 9.5a11 11 0 0 1 14 0M8 13a6.5 6.5 0 0 1 8 0M10.5 16.3a3 3 0 0 1 3 0" />
      <circle cx="12" cy="19.5" r="0.8" />
    </>
  ),
  // 권한 거부(Mac) — 자물쇠
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.2" />
    </>
  ),
};

function FixIcon({ kind }: { kind: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-ember)"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[clamp(1.1rem,1.4vw,1.45rem)] w-[clamp(1.1rem,1.4vw,1.45rem)]"
      aria-hidden
    >
      {ICONS[kind] ?? <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}
