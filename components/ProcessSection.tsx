"use client";
import { motion } from "framer-motion";
import WordReveal from "./WordReveal";

const steps = [
  { num: "01", title: "Бриф", badge: "Бесплатно", time: "20–30 мин", desc: "Обсуждаем задачу, аудиторию, референсы и сроки в Telegram. Без обязательств.", color: "#6E7BFF" },
  { num: "02", title: "Смета", badge: "", time: "1–2 дня", desc: "Фиксируем объём, стоимость и сроки. Всё прописано до старта — никаких сюрпризов.", color: "#8A72FF" },
  { num: "03", title: "Работа", badge: "Предоплата 50%", time: "по договорённости", desc: "Начинаем. Промежуточные результаты согласуются с вами на каждом этапе.", color: "#9B6EFF" },
  { num: "04", title: "Сдача", badge: "", time: "финал", desc: "Финальная версия → ваша правка → оплата остатка. Проект ваш.", color: "#B66EFF" },
];

export default function ProcessSection() {
  return (
    <section id="process" style={{ padding: "7rem 0", width: "100%", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>

        <div style={{ marginBottom: "4rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.3em", color: "#6E7BFF", textTransform: "uppercase", marginBottom: 16 }}
          >Процесс</motion.p>
          <WordReveal text="Как работаем" />
        </div>

        {/* Steps 2×2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {steps.map((s, i) => (
            <motion.div key={s.num}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "relative", overflow: "hidden",
                padding: 36,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
              }}>
              {/* Corner accents */}
              <div style={{ position: "absolute", top: 0, left: 0, width: 40, height: 1, background: `linear-gradient(to right, ${s.color}, transparent)` }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 40, background: `linear-gradient(to bottom, ${s.color}, transparent)` }} />

              {/* Faded bg number */}
              <span style={{ position: "absolute", right: 20, bottom: 10, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "5.5rem", lineHeight: 1, color: "rgba(255,255,255,0.025)", letterSpacing: "-0.05em", userSelect: "none", pointerEvents: "none" }}>{s.num}</span>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 1 }}>
                {/* Step node + badge */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${s.color}44`, background: `${s.color}10`, flexShrink: 0 }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: s.color }}>{s.num}</span>
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "1.2rem", letterSpacing: "-0.02em", color: "#F5F5F5" }}>{s.title}</h3>
                      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 3, letterSpacing: "0.1em" }}>{s.time}</p>
                    </div>
                  </div>
                  {s.badge && (
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${s.color}35`, color: s.color, background: `${s.color}08`, flexShrink: 0 }}>{s.badge}</span>
                  )}
                </div>

                <p style={{ fontSize: 13, color: "#8A8A90", lineHeight: 1.75 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20, padding: "28px 36px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(110,123,255,0.04)" }}>
          <div>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "1.15rem", letterSpacing: "-0.02em", color: "#F5F5F5" }}>Начнём с брифа?</p>
            <p style={{ fontSize: 13, color: "#8A8A90", marginTop: 4 }}>Это бесплатно и ни к чему не обязывает</p>
          </div>
          <a href="https://t.me/hazov_visuals_bot" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F5F5F5", textDecoration: "none", border: "1px solid rgba(110,123,255,0.4)", background: "rgba(110,123,255,0.08)", flexShrink: 0 }}>
            Написать в Telegram →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
