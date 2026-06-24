"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    num: "01", label: "Сайты", color: "#6E7BFF",
    summary: "Лендинг от 30 000 ₽  ·  Подписка от 7 000 ₽/мес",
    rows: [
      { name: "Лендинг", sub: "одностраничный", price: "30 000 ₽", note: "разово" },
      { name: "Многостраничный", sub: "каталог / корп. сайт", price: "50 000 ₽", note: "разово" },
      { name: "Подписка «Лайт»", sub: "домен + хостинг + поддержка", price: "7–9 тыс. ₽", note: "/мес" },
      { name: "Подписка «Бизнес»", sub: "+ обновления контента", price: "12–15 тыс. ₽", note: "/мес" },
    ],
  },
  {
    num: "02", label: "Видеоролики", color: "#9B6EFF",
    summary: "Сторис от 3 300 ₽  ·  Промо от 13 200 ₽",
    rows: [
      { name: "Сторис", sub: "15 секунд", price: "3 300 ₽", note: "" },
      { name: "Стандарт", sub: "30 секунд", price: "6 600 ₽", note: "" },
      { name: "Промо", sub: "60 секунд", price: "13 200 ₽", note: "" },
      { name: "Базовая ставка", sub: "монтаж, музыка, субтитры", price: "220 ₽", note: "/сек" },
    ],
  },
  {
    num: "03", label: "Автоматизация", color: "#B66EFF",
    summary: "Telegram-боты  ·  Воронки  ·  Интеграции",
    rows: [
      { name: "Telegram-бот", sub: "оценка после брифа", price: "по договорённости", note: "" },
      { name: "Оптимизация TG-канала", sub: "", price: "по договорённости", note: "" },
      { name: "Индивидуальная автоматизация", sub: "", price: "по договорённости", note: "" },
    ],
  },
];

export default function PricingSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="pricing" style={{ padding: "7rem 0", width: "100%", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          style={{ marginBottom: "4rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.3em", color: "#6E7BFF", textTransform: "uppercase", marginBottom: 16 }}>Прайс</p>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#F5F5F5" }}>Цены</h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {categories.map((cat, ci) => (
            <motion.div key={cat.num}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                overflow: "hidden",
                border: open === ci ? `1px solid ${cat.color}44` : "1px solid rgba(255,255,255,0.07)",
                background: open === ci ? `${cat.color}07` : "rgba(255,255,255,0.02)",
                transition: "border-color 0.3s, background 0.3s",
              }}>

              {/* Clickable header */}
              <button onClick={() => setOpen(open === ci ? null : ci)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 20, padding: "24px 32px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>{cat.num}</span>
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "1.15rem", letterSpacing: "-0.02em", color: "#F5F5F5" }}>{cat.label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{cat.summary}</span>
                </div>
                <motion.div animate={{ rotate: open === ci ? 45 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="6" y1="0" x2="6" y2="12"/><line x1="0" y1="6" x2="12" y2="6"/>
                  </svg>
                </motion.div>
              </button>

              {/* Expanded rows */}
              <AnimatePresence initial={false}>
                {open === ci && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ padding: "8px 32px 28px" }}>
                      {cat.rows.map((row, ri) => (
                        <motion.div key={row.name}
                          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: ri * 0.06 }}
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "14px 0", borderBottom: ri < cat.rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                          <div>
                            <p style={{ fontSize: 13, color: "#F5F5F5" }}>{row.name}</p>
                            {row.sub && <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>{row.sub}</p>}
                          </div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 4, flexShrink: 0 }}>
                            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#F5F5F5" }}>{row.price}</span>
                            {row.note && <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#8A8A90" }}>{row.note}</span>}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, padding: "0 4px" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.25)", lineHeight: 1.7 }}>
            Цены ориентировочные — финал фиксируется в смете до старта.<br/>Бриф бесплатный.
          </p>
          <a href="https://t.me/hazov_visuals_bot" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6E7BFF", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            Получить смету →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
