"use client";
import { useEffect, useRef } from "react";

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let frame = 0;

    const W = 256, H = 256;
    canvas.width = W;
    canvas.height = H;

    const draw = () => {
      frame++;
      // New noise every 2 frames for cinematic flicker
      if (frame % 2 === 0) {
        const img = ctx.createImageData(W, H);
        const data = img.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = data[i+1] = data[i+2] = v;
          data[i+3] = Math.random() * 28; // very subtle alpha
        }
        ctx.putImageData(img, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
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
        zIndex: 998,
        pointerEvents: "none",
        opacity: 0.55,
        // Tile the small canvas over the whole screen
        imageRendering: "pixelated",
        mixBlendMode: "overlay",
      }}
    />
  );
}
