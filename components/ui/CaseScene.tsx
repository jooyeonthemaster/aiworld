"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import ClineStudio, { ClineScript, ResultRenderer } from "@/components/ui/ClineStudio";

/**
 * CaseScene — 30개 사례 씬의 통합 엔진.
 * <section data-scene data-act> + Pin + 배경(글로우/그리드 패럴랙스) +
 * 2단 그리드 [좌 내러티브 | 우 ClineStudio]. 좌측은 스크롤로 점등.
 * 사례 파일은 데이터(script) + Result 컴포넌트만 넘기면 된다.
 */

export default function CaseScene({
  scene,
  act,
  cluster,
  num,
  title,
  oldTool,
  lead,
  caption = "— 전부, VS Code 안에서.",
  script,
  Result,
  resultTab,
  heights = 4,
}: {
  scene: string;
  act: string;
  cluster: string;
  num: number;
  title: string;
  oldTool: string;
  lead: string;
  caption?: string;
  script: ClineScript;
  Result: ResultRenderer;
  resultTab?: string;
  heights?: number;
}) {
  return (
    <section data-scene={scene} data-act={act} className="relative bg-ink text-bone">
      <Pin heights={heights}>
        {(p) => (
          <Stage
            p={p}
            cluster={cluster}
            num={num}
            title={title}
            oldTool={oldTool}
            lead={lead}
            caption={caption}
            script={script}
            Result={Result}
            resultTab={resultTab}
          />
        )}
      </Pin>
    </section>
  );
}

function Stage({
  p,
  cluster,
  num,
  title,
  oldTool,
  lead,
  caption,
  script,
  Result,
  resultTab,
}: {
  p: MotionValue<number>;
  cluster: string;
  num: number;
  title: string;
  oldTool: string;
  lead: string;
  caption: string;
  script: ClineScript;
  Result: ResultRenderer;
  resultTab?: string;
}) {
  /* 배경 */
  const glowO = useTransform(p, [0, 0.5, 1], [0.14, 0.32, 0.46]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* 좌측 내러티브 비트 */
  const kickO = useTransform(p, [0.02, 0.1], [0, 1]);
  const kickY = useTransform(p, [0.02, 0.12], [26, 0]);

  const titleO = useTransform(p, [0.06, 0.16], [0, 1]);
  const titleY = useTransform(p, [0.06, 0.18], [34, 0]);

  const oldO = useTransform(p, [0.2, 0.3], [0, 1]);
  const oldStrike = useTransform(p, [0.3, 0.42], [0, 1]);
  const nowO = useTransform(p, [0.36, 0.48], [0, 1]);
  const nowY = useTransform(p, [0.36, 0.48], [16, 0]);

  const leadO = useTransform(p, [0.5, 0.62], [0, 1]);
  const leadY = useTransform(p, [0.5, 0.62], [18, 0]);

  const capO = useTransform(p, [0.86, 0.96], [0, 1]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* 배경 글로우 */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(48% 56% at 64% 46%, rgba(232,181,75,0.10), transparent 72%)" }} />
      </motion.div>
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

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,4vw,4.5rem)] px-[clamp(2rem,5vw,7rem)] py-[6vh] lg:grid-cols-[0.82fr_1.18fr]">
        {/* 좌측 내러티브 */}
        <div className="flex flex-col justify-center">
          <motion.div style={{ opacity: kickO, y: kickY }}>
            <Kicker>{cluster}</Kicker>
          </motion.div>

          <motion.div style={{ opacity: titleO, y: titleY }} className="mt-7">
            <span className="font-mono text-[clamp(0.8rem,1vw,1rem)] tracking-[0.3em] text-gold/70">
              CASE {String(num).padStart(2, "0")}
            </span>
            <h2 className="mt-3 text-balance-k font-display font-black leading-[1.14] text-bone text-[clamp(1.9rem,3vw,3.4rem)]">
              {title}
            </h2>
          </motion.div>

          {/* 예전 SaaS → 이제 채팅 한 줄 */}
          <div className="mt-[clamp(1.6rem,3.4vh,2.6rem)]">
            <motion.div style={{ opacity: oldO }} className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ember/70 md:text-[11px]">예전</span>
              <span className="relative font-body text-[clamp(0.95rem,1.2vw,1.25rem)] text-bone/45">
                {oldTool}
                <motion.span
                  aria-hidden
                  style={{ scaleX: oldStrike }}
                  className="absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 rounded-full bg-ember/60"
                />
              </span>
            </motion.div>
            <motion.div style={{ opacity: nowO, y: nowY }} className="mt-3 flex items-center gap-2.5">
              <span className="font-mono text-[clamp(1rem,1.4vw,1.5rem)] leading-none text-gold">→</span>
              <span className="font-display font-bold leading-tight text-gold text-[clamp(1.1rem,1.6vw,1.7rem)] [text-shadow:0_0_28px_rgba(232,181,75,0.35)]">
                이제, 채팅 한 줄.
              </span>
            </motion.div>
          </div>

          {/* 설명 */}
          <motion.p
            style={{ opacity: leadO, y: leadY }}
            className="mt-[clamp(1.6rem,3.2vh,2.4rem)] max-w-[440px] text-balance-k leading-relaxed text-bone/65 text-[clamp(0.98rem,1.25vw,1.3rem)]"
          >
            {lead}
          </motion.p>

          {/* 캡션 */}
          <motion.p
            style={{ opacity: capO }}
            className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/75 md:text-[11px]"
          >
            <span className="inline-block h-px w-8 bg-gold/55" />
            {caption}
          </motion.p>
        </div>

        {/* 우측 ClineStudio */}
        <div className="flex h-full items-center justify-center">
          <ClineStudio p={p} script={script} Result={Result} resultTab={resultTab} />
        </div>
      </div>
    </div>
  );
}
