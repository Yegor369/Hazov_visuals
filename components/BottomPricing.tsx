"use client";
import { motion } from "framer-motion";
import WordReveal from "./WordReveal";
import { useIsMobile } from "../hooks/useIsMobile";

const rows = [
  {
    category: "Сайты",
    popular: true,
    items: [
      { name: "Лендинг",          price: "29 900 ₽",      срок: "7 дн" },
      { name: "Многостраничный",   price: "49 900 ₽",      срок: "14 дн" },
      { name: "Подписка Лайт",     price: "7 900 ₽/мес",   срок: null },
      { name: "Подписка Бизнес",   price: "12 900 ₽/мес",  срок: null },
    ],
  },
  {
    category: "Видеоролики",
    popular: false,
    items: [
      { name: "Сторис 15 сек",   price: "3 300 ₽",   срок: "1 дн" },
      { name: "Стандарт 30 сек", price: "6 600 ₽",   срок: "2 дн" },
      { name: "Промо 60 сек",    price: "12 900 ₽",  срок: "4 дн" },
      { name: "Базовая ставка",  price: "220 ₽/сек", срок: null },
    ],
  },
  {
    category: "Автоматизация",
    popular: false,
    items: [
      { name: "Telegram-бот",          price: "9 900 ₽",       срок: null },
      { name: "Оптимизация TG-канала", price: "9 900 ₽",       срок: null },
      { name: "Автоматизация",         price: "от 14 900 ₽",   срок: null },
    ],
  },
];

export default function BottomPricing() {
  const isMobile = useIsMobile();

  return (
    <section style={{ padding: "7rem 0", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)" }}>

        <div style={{ marginBottom: "4rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.3em", color: "#6E7BFF", textTransform: "uppercase", marginBottom: 16 }}
          >Прайс</motion.p>
          <WordReveal text="Прозрачные цены" />
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 14, letterSpacing: "0.05em" }}
          >
            Финальная стоимость фиксируется в смете до старта — никаких сюрпризов
          </motion.p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 2 }}>
          {rows.map((col, ci) => (
            <motion.div
              key={col.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "32px 28px",
                position: "relative",
                background: col.popular
                  ? "linear-gradient(135deg, rgba(110,123,255,0.08), rgba(182,110,255,0.06))"
                  : "rgba(255,255,255,0.02)",
                border: col.popular
                  ? "1px solid transparent"
                  : "1px solid rgba(255,255,255,0.07)",
                backgroundClip: col.popular ? undefined : undefined,
                ...(col.popular ? {
                  backgroundImage: "linear-gradient(135deg, rgba(110,123,255,0.08), rgba(182,110,255,0.06))",
                  outline: "1px solid transparent",
                  boxShadow: "inset 0 0 0 1px rgba(110,123,255,0.35), 0 0 32px rgba(110,123,255,0.08)",
                } : {}),
              }}
            >
              {/* Popular badge */}
              {col.popular && (
                <span style={{
                  position: "absolute", top: 16, right: 16,
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 9, letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  background: "linear-gradient(90deg, #6E7BFF, #B66EFF)",
                  color: "#fff",
                  borderRadius: 2,
                }}>
                  Популярное
                </span>
              )}

              <p style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 10, letterSpacing: "0.25em",
                color: col.popular ? "#8A94FF" : "#6E7BFF",
                textTransform: "uppercase", marginBottom: 24,
              }}>
                {col.category}
              </p>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {col.items.map((item, ri) => (
                  <div key={item.name} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    gap: 16, padding: "14px 0",
                    borderBottom: ri < col.items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}>
                    <span style={{ fontSize: 13, color: "#8A8A90", flexShrink: 0 }}>{item.name}</span>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: col.popular ? 15 : 13,
                        fontWeight: col.popular ? 600 : 400,
                        background: col.popular
                          ? "linear-gradient(90deg, #8A94FF, #C084FC)"
                          : "none",
                        WebkitBackgroundClip: col.popular ? "text" : undefined,
                        WebkitTextFillColor: col.popular ? "transparent" : undefined,
                        color: col.popular ? undefined : "#F5F5F5",
                        flexShrink: 0,
                      }}>
                        {item.price}
                      </span>
                      {item.срок && (
                        <span style={{
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 9, letterSpacing: "0.15em",
                          color: "rgba(110,123,255,0.6)",
                          textTransform: "uppercase",
                        }}>
                          {item.срок}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}
        >
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
            Бриф — бесплатно. Предоплата 50% после согласования сметы.
          </p>
          <a href="https://t.me/hazov_visuals_bot" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6E7BFF", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            Получить смету →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
