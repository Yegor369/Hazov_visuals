"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WordReveal from "./WordReveal";

const TG = "https://t.me/hazov_visuals";

const services = [
  {
    num: "01",
    title: "Создание сайтов",
    tagline: "Сайт, который продаёт",
    price: "от 30 000 ₽",
    priceSub: "или 7 000 ₽/мес",
    desc: "Лендинги и многостраничные сайты — быстро, с нейросетями, под ваш бизнес. Подписка включает домен, хостинг, поддержку и до 2–3 правок в месяц.",
    items: [
      { name: "Лендинг", price: "30 000 ₽" },
      { name: "Многостраничный", price: "50 000 ₽" },
      { name: "Подписка «Лайт»", price: "7–9 тыс./мес" },
      { name: "Подписка «Бизнес»", price: "12–15 тыс./мес" },
    ],
    color: "#6E7BFF",
  },
  {
    num: "02",
    title: "Рекламные ролики",
    tagline: "Цепляет с первой секунды",
    price: "от 3 300 ₽",
    priceSub: "220 ₽/секунда",
    desc: "Монтаж, динамика, музыка, субтитры — всё входит. Пакеты под Reels, Stories и полноформатное промо. Готово за 2–3 дня.",
    items: [
      { name: "Сторис 15 сек", price: "3 300 ₽" },
      { name: "Стандарт 30 сек", price: "6 600 ₽" },
      { name: "Промо 60 сек", price: "13 200 ₽" },
    ],
    color: "#9B6EFF",
  },
  {
    num: "03",
    title: "Боты и автоматизация",
    tagline: "Нейросети берут рутину",
    price: "по брифу",
    priceSub: "оценка бесплатно",
    desc: "Telegram-боты, воронки, автоответы, интеграции с CRM. Любые задачи, где человека можно заменить алгоритмом.",
    items: [
      { name: "Telegram-бот", price: "по брифу" },
      { name: "Автоматизация", price: "по брифу" },
      { name: "TG-канал / воронка", price: "по брифу" },
    ],
    color: "#B66EFF",
  },
];

const S = {
  section: { padding: "7rem 0", width: "100%" } as React.CSSProperties,
  inner: { maxWidth: 1100, margin: "0 auto", padding: "0 48px" } as React.CSSProperties,
  label: { fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.3em", color: "#6E7BFF", textTransform: "uppercase" as const, marginBottom: 16 },
  heading: { fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#F5F5F5" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 } as React.CSSProperties,
};

export default function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" style={S.section}>
      <div style={S.inner}>
        {/* Blur reveal header */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
          style={{ marginBottom: "4rem" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={S.label}
          >Услуги</motion.p>
          <WordReveal text="Что я делаю" />
        </motion.div>

        <div style={S.grid}>
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(active === i ? null : i)}
              style={{
                position: "relative", cursor: "pointer", overflow: "hidden",
                display: "flex", flexDirection: "column",
                border: active === i ? `1px solid ${s.color}55` : "1px solid rgba(255,255,255,0.08)",
                background: active === i ? `${s.color}09` : "rgba(255,255,255,0.025)",
                transition: "border-color 0.35s, background 0.35s",
              }}
            >
              <motion.div animate={{ opacity: active === i ? 1 : 0 }} transition={{ duration: 0.4 }}
                style={{ position: "absolute", top: -50, left: -50, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${s.color}20 0%, transparent 70%)`, filter: "blur(24px)", pointerEvents: "none" }} />
              <motion.div animate={{ scaleX: active === i ? 1 : 0 }} initial={{ scaleX: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, transformOrigin: "left", background: `linear-gradient(to right, ${s.color}, transparent)` }} />

              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1, padding: 32, gap: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 28, color: s.color, opacity: 0.6, lineHeight: 1, letterSpacing: "-0.05em" }}>{s.num}</span>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, opacity: 0.5, marginTop: 4 }} />
                </div>

                <div>
                  <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: s.color, opacity: 0.7, marginBottom: 8 }}>{s.tagline}</p>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "1.25rem", letterSpacing: "-0.02em", lineHeight: 1.2, color: "#F5F5F5" }}>{s.title}</h3>
                </div>

                <p style={{ fontSize: 13, color: "#8A8A90", lineHeight: 1.75, flex: 1 }}>{s.desc}</p>

                {/* CTA вместо цены */}
                <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: s.color, opacity: 0.8 }}>
                    Подробнее
                  </span>
                  <motion.div animate={{ rotate: active === i ? 45 : 0 }} transition={{ duration: 0.3 }}
                    style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${s.color}44`, flexShrink: 0, marginLeft: "auto" }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="6" y1="0" x2="6" y2="12"/><line x1="0" y1="6" x2="12" y2="6"/>
                    </svg>
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        {s.items.map((item, ii) => (
                          <motion.div key={item.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ii * 0.06 }}
                            style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 4, height: 4, borderRadius: "50%", background: s.color, opacity: 0.6, flexShrink: 0 }} />
                            <span style={{ fontSize: 12, color: "#8A8A90" }}>{item.name}</span>
                          </motion.div>
                        ))}
                        <a href={TG} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          style={{ marginTop: 8, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.07)", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: s.color, textDecoration: "none" }}>
                          Обсудить в Telegram →
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
