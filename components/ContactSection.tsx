"use client";
import { motion } from "framer-motion";
import WordReveal from "./WordReveal";

export default function ContactSection() {
  return (
    <section id="contact" style={{ padding: "8rem 0", width: "100%", borderTop: "1px solid rgba(245,245,245,0.06)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 32 }}
        >
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.3em", color: "#6E7BFF", textTransform: "uppercase" }}>Контакт</p>
          <WordReveal text="Обсудим проект?" size="clamp(2.8rem,6vw,5rem)" delay={0.15} />
          <p style={{ fontSize: 16, color: "#8A8A90", lineHeight: 1.7, maxWidth: 420 }}>
            Напишите в Telegram — бриф бесплатный, отвечу быстро.
          </p>

          {/* Pulsing CTA button */}
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            {/* Pulse rings */}
            <span style={{ position: "absolute", inset: -12, border: "1px solid rgba(110,123,255,0.25)", animation: "pulse1 2s ease-out infinite" }} />
            <span style={{ position: "absolute", inset: -24, border: "1px solid rgba(110,123,255,0.12)", animation: "pulse1 2s ease-out infinite 0.5s" }} />
            <style>{`
              @keyframes pulse1 {
                0%   { opacity: 1; transform: scale(1);   }
                100% { opacity: 0; transform: scale(1.15); }
              }
            `}</style>
            <motion.a
              href="https://t.me/hazov_visuals_bot"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(110,123,255,0.35)" }}
              whileTap={{ scale: 0.97 }}
              style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 12, padding: "20px 44px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F5F5F5", textDecoration: "none", border: "1px solid rgba(110,123,255,0.5)", background: "rgba(110,123,255,0.08)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#6E7BFF">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.607c-.153.676-.555.84-1.123.522l-3.1-2.284-1.497 1.44c-.165.165-.304.304-.624.304l.222-3.156 5.75-5.193c.25-.222-.054-.345-.387-.123L7.32 14.56l-3.036-.948c-.66-.206-.673-.66.138-.977l11.87-4.576c.549-.2 1.03.135.851.977l-.581-.788z"/>
              </svg>
              Написать в Telegram
            </motion.a>
          </div>

          {/* Response time badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block", boxShadow: "0 0 8px rgba(74,222,128,0.6)", animation: "blink 2s ease-in-out infinite" }} />
            <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
              отвечу в течение 24 часов после заявки · @hazov_visuals
            </p>
          </div>

          {/* Согласие на обработку данных */}
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em", maxWidth: 420, textAlign: "center", lineHeight: 1.7 }}>
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="/privacy" style={{ color: "rgba(110,123,255,0.6)", textDecoration: "none" }}>
              политикой конфиденциальности
            </a>{" "}
            и даёте согласие на обработку персональных данных
          </p>
        </motion.div>
      </div>
    </section>
  );
}
