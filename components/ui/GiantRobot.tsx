"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Application } from "@splinetool/runtime";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const SCENE_URL =
  "https://prod.spline.design/f60FOuMNnQHiP-ZC/scene.splinecode";

/**
 * 3D 거인 로봇 (Spline 클라우드 씬).
 * 씬 배경이 밝은 회색이므로 부모에서 mix-blend-multiply 를 걸어
 * 칠흑 배경 위에 검은 실루엣 거인만 남긴다.
 * 로드 완료 시 아래에서 떠오르며 등장.
 */
export default function GiantRobot({ className = "" }: { className?: string }) {
  const [ready, setReady] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 90, scale: 1.06 }}
      animate={
        ready
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 90, scale: 1.06 }
      }
      transition={{ duration: 2.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <Spline
        scene={SCENE_URL}
        onLoad={(app: Application) => {
          try {
            // 지원되는 런타임이면 배경을 투명하게 — 실패해도 blend 로 커버
            (app as unknown as { setBackgroundColor?: (c: string) => void })
              .setBackgroundColor?.("transparent");
          } catch {
            /* noop */
          }
          setReady(true);
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </motion.div>
  );
}
