"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          style={{
            position: "fixed", inset: 0, zIndex: 99999,
            background: "#0A0A0B",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 32,
          }}
        >
          {/* Логотип */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src="/assets/logo.png" alt="HAZOV VISUALS" width={160} height={40} style={{ objectFit: "contain", opacity: 0.9 }} />
          </motion.div>

          {/* Прогресс-линия */}
          <motion.div style={{ width: 120, height: 1, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #6E7BFF, #B66EFF)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
