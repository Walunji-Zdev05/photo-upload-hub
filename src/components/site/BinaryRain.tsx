import { useEffect, useRef } from "react";

const COL_W = 20; // px between columns
const ROW_H = 22; // px per row
const FONT = 17; // glyph size in px
const TRAIL = 13; // rows behind the bright head
const TICK_MS = 75;

// Same character every time for a column/row pair, so the trail stays stable
// instead of flickering on every frame.
const glyph = (col: number, row: number) =>
  (((col * 73856093) ^ (row * 19349663)) & 1) === 0 ? "1" : "0";

export function BinaryRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let drops: number[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / COL_W);
      const next = Array.from({ length: cols }, (_, i) =>
        i < drops.length ? drops[i] : Math.random() * -20,
      );
      drops = next;
    };

    const primary = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() ||
      "currentColor";

    let last = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < TICK_MS) return;
      last = t;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = primary();
      ctx.font = `${FONT}px monospace`;
      ctx.textBaseline = "alphabetic";

      for (let i = 0; i < drops.length; i++) {
        const head = drops[i];
        for (let k = 0; k < TRAIL; k++) {
          const y = head - k;
          const py = y * ROW_H;
          if (py < -ROW_H || py > h + ROW_H) continue;
          const f = 1 - k / TRAIL;
          ctx.globalAlpha = k === 0 ? 1 : f * f * 0.8;
          ctx.fillText(glyph(i, Math.floor(y)), i * COL_W, py);
        }
        drops[i] =
          head * ROW_H > h && Math.random() > 0.975
            ? Math.random() * -8
            : head + 1;
      }
      ctx.globalAlpha = 1;
    };

    const start = () => {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      if (!mq.matches) raf = requestAnimationFrame(tick);
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    mq.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      mq.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      data-binary-rain
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
