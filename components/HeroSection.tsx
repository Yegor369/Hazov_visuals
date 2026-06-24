"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const PlanetScene = dynamic(() => import("./PlanetScene"), {
  ssr: false,
  loading: () => (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, rgba(110,123,255,0.2), rgba(10,10,11,0.95))", animation: "pulse 2s ease-in-out infinite" }} />
      <style>{`@keyframes pulse{0%,100%{opacity:0.6}50%{opacity:1}}`}</style>
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section style={{ position: "relative", width: "100%", height: "100svh", minHeight: 620 }}>
      <PlanetScene />

      {/* Vignette edges */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 25%, rgba(10,10,11,0.55) 70%, rgba(10,10,11,0.97) 100%)" }} />

      {/* Strong dark backdrop BEHIND text only */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 55% at 50% 58%, rgba(10,10,11,0.72) 0%, transparent 100%)" }} />

      {/* Text */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", pointerEvents: "none" }}>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.35em", color: "#6E7BFF", textTransform: "uppercase", marginBottom: 28 }}
        >
          HAZOV VISUALS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "clamp(2.6rem,7vw,5.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 28 }}
        >
          <span style={{ color: "#F5F5F5" }}>Делаю так, чтобы</span>
          <br />
          <span style={{ background: "linear-gradient(135deg, #F5F5F5 20%, #B66EFF 65%, #6E7BFF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            вас заметили
          </span>
        </motion.h1>

        {/* Subheading with solid backdrop for readability */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{ marginBottom: 44 }}
        >
          <p style={{
            fontSize: "clamp(1rem,2vw,1.1rem)",
            lineHeight: 1.7,
            color: "#E0E0E8",
            maxWidth: 380,
            padding: "10px 20px",
            background: "rgba(10,10,11,0.55)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(8px)",
            margin: "0 auto",
          }}>
            Видео, сайты, боты — на нейросетях, быстро.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 14, pointerEvents: "auto" }}
        >
          <a href="#services" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "15px 34px",
            fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#F5F5F5", textDecoration: "none",
            background: "linear-gradient(135deg, rgba(110,123,255,0.25), rgba(182,110,255,0.15))",
            border: "1px solid rgba(110,123,255,0.55)",
          }}>
            Смотреть услуги
          </a>
          <a href="https://t.me/hazov_visuals" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "15px 24px",
            fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
            color: "#C0C0D0", textDecoration: "none",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            @hazov_visuals
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 20, height: 34, border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, display: "flex", justifyContent: "center", paddingTop: 6 }}
        >
          <div style={{ width: 3, height: 7, borderRadius: 2, background: "linear-gradient(to bottom, #6E7BFF, #B66EFF)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
