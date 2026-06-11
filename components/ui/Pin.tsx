"use client";

import { ReactNode, useEffect, useRef } from "react";
import {
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

/**
 * 핀 고정 스크롤 스테이지.
 * heights × 100vh 만큼 스크롤되는 동안 내부 스테이지가 화면에 고정되고,
 * children(progress)의 progress 는 0→1 로 흐른다.
 *
 * progress 는 scrollYProgress 를 일반 MotionValue 로 재방출한 값이다.
 * (framer-motion 의 네이티브 ScrollTimeline 오프로드를 우회 — 씬들이
 * [0,1] 범위를 벗어나는 useTransform 입력 구간을 써도 JS 보간 경로에서
 * 안전하게 클램프되도록 보장한다.)
 */
export default function Pin({
  heights = 3,
  className = "",
  children,
}: {
  heights?: number;
  className?: string;
  children: (progress: MotionValue<number>) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  useEffect(() => {
    progress.set(scrollYProgress.get());
  }, [progress, scrollYProgress]);

  return (
    <div ref={ref} style={{ height: `${heights * 100}vh` }} className={className}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {children(progress)}
      </div>
    </div>
  );
}
