"use client";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";

const stats = [
  { value: 27, suffix: "+", label: "проектов\nсдано" },
  { value: 3,  suffix: " дня", label: "средний срок\nлендинга" },
  { value: 100, suffix: "%", label: "клиентов\nвозвращаются" },
  { value: 24,  suffix: " часа", label: "время ответа\nпосле заявки" },
];

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease out cubic
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  return (
    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(2.4rem,4vw,3.8rem)", letterSpacing: "-0.04em", color: "#F5F5F5", lineHeight: 1 }}>
      {val}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ padding: "0 0 7rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 2 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: "36px 28px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Accent top line */}
              <div style={{ height: 1, width: 32, background: "linear-gradient(to right, #6E7BFF, #B66EFF)", marginBottom: 8 }} />
              <Counter target={s.value} suffix={s.suffix} active={active} />
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#8A8A90", lineHeight: 1.6, letterSpacing: "0.05em", whiteSpace: "pre-line" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
