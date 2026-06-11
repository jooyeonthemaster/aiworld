"use client";

import { useEffect, useRef } from "react";

/** 캔버스 별/입자 필드. 부모가 relative 여야 한다. */
export default function Starfield({
  density = 130,
  color = "232,181,75",
  maxRadius = 1.6,
  drift = 0.05,
  opacity = 0.8,
  className = "",
}: {
  density?: number;
  color?: string; // "r,g,b"
  maxRadius?: number;
  drift?: number;
  opacity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    type Star = { x: number; y: number; r: number; tw: number; ph: number; vy: number };
    let stars: Star[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.3 + Math.random() * maxRadius,
        tw: 0.4 + Math.random() * 0.6,
        ph: Math.random() * Math.PI * 2,
        vy: (Math.random() - 0.3) * drift,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y += s.vy;
        if (s.y < -4) s.y = h + 4;
        if (s.y > h + 4) s.y = -4;
        const a = s.tw * (0.55 + 0.45 * Math.sin(t * 0.001 + s.ph));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, color, maxRadius, drift]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    />
  );
}
