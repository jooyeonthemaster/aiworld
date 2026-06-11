"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

/**
 * 발표 HUD: 상단 진행바 + 좌하단 액트 라벨 + 우하단 씬 카운터 + 키보드 내비게이션.
 * 각 씬의 <section data-scene data-act> 를 읽는다.
 */
export default function ProgressHUD() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const [cur, setCur] = useState(0);
  const [total, setTotal] = useState(0);
  const [act, setAct] = useState("");
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene]")
    );
    setTotal(scenes.length);

    const indexAt = (mid: number) => {
      let idx = 0;
      scenes.forEach((s, i) => {
        if (s.offsetTop <= mid) idx = i;
      });
      return idx;
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      const idx = indexAt(window.scrollY + window.innerHeight * 0.5);
      setCur(idx);
      setAct(scenes[idx]?.dataset.act ?? "");
      if (window.scrollY > 60) setHint(false);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    const scrollTo = (top: number) => {
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(top, { duration: 1.05 });
      else window.scrollTo({ top, behavior: "smooth" });
    };

    const go = (dir: 1 | -1) => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      const idx = indexAt(y + vh * 0.5);
      const s = scenes[idx];
      if (!s) return;
      const bottom = s.offsetTop + s.offsetHeight;
      if (dir === 1) {
        // 긴(핀 고정) 씬 안에서는 한 화면씩 전진
        if (bottom - y > vh * 1.7) scrollTo(y + vh);
        else scrollTo(scenes[idx + 1]?.offsetTop ?? bottom - vh);
      } else {
        if (y - s.offsetTop > vh * 0.6) scrollTo(Math.max(s.offsetTop, y - vh));
        else scrollTo(scenes[idx - 1]?.offsetTop ?? 0);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        go(1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollTo(0);
      } else if (e.key.toLowerCase() === "f") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      {/* 상단 진행바 */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[80] h-[3px] origin-left bg-gold"
        style={{ scaleX }}
      />

      {/* 좌하단 액트 라벨 */}
      <div className="pointer-events-none fixed bottom-5 left-6 z-[80] mix-blend-difference">
        <AnimatePresence mode="wait">
          <motion.div
            key={act}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-bone/80"
          >
            {act}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 우하단 씬 카운터 */}
      <div className="pointer-events-none fixed bottom-5 right-6 z-[80] mix-blend-difference font-mono text-[11px] md:text-xs tracking-[0.25em] text-bone/80 tabular-nums">
        {String(cur + 1).padStart(2, "0")}
        <span className="mx-1 text-bone/40">/</span>
        {String(total).padStart(2, "0")}
      </div>

      {/* 조작 힌트 */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="pointer-events-none fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 mix-blend-difference font-mono text-[10px] tracking-[0.25em] text-bone/60"
          >
            SCROLL · ←→ 이동 · F 전체화면
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
