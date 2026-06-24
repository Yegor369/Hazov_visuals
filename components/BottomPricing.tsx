"use client";
import { motion } from "framer-motion";
import WordReveal from "./WordReveal";

const rows = [
  { category: "Сайты",         items: [{ name: "Лендинг", price: "30 000 ₽" }, { name: "Многостраничный", price: "50 000 ₽" }, { name: "Подписка Лайт", price: "7–9 тыс. ₽/мес" }, { name: "Подписка Бизнес", price: "12–15 тыс. ₽/мес" }] },
  { category: "Видеоролики",   items: [{ name: "Сторис 15 сек", price: "3 300 ₽" }, { name: "Стандарт 30 сек", price: "6 600 ₽" }, { name: "Промо 60 сек", price: "13 200 ₽" }, { name: "Базовая ставка", price: "220 ₽/сек" }] },
  { category: "Автоматизация", items: [{ name: "Telegram-бот", price: "по брифу" }, { name: "Оптимизация TG-канала", price: "по брифу" }, { name: "Автоматизация", price: "по брифу" }] },
];

export default function BottomPricing() {
  return (
    <section style={{ padding: "7rem 0", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>

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

        {/* Three columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
          {rows.map((col, ci) => (
            <motion.div
              key={col.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: "32px 28px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
            >
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.25em", color: "#6E7BFF", textTransform: "uppercase", marginBottom: 24 }}>
                {col.category}
              </p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {col.items.map((item, ri) => (
                  <div key={item.name} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "baseline",
                    gap: 16, padding: "12px 0",
                    borderBottom: ri < col.items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}>
                    <span style={{ fontSize: 13, color: "#8A8A90" }}>{item.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#F5F5F5", flexShrink: 0 }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
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
