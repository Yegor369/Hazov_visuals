"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WordReveal from "./WordReveal";

const faqs = [
  {
    q: "Что нужно для старта?",
    a: "Только ваша идея и примерное понимание задачи. Я сам задам нужные вопросы на брифе — это бесплатно и занимает 20–30 минут в Telegram.",
  },
  {
    q: "Сколько времени занимает лендинг?",
    a: "Базовый лендинг — 3–5 рабочих дней после согласования сметы. Сроки фиксируются в смете до старта работ.",
  },
  {
    q: "Сколько правок входит в стоимость?",
    a: "2–3 раунда правок включены. По подписке — без ограничений в рамках разумного. Всё фиксируется в смете.",
  },
  {
    q: "Нужен ли мне контент для сайта?",
    a: "Желательно иметь базовое описание бизнеса и фото. Но если ничего нет — помогу сформулировать тексты и подберу визуал.",
  },
  {
    q: "Как происходит оплата?",
    a: "50% предоплата до старта, 50% после сдачи финальной версии. Принимаю переводы на карту.",
  },
  {
    q: "Что после сдачи проекта?",
    a: "Остаюсь на связи. По подписке — поддержка, правки и обновления входят. По разовым проектам — отвечаю на вопросы в течение 2 недель после сдачи.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: "7rem 0", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>

        <div style={{ marginBottom: "4rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.3em", color: "#6E7BFF", textTransform: "uppercase", marginBottom: 16 }}
          >FAQ</motion.p>
          <WordReveal text="Частые вопросы" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                border: open === i ? "1px solid rgba(110,123,255,0.3)" : "1px solid rgba(255,255,255,0.07)",
                background: open === i ? "rgba(110,123,255,0.04)" : "rgba(255,255,255,0.02)",
                transition: "border-color 0.3s, background 0.3s",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: 16,
                  padding: "24px 28px", background: "none", border: "none",
                  cursor: "pointer", textAlign: "left",
                }}
              >
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, fontSize: 15, color: "#F5F5F5", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="6" y1="0" x2="6" y2="12"/><line x1="0" y1="6" x2="12" y2="6"/>
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{ fontSize: 13, color: "#8A8A90", lineHeight: 1.8, padding: "0 28px 24px" }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA under FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: 24, padding: "24px 28px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}
        >
          <p style={{ fontSize: 14, color: "#8A8A90" }}>
            Не нашли ответ? Напишите — отвечу в течение часа.
          </p>
          <a href="https://t.me/hazov_visuals" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6E7BFF", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            Задать вопрос →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
