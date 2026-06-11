"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import TextSplit from "@/components/ui/TextSplit";

const EASE = [0.16, 1, 0.3, 1] as const;

const USER_TEXT = "안녕? 너 뭐 하는 애야?";
const AI_TEXT = "안녕하세요! 저는 무엇이든 도와드리는 AI 어시스턴트입니다.";

type ReactionSpec = {
  text: string;
  pos: CSSProperties;
  delay: number;
  dur: number;
  rot: number;
  drift: number;
};

/** 결정적 좌표/타이밍 — 렌더 경로 난수 금지 */
const REACTIONS: ReactionSpec[] = [
  { text: "ㅋㅋ 신기한 챗봇이 나왔네", pos: { left: "6vw", top: "27%" }, delay: 1.2, dur: 4.6, rot: -2.4, drift: 12 },
  { text: "심심풀이로 갖고 놀기 딱 좋다", pos: { right: "5vw", top: "22%" }, delay: 1.6, dur: 5.4, rot: 2.1, drift: 10 },
  { text: "숙제 시켜봤는데 틀리던데?", pos: { left: "4vw", top: "58%" }, delay: 2.0, dur: 4.2, rot: 1.6, drift: 14 },
  { text: "또 하나의 장난감이군", pos: { right: "6vw", top: "56%" }, delay: 2.4, dur: 5.0, rot: -1.8, drift: 9 },
  { text: "금방 시들해질걸?", pos: { right: "19vw", top: "77%" }, delay: 2.8, dur: 4.4, rot: 2.6, drift: 11 },
];

export default function Scene04() {
  return (
    <section
      data-scene="s04"
      data-act="ACT 1 — 3년 전, 우리는 웃었다"
      className="relative min-h-screen overflow-hidden bg-ink text-bone"
    >
      {/* ── 배경 레이어: 다큐멘터리 톤의 미세 글로우 + 비네트 ── */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[55vh]"
        style={{
          background:
            "radial-gradient(55% 70% at 50% 0%, rgba(232,181,75,0.08), transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 58%, rgba(16,13,19,0.0), rgba(7,6,10,0.85) 95%)",
        }}
      />
      {/* 아카이브 룰러 라인 */}
      <div aria-hidden className="absolute inset-y-0 left-[3vw] hidden w-px bg-bone/[0.06] md:block" />
      <div aria-hidden className="absolute inset-y-0 right-[3vw] hidden w-px bg-bone/[0.06] md:block" />

      {/* ── 떠다니는 시니컬 반응 말풍선 ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden md:block">
        {REACTIONS.map((r, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={r.pos}
            initial={{ opacity: 0, scale: 0.86, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, delay: r.delay, ease: EASE }}
          >
            <motion.div
              animate={{ y: [0, -r.drift, 0] }}
              transition={{ duration: r.dur, repeat: Infinity, ease: "easeInOut" }}
              style={{ rotate: r.rot }}
              className="relative rounded-2xl border border-bone/10 bg-coal/90 px-4 py-2.5 text-[13px] leading-relaxed text-bone/55 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-sm"
            >
              {r.text}
              <span className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-r border-bone/10 bg-coal/90" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── 메인 콘텐츠 ── */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center gap-10 px-[6vw] py-[12vh]">
        <Reveal delay={0.1} y={20}>
          <Kicker className="justify-center">ACT 1 — 그날의 반응</Kicker>
        </Reveal>

        {/* 거대 모노 날짜 스탬프 */}
        <h2 className="text-center font-mono font-bold leading-none tracking-tight">
          <TextSplit
            text="2022. 11. 30."
            per="char"
            stagger={0.055}
            delay={0.25}
            className="text-[clamp(2.8rem,8.5vw,7.5rem)] tabular-nums text-bone"
          />
        </h2>
        <Reveal delay={1.1} y={10} className="-mt-6">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.5em] text-bone/30">
            archive — day zero
          </p>
        </Reveal>

        {/* 채팅 UI 목업 */}
        <Reveal delay={0.5} y={44} blur className="w-full max-w-[640px]">
          <ChatMock />
        </Reveal>

        {/* 하단 캡션 */}
        <Reveal delay={0.4} y={18} className="mt-2">
          <p className="text-balance-k text-center font-mono text-[12px] leading-relaxed tracking-[0.08em] text-bone/50 md:text-sm">
            {'ChatGPT 등장. 세상의 반응은 — "재밌는 채팅 앱이 하나 나왔네."'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** 채팅 목업 — 타이핑은 useEffect 타이머로만 진행 (hydration 안전) */
function ChatMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });
  const [phase, setPhase] = useState<"idle" | "user" | "typing" | "done">("idle");
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t1 = window.setTimeout(() => setPhase("user"), 800);
    const t2 = window.setTimeout(() => setPhase("typing"), 1900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [inView]);

  useEffect(() => {
    if (phase !== "typing") return;
    const iv = window.setInterval(
      () => setChars((c) => Math.min(c + 1, AI_TEXT.length)),
      52,
    );
    return () => window.clearInterval(iv);
  }, [phase]);

  useEffect(() => {
    if (phase === "typing" && chars >= AI_TEXT.length) setPhase("done");
  }, [phase, chars]);

  const userShown = phase !== "idle";
  const aiShown = phase === "typing" || phase === "done";

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-bone/10 bg-coal shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
    >
      {/* 창 헤더 */}
      <div className="flex items-center gap-2 border-b border-bone/[0.07] px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/35">
          new chat — 2022.11.30
        </span>
        <span className="ml-auto font-mono text-[10px] tracking-[0.2em] text-bone/20">
          v0.1
        </span>
      </div>

      {/* 대화 영역 — 높이를 예약해 레이아웃 점프 방지 */}
      <div className="flex min-h-[220px] flex-col justify-center gap-5 px-6 py-8 md:px-8">
        {/* 사용자 말풍선 */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={userShown ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
          className="self-end"
        >
          <div className="rounded-2xl rounded-br-sm border border-bone/10 bg-bone/10 px-4 py-2.5 text-[15px] text-bone/90">
            {USER_TEXT}
          </div>
          <p className="mt-1.5 text-right font-mono text-[9px] tracking-[0.2em] text-bone/25">
            YOU — 23:41
          </p>
        </motion.div>

        {/* AI 말풍선 (타이핑) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={aiShown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex max-w-[88%] items-start gap-3 self-start"
        >
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gold/30 bg-gold/15 font-mono text-[10px] font-bold text-gold">
            AI
          </span>
          <div>
            <div className="rounded-2xl rounded-bl-sm border border-bone/[0.08] bg-bone/[0.05] px-4 py-2.5 text-[15px] leading-relaxed text-bone/85">
              {AI_TEXT.slice(0, chars)}
              <span className="animate-blink-caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] bg-gold align-baseline" />
            </div>
            <p className="mt-1.5 font-mono text-[9px] tracking-[0.2em] text-bone/25">
              ASSISTANT — 23:41
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
