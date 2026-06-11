"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

/** 뷰포트 진입 시 페이드+슬라이드(+블러) 리빌 */
export default function Reveal({
  children,
  delay = 0,
  y = 36,
  duration = 1.1,
  once = true,
  blur = false,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  blur?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: blur ? "blur(14px)" : "blur(0px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
