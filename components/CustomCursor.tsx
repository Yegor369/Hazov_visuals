"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef<number>(0);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onDown = () => ringRef.current?.classList.add("pressed");
    const onUp   = () => ringRef.current?.classList.remove("pressed");

    // Hover on links/buttons → grow ring
    const onEnter = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.matches("a,button,[role=button]")) ringRef.current?.classList.add("hover");
    };
    const onLeave = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el.matches("a,button,[role=button]")) ringRef.current?.classList.remove("hover");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    // Smooth ring follow
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div ref={dotRef} aria-hidden style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none",
        width: 5, height: 5, borderRadius: "50%", background: "#6E7BFF",
        marginLeft: -2.5, marginTop: -2.5,
        willChange: "transform",
      }} />
      {/* Outer ring */}
      <div ref={ringRef} aria-hidden className="cursor-ring" style={{
        position: "fixed", top: 0, left: 0, zIndex: 9998, pointerEvents: "none",
        width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(110,123,255,0.7)",
        marginLeft: -18, marginTop: -18,
        willChange: "transform",
        transition: "width 0.2s, height 0.2s, margin 0.2s, border-color 0.2s",
      }} />
      <style>{`
        .cursor-ring.hover   { width:56px; height:56px; margin-left:-28px; margin-top:-28px; border-color:rgba(182,110,255,0.9); }
        .cursor-ring.pressed { width:28px; height:28px; margin-left:-14px; margin-top:-14px; }
        @media(pointer:coarse){ .cursor-ring, [aria-hidden] { display:none !important; } }
      `}</style>
    </>
  );
}
