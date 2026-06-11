const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

export default function Grain() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{ backgroundImage: NOISE_SVG }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 58%, rgba(0,0,0,0.34) 100%)",
        }}
      />
    </div>
  );
}
