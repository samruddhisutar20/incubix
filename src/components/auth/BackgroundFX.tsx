import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * Ambient background: floating gradient blobs, a faint dot-grid mesh,
 * and a lightweight particle constellation. Purely decorative — sits
 * behind all page content with pointer-events disabled.
 */
export function BackgroundFX({ variant = "top" }: { variant?: "top" | "bottom" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(46, Math.floor((canvas.width * canvas.height) / 22000));
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(180,180,255,0.5)";
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(140,140,255,${0.12 * (1 - d / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    if (!prefersReducedMotion) {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {variant === "top" ? (
        <>
          <div className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full bg-purple-500/40 blur-[90px] motion-safe:animate-float" />
          <div
            className="absolute -bottom-36 -right-20 h-[480px] w-[480px] rounded-full bg-blue-500/40 blur-[90px] motion-safe:animate-float"
            style={{ animationDelay: "4s" }}
          />
          <div
            className="absolute top-1/3 right-[8%] h-[360px] w-[360px] rounded-full bg-purple-400/25 blur-[90px] motion-safe:animate-float"
            style={{ animationDelay: "8s" }}
          />
        </>
      ) : (
        <>
          <div className="absolute -bottom-40 -left-28 h-[460px] w-[460px] rounded-full bg-purple-500/30 blur-[90px] motion-safe:animate-float" />
          <div
            className="absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-blue-500/30 blur-[90px] motion-safe:animate-float"
            style={{ animationDelay: "3s" }}
          />
        </>
      )}

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 75%)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
