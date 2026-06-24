"use client";
import { motion } from "framer-motion";

export default function WordReveal({ text, delay = 0.2, size = "clamp(2rem,4vw,3.2rem)" }: {
  text: string;
  delay?: number;
  size?: string;
}) {
  const words = text.split(" ");
  return (
    <h2 style={{
      fontFamily: "'Space Grotesk',sans-serif",
      fontWeight: 600,
      fontSize: size,
      letterSpacing: "-0.03em",
      lineHeight: 1.1,
      color: "#F5F5F5",
      display: "flex",
      flexWrap: "wrap",
      gap: "0 0.28em",
    }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.15 }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: delay + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
