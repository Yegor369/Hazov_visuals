"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
  const [active, setActive] = useState<number | null>(null);

  const scroll = (dir: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const prev = useCallback(() => setActive(i => i !== null ? (i - 1 + items.length) % items.length : null), []);
  const next = useCallback(() => setActive(i => i !== null ? (i + 1) % items.length : null), []);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, prev, next, close]);

  // Блокируем скролл страницы когда лайтбокс открыт
  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <>
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
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover="hover"
              onClick={() => setActive(i)}
              style={{ position: "relative", flexShrink: 0, width: 320, height: 420, scrollSnapAlign: "start", overflow: "hidden", cursor: "zoom-in", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Image src={item.src} alt={item.title} fill
                style={{ objectFit: "cover", filter: "grayscale(80%) brightness(0.5) contrast(1.1)" }} />

              <motion.div variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }} initial="initial"
                style={{ position: "absolute", inset: 0, background: "rgba(110,123,255,0.08)", transition: "opacity 0.4s" }} />

              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,11,0.9) 0%, transparent 55%)" }} />

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#6E7BFF", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>{item.type}</p>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "#F5F5F5", letterSpacing: "-0.02em" }}>{item.title}</p>
              </div>

              {/* Иконка увеличения при ховере */}
              <motion.div
                variants={{ hover: { opacity: 1, scale: 1 }, initial: { opacity: 0, scale: 0.8 } }}
                initial="initial"
                style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, background: "rgba(110,123,255,0.15)", border: "1px solid rgba(110,123,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6E7BFF" strokeWidth="1.5">
                  <path d="M15 3h6m0 0v6m0-6l-7 7M9 21H3m0 0v-6m0 6l7-7"/>
                </svg>
              </motion.div>

              <motion.div variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }} initial="initial"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 1, background: "linear-gradient(to right, #6E7BFF, transparent)", transition: "opacity 0.3s" }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(5,5,8,0.92)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* Фото */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", width: "min(90vw, 860px)", height: "min(80vh, 600px)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Image
                src={items[active].src}
                alt={items[active].title}
                fill
                style={{ objectFit: "cover", filter: "brightness(0.85) contrast(1.05)" }}
                sizes="90vw"
              />

              {/* Градиент снизу */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,8,0.85) 0%, transparent 50%)" }} />

              {/* Инфо */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px" }}>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#6E7BFF", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 8 }}>
                  {items[active].type}
                </p>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "1.4rem", color: "#F5F5F5", letterSpacing: "-0.02em" }}>
                  {items[active].title}
                </p>
              </div>

              {/* Счётчик */}
              <div style={{ position: "absolute", top: 20, left: 24, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </div>
            </motion.div>

            {/* Стрелки */}
            {[{ dir: -1, fn: prev, pos: { left: "clamp(8px, 2vw, 24px)" } }, { dir: 1, fn: next, pos: { right: "clamp(8px, 2vw, 24px)" } }].map(({ dir, fn, pos }) => (
              <button
                key={dir}
                onClick={e => { e.stopPropagation(); fn(); }}
                style={{ position: "absolute", ...pos, width: 48, height: 48, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", color: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {dir === -1
                    ? <path d="M19 12H5M12 5l-7 7 7 7"/>
                    : <path d="M5 12h14M12 5l7 7-7 7"/>}
                </svg>
              </button>
            ))}

            {/* Закрыть */}
            <button
              onClick={close}
              style={{ position: "absolute", top: 20, right: 20, width: 44, height: 44, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", color: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Подсказка Escape */}
            <p style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", whiteSpace: "nowrap" }}>
              ESC — закрыть · ← → — навигация
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
