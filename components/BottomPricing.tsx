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
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}
        >
          <motion.a
            href="https://t.me/hazov_visuals_bot"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(110,123,255,0.3)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 14,
              padding: "20px 52px",
              background: "linear-gradient(135deg, rgba(110,123,255,0.15), rgba(182,110,255,0.1))",
              border: "1px solid rgba(110,123,255,0.4)",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Блик */}
            <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(110,123,255,0.6), transparent)" }} />

            <svg width="18" height="18" viewBox="0 0 24 24" fill="#6E7BFF">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.607c-.153.676-.555.84-1.123.522l-3.1-2.284-1.497 1.44c-.165.165-.304.304-.624.304l.222-3.156 5.75-5.193c.25-.222-.054-.345-.387-.123L7.32 14.56l-3.036-.948c-.66-.206-.673-.66.138-.977l11.87-4.576c.549-.2 1.03.135.851.977l-.581-.788z"/>
            </svg>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12, letterSpacing: "0.2em",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, #8A94FF, #C084FC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600,
            }}>
              Получить смету бесплатно
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A94FF" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>

          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: "0.05em", textAlign: "center" }}>
            Бриф — бесплатно · Предоплата 50% после согласования сметы
          </p>
        </motion.div>

      </div>
    </section>
  );
}
