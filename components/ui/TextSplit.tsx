"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * 단어/글자 단위 마스크 리빌 타이포그래피.
 * char 모드에서도 단어 단위로 whitespace-nowrap 그룹을 묶어
 * 한국어 단어 중간 줄바꿈을 방지한다 (줄바꿈은 단어 사이에서만).
 */
export default function TextSplit({
  text,
  per = "word",
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
  once = true,
  className = "",
}: {
  text: string;
  per?: "word" | "char";
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const words = text.split(" ");

  let runningIndex = 0;
  const piece = (content: string, key: number | string, idx: number) => (
    <span
      key={key}
      className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
    >
      <motion.span
        className="inline-block"
        initial={{ y: "115%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : undefined}
        transition={{
          duration,
          delay: delay + idx * stagger,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {content}
      </motion.span>
    </span>
  );

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {per === "word"
              ? piece(w, "w", runningIndex++)
              : Array.from(w).map((ch, ci) => piece(ch, ci, runningIndex++))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
