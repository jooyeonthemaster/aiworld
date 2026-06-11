"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/** 뷰포트 진입 시 숫자 카운트업 */
export default function Counter({
  to,
  from = 0,
  duration = 1.8,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = true,
  className = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, from, to, duration, delay]);

  const fmt = (n: number) =>
    separator
      ? n.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : n.toFixed(decimals);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {fmt(val)}
      {suffix}
    </span>
  );
}
