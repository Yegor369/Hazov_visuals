"use client";
import { useEffect, useRef } from "react";

export default function SectionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    type Star = { x: number; y: number; r: number; a: number; phase: number; speed: number };
    const stars: Star[] = [];

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = document.documentElement.scrollHeight;
      buildStars();
    }

    function buildStars() {
      stars.length = 0;
      const count = Math.floor((W * H) / 8000);
      for (let i = 0; i < Math.min(count, 350); i++) {
        // разные размеры: мелкие фоновые + несколько крупных ярких
        const big = Math.random() < 0.12;
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: big ? Math.random() * 2.5 + 2.0 : Math.random() * 1.6 + 0.7,
          a: big ? Math.random() * 0.5 + 0.5 : Math.random() * 0.55 + 0.25,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.008 + 0.003,
        });
      }
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, H);

      // Nebula blobs
      const blobs = [
        { x: W * 0.12, y: H * 0.18, r: W * 0.28, c: "rgba(110,123,255,0.055)" },
        { x: W * 0.85, y: H * 0.35, r: W * 0.22, c: "rgba(182,110,255,0.045)" },
        { x: W * 0.5,  y: H * 0.62, r: W * 0.2,  c: "rgba(110,123,255,0.04)" },
        { x: W * 0.2,  y: H * 0.78, r: W * 0.18, c: "rgba(155,110,255,0.04)" },
        { x: W * 0.75, y: H * 0.88, r: W * 0.2,  c: "rgba(182,110,255,0.035)" },
      ];

      blobs.forEach(b => {
        const g = ctx!.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, b.c);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, W, H);
      });

      // Stars — twinkle
      stars.forEach(s => {
        const alpha = s.a * (0.4 + 0.6 * Math.sin(t * s.speed + s.phase));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(210,220,255,${alpha})`;
        ctx!.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.9,
      }}
    />
  );
}
