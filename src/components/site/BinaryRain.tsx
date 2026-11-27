import { useEffect, useRef } from "react";

export function BinaryRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf = 0;
    let drops: number[] = [];
    const size = 16;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drops = Array.from({ length: Math.ceil(canvas.width / size) }, () => Math.random() * -50);
    };
    const color = () => getComputedStyle(document.documentElement).getPropertyValue("--primary");
    let last = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 70) return;
      last = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color();
      ctx.font = `${size - 2}px monospace`;
      drops.forEach((y, i) => {
        ctx.globalAlpha = 0.35;
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > 0.97 ? 0 : y + 1;
      });
    };
    const start = () => {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-40" />;
}
