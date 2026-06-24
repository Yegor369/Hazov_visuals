"use client";

const items = [
  "ВИДЕОМОНТАЖ", "НЕЙРОСЕТИ", "TELEGRAM-БОТЫ", "ЛЕНДИНГИ",
  "АВТОМАТИЗАЦИЯ", "САЙТЫ ПОД КЛЮЧ", "РЕКЛАМНЫЕ РОЛИКИ", "БЫСТРО И ЧИСТО",
];

// CSS-анимация вместо framer-motion — не вызывает layout shift
export default function MarqueeTicker({ reverse = false }: { reverse?: boolean }) {
  const track = [...items, ...items, ...items];
  return (
    <div
      className="overflow-hidden py-5 select-none"
      style={{ borderTop: "1px solid rgba(245,245,245,0.06)", borderBottom: "1px solid rgba(245,245,245,0.06)" }}
    >
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: `marquee${reverse ? "Rev" : ""} 32s linear infinite`,
          width: "max-content",
        }}
      >
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-12 font-mono text-xs tracking-[0.25em] text-[#8A8A90]">
            {item}
            <span style={{ color: "#6E7BFF", opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
        @keyframes marqueeRev { from { transform: translateX(-33.333%) } to { transform: translateX(0) } }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
