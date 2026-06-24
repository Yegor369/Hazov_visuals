"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// DECISION: заменить src на реальные скриншоты проектов когда появятся
// Формат: { src: "/portfolio/project1.jpg", title: "Название", type: "Лендинг" / "Ролик" }
const items = [
  { src: "/assets/photos/01.jpg", title: "Визуальный проект", type: "Атмосфера" },
  { src: "/assets/photos/11.jpg", title: "Световой кейс",     type: "Видео"     },
  { src: "/assets/photos/09.jpg", title: "Динамика воды",     type: "Монтаж"    },
  { src: "/assets/photos/05.jpg", title: "Энергия кадра",     type: "Ролик"     },
  { src: "/assets/photos/13.jpg", title: "Оптика бренда",     type: "Визуал"    },
  { src: "/assets/photos/15.jpg", title: "Городской стиль",   type: "Фото"      },
];

export default function PortfolioSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "7rem 0", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Header */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px", marginBottom: "3rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.3em", color: "#6E7BFF", textTransform: "uppercase", marginBottom: 14 }}
          >Работы</motion.p>
          <WordReveal text="Избранное" />
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 10, letterSpacing: "0.08em" }}
          >
            ← Кейсы появятся здесь. Пока — визуальный стиль бренда.
          </motion.p>
        </div>
        {/* Arrow controls */}
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {[-1, 1].map((d) => (
            <button key={d} onClick={() => scroll(d)}
              style={{ width: 44, height: 44, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", cursor: "pointer", color: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {d === -1
                  ? <path d="M19 12H5M12 5l-7 7 7 7"/>
                  : <path d="M5 12h14M12 5l7 7-7 7"/>}
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        style={{ display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory", paddingLeft: "calc((100vw - 1100px)/2 + 48px)", paddingRight: 48, paddingBottom: 8, scrollbarWidth: "none" }}
      >
        <style>{`.portfolio-track::-webkit-scrollbar{display:none}`}</style>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover="hover"
            style={{ position: "relative", flexShrink: 0, width: 320, height: 420, scrollSnapAlign: "start", overflow: "hidden", cursor: "pointer", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Photo */}
            <Image src={item.src} alt={item.title} fill
              style={{ objectFit: "cover", filter: "grayscale(80%) brightness(0.5) contrast(1.1)" }} />

            {/* Hover brighten */}
            <motion.div variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }} initial="initial"
              style={{ position: "absolute", inset: 0, background: "rgba(110,123,255,0.08)", transition: "opacity 0.4s" }} />

            {/* Gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,11,0.9) 0%, transparent 55%)" }} />

            {/* Content */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#6E7BFF", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>{item.type}</p>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "#F5F5F5", letterSpacing: "-0.02em" }}>{item.title}</p>
            </div>

            {/* Top-left corner accent */}
            <motion.div variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }} initial="initial"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 1, background: "linear-gradient(to right, #6E7BFF, transparent)", transition: "opacity 0.3s" }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#F5F5F5", display: "flex", flexWrap: "wrap", gap: "0 0.25em", overflow: "hidden" }}>
      {words.map((w, i) => (
        <motion.span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >{w}</motion.span>
        </motion.span>
      ))}
    </h2>
  );
}
