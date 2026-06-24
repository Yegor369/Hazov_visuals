"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://t.me/hazov_visuals"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(110,123,255,0.4)" }}
          whileTap={{ scale: 0.96 }}
          style={{
            position: "fixed", bottom: 28, right: 28, zIndex: 200,
            display: "flex", alignItems: "center", gap: 10,
            padding: "14px 22px",
            background: "rgba(10,10,11,0.85)",
            border: "1px solid rgba(110,123,255,0.5)",
            backdropFilter: "blur(12px)",
            textDecoration: "none",
            color: "#F5F5F5",
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {/* Green online dot */}
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#4ADE80",
            boxShadow: "0 0 8px rgba(74,222,128,0.7)",
            flexShrink: 0,
            animation: "blink 2s ease-in-out infinite",
          }} />
          <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
          Написать
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#6E7BFF">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.607c-.153.676-.555.84-1.123.522l-3.1-2.284-1.497 1.44c-.165.165-.304.304-.624.304l.222-3.156 5.75-5.193c.25-.222-.054-.345-.387-.123L7.32 14.56l-3.036-.948c-.66-.206-.673-.66.138-.977l11.87-4.576c.549-.2 1.03.135.851.977l-.581-.788z"/>
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
