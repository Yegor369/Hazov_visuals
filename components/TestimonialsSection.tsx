"use client";
import { motion } from "framer-motion";
import WordReveal from "./WordReveal";

// DECISION: заменить на реальные отзывы когда появятся
const reviews = [
  {
    text: "Заказывал лендинг для своей студии. Сделал за 4 дня — я даже не ожидал такого. Всё чисто, современно, без лишнего. Клиенты сразу начали писать через сайт.",
    name: "Артём Соколов",
    role: "Владелец фотостудии",
    initial: "А",
    color: "#6E7BFF",
    stars: 5,
  },
  {
    text: "Делал рекламный ролик для кафе. Результат превзошёл ожидания — динамика, музыка, всё в тему. Выложили в Reels, набрало 40к просмотров за неделю.",
    name: "Диана Краснова",
    role: "SMM-менеджер кафе",
    initial: "Д",
    color: "#9B6EFF",
    stars: 5,
  },
  {
    text: "Подключили Telegram-бота для записи клиентов. Раньше всё вручную — теперь бот сам принимает заявки, напоминает, отвечает на вопросы. Экономия 3+ часов в день.",
    name: "Максим Ворон",
    role: "Барбер, владелец барбершопа",
    initial: "М",
    color: "#B66EFF",
    stars: 5,
  },
  {
    text: "Взял подписку на сайт — домен, хостинг, правки входят. Очень удобно, не нужно ни о чём думать. Уже третий месяц, всё работает без единой проблемы.",
    name: "Ольга Петрова",
    role: "Мастер маникюра",
    initial: "О",
    color: "#7B6EFF",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#6E7BFF">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section style={{ padding: "7rem 0", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.3em", color: "#6E7BFF", textTransform: "uppercase", marginBottom: 16 }}
          >Отзывы</motion.p>
          <WordReveal text="Что говорят клиенты" />
        </div>

        {/* Grid 2×2 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ borderColor: `${r.color}44`, backgroundColor: `${r.color}06` }}
              style={{
                padding: 36,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
                display: "flex", flexDirection: "column", gap: 24,
                transition: "border-color 0.3s, background 0.3s",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, left: 0, width: 32, height: 1, background: `linear-gradient(to right, ${r.color}, transparent)` }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 32, background: `linear-gradient(to bottom, ${r.color}, transparent)` }} />

              {/* Stars */}
              <Stars count={r.stars} />

              {/* Quote */}
              <p style={{ fontSize: 14, color: "#C8C8D4", lineHeight: 1.8, flex: 1 }}>
                «{r.text}»
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {/* Avatar */}
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                  background: `linear-gradient(135deg, ${r.color}33, ${r.color}11)`,
                  border: `1px solid ${r.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 16, color: r.color,
                }}>
                  {r.initial}
                </div>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14, color: "#F5F5F5", letterSpacing: "-0.01em" }}>{r.name}</p>
                  <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#8A8A90", marginTop: 3, letterSpacing: "0.05em" }}>{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
